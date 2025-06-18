import React, { useState, useEffect } from 'react';
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
  Tabs,
  Input,
  Drawer
} from '@arco-design/web-react';
import { 
  IconSearch, 
  IconPlus, 
  IconUpload, 
  IconDownload, 
  IconEdit, 
  IconDelete, 
  IconRefresh, 
  IconRobot,
  IconList,
  IconDragDotVertical,
  IconDown,
  IconUp,
  IconSettings
} from '@arco-design/web-react/icon';
import '@arco-design/web-react/dist/css/arco.css';
import './InquiryManagement.css';
import { useNavigate } from 'react-router-dom';
import ControlTowerSaasLayout from "./ControlTowerSaasLayout";

const Title = Typography.Title;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const Row = Grid.Row;
const Col = Grid.Col;

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
        },
        {
          key: 'origin',
          label: '起运地',
          type: 'text',
          placeholder: '请输入起运地'
        },
        {
          key: 'destination',
          label: '起运港',
          type: 'select',
          options: [
            { label: 'CNSHA | SHANGHAI', value: 'CNSHA | SHANGHAI' },
            { label: 'CNNGB | NINGBO', value: 'CNNGB | NINGBO' }
          ],
          placeholder: '请选择起运港'
        },
        {
          key: 'terminal',
          label: '码头',
          type: 'select',
          options: [
            { label: '洋山', value: '洋山' },
            { label: '北仑', value: '北仑' }
          ],
          placeholder: '请选择码头'
        },
        {
          key: 'vendor',
          label: '供应商',
          type: 'text',
          placeholder: '请输入供应商'
        },
        {
          key: 'validDateRange',
          label: '有效期',
          type: 'dateRange',
          placeholder: '请选择有效期范围'
        },
        {
          key: 'status',
          label: '状态',
          type: 'select',
          options: [
            { label: '正常', value: '正常' },
            { label: '过期', value: '过期' },
            { label: '下架', value: '下架' }
          ],
          placeholder: '请选择状态'
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
          key: 'origin',
          label: '目的港',
          type: 'text',
          placeholder: '请输入目的港'
        },
        {
          key: 'addressType',
          label: '配送地址类型',
          type: 'select',
          options: [
            { label: '第三方地址', value: '第三方地址' },
            { label: '亚马逊仓库', value: '亚马逊仓库' },
            { label: '易仓', value: '易仓' }
          ],
          placeholder: '请选择配送地址类型'
        },
        {
          key: 'zipCode',
          label: '邮编',
          type: 'text',
          placeholder: '请输入邮编'
        },
        {
          key: 'address',
          label: '地址',
          type: 'text',
          placeholder: '请输入地址'
        },
        {
          key: 'agentName',
          label: '代理名称',
          type: 'text',
          placeholder: '请输入代理名称'
        },
        {
          key: 'validDateRange',
          label: '有效期',
          type: 'dateRange',
          placeholder: '请选择有效期范围'
        },
        {
          key: 'status',
          label: '状态',
          type: 'select',
          options: [
            { label: '正常', value: '正常' },
            { label: '过期', value: '过期' },
            { label: '下架', value: '下架' }
          ],
          placeholder: '请选择状态'
        }
      ];
    default:
      return [];
  }
};

interface DataItem {
  key: string;
  routeCode: string; // 运价号
  departurePort: string; // 起运港
  dischargePort: string; // 目的港
  directTransit: string; // 直达
  transitPort: string; // 中转港
  spaceStatus: string; // 舱位状态
  priceStatus: string; // 价格趋势
  spaceQuality: string; // 舱位性质
  currency: string; // 币种
  containerType: string; // 箱种
  '20gp': number; // 20'
  '40gp': number; // 40'
  '40hc': number; // 40' HC
  '40nor': number; // 40' NOR
  '45hc': number; // 45'
  costTaxRate: string; // 成本税率
  sellingTaxRate: string; // 卖价税率
  paymentTerms: string; // 付费条款
  shipCompany: string; // 船公司
  contractNo: string; // 约号
  outportCode: string; // Outport Code
  routeCodeAlt: string; // 航线代码
  rateSource: string; // 运价来源
  vesselSchedule: string; // 船期
  voyage: string; // 航程
  serviceMode: string; // ServiceMode
  serviceCode: string; // ServiceCode
  cargoType: string; // 货物类型
  cargo: string; // 货物
  tariffCode: string; // 挂靠码头
  freeStorageDays: number; // 免柜租期
  specialPriceStatus: string; // 特价状态
  effectiveDateType: string; // 生效日期类型
  expiryDateType: string; // 失效日期类型
  chargeSpecialNote: string; // 接货特殊说明
  destinationTariffCode: string; // 目的港挂靠码头
  transportMode: string; // 运输方式
  code: string; // CODE
  na: string; // NA
  nac: string; // NAC
  amsEns: string; // AMS/ENS
  overweightNote: string; // 超重说明
  importSourceFileWatermark: string; // 导入源文档流水号
  customSpec: string; // 自定义规格
  notes: string; // 备注
  validFrom: string; // 有效期自
  validTo: string; // 有效期止
  branch: string; // 分公司
  entryPerson: string; // 录入人
  createDate: string; // 创建日期
  rateModifier: string; // 运价修改人
  modifyDate: string; // 修改日期
  approver: string; // 审核人
  approvalDate: string; // 审核日期
  cutoffDate: string; // 截关日
  destinationRegion: string; // 目的区域
  rateType: string; // 运价类型
  vesselName: string; // 船名
  voyageNo: string; // 航次
  '20nor': string; // 20' NOR
  etd: string; // ETD
  eta: string; // ETA
  
