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
  Popconfirm,
  Input,
  DatePicker
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

// 生成16位数字字母随机组合的规则ID
const generateRuleId = (): string => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// 箱型规则接口
interface ContainerRule {
  id: string;
  containerType: string; // 箱型
  basePrice?: number; // 基础价格 - 港前/尾程运价使用
  t0Price: number; // T0加价
  t1Price: number; // T1加价
  t2Price: number; // T2加价
  t3Price: number; // T3加价
  internalSalesPrice: number; // 内部销售加价
}

// 加价规则表单数据接口
interface PricingRuleFormData {
  ruleId?: string; // 规则ID - 编辑时存在，新增时不存在
  routeName?: string; // 航线名称 - FCL/LCL/AIR使用
  shippingCompany?: string; // 船公司 - FCL/港前/尾程使用
  originPort?: string; // 起运港 - FCL使用
  chargeName?: string; // 费用名称 - FCL/港前/尾程使用
  origin?: string; // 起运地/目的港 - 港前/尾程使用
  destination?: string; // 目的港/配送地址 - 港前/尾程使用
  currency: 'USD' | 'CNY'; // 币种
  validPeriodStart: string; // 有效期开始日期
  validPeriodEnd: string; // 有效期结束日期
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

// 船公司选项
const shippingCompanyOptions = [
  { value: 'COSCO', label: 'COSCO' },
  { value: 'MSC', label: 'MSC' },
  { value: 'MAERSK', label: 'MAERSK' },
  { value: 'CMA CGM', label: 'CMA CGM' },
  { value: 'EVERGREEN', label: 'EVERGREEN' },
  { value: 'HAPAG-LLOYD', label: 'HAPAG-LLOYD' },
  { value: 'ONE', label: 'ONE' },
  { value: 'YANG MING', label: 'YANG MING' },
  { value: 'HMM', label: 'HMM' },
  { value: 'PIL', label: 'PIL' }
];

// 起运港选项
const originPortOptions = [
  { value: '上海港', label: '上海港' },
  { value: '深圳港', label: '深圳港' },
  { value: '宁波港', label: '宁波港' },
  { value: '青岛港', label: '青岛港' },
  { value: '天津港', label: '天津港' },
  { value: '大连港', label: '大连港' },
  { value: '厦门港', label: '厦门港' },
  { value: '广州港', label: '广州港' },
  { value: '连云港', label: '连云港' },
  { value: '营口港', label: '营口港' }
];

// 费用名称选项（包含对应的币种）
const chargeNameOptions = [
  { value: '基础海运费', label: '基础海运费', currency: 'USD' },
  { value: '燃油附加费', label: '燃油附加费', currency: 'USD' },
  { value: '港口费', label: '港口费', currency: 'CNY' },
  { value: '文件费', label: '文件费', currency: 'USD' },
  { value: '操作费', label: '操作费', currency: 'CNY' },
  { value: '设备费', label: '设备费', currency: 'USD' },
  { value: '安全费', label: '安全费', currency: 'USD' },
  { value: '码头费', label: '码头费', currency: 'CNY' }
];

// 港前运价费用名称选项
const precarriageChargeNameOptions = [
  { value: '港前运输费', label: '港前运输费', currency: 'CNY' },
  { value: '拖车费', label: '拖车费', currency: 'CNY' },
  { value: '装箱费', label: '装箱费', currency: 'CNY' },
  { value: '港前操作费', label: '港前操作费', currency: 'CNY' }
];

// 尾程运价费用名称选项
const lastmileChargeNameOptions = [
  { value: '尾程配送费', label: '尾程配送费', currency: 'USD' },
  { value: '卸箱费', label: '卸箱费', currency: 'USD' },
  { value: '仓储费', label: '仓储费', currency: 'USD' },
  { value: '尾程操作费', label: '尾程操作费', currency: 'USD' }
];

// 起运地选项（港前运价）
const originOptions = [
  { value: '深圳', label: '深圳' },
  { value: '广州', label: '广州' },
  { value: '东莞', label: '东莞' },
  { value: '佛山', label: '佛山' },
  { value: '中山', label: '中山' },
  { value: '珠海', label: '珠海' },
  { value: '惠州', label: '惠州' },
  { value: '江门', label: '江门' }
];

// 目的港选项（港前运价）
const destinationPortOptions = [
  { value: '盐田港', label: '盐田港' },
  { value: '蛇口港', label: '蛇口港' },
  { value: '南沙港', label: '南沙港' },
  { value: '黄埔港', label: '黄埔港' },
  { value: '虎门港', label: '虎门港' }
];

// 目的港选项（尾程运价）
const destinationPortOptionsLastmile = [
  { value: '洛杉矶港', label: '洛杉矶港' },
  { value: '长滩港', label: '长滩港' },
  { value: '奥克兰港', label: '奥克兰港' },
  { value: '西雅图港', label: '西雅图港' },
  { value: '纽约港', label: '纽约港' }
];

// 配送地址选项（尾程运价）
const deliveryAddressOptions = [
  { value: 'LAX9仓库', label: 'LAX9仓库' },
  { value: 'LGB2仓库', label: 'LGB2仓库' },
  { value: 'ONT8仓库', label: 'ONT8仓库' },
  { value: 'SEA8仓库', label: 'SEA8仓库' },
  { value: 'JFK8仓库', label: 'JFK8仓库' }
];

const PricingRuleForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  
  // 从URL获取费用类型，默认为整箱海运费
  const searchParams = new URLSearchParams(window.location.search);
  const feeType = searchParams.get('type') || 'fcl';
  
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<PricingRuleFormData>({
    ...(feeType === 'fcl' && { routeName: '', shippingCompany: '', originPort: '', chargeName: '' }),
    ...(feeType === 'precarriage' && { origin: '', destination: '', shippingCompany: '', chargeName: '' }),
    ...(feeType === 'lastmile' && { origin: '', destination: '', shippingCompany: '', chargeName: '' }),
    currency: 'USD',
    validPeriodStart: '',
    validPeriodEnd: '',
    containerRules: []
  });
  const [loading, setLoading] = useState(false);

