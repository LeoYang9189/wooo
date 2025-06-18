import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Select, 
  DatePicker, 
  Card, 
  Breadcrumb,
  Tag,
  Modal,
  Message,
  Switch,
  Tooltip,
  Tabs,
  Input,
  Drawer,
  Grid,
  Typography
} from '@arco-design/web-react';
import { 
  IconSearch, 
  IconUpload, 
  IconDownload, 
  IconEdit, 
  IconDelete, 
  IconRefresh, 
  IconList,
  IconDragDotVertical,
  IconEye,
  IconDown,
  IconUp,
  IconSettings
} from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import ControlTowerSaasLayout from "./ControlTowerSaasLayout";
import './InquiryManagement.css';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const TabPane = Tabs.TabPane;
const Row = Grid.Row;
const Col = Grid.Col;
const Title = Typography.Title;

// 筛选模式枚举
export enum FilterMode {
  EQUAL = 'equal',
  NOT_EQUAL = 'notEqual', 
  CONTAINS = 'contains',
  NOT_CONTAINS = 'notContains',
  IS_EMPTY = 'isEmpty',
  IS_NOT_EMPTY = 'isNotEmpty',
  BATCH = 'batch'
}

// 筛选模式选项
export const FilterModeOptions = [
  { label: '等于', value: FilterMode.EQUAL },
  { label: '不等于', value: FilterMode.NOT_EQUAL },
  { label: '包含', value: FilterMode.CONTAINS },
  { label: '不包含', value: FilterMode.NOT_CONTAINS },
  { label: '为空', value: FilterMode.IS_EMPTY },
  { label: '不为空', value: FilterMode.IS_NOT_EMPTY },
  { label: '批量', value: FilterMode.BATCH }
];

// 筛选字段配置接口
export interface FilterFieldConfig {
  key: string;
  label: string;
  type: 'text' | 'select' | 'dateRange' | 'number';
  options?: { label: string; value: string }[];
  placeholder?: string;
  width?: number;
}

// 筛选条件值接口
export interface FilterCondition {
  key: string;
  mode: FilterMode;
  value: any;
  visible: boolean;
}

// 筛选方案接口
export interface FilterScheme {
  id: string;
  name: string;
  conditions: FilterCondition[];
  isDefault?: boolean;
}

// 根据不同Tab定义不同的筛选字段配置
const getFilterFieldsByTab = (activeTab: string): FilterFieldConfig[] => {
  switch (activeTab) {
    case 'fcl':
    case 'lcl':
    case 'air':
      return [
        {
          key: 'shipCompany',
          label: '船公司',
          type: 'select',
          options: [
            { label: 'SITC', value: 'SITC' },
            { label: 'COSCO', value: 'COSCO' },
            { label: 'MSK', value: 'MSK' },
            { label: 'ONE', value: 'ONE' }
          ],
          placeholder: '请选择船公司'
        },
        {
          key: 'transitType',
          label: '直达/中转',
          type: 'select',
          options: [
            { label: '直达', value: 'direct' },
            { label: '中转', value: 'transit' }
          ],
          placeholder: '请选择直达/中转'
        },
        {
          key: 'departurePort',
          label: '起运港',
          type: 'select',
          options: [
            { label: '上海', value: 'CNSHA' },
            { label: '宁波', value: 'CNNGB' },
            { label: '青岛', value: 'CNQIN' }
          ],
          placeholder: '请选择起运港'
        },
        {
          key: 'dischargePort',
          label: '卸货港',
          type: 'select',
          options: [
            { label: '洛杉矶', value: 'USLAX' },
            { label: '纽约', value: 'USNYC' },
            { label: '汉堡', value: 'DEHAM' }
          ],
          placeholder: '请选择卸货港'
        },
        {
          key: 'etd',
          label: '开船日期',
          type: 'dateRange',
          placeholder: '请选择开船日期范围'
        },
        {
          key: 'route',
          label: '航线',
          type: 'select',
          options: [
            { label: '亚洲-美洲', value: 'asia-america' },
            { label: '亚洲-欧洲', value: 'asia-europe' }
          ],
          placeholder: '请选择航线'
        },
        {
          key: 'vesselName',
          label: '船名',
          type: 'select',
          options: [
            { label: 'COSCO SHIPPING UNIVERSE', value: 'COSCO SHIPPING UNIVERSE' },
            { label: 'MSC GULSUN', value: 'MSC GULSUN' }
          ],
          placeholder: '请选择船名'
        },
        {
          key: 'voyageNo',
          label: '航次',
          type: 'select',
          options: [
            { label: '001E', value: '001E' },
            { label: '002W', value: '002W' }
          ],
          placeholder: '请选择航次'
        }
      ];
    case 'precarriage':
      return [
        {
          key: 'code',
          label: '港前运价编号',
          type: 'text',
          placeholder: '请输入港前运价编号'
        },
        {
          key: 'rateType',
          label: '运价类型',
          type: 'select',
          options: [
            { label: '直拖', value: '直拖' },
            { label: '支线', value: '支线' }
          ],
          placeholder: '请选择运价类型'
        }
      ];
    case 'oncarriage':
      return [
        {
          key: 'code',
          label: '尾程运价编号',
          type: 'text',
          placeholder: '请输入尾程运价编号'
        },
        {
          key: 'addressType',
          label: '地址类型',
          type: 'select',
          options: [
            { label: '第三方地址', value: '第三方地址' },
            { label: '亚马逊仓库', value: '亚马逊仓库' },
            { label: '易仓', value: '易仓' }
          ],
          placeholder: '请选择地址类型'
        }
      ];
    default:
      return [];
  }
};

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


