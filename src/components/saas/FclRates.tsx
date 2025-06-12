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
  Modal,
  Upload,
  Message,
  Progress,
  Switch,
  Grid,
  Tooltip,
  Tabs
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
  IconRobot,
  IconList,
  IconDragDotVertical
} from '@arco-design/web-react/icon';
import '@arco-design/web-react/dist/css/arco.css';
import SaasLayout from './SaasLayout';
import './InquiryManagement.css';
import { useNavigate } from 'react-router-dom';

const Title = Typography.Title;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

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
  const [activeTab, setActiveTab] = useState<string>('fcl');
  const navigate = useNavigate();

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
          <Tag color={value === '舱位充足' ? 'blue' : 'orange'} size="small">
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

  // ====== 港前运价 columns & data ======
  const precarriageColumns = [
    { title: '港前运价编号', dataIndex: 'code', width: 120 },
    { title: '运价类型', dataIndex: 'rateType', width: 100 },
    { title: '支线类型', dataIndex: 'sublineType', width: 120, render: (v: string|null) => v || '-' },
    { title: '起运地', dataIndex: 'origin', width: 180 },
    { title: '起运港', dataIndex: 'destination', width: 150 },
    { title: '码头', dataIndex: 'terminal', width: 120 },
    { title: '供应商', dataIndex: 'vendor', width: 150 },
    { title: '20GP', dataIndex: '20gp', width: 100 },
    { title: '40GP', dataIndex: '40gp', width: 100 },
    { title: '40HC', dataIndex: '40hc', width: 100 },
    { title: '40NOR', dataIndex: '40nor', width: 100 },
    { title: '45HC', dataIndex: '45hc', width: 100 },
    { title: '有效期', dataIndex: 'validDateRange', width: 180 },
    { title: '状态', dataIndex: 'status', width: 100 },
    { title: '备注', dataIndex: 'remark', width: 150 },
  ];
  const precarriageData = [
    { key: '1', code: 'PCR2024050001', rateType: '直拖', sublineType: null, origin: '浙江省杭州市萧山区', destination: 'CNSHA | SHANGHAI', terminal: '洋山', vendor: '安吉物流', '20gp': 800, '40gp': 1200, '40hc': 1300, '40nor': 1250, '45hc': 1500, validDateRange: '2024-05-01 至 2024-12-31', status: '正常', remark: '' },
    { key: '2', code: 'PCR2024050002', rateType: '支线', sublineType: '湖州海铁', origin: '浙江省湖州市吴兴区', destination: 'CNNGB | NINGBO', terminal: '北仑', vendor: '中远海运', '20gp': 400, '40gp': 700, '40hc': 750, '40nor': 720, '45hc': 850, validDateRange: '2024-05-15 至 2024-11-30', status: '正常', remark: '' },
    { key: '3', code: 'PCR2024050003', rateType: '直拖', sublineType: null, origin: '江苏省苏州市工业园区', destination: 'CNSHA | SHANGHAI', terminal: '外高桥', vendor: '德邦物流', '20gp': 850, '40gp': 1250, '40hc': 1350, '40nor': 1300, '45hc': 1550, validDateRange: '2024-04-01 至 2024-12-15', status: '正常', remark: '需提前24小时预约' },
    { key: '4', code: 'PCR2024040001', rateType: '直拖', sublineType: null, origin: '上海市嘉定区', destination: 'CNSHA | SHANGHAI', terminal: '洋山', vendor: '顺丰物流', '20gp': 750, '40gp': 1150, '40hc': 1250, '40nor': 1200, '45hc': 1450, validDateRange: '2024-03-01 至 2024-05-31', status: '过期', remark: '' },
    { key: '5', code: 'PCR2024050004', rateType: '支线', sublineType: '乍浦支线', origin: '浙江省嘉兴市平湖市', destination: 'CNSHA | SHANGHAI', terminal: '洋山', vendor: '海得航运', '20gp': 450, '40gp': 750, '40hc': 800, '40nor': 780, '45hc': 920, validDateRange: '2024-05-01 至 2024-10-31', status: '正常', remark: '周一、周四发船' },
    { key: '6', code: 'PCR2024030001', rateType: '支线', sublineType: '海宁支线', origin: '浙江省嘉兴市海宁市', destination: 'CNNGB | NINGBO', terminal: '北仑', vendor: '浙江海洋航运', '20gp': 500, '40gp': 800, '40hc': 850, '40nor': 830, '45hc': 950, validDateRange: '2024-03-15 至 2024-04-30', status: '下架', remark: '已停运' },
  ];
  // ====== 尾程运价 columns & data ======
  const oncarriageColumns = [
    { title: '尾程运价编号', dataIndex: 'code', width: 120 },
    { title: '目的港', dataIndex: 'origin', width: 150 },
    { title: '配送地址类型', dataIndex: 'addressType', width: 120 },
    { title: '邮编', dataIndex: 'zipCode', width: 100 },
    { title: '地址', dataIndex: 'address', width: 180 },
    { title: '仓库代码', dataIndex: 'warehouseCode', width: 120, render: (v: string|null) => v || '-' },
    { title: '代理名称', dataIndex: 'agentName', width: 150 },
    { title: '20GP', dataIndex: '20gp', width: 100 },
    { title: '40GP', dataIndex: '40gp', width: 100 },
    { title: '40HC', dataIndex: '40hc', width: 100 },
    { title: '40NOR', dataIndex: '40nor', width: 100 },
    { title: '45HC', dataIndex: '45hc', width: 100 },
    { title: '有效期', dataIndex: 'validDateRange', width: 180 },
    { title: '状态', dataIndex: 'status', width: 100 },
    { title: '备注', dataIndex: 'remark', width: 150 },
  ];
  const oncarriageData = [
    { key: '1', code: 'LMR2024050001', origin: 'USLAX | LOS ANGELES', addressType: '第三方地址', zipCode: '92101', address: 'San Diego, CA', warehouseCode: null, agentName: 'XPO TRUCK LLC', validDateRange: '2024-05-01 至 2024-12-31', remark: '', status: '正常', '20gp': 1200, '40gp': 1800, '40hc': 1900, '45hc': 2200, '40nor': 2000 },
    { key: '2', code: 'LMR2024050002', origin: 'USNYC | NEW YORK', addressType: '亚马逊仓库', zipCode: '', address: '', warehouseCode: 'ONT8', agentName: 'DRAYEASY INC', validDateRange: '2024-05-15 至 2024-11-30', remark: '', status: '正常', '20gp': 980, '40gp': 1650, '40hc': 1750, '45hc': 2050, '40nor': 1800 },
    { key: '3', code: 'LMR2024050003', origin: 'DEHAM | HAMBURG', addressType: '易仓', zipCode: '', address: '', warehouseCode: 'LAX203', agentName: 'AMERICAN FREIGHT SOLUTIONS', validDateRange: '2024-04-01 至 2024-12-15', remark: '需提前24小时预约', status: '正常', '20gp': 1300, '40gp': 1950, '40hc': 2050, '45hc': 2400, '40nor': 2100 },
    { key: '4', code: 'LMR2024040001', origin: 'NLRTM | ROTTERDAM', addressType: '第三方地址', zipCode: '96001', address: 'Redding, CA', warehouseCode: null, agentName: 'WEST COAST CARRIERS LLC', validDateRange: '2024-03-01 至 2024-05-31', remark: '', status: '过期', '20gp': 1100, '40gp': 1700, '40hc': 1800, '45hc': 2150, '40nor': 1950 },
  ];

  // 新增运价按钮点击事件
  const handleAddRate = () => {
    if (activeTab === 'precarriage') {
      navigate('/controltower/saas/create-precarriage-rate');
      return;
    }
    if (activeTab === 'oncarriage') {
      navigate('/controltower/saas/create-lastmile-rate');
      return;
    }
    // 其它Tab可自定义跳转或提示
    Message.info('请在对应Tab实现新增运价功能');
  };

  // 筛选区收起/展开状态
  const [filterCollapsed, setFilterCollapsed] = useState(false);

  // 切换筛选区收起/展开
  const toggleFilterCollapse = () => {
    setFilterCollapsed(!filterCollapsed);
  };

  // 修改内容区渲染逻辑
  const renderContent = () => {
    if (activeTab === 'precarriage') {
      return (
        <Table
          rowKey="key"
          columns={precarriageColumns}
          data={precarriageData}
          pagination={pagination}
          scroll={{ x: 1800 }}
          border={false}
          className="mt-4 inquiry-table-nowrap"
        />
      );
    }
    if (activeTab === 'oncarriage') {
      return (
        <Table
          rowKey="key"
          columns={oncarriageColumns}
          data={oncarriageData}
          pagination={pagination}
          scroll={{ x: 1800 }}
          border={false}
          className="mt-4 inquiry-table-nowrap"
        />
      );
    }
    // 其它Tab保持原有内容
    return (
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
    );
  };

  return (
    <SaasLayout menuSelectedKey="2" breadcrumb={
      <Breadcrumb>
        <Breadcrumb.Item>运价管理</Breadcrumb.Item>
        <Breadcrumb.Item>运价维护</Breadcrumb.Item>
      </Breadcrumb>
    }>
      <Card>
        <Tabs activeTab={activeTab} onChange={setActiveTab} className="mb-4">
          <Tabs.TabPane key="fcl" title="整箱运价" />
          <Tabs.TabPane key="lcl" title="拼箱运价" />
          <Tabs.TabPane key="air" title="空运运价" />
          <Tabs.TabPane key="precarriage" title="港前运价" />
          <Tabs.TabPane key="oncarriage" title="尾程运价" />
        </Tabs>
        <Card className="mb-4">
          <Title heading={6} className="mb-4">筛选条件</Title>
          {!filterCollapsed && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">船公司</div>
                <Select placeholder="请选择船公司" style={{ width: '100%' }} allowClear>
                  <Option value="SITC">SITC</Option>
                  <Option value="COSCO">COSCO</Option>
                  <Option value="MSK">MSK</Option>
                  <Option value="ONE">ONE</Option>
                </Select>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">直达/中转</div>
                <Select placeholder="请选择直达/中转" style={{ width: '100%' }} allowClear>
                  <Option value="direct">直达</Option>
                  <Option value="transit">中转</Option>
                </Select>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">起运港</div>
                <Select placeholder="请选择起运港" style={{ width: '100%' }} allowClear>
                  <Option value="CNSHA">上海</Option>
                  <Option value="CNNGB">宁波</Option>
                  <Option value="CNQIN">青岛</Option>
                </Select>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">卸货港</div>
                <Select placeholder="请选择卸货港" style={{ width: '100%' }} allowClear>
                  <Option value="USLAX">洛杉矶</Option>
                  <Option value="USNYC">纽约</Option>
                  <Option value="DEHAM">汉堡</Option>
                </Select>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">开船日期</div>
                <RangePicker style={{ width: '100%' }} />
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">航线</div>
                <Select placeholder="请选择航线" style={{ width: '100%' }} allowClear>
                  <Option value="asia-america">亚洲-美洲</Option>
                  <Option value="asia-europe">亚洲-欧洲</Option>
                </Select>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">船名</div>
                <Select placeholder="请选择船名" style={{ width: '100%' }} allowClear>
                  <Option value="COSCO SHIPPING UNIVERSE">COSCO SHIPPING UNIVERSE</Option>
                  <Option value="MSC GULSUN">MSC GULSUN</Option>
                </Select>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">航次</div>
                <Select placeholder="请选择航次" style={{ width: '100%' }} allowClear>
                  <Option value="001E">001E</Option>
                  <Option value="002W">002W</Option>
                </Select>
              </div>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <Space>
              <Button type="primary" icon={<IconSearch />}>查询</Button>
              <Button icon={<IconRefresh />}>重置</Button>
              <Button icon={<IconFilter />} onClick={toggleFilterCollapse}>
                {filterCollapsed ? '展开' : '收起'}
              </Button>
            </Space>
          </div>
        </Card>
        <Card>
          <div className="flex justify-between mb-4">
            <Space>
              <Button type="primary" icon={<IconPlus />} onClick={handleAddRate}>新增运价</Button>
              <Button icon={<IconUpload />}>批量导入</Button>
              <Button icon={<IconDownload />}>导出列表</Button>
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
            <div 
              className="flex items-center text-blue-500 cursor-pointer hover:text-blue-700"
              onClick={openCustomTableModal}
            >
              <IconList className="mr-1" />
              <span>自定义表格</span>
            </div>
          </div>
          {renderContent()}
          <div className="mt-2 text-gray-500 text-sm">共 9232 条</div>
        </Card>
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
                      <div className="w-4 h-4 rounded-full bg-blue-500 mr-2 flex-shrink-0"></div>
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
                <div className="absolute top-0 right-0 w-60 h-60 bg-blue-50 rounded-full opacity-60 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-50 rounded-full opacity-40 -ml-10 -mb-10"></div>
              </div>
              
              <div className="relative z-10">
                <div className="mb-8 flex justify-center">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse opacity-10"></div>
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse opacity-20" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-center text-white shadow-lg">
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
                      <div className="text-2xl font-bold text-blue-500 mb-1">28</div>
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
                    background: 'linear-gradient(45deg, #1890ff, #4dabf5)',
                    borderRadius: '24px',
                    height: '44px',
                    padding: '0 32px',
                    fontSize: '16px',
                    fontWeight: 500,
                    border: 'none',
                    boxShadow: '0 6px 16px rgba(24, 144, 255, 0.25)'
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