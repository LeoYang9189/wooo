import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Checkbox,
  Modal,
  Input,
  Select,
  Message,
  Popconfirm,
  Typography,
  Dropdown
} from '@arco-design/web-react';
import {
  IconPlus,
  IconSearch,
  IconRefresh,
  IconMore
} from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { Title } = Typography;

// 加价规则数据接口
interface PricingRule {
  id: string;
  routeName: string; // 航线名称
  containerType: string; // 箱型
  currency: 'USD' | 'CNY'; // 币种
  t0Price: number; // T0加价
  t1Price: number; // T1加价
  t2Price: number; // T2加价
  t3Price: number; // T3加价
  internalSalesPrice: number; // 内部销售加价
  status: 'enabled' | 'disabled'; // 状态
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
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

// 搜索筛选参数
interface SearchParams {
  keyword: string;
  routeName: string;
  containerType: string;
  currency: string;
  status: string;
}

const PricingRuleManagement: React.FC = () => {
  const navigate = useNavigate();
  const [pricingRuleData, setPricingRuleData] = useState<PricingRule[]>([]);
  const [filteredData, setFilteredData] = useState<PricingRule[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [currentRule, setCurrentRule] = useState<PricingRule | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    keyword: '',
    routeName: '',
    containerType: '',
    currency: '',
    status: ''
  });

  // 初始化示例数据
  useEffect(() => {
    const mockData: PricingRule[] = [
      {
        id: '1',
        routeName: '亚欧航线',
        containerType: '20GP',
        currency: 'USD',
        t0Price: 50,
        t1Price: 100,
        t2Price: 150,
        t3Price: 200,
        internalSalesPrice: 80,
        status: 'enabled',
        createTime: '2024-01-15 10:30:00',
        updateTime: '2024-01-15 10:30:00'
      },
      {
        id: '2',
        routeName: '亚欧航线',
        containerType: '40GP',
        currency: 'USD',
        t0Price: 80,
        t1Price: 160,
        t2Price: 240,
        t3Price: 320,
        internalSalesPrice: 120,
        status: 'enabled',
        createTime: '2024-01-15 10:35:00',
        updateTime: '2024-01-15 10:35:00'
      },
      {
        id: '3',
        routeName: '跨太平洋航线',
        containerType: '20GP',
        currency: 'USD',
        t0Price: 60,
        t1Price: 120,
        t2Price: 180,
        t3Price: 240,
        internalSalesPrice: 90,
        status: 'enabled',
        createTime: '2024-01-16 09:20:00',
        updateTime: '2024-01-16 09:20:00'
      },
      {
        id: '4',
        routeName: '跨太平洋航线',
        containerType: '40HQ',
        currency: 'USD',
        t0Price: 90,
        t1Price: 180,
        t2Price: 270,
        t3Price: 360,
        internalSalesPrice: 135,
        status: 'disabled',
        createTime: '2024-01-16 09:25:00',
        updateTime: '2024-01-16 14:15:00'
      },
      {
        id: '5',
        routeName: '亚美航线',
        containerType: '20RF',
        currency: 'CNY',
        t0Price: 400,
        t1Price: 800,
        t2Price: 1200,
        t3Price: 1600,
        internalSalesPrice: 600,
        status: 'enabled',
        createTime: '2024-01-17 11:10:00',
        updateTime: '2024-01-17 11:10:00'
      },
      {
        id: '6',
        routeName: '地中海航线',
        containerType: '40RF',
        currency: 'CNY',
        t0Price: 600,
        t1Price: 1200,
        t2Price: 1800,
        t3Price: 2400,
        internalSalesPrice: 900,
        status: 'enabled',
        createTime: '2024-01-17 11:15:00',
        updateTime: '2024-01-17 11:15:00'
      },
      {
        id: '7',
        routeName: '中东航线',
        containerType: '45HQ',
        currency: 'USD',
        t0Price: 100,
        t1Price: 200,
        t2Price: 300,
        t3Price: 400,
        internalSalesPrice: 150,
        status: 'enabled',
        createTime: '2024-01-18 08:45:00',
        updateTime: '2024-01-18 08:45:00'
      },
      {
        id: '8',
        routeName: '非洲航线',
        containerType: '20OT',
        currency: 'USD',
        t0Price: 70,
        t1Price: 140,
        t2Price: 210,
        t3Price: 280,
        internalSalesPrice: 105,
        status: 'disabled',
        createTime: '2024-01-18 14:20:00',
        updateTime: '2024-01-18 16:30:00'
      },
      {
        id: '9',
        routeName: '欧美航线',
        containerType: '40FR',
        currency: 'CNY',
        t0Price: 500,
        t1Price: 1000,
        t2Price: 1500,
        t3Price: 2000,
        internalSalesPrice: 750,
        status: 'enabled',
        createTime: '2024-01-19 13:15:00',
        updateTime: '2024-01-19 13:15:00'
      },
      {
        id: '10',
        routeName: '波罗的海航线',
        containerType: '20FR',
        currency: 'USD',
        t0Price: 55,
        t1Price: 110,
        t2Price: 165,
        t3Price: 220,
        internalSalesPrice: 82,
        status: 'enabled',
        createTime: '2024-01-19 15:40:00',
        updateTime: '2024-01-19 15:40:00'
      }
    ];

    setPricingRuleData(mockData);
    setFilteredData(mockData);
  }, []);

