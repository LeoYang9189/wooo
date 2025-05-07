import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Select, 
  DatePicker, 
  Card, 
  Breadcrumb,
  Typography,
  Tag,
  Layout,
  Menu,
  Modal,
  Upload,
  Message,
  Progress,
  Avatar,
  Dropdown,
  Badge,
  Divider,
  Switch,
  Grid,
  Tooltip
} from '@arco-design/web-react';
import { 
  IconSearch, 
  IconPlus, 
  IconUpload, 
  IconDownload, 
  IconEdit, 
  IconDelete, 
  IconRefresh, 
  IconFilter,
  IconDashboard,
  IconFile,
  IconStorage,
  IconSettings,
  IconMenuFold,
  IconMenuUnfold,
  IconRobot,
  IconNotification,
  IconMessage,
  IconUser,
  IconDown,
  IconPoweroff,
  IconSettings as IconSettingsOutline,
  IconLanguage,
  IconQuestionCircle,
  IconList,
  IconDragDotVertical
} from '@arco-design/web-react/icon';
import '@arco-design/web-react/dist/css/arco.css';
import { useNavigate } from 'react-router-dom';
import SaasLayout from './SaasLayout';
import './InquiryManagement.css';

const Title = Typography.Title;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Row = Grid.Row;
const Col = Grid.Col;

interface DataItem {
  key: string;
  shipCompany: string;
  dischargePort: string;
  etd: string;
  transitType: string;
  transit: number;
  '20gp': number;
  '40gp': number;
  '40hc': number;
  routeCode: string;
  vesselName: string;
  voyageNo: string;
  spaceStatus: string;
  remark: string;
}

// 添加波浪动画CSS样式
const waveAnimation = `
  @keyframes wave {
    0% {
      transform: translateX(0) translateZ(0) scaleY(1);
    }
    50% {
      transform: translateX(-25%) translateZ(0) scaleY(0.8);
    }
    100% {
      transform: translateX(-50%) translateZ(0) scaleY(1);
    }
  }

  @keyframes waveBg {
    0% { background-position: 0% 0%; }
    100% { background-position: 100% 100%; }
  }

  .wave {
    position: absolute;
    left: 0;
    width: 200%;
    height: 100%;
    background-repeat: repeat-x;
    animation: wave 10s infinite linear;
  }
`;

