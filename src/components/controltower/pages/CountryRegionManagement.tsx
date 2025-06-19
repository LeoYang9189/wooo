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
  Typography
} from '@arco-design/web-react';
import {
  IconPlus,
  IconEdit,
  IconSearch,
  IconRefresh
} from '@arco-design/web-react/icon';

const { Option } = Select;
const { Title } = Typography;

// 国家（地区）数据接口
interface CountryRegion {
  id: string;
  nameEn: string;
  nameCn: string;
  code: string;
  continent: string;
  areaCode: string;
  status: 'enabled' | 'disabled';
}

// 大洲选项
const continentOptions = [
  { value: 'Asia', label: '亚洲' },
  { value: 'Europe', label: '欧洲' },
  { value: 'North America', label: '北美洲' },
  { value: 'South America', label: '南美洲' },
  { value: 'Africa', label: '非洲' },
  { value: 'Oceania', label: '大洋洲' },
  { value: 'Antarctica', label: '南极洲' }
];

// 搜索筛选参数
interface SearchParams {
  keyword: string;
  continent: string;
  status: string;
}

const CountryRegionManagement: React.FC = () => {
  const [countryData, setCountryData] = useState<CountryRegion[]>([]);
  const [filteredData, setFilteredData] = useState<CountryRegion[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<CountryRegion | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    keyword: '',
    continent: '',
    status: ''
  });
  const [editForm] = Form.useForm();

  // 初始化示例数据
  useEffect(() => {
    const mockData: CountryRegion[] = [
      {
        id: '1',
        nameEn: 'China',
        nameCn: '中国',
        code: 'CN',
        continent: 'Asia',
        areaCode: '+86',
        status: 'enabled' as const
      },
      {
        id: '2',
        nameEn: 'United States',
        nameCn: '美国',
        code: 'US',
        continent: 'North America',
        areaCode: '+1',
        status: 'enabled' as const
      },
      {
        id: '3',
        nameEn: 'United Kingdom',
        nameCn: '英国',
        code: 'GB',
        continent: 'Europe',
        areaCode: '+44',
        status: 'enabled' as const
      },
      {
        id: '4',
        nameEn: 'Germany',
        nameCn: '德国',
        code: 'DE',
        continent: 'Europe',
        areaCode: '+49',
        status: 'disabled' as const
      },
      {
        id: '5',
        nameEn: 'Japan',
        nameCn: '日本',
        code: 'JP',
        continent: 'Asia',
        areaCode: '+81',
        status: 'enabled' as const
      }
    ];

    setCountryData(mockData);
    setFilteredData(mockData);
  }, []);

  // 搜索筛选功能
  const handleSearch = () => {
    let filtered = countryData;

    // 关键词搜索
    if (searchParams.keyword) {
      filtered = filtered.filter(country => 
        country.nameEn.toLowerCase().includes(searchParams.keyword.toLowerCase()) ||
        country.nameCn.includes(searchParams.keyword) ||
        country.code.toLowerCase().includes(searchParams.keyword.toLowerCase())
      );
    }

    // 大洲筛选
    if (searchParams.continent) {
      filtered = filtered.filter(country => country.continent === searchParams.continent);
    }

    // 状态筛选
    if (searchParams.status) {
      filtered = filtered.filter(country => country.status === searchParams.status);
    }

    setFilteredData(filtered);
  };

  // 重置搜索
  const handleReset = () => {
    setSearchParams({
      keyword: '',
      continent: '',
      status: ''
    });
    setFilteredData(countryData);
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
      render: (_: unknown, record: CountryRegion) => (
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
      title: '英文名',
      dataIndex: 'nameEn',
      width: 200,
    },
    {
      title: '中文名',
      dataIndex: 'nameCn',
      width: 150,
    },
    {
      title: '代码',
      dataIndex: 'code',
      width: 100,
    },
    {
      title: '大洲',
      dataIndex: 'continent',
      width: 120,
      render: (continent: string) => {
        const continentOption = continentOptions.find(option => option.value === continent);
        return continentOption ? continentOption.label : continent;
      }
    },
    {
      title: '区号',
      dataIndex: 'areaCode',
      width: 100,
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
      width: 150,
      fixed: 'right' as const,
      render: (_: unknown, record: CountryRegion) => (
        <Space>
          <Button
            type="text"
            size="small"
            icon={<IconEdit />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title={`确定要${record.status === 'enabled' ? '禁用' : '启用'}此国家（地区）吗？`}
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
        </Space>
      ),
    },
  ];

  // 处理编辑
  const handleEdit = (record: CountryRegion) => {
    setCurrentCountry(record);
    setIsEditing(true);
    editForm.setFieldsValue({
      nameEn: record.nameEn,
      nameCn: record.nameCn,
      code: record.code,
      continent: record.continent,
      areaCode: record.areaCode
    });
    setEditModalVisible(true);
  };

  // 处理新增
  const handleAdd = () => {
    setCurrentCountry(null);
    setIsEditing(false);
    editForm.resetFields();
    setEditModalVisible(true);
  };

  // 处理状态切换
  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'enabled' ? 'disabled' : 'enabled';
    setCountryData(prev => prev.map(country => 
      country.id === id ? { ...country, status: newStatus } : country
    ));
    setFilteredData(prev => prev.map(country => 
      country.id === id ? { ...country, status: newStatus } : country
    ));
    Message.success(`国家（地区）已${newStatus === 'enabled' ? '启用' : '禁用'}`);
  };

  // 批量启用
  const handleBatchEnable = () => {
    if (selectedRowKeys.length === 0) {
      Message.warning('请选择要启用的国家（地区）');
      return;
    }
    
    setCountryData(prev => prev.map(country => 
      selectedRowKeys.includes(country.id) ? { ...country, status: 'enabled' } : country
    ));
    setFilteredData(prev => prev.map(country => 
      selectedRowKeys.includes(country.id) ? { ...country, status: 'enabled' } : country
    ));
    
    setSelectedRowKeys([]);
    Message.success(`已启用 ${selectedRowKeys.length} 个国家（地区）`);
  };

  // 批量禁用
  const handleBatchDisable = () => {
    if (selectedRowKeys.length === 0) {
      Message.warning('请选择要禁用的国家（地区）');
      return;
    }
    
    setCountryData(prev => prev.map(country => 
      selectedRowKeys.includes(country.id) ? { ...country, status: 'disabled' } : country
    ));
    setFilteredData(prev => prev.map(country => 
      selectedRowKeys.includes(country.id) ? { ...country, status: 'disabled' } : country
    ));
    
    setSelectedRowKeys([]);
    Message.success(`已禁用 ${selectedRowKeys.length} 个国家（地区）`);
  };

  // 保存国家（地区）编辑
  const handleSaveCountry = async () => {
    try {
      const values = await editForm.validate();
      
      const countryDataItem = {
        ...values,
        id: isEditing ? currentCountry?.id : Date.now().toString(),
        status: isEditing ? currentCountry?.status : 'enabled' as const
      };

      if (isEditing) {
        // 更新现有国家（地区）
        setCountryData(prev => prev.map(country => 
          country.id === currentCountry?.id ? { ...country, ...countryDataItem } : country
        ));
        setFilteredData(prev => prev.map(country => 
          country.id === currentCountry?.id ? { ...country, ...countryDataItem } : country
        ));
        Message.success('国家（地区）信息已更新');
      } else {
        // 新增国家（地区）
        const newCountry = { ...countryDataItem, id: Date.now().toString() };
        setCountryData(prev => [...prev, newCountry]);
        setFilteredData(prev => [...prev, newCountry]);
        Message.success('国家（地区）已添加');
      }

      setEditModalVisible(false);
      editForm.resetFields();
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  return (
    <Card>
      <div style={{ marginBottom: '20px' }}>
        <Title heading={4} style={{ margin: 0 }}>国家（地区）管理</Title>
      </div>

      {/* 搜索筛选区域 */}
      <Card style={{ marginBottom: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '16px', alignItems: 'flex-end' }}>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>关键词搜索</div>
            <Input
              placeholder="国家名称、代码"
              value={searchParams.keyword}
              onChange={(value) => setSearchParams(prev => ({ ...prev, keyword: value }))}
            />
          </div>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>大洲</div>
            <Select
              placeholder="选择大洲"
              value={searchParams.continent}
              onChange={(value) => setSearchParams(prev => ({ ...prev, continent: value }))}
              allowClear
            >
              {continentOptions.map(option => (
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
              新增国家（地区）
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
        scroll={{ x: 1000 }}
        pagination={{
          pageSize: 10,
          showTotal: true,
          showJumper: true,
          sizeCanChange: true,
        }}
      />

      {/* 新增/编辑国家（地区）弹窗 */}
      <Modal
        title={isEditing ? '编辑国家（地区）' : '新增国家（地区）'}
        visible={editModalVisible}
        onOk={handleSaveCountry}
        onCancel={() => setEditModalVisible(false)}
        style={{ width: 600 }}
      >
        <Form form={editForm} layout="vertical">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              field="nameEn"
              label="英文名"
              rules={[{ required: true, message: '请输入英文名' }]}
            >
              <Input placeholder="请输入英文名，如：China" />
            </Form.Item>
            
            <Form.Item
              field="nameCn"
              label="中文名"
              rules={[{ required: true, message: '请输入中文名' }]}
            >
              <Input placeholder="请输入中文名，如：中国" />
            </Form.Item>
            
            <Form.Item
              field="code"
              label="代码"
              rules={[
                { required: true, message: '请输入代码' },
                { 
                  validator: (value, callback) => {
                    if (value && !/^[A-Z]{2}$/.test(value)) {
                      callback('代码必须为2位大写字母');
                    } else {
                      callback();
                    }
                  }
                }
              ]}
            >
              <Input placeholder="请输入2位代码，如：CN" maxLength={2} style={{ textTransform: 'uppercase' }} />
            </Form.Item>
            
            <Form.Item
              field="continent"
              label="大洲"
              rules={[{ required: true, message: '请选择大洲' }]}
            >
              <Select placeholder="请选择大洲">
                {continentOptions.map(option => (
                  <Option key={option.value} value={option.value}>{option.label}</Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item
              field="areaCode"
              label="区号"
              rules={[
                { required: true, message: '请输入区号' },
                { 
                  validator: (value, callback) => {
                    if (value && !/^\+\d{1,4}$/.test(value)) {
                      callback('区号格式不正确，如：+86');
                    } else {
                      callback();
                    }
                  }
                }
              ]}
            >
              <Input placeholder="请输入区号，如：+86" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </Card>
  );
};

export default CountryRegionManagement; 