  // 搜索处理
  const handleSearch = () => {
    let filtered = pricingRuleData;

    if (searchParams.keyword) {
      filtered = filtered.filter(item =>
        item.routeName.includes(searchParams.keyword) ||
        item.containerType.toLowerCase().includes(searchParams.keyword.toLowerCase())
      );
    }

    if (searchParams.routeName) {
      filtered = filtered.filter(item => item.routeName === searchParams.routeName);
    }

    if (searchParams.containerType) {
      filtered = filtered.filter(item => item.containerType === searchParams.containerType);
    }

    if (searchParams.currency) {
      filtered = filtered.filter(item => item.currency === searchParams.currency);
    }

    if (searchParams.status) {
      filtered = filtered.filter(item => item.status === searchParams.status);
    }

    setFilteredData(filtered);
    setSelectedRowKeys([]);
  };

  // 重置搜索
  const handleReset = () => {
    setSearchParams({
      keyword: '',
      routeName: '',
      containerType: '',
      currency: '',
      status: ''
    });
    setFilteredData(pricingRuleData);
    setSelectedRowKeys([]);
  };

  // 切换状态
  const handleToggleStatus = (id: string, currentStatus: 'enabled' | 'disabled') => {
    const newStatus = currentStatus === 'enabled' ? 'disabled' : 'enabled';
    const newData = pricingRuleData.map(item =>
      item.id === id ? { ...item, status: newStatus, updateTime: new Date().toLocaleString('zh-CN') } : item
    );
    setPricingRuleData(newData as PricingRule[]);
    setFilteredData(newData as PricingRule[]);
    Message.success(`已${newStatus === 'enabled' ? '启用' : '禁用'}`);
  };