const FclRates: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [aiModalVisible, setAiModalVisible] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [shipPosition, setShipPosition] = useState(0);
  const [recognitionStatus, setRecognitionStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [customTableModalVisible, setCustomTableModalVisible] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({
    shipCompany: true,
    dischargePort: true,
    etd: true,
    transitType: true,
    transit: true,
    '20gp': true,
    '40gp': true,
    '40hc': true,
    routeCode: true,
    vesselName: true,
    voyageNo: true,
    spaceStatus: true,
    consignee: true,
    status: false,
    highlighted: false,
    eta: false,
    '45hq': false,
    '40nor': false,
    freeTime: false,
    validPeriod: false,
    departurePort: false,
    updated: false,
    updatedBy: false,
    weight: false,
    bookingDeadline: false
  });
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuItemClick = (key: string) => {
    if (key === '1') {
      navigate('/saas-system');
    } else if (key === '3') {
      navigate('/fcl-rates');
    }
  };

  // 打开AI识别弹窗
  const openAiModal = () => {
    setAiModalVisible(true);
    setRecognitionStatus('idle');
    setUploadProgress(0);
  };

  // 关闭AI识别弹窗
  const closeAiModal = () => {
    setAiModalVisible(false);
    setRecognitionStatus('idle');
    setUploadProgress(0);
  };

  // 打开自定义表格弹窗
  const openCustomTableModal = () => {
    setCustomTableModalVisible(true);
  };

  // 关闭自定义表格弹窗
  const closeCustomTableModal = () => {
    setCustomTableModalVisible(false);
  };

  // 模拟AI识别流程
  const simulateAiRecognition = () => {
    // 开始上传阶段
    setRecognitionStatus('uploading');
    
    // 模拟上传进度
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      // 模拟船只移动 - 让船只更早出现并移动
      setShipPosition(prev => (prev + 8) % 100);
      
      if (progress >= 100) {
        clearInterval(uploadInterval);
        setRecognitionStatus('processing');
        
        // 模拟处理阶段
        const processInterval = setInterval(() => {
          // 继续模拟船只移动
          setShipPosition(prev => (prev + 8) % 100);
        }, 100);
        
        // 模拟处理完成
        setTimeout(() => {
          clearInterval(processInterval);
          setRecognitionStatus('success');
          
          // 显示成功消息
          Message.success('合约识别成功，已提取运价信息');
          
          // 移除自动关闭弹窗的代码
          // setTimeout(() => {
          //   closeAiModal();
          // }, 2000);
        }, 3000);
      }
    }, 100);
  };

  // 处理文件上传
  const handleFileUpload = () => {
    simulateAiRecognition();
  };

  // 创建船只移动动画样式
  const shipAnimationStyle = {
    transform: `translateX(${shipPosition}%)`,
    transition: 'transform 0.5s ease-in-out'
  };

  // 处理表格列可见性变更
  const handleColumnVisibilityChange = (column: string, visible: boolean) => {
    setColumnVisibility({
      ...columnVisibility,
      [column]: visible
    });
  };

  // 重置表格列可见性
  const resetColumnVisibility = () => {
    setColumnVisibility({
      shipCompany: true,
      dischargePort: true,
      etd: true,
      transitType: true,
      transit: true,
      '20gp': true,
      '40gp': true,
      '40hc': true,
      routeCode: true,
      vesselName: true,
      voyageNo: true,
      spaceStatus: true,
      consignee: true,
      status: false,
      highlighted: false,
      eta: false,
      '45hq': false,
      '40nor': false,
      freeTime: false,
      validPeriod: false,
      departurePort: false,
      updated: false,
      updatedBy: false,
      weight: false,
      bookingDeadline: false
    });
  };

  // 应用表格列设置
  const applyColumnSettings = () => {
    // 这里可以添加保存设置的逻辑
    Message.success('表格设置已应用');
    closeCustomTableModal();
  };

  const columns = [
    {
      title: '船公司',
      dataIndex: 'shipCompany',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '卸货港',
      dataIndex: 'dischargePort',
      width: 150,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: 'ETD',
      dataIndex: 'etd',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '直达/中转',
      dataIndex: 'transitType',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '航程',
      dataIndex: 'transit',
      width: 80,
      render: (value: number) => <Tooltip content={String(value)} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '20GP',
      dataIndex: '20gp',
      width: 100,
      render: (value: number) => <Tooltip content={`$ ${value}`} mini><span className="arco-ellipsis">$ {value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '40GP',
      dataIndex: '40gp',
      width: 100,
      render: (value: number) => <Tooltip content={`$ ${value}`} mini><span className="arco-ellipsis">$ {value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '40HC',
      dataIndex: '40hc',
      width: 100,
      render: (value: number) => <Tooltip content={`$ ${value}`} mini><span className="arco-ellipsis">$ {value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '航线代码',
      dataIndex: 'routeCode',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '船名',
      dataIndex: 'vesselName',
      width: 150,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '航次',
      dataIndex: 'voyageNo',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '舱位状态',
      dataIndex: 'spaceStatus',
      width: 100,
      render: (value: string) => (
        <Tooltip content={value} mini>
          <Tag color={value === '舱位充足' ? 'green' : 'orange'} size="small">
            {value}
          </Tag>
        </Tooltip>
      ),
      sorter: true,
      resizable: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 150,
      render: (value: string) => <Tooltip content={value || 'LSE已含'} mini><span className="arco-ellipsis">{value || 'LSE已含'}</span></Tooltip>,
      resizable: true,
    },
    {
      title: '操作',
      dataIndex: 'operations',
      fixed: 'right' as const,
      width: 150,
      render: () => (
        <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
          <div style={{display:'flex',gap:4,width:'100%'}}>
            <Button type="text" size="mini" icon={<IconEdit />}>编辑</Button>
            <Button type="text" size="mini" icon={<IconDownload />}>下载</Button>
          </div>
          <div style={{display:'flex',gap:4,width:'100%'}}>
            <Button type="text" size="mini" icon={<IconDelete />}>复制</Button>
          </div>
        </div>
      ),
    },
  ];

  const data: DataItem[] = Array(12).fill(null).map((_, index) => {
    const random20gp = [-30, 510, 560, 865, 1130, 530].sort(() => Math.random() - 0.5)[0];
    const random40gp = random20gp === -30 ? -60 : random20gp === 510 ? 1020 : random20gp === 560 ? 1120 : random20gp === 865 ? 1730 : random20gp === 1130 ? 2260 : 1060;
    const portPrefix = ['MANILA-NORTH', 'MANILA-SOUTH', 'SUBIC BAY', 'CEBU', 'ILOILO', 'CAGAYAN DE ORO', 'BATANGAS'];
    const routeCodes = ['CPX4', 'CPS', 'CPX7', 'CPX6'];
    const vesselNames = ['MEDKON QUO', 'SITC PENANG', 'SITC YOKOHAMA', 'SITC XINCHENG'];
    
    return {
      key: `${index}`,
      shipCompany: 'SITC',
      dischargePort: portPrefix[Math.floor(Math.random() * portPrefix.length)],
      etd: `05-${15 + Math.floor(Math.random() * 4)}`,
      transitType: '直达',
      transit: 4 + Math.floor(Math.random() * 6),
      '20gp': random20gp,
      '40gp': random40gp,
      '40hc': random40gp,
      routeCode: routeCodes[Math.floor(Math.random() * routeCodes.length)],
      vesselName: vesselNames[Math.floor(Math.random() * vesselNames.length)],
      voyageNo: `25${10 + Math.floor(Math.random() * 9)}S`,
      spaceStatus: Math.random() > 0.3 ? '舱位充足' : '运费下调',
      remark: Math.random() > 0.5 ? 'LSE已含' : '运费下调',
    };
  });

  const onSelectChange = (selectedRowKeys: (string | number)[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const pagination = {
    showTotal: true,
    total: 9232,
    pageSize: 12,
    current: 1,
    showJumper: true,
    sizeCanChange: true,
    pageSizeChangeResetCurrent: true,
    sizeOptions: [12, 50, 100, 200],
  };

  return (
    <SaasLayout menuSelectedKey="3" breadcrumb={
      <Breadcrumb>
        <Breadcrumb.Item>运价管理</Breadcrumb.Item>
        <Breadcrumb.Item>海运整箱</Breadcrumb.Item>
      </Breadcrumb>
    }>
      {/* 主内容区域 */}
      <Card className="mb-4">
        <Title heading={6} className="mb-4">筛选条件</Title>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="text-gray-500 text-sm mb-1">船公司</div>
            <Select
              placeholder="请选择船公司"
              style={{ width: '100%' }}
              allowClear
            >
              <Option value="SITC">SITC</Option>
              <Option value="COSCO">COSCO</Option>
              <Option value="MSK">MSK</Option>
              <Option value="ONE">ONE</Option>
            </Select>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm mb-1">直达/中转</div>
            <Select
              placeholder="请选择直达/中转"
              style={{ width: '100%' }}
              allowClear
            >
              <Option value="direct">直达</Option>
              <Option value="transit">中转</Option>
            </Select>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm mb-1">有效期</div>
            <RangePicker style={{ width: '100%' }} />
          </div>
          
          <div>
            <div className="text-gray-500 text-sm mb-1">开始日期</div>
            <RangePicker style={{ width: '100%' }} />
          </div>
          
          <div>
            <div className="text-gray-500 text-sm mb-1">航线名称</div>
            <Select
              placeholder="请选择航线名称"
              style={{ width: '100%' }}
              allowClear
            >
              <Option value="line1">亚洲区内航线</Option>
              <Option value="line2">远东-东南亚航线</Option>
              <Option value="line3">远东-中东航线</Option>
            </Select>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm mb-1">航线代码</div>
            <Select
              placeholder="请选择航线代码"
              style={{ width: '100%' }}
              allowClear
            >
              <Option value="CPX4">CPX4</Option>
              <Option value="CPS">CPS</Option>
              <Option value="CPX7">CPX7</Option>
              <Option value="CPX6">CPX6</Option>
            </Select>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm mb-1">船名</div>
            <Select
              placeholder="请输入船名"
              style={{ width: '100%' }}
              allowClear
            >
              <Option value="MEDKON QUO">MEDKON QUO</Option>
              <Option value="SITC PENANG">SITC PENANG</Option>
              <Option value="SITC YOKOHAMA">SITC YOKOHAMA</Option>
              <Option value="SITC XINCHENG">SITC XINCHENG</Option>
            </Select>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm mb-1">航次</div>
            <Select
              placeholder="请输入航次"
              style={{ width: '100%' }}
              allowClear
            >
              <Option value="2510S">2510S</Option>
              <Option value="2514S">2514S</Option>
              <Option value="2518S">2518S</Option>
            </Select>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm mb-1">起运港</div>
            <Select
              placeholder="请选择起运港"
              style={{ width: '100%' }}
              allowClear
            >
              <Option value="shanghai">上海</Option>
              <Option value="ningbo">宁波</Option>
              <Option value="qingdao">青岛</Option>
            </Select>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm mb-1">卸货港</div>
            <Select
              placeholder="请选择卸货港"
              style={{ width: '100%' }}
              allowClear
            >
              {['MANILA-NORTH', 'MANILA-SOUTH', 'SUBIC BAY', 'CEBU', 'ILOILO', 'CAGAYAN DE ORO', 'BATANGAS'].map((port) => (
                <Option key={port} value={port}>{port}</Option>
              ))}
            </Select>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm mb-1">舱位状态</div>
            <Select
              placeholder="请选择舱位状态"
              style={{ width: '100%' }}
              allowClear
            >
              <Option value="available">舱位充足</Option>
              <Option value="reduced">运费下调</Option>
              <Option value="limited">舱位有限</Option>
            </Select>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm mb-1">置顶推荐</div>
            <Select
              placeholder="请选择置顶推荐"
              style={{ width: '100%' }}
              allowClear
            >
              <Option value="top">是</Option>
              <Option value="normal">否</Option>
            </Select>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm mb-1">状态</div>
            <Select
              placeholder="请选择状态"
              style={{ width: '100%' }}
              allowClear
            >
              <Option value="active">有效</Option>
              <Option value="inactive">失效</Option>
            </Select>
          </div>
          
          <div>
            <div className="text-gray-500 text-sm mb-1">更新时间</div>
            <RangePicker style={{ width: '100%' }} />
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <Space>
            <Button type="primary" icon={<IconSearch />}>查询</Button>
            <Button icon={<IconRefresh />}>重置</Button>
            <Button icon={<IconFilter />}>收起</Button>
          </Space>
        </div>
      </Card>
      
      <Card>
        <div className="flex justify-between mb-4">
          <Space>
            <Button type="primary" icon={<IconPlus />}>新增运价</Button>
            <Button icon={<IconUpload />}>批量导入</Button>
            <Button icon={<IconDownload />}>导出列表</Button>
            
            {/* AI识别按钮 */}
            <Button 
              type="primary"
              style={{
                background: 'linear-gradient(45deg, #1890ff, #4dabf5)',
                border: 'none',
                boxShadow: '0 4px 12px rgba(24, 144, 255, 0.35)',
                padding: '0 28px',
              }}
              icon={<IconRobot />}
              onClick={openAiModal}
            >
              AI智能识别
            </Button>
          </Space>
          
          {/* 自定义表格按钮改为文字链接样式 */}
          <div 
            className="flex items-center text-blue-500 cursor-pointer hover:text-blue-700"
            onClick={openCustomTableModal}
          >
            <IconList className="mr-1" />
            <span>自定义表格</span>
          </div>
        </div>
        
        <Table
          rowKey="key"
          loading={false}
          columns={columns}
          data={data}
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
          }}
          pagination={pagination}
          scroll={{ x: 1800 }}
          border={false}
          className="mt-4 inquiry-table-nowrap"
        />
        
        <div className="mt-2 text-gray-500 text-sm">共 9232 条</div>
      </Card>

      {/* 自定义表格弹窗 */}
      <Modal
        title="表头设置"
        visible={customTableModalVisible}
        onCancel={closeCustomTableModal}
        footer={[
          <Button key="reset" onClick={resetColumnVisibility} style={{ float: 'left' }}>
            重置
          </Button>,
          <Button key="cancel" onClick={closeCustomTableModal}>
            取消
          </Button>,
          <Button key="apply" type="primary" onClick={applyColumnSettings}>
            确认
          </Button>,
        ]}
        style={{ width: 800 }}
      >
        <div className="p-4">
          <Row gutter={[16, 16]}>
            {/* 第一列 */}
            <Col span={8}>
              <div className="custom-column-item border border-gray-200 rounded p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>船公司</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.shipCompany} 
                    onChange={(checked) => handleColumnVisibilityChange('shipCompany', checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>卸货港</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.dischargePort} 
                    onChange={(checked) => handleColumnVisibilityChange('dischargePort', checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>ETD</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.etd} 
                    onChange={(checked) => handleColumnVisibilityChange('etd', checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>直达/中转</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.transitType} 
                    onChange={(checked) => handleColumnVisibilityChange('transitType', checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>航程</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.transit} 
                    onChange={(checked) => handleColumnVisibilityChange('transit', checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>20GP</span>
                  </div>
                  <Switch 
                    checked={columnVisibility["20gp"]} 
                    onChange={(checked) => handleColumnVisibilityChange("20gp", checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>40GP</span>
                  </div>
                  <Switch 
                    checked={columnVisibility["40gp"]} 
                    onChange={(checked) => handleColumnVisibilityChange("40gp", checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>40HC</span>
                  </div>
                  <Switch 
                    checked={columnVisibility["40hc"]} 
                    onChange={(checked) => handleColumnVisibilityChange("40hc", checked)}
                  />
                </div>
              </div>
            </Col>
            
            {/* 第二列 */}
            <Col span={8}>
              <div className="custom-column-item border border-gray-200 rounded p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>航次</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.voyageNo} 
                    onChange={(checked) => handleColumnVisibilityChange('voyageNo', checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>舱位状态</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.spaceStatus} 
                    onChange={(checked) => handleColumnVisibilityChange('spaceStatus', checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>consignee</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.consignee} 
                    onChange={(checked) => handleColumnVisibilityChange('consignee', checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>运价编号</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.routeCode} 
                    onChange={(checked) => handleColumnVisibilityChange('routeCode', checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>码头</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.vesselName} 
                    onChange={(checked) => handleColumnVisibilityChange('vesselName', checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>45HQ</span>
                  </div>
                  <Switch 
                    checked={columnVisibility["45hq"]} 
                    onChange={(checked) => handleColumnVisibilityChange("45hq", checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>40NOR</span>
                  </div>
                  <Switch 
                    checked={columnVisibility["40nor"]} 
                    onChange={(checked) => handleColumnVisibilityChange("40nor", checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>免箱免用</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.freeTime} 
                    onChange={(checked) => handleColumnVisibilityChange('freeTime', checked)}
                  />
                </div>
              </div>
            </Col>
            
            {/* 第三列 */}
            <Col span={8}>
              <div className="custom-column-item border border-gray-200 rounded p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>状态</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.status} 
                    onChange={(checked) => handleColumnVisibilityChange('status', checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>置顶</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.highlighted} 
                    onChange={(checked) => handleColumnVisibilityChange('highlighted', checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>船期</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.eta} 
                    onChange={(checked) => handleColumnVisibilityChange('eta', checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>航线名称</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.validPeriod} 
                    onChange={(checked) => handleColumnVisibilityChange('validPeriod', checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>ETA</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.eta} 
                    onChange={(checked) => handleColumnVisibilityChange('eta', checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>限重</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.weight} 
                    onChange={(checked) => handleColumnVisibilityChange('weight', checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>预订截止时间</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.bookingDeadline} 
                    onChange={(checked) => handleColumnVisibilityChange('bookingDeadline', checked)}
                  />
                </div>
              </div>
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>更新时间</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.updated} 
                    onChange={(checked) => handleColumnVisibilityChange('updated', checked)}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>

      {/* AI识别弹窗 */}
      <Modal
        title={
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-800">AI智能识别</span>
          </div>
        }
        visible={aiModalVisible}
        onCancel={closeAiModal}
        autoFocus={false}
        focusLock={true}
        maskClosable={false}
        footer={null}
        style={{ width: 580, borderRadius: '12px', overflow: 'hidden' }}
        className="ai-recognition-modal"
      >
        <div className="p-0">
          {recognitionStatus === 'idle' && (
            <div className="relative">
              {/* 顶部装饰 */}
              <div className="absolute top-0 left-0 w-full h-16 overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-b from-blue-50 to-transparent rounded-full opacity-70 -translate-y-24"></div>
              </div>
              
              <Upload
                drag={true}
                multiple={false}
                showUploadList={false}
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                customRequest={(options) => {
                  handleFileUpload();
                  if (options.onSuccess) {
                    options.onSuccess();
                  }
                  return { abort: () => {} };
                }}
              >
                <div className="p-12 pt-16">
                  <div className="flex justify-center">
                    <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-blue-400 rounded-2xl flex items-center justify-center mb-8 shadow-lg relative overflow-hidden group transform transition-transform duration-300 hover:scale-105">
                      <div className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="w-16 h-20 relative">
                        {/* 文档图标 - 精美版 */}
                        <div className="absolute inset-0 bg-white rounded-md flex flex-col p-2">
                          <div className="h-1 w-10 bg-gray-300 rounded-sm mb-1"></div>
                          <div className="h-1 w-12 bg-gray-300 rounded-sm mb-1"></div>
                          <div className="h-1 w-8 bg-gray-300 rounded-sm"></div>
                          <div className="mt-auto mb-0 w-full flex justify-center">
                            <div className="h-4 w-4 rounded-full bg-blue-200 flex items-center justify-center">
                              <span className="text-xs text-blue-600">+</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full h-8 bg-black bg-opacity-20 flex items-center justify-center text-white text-sm font-medium">
                        <IconUpload className="mr-1" /> 点击上传
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-gray-800 font-medium mb-2 text-xl">
                    上传合约文件
                  </div>
                  <div className="text-center text-gray-500 mb-8 max-w-md mx-auto">
                    点击或拖拽文件到此区域，系统将自动识别内容并提取运价信息
                  </div>
                  <div className="flex justify-center">
                    <Button 
                      type="primary" 
                      icon={<IconUpload />}
                      style={{
                        background: 'linear-gradient(45deg, #1890ff, #4dabf5)',
                        border: 'none',
                        borderRadius: '24px',
                        boxShadow: '0 4px 12px rgba(24, 144, 255, 0.35)',
                        padding: '0 28px',
                        height: '42px',
                        fontSize: '15px'
                      }}
                    >
                      选择文件
                    </Button>
                  </div>
                  
                  {/* 底部信息 */}
                  <div className="mt-10 pt-6 border-t border-gray-100">
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <div className="w-4 h-4 rounded-full bg-green-500 mr-2 flex-shrink-0"></div>
                      <span>支持格式：PDF、Word、Excel、图片</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <div className="w-4 h-4 rounded-full bg-blue-500 mr-2 flex-shrink-0"></div>
                      <span>AI智能识别文本及表格内容，提取关键运价信息</span>
                    </div>
                  </div>
                </div>
              </Upload>
            </div>
          )}

          {(recognitionStatus === 'uploading' || recognitionStatus === 'processing') && (
            <div className="p-10 relative pb-16">
              {/* 背景装饰 */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-60 h-60 bg-blue-50 rounded-full opacity-60 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-50 rounded-full opacity-40 -ml-10 -mb-10"></div>
              </div>
              
              <div className="text-center mb-12 relative">
                {/* 海面效果 - 改为波浪 */}
                <div className="w-full h-20 mx-auto relative overflow-hidden rounded-2xl shadow-inner" 
                     style={{ background: 'linear-gradient(180deg, #bae7ff 0%, #91caff 100%)' }}>
                  
                  {/* 波浪层1 */}
                  <div className="wave h-6 bottom-0" 
                       style={{ 
                         backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 88.7\'%3E%3Cpath d=\'M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-31.8z\' fill=\'%23ffffff\' fill-opacity=\'0.3\'/%3E%3C/svg%3E")',
                         backgroundSize: '50% 100%',
                       }}></div>
                  
                  {/* 波浪层2 */}
                  <div className="wave h-4 bottom-0" 
                       style={{ 
                         backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 88.7\'%3E%3Cpath d=\'M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-31.8z\' fill=\'%23ffffff\' fill-opacity=\'0.6\'/%3E%3C/svg%3E")',
                         backgroundSize: '50% 60%',
                         animationDuration: '8s',
                       }}></div>
                  
                  {/* 船只 */}
                  <div className="text-5xl absolute top-1/3 transform -translate-y-1/2" style={{
                    ...shipAnimationStyle,
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
                  }}>
                    🚢
                  </div>
                </div>
              </div>
              
              <div className="relative z-10">
                <div className="text-center text-xl text-gray-800 font-medium mb-6">
                  {recognitionStatus === 'uploading' 
                    ? '文件上传中' 
                    : '智能识别处理中'}
                </div>
                
                <div className="mb-8 w-4/5 mx-auto">
                  <Progress
                    percent={uploadProgress}
                    status={recognitionStatus === 'uploading' ? 'normal' : 'success'}
                    strokeWidth={8}
                    animation={true}
                    style={{ marginBottom: '24px' }}
                    formatText={(percent) => (
                      <span className="text-lg font-medium">{`${percent}%`}</span>
                    )}
                  />
                  
                  {/* 进度阶段指示器 */}
                  <div className="flex justify-between items-center mt-2">
                    <div className={`flex flex-col items-center ${uploadProgress > 0 ? 'text-blue-500' : 'text-gray-400'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${uploadProgress > 0 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
                      <span className="text-xs">上传</span>
                    </div>
                    <div className="flex-1 h-1 mx-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full bg-blue-500 rounded-full transition-all duration-300`} style={{ width: `${Math.min(uploadProgress * 2, 100)}%` }}></div>
                    </div>
                    <div className={`flex flex-col items-center ${uploadProgress >= 50 ? 'text-blue-500' : 'text-gray-400'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${uploadProgress >= 50 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
                      <span className="text-xs">解析</span>
                    </div>
                    <div className="flex-1 h-1 mx-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full bg-blue-500 rounded-full transition-all duration-300`} style={{ width: `${Math.max(0, (uploadProgress - 50) * 2)}%` }}></div>
                    </div>
                    <div className={`flex flex-col items-center ${uploadProgress >= 100 ? 'text-blue-500' : 'text-gray-400'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${uploadProgress >= 100 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'}`}>3</div>
                      <span className="text-xs">完成</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 text-center">
                  <div className="text-gray-700 font-medium mb-2">
                    {recognitionStatus === 'uploading' 
                      ? '文件上传中，请稍候...' 
                      : '正在智能分析文件内容'}
                  </div>
                  <div className="text-blue-500 text-sm">
                    {recognitionStatus === 'uploading' 
                      ? '上传完成后将自动开始智能识别' 
                      : 'AI正在提取合约运价信息，这可能需要几秒钟时间'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {recognitionStatus === 'success' && (
            <div className="p-10 text-center relative">
              {/* 成功状态背景装饰 */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-60 h-60 bg-green-50 rounded-full opacity-60 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-50 rounded-full opacity-40 -ml-10 -mb-10"></div>
              </div>
              
              <div className="relative z-10">
                <div className="mb-8 flex justify-center">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-10"></div>
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-20" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center text-white shadow-lg">
                      <div className="text-3xl">✓</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-2xl text-gray-800 font-medium mb-4">识别成功</div>
                <div className="text-gray-600 mb-8 w-4/5 mx-auto">
                  已成功从合约中提取运价信息，可以在系统中查看并编辑
                </div>
                
                {/* 数据卡片 */}
                <div className="bg-white p-5 rounded-lg shadow-sm mb-8 mx-auto w-4/5 border border-gray-100">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-500 mb-1">32</div>
                      <div className="text-gray-500 text-sm">提取项目</div>
                    </div>
                    <div className="text-center border-l border-r border-gray-100">
                      <div className="text-2xl font-bold text-green-500 mb-1">28</div>
                      <div className="text-gray-500 text-sm">运价信息</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-500 mb-1">4</div>
                      <div className="text-gray-500 text-sm">附加费用</div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="primary" 
                  style={{
                    background: 'linear-gradient(45deg, #52c41a, #13c2c2)',
                    borderRadius: '24px',
                    height: '44px',
                    padding: '0 32px',
                    fontSize: '16px',
                    fontWeight: 500,
                    border: 'none',
                    boxShadow: '0 6px 16px rgba(82, 196, 26, 0.25)'
                  }}
                  onClick={closeAiModal}
                >
                  确认完成
                </Button>
              </div>
            </div>
          )}

          {recognitionStatus === 'error' && (
            <div className="p-10 text-center relative">
              {/* 错误状态背景装饰 */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-60 h-60 bg-red-50 rounded-full opacity-40 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-50 rounded-full opacity-20 -ml-10 -mb-10"></div>
              </div>
              
              <div className="relative z-10">
                <div className="mb-8 flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-400 rounded-full flex items-center justify-center text-white shadow-md">
                    <div className="text-3xl">✕</div>
                  </div>
                </div>
                
                <div className="text-2xl text-gray-800 font-medium mb-4">识别失败</div>
                <div className="text-gray-600 mb-8 w-4/5 mx-auto">
                  无法识别此文件内容，请检查文件格式是否正确或尝试其他文件
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm border border-red-100 mb-8 text-left w-4/5 mx-auto">
                  <div className="text-red-500 font-medium mb-3">可能的原因：</div>
                  <div className="grid grid-cols-1 gap-2 text-gray-600">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <span>文件格式不受支持</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <span>文件内容无法识别</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <span>文件可能已加密或损坏</span>
                    </div>
                  </div>
                </div>
                
                <Space size="large">
                  <Button 
                    type="primary" 
                    status="danger"
                    style={{
                      borderRadius: '20px',
                      height: '40px',
                      padding: '0 24px',
                      fontSize: '15px'
                    }}
                    onClick={closeAiModal}
                  >
                    关闭
                  </Button>
                  <Button 
                    style={{
                      borderRadius: '20px',
                      height: '40px',
                      padding: '0 24px',
                      fontSize: '15px'
                    }}
                    onClick={() => setRecognitionStatus('idle')}
                  >
                    重新上传
                  </Button>
                </Space>
              </div>
            </div>
          )}
        </div>
        
        {/* 添加与模态框匹配的动画样式 */}
        <style dangerouslySetInnerHTML={{ __html: waveAnimation }} />
      </Modal>
    </SaasLayout>
  );
};

export default FclRates; 