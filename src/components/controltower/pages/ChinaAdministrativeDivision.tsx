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
  Tabs
} from '@arco-design/web-react';
import {
  IconPlus,
  IconEdit,
  IconSearch,
  IconRefresh
} from '@arco-design/web-react/icon';

const { Option } = Select;
const { Title } = Typography;
const { TabPane } = Tabs;

// 行政区划级别
type DivisionLevel = 'province' | 'city' | 'district' | 'street';

// 行政区划数据接口
interface AdministrativeDivision {
  id: string;
  name: string;
  code: string;
  level: DivisionLevel;
  parentId?: string;
  parentName?: string;
  status: 'enabled' | 'disabled';
}

// 搜索筛选参数
interface SearchParams {
  keyword: string;
  status: string;
  parentId?: string;
}

// Tab配置
const tabConfig = [
  { key: 'province', title: '省', level: 'province' as DivisionLevel },
  { key: 'city', title: '市', level: 'city' as DivisionLevel },
  { key: 'district', title: '区/县', level: 'district' as DivisionLevel },
  { key: 'street', title: '街道/乡镇', level: 'street' as DivisionLevel }
];

const ChinaAdministrativeDivision: React.FC = () => {
  const [activeTab, setActiveTab] = useState('province');
  const [divisionData, setDivisionData] = useState<AdministrativeDivision[]>([]);
  const [filteredData, setFilteredData] = useState<AdministrativeDivision[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentDivision, setCurrentDivision] = useState<AdministrativeDivision | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    keyword: '',
    status: '',
    parentId: ''
  });
  const [editForm] = Form.useForm();

  // 初始化示例数据
  useEffect(() => {
    const mockData: AdministrativeDivision[] = [
      // 省份
      { id: '1', name: '广东省', code: '440000', level: 'province', status: 'enabled' },
      { id: '2', name: '北京市', code: '110000', level: 'province', status: 'enabled' },
      { id: '3', name: '上海市', code: '310000', level: 'province', status: 'enabled' },
      { id: '4', name: '浙江省', code: '330000', level: 'province', status: 'enabled' },
      
      // 城市
      { id: '5', name: '深圳市', code: '440300', level: 'city', parentId: '1', parentName: '广东省', status: 'enabled' },
      { id: '6', name: '广州市', code: '440100', level: 'city', parentId: '1', parentName: '广东省', status: 'enabled' },
      { id: '7', name: '杭州市', code: '330100', level: 'city', parentId: '4', parentName: '浙江省', status: 'enabled' },
      { id: '8', name: '宁波市', code: '330200', level: 'city', parentId: '4', parentName: '浙江省', status: 'enabled' },
      
      // 区县
      { id: '9', name: '南山区', code: '440305', level: 'district', parentId: '5', parentName: '深圳市', status: 'enabled' },
      { id: '10', name: '福田区', code: '440304', level: 'district', parentId: '5', parentName: '深圳市', status: 'enabled' },
      { id: '11', name: '天河区', code: '440106', level: 'district', parentId: '6', parentName: '广州市', status: 'enabled' },
      { id: '12', name: '西湖区', code: '330106', level: 'district', parentId: '7', parentName: '杭州市', status: 'enabled' },
      
      // 街道
      { id: '13', name: '粤海街道', code: '440305001', level: 'street', parentId: '9', parentName: '南山区', status: 'enabled' },
      { id: '14', name: '南头街道', code: '440305002', level: 'street', parentId: '9', parentName: '南山区', status: 'enabled' },
      { id: '15', name: '园岭街道', code: '440304001', level: 'street', parentId: '10', parentName: '福田区', status: 'enabled' },
      { id: '16', name: '沙头街道', code: '440304002', level: 'street', parentId: '10', parentName: '福田区', status: 'enabled' }
    ];

    setDivisionData(mockData);
    filterDataByLevel('province', mockData);
  }, []);

  // 根据级别筛选数据
  const filterDataByLevel = (level: string, data = divisionData) => {
    let filtered = data.filter(item => item.level === level);
    
    // 应用搜索条件
    if (searchParams.keyword) {
      filtered = filtered.filter(item => 
        item.name.includes(searchParams.keyword) ||
        item.code.includes(searchParams.keyword)
      );
    }
    
    if (searchParams.status) {
      filtered = filtered.filter(item => item.status === searchParams.status);
    }

    if (searchParams.parentId && level !== 'province') {
      filtered = filtered.filter(item => item.parentId === searchParams.parentId);
    }

    setFilteredData(filtered);
  };

  // Tab切换
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setSelectedRowKeys([]);
    filterDataByLevel(key);
  };

  // 搜索筛选功能
  const handleSearch = () => {
    filterDataByLevel(activeTab);
  };

  // 重置搜索
  const handleReset = () => {
    const newSearchParams = {
      keyword: '',
      status: '',
      parentId: ''
    };
    setSearchParams(newSearchParams);
    
    // 重置后重新筛选数据
    const filtered = divisionData.filter(item => item.level === activeTab);
    setFilteredData(filtered);
  };

  // 获取上级行政区划选项
  const getParentOptions = (level: DivisionLevel) => {
    const levelMap = {
      'city': 'province',
      'district': 'city', 
      'street': 'district'
    };
    
    const parentLevel = levelMap[level as keyof typeof levelMap];
    if (!parentLevel) return [];
    
    return divisionData
      .filter(item => item.level === parentLevel && item.status === 'enabled')
      .map(item => ({ value: item.id, label: item.name }));
  };

  // 表格列定义
  const getColumns = (level: DivisionLevel) => [
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
      render: (_: unknown, record: AdministrativeDivision) => (
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
      title: '名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '编码',
      dataIndex: 'code',
      width: 150,
    },
    ...(level !== 'province' ? [{
      title: '上级行政区划',
      dataIndex: 'parentName',
      width: 200,
    }] : []),
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
      width: 180,
      fixed: 'right' as const,
      render: (_: unknown, record: AdministrativeDivision) => (
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
            title={`确定要${record.status === 'enabled' ? '禁用' : '启用'}此行政区划吗？`}
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
  const handleEdit = (record: AdministrativeDivision) => {
    setCurrentDivision(record);
    setIsEditing(true);
    editForm.setFieldsValue({
      name: record.name,
      code: record.code,
      parentId: record.parentId
    });
    setEditModalVisible(true);
  };

  // 处理新增
  const handleAdd = () => {
    setCurrentDivision(null);
    setIsEditing(false);
    editForm.resetFields();
    setEditModalVisible(true);
  };

  // 处理状态切换
  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'enabled' ? 'disabled' : 'enabled';
    setDivisionData(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
    filterDataByLevel(activeTab);
    Message.success(`行政区划已${newStatus === 'enabled' ? '启用' : '禁用'}`);
  };

  // 批量启用
  const handleBatchEnable = () => {
    if (selectedRowKeys.length === 0) {
      Message.warning('请选择要启用的行政区划');
      return;
    }
    
    setDivisionData(prev => prev.map(item => 
      selectedRowKeys.includes(item.id) ? { ...item, status: 'enabled' } : item
    ));
    
    setSelectedRowKeys([]);
    filterDataByLevel(activeTab);
    Message.success(`已启用 ${selectedRowKeys.length} 个行政区划`);
  };

  // 批量禁用
  const handleBatchDisable = () => {
    if (selectedRowKeys.length === 0) {
      Message.warning('请选择要禁用的行政区划');
      return;
    }
    
    setDivisionData(prev => prev.map(item => 
      selectedRowKeys.includes(item.id) ? { ...item, status: 'disabled' } : item
    ));
    
    setSelectedRowKeys([]);
    filterDataByLevel(activeTab);
    Message.success(`已禁用 ${selectedRowKeys.length} 个行政区划`);
  };

  // 保存行政区划编辑
  const handleSaveDivision = async () => {
    try {
      const values = await editForm.validate();
      const currentLevel = activeTab as DivisionLevel;
      
      // 获取上级名称
      let parentName = '';
      if (values.parentId && currentLevel !== 'province') {
        const parent = divisionData.find(item => item.id === values.parentId);
        parentName = parent?.name || '';
      }
      
      const divisionItem = {
        ...values,
        id: isEditing ? currentDivision?.id : Date.now().toString(),
        level: currentLevel,
        parentName,
        status: isEditing ? currentDivision?.status : 'enabled' as const
      };

      if (isEditing) {
        // 更新现有行政区划
        setDivisionData(prev => prev.map(item => 
          item.id === currentDivision?.id ? { ...item, ...divisionItem } : item
        ));
        Message.success('行政区划信息已更新');
      } else {
        // 新增行政区划
        const newDivision = { ...divisionItem, id: Date.now().toString() };
        setDivisionData(prev => [...prev, newDivision]);
        Message.success('行政区划已添加');
      }

      setEditModalVisible(false);
      editForm.resetFields();
      filterDataByLevel(activeTab);
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  // 获取当前tab配置
  const getCurrentTabConfig = () => {
    return tabConfig.find(tab => tab.key === activeTab);
  };

  const currentTab = getCurrentTabConfig();

  return (
    <Card>
      <div style={{ marginBottom: '20px' }}>
        <Title heading={4} style={{ margin: 0 }}>中国行政区划</Title>
      </div>

      {/* Tab切换 */}
      <Tabs activeTab={activeTab} onChange={handleTabChange} type="line" size="large">
        {tabConfig.map(tab => (
          <TabPane key={tab.key} title={tab.title} />
        ))}
      </Tabs>

      {/* 搜索筛选区域 */}
      <Card style={{ marginBottom: '16px', marginTop: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '16px', alignItems: 'flex-end' }}>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>关键词搜索</div>
            <Input
              placeholder="名称、编码"
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
          {activeTab !== 'province' && (
            <div>
              <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>上级行政区划</div>
              <Select
                placeholder="选择上级区划"
                value={searchParams.parentId}
                onChange={(value) => setSearchParams(prev => ({ ...prev, parentId: value }))}
                allowClear
              >
                {getParentOptions(currentTab?.level || 'province').map(option => (
                  <Option key={option.value} value={option.value}>{option.label}</Option>
                ))}
              </Select>
            </div>
          )}
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
              新增{currentTab?.title}
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
        columns={getColumns(currentTab?.level || 'province')}
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

      {/* 新增/编辑行政区划弹窗 */}
      <Modal
        title={isEditing ? `编辑${currentTab?.title}` : `新增${currentTab?.title}`}
        visible={editModalVisible}
        onOk={handleSaveDivision}
        onCancel={() => setEditModalVisible(false)}
        style={{ width: 500 }}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            field="name"
            label="名称"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input placeholder={`请输入${currentTab?.title}名称`} />
          </Form.Item>
          
          <Form.Item
            field="code"
            label="编码"
            rules={[{ required: true, message: '请输入编码' }]}
          >
            <Input placeholder="请输入行政区划编码" />
          </Form.Item>
          
          {activeTab !== 'province' && (
            <Form.Item
              field="parentId"
              label="上级行政区划"
              rules={[{ required: true, message: '请选择上级行政区划' }]}
            >
              <Select placeholder="请选择上级行政区划">
                {getParentOptions(currentTab?.level || 'province').map(option => (
                  <Option key={option.value} value={option.value}>{option.label}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </Card>
  );
};

export default ChinaAdministrativeDivision; 