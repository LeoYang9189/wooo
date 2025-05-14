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
  Message,
  Switch,
  Grid,
  Tooltip,
  Tabs
} from '@arco-design/web-react';
import { 
  IconSearch, 
  IconUpload, 
  IconDownload, 
  IconEdit, 
  IconDelete, 
  IconRefresh, 
  IconFilter,
  IconList,
  IconDragDotVertical
} from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import SaasLayout from './SaasLayout';
import './InquiryManagement.css';

const Title = Typography.Title;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const TabPane = Tabs.TabPane;
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

// LCL和Air运价数据接口
interface LclAirDataItem {
  key: string;
  shipCompany: string;
  dischargePort: string;
  etd: string;
  transitType: string;
  transit: number;
  weight: number; // KGS
  volume: number; // CBM
  routeCode: string;
  vesselName: string;
  voyageNo: string;
  spaceStatus: string;
  remark: string;
}

// 波浪动画CSS样式
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

const RateQuery: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
  const [activeTab, setActiveTab] = useState<string>('fcl');
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
    volume: false,
    bookingDeadline: false
  });

  // 打开自定义表格弹窗
  const openCustomTableModal = () => {
    setCustomTableModalVisible(true);
  };

  // 关闭自定义表格弹窗
  const closeCustomTableModal = () => {
    setCustomTableModalVisible(false);
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
      volume: false,
      bookingDeadline: false
    });
  };

  // 应用表格列设置
  const applyColumnSettings = () => {
    // 这里可以添加保存设置的逻辑
    Message.success('表格设置已应用');
    closeCustomTableModal();
  };

  // 处理Tab切换
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setSelectedRowKeys([]);
  };

  // 打开组合方案查询页面
  const openCombinationQuery = () => {
    navigate('/combination-rate-query');
  };

  const onSelectChange = (selectedRowKeys: (string | number)[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  // FCL列定义
  const fclColumns = [
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

  // FCL数据
  const fclData: DataItem[] = Array(12).fill(null).map((_, index) => {
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

  // LCL和空运列定义
  const lclAirColumns = [
    {
      title: '船公司/航司',
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
      title: '重量(KGS)',
      dataIndex: 'weight',
      width: 110,
      render: (value: number) => <Tooltip content={`$ ${value}`} mini><span className="arco-ellipsis">$ {value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '体积(CBM)',
      dataIndex: 'volume',
      width: 110,
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
      title: '船名/航班',
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

  // LCL数据
  const lclData: LclAirDataItem[] = Array(12).fill(null).map((_, index) => {
    const randomWeight = (75 + Math.floor(Math.random() * 50));
    const randomVolume = (12 + Math.floor(Math.random() * 8));
    const portPrefix = ['MANILA-NORTH', 'MANILA-SOUTH', 'SUBIC BAY', 'CEBU', 'ILOILO', 'CAGAYAN DE ORO', 'BATANGAS'];
    const routeCodes = ['CPX4', 'CPS', 'CPX7', 'CPX6'];
    const vesselNames = ['MEDKON QUO', 'SITC PENANG', 'SITC YOKOHAMA', 'SITC XINCHENG'];
    
    return {
      key: `lcl-${index}`,
      shipCompany: 'SITC',
      dischargePort: portPrefix[Math.floor(Math.random() * portPrefix.length)],
      etd: `05-${15 + Math.floor(Math.random() * 4)}`,
      transitType: '直达',
      transit: 4 + Math.floor(Math.random() * 6),
      weight: randomWeight,
      volume: randomVolume,
      routeCode: routeCodes[Math.floor(Math.random() * routeCodes.length)],
      vesselName: vesselNames[Math.floor(Math.random() * vesselNames.length)],
      voyageNo: `25${10 + Math.floor(Math.random() * 9)}S`,
      spaceStatus: Math.random() > 0.3 ? '舱位充足' : '运费下调',
      remark: Math.random() > 0.5 ? 'LSE已含' : '运费下调',
    };
  });

  // 空运数据
  const airData: LclAirDataItem[] = Array(12).fill(null).map((_, index) => {
    const randomWeight = (125 + Math.floor(Math.random() * 75));
    const randomVolume = (5 + Math.floor(Math.random() * 6));
    const portPrefix = ['LAX', 'JFK', 'ORD', 'ATL', 'DFW', 'SFO', 'MIA'];
    const routeCodes = ['CA101', 'MU123', 'CZ456', 'CI789'];
    const flightNames = ['CA501', 'MU208', 'CZ308', 'CI118'];
    
    return {
      key: `air-${index}`,
      shipCompany: ['南方航空', '东方航空', '国际航空', '中华航空'][Math.floor(Math.random() * 4)],
      dischargePort: portPrefix[Math.floor(Math.random() * portPrefix.length)],
      etd: `05-${15 + Math.floor(Math.random() * 4)}`,
      transitType: Math.random() > 0.6 ? '直达' : '中转',
      transit: 1 + Math.floor(Math.random() * 3),
      weight: randomWeight,
      volume: randomVolume,
      routeCode: routeCodes[Math.floor(Math.random() * routeCodes.length)],
      vesselName: flightNames[Math.floor(Math.random() * flightNames.length)],
      voyageNo: `A${Math.floor(1000 + Math.random() * 9000)}`,
      spaceStatus: Math.random() > 0.3 ? '舱位充足' : '运费下调',
      remark: Math.random() > 0.5 ? 'AMS已含' : '运费下调',
    };
  });

  // 港前运价列定义
  const precarriageColumns = [
    {
      title: '类型',
      dataIndex: 'type',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '起运地',
      dataIndex: 'origin',
      width: 150,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '目的地',
      dataIndex: 'destination',
      width: 150,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '供应商',
      dataIndex: 'vendor',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '币种',
      dataIndex: 'currency',
      width: 80,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '20GP',
      dataIndex: '20gp',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '40GP',
      dataIndex: '40gp',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '40HC',
      dataIndex: '40hc',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '有效期',
      dataIndex: 'validDate',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
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

  // 港前运价数据
  const precarriageData = [
    {
      key: '1',
      type: '直达',
      origin: '苏州工业园区',
      destination: '洋山港',
      vendor: '德邦专线',
      currency: 'CNY',
      '20gp': '800.00',
      '40gp': '1200.00',
      '40hc': '1300.00',
      validDate: '2024-12-31',
    },
    {
      key: '2',
      type: '支线',
      origin: '太仓港',
      destination: '洋山港',
      vendor: '速航65号',
      currency: 'CNY',
      '20gp': '400.00',
      '40gp': '700.00',
      '40hc': '750.00',
      validDate: '2024-11-30',
    },
    {
      key: '3',
      type: '直达',
      origin: '嘉兴',
      destination: '宁波港',
      vendor: '安捷快线',
      currency: 'CNY',
      '20gp': '600.00',
      '40gp': '950.00',
      '40hc': '1000.00',
      validDate: '2024-10-31',
    },
    {
      key: '4',
      type: '直达',
      origin: '上海市奉贤区',
      destination: '洋山港',
      vendor: '申通物流',
      currency: 'CNY',
      '20gp': '650.00',
      '40gp': '950.00',
      '40hc': '1000.00',
      validDate: '2024-12-15',
    },
  ];

  // 尾程运价列定义
  const oncarriageColumns = [
    {
      title: '目的港',
      dataIndex: 'origin',
      width: 150,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '配送地址类型',
      dataIndex: 'addressType',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '邮编',
      dataIndex: 'zipCode',
      width: 100,
      render: (value: string, record: any) => {
        if (record.addressType === '亚马逊仓库' || record.addressType === '易仓') {
          return '-';
        }
        return <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>;
      },
      sorter: true,
      resizable: true,
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: 180,
      render: (value: string, record: any) => {
        if (record.addressType === '亚马逊仓库' || record.addressType === '易仓') {
          return '-';
        }
        return <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>;
      },
      sorter: true,
      resizable: true,
    },
    {
      title: '仓库代码',
      dataIndex: 'warehouseCode',
      width: 120,
      render: (value: string | null) => value ? <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip> : '-',
      sorter: true,
      resizable: true,
    },
    {
      title: '代理名称',
      dataIndex: 'agentName',
      width: 150,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '有效期',
      dataIndex: 'validDateRange',
      width: 180,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 150,
      render: (value: string) => <Tooltip content={value || '-'} mini><span className="arco-ellipsis">{value || '-'}</span></Tooltip>,
      sorter: true,
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

  // 尾程运价数据
  const oncarriageData = [
    {
      key: '1',
      origin: 'USLAX | LOS ANGELES',
      addressType: '第三方地址',
      zipCode: '92101',
      address: 'San Diego, CA',
      warehouseCode: null,
      agentName: 'XPO TRUCK LLC',
      validDateRange: '2024-05-01 至 2024-12-31',
      remark: '',
    },
    {
      key: '2',
      origin: 'USNYC | NEW YORK',
      addressType: '亚马逊仓库',
      zipCode: '',
      address: '',
      warehouseCode: 'ONT8',
      agentName: 'DRAYEASY INC',
      validDateRange: '2024-05-15 至 2024-11-30',
      remark: '',
    },
    {
      key: '3',
      origin: 'DEHAM | HAMBURG',
      addressType: '易仓',
      zipCode: '',
      address: '',
      warehouseCode: 'LAX203',
      agentName: 'AMERICAN FREIGHT SOLUTIONS',
      validDateRange: '2024-04-01 至 2024-12-15',
      remark: '需提前24小时预约',
    },
    {
      key: '4',
      origin: 'NLRTM | ROTTERDAM',
      addressType: '第三方地址',
      zipCode: '96001',
      address: 'Redding, CA',
      warehouseCode: null,
      agentName: 'WEST COAST CARRIERS LLC',
      validDateRange: '2024-03-01 至 2024-05-31',
      remark: '',
    },
  ];

  // 根据当前tab获取数据和列
  const getColumnsAndData = () => {
    switch (activeTab) {
      case 'lcl':
        return {
          columns: lclAirColumns,
          data: lclData
        };
      case 'air':
        return {
          columns: lclAirColumns,
          data: airData
        };
      case 'precarriage':
        return {
          columns: precarriageColumns,
          data: precarriageData
        };
      case 'oncarriage':
        return {
          columns: oncarriageColumns,
          data: oncarriageData
        };
      case 'fcl':
      default:
        return {
          columns: fclColumns,
          data: fclData
        };
    }
  };

  const { columns, data } = getColumnsAndData();

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
        <Breadcrumb.Item>运价查询</Breadcrumb.Item>
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
        {/* 添加Tab切换 */}
        <Tabs activeTab={activeTab} onChange={handleTabChange} className="mb-4">
          <TabPane key="fcl" title="整箱运价" />
          <TabPane key="lcl" title="拼箱运价" />
          <TabPane key="air" title="空运运价" />
          <TabPane key="precarriage" title="港前运价" />
          <TabPane key="oncarriage" title="尾程运价" />
        </Tabs>
        
        <div className="flex justify-between mb-4">
          <Space>
            {/* 组合方案查询按钮替代新增运价按钮 */}
            <Button 
              type="primary" 
              icon={<IconSearch />}
              onClick={openCombinationQuery}
            >
              组合方案查询
            </Button>
            <Button icon={<IconUpload />}>批量导入</Button>
            <Button icon={<IconDownload />}>导出列表</Button>
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
            </Col>
            
            {/* 第二列 */}
            <Col span={8}>
              {activeTab === 'fcl' && (
                <>
                  <div className="custom-column-item border border-gray-200 rounded p-4">
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
                </>
              )}

              {(activeTab === 'lcl' || activeTab === 'air') && (
                <>
                  <div className="custom-column-item border border-gray-200 rounded p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <IconDragDotVertical className="text-gray-400 mr-2" />
                        <span>重量(KGS)</span>
                      </div>
                      <Switch 
                        checked={columnVisibility.weight} 
                        onChange={(checked) => handleColumnVisibilityChange("weight", checked)}
                      />
                    </div>
                  </div>
                  
                  <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <IconDragDotVertical className="text-gray-400 mr-2" />
                        <span>体积(CBM)</span>
                      </div>
                      <Switch 
                        checked={columnVisibility.volume} 
                        onChange={(checked) => handleColumnVisibilityChange("volume", checked)}
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <IconDragDotVertical className="text-gray-400 mr-2" />
                    <span>航线代码</span>
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
                    <span>船名</span>
                  </div>
                  <Switch 
                    checked={columnVisibility.vesselName} 
                    onChange={(checked) => handleColumnVisibilityChange('vesselName', checked)}
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
            </Col>
          </Row>
        </div>
      </Modal>

      {/* 添加波浪动画样式 */}
      <style dangerouslySetInnerHTML={{ __html: waveAnimation }} />
    </SaasLayout>
  );
};

export default RateQuery; 