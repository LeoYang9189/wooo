import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Checkbox,
  Modal,
  Form,
  Input,
  Select,
  Message,
  Popconfirm,
  Typography,
  DatePicker
} from '@arco-design/web-react';
import {
  IconPlus,
  IconEdit,
  IconSearch,
  IconRefresh,
  IconEye,
  IconSettings
} from '@arco-design/web-react/icon';

const { Title } = Typography;
const { Option } = Select;

// 币种数据接口
interface Currency {
  id: string;
  code: string; // 币种代码
  nameEn: string; // 名称（英文）
  nameCn: string; // 名称（中文）
  symbol: string; // 符号
  exchangeRate?: number; // 汇率
  exchangeRateValidDate?: string; // 汇率有效期
  status: 'enabled' | 'disabled';
}

// 搜索筛选参数
interface SearchParams {
  keyword: string;
  status: string;
}

const CurrencyManagement: React.FC = () => {
  const [currencyData, setCurrencyData] = useState<Currency[]>([]);
  const [filteredData, setFilteredData] = useState<Currency[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [exchangeRateModalVisible, setExchangeRateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState<Currency | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    keyword: '',
    status: ''
  });
  const [editForm] = Form.useForm();
  const [exchangeRateForm] = Form.useForm();

  // 初始化示例数据
  useEffect(() => {
    const mockData: Currency[] = [
      {
        id: '1',
        code: 'USD',
        nameEn: 'United States Dollar',
        nameCn: '美元',
        symbol: '$',
        exchangeRate: 1.0000,
        exchangeRateValidDate: '2024-12-31',
        status: 'enabled'
      },
      {
        id: '2',
        code: 'CNY',
        nameEn: 'Chinese Yuan',
        nameCn: '人民币',
        symbol: '¥',
        exchangeRate: 7.2500,
        exchangeRateValidDate: '2024-12-31',
        status: 'enabled'
      },
      {
        id: '3',
        code: 'EUR',
        nameEn: 'Euro',
        nameCn: '欧元',
        symbol: '€',
        exchangeRate: 0.9200,
        exchangeRateValidDate: '2024-12-31',
        status: 'enabled'
      },
      {
        id: '4',
        code: 'JPY',
        nameEn: 'Japanese Yen',
        nameCn: '日元',
        symbol: '¥',
        exchangeRate: 150.0000,
        exchangeRateValidDate: '2024-12-31',
        status: 'enabled'
      },
      {
        id: '5',
        code: 'GBP',
        nameEn: 'British Pound',
        nameCn: '英镑',
        symbol: '£',
        exchangeRate: 0.7900,
        exchangeRateValidDate: '2024-12-31',
        status: 'disabled'
      }
    ];

    setCurrencyData(mockData);
    setFilteredData(mockData);
  }, []);

  // 搜索筛选功能
  const handleSearch = () => {
    let filtered = currencyData;

    // 关键词搜索
    if (searchParams.keyword) {
      filtered = filtered.filter(currency => 
        currency.code.toLowerCase().includes(searchParams.keyword.toLowerCase()) ||
        currency.nameEn.toLowerCase().includes(searchParams.keyword.toLowerCase()) ||
        currency.nameCn.includes(searchParams.keyword) ||
        currency.symbol.includes(searchParams.keyword)
      );
    }

    // 状态筛选
    if (searchParams.status) {
      filtered = filtered.filter(currency => currency.status === searchParams.status);
    }

    setFilteredData(filtered);
  };

  // 重置搜索
  const handleReset = () => {
    setSearchParams({
      keyword: '',
      status: ''
    });
    setFilteredData(currencyData);
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
      render: (_: unknown, record: Currency) => (
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
      title: '币种代码',
      dataIndex: 'code',
      width: 120,
    },
    {
      title: '名称（英文）',
      dataIndex: 'nameEn',
      width: 200,
    },
    {
      title: '名称（中文）',
      dataIndex: 'nameCn',
      width: 150,
    },
    {
      title: '符号',
      dataIndex: 'symbol',
      width: 100,
    },
    {
      title: '汇率',
      dataIndex: 'exchangeRate',
      width: 120,
      render: (rate: number) => rate ? rate.toFixed(4) : '-',
    },
    {
      title: '汇率有效期',
      dataIndex: 'exchangeRateValidDate',
      width: 150,
      render: (date: string) => date || '-',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'enabled' ? 'green' : 'red'}>
          {status === 'enabled' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 280,
      fixed: 'right' as const,
      render: (_: unknown, record: Currency) => (
        <Space>
          <Button
            type="text"
            size="small"
            icon={<IconEye />}
            onClick={() => handleDetail(record)}
          >
            详情
          </Button>
          <Button
            type="text"
            size="small"
            icon={<IconEdit />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title={`确定要${record.status === 'enabled' ? '禁用' : '启用'}此币种吗？`}
            onOk={() => handleToggleStatus(record.id, record.status)}
          >
            <Button 
              type="text" 
              size="small" 
              status={record.status === 'enabled' ? 'warning' : 'success'}
            >
              {record.status === 'enabled' ? '禁用' : '启用'}
            </Button>
          </Popconfirm>
          <Button
            type="text"
            size="small"
            icon={<IconSettings />}
            onClick={() => handleExchangeRateSetting(record)}
          >
            设置汇率
          </Button>
        </Space>
      ),
    },
  ];

  // 处理详情
  const handleDetail = (record: Currency) => {
    setCurrentCurrency(record);
    setDetailModalVisible(true);
  };

  // 处理编辑
  const handleEdit = (record: Currency) => {
    setCurrentCurrency(record);
    setIsEditing(true);
    editForm.setFieldsValue({
      code: record.code,
      nameEn: record.nameEn,
      nameCn: record.nameCn,
      symbol: record.symbol
    });
    setEditModalVisible(true);
  };

  // 处理新增
  const handleAdd = () => {
    setCurrentCurrency(null);
    setIsEditing(false);
    editForm.resetFields();
    setEditModalVisible(true);
  };

  // 处理状态切换
  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'enabled' ? 'disabled' : 'enabled';
    setCurrencyData(prev => prev.map(currency => 
      currency.id === id ? { ...currency, status: newStatus } : currency
    ));
    setFilteredData(prev => prev.map(currency => 
      currency.id === id ? { ...currency, status: newStatus } : currency
    ));
    Message.success(`币种已${newStatus === 'enabled' ? '启用' : '禁用'}`);
  };

  // 批量启用
  const handleBatchEnable = () => {
    if (selectedRowKeys.length === 0) {
      Message.warning('请选择要启用的币种');
      return;
    }
    
    setCurrencyData(prev => prev.map(currency => 
      selectedRowKeys.includes(currency.id) ? { ...currency, status: 'enabled' } : currency
    ));
    setFilteredData(prev => prev.map(currency => 
      selectedRowKeys.includes(currency.id) ? { ...currency, status: 'enabled' } : currency
    ));
    
    setSelectedRowKeys([]);
    Message.success(`已启用 ${selectedRowKeys.length} 个币种`);
  };

  // 批量禁用
  const handleBatchDisable = () => {
    if (selectedRowKeys.length === 0) {
      Message.warning('请选择要禁用的币种');
      return;
    }
    
    setCurrencyData(prev => prev.map(currency => 
      selectedRowKeys.includes(currency.id) ? { ...currency, status: 'disabled' } : currency
    ));
    setFilteredData(prev => prev.map(currency => 
      selectedRowKeys.includes(currency.id) ? { ...currency, status: 'disabled' } : currency
    ));
    
    setSelectedRowKeys([]);
    Message.success(`已禁用 ${selectedRowKeys.length} 个币种`);
  };

  // 处理汇率设置
  const handleExchangeRateSetting = (record: Currency) => {
    setCurrentCurrency(record);
    exchangeRateForm.setFieldsValue({
      exchangeRate: record.exchangeRate,
      exchangeRateValidDate: record.exchangeRateValidDate
    });
    setExchangeRateModalVisible(true);
  };

  // 保存币种编辑
  const handleSaveCurrency = async () => {
    try {
      const values = await editForm.validate();
      
      const currencyItem = {
        ...values,
        id: isEditing ? currentCurrency?.id : Date.now().toString(),
        exchangeRate: isEditing ? currentCurrency?.exchangeRate : undefined,
        exchangeRateValidDate: isEditing ? currentCurrency?.exchangeRateValidDate : undefined,
        status: isEditing ? currentCurrency?.status : 'enabled' as const
      };

      if (isEditing) {
        // 更新现有币种
        setCurrencyData(prev => prev.map(currency => 
          currency.id === currentCurrency?.id ? { ...currency, ...currencyItem } : currency
        ));
        setFilteredData(prev => prev.map(currency => 
          currency.id === currentCurrency?.id ? { ...currency, ...currencyItem } : currency
        ));
        Message.success('币种信息已更新');
      } else {
        // 新增币种
        const newCurrency = { ...currencyItem, id: Date.now().toString() };
        setCurrencyData(prev => [...prev, newCurrency]);
        setFilteredData(prev => [...prev, newCurrency]);
        Message.success('币种已添加');
      }

      setEditModalVisible(false);
      editForm.resetFields();
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  // 保存汇率设置
  const handleSaveExchangeRate = async () => {
    try {
      const values = await exchangeRateForm.validate();
      
      setCurrencyData(prev => prev.map(currency => 
        currency.id === currentCurrency?.id ? { 
          ...currency, 
          exchangeRate: values.exchangeRate,
          exchangeRateValidDate: values.exchangeRateValidDate
        } : currency
      ));
      setFilteredData(prev => prev.map(currency => 
        currency.id === currentCurrency?.id ? { 
          ...currency, 
          exchangeRate: values.exchangeRate,
          exchangeRateValidDate: values.exchangeRateValidDate
        } : currency
      ));

      setExchangeRateModalVisible(false);
      exchangeRateForm.resetFields();
      Message.success('汇率已保存');
    } catch (error) {
      console.error('保存汇率失败:', error);
    }
  };

  return (
    <Card>
      <div style={{ marginBottom: '20px' }}>
        <Title heading={4} style={{ margin: 0 }}>币种管理</Title>
      </div>

      {/* 搜索筛选区域 */}
      <Card style={{ marginBottom: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '16px', alignItems: 'flex-end' }}>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>关键词搜索</div>
            <Input
              placeholder="币种代码、名称、符号"
              value={searchParams.keyword}
              onChange={(value) => setSearchParams(prev => ({ ...prev, keyword: value }))}
            />
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
              新增币种
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
              <Button type="outline" onClick={handleBatchEnable}>
                批量启用 ({selectedRowKeys.length})
              </Button>
              <Button type="outline" status="warning" onClick={handleBatchDisable}>
                批量禁用 ({selectedRowKeys.length})
              </Button>
            </div>
          )}
        </div>
      </div>

      <Table
        columns={columns}
        data={filteredData}
        rowKey="id"
        scroll={{ x: 1400 }}
        pagination={{
          pageSize: 10,
          showTotal: true,
          showJumper: true,
          sizeCanChange: true,
        }}
      />

      {/* 详情弹窗 */}
      <Modal
        title="币种详情"
        visible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={
          <Button onClick={() => setDetailModalVisible(false)}>
            关闭
          </Button>
        }
        style={{ width: 500 }}
      >
        {currentCurrency && (
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '12px 16px', alignItems: 'center' }}>
            <span style={{ fontWeight: 500 }}>币种代码：</span>
            <span>{currentCurrency.code}</span>
            
            <span style={{ fontWeight: 500 }}>名称（英文）：</span>
            <span>{currentCurrency.nameEn}</span>
            
            <span style={{ fontWeight: 500 }}>名称（中文）：</span>
            <span>{currentCurrency.nameCn}</span>
            
            <span style={{ fontWeight: 500 }}>符号：</span>
            <span>{currentCurrency.symbol}</span>
            
            <span style={{ fontWeight: 500 }}>汇率：</span>
            <span>{currentCurrency.exchangeRate ? currentCurrency.exchangeRate.toFixed(4) : '-'}</span>
            
            <span style={{ fontWeight: 500 }}>汇率有效期：</span>
            <span>{currentCurrency.exchangeRateValidDate || '-'}</span>
            
            <span style={{ fontWeight: 500 }}>状态：</span>
            <Tag color={currentCurrency.status === 'enabled' ? 'green' : 'red'}>
              {currentCurrency.status === 'enabled' ? '启用' : '禁用'}
            </Tag>
          </div>
        )}
      </Modal>

      {/* 新增/编辑币种弹窗 */}
      <Modal
        title={isEditing ? '编辑币种' : '新增币种'}
        visible={editModalVisible}
        onOk={handleSaveCurrency}
        onCancel={() => setEditModalVisible(false)}
        style={{ width: 600 }}
      >
        <Form form={editForm} layout="vertical">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              field="code"
              label="币种代码"
              rules={[
                { required: true, message: '请输入币种代码' },
                { 
                  validator: (value, callback) => {
                    if (value && !/^[A-Z]{3}$/.test(value)) {
                      callback('币种代码必须为3位大写字母');
                    } else {
                      callback();
                    }
                  }
                }
              ]}
            >
              <Input placeholder="请输入3位代码，如：USD" maxLength={3} style={{ textTransform: 'uppercase' }} />
            </Form.Item>
            
            <Form.Item
              field="symbol"
              label="符号"
              rules={[{ required: true, message: '请输入符号' }]}
            >
              <Input placeholder="请输入符号，如：$" />
            </Form.Item>
            
            <Form.Item
              field="nameEn"
              label="名称（英文）"
              rules={[{ required: true, message: '请输入英文名称' }]}
            >
              <Input placeholder="请输入英文名称，如：US Dollar" />
            </Form.Item>
            
            <Form.Item
              field="nameCn"
              label="名称（中文）"
              rules={[{ required: true, message: '请输入中文名称' }]}
            >
              <Input placeholder="请输入中文名称，如：美元" />
            </Form.Item>
          </div>
        </Form>
      </Modal>

      {/* 汇率设置弹窗 */}
      <Modal
        title="设置汇率"
        visible={exchangeRateModalVisible}
        onOk={handleSaveExchangeRate}
        onCancel={() => setExchangeRateModalVisible(false)}
        style={{ width: 500 }}
      >
        <Form form={exchangeRateForm} layout="vertical">
          <Form.Item
            field="exchangeRate"
            label="汇率"
            rules={[
              { required: true, message: '请输入汇率' },
              { 
                validator: (value, callback) => {
                  if (value && (isNaN(value) || value <= 0)) {
                    callback('汇率必须为正数');
                  } else {
                    callback();
                  }
                }
              }
            ]}
          >
            <Input placeholder="请输入汇率，如：7.2500" type="number" step="0.0001" />
          </Form.Item>
          
          <Form.Item
            field="exchangeRateValidDate"
            label="有效期"
            rules={[{ required: true, message: '请选择有效期' }]}
          >
            <DatePicker placeholder="请选择有效期" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default CurrencyManagement; 