  // 表格列定义
  const columns = [
    {
      title: (
        <Checkbox
          indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < filteredData.length}
          checked={selectedRowKeys.length === filteredData.length && filteredData.length > 0}
          onChange={(checked) => {
            if (checked) {
              setSelectedRowKeys(filteredData.map(item => item.id));
            } else {
              setSelectedRowKeys([]);
            }
          }}
        />
      ),
      dataIndex: 'checkbox',
      width: 60,
      render: (_: unknown, record: PricingRule) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.id)}
          onChange={(checked) => {
            if (checked) {
              setSelectedRowKeys([...selectedRowKeys, record.id]);
            } else {
              setSelectedRowKeys(selectedRowKeys.filter(key => key !== record.id));
            }
          }}
        />
      ),
    },
    {
      title: '航线名称',
      dataIndex: 'routeName',
      width: 150,
    },
    {
      title: '箱型',
      dataIndex: 'containerType',
      width: 100,
      render: (containerType: string) => (
        <Tag color="blue">{containerType}</Tag>
      )
    },
    {
      title: '币种',
      dataIndex: 'currency',
      width: 80,
      render: (currency: string) => (
        <Tag color={currency === 'USD' ? 'green' : 'orange'}>{currency}</Tag>
      )
    },
    {
      title: 'T0加价',
      dataIndex: 't0Price',
      width: 100,
      render: (price: number, record: PricingRule) => `${price} ${record.currency}`
    },
    {
      title: 'T1加价',
      dataIndex: 't1Price',
      width: 100,
      render: (price: number, record: PricingRule) => `${price} ${record.currency}`
    },
    {
      title: 'T2加价',
      dataIndex: 't2Price',
      width: 100,
      render: (price: number, record: PricingRule) => `${price} ${record.currency}`
    },
    {
      title: 'T3加价',
      dataIndex: 't3Price',
      width: 100,
      render: (price: number, record: PricingRule) => `${price} ${record.currency}`
    },
    {
      title: '内部销售',
      dataIndex: 'internalSalesPrice',
      width: 100,
      render: (price: number, record: PricingRule) => `${price} ${record.currency}`
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: 'enabled' | 'disabled') => (
        <Tag color={status === 'enabled' ? 'green' : 'red'}>
          {status === 'enabled' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      width: 160,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 200,
      fixed: 'right' as const,
      render: (_: unknown, record: PricingRule) => (
        <Space>
          <Button
            type="text"
            size="small"
            onClick={() => handleDetail(record)}
          >
            详情
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Dropdown
            droplist={
              <div style={{ padding: '4px 0' }}>
                <Button
                  type="text"
                  size="small"
                  style={{ width: '100%', justifyContent: 'flex-start' }}
                  onClick={() => handleToggleStatus(record.id, record.status)}
                >
                  {record.status === 'enabled' ? '禁用' : '启用'}
                </Button>
              </div>
            }
            trigger="click"
          >
            <Button
              type="text"
              size="small"
              icon={<IconMore />}
            >
              更多
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  // 详情处理
  const handleDetail = (record: PricingRule) => {
    setCurrentRule(record);
    setDetailModalVisible(true);
  };

  // 编辑处理 - 跳转到编辑页面
  const handleEdit = (record: PricingRule) => {
    navigate(`/controltower/saas/pricing-rule-management/edit/${record.id}`);
  };

  // 新增处理 - 跳转到新增页面
  const handleAdd = () => {
    navigate('/controltower/saas/pricing-rule-management/add');
  };

  // 批量删除
  const handleBatchDelete = () => {
    const newData = pricingRuleData.filter(item => !selectedRowKeys.includes(item.id));
    setPricingRuleData(newData);
    setFilteredData(newData);
    setSelectedRowKeys([]);
    Message.success(`已删除 ${selectedRowKeys.length} 条记录`);
  };

  return (
    <Card>
      <div style={{ marginBottom: '20px' }}>
        <Title heading={4} style={{ margin: 0 }}>加价规则维护</Title>
      </div>

      {/* 搜索筛选区域 */}
      <Card style={{ marginBottom: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr auto', gap: '16px', alignItems: 'flex-end' }}>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>关键词搜索</div>
            <Input
              placeholder="航线名称、箱型"
              value={searchParams.keyword}
              onChange={(value) => setSearchParams(prev => ({ ...prev, keyword: value }))}
            />
          </div>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>航线名称</div>
            <Select
              placeholder="选择航线"
              value={searchParams.routeName}
              onChange={(value) => setSearchParams(prev => ({ ...prev, routeName: value }))}
              allowClear
            >
              {routeOptions.map(option => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
              ))}
            </Select>
          </div>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>箱型</div>
            <Select
              placeholder="选择箱型"
              value={searchParams.containerType}
              onChange={(value) => setSearchParams(prev => ({ ...prev, containerType: value }))}
              allowClear
            >
              {containerTypeOptions.map(option => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
              ))}
            </Select>
          </div>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>币种</div>
            <Select
              placeholder="选择币种"
              value={searchParams.currency}
              onChange={(value) => setSearchParams(prev => ({ ...prev, currency: value }))}
              allowClear
            >
              {currencyOptions.map(option => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
              ))}
            </Select>
          </div>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>状态</div>
            <Select
              placeholder="选择状态"
              value={searchParams.status}
              onChange={(value) => setSearchParams(prev => ({ ...prev, status: value }))}
              allowClear
            >
              <Option value="enabled">启用</Option>
              <Option value="disabled">禁用</Option>
            </Select>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button type="primary" icon={<IconSearch />} onClick={handleSearch}>
              搜索
            </Button>
            <Button icon={<IconRefresh />} onClick={handleReset}>
              重置
            </Button>
          </div>
        </div>
      </Card>

      {/* 操作按钮区域 */}
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button type="primary" icon={<IconPlus />} onClick={handleAdd}>
              新增规则
            </Button>
          </div>
          {selectedRowKeys.length > 0 && (
            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              paddingLeft: '12px', 
              borderLeft: '1px solid #e5e6e7',
              marginLeft: '4px'
            }}>
              <Popconfirm
                title={`确定要删除选中的 ${selectedRowKeys.length} 条记录吗？`}
                onOk={handleBatchDelete}
              >
                <Button type="outline" status="danger">
                  批量删除 ({selectedRowKeys.length})
                </Button>
              </Popconfirm>
            </div>
          )}
        </div>
      </div>

      <Table
        columns={columns}
        data={filteredData}
        rowKey="id"
        scroll={{ x: 1600 }}
        pagination={{
          pageSize: 10,
          showTotal: true,
          showJumper: true,
          sizeCanChange: true,
        }}
      />

      {/* 详情弹窗 */}
      <Modal
        title="加价规则详情"
        visible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={
          <Button onClick={() => setDetailModalVisible(false)}>
            关闭
          </Button>
        }
        style={{ width: '600px' }}
      >
        {currentRule && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>航线名称</div>
                <div>{currentRule.routeName}</div>
              </div>
              <div>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>箱型</div>
                <div>
                  <Tag color="blue">{currentRule.containerType}</Tag>
                </div>
              </div>
              <div>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>币种</div>
                <div>
                  <Tag color={currentRule.currency === 'USD' ? 'green' : 'orange'}>{currentRule.currency}</Tag>
                </div>
              </div>
              <div>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>状态</div>
                <div>
                  <Tag color={currentRule.status === 'enabled' ? 'green' : 'red'}>
                    {currentRule.status === 'enabled' ? '启用' : '禁用'}
                  </Tag>
                </div>
              </div>
              <div>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>T0加价</div>
                <div>{currentRule.t0Price} {currentRule.currency}</div>
              </div>
              <div>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>T1加价</div>
                <div>{currentRule.t1Price} {currentRule.currency}</div>
              </div>
              <div>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>T2加价</div>
                <div>{currentRule.t2Price} {currentRule.currency}</div>
              </div>
              <div>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>T3加价</div>
                <div>{currentRule.t3Price} {currentRule.currency}</div>
              </div>
              <div>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>内部销售</div>
                <div>{currentRule.internalSalesPrice} {currentRule.currency}</div>
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>创建时间</div>
                  <div>{currentRule.createTime}</div>
                </div>
                <div>
                  <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>更新时间</div>
                  <div>{currentRule.updateTime}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default PricingRuleManagement; 