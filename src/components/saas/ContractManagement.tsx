import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Message,
  Typography,
  Dropdown
} from '@arco-design/web-react';
import {
  IconPlus,
  IconSearch,
  IconRefresh,
  IconMore
} from '@arco-design/web-react/icon';

const { Option } = Select;
const { Title } = Typography;

// 合约数据接口
interface Contract {
  id: string;
  shipCompanyNumber: string; // 船公司约号
  applicableRoute: string; // 适用航线
  shipCompany: string; // 船公司
  contractNature: string; // 约价性质
  destinationName: string; // 适用品名
  mqc: string; // MQC
  configuration: string; // 舱保
  effectiveDate: string; // 有效期
  status: 'enabled' | 'disabled'; // 状态
}

// 船公司选项
const shipCompanyOptions = [
  { value: 'MSC', label: 'MSC | 地中海' },
  { value: 'COSCO', label: 'COSCO | 中远海运' },
  { value: 'OOCL', label: 'OOCL | 东方海外' },
  { value: 'CMA', label: 'CMA | 达飞轮船' },
  { value: 'ONE', label: 'ONE | 海洋网联' },
  { value: 'HAPAG', label: 'HAPAG | 赫伯罗特' },
  { value: 'ZIM', label: 'ZIM | 以星轮船' },
  { value: 'MAERSK', label: 'MAERSK | 马士基' },
  { value: 'EVERGREEN', label: 'EVERGREEN | 长荣海运' }
];

// 约价性质选项
const contractNatureOptions = [
  { value: '客户内约', label: '客户内约' },
  { value: '供应商内约', label: '供应商内约' },
  { value: 'AFC内约', label: 'AFC内约' }
];