  // 根据截图补充的字段
  transitType: string; // 中转类型
  transitDays: number; // 中转天数
  bookingDeadline: string; // 订舱截止时间
  documentDeadline: string; // 单证截止时间
  portOfLoading: string; // 装货港
  portOfDischarge: string; // 卸货港
  finalDestination: string; // 最终目的地
  placeOfReceipt: string; // 收货地
  placeOfDelivery: string; // 交货地
  shippingTerms: string; // 贸易条款
  freightTerms: string; // 运费条款
  carrierName: string; // 承运人
  forwarderName: string; // 货代名称
  quotationValidDays: number; // 报价有效天数
  bookingRemarks: string; // 订舱备注
  specialRequirements: string; // 特殊要求
  insuranceRequired: boolean; // 是否需要保险
  customsClearance: string; // 清关要求
  documentRequired: string; // 单证要求
  weighingRequired: boolean; // 是否需要称重
  inspectionRequired: boolean; // 是否需要查验
  consolidationService: boolean; // 是否提供拼箱服务
  doorToDoorService: boolean; // 是否提供门到门服务
  temperatureControl: string; // 温控要求
  hazardousGoods: boolean; // 是否危险品
  oversizeGoods: boolean; // 是否超尺寸货物
  overweightGoods: boolean; // 是否超重货物
  priority: string; // 优先级
  status: string; // 状态
  publishStatus: string; // 发布状态
  isActive: boolean; // 是否激活
  isPublic: boolean; // 是否公开
  tags: string[]; // 标签
  category: string; // 分类
  subcategory: string; // 子分类
  region: string; // 区域
  lane: string; // 航线
  tradeRoute: string; // 贸易路线
  transitTime: number; // 运输时间
  frequency: string; // 班期频率
  vessel: string; // 船舶
  operatorCode: string; // 操作代码
  bookingOffice: string; // 订舱处
  salesPerson: string; // 销售员
  customerService: string; // 客服
  lastUpdated: string; // 最后更新时间
  version: string; // 版本号
  source: string; // 数据来源
  reliability: string; // 可靠性
  confidence: number; // 置信度
  updateFrequency: string; // 更新频率
  dataQuality: string; // 数据质量
  verified: boolean; // 是否已验证
  archived: boolean; // 是否已归档
  deleted: boolean; // 是否已删除
  
