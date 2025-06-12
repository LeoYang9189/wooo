import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Space,
  Form,
  Select,
  Message,
  Typography,
  InputNumber,
  Table,
  Popconfirm
} from '@arco-design/web-react';
import {
  IconPlus,
  IconSave,
  IconArrowLeft,
  IconDelete
} from '@arco-design/web-react/icon';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;
const { Title } = Typography;

// 箱型规则接口
interface ContainerRule {
  id: string;
  containerType: string; // 箱型
  t0Price: number; // T0加价
  t1Price: number; // T1加价
  t2Price: number; // T2加价
  t3Price: number; // T3加价
  internalSalesPrice: number; // 内部销售加价
}

// 加价规则表单数据接口
interface PricingRuleFormData {
  routeName: string; // 航线名称
  currency: 'USD' | 'CNY'; // 币种
  containerRules: ContainerRule[]; // 箱型规则列表
}

// 航线选项
const routeOptions = [
  { value: '亚欧航线', label: '亚欧航线' },
  { value: '跨太平洋航线', label: '跨太平洋航线' },
  { value: '亚美航线', label: '亚美航线' },
  { value: '地中海航线', label: '地中海航线' },
  { value: '亚洲区域航线', label: '亚洲区域航线' },
  { value: '中东航线', label: '中东航线' },
  { value: '非洲航线', label: '非洲航线' },
  { value: '欧美航线', label: '欧美航线' },
  { value: '波罗的海航线', label: '波罗的海航线' },
  { value: '南美航线', label: '南美航线' }
];

// 箱型选项
const containerTypeOptions = [
  { value: '20GP', label: '20GP' },
  { value: '40GP', label: '40GP' },
  { value: '40HQ', label: '40HQ' },
  { value: '45HQ', label: '45HQ' },
  { value: '20RF', label: '20RF' },
  { value: '40RF', label: '40RF' },
  { value: '20OT', label: '20OT' },
  { value: '40OT', label: '40OT' },
  { value: '20FR', label: '20FR' },
  { value: '40FR', label: '40FR' }
];

// 币种选项
const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'CNY', label: 'CNY' }
];

const PricingRuleForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<PricingRuleFormData>({
    routeName: '',
    currency: 'USD',
    containerRules: []
  });
  const [loading, setLoading] = useState(false);

  // 初始化数据
  useEffect(() => {
    if (isEditing) {
      // 模拟从API获取数据
      const mockData: PricingRuleFormData = {
        routeName: '亚欧航线',
        currency: 'USD',
        containerRules: [
          {
            id: '1',
            containerType: '20GP',
            t0Price: 50,
            t1Price: 100,
            t2Price: 150,
            t3Price: 200,
            internalSalesPrice: 80
          },
          {
            id: '2',
            containerType: '40GP',
            t0Price: 80,
            t1Price: 160,
            t2Price: 240,
            t3Price: 320,
            internalSalesPrice: 120
          }
        ]
      };
      setFormData(mockData);
      form.setFieldsValue({
        routeName: mockData.routeName,
        currency: mockData.currency
      });
    }
  }, [id, isEditing, form]);

  // 添加箱型规则
  const handleAddContainerRule = () => {
    const newRule: ContainerRule = {
      id: Date.now().toString(),
      containerType: '',
      t0Price: 0,
      t1Price: 0,
      t2Price: 0,
      t3Price: 0,
      internalSalesPrice: 0
    };
    setFormData(prev => ({
      ...prev,
      containerRules: [...prev.containerRules, newRule]
    }));
  };

  // 删除箱型规则
  const handleDeleteContainerRule = (id: string) => {
    setFormData(prev => ({
      ...prev,
      containerRules: prev.containerRules.filter(rule => rule.id !== id)
    }));
  };

  // 更新箱型规则
  const handleUpdateContainerRule = (id: string, field: keyof ContainerRule, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      containerRules: prev.containerRules.map(rule =>
        rule.id === id ? { ...rule, [field]: value } : rule
      )
    }));
  };

  // 保存数据
  const handleSave = async () => {
    try {
      const basicValues = await form.validate();
      
      // 验证箱型规则
      if (formData.containerRules.length === 0) {
        Message.error('请至少添加一个箱型规则');
        return;
      }

      // 验证箱型规则完整性
      for (const rule of formData.containerRules) {
        if (!rule.containerType) {
          Message.error('请选择所有箱型');
          return;
        }
      }

      // 检查箱型重复
      const containerTypes = formData.containerRules.map(rule => rule.containerType);
      const uniqueTypes = new Set(containerTypes);
      if (containerTypes.length !== uniqueTypes.size) {
        Message.error('箱型不能重复');
        return;
      }

      setLoading(true);

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      const saveData = {
        ...basicValues,
        containerRules: formData.containerRules
      };

      console.log('保存数据:', saveData);
      
      Message.success(isEditing ? '编辑成功' : '新增成功');
      navigate('/controltower/saas/pricing-rule-management');
    } catch (error) {
      console.error('保存失败:', error);
      Message.error('保存失败，请检查表单数据');
    } finally {
      setLoading(false);
    }
  };

  // 取消操作
  const handleCancel = () => {
    navigate('/controltower/saas/pricing-rule-management');
  };

  // 箱型规则表格列定义
  const containerRuleColumns = [
    {
      title: '箱型',
      dataIndex: 'containerType',
      width: 120,
      render: (_: unknown, record: ContainerRule) => (
        <Select
          placeholder="选择箱型"
          value={record.containerType}
          onChange={(value) => handleUpdateContainerRule(record.id, 'containerType', value)}
          style={{ width: '100%' }}
        >
          {containerTypeOptions.map(option => (
            <Option key={option.value} value={option.value}>{option.label}</Option>
          ))}
        </Select>
      )
    },
    {
      title: 'T0加价',
      dataIndex: 't0Price',
      width: 120,
      render: (_: any, record: ContainerRule) => (
        <InputNumber
          placeholder="T0加价"
          value={record.t0Price}
          onChange={(value) => handleUpdateContainerRule(record.id, 't0Price', value || 0)}
          min={0}
          precision={2}
          style={{ width: '100%' }}
        />
      )
    },
    {
      title: 'T1加价',
      dataIndex: 't1Price',
      width: 120,
      render: (_: any, record: ContainerRule) => (
        <InputNumber
          placeholder="T1加价"
          value={record.t1Price}
          onChange={(value) => handleUpdateContainerRule(record.id, 't1Price', value || 0)}
          min={0}
          precision={2}
          style={{ width: '100%' }}
        />
      )
    },
    {
      title: 'T2加价',
      dataIndex: 't2Price',
      width: 120,
      render: (_: any, record: ContainerRule) => (
        <InputNumber
          placeholder="T2加价"
          value={record.t2Price}
          onChange={(value) => handleUpdateContainerRule(record.id, 't2Price', value || 0)}
          min={0}
          precision={2}
          style={{ width: '100%' }}
        />
      )
    },
    {
      title: 'T3加价',
      dataIndex: 't3Price',
      width: 120,
      render: (_: any, record: ContainerRule) => (
        <InputNumber
          placeholder="T3加价"
          value={record.t3Price}
          onChange={(value) => handleUpdateContainerRule(record.id, 't3Price', value || 0)}
          min={0}
          precision={2}
          style={{ width: '100%' }}
        />
      )
    },
    {
      title: '内部销售',
      dataIndex: 'internalSalesPrice',
      width: 120,
      render: (_: any, record: ContainerRule) => (
        <InputNumber
          placeholder="内部销售加价"
          value={record.internalSalesPrice}
          onChange={(value) => handleUpdateContainerRule(record.id, 'internalSalesPrice', value || 0)}
          min={0}
          precision={2}
          style={{ width: '100%' }}
        />
      )
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 80,
      render: (_: any, record: ContainerRule) => (
        <Popconfirm
          title="确定要删除此箱型规则吗？"
          onOk={() => handleDeleteContainerRule(record.id)}
        >
          <Button
            type="text"
            size="small"
            status="danger"
            icon={<IconDelete />}
          />
        </Popconfirm>
      )
    }
  ];

  return (
    <Card>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title heading={4} style={{ margin: 0 }}>
            {isEditing ? '编辑加价规则' : '新增加价规则'}
          </Title>
          <Space>
            <Button icon={<IconArrowLeft />} onClick={handleCancel}>
              返回
            </Button>
            <Button 
              type="primary" 
              icon={<IconSave />} 
              loading={loading}
              onClick={handleSave}
            >
              保存
            </Button>
          </Space>
        </div>
      </div>

      {/* 基础信息 */}
      <Card title="基础信息" style={{ marginBottom: '16px' }}>
        <Form form={form} layout="vertical">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              label="航线名称"
              field="routeName"
              rules={[{ required: true, message: '请选择航线名称' }]}
            >
              <Select placeholder="请选择航线名称">
                {routeOptions.map(option => (
                  <Option key={option.value} value={option.value}>{option.label}</Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item
              label="币种"
              field="currency"
              rules={[{ required: true, message: '请选择币种' }]}
            >
              <Select placeholder="请选择币种">
                {currencyOptions.map(option => (
                  <Option key={option.value} value={option.value}>{option.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Form>
      </Card>

      {/* 箱型规则配置 */}
      <Card 
        title="箱型规则配置" 
        extra={
          <Button 
            type="primary" 
            icon={<IconPlus />} 
            onClick={handleAddContainerRule}
          >
            添加箱型
          </Button>
        }
      >
        <Table
          columns={containerRuleColumns}
          data={formData.containerRules}
          rowKey="id"
          pagination={false}
          scroll={{ x: 800 }}
          noDataElement={
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
              暂无箱型规则，请点击"添加箱型"按钮添加
            </div>
          }
        />
        
        {formData.containerRules.length > 0 && (
          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f7f8fa', borderRadius: '4px' }}>
            <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.5' }}>
              <div>• T0-T3：表示不同客户级别的加价幅度</div>
              <div>• 内部销售：内部销售人员专用加价幅度</div>
              <div>• 所有价格单位与选择的币种一致</div>
            </div>
          </div>
        )}
      </Card>
    </Card>
  );
};

export default PricingRuleForm; 