  // 初始化数据
  useEffect(() => {
    if (isEditing) {
      // 根据费用类型模拟不同的数据
      let mockData: PricingRuleFormData;
      
      if (feeType === 'fcl') {
        mockData = {
          ruleId: generateRuleId(),
          routeName: '亚欧航线',
          shippingCompany: 'COSCO',
          originPort: '上海港',
          chargeName: '基础海运费',
          currency: 'USD',
          validPeriodStart: '2024-01-01',
          validPeriodEnd: '2024-12-31',
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
             } else if (feeType === 'precarriage') {
         mockData = {
           ruleId: generateRuleId(),
           origin: '深圳',
           destination: '盐田港',
           shippingCompany: 'COSCO',
           chargeName: '港前运输费',
           currency: 'CNY',
           validPeriodStart: '2024-01-01',
           validPeriodEnd: '2024-12-31',
           containerRules: [
             {
               id: '1',
               containerType: '20GP',
               basePrice: 800,
               t0Price: 50,
               t1Price: 100,
               t2Price: 150,
               t3Price: 200,
               internalSalesPrice: 80
             },
             {
               id: '2',
               containerType: '40GP',
               basePrice: 1200,
               t0Price: 80,
               t1Price: 160,
               t2Price: 240,
               t3Price: 320,
               internalSalesPrice: 120
             }
           ]
         };
             } else if (feeType === 'lastmile') {
         mockData = {
           ruleId: generateRuleId(),
           origin: '洛杉矶港',
           destination: 'LAX9仓库',
           shippingCompany: 'MAERSK',
           chargeName: '尾程配送费',
           currency: 'USD',
           validPeriodStart: '2024-01-01',
           validPeriodEnd: '2024-12-31',
           containerRules: [
             {
               id: '1',
               containerType: '40GP',
               basePrice: 300,
               t0Price: 30,
               t1Price: 60,
               t2Price: 90,
               t3Price: 120,
               internalSalesPrice: 45
             },
             {
               id: '2',
               containerType: '40HQ',
               basePrice: 350,
               t0Price: 35,
               t1Price: 70,
               t2Price: 105,
               t3Price: 140,
               internalSalesPrice: 52
             }
           ]
         };
      } else {
        // 默认FCL数据
        mockData = {
          ruleId: generateRuleId(),
          routeName: '亚欧航线',
          shippingCompany: 'COSCO',
          originPort: '上海港',
          chargeName: '基础海运费',
          currency: 'USD',
          validPeriodStart: '2024-01-01',
          validPeriodEnd: '2024-12-31',
          containerRules: []
        };
      }
      
      setFormData(mockData);
      form.setFieldsValue({
        ruleId: mockData.ruleId,
        ...(mockData.routeName && { routeName: mockData.routeName }),
        ...(mockData.shippingCompany && { shippingCompany: mockData.shippingCompany }),
        ...(mockData.originPort && { originPort: mockData.originPort }),
        ...(mockData.chargeName && { chargeName: mockData.chargeName }),
        ...(mockData.origin && { origin: mockData.origin }),
        ...(mockData.destination && { destination: mockData.destination }),
        currency: mockData.currency,
        validPeriodStart: mockData.validPeriodStart,
        validPeriodEnd: mockData.validPeriodEnd
      });
    }
  }, [id, isEditing, form, feeType]);

  // 添加箱型规则
  const handleAddContainerRule = () => {
    const newRule: ContainerRule = {
      id: Date.now().toString(),
      containerType: '',
      ...(feeType === 'precarriage' || feeType === 'lastmile' ? { basePrice: 0 } : {}),
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

  // 处理费用名称变化，自动设置币种
  const handleChargeNameChange = (value: string) => {
    let selectedCharge;
    if (feeType === 'precarriage') {
      selectedCharge = precarriageChargeNameOptions.find(option => option.value === value);
    } else if (feeType === 'lastmile') {
      selectedCharge = lastmileChargeNameOptions.find(option => option.value === value);
    } else {
      selectedCharge = chargeNameOptions.find(option => option.value === value);
    }
    
    if (selectedCharge) {
      const newCurrency = selectedCharge.currency as 'USD' | 'CNY';
      setFormData(prev => ({
        ...prev,
        chargeName: value,
        currency: newCurrency
      }));
      form.setFieldValue('currency', newCurrency);
    }
  };

  // 自定义验证规则：航线名称、船公司、起运港三选一至少必填一个
  const validateAtLeastOne = (_value: any, callback: (error?: string) => void) => {
    const formValues = form.getFieldsValue();
    const { routeName, shippingCompany, originPort } = formValues;
    
    if (!routeName && !shippingCompany && !originPort) {
      callback('航线名称、船公司、起运港至少需要填写一个');
    } else {
      callback();
    }
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
    // 港前运价和尾程运价显示基础价格列
    ...(feeType === 'precarriage' || feeType === 'lastmile' ? [{
      title: '基础价格',
      dataIndex: 'basePrice',
      width: 120,
      render: (_: any, record: ContainerRule) => (
        <InputNumber
          placeholder="基础价格"
          value={record.basePrice || 0}
          onChange={(value) => handleUpdateContainerRule(record.id, 'basePrice', value || 0)}
          min={0}
          precision={2}
          style={{ width: '100%' }}
        />
      )
    }] : []),
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {/* 规则ID - 编辑时显示，置灰不可编辑 */}
            {isEditing && (
              <Form.Item
                label="规则ID"
                field="ruleId"
              >
                <Input 
                  placeholder="规则ID"
                  disabled
                  style={{ 
                    backgroundColor: '#f7f8fa',
                    color: '#86909c',
                    fontFamily: 'monospace',
                    fontSize: '12px'
                  }}
                />
              </Form.Item>
            )}
            
            {/* 整箱海运费字段 */}
            {feeType === 'fcl' && (
              <>
                <Form.Item
                  label="航线名称"
                  field="routeName"
                  rules={[{ validator: validateAtLeastOne }]}
                >
                  <Select 
                    placeholder="请选择航线名称"
                    allowClear
                    onChange={() => {
                      // 触发其他字段的重新验证
                      setTimeout(() => {
                        form.validate(['shippingCompany', 'originPort']);
                      }, 0);
                    }}
                  >
                    {routeOptions.map(option => (
                      <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="船公司"
                  field="shippingCompany"
                  rules={[{ validator: validateAtLeastOne }]}
                >
                  <Select 
                    placeholder="请选择船公司"
                    allowClear
                    onChange={() => {
                      // 触发其他字段的重新验证
                      setTimeout(() => {
                        form.validate(['routeName', 'originPort']);
                      }, 0);
                    }}
                  >
                    {shippingCompanyOptions.map(option => (
                      <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="起运港"
                  field="originPort"
                  rules={[{ validator: validateAtLeastOne }]}
                >
                  <Select 
                    placeholder="请选择起运港"
                    allowClear
                    onChange={() => {
                      // 触发其他字段的重新验证
                      setTimeout(() => {
                        form.validate(['routeName', 'shippingCompany']);
                      }, 0);
                    }}
                  >
                    {originPortOptions.map(option => (
                      <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="费用名称"
                  field="chargeName"
                  rules={[{ required: true, message: '请选择费用名称' }]}
                >
                  <Select 
                    placeholder="请选择费用名称"
                    onChange={handleChargeNameChange}
                  >
                    {chargeNameOptions.map(option => (
                      <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </>
            )}

            {/* 港前运价字段 */}
            {feeType === 'precarriage' && (
              <>
                <Form.Item
                  label="起运地"
                  field="origin"
                  rules={[{ required: true, message: '请选择起运地' }]}
                >
                  <Select placeholder="请选择起运地">
                    {originOptions.map(option => (
                      <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="目的港"
                  field="destination"
                  rules={[{ required: true, message: '请选择目的港' }]}
                >
                  <Select placeholder="请选择目的港">
                    {destinationPortOptions.map(option => (
                      <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="船公司"
                  field="shippingCompany"
                  rules={[{ required: true, message: '请选择船公司' }]}
                >
                  <Select placeholder="请选择船公司">
                    {shippingCompanyOptions.map(option => (
                      <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="费用名称"
                  field="chargeName"
                  rules={[{ required: true, message: '请选择费用名称' }]}
                >
                  <Select 
                    placeholder="请选择费用名称"
                    onChange={handleChargeNameChange}
                  >
                    {precarriageChargeNameOptions.map(option => (
                      <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </>
            )}

            {/* 尾程运价字段 */}
            {feeType === 'lastmile' && (
              <>
                <Form.Item
                  label="目的港"
                  field="origin"
                  rules={[{ required: true, message: '请选择目的港' }]}
                >
                  <Select placeholder="请选择目的港">
                    {destinationPortOptionsLastmile.map(option => (
                      <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="配送地址"
                  field="destination"
                  rules={[{ required: true, message: '请选择配送地址' }]}
                >
                  <Select placeholder="请选择配送地址">
                    {deliveryAddressOptions.map(option => (
                      <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="船公司"
                  field="shippingCompany"
                  rules={[{ required: true, message: '请选择船公司' }]}
                >
                  <Select placeholder="请选择船公司">
                    {shippingCompanyOptions.map(option => (
                      <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="费用名称"
                  field="chargeName"
                  rules={[{ required: true, message: '请选择费用名称' }]}
                >
                  <Select 
                    placeholder="请选择费用名称"
                    onChange={handleChargeNameChange}
                  >
                    {lastmileChargeNameOptions.map(option => (
                      <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </>
            )}
            
            <Form.Item
              label="币种"
              field="currency"
              rules={[{ required: true, message: '币种不能为空' }]}
            >
              <Input 
                value={formData.currency || '请选择费用名称'}
                placeholder="自动设置"
                disabled={true}
                style={{ 
                  backgroundColor: '#f7f8fa',
                  color: '#86909c'
                }}
              />
            </Form.Item>

            <Form.Item
              label="有效期开始"
              field="validPeriodStart"
              rules={[{ required: true, message: '请选择有效期开始日期' }]}
            >
              <DatePicker 
                placeholder="请选择开始日期"
                style={{ width: '100%' }}
                format="YYYY-MM-DD"
              />
            </Form.Item>

            <Form.Item
              label="有效期结束"
              field="validPeriodEnd"
              rules={[{ required: true, message: '请选择有效期结束日期' }]}
            >
              <DatePicker 
                placeholder="请选择结束日期"
                style={{ width: '100%' }}
                format="YYYY-MM-DD"
              />
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