  // 继续根据新截图添加的字段
  validToDate: string; // 有效期止（截图中的"有效期止"）
  companyBranch: string; // 分公司（截图中的"分公司"）
  dataEntryPerson: string; // 录入人（截图中的"录入人"）
  creationDate: string; // 创建日期（截图中的"创建日期"）
  rateModifyPerson: string; // 运价修改人（截图中的"运价修改人"）
  modificationDate: string; // 修改日期（截图中的"修改日期"）
  reviewPerson: string; // 审核人（截图中的"审核人"）
  reviewDate: string; // 审核日期（截图中的"审核日期"）
  customsCutoffDate: string; // 截关日（截图中的"截关日"）
  targetRegion: string; // 目的区域（截图中的"目的区域"）
  freightRateType: string; // 运价类型（截图中的"运价类型"）
  shipName: string; // 船名（截图中的"船名"）
  voyageNumber: string; // 航次（截图中的"航次"）
  container20NOR: string; // 20' NOR（截图中的"20' NOR"）
  estimatedDeparture: string; // ETD（截图中的"ETD"）
  estimatedArrival: string; // ETA（截图中的"ETA"）
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
    vesselSchedule: true,
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
    validToDate: false,
    companyBranch: false,
    dataEntryPerson: false,
    creationDate: false,
    rateModifyPerson: false,
    modificationDate: false,
    reviewPerson: false,
    reviewDate: false,
    customsCutoffDate: false,
    targetRegion: false,
    freightRateType: false,
    shipName: false,
    voyageNumber: false,
    container20NOR: false,
    estimatedDeparture: true,
    estimatedArrival: false
  });
  const [columnOrder, setColumnOrder] = useState([
    'routeCode', 'departurePort', 'dischargePort', 'directTransit', 'transitPort',
    'spaceStatus', 'priceStatus', 'spaceQuality', 'currency', 'containerType',
    '20gp', '40gp', '40hc', '40nor', '45hc',
    'costTaxRate', 'sellingTaxRate', 'paymentTerms', 'shipCompany', 'contractNo',
    'outportCode', 'routeCodeAlt', 'rateSource', 'vesselSchedule', 'voyage',
    'serviceMode', 'serviceCode', 'cargoType', 'cargo', 'tariffCode',
    'freeStorageDays', 'specialPriceStatus', 'effectiveDateType', 'expiryDateType',
    'chargeSpecialNote', 'destinationTariffCode', 'transportMode', 'code', 'na', 'nac',
    'amsEns', 'overweightNote', 'importSourceFileWatermark', 'customSpec', 'notes',
    'validFrom', 'validToDate', 'companyBranch', 'dataEntryPerson', 'creationDate',
    'rateModifyPerson', 'modificationDate', 'reviewPerson', 'reviewDate', 'customsCutoffDate',
    'targetRegion', 'freightRateType', 'shipName', 'voyageNumber', 'container20NOR',
    'estimatedDeparture', 'estimatedArrival'
  ]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);
  
  // 筛选字段拖拽相关状态
  const [draggedFilterField, setDraggedFilterField] = useState<string | null>(null);
  const [dragOverFilterField, setDragOverFilterField] = useState<string | null>(null);
  const [filterFieldOrder, setFilterFieldOrder] = useState<string[]>([]);
  
  // 添加缺失的状态变量
  const [activeTab, setActiveTab] = useState<string>('fcl');
  const [filterConditions, setFilterConditions] = useState<FilterCondition[]>([]);
  const [filterSchemes, setFilterSchemes] = useState<FilterScheme[]>([]);
  const [currentSchemeId, setCurrentSchemeId] = useState<string>('default');
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [filterFieldModalVisible, setFilterFieldModalVisible] = useState(false);
  const [schemeModalVisible, setSchemeModalVisible] = useState(false);
  const [schemeName, setSchemeName] = useState('');
  
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
      vesselSchedule: true,
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
      validToDate: false,
      companyBranch: false,
      dataEntryPerson: false,
      creationDate: false,
      rateModifyPerson: false,
      modificationDate: false,
      reviewPerson: false,
      reviewDate: false,
      customsCutoffDate: false,
      targetRegion: false,
      freightRateType: false,
      shipName: false,
      voyageNumber: false,
      container20NOR: false,
      estimatedDeparture: true,
      estimatedArrival: false
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
      title: '运价号',
      dataIndex: 'routeCode',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '起运港',
      dataIndex: 'departurePort',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '目的港',
      dataIndex: 'dischargePort',
      width: 150,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '直达',
      dataIndex: 'directTransit',
      width: 80,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '中转港',
      dataIndex: 'transitPort',
      width: 120,
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
      title: '价格趋势',
      dataIndex: 'priceStatus',
      width: 100,
      render: (value: string) => (
        <Tooltip content={value} mini>
          <Tag color={value === '价格上涨' ? 'red' : value === '价格下调' ? 'green' : 'blue'} size="small">
            {value}
          </Tag>
        </Tooltip>
      ),
      sorter: true,
      resizable: true,
    },
    {
      title: '舱位性质',
      dataIndex: 'spaceQuality',
      width: 100,
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
      title: '箱种',
      dataIndex: 'containerType',
      width: 80,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: "20'",
      dataIndex: '20gp',
      width: 100,
      render: (value: number) => <Tooltip content={`$ ${value}`} mini><span className="arco-ellipsis">$ {value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: "40'",
      dataIndex: '40gp',
      width: 100,
      render: (value: number) => <Tooltip content={`$ ${value}`} mini><span className="arco-ellipsis">$ {value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: "40' HC",
      dataIndex: '40hc',
      width: 100,
      render: (value: number) => <Tooltip content={`$ ${value}`} mini><span className="arco-ellipsis">$ {value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: "40' NOR",
      dataIndex: '40nor',
      width: 100,
      render: (value: number) => <Tooltip content={`$ ${value}`} mini><span className="arco-ellipsis">$ {value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: "45'",
      dataIndex: '45hc',
      width: 100,
      render: (value: number) => <Tooltip content={`$ ${value}`} mini><span className="arco-ellipsis">$ {value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '成本税率',
      dataIndex: 'costTaxRate',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '卖价税率',
      dataIndex: 'sellingTaxRate',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '付费条款',
      dataIndex: 'paymentTerms',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '船公司',
      dataIndex: 'shipCompany',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '约号',
      dataIndex: 'contractNo',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: 'Outport Code',
      dataIndex: 'outportCode',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '航线代码',
      dataIndex: 'routeCodeAlt',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '运价来源',
      dataIndex: 'rateSource',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '船期',
      dataIndex: 'vesselSchedule',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '航程',
      dataIndex: 'voyage',
      width: 80,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: 'ServiceMode',
      dataIndex: 'serviceMode',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: 'ServiceCode',
      dataIndex: 'serviceCode',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '货物类型',
      dataIndex: 'cargoType',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '货物',
      dataIndex: 'cargo',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '挂靠码头',
      dataIndex: 'tariffCode',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '免柜租期',
      dataIndex: 'freeStorageDays',
      width: 100,
      render: (value: number) => <Tooltip content={`${value}天`} mini><span className="arco-ellipsis">{value}天</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '特价状态',
      dataIndex: 'specialPriceStatus',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '生效日期类型',
      dataIndex: 'effectiveDateType',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '失效日期类型',
      dataIndex: 'expiryDateType',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '接货特殊说明',
      dataIndex: 'chargeSpecialNote',
      width: 150,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      resizable: true,
    },
    {
      title: '目的港挂靠码头',
      dataIndex: 'destinationTariffCode',
      width: 150,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '运输方式',
      dataIndex: 'transportMode',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: 'CODE',
      dataIndex: 'code',
      width: 80,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: 'NA',
      dataIndex: 'na',
      width: 60,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: 'NAC',
      dataIndex: 'nac',
      width: 60,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: 'AMS/ENS',
      dataIndex: 'amsEns',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '超重说明',
      dataIndex: 'overweightNote',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '导入源文档流水号',
      dataIndex: 'importSourceFileWatermark',
      width: 180,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '自定义规格',
      dataIndex: 'customSpec',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '备注',
      dataIndex: 'notes',
      width: 150,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      resizable: true,
    },
    {
      title: '有效期自',
      dataIndex: 'validFrom',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '有效期止',
      dataIndex: 'validToDate',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '分公司',
      dataIndex: 'companyBranch',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '录入人',
      dataIndex: 'dataEntryPerson',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '创建日期',
      dataIndex: 'creationDate',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '运价修改人',
      dataIndex: 'rateModifyPerson',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '修改日期',
      dataIndex: 'modificationDate',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '审核人',
      dataIndex: 'reviewPerson',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '审核日期',
      dataIndex: 'reviewDate',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '截关日',
      dataIndex: 'customsCutoffDate',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '目的区域',
      dataIndex: 'targetRegion',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '运价类型',
      dataIndex: 'freightRateType',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '船名',
      dataIndex: 'shipName',
      width: 150,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '航次',
      dataIndex: 'voyageNumber',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: "20' NOR",
      dataIndex: 'container20NOR',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: 'ETD',
      dataIndex: 'estimatedDeparture',
      width: 100,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: 'ETA',
      dataIndex: 'estimatedArrival',
      width: 100,
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

  const data: DataItem[] = Array(12).fill(null).map((_, index) => {
    const random20gp = [-30, 510, 560, 865, 1130, 530].sort(() => Math.random() - 0.5)[0];
    const random40gp = random20gp === -30 ? -60 : random20gp === 510 ? 1020 : random20gp === 560 ? 1120 : random20gp === 865 ? 1730 : random20gp === 1130 ? 2260 : 1060;
    const portPrefix = ['MANILA-NORTH', 'MANILA-SOUTH', 'SUBIC BAY', 'CEBU', 'ILOILO', 'CAGAYAN DE ORO', 'BATANGAS'];
    const routeCodes = ['CPX4', 'CPS', 'CPX7', 'CPX6'];
    const vesselNames = ['MEDKON QUO', 'SITC PENANG', 'SITC YOKOHAMA', 'SITC XINCHENG'];
    const departurePorts = ['CNSHA', 'CNNGB', 'CNQIN', 'CNYTN'];
    
    return {
      key: `${index}`,
      routeCode: `FCL${2024}${String(index + 1).padStart(4, '0')}`,
      departurePort: departurePorts[Math.floor(Math.random() * departurePorts.length)],
      dischargePort: portPrefix[Math.floor(Math.random() * portPrefix.length)],
      directTransit: Math.random() > 0.5 ? '直达' : '中转',
      transitPort: Math.random() > 0.5 ? 'SINGAPORE' : 'HONG KONG',
      spaceStatus: Math.random() > 0.3 ? '舱位充足' : '舱位紧张',
      priceStatus: ['价格稳定', '价格上涨', '价格下调'][Math.floor(Math.random() * 3)],
      spaceQuality: ['普通舱位', '优质舱位', '特殊舱位'][Math.floor(Math.random() * 3)],
      currency: 'USD',
      containerType: ['普通箱', '冷冻箱', '开顶箱'][Math.floor(Math.random() * 3)],
      '20gp': random20gp,
      '40gp': random40gp,
      '40hc': random40gp + 50,
      '40nor': random40gp - 20,
      '45hc': random40gp + 100,
      costTaxRate: '13%',
      sellingTaxRate: '13%',
      paymentTerms: 'PREPAID',
      shipCompany: 'SITC',
      contractNo: `CNT${2024}${String(index + 1).padStart(3, '0')}`,
      outportCode: routeCodes[Math.floor(Math.random() * routeCodes.length)],
      routeCodeAlt: routeCodes[Math.floor(Math.random() * routeCodes.length)],
      rateSource: ['官网', '代理', '直签'][Math.floor(Math.random() * 3)],
      vesselSchedule: `05-${15 + Math.floor(Math.random() * 4)}`,
      voyage: `${4 + Math.floor(Math.random() * 6)}天`,
      serviceMode: 'FCL',
      serviceCode: 'STD',
      cargoType: '普通货物',
      cargo: '电子产品',
      tariffCode: 'T001',
      freeStorageDays: 7 + Math.floor(Math.random() * 8),
      specialPriceStatus: '正常',
      effectiveDateType: '立即生效',
      expiryDateType: '固定日期',
      chargeSpecialNote: '需提前预约',
      destinationTariffCode: 'T002',
      transportMode: '海运',
      code: 'FCL',
      na: 'N/A',
      nac: 'N/A',
      amsEns: 'AMS',
      overweightNote: '超重另计',
      importSourceFileWatermark: `IMP${Date.now()}`,
      customSpec: '标准规格',
      notes: 'LSE已含',
      validFrom: '2024-05-01',
      validTo: '2024-12-31',
      branch: '上海分公司',
      entryPerson: '张三',
      createDate: '2024-05-15',
      rateModifier: '李四',
      modifyDate: '2024-05-16',
      approver: '王五',
      approvalDate: '2024-05-17',
      cutoffDate: '2024-05-20',
      destinationRegion: '东南亚',
      rateType: '整箱运价',
      vesselName: vesselNames[Math.floor(Math.random() * vesselNames.length)],
      voyageNo: `25${10 + Math.floor(Math.random() * 9)}S`,
      '20nor': '20NOR',
      etd: `05-${15 + Math.floor(Math.random() * 4)}`,
      eta: `06-${1 + Math.floor(Math.random() * 10)}`,
      
      // 根据截图补充的字段
      transitType: Math.random() > 0.5 ? '中转' : '直达',
      transitDays: Math.floor(Math.random() * 10) + 1,
      bookingDeadline: `2024-05-${15 + Math.floor(Math.random() * 10)}`,
      documentDeadline: `2024-05-${15 + Math.floor(Math.random() * 10)}`,
      portOfLoading: Math.random() > 0.5 ? '上海' : '宁波',
      portOfDischarge: Math.random() > 0.5 ? '洛杉矶' : '纽约',
      finalDestination: Math.random() > 0.5 ? '美国' : '欧洲',
      placeOfReceipt: Math.random() > 0.5 ? '上海' : '宁波',
      placeOfDelivery: Math.random() > 0.5 ? '上海' : '宁波',
      shippingTerms: ['FOB', 'CIF', 'CFR'][Math.floor(Math.random() * 3)],
      freightTerms: ['LCL', 'FCL', '拼箱'][Math.floor(Math.random() * 3)],
      carrierName: ['COSCO', 'MSC', 'HMM'][Math.floor(Math.random() * 3)],
      forwarderName: ['德邦物流', '顺丰物流', '中远海运'][Math.floor(Math.random() * 3)],
      quotationValidDays: Math.floor(Math.random() * 30) + 1,
      bookingRemarks: '无特殊要求',
      specialRequirements: '无特殊要求',
      insuranceRequired: Math.random() > 0.5,
      customsClearance: '无特殊要求',
      documentRequired: '无特殊要求',
      weighingRequired: Math.random() > 0.5,
      inspectionRequired: Math.random() > 0.5,
      consolidationService: Math.random() > 0.5,
      doorToDoorService: Math.random() > 0.5,
      temperatureControl: ['恒温', '常温', '冷藏'][Math.floor(Math.random() * 3)],
      hazardousGoods: Math.random() > 0.5,
      oversizeGoods: Math.random() > 0.5,
      overweightGoods: Math.random() > 0.5,
      priority: ['高', '中', '低'][Math.floor(Math.random() * 3)],
      status: ['正常', '过期', '下架'][Math.floor(Math.random() * 3)],
      publishStatus: ['已发布', '未发布', '已下架'][Math.floor(Math.random() * 3)],
      isActive: Math.random() > 0.5,
      isPublic: Math.random() > 0.5,
      tags: [['标签1'], ['标签2'], ['标签3']][Math.floor(Math.random() * 3)],
      category: ['分类1', '分类2', '分类3'][Math.floor(Math.random() * 3)],
      subcategory: ['子分类1', '子分类2', '子分类3'][Math.floor(Math.random() * 3)],
      region: ['区域1', '区域2', '区域3'][Math.floor(Math.random() * 3)],
      lane: ['航线1', '航线2', '航线3'][Math.floor(Math.random() * 3)],
      tradeRoute: ['贸易路线1', '贸易路线2', '贸易路线3'][Math.floor(Math.random() * 3)],
      transitTime: Math.floor(Math.random() * 10) + 1,
      frequency: ['每周一', '每周二', '每周三'][Math.floor(Math.random() * 3)],
      vessel: ['船舶1', '船舶2', '船舶3'][Math.floor(Math.random() * 3)],
      operatorCode: ['操作代码1', '操作代码2', '操作代码3'][Math.floor(Math.random() * 3)],
      bookingOffice: ['订舱处1', '订舱处2', '订舱处3'][Math.floor(Math.random() * 3)],
      salesPerson: ['销售员1', '销售员2', '销售员3'][Math.floor(Math.random() * 3)],
      customerService: ['客服1', '客服2', '客服3'][Math.floor(Math.random() * 3)],
      lastUpdated: '2024-05-15',
      version: '1.0',
      source: '数据来源1',
      reliability: '可靠性1',
      confidence: Math.random() * 100,
      updateFrequency: ['每日更新', '每周更新', '每月更新'][Math.floor(Math.random() * 3)],
      dataQuality: ['高质量', '中等质量', '低质量'][Math.floor(Math.random() * 3)],
      verified: Math.random() > 0.5,
      archived: Math.random() > 0.5,
      deleted: Math.random() > 0.5,
      
      // 继续根据新截图添加的字段
      validToDate: '2024-12-31',
      companyBranch: '上海分公司',
      dataEntryPerson: '张三',
      creationDate: '2024-05-15',
      rateModifyPerson: '李四',
      modificationDate: '2024-05-16',
      reviewPerson: '王五',
      reviewDate: '2024-05-17',
      customsCutoffDate: '2024-05-20',
      targetRegion: '东南亚',
      freightRateType: '整箱运价',
      shipName: 'COSCO SHIPPING UNIVERSE',
      voyageNumber: '25S',
      container20NOR: '20NOR',
      estimatedDeparture: '05-15',
      estimatedArrival: '06-01',
    };
  });

  const onSelectChange = (selectedRowKeys: (string | number)[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  // 分页配置
  const pagination = {
    sizeCanChange: true,
    showTotal: true,
    pageSize: 20,
    current: 1,
    pageSizeChangeResetCurrent: true,
  };

  // 拖拽排序处理函数
  const handleDragStart = (e: React.DragEvent, columnKey: string) => {
    setDraggedItem(columnKey);
    e.dataTransfer.effectAllowed = 'move';
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
      
      // 移动元素
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

  // 筛选字段拖拽排序处理函数
  const handleFilterFieldDragStart = (e: React.DragEvent, fieldKey: string) => {
    setDraggedFilterField(fieldKey);
    e.dataTransfer.effectAllowed = 'move';
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
      
      // 移动元素
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

  // 获取列的中文名称
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
      '20gp': "20'",
      '40gp': "40'",
      '40hc': "40' HC",
      '40nor': "40' NOR",
      '45hc': "45'",
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
      validToDate: '有效期止',
      companyBranch: '分公司',
      dataEntryPerson: '录入人',
      creationDate: '创建日期',
      rateModifyPerson: '运价修改人',
      modificationDate: '修改日期',
      reviewPerson: '审核人',
      reviewDate: '审核日期',
      customsCutoffDate: '截关日',
      targetRegion: '目的区域',
      freightRateType: '运价类型',
      shipName: '船名',
      voyageNumber: '航次',
      container20NOR: "20' NOR",
      estimatedDeparture: 'ETD',
      estimatedArrival: 'ETA'
    };
    return columnLabels[columnKey] || columnKey;
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

  // 初始化默认筛选条件
  const initializeDefaultConditions = (activeTab: string): FilterCondition[] => {
    const fields = getFilterFieldsByTab(activeTab);
    return fields.map(field => ({
      key: field.key,
      mode: FilterMode.EQUAL,
      value: undefined,
      visible: true
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

  // 组件初始化 - 监听activeTab变化
  useEffect(() => {
    const defaultScheme = initializeDefaultScheme(activeTab);
    setFilterSchemes([defaultScheme]);
    setFilterConditions(defaultScheme.conditions);
    setCurrentSchemeId('default');
    
    // 初始化筛选字段顺序
    const fields = getFilterFieldsByTab(activeTab);
    setFilterFieldOrder(fields.map(field => field.key));
  }, [activeTab]);

  // 获取可见的筛选条件（用于渲染）
  const getVisibleConditions = (): FilterCondition[] => {
    return filterConditions.filter(condition => condition.visible);
  };

  // 获取第一行筛选条件（用于收起状态）
  const getFirstRowConditions = (): FilterCondition[] => {
    const visibleConditions = getVisibleConditions();
    return visibleConditions.slice(0, 4); // 假设第一行显示4个条件
  };

  // 切换筛选区展开状态
  const toggleFilterExpanded = () => {
    setFilterExpanded(!filterExpanded);
  };

  // 更新筛选条件值
  const updateFilterCondition = (key: string, mode: FilterMode, value: any) => {
    setFilterConditions(prev => prev.map(condition => 
      condition.key === key 
        ? { ...condition, mode, value }
        : condition
    ));
  };

  // 重置筛选条件
  const resetFilterConditions = () => {
    const defaultScheme = filterSchemes.find(scheme => scheme.isDefault);
    if (defaultScheme) {
      setFilterConditions(defaultScheme.conditions.map(condition => ({
        ...condition,
        value: undefined
      })));
      setCurrentSchemeId('default');
    }
  };

  // 应用筛选方案
  const applyFilterScheme = (schemeId: string) => {
    const scheme = filterSchemes.find(s => s.id === schemeId);
    if (scheme) {
      setFilterConditions([...scheme.conditions]);
      setCurrentSchemeId(schemeId);
    }
  };

  // 打开增减条件弹窗
  const openFilterFieldModal = () => {
    setFilterFieldModalVisible(true);
  };

  // 关闭增减条件弹窗
  const closeFilterFieldModal = () => {
    setFilterFieldModalVisible(false);
  };

  // 打开另存为方案弹窗
  const openSchemeModal = () => {
    setSchemeName('');
    setSchemeModalVisible(true);
  };

  // 关闭另存为方案弹窗
  const closeSchemeModal = () => {
    setSchemeModalVisible(false);
    setSchemeName('');
  };

  // 保存筛选方案
  const saveFilterScheme = () => {
    if (!schemeName.trim()) {
      return;
    }
    
    const newScheme: FilterScheme = {
      id: Date.now().toString(),
      name: schemeName.trim(),
      conditions: [...filterConditions],
      isDefault: false
    };
    
    setFilterSchemes(prev => [...prev, newScheme]);
    setCurrentSchemeId(newScheme.id);
    closeSchemeModal();
    Message.success('筛选方案保存成功');
  };

  // 更新筛选条件可见性
  const updateFilterConditionVisibility = (key: string, visible: boolean) => {
    setFilterConditions(prev => prev.map(condition => 
      condition.key === key 
        ? { ...condition, visible }
        : condition
    ));
  };

  // 渲染单个筛选条件
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
    <ControlTowerSaasLayout menuSelectedKey="2" breadcrumb={
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
        
        {/* 使用新的筛选区域 */}
        {renderNewFilterArea()}
        
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
      {/* 自定义表格抽屉 */}
      <Drawer
        width={480}
        title={
          <div className="flex items-center">
            <IconSettings className="mr-2" />
            <span>自定义表格设置</span>
          </div>
        }
        visible={customTableModalVisible}
        onCancel={closeCustomTableModal}
        footer={
          <div className="flex justify-between">
            <Button onClick={resetColumnVisibility}>重置默认</Button>
            <Space>
              <Button onClick={closeCustomTableModal}>取消</Button>
              <Button type="primary" onClick={applyColumnSettings}>确认</Button>
            </Space>
          </div>
        }
      >
        <div className="h-full flex flex-col">
          {/* 快捷操作 */}
          <div className="flex justify-between items-center mb-4 p-4 bg-gray-50">
            <div className="text-sm text-gray-600">
              已选择 {Object.values(columnVisibility).filter(Boolean).length}/{Object.keys(columnVisibility).length} 个字段
            </div>
            <Space>
              <Button size="small" onClick={() => {
                const newVisibility = {...columnVisibility};
                Object.keys(newVisibility).forEach(key => {
                  (newVisibility as any)[key] = true;
                });
                setColumnVisibility(newVisibility);
              }}>全选</Button>
              <Button size="small" onClick={() => {
                const newVisibility = {...columnVisibility};
                Object.keys(newVisibility).forEach(key => {
                  (newVisibility as any)[key] = false;
                });
                setColumnVisibility(newVisibility);
              }}>清空</Button>
            </Space>
          </div>
          
          {/* 可拖拽的字段列表 */}
          <div className="flex-1 overflow-y-auto px-4">
            {columnOrder.map((columnKey, index) => (
              <div
                key={columnKey}
                className={`
                  flex items-center justify-between p-3 mb-2 bg-white border cursor-move
                  hover:shadow-sm transition-all duration-200
                  ${draggedItem === columnKey ? 'opacity-50' : ''}
                  ${dragOverItem === columnKey ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}
                `}
                draggable
                onDragStart={(e) => handleDragStart(e, columnKey)}
                onDragOver={(e) => handleDragOver(e, columnKey)}
                onDrop={(e) => handleDrop(e, columnKey)}
                onDragEnd={handleDragEnd}
              >
                <div className="flex items-center flex-1">
                  <IconDragDotVertical className="text-gray-400 mr-3 cursor-grab" />
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 mr-3 min-w-[30px] text-center">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium">{getColumnLabel(columnKey)}</span>
                  </div>
                </div>
                <Switch 
                  size="small"
                  checked={(columnVisibility as any)[columnKey] || false} 
                  onChange={(checked) => handleColumnVisibilityChange(columnKey, checked)}
                />
              </div>
            ))}
          </div>
        </div>
      </Drawer>

      {/* 增减条件抽屉 - 与自定义表格一致的样式 */}
      <Drawer
        width={480}
        title={
          <div className="flex items-center">
            <IconSettings className="mr-2" />
            <span>筛选字段设置</span>
          </div>
        }
        visible={filterFieldModalVisible}
        onCancel={closeFilterFieldModal}
        footer={
          <div className="flex justify-between">
            <Button onClick={() => {
              const fields = getFilterFieldsByTab(activeTab);
              setFilterFieldOrder(fields.map(field => field.key));
              fields.forEach(field => {
                updateFilterConditionVisibility(field.key, true);
              });
            }}>重置默认</Button>
            <Space>
              <Button onClick={closeFilterFieldModal}>取消</Button>
              <Button type="primary" onClick={closeFilterFieldModal}>确认</Button>
            </Space>
          </div>
        }
      >
        <div className="h-full flex flex-col">
          {/* 快捷操作 */}
          <div className="flex justify-between items-center mb-4 p-4 bg-gray-50">
            <div className="text-sm text-gray-600">
              已选择 {filterConditions.filter(c => c.visible).length}/{getFilterFieldsByTab(activeTab).length} 个字段
            </div>
            <Space>
              <Button size="small" onClick={() => {
                getFilterFieldsByTab(activeTab).forEach(field => {
                  updateFilterConditionVisibility(field.key, true);
                });
              }}>全选</Button>
              <Button size="small" onClick={() => {
                getFilterFieldsByTab(activeTab).forEach(field => {
                  updateFilterConditionVisibility(field.key, false);
                });
              }}>清空</Button>
            </Space>
          </div>
          
          {/* 可拖拽的字段列表 */}
          <div className="flex-1 overflow-y-auto px-4">
            {filterFieldOrder.map((fieldKey, index) => {
              const field = getFilterFieldsByTab(activeTab).find(f => f.key === fieldKey);
              const condition = filterConditions.find(c => c.key === fieldKey);
              const isSelected = condition?.visible || false;
              
              if (!field) return null;
              
              return (
                <div
                  key={fieldKey}
                  className={`
                    flex items-center justify-between p-3 mb-2 bg-white border cursor-move
                    hover:shadow-sm transition-all duration-200
                    ${draggedFilterField === fieldKey ? 'opacity-50' : ''}
                    ${dragOverFilterField === fieldKey ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}
                  `}
                  draggable
                  onDragStart={(e) => handleFilterFieldDragStart(e, fieldKey)}
                  onDragOver={(e) => handleFilterFieldDragOver(e, fieldKey)}
                  onDrop={(e) => handleFilterFieldDrop(e, fieldKey)}
                  onDragEnd={handleFilterFieldDragEnd}
                >
                  <div className="flex items-center flex-1">
                    <IconDragDotVertical className="text-gray-400 mr-3 cursor-grab" />
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 mr-3 min-w-[30px] text-center">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium">{field.label}</span>
                    </div>
                  </div>
                  <Switch 
                    size="small"
                    checked={isSelected} 
                    onChange={(checked) => updateFilterConditionVisibility(fieldKey, checked)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Drawer>

      {/* 另存为方案弹窗 */}
      <Modal
        title="另存为筛选方案"
        visible={schemeModalVisible}
        onCancel={closeSchemeModal}
        footer={[
          <Button key="cancel" onClick={closeSchemeModal}>取消</Button>,
          <Button key="save" type="primary" onClick={saveFilterScheme} disabled={!schemeName.trim()}>保存</Button>,
        ]}
        style={{ width: 400 }}
      >
        <div className="p-4">
          <div className="mb-4 text-gray-600">请输入方案名称：</div>
          <Input
            value={schemeName}
            onChange={setSchemeName}
            placeholder="请输入方案名称"
            maxLength={50}
            showWordLimit
          />
          <div className="mt-4 text-xs text-gray-500">
            保存后可在"选择方案"下拉中找到此方案
          </div>
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
    </ControlTowerSaasLayout>
  );
};

export default FclRates; 