const RateQuery: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
  const [activeTab, setActiveTab] = useState<string>('fcl');
  const [customTableModalVisible, setCustomTableModalVisible] = useState(false);
  
  // 完整的列可见性状态 - 包含所有可能的字段
  const [columnVisibility, setColumnVisibility] = useState({
    routeCode: true,
    departurePort: true,
    dischargePort: true,
    directTransit: true,
    transitPort: true,
    spaceStatus: true,
    priceStatus: true,
    spaceQuality: true,
    currency: true,
    containerType: true,
    '20gp': true,
    '40gp': true,
    '40hc': true,
    '40nor': true,
    '45hc': true,
    costTaxRate: false,
    sellingTaxRate: false,
    paymentTerms: false,
    shipCompany: true,
    contractNo: false,
    outportCode: false,
    routeCodeAlt: false,
    rateSource: false,
    vesselSchedule: false,
    voyage: false,
    serviceMode: false,
    serviceCode: false,
    cargoType: false,
    cargo: false,
    tariffCode: false,
    freeStorageDays: false,
    specialPriceStatus: false,
    effectiveDateType: false,
    expiryDateType: false,
    chargeSpecialNote: false,
    destinationTariffCode: false,
    transportMode: false,
    code: false,
    na: false,
    nac: false,
    amsEns: false,
    overweightNote: false,
    importSourceFileWatermark: false,
    customSpec: false,
    notes: false,
    validFrom: false,
    validTo: false,
    branch: false,
    entryPerson: false,
    createDate: false,
    rateModifier: false,
    modifyDate: false,
    approver: false,
    approvalDate: false,
    cutoffDate: false,
    destinationRegion: false,
    rateType: false,
    vesselName: true,
    voyageNo: true,
    '20nor': false,
    etd: true,
    eta: false,
    transitType: true,
    transit: true,
    consignee: false,
    status: false,
    highlighted: false,
    '45hq': false,
    freeTime: false,
    validPeriod: false,
    updated: false,
    updatedBy: false,
    weight: false,
    volume: false,
    bookingDeadline: false
  });

  // 筛选功能状态
  const [filterExpanded, setFilterExpanded] = useState(true);
  const [filterFieldModalVisible, setFilterFieldModalVisible] = useState(false);
  const [schemeModalVisible, setSchemeModalVisible] = useState(false);
  const [newSchemeName, setNewSchemeName] = useState('');
  
  // 筛选条件状态
  const [filterConditions, setFilterConditions] = useState<FilterCondition[]>([]);
  const [filterSchemes, setFilterSchemes] = useState<FilterScheme[]>([]);
  const [currentSchemeId, setCurrentSchemeId] = useState<string>('default');

  // 拖拽状态
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);
  const [columnOrder, setColumnOrder] = useState<string[]>([]);

  // 筛选字段拖拽状态
  const [draggedFilterField, setDraggedFilterField] = useState<string | null>(null);
  const [dragOverFilterField, setDragOverFilterField] = useState<string | null>(null);
  const [filterFieldOrder, setFilterFieldOrder] = useState<string[]>([]);

  // 筛选区收起/展开状态

  // useEffect 初始化字段顺序
  useEffect(() => {
    const allColumns = Object.keys(columnVisibility);
    setColumnOrder(allColumns);
    
    const filterFields = getFilterFieldsByTab(activeTab);
    const filterFieldKeys = filterFields.map(f => f.key);
    setFilterFieldOrder(filterFieldKeys);
  }, [activeTab]);

  // useEffect 初始化筛选条件
  useEffect(() => {
    const defaultConditions = initializeDefaultConditions(activeTab);
    setFilterConditions(defaultConditions);
    
    const defaultScheme = initializeDefaultScheme(activeTab);
    setFilterSchemes([defaultScheme]);
  }, [activeTab]);

  // 切换筛选区收起/展开

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
      routeCode: true,
      departurePort: true,
      dischargePort: true,
      directTransit: true,
      transitPort: true,
      spaceStatus: true,
      priceStatus: true,
      spaceQuality: true,
      currency: true,
      containerType: true,
      '20gp': true,
      '40gp': true,
      '40hc': true,
      '40nor': true,
      '45hc': true,
      costTaxRate: false,
      sellingTaxRate: false,
      paymentTerms: false,
      shipCompany: true,
      contractNo: false,
      outportCode: false,
      routeCodeAlt: false,
      rateSource: false,
      vesselSchedule: false,
      voyage: false,
      serviceMode: false,
      serviceCode: false,
      cargoType: false,
      cargo: false,
      tariffCode: false,
      freeStorageDays: false,
      specialPriceStatus: false,
      effectiveDateType: false,
      expiryDateType: false,
      chargeSpecialNote: false,
      destinationTariffCode: false,
      transportMode: false,
      code: false,
      na: false,
      nac: false,
      amsEns: false,
      overweightNote: false,
      importSourceFileWatermark: false,
      customSpec: false,
      notes: false,
      validFrom: false,
      validTo: false,
      branch: false,
      entryPerson: false,
      createDate: false,
      rateModifier: false,
      modifyDate: false,
      approver: false,
      approvalDate: false,
      cutoffDate: false,
      destinationRegion: false,
      rateType: false,
      vesselName: true,
      voyageNo: true,
      '20nor': false,
      etd: true,
      eta: false,
      transitType: true,
      transit: true,
      consignee: false,
      status: false,
      highlighted: false,
      '45hq': false,
      freeTime: false,
      validPeriod: false,
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
    navigate('/controltower/saas/combination-rate-query');
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

  // 港前运价状态颜色映射
  const precarriageStatusColorClasses: Record<string, string> = {
    '正常': 'bg-green-500',
    '过期': 'bg-gray-500',
    '下架': 'bg-red-500'
  };

  // 获取港前运价状态标签
  const getPrecarriageRateStatusTag = (status: string) => {
    const colorClass = precarriageStatusColorClasses[status] || 'bg-blue-500';
    
    return (
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full ${colorClass} mr-2`}></div>
        <span>{status}</span>
      </div>
    );
  };

  // 处理查看港前运价详情
  const handleViewPrecarriageRate = (id: string) => {
    navigate(`/controltower/saas/view-precarriage-rate/${id}`);
  };

  // 港前运价列定义 - 复刻自PrecarriageRates.tsx
  const precarriageColumns = [
    {
      title: '港前运价编号',
      dataIndex: 'code',
      width: 120,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '运价类型',
      dataIndex: 'rateType',
      width: 100,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '支线类型',
      dataIndex: 'sublineType',
      width: 120,
      sorter: true,
      resizable: true,
      render: (value: string | null) => value ? <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip> : '-'
    },
    {
      title: '起运地',
      dataIndex: 'origin',
      width: 180,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '起运港',
      dataIndex: 'destination',
      width: 150,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '码头',
      dataIndex: 'terminal',
      width: 120,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '供应商',
      dataIndex: 'vendor',
      width: 150,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '20GP',
      dataIndex: '20gp',
      width: 100,
      sorter: true,
      resizable: true,
      render: (value: number) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '40GP',
      dataIndex: '40gp',
      width: 100,
      sorter: true,
      resizable: true,
      render: (value: number) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '40HC',
      dataIndex: '40hc',
      width: 100,
      sorter: true,
      resizable: true,
      render: (value: number) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '40NOR',
      dataIndex: '40nor',
      width: 100,
      sorter: true,
      resizable: true,
      render: (value: number) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '45HC',
      dataIndex: '45hc',
      width: 100,
      sorter: true,
      resizable: true,
      render: (value: number) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '有效期',
      dataIndex: 'validDateRange',
      width: 180,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini>{getPrecarriageRateStatusTag(value)}</Tooltip>
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 150,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '操作',
      dataIndex: 'operations',
      fixed: 'right' as const,
      width: 80,
      render: (_: any, record: PrecarriageDataItem) => (
        <Button type="text" size="mini" icon={<IconEye />} onClick={() => handleViewPrecarriageRate(record.key)}>查看</Button>
      ),
    },
  ];

  // 港前运价数据接口
  interface PrecarriageDataItem {
    key: string;
    code: string; // 港前运价编号
    rateType: string; // 运价类型
    sublineType: string | null; // 支线类型
    origin: string; // 起运地
    destination: string; // 起运港
    terminal: string; // 码头
    vendor: string; // 供应商
    '20gp': number;
    '40gp': number;
    '40hc': number;
    '40nor': number;
    '45hc': number;
    validDateRange: string; // 有效期区间
    status: '正常' | '过期' | '下架'; // 状态
    remark: string; // 备注
  }

  // 港前运价数据
  const precarriageData: PrecarriageDataItem[] = [
    {
      key: '1',
      code: 'PCR2024050001',
      rateType: '直拖',
      sublineType: null,
      origin: '浙江省杭州市萧山区',
      destination: 'CNSHA | SHANGHAI',
      terminal: '洋山',
      vendor: '安吉物流',
      '20gp': 800,
      '40gp': 1200,
      '40hc': 1300,
      '40nor': 1250,
      '45hc': 1500,
      validDateRange: '2024-05-01 至 2024-12-31',
      status: '正常',
      remark: '',
    },
    {
      key: '2',
      code: 'PCR2024050002',
      rateType: '支线',
      sublineType: '湖州海铁',
      origin: '浙江省湖州市吴兴区',
      destination: 'CNNGB | NINGBO',
      terminal: '北仑',
      vendor: '中远海运',
      '20gp': 400,
      '40gp': 700,
      '40hc': 750,
      '40nor': 720,
      '45hc': 850,
      validDateRange: '2024-05-15 至 2024-11-30',
      status: '正常',
      remark: '',
    },
    {
      key: '3',
      code: 'PCR2024050003',
      rateType: '直拖',
      sublineType: null,
      origin: '江苏省苏州市工业园区',
      destination: 'CNSHA | SHANGHAI',
      terminal: '外高桥',
      vendor: '德邦物流',
      '20gp': 850,
      '40gp': 1250,
      '40hc': 1350,
      '40nor': 1300,
      '45hc': 1550,
      validDateRange: '2024-04-01 至 2024-12-15',
      status: '正常',
      remark: '需提前24小时预约',
    },
    {
      key: '4',
      code: 'PCR2024040001',
      rateType: '直拖',
      sublineType: null,
      origin: '上海市嘉定区',
      destination: 'CNSHA | SHANGHAI',
      terminal: '洋山',
      vendor: '顺丰物流',
      '20gp': 750,
      '40gp': 1150,
      '40hc': 1250,
      '40nor': 1200,
      '45hc': 1450,
      validDateRange: '2024-03-01 至 2024-05-31',
      status: '过期',
      remark: '',
    },
  ];

  // 尾程运价状态颜色映射
  const lastMileStatusColorClasses: Record<string, string> = {
    '正常': 'bg-green-500',
    '过期': 'bg-gray-500',
    '下架': 'bg-red-500'
  };

  // 获取尾程运价状态标签
  const getLastMileRateStatusTag = (status: string) => {
    const colorClass = lastMileStatusColorClasses[status] || 'bg-blue-500';
    
    return (
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full ${colorClass} mr-2`}></div>
        <span>{status}</span>
      </div>
    );
  };

  // 尾程运价数据接口
  interface OncarriageDataItem {
    key: string;
    code: string; // 尾程运价编号
    origin: string; // 目的港
    addressType: '第三方地址' | '亚马逊仓库' | '易仓'; // 配送地址类型
    zipCode: string; // 邮编
    address: string; // 地址
    warehouseCode: string | null; // 仓库代码
    agentName: string; // 代理名称
    validDateRange: string; // 有效期区间
    remark: string; // 备注
    status: '正常' | '过期' | '下架'; // 状态
    '20gp': number; // 20GP价格
    '40gp': number; // 40GP价格
    '40hc': number; // 40HC价格
    '45hc': number; // 45HC价格
    '40nor': number; // 40NOR价格
  }
  
  // 处理查看尾程运价详情
  const handleViewLastMileRate = (id: string) => {
    navigate(`/controltower/saas/view-lastmile-rate/${id}`);
  };

  // 尾程运价列定义
  const oncarriageColumns = [
    {
      title: '尾程运价编号',
      dataIndex: 'code',
      width: 120,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '目的港',
      dataIndex: 'origin',
      width: 150,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '配送地址类型',
      dataIndex: 'addressType',
      width: 120,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '邮编',
      dataIndex: 'zipCode',
      width: 100,
      sorter: true,
      resizable: true,
      render: (value: string, record: OncarriageDataItem) => {
        if (record.addressType === '亚马逊仓库' || record.addressType === '易仓') {
          return '-';
        }
        return <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>;
      }
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: 180,
      sorter: true,
      resizable: true,
      render: (value: string, record: OncarriageDataItem) => {
        if (record.addressType === '亚马逊仓库' || record.addressType === '易仓') {
          return '-';
        }
        return <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>;
      }
    },
    {
      title: '仓库代码',
      dataIndex: 'warehouseCode',
      width: 120,
      sorter: true,
      resizable: true,
      render: (value: string | null) => value ? <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip> : '-'
    },
    {
      title: '代理名称',
      dataIndex: 'agentName',
      width: 150,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '20GP',
      dataIndex: '20gp',
      width: 100,
      sorter: true,
      resizable: true,
      render: (value: number) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '40GP',
      dataIndex: '40gp',
      width: 100,
      sorter: true,
      resizable: true,
      render: (value: number) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '40HC',
      dataIndex: '40hc',
      width: 100,
      sorter: true,
      resizable: true,
      render: (value: number) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '40NOR',
      dataIndex: '40nor',
      width: 100,
      sorter: true,
      resizable: true,
      render: (value: number) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '45HC',
      dataIndex: '45hc',
      width: 100,
      sorter: true,
      resizable: true,
      render: (value: number) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '有效期',
      dataIndex: 'validDateRange',
      width: 180,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini>{getLastMileRateStatusTag(value)}</Tooltip>
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 150,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value || '-'}</span></Tooltip>
    },
    {
      title: '操作',
      dataIndex: 'operations',
      fixed: 'right' as const,
      width: 80,
      render: (_: any, record: OncarriageDataItem) => (
        <Button type="text" size="mini" icon={<IconEye />} onClick={() => handleViewLastMileRate(record.key)}>查看</Button>
      ),
    },
  ];

  // 尾程运价数据
  const oncarriageData: OncarriageDataItem[] = [
    {
      key: '1',
      code: 'LMR2024050001',
      origin: 'USLAX | LOS ANGELES',
      addressType: '第三方地址',
      zipCode: '92101',
      address: 'San Diego, CA',
      warehouseCode: null,
      agentName: 'XPO TRUCK LLC',
      validDateRange: '2024-05-01 至 2024-12-31',
      remark: '',
      status: '正常',
      '20gp': 1200,
      '40gp': 1800,
      '40hc': 1900,
      '45hc': 2200,
      '40nor': 2000
    },
    {
      key: '2',
      code: 'LMR2024050002',
      origin: 'USNYC | NEW YORK',
      addressType: '亚马逊仓库',
      zipCode: '',
      address: '',
      warehouseCode: 'ONT8',
      agentName: 'DRAYEASY INC',
      validDateRange: '2024-05-15 至 2024-11-30',
      remark: '',
      status: '正常',
      '20gp': 980,
      '40gp': 1650,
      '40hc': 1750,
      '45hc': 2050,
      '40nor': 1800
    },
    {
      key: '3',
      code: 'LMR2024050003',
      origin: 'DEHAM | HAMBURG',
      addressType: '易仓',
      zipCode: '',
      address: '',
      warehouseCode: 'LAX203',
      agentName: 'AMERICAN FREIGHT SOLUTIONS',
      validDateRange: '2024-04-01 至 2024-12-15',
      remark: '需提前24小时预约',
      status: '正常',
      '20gp': 1300,
      '40gp': 1950,
      '40hc': 2050,
      '45hc': 2400,
      '40nor': 2100
    },
    {
      key: '4',
      code: 'LMR2024040001',
      origin: 'NLRTM | ROTTERDAM',
      addressType: '第三方地址',
      zipCode: '96001',
      address: 'Redding, CA',
      warehouseCode: null,
      agentName: 'WEST COAST CARRIERS LLC',
      validDateRange: '2024-03-01 至 2024-05-31',
      remark: '',
      status: '过期',
      '20gp': 1100,
      '40gp': 1700,
      '40hc': 1800,
      '45hc': 2150,
      '40nor': 1950
    },
  ];

  // 获取表格数据
  const getTableData = (): any => {
    switch (activeTab) {
      case 'lcl':
        return lclData;
      case 'air':
        return airData;
      case 'precarriage':
        return precarriageData;
      case 'oncarriage':
        return oncarriageData;
      case 'fcl':
      default:
        return fclData;
    }
  };

  // 获取表格列
  const getTableColumns = (): any => {
    switch (activeTab) {
      case 'lcl':
        return lclAirColumns;
      case 'air':
        return lclAirColumns;
      case 'precarriage':
        return precarriageColumns;
      case 'oncarriage':
        return oncarriageColumns;
      case 'fcl':
      default:
        return fclColumns;
    }
  };
  
  // 定义类型安全的表格组件渲染

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

  // 定义每个tab下的筛选表单内容

  // 拖拽功能
  const handleDragStart = (_e: React.DragEvent, columnKey: string) => {
    setDraggedItem(columnKey);
  };

  const handleDragOver = (e: React.DragEvent, columnKey: string) => {
    e.preventDefault();
    setDragOverItem(columnKey);
  };

  const handleDrop = (e: React.DragEvent, targetColumnKey: string) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== targetColumnKey) {
      const newOrder = [...columnOrder];
      const draggedIndex = newOrder.indexOf(draggedItem);
      const targetIndex = newOrder.indexOf(targetColumnKey);
      
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedItem);
      
      setColumnOrder(newOrder);
    }
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  // 筛选字段拖拽功能
  const handleFilterFieldDragStart = (_e: React.DragEvent, fieldKey: string) => {
    setDraggedFilterField(fieldKey);
  };

  const handleFilterFieldDragOver = (e: React.DragEvent, fieldKey: string) => {
    e.preventDefault();
    setDragOverFilterField(fieldKey);
  };

  const handleFilterFieldDrop = (e: React.DragEvent, targetFieldKey: string) => {
    e.preventDefault();
    if (draggedFilterField && draggedFilterField !== targetFieldKey) {
      const newOrder = [...filterFieldOrder];
      const draggedIndex = newOrder.indexOf(draggedFilterField);
      const targetIndex = newOrder.indexOf(targetFieldKey);
      
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedFilterField);
      
      setFilterFieldOrder(newOrder);
    }
    setDraggedFilterField(null);
    setDragOverFilterField(null);
  };

  const handleFilterFieldDragEnd = () => {
    setDraggedFilterField(null);
    setDragOverFilterField(null);
  };

  // 获取列标签
  const getColumnLabel = (columnKey: string): string => {
    const columnLabels: Record<string, string> = {
      routeCode: '运价号',
      departurePort: '起运港',
      dischargePort: '目的港',
      directTransit: '直达',
      transitPort: '中转港',
      spaceStatus: '舱位状态',
      priceStatus: '价格趋势',
      spaceQuality: '舱位性质',
      currency: '币种',
      containerType: '箱种',
      '20gp': '20\'',
      '40gp': '40\'',
      '40hc': '40\' HC',
      '40nor': '40\' NOR',
      '45hc': '45\'',
      costTaxRate: '成本税率',
      sellingTaxRate: '卖价税率',
      paymentTerms: '付费条款',
      shipCompany: '船公司',
      contractNo: '约号',
      outportCode: 'Outport Code',
      routeCodeAlt: '航线代码',
      rateSource: '运价来源',
      vesselSchedule: '船期',
      voyage: '航程',
      serviceMode: 'ServiceMode',
      serviceCode: 'ServiceCode',
      cargoType: '货物类型',
      cargo: '货物',
      tariffCode: '挂靠码头',
      freeStorageDays: '免柜租期',
      specialPriceStatus: '特价状态',
      effectiveDateType: '生效日期类型',
      expiryDateType: '失效日期类型',
      chargeSpecialNote: '接货特殊说明',
      destinationTariffCode: '目的港挂靠码头',
      transportMode: '运输方式',
      code: 'CODE',
      na: 'NA',
      nac: 'NAC',
      amsEns: 'AMS/ENS',
      overweightNote: '超重说明',
      importSourceFileWatermark: '导入源文档流水号',
      customSpec: '自定义规格',
      notes: '备注',
      validFrom: '有效期自',
      validTo: '有效期止',
      branch: '分公司',
      entryPerson: '录入人',
      createDate: '创建日期',
      rateModifier: '运价修改人',
      modifyDate: '修改日期',
      approver: '审核人',
      approvalDate: '审核日期',
      cutoffDate: '截关日',
      destinationRegion: '目的区域',
      rateType: '运价类型',
      vesselName: '船名',
      voyageNo: '航次',
      '20nor': '20\' NOR',
      etd: 'ETD',
      eta: 'ETA',
      transitType: '直达/中转',
      transit: '中转',
      consignee: '收货人',
      status: '状态',
      highlighted: '突出显示',
      '45hq': '45HQ',
      freeTime: '免费时间',
      validPeriod: '有效期',
      updated: '更新时间',
      updatedBy: '更新人',
      weight: '重量',
      volume: '体积',
      bookingDeadline: '订舱截止'
    };
    return columnLabels[columnKey] || columnKey;
  };

  // 初始化默认筛选条件
  const initializeDefaultConditions = (activeTab: string): FilterCondition[] => {
    const filterFields = getFilterFieldsByTab(activeTab);
    return filterFields.map(field => ({
      key: field.key,
      mode: FilterMode.EQUAL,
      value: '',
      visible: ['shipCompany', 'transitType', 'departurePort', 'dischargePort'].includes(field.key)
    }));
  };

  // 初始化默认方案
  const initializeDefaultScheme = (activeTab: string): FilterScheme => {
    return {
      id: 'default',
      name: '默认方案',
      conditions: initializeDefaultConditions(activeTab),
      isDefault: true
    };
  };

  // 获取可见的筛选条件
  const getVisibleConditions = (): FilterCondition[] => {
    return filterConditions.filter(condition => condition.visible);
  };

  // 获取第一行筛选条件
  const getFirstRowConditions = (): FilterCondition[] => {
    const visible = getVisibleConditions();
    return visible.slice(0, 4);
  };

  // 切换筛选区展开/收起
  const toggleFilterExpanded = () => {
    setFilterExpanded(!filterExpanded);
  };

  // 更新筛选条件
  const updateFilterCondition = (key: string, mode: FilterMode, value: any) => {
    setFilterConditions(prev => prev.map(condition => 
      condition.key === key ? { ...condition, mode, value } : condition
    ));
  };

  // 重置筛选条件
  const resetFilterConditions = () => {
    const defaultConditions = initializeDefaultConditions(activeTab);
    setFilterConditions(defaultConditions);
    
    const defaultScheme = initializeDefaultScheme(activeTab);
    setFilterSchemes([defaultScheme]);
    setCurrentSchemeId('default');
    
    Message.success('筛选条件已重置');
  };

  // 应用筛选方案
  const applyFilterScheme = (schemeId: string) => {
    const scheme = filterSchemes.find(s => s.id === schemeId);
    if (scheme) {
      setFilterConditions(scheme.conditions);
      setCurrentSchemeId(schemeId);
    }
  };

  // 打开筛选字段Modal
  const openFilterFieldModal = () => {
    setFilterFieldModalVisible(true);
  };

  // 关闭筛选字段Modal
  const closeFilterFieldModal = () => {
    setFilterFieldModalVisible(false);
  };

  // 打开方案Modal
  const openSchemeModal = () => {
    setSchemeModalVisible(true);
  };

  // 关闭方案Modal
  const closeSchemeModal = () => {
    setSchemeModalVisible(false);
    setNewSchemeName('');
  };

  // 保存筛选方案
  const saveFilterScheme = () => {
    if (!newSchemeName.trim()) {
      Message.error('请输入方案名称');
      return;
    }
    
    const newScheme: FilterScheme = {
      id: Date.now().toString(),
      name: newSchemeName,
      conditions: [...filterConditions]
    };
    
    setFilterSchemes(prev => [...prev, newScheme]);
    setCurrentSchemeId(newScheme.id);
    closeSchemeModal();
    Message.success('方案保存成功');
  };

  // 更新筛选条件可见性
  const updateFilterConditionVisibility = (key: string, visible: boolean) => {
    setFilterConditions(prev => prev.map(condition => 
      condition.key === key ? { ...condition, visible } : condition
    ));
  };

  // 渲染筛选条件
  const renderFilterCondition = (condition: FilterCondition) => {
    const fieldConfig = getFilterFieldsByTab(activeTab).find(field => field.key === condition.key);
    if (!fieldConfig) return null;

    const handleModeChange = (mode: FilterMode) => {
      updateFilterCondition(condition.key, mode, condition.value);
    };

    const handleValueChange = (value: any) => {
      updateFilterCondition(condition.key, condition.mode, value);
    };

    // 根据筛选模式决定是否禁用输入框
    const isInputDisabled = condition.mode === FilterMode.IS_EMPTY || condition.mode === FilterMode.IS_NOT_EMPTY;

    return (
      <Col span={6} key={condition.key} className="mb-4">
        <div className="filter-condition-wrapper">
          {/* 字段标签和筛选模式 */}
          <div className="filter-label-row mb-2 flex items-center justify-between">
            <span className="text-gray-700 text-sm font-medium">{fieldConfig.label}</span>
            <Select
              value={condition.mode}
              onChange={handleModeChange}
              style={{ width: '90px' }}
              size="mini"
              className="filter-mode-select"
            >
              {FilterModeOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
          
          {/* 输入控件 - 占满整个宽度 */}
          <div className="filter-input-wrapper">
            {fieldConfig.type === 'text' && (
              <Input
                placeholder={isInputDisabled ? '（自动判断）' : fieldConfig.placeholder}
                value={condition.value || ''}
                onChange={handleValueChange}
                disabled={isInputDisabled}
                allowClear
                style={{ width: '100%' }}
              />
            )}
            {fieldConfig.type === 'select' && (
              <Select
                placeholder={isInputDisabled ? '（自动判断）' : fieldConfig.placeholder}
                value={condition.value}
                onChange={handleValueChange}
                disabled={isInputDisabled}
                allowClear
                style={{ width: '100%' }}
              >
                {fieldConfig.options?.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            )}
            {fieldConfig.type === 'dateRange' && (
              <RangePicker
                value={condition.value}
                onChange={handleValueChange}
                disabled={isInputDisabled}
                style={{ width: '100%' }}
                placeholder={isInputDisabled ? ['（自动判断）', ''] : ['开始日期', '结束日期']}
              />
            )}
            {fieldConfig.type === 'number' && (
              <Input
                placeholder={isInputDisabled ? '（自动判断）' : fieldConfig.placeholder}
                value={condition.value || ''}
                onChange={handleValueChange}
                disabled={isInputDisabled}
                allowClear
                style={{ width: '100%' }}
              />
            )}
          </div>
        </div>
      </Col>
    );
  };

  // 渲染新版筛选区域
  const renderNewFilterArea = () => {
    const conditionsToShow = filterExpanded ? getVisibleConditions() : getFirstRowConditions();
    
    return (
      <Card className="mb-4 filter-area-card">
        {/* 筛选区头部 - 标题和所有操作按钮在同一行 */}
        <div className="filter-header flex justify-between items-center mb-6">
          <Title heading={6} className="!mb-0 !text-gray-800">
            筛选条件
          </Title>
          <div className="flex items-center gap-3">
            {/* 选择方案下拉 */}
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">方案:</span>
              <Select
                value={currentSchemeId}
                onChange={applyFilterScheme}
                style={{ width: '140px' }}
                placeholder="选择方案"
                size="small"
              >
                {filterSchemes.map(scheme => (
                  <Option key={scheme.id} value={scheme.id}>
                    {scheme.name}
                  </Option>
                ))}
              </Select>
            </div>
            
            {/* 所有操作按钮 */}
            <Space size="medium">
              <Button 
                type="primary" 
                icon={<IconSearch />}
                className="search-btn"
                size="small"
              >
                查询
              </Button>
              <Button 
                icon={<IconRefresh />} 
                onClick={resetFilterConditions}
                className="reset-btn"
                size="small"
              >
                重置
              </Button>
              <Button 
                type="outline"
                icon={<IconSettings />} 
                onClick={openFilterFieldModal}
                className="settings-btn"
                size="small"
              >
                增减条件
              </Button>
              <Button 
                type="outline"
                onClick={openSchemeModal}
                className="save-scheme-btn"
                size="small"
              >
                另存为方案
              </Button>
              <Button 
                type="text" 
                icon={filterExpanded ? <IconUp /> : <IconDown />}
                onClick={toggleFilterExpanded}
                className="expand-btn text-blue-500 hover:text-blue-700"
                size="small"
              >
                {filterExpanded ? '收起' : '展开'}
              </Button>
            </Space>
          </div>
        </div>
        
        {/* 筛选条件网格 - 直接放置，无额外包装 */}
        <Row gutter={[20, 20]}>
          {conditionsToShow.map(condition => renderFilterCondition(condition))}
        </Row>

        {/* 添加自定义样式 */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .filter-area-card {
              background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
              border: 1px solid #e2e8f0;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            }
            
            .filter-label-row {
              min-height: 24px;
            }
            
            .filter-mode-select .arco-select-view {
              background: #f1f5f9;
              border: 1px solid #cbd5e1;
            }
            
            .filter-input-wrapper .arco-input,
            .filter-input-wrapper .arco-select-view,
            .filter-input-wrapper .arco-picker {
              border: 1px solid #d1d5db;
              transition: border-color 0.2s ease;
            }
            
            .filter-input-wrapper .arco-input:focus,
            .filter-input-wrapper .arco-select-view:focus,
            .filter-input-wrapper .arco-picker:focus {
              border-color: #3b82f6;
              box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }
            
            .search-btn {
              background: linear-gradient(45deg, #3b82f6, #1d4ed8);
              border: none;
              font-weight: 500;
            }
            
            .reset-btn {
              border: 1px solid #e2e8f0;
              background: white;
              transition: all 0.2s ease;
            }
            
            .reset-btn:hover {
              border-color: #3b82f6;
              color: #3b82f6;
            }
            
            .expand-btn {
              font-weight: 500;
            }
          `
        }} />
      </Card>
    );
  };

  return (
    <ControlTowerSaasLayout menuSelectedKey="3" breadcrumb={
      <Breadcrumb>
        <Breadcrumb.Item>运价管理</Breadcrumb.Item>
        <Breadcrumb.Item>运价查询</Breadcrumb.Item>
      </Breadcrumb>
    }>
      <Card>
        <Tabs activeTab={activeTab} onChange={handleTabChange} className="mb-4">
          <TabPane key="fcl" title="整箱运价" />
          <TabPane key="lcl" title="拼箱运价" />
          <TabPane key="air" title="空运运价" />
          <TabPane key="precarriage" title="港前运价" />
          <TabPane key="oncarriage" title="尾程运价" />
        </Tabs>
        
        {/* 新的筛选区域 */}
        {renderNewFilterArea()}
        
        <Card>
          <div className="flex justify-between mb-4">
            <Space>
              {(activeTab === 'fcl' || activeTab === 'lcl' || activeTab === 'air') && (
                <Button 
                  type="primary" 
                  icon={<IconSearch />} 
                  onClick={openCombinationQuery}
                >
                  组合方案查询
                </Button>
              )}
              <Button icon={<IconUpload />}>批量导入</Button>
              <Button icon={<IconDownload />}>导出列表</Button>
            </Space>
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
            columns={getTableColumns()}
            data={getTableData()}
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
      </Card>

      {/* 自定义表格抽屉 */}
      <Drawer
        title={
          <div className="flex items-center gap-2">
            <IconSettings />
            <span>自定义表格</span>
          </div>
        }
        visible={customTableModalVisible}
        onCancel={closeCustomTableModal}
        width={480}
        footer={
          <div className="flex justify-between">
            <Button onClick={resetColumnVisibility}>
              重置默认
            </Button>
            <div>
              <Button onClick={closeCustomTableModal} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button type="primary" onClick={applyColumnSettings}>
                确认
              </Button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          {/* 快捷操作区域 */}
          <div className="bg-gray-50 p-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                已选择 {Object.values(columnVisibility).filter(Boolean).length} / {Object.keys(columnVisibility).length} 个字段
              </span>
              <div className="space-x-2">
                <Button 
                  size="small" 
                  onClick={() => {
                    const newVisibility: any = {};
                    Object.keys(columnVisibility).forEach(key => {
                      newVisibility[key] = true;
                    });
                    setColumnVisibility(newVisibility);
                  }}
                >
                  全选
                </Button>
                <Button 
                  size="small" 
                  onClick={() => {
                    const newVisibility: any = {};
                    Object.keys(columnVisibility).forEach(key => {
                      newVisibility[key] = false;
                    });
                    setColumnVisibility(newVisibility);
                  }}
                >
                  清空
                </Button>
              </div>
            </div>
          </div>

          {/* 字段列表 */}
          <div className="space-y-2">
            {columnOrder.map((columnKey, index) => (
              <div
                key={columnKey}
                className={`flex items-center gap-3 p-3 border border-gray-200 bg-white hover:bg-gray-50 transition-colors ${
                  draggedItem === columnKey ? 'opacity-50' : ''
                } ${
                  dragOverItem === columnKey ? 'border-blue-400 border-2' : ''
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, columnKey)}
                onDragOver={(e) => handleDragOver(e, columnKey)}
                onDrop={(e) => handleDrop(e, columnKey)}
                onDragEnd={handleDragEnd}
              >
                <IconDragDotVertical className="text-gray-400 cursor-move" />
                <div className="flex items-center justify-center w-6 h-5 bg-gray-100 text-xs text-gray-600 font-medium rounded" style={{ minWidth: '24px' }}>
                  {index + 1}
                </div>
                <span className="flex-1 text-sm">{getColumnLabel(columnKey)}</span>
                <Switch
                  size="small"
                  checked={columnVisibility[columnKey as keyof typeof columnVisibility]}
                  onChange={(checked) => handleColumnVisibilityChange(columnKey, checked)}
                />
              </div>
            ))}
          </div>
        </div>
      </Drawer>

      {/* 筛选字段抽屉 */}
      <Drawer
        title={
          <div className="flex items-center gap-2">
            <IconSettings />
            <span>增减条件</span>
          </div>
        }
        visible={filterFieldModalVisible}
        onCancel={closeFilterFieldModal}
        width={480}
        footer={
          <div className="flex justify-between">
            <Button onClick={() => {
              const defaultConditions = initializeDefaultConditions(activeTab);
              setFilterConditions(defaultConditions);
            }}>
              重置默认
            </Button>
            <div>
              <Button onClick={closeFilterFieldModal} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button type="primary" onClick={closeFilterFieldModal}>
                确认
              </Button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          {/* 快捷操作区域 */}
          <div className="bg-gray-50 p-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                已选择 {filterConditions.filter(c => c.visible).length} / {filterConditions.length} 个字段
              </span>
              <div className="space-x-2">
                <Button 
                  size="small" 
                  onClick={() => {
                    setFilterConditions(prev => prev.map(condition => ({ ...condition, visible: true })));
                  }}
                >
                  全选
                </Button>
                <Button 
                  size="small" 
                  onClick={() => {
                    setFilterConditions(prev => prev.map(condition => ({ ...condition, visible: false })));
                  }}
                >
                  清空
                </Button>
              </div>
            </div>
          </div>

          {/* 筛选字段列表 */}
          <div className="space-y-2">
            {filterFieldOrder.map((fieldKey, index) => {
              const condition = filterConditions.find(c => c.key === fieldKey);
              const field = getFilterFieldsByTab(activeTab).find(f => f.key === fieldKey);
              if (!condition || !field) return null;

              return (
                <div
                  key={fieldKey}
                  className={`flex items-center gap-3 p-3 border border-gray-200 bg-white hover:bg-gray-50 transition-colors ${
                    draggedFilterField === fieldKey ? 'opacity-50' : ''
                  } ${
                    dragOverFilterField === fieldKey ? 'border-blue-400 border-2' : ''
                  }`}
                  draggable
                  onDragStart={(e) => handleFilterFieldDragStart(e, fieldKey)}
                  onDragOver={(e) => handleFilterFieldDragOver(e, fieldKey)}
                  onDrop={(e) => handleFilterFieldDrop(e, fieldKey)}
                  onDragEnd={handleFilterFieldDragEnd}
                >
                  <IconDragDotVertical className="text-gray-400 cursor-move" />
                  <div className="flex items-center justify-center w-6 h-5 bg-gray-100 text-xs text-gray-600 font-medium rounded" style={{ minWidth: '24px' }}>
                    {index + 1}
                  </div>
                  <span className="flex-1 text-sm">{field.label}</span>
                  <Switch
                    size="small"
                    checked={condition.visible}
                    onChange={(checked) => updateFilterConditionVisibility(fieldKey, checked)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Drawer>

      {/* 保存方案弹窗 */}
      <Modal
        title="保存筛选方案"
        visible={schemeModalVisible}
        onCancel={closeSchemeModal}
        onOk={saveFilterScheme}
        okText="保存"
        cancelText="取消"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              方案名称
            </label>
            <Input
              placeholder="请输入方案名称"
              value={newSchemeName}
              onChange={setNewSchemeName}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              当前筛选条件
            </label>
            <div className="bg-gray-50 p-3 rounded">
              {getVisibleConditions().map(condition => {
                const field = getFilterFieldsByTab(activeTab).find(f => f.key === condition.key);
                return (
                  <div key={condition.key} className="text-sm text-gray-600">
                    {field?.label}: {FilterModeOptions.find(m => m.value === condition.mode)?.label} {condition.value || '(空)'}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Modal>
    </ControlTowerSaasLayout>
  );
};

export default RateQuery; 