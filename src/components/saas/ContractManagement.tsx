import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Input,
  Select,
  Message,
  Typography,
  Dropdown,
  Tooltip
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

// 合约数据接口
interface Contract {
  id: string;
  shipCompanyNumber: string; // 船公司约号
  applicableRoute: string[]; // 适用航线（改为数组支持多选）
  shipCompany: string; // 船公司
  contractNature: string; // 约价性质
  destinationName: string; // 适用品名
  nacs: string[]; // NAC列表（新增字段）
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

// 约价性质选项（按截图更新）
const contractNatureOptions = [
  { value: '自有约价', label: '自有约价' },
  { value: '客户约价', label: '客户约价' },
  { value: '海外代理约价', label: '海外代理约价' },
  { value: '无约价', label: '无约价' },
  { value: '同行约价', label: '同行约价' },
  { value: 'AFC约价', label: 'AFC约价' },
  { value: 'AFG约价', label: 'AFG约价' }
];

// 删除未使用的常量定义以修复构建错误

// 搜索筛选参数
interface SearchParams {
  keyword: string;
  shipCompany: string;
  contractNature: string;
  status: string;
}

const ContractManagement: React.FC = () => {
  const navigate = useNavigate();
  const [contractData, setContractData] = useState<Contract[]>([]);
  const [filteredData, setFilteredData] = useState<Contract[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [currentContract, setCurrentContract] = useState<Contract | null>(null);
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

  // 初始化示例数据（更新数据结构）
  useEffect(() => {
    const mockData = [
      {
        id: '1',
        shipCompanyNumber: '888888',
        applicableRoute: ['亚欧航线'],
        shipCompany: 'MSC',
        contractNature: '客户约价',
        destinationName: '化工品',
        nacs: ['NAC001', 'NAC002', 'NAC003'],
        mqc: '140',
        configuration: '有（20 TEU/月）',
        effectiveDate: '2024-01-01 至 2024-12-31',
        status: 'enabled'
      },
      {
        id: '2',
        shipCompanyNumber: '20240510',
        applicableRoute: ['跨太平洋航线', '亚美航线'],
        shipCompany: 'COSCO',
        contractNature: '海外代理约价',
        destinationName: 'FAK',
        nacs: ['NAC004'],
        mqc: '220',
        configuration: '无',
        effectiveDate: '2024-05-10 至 2025-05-09',
        status: 'enabled'
      },
      {
        id: '3',
        shipCompanyNumber: 'WT2383333',
        applicableRoute: ['亚美航线'],
        shipCompany: 'OOCL',
        contractNature: 'AFC约价',
        destinationName: '特种柜',
        nacs: ['NAC005', 'NAC006'],
        mqc: '140',
        configuration: '有（20 TEU/月）',
        effectiveDate: '2024-04-01 至 2024-10-31',
        status: 'enabled'
      },
      {
        id: '4',
        shipCompanyNumber: '4',
        applicableRoute: ['地中海航线'],
        shipCompany: 'CMA',
        contractNature: '自有约价',
        destinationName: '冷冻货',
        nacs: ['NAC007', 'NAC008', 'NAC009', 'NAC010'],
        mqc: '120',
        configuration: '无',
        effectiveDate: '2024-03-15 至 2024-09-14',
        status: 'disabled'
      },
      {
        id: '5',
        shipCompanyNumber: 'MJ1',
        applicableRoute: ['亚洲区域航线'],
        shipCompany: 'ONE',
        contractNature: '同行约价',
        destinationName: '纺织品',
        nacs: ['NAC011'],
        mqc: '240',
        configuration: '有（100 TEU/月）',
        effectiveDate: '2024-02-15 至 2024-08-14',
        status: 'enabled'
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
        item.destinationName.includes(searchParams.keyword) ||
        item.nacs.some(nac => nac.toLowerCase().includes(searchParams.keyword.toLowerCase()))
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

  // NAC显示渲染函数
  const renderNacs = (nacs: string[]) => {
    if (!nacs || nacs.length === 0) {
      return <span style={{ color: '#999' }}>-</span>;
    }

    if (nacs.length === 1) {
      return <Tag color="blue">{nacs[0]}</Tag>;
    }

    const firstNac = nacs[0];
    const remainingCount = nacs.length - 1;

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Tag color="blue">{firstNac}</Tag>
        <Tooltip
          content={
            <div style={{ maxWidth: '200px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>所有NAC：</div>
              {nacs.map((nac, index) => (
                <div key={index} style={{ padding: '2px 0' }}>
                  <Tag color="blue" size="small">{nac}</Tag>
                </div>
              ))}
            </div>
          }
          position="top"
        >
          <Tag color="gray" style={{ cursor: 'pointer' }}>
            +{remainingCount}
          </Tag>
        </Tooltip>
      </div>
    );
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
      render: (routes: string[]) => {
        if (!routes || routes.length === 0) {
          return <span style={{ color: '#999' }}>-</span>;
        }
        if (routes.length === 1) {
          return <Tag color="blue">{routes[0]}</Tag>;
        }
        const firstRoute = routes[0];
        const remainingCount = routes.length - 1;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Tag color="blue">{firstRoute}</Tag>
            <Tooltip
              content={
                <div style={{ maxWidth: '200px' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>所有适用航线：</div>
                  {routes.map((route, index) => (
                    <div key={index} style={{ padding: '2px 0' }}>
                      <Tag color="blue" size="small">{route}</Tag>
                    </div>
                  ))}
                </div>
              }
              position="top"
            >
              <Tag color="gray" style={{ cursor: 'pointer' }}>
                +{remainingCount}
              </Tag>
            </Tooltip>
          </div>
        );
      }
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
      width: 120,
    },
    {
      title: 'NAC',
      dataIndex: 'nacs',
      width: 150,
      render: renderNacs
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

  // 编辑处理（跳转到页面）
  const handleEdit = (record: Contract) => {
    navigate(`/controltower/saas/contract/edit/${record.id}`);
  };

  // 新增处理（跳转到页面）
  const handleAdd = () => {
    navigate('/controltower/saas/contract/add');
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
              placeholder="船公司约号、适用品名、NAC"
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
        scroll={{ x: 1800 }}
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
                <div>{currentContract.applicableRoute.join(', ')}</div>
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
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>NAC</div>
                <div>{renderNacs(currentContract.nacs)}</div>
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
    </Card>
  );
};

export default ContractManagement;