// 适用航线选项
const applicableRouteOptions = [
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

// 适用品名选项
const destinationNameOptions = [
  { value: '化工品', label: '化工品' },
  { value: '普通货物', label: '普通货物' },
  { value: '电子产品', label: '电子产品' },
  { value: '冷冻食品', label: '冷冻食品' },
  { value: '纺织品', label: '纺织品' },
  { value: '机械设备', label: '机械设备' },
  { value: '其他（电子产品）', label: '其他（电子产品）' },
  { value: '其他（机械设备）', label: '其他（机械设备）' }
];

// 舱保选项
const configurationOptions = [
  { value: '有（20 TEU/月）', label: '有（20 TEU/月）' },
  { value: '有（50 TEU/月）', label: '有（50 TEU/月）' },
  { value: '有（100 TEU/月）', label: '有（100 TEU/月）' },
  { value: '有（300 TEU/月）', label: '有（300 TEU/月）' },
  { value: '无', label: '无' }
];

// 搜索筛选参数
interface SearchParams {
  keyword: string;
  shipCompany: string;
  contractNature: string;
  status: string;
}

const ContractManagement: React.FC = () => {
  const [contractData, setContractData] = useState<Contract[]>([]);
  const [filteredData, setFilteredData] = useState<Contract[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [currentContract, setCurrentContract] = useState<Contract | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [batchAction, setBatchAction] = useState<'enable' | 'disable'>('enable');
  const [singleConfirmModalVisible, setSingleConfirmModalVisible] = useState(false);
  const [currentToggleRecord, setCurrentToggleRecord] = useState<Contract | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    keyword: '',
    shipCompany: '',
    contractNature: '',
    status: ''
  });
  const [editForm] = Form.useForm();

  // 初始化示例数据
  useEffect(() => {
    const mockData = [
      {
        id: '1',
        shipCompanyNumber: '888888',
        applicableRoute: '亚欧航线',
        shipCompany: 'MSC',
        contractNature: '客户内约',
        destinationName: '化工品',
        mqc: '140',
        configuration: '有（20 TEU/月）',
        effectiveDate: '2024-01-01 至 2024-12-31',
        status: 'enabled'
      },
      {
        id: '2',
        shipCompanyNumber: '20240510',
        applicableRoute: '跨太平洋航线',
        shipCompany: 'COSCO',
        contractNature: '供应商内约',
        destinationName: '普通货物',
        mqc: '220',
        configuration: '无',
        effectiveDate: '2024-05-10 至 2025-05-09',
        status: 'enabled'
      },
      {
        id: '3',
        shipCompanyNumber: 'WT2383333',
        applicableRoute: '亚美航线',
        shipCompany: 'OOCL',
        contractNature: 'AFC内约',
        destinationName: '电子产品',
        mqc: '140',
        configuration: '有（20 TEU/月）',
        effectiveDate: '2024-04-01 至 2024-10-31',
        status: 'enabled'
      },
      {
        id: '4',
        shipCompanyNumber: '4',
        applicableRoute: '地中海航线',
        shipCompany: 'CMA',
        contractNature: '客户内约',
        destinationName: '冷冻食品',
        mqc: '120',
        configuration: '无',
        effectiveDate: '2024-03-15 至 2024-09-14',
        status: 'disabled'
      },
      {
        id: '5',
        shipCompanyNumber: 'MJ1',
        applicableRoute: '亚洲区域航线',
        shipCompany: 'ONE',
        contractNature: '供应商内约',
        destinationName: '纺织品',
        mqc: '240',
        configuration: '有（100 TEU/月）',
        effectiveDate: '2024-02-15 至 2024-08-14',
        status: 'enabled'
      },
      {
        id: '6',
        shipCompanyNumber: '1',
        applicableRoute: '中东航线',
        shipCompany: 'HAPAG',
        contractNature: 'AFC内约',
        destinationName: '机械设备',
        mqc: '145',
        configuration: '有（20 TEU/月）',
        effectiveDate: '2024-06-01 至 2024-12-31',
        status: 'enabled'
      },
      {
        id: '7',
        shipCompanyNumber: '100',
        applicableRoute: '非洲航线',
        shipCompany: 'ZIM',
        contractNature: '客户内约',
        destinationName: '其他（电子产品）',
        mqc: '240',
        configuration: '有（300 TEU/月）',
        effectiveDate: '2024-01-15 至 2024-12-31',
        status: 'disabled'
      },
      {
        id: '8',
        shipCompanyNumber: '001',
        applicableRoute: '欧美航线',
        shipCompany: 'MAERSK',
        contractNature: '供应商内约',
        destinationName: '其他（机械设备）',
        mqc: '120',
        configuration: '无',
        effectiveDate: '2024-04-15 至 2025-04-14',
        status: 'enabled'
      },
      {
        id: '9',
        shipCompanyNumber: '298822264',
        applicableRoute: '波罗的海航线',
        shipCompany: 'MAERSK',
        contractNature: '供应商内约',
        destinationName: '普通货物',
        mqc: '340',
        configuration: '有（300 TEU/月）',
        effectiveDate: '2024-03-01 至 2024-08-31',
        status: 'enabled'
      },
      {
        id: '10',
        shipCompanyNumber: '12345',
        applicableRoute: '南美航线',
        shipCompany: 'EVERGREEN',
        contractNature: 'AFC内约',
        destinationName: '化工品',
        mqc: '140',
        configuration: '无',
        effectiveDate: '2024-05-01 至 2024-10-31',
        status: 'disabled'
      }
    ];

    setContractData(mockData as Contract[]);
    setFilteredData(mockData as Contract[]);
  }, []);

  // 搜索处理
  const handleSearch = () => {
    let filtered = contractData;

    if (searchParams.keyword) {
      filtered = filtered.filter(item =>
        item.shipCompanyNumber.toLowerCase().includes(searchParams.keyword.toLowerCase()) ||
        item.destinationName.includes(searchParams.keyword)
      );
    }

    if (searchParams.shipCompany) {
      filtered = filtered.filter(item => item.shipCompany === searchParams.shipCompany);
    }

    if (searchParams.contractNature) {
      filtered = filtered.filter(item => item.contractNature === searchParams.contractNature);
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
      shipCompany: '',
      contractNature: '',
      status: ''
    });
    setFilteredData(contractData);
    setSelectedRowKeys([]);
  };

  // 显示单个切换状态确认弹窗
  const handleToggleStatus = (id: string) => {
    const record = contractData.find(item => item.id === id);
    if (record) {
      setCurrentToggleRecord(record);
      setSingleConfirmModalVisible(true);
    }
  };

  // 确认单个切换状态操作
  const handleConfirmSingleToggle = () => {
    if (currentToggleRecord) {
      const newStatus = currentToggleRecord.status === 'enabled' ? 'disabled' : 'enabled';
      const newData = contractData.map(item =>
        item.id === currentToggleRecord.id ? { ...item, status: newStatus } : item
      );
      setContractData(newData as Contract[]);
      setFilteredData(newData as Contract[]);
      setSingleConfirmModalVisible(false);
      setCurrentToggleRecord(null);
      Message.success(`已${newStatus === 'enabled' ? '启用' : '禁用'}`);
    }
  };

  // 表格列定义
  const columns = [
    {
      title: '船公司约号',
      dataIndex: 'shipCompanyNumber',
      width: 120,
    },
    {
      title: '适用航线',
      dataIndex: 'applicableRoute',
      width: 150,
    },
    {
      title: '船公司',
      dataIndex: 'shipCompany',
      width: 150,
      render: (shipCompany: string) => {
        const option = shipCompanyOptions.find(opt => opt.value === shipCompany);
        return option ? option.label : shipCompany;
      }
    },
    {
      title: '约价性质',
      dataIndex: 'contractNature',
      width: 120,
    },
    {
      title: '适用品名',
      dataIndex: 'destinationName',
      width: 150,
    },
    {
      title: 'MQC',
      dataIndex: 'mqc',
      width: 100,
    },
    {
      title: '舱保',
      dataIndex: 'configuration',
      width: 150,
    },
    {
      title: '有效期',
      dataIndex: 'effectiveDate',
      width: 200,
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
      title: '操作',
      dataIndex: 'action',
      width: 200,
      fixed: 'right' as const,
      render: (_: unknown, record: Contract) => (
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
              <div style={{ 
                padding: '4px 0',
                backgroundColor: '#fff',
                border: '1px solid #e5e6e7',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}>
                <Button
                  type="text"
                  size="small"
                  style={{ width: '100%', justifyContent: 'flex-start' }}
                  onClick={() => handleToggleStatus(record.id)}
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
  const handleDetail = (record: Contract) => {
    setCurrentContract(record);
    setDetailModalVisible(true);
  };

  // 编辑处理
  const handleEdit = (record: Contract) => {
    setCurrentContract(record);
    setIsEditing(true);
    editForm.setFieldsValue(record);
    setEditModalVisible(true);
  };

  // 新增处理
  const handleAdd = () => {
    setCurrentContract(null);
    setIsEditing(false);
    editForm.resetFields();
    setEditModalVisible(true);
  };



  // 批量启用
  const handleBatchEnable = () => {
    setBatchAction('enable');
    setConfirmModalVisible(true);
  };

  // 批量禁用
  const handleBatchDisable = () => {
    setBatchAction('disable');
    setConfirmModalVisible(true);
  };

  // 确认批量操作
  const handleConfirmBatchAction = () => {
    const newStatus = batchAction === 'enable' ? 'enabled' : 'disabled';
    const newData = contractData.map(item =>
      selectedRowKeys.includes(item.id) ? { ...item, status: newStatus as 'enabled' | 'disabled' } : item
    );
    setContractData(newData);
    setFilteredData(newData);
    setSelectedRowKeys([]);
    setConfirmModalVisible(false);
    Message.success(`已${batchAction === 'enable' ? '启用' : '禁用'} ${selectedRowKeys.length} 条记录`);
  };

  // 保存合约
  const handleSave = async () => {
    try {
      const values = await editForm.validate();
      
      if (isEditing && currentContract) {
        // 编辑模式
        const newData = contractData.map(item =>
          item.id === currentContract.id ? { ...item, ...values, status: values.status as 'enabled' | 'disabled' } : item
        );
        setContractData(newData);
        setFilteredData(newData);
        Message.success('编辑成功');
      } else {
        // 新增模式
        const newContract: Contract = {
          id: Date.now().toString(),
          ...values,
          status: 'enabled' as 'enabled' | 'disabled'
        };
        const newData = [...contractData, newContract];
        setContractData(newData);
        setFilteredData(newData);
        Message.success('新增成功');
      }
      
      setEditModalVisible(false);
    } catch (error) {
      console.error('保存失败:', error);
    }
  };

  return (
    <Card>
      <div style={{ marginBottom: '20px' }}>
        <Title heading={4} style={{ margin: 0 }}>合约管理</Title>
      </div>

      {/* 搜索筛选区域 */}
      <Card style={{ marginBottom: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '16px', alignItems: 'flex-end' }}>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>关键词搜索</div>
            <Input
              placeholder="船公司约号、适用品名"
              value={searchParams.keyword}
              onChange={(value) => setSearchParams(prev => ({ ...prev, keyword: value }))}
            />
          </div>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>船公司</div>
            <Select
              placeholder="选择船公司"
              value={searchParams.shipCompany}
              onChange={(value) => setSearchParams(prev => ({ ...prev, shipCompany: value }))}
              allowClear
            >
              {shipCompanyOptions.map(option => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
              ))}
            </Select>
          </div>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>约价性质</div>
            <Select
              placeholder="选择性质"
              value={searchParams.contractNature}
              onChange={(value) => setSearchParams(prev => ({ ...prev, contractNature: value }))}
              allowClear
            >
              {contractNatureOptions.map(option => (
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
              新增合约
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
              <Button 
                type="outline" 
                status="success"
                onClick={handleBatchEnable}
              >
                批量启用 ({selectedRowKeys.length})
              </Button>
              <Button 
                type="outline" 
                status="warning"
                onClick={handleBatchDisable}
              >
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
        scroll={{ x: 1600 }}
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys as string[]);
          },
        }}
        pagination={{
          pageSize: 10,
          showTotal: true,
          showJumper: true,
          sizeCanChange: true,
        }}
      />

      {/* 批量操作确认弹窗 */}
      <Modal
        title={`批量${batchAction === 'enable' ? '启用' : '禁用'}确认`}
        visible={confirmModalVisible}
        onCancel={() => setConfirmModalVisible(false)}
        onOk={handleConfirmBatchAction}
        okText="确认"
        cancelText="取消"
        style={{ width: '400px' }}
        mask={true}
        maskClosable={false}
        autoFocus={false}
        focusLock={true}
      >
        <div style={{ padding: '16px 0' }}>
          <p>
            确定要{batchAction === 'enable' ? '启用' : '禁用'}选中的 {selectedRowKeys.length} 条合约记录吗？
          </p>
          <p style={{ color: '#999', fontSize: '12px', marginTop: '8px' }}>
            此操作将会{batchAction === 'enable' ? '启用' : '禁用'}所有选中的合约，请确认后操作。
          </p>
        </div>
      </Modal>

      {/* 单个操作确认弹窗 */}
      <Modal
        title={`${currentToggleRecord?.status === 'enabled' ? '禁用' : '启用'}确认`}
        visible={singleConfirmModalVisible}
        onCancel={() => {
          setSingleConfirmModalVisible(false);
          setCurrentToggleRecord(null);
        }}
        onOk={handleConfirmSingleToggle}
        okText="确认"
        cancelText="取消"
        style={{ width: '400px' }}
        mask={true}
        maskClosable={false}
        autoFocus={false}
        focusLock={true}
      >
        <div style={{ padding: '16px 0' }}>
          <p>
            确定要{currentToggleRecord?.status === 'enabled' ? '禁用' : '启用'}合约记录 "{currentToggleRecord?.shipCompanyNumber}" 吗？
          </p>
          <p style={{ color: '#999', fontSize: '12px', marginTop: '8px' }}>
            此操作将会{currentToggleRecord?.status === 'enabled' ? '禁用' : '启用'}该合约，请确认后操作。
          </p>
        </div>
      </Modal>

      {/* 详情弹窗 */}
      <Modal
        title="合约详情"
        visible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={
          <Button onClick={() => setDetailModalVisible(false)}>
            关闭
          </Button>
        }
        style={{ width: '600px' }}
      >
        {currentContract && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>船公司约号</div>
                <div>{currentContract.shipCompanyNumber}</div>
              </div>
              <div>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>适用航线</div>
                <div>{currentContract.applicableRoute}</div>
              </div>
              <div>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>船公司</div>
                <div>{shipCompanyOptions.find(opt => opt.value === currentContract.shipCompany)?.label || currentContract.shipCompany}</div>
              </div>
              <div>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>约价性质</div>
                <div>{currentContract.contractNature}</div>
              </div>
              <div>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>适用品名</div>
                <div>{currentContract.destinationName}</div>
              </div>
              <div>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>MQC</div>
                <div>{currentContract.mqc}</div>
              </div>
              <div>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>舱保</div>
                <div>{currentContract.configuration}</div>
              </div>
              <div>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>状态</div>
                <div>
                  <Tag color={currentContract.status === 'enabled' ? 'green' : 'red'}>
                    {currentContract.status === 'enabled' ? '启用' : '禁用'}
                  </Tag>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>有效期</div>
              <div>{currentContract.effectiveDate}</div>
            </div>
          </div>
        )}
      </Modal>

      {/* 编辑/新增弹窗 */}
      <Modal
        title={isEditing ? '编辑合约' : '新增合约'}
        visible={editModalVisible}
        onOk={handleSave}
        onCancel={() => setEditModalVisible(false)}
        autoFocus={false}
        focusLock={true}
        style={{ width: '600px' }}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            label="船公司约号"
            field="shipCompanyNumber"
            rules={[{ required: true, message: '请输入船公司约号' }]}
          >
            <Input placeholder="请输入船公司约号" />
          </Form.Item>
          
          <Form.Item
            label="适用航线"
            field="applicableRoute"
            rules={[{ required: true, message: '请选择适用航线' }]}
          >
            <Select placeholder="请选择适用航线">
              {applicableRouteOptions.map(option => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            label="船公司"
            field="shipCompany"
            rules={[{ required: true, message: '请选择船公司' }]}
          >
            <Select placeholder="请选择船公司">
              {shipCompanyOptions.map(option => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="约价性质"
            field="contractNature"
            rules={[{ required: true, message: '请选择约价性质' }]}
          >
            <Select placeholder="请选择约价性质">
              {contractNatureOptions.map(option => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="适用品名"
            field="destinationName"
            rules={[{ required: true, message: '请选择适用品名' }]}
          >
            <Select placeholder="请选择适用品名">
              {destinationNameOptions.map(option => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="MQC"
            field="mqc"
            rules={[{ required: true, message: '请输入MQC' }]}
          >
            <Input placeholder="请输入MQC" />
          </Form.Item>

          <Form.Item
            label="舱保"
            field="configuration"
            rules={[{ required: true, message: '请选择舱保' }]}
          >
            <Select placeholder="请选择舱保">
              {configurationOptions.map(option => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="有效期"
            field="effectiveDate"
            rules={[{ required: true, message: '请输入有效期' }]}
          >
            <Input placeholder="请输入有效期" />
          </Form.Item>

          <Form.Item
            label="状态"
            field="status"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Option value="enabled">启用</Option>
              <Option value="disabled">禁用</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ContractManagement;