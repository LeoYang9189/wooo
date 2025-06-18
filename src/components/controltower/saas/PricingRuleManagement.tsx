import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Checkbox,
  Modal,
  Select,
  Message,
  Typography,
  Dropdown,
  Tabs,
  Tooltip,
  DatePicker,
  Drawer
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
const { TabPane } = Tabs;

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

// 筛选字段配置接口
export interface FilterFieldConfig {
  key: string;
  label: string;
  type: 'text' | 'select' | 'dateRange' | 'number';
  options?: { label: string; value: string }[];
  placeholder?: string;
  width?: number;
}

// 筛选条件接口
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

// 生成16位数字字母随机组合的规则ID
const generateRuleId = (): string => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// 费用类型枚举
type FeeType = 'fcl' | 'lcl' | 'air' | 'surcharge' | 'precarriage' | 'lastmile';

// 费用类型选项
const feeTypeOptions = [
  { key: 'fcl', title: '整箱海运费' },
  { key: 'lcl', title: '拼箱海运费' },
  { key: 'air', title: '空运运费' },
  { key: 'surcharge', title: '附加费' },
  { key: 'precarriage', title: '港前运价' },
  { key: 'lastmile', title: '尾程运价' }
];

// 整箱海运费加价规则数据接口
interface FclPricingRule {
  id: string;
  ruleId: string; // 规则ID - 16位数字字母随机组合
  routeName: string; // 航线名称
  shippingCompany: string; // 船公司
  originPort: string; // 起运港
  chargeName: string; // 费用名称
  containerTypes: Array<{
    type: string; // 箱型
    t0Price: number; // T0加价
    t1Price: number; // T1加价
    t2Price: number; // T2加价
    t3Price: number; // T3加价
    internalSalesPrice: number; // 内部销售加价
  }>; // 支持的箱型及其加价信息
  currency: 'USD' | 'CNY'; // 币种
  validPeriod: {
    startDate: string; // 有效期开始日期
    endDate: string; // 有效期结束日期
  }; // 有效期
  status: 'enabled' | 'disabled' | 'expired'; // 状态
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
}

// 拼箱海运费加价规则数据接口
interface LclPricingRule {
  id: string;
  routeName: string; // 航线名称
  currency: 'USD' | 'CNY'; // 币种
  weightPrice: number; // 重量加价 (per KG)
  volumePrice: number; // 体积加价 (per CBM)
  minPrice: number; // 最低加价
  t0Price: number; // T0加价
  t1Price: number; // T1加价
  t2Price: number; // T2加价
  t3Price: number; // T3加价
  internalSalesPrice: number; // 内部销售加价
  status: 'enabled' | 'disabled' | 'expired'; // 状态
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
}

// 空运运费加价规则数据接口
interface AirPricingRule {
  id: string;
  routeName: string; // 航线名称
  currency: 'USD' | 'CNY'; // 币种
  weightPrice: number; // 重量加价 (per KG)
  volumePrice: number; // 体积加价 (per CBM)
  minPrice: number; // 最低加价
  t0Price: number; // T0加价
  t1Price: number; // T1加价
  t2Price: number; // T2加价
  t3Price: number; // T3加价
  internalSalesPrice: number; // 内部销售加价
  status: 'enabled' | 'disabled' | 'expired'; // 状态
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
}

// 附加费加价规则数据接口
interface SurchargePricingRule {
  id: string;
  chargeName: string; // 费用名称
  chargeCode: string; // 费用代码
  chargeType: 'fixed' | 'percentage'; // 费用类型：固定金额或百分比
  currency: 'USD' | 'CNY'; // 币种
  fixedAmount?: number; // 固定金额
  percentage?: number; // 百分比
  t0Price: number; // T0加价
  t1Price: number; // T1加价
  t2Price: number; // T2加价
  t3Price: number; // T3加价
  internalSalesPrice: number; // 内部销售加价
  status: 'enabled' | 'disabled'; // 状态
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
}

// 港前运价加价规则数据接口
interface PrecarriagePricingRule {
  id: string;
  ruleId: string; // 规则ID - 16位数字字母随机组合
  origin: string; // 起运地
  destination: string; // 目的港
  shippingCompany: string; // 船公司
  chargeName: string; // 费用名称
  containerTypes: Array<{
    type: string; // 箱型
    basePrice: number; // 基础价格
    t0Price: number; // T0加价
    t1Price: number; // T1加价
    t2Price: number; // T2加价
    t3Price: number; // T3加价
    internalSalesPrice: number; // 内部销售加价
  }>; // 支持的箱型及其加价信息
  currency: 'USD' | 'CNY'; // 币种
  validPeriod: {
    startDate: string; // 有效期开始日期
    endDate: string; // 有效期结束日期
  }; // 有效期
  status: 'enabled' | 'disabled' | 'expired'; // 状态
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
}

// 尾程运价加价规则数据接口
interface LastmilePricingRule {
  id: string;
  ruleId: string; // 规则ID - 16位数字字母随机组合
  origin: string; // 目的港
  destination: string; // 配送地址
  shippingCompany: string; // 船公司
  chargeName: string; // 费用名称
  containerTypes: Array<{
    type: string; // 箱型
    basePrice: number; // 基础价格
    t0Price: number; // T0加价
    t1Price: number; // T1加价
    t2Price: number; // T2加价
    t3Price: number; // T3加价
    internalSalesPrice: number; // 内部销售加价
  }>; // 支持的箱型及其加价信息
  currency: 'USD' | 'CNY'; // 币种
  validPeriod: {
    startDate: string; // 有效期开始日期
    endDate: string; // 有效期结束日期
  }; // 有效期
  status: 'enabled' | 'disabled' | 'expired'; // 状态
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
}

// 统一的加价规则类型
type PricingRule = FclPricingRule | LclPricingRule | AirPricingRule | SurchargePricingRule | PrecarriagePricingRule | LastmilePricingRule;

// 航线选项
const routeOptions = [
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





// 搜索筛选参数
interface SearchParams {
  routeName: string;
  shippingCompany: string; // 船公司
  originPort: string; // 起运港
  chargeName: string; // 费用名称
  status: string;
  validPeriodStart: string; // 有效期开始日期
  validPeriodEnd: string; // 有效期结束日期
}

const PricingRuleManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeFeeType, setActiveFeeType] = useState<FeeType>('fcl');
  const [pricingRuleData, setPricingRuleData] = useState<PricingRule[]>([]);
  const [filteredData, setFilteredData] = useState<PricingRule[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [currentRule, setCurrentRule] = useState<PricingRule | null>(null);
  
  // 确认弹窗相关状态
  const [toggleStatusModalVisible, setToggleStatusModalVisible] = useState(false);
  const [batchToggleModalVisible, setBatchToggleModalVisible] = useState(false);
  const [pendingToggleRule, setPendingToggleRule] = useState<{ id: string; currentStatus: 'enabled' | 'disabled' | 'expired' } | null>(null);
  const [pendingBatchToggleStatus, setPendingBatchToggleStatus] = useState<'enabled' | 'disabled' | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    routeName: '',
    shippingCompany: '',
    originPort: '',
    chargeName: '',
    status: '',
    validPeriodStart: '',
    validPeriodEnd: ''
  });

  // 处理费用类型切换
  const handleFeeTypeChange = (feeType: string) => {
    setActiveFeeType(feeType as FeeType);
    setSelectedRowKeys([]);
    // 重置搜索条件
    setSearchParams({
      routeName: '',
      shippingCompany: '',
      originPort: '',
      chargeName: '',
      status: '',
      validPeriodStart: '',
      validPeriodEnd: ''
    });
  };

  // 获取当前费用类型的示例数据
  const getMockDataByFeeType = (feeType: FeeType): PricingRule[] => {
    switch (feeType) {
      case 'fcl':
        return [
      {
        id: '1',
            ruleId: generateRuleId(),
        routeName: '亚欧航线',
            shippingCompany: 'COSCO',
            originPort: '上海港',
            chargeName: '基础海运费',
            containerTypes: [
              {
                type: '20GP',
        t0Price: 50,
        t1Price: 100,
        t2Price: 150,
        t3Price: 200,
                internalSalesPrice: 80
      },
      {
                type: '40GP',
        t0Price: 80,
        t1Price: 160,
        t2Price: 240,
        t3Price: 320,
                internalSalesPrice: 120
              },
              {
                type: '40HQ',
                t0Price: 90,
                t1Price: 180,
                t2Price: 270,
                t3Price: 360,
                internalSalesPrice: 135
              }
            ],
            currency: 'USD',
            validPeriod: {
              startDate: '2024-01-01',
              endDate: '2024-12-31'
            },
        status: 'enabled',
            createTime: '2024-01-15 10:30:00',
            updateTime: '2024-01-15 10:30:00'
      },
      {
            id: '2',
            ruleId: generateRuleId(),
        routeName: '跨太平洋航线',
            shippingCompany: 'MSC',
            originPort: '深圳港',
            chargeName: '基础海运费',
            containerTypes: [
              {
                type: '20GP',
        t0Price: 60,
        t1Price: 120,
        t2Price: 180,
        t3Price: 240,
                internalSalesPrice: 90
              },
              {
                type: '40GP',
                t0Price: 100,
                t1Price: 200,
                t2Price: 300,
                t3Price: 400,
                internalSalesPrice: 150
              }
            ],
            currency: 'USD',
            validPeriod: {
              startDate: '2024-02-01',
              endDate: '2024-11-30'
            },
        status: 'enabled',
        createTime: '2024-01-16 09:20:00',
        updateTime: '2024-01-16 09:20:00'
      },
          {
            id: '3',
            ruleId: generateRuleId(),
            routeName: '亚美航线',
            shippingCompany: 'MAERSK',
            originPort: '宁波港',
            chargeName: '基础海运费',
            containerTypes: [
              {
                type: '20RF',
                t0Price: 80,
                t1Price: 160,
                t2Price: 240,
                t3Price: 320,
                internalSalesPrice: 120
              },
              {
                type: '40RF',
                t0Price: 120,
                t1Price: 240,
                t2Price: 360,
                t3Price: 480,
                internalSalesPrice: 180
              }
            ],
            currency: 'USD',
            validPeriod: {
              startDate: '2024-03-01',
              endDate: '2024-10-31'
            },
            status: 'enabled',
            createTime: '2024-01-17 11:10:00',
            updateTime: '2024-01-17 11:10:00'
          }
        ] as FclPricingRule[];
      case 'lcl':
        return [
      {
        id: '4',
            routeName: '亚欧航线',
        currency: 'USD',
            weightPrice: 2.5,
            volumePrice: 150,
            minPrice: 50,
            t0Price: 10,
            t1Price: 20,
            t2Price: 30,
            t3Price: 40,
            internalSalesPrice: 15,
            status: 'enabled',
        createTime: '2024-01-16 09:25:00',
        updateTime: '2024-01-16 14:15:00'
          }
        ] as LclPricingRule[];
      case 'air':
        return [
      {
        id: '5',
        routeName: '亚美航线',
            currency: 'USD',
            weightPrice: 3.5,
            volumePrice: 200,
            minPrice: 100,
            t0Price: 20,
            t1Price: 40,
            t2Price: 60,
            t3Price: 80,
            internalSalesPrice: 30,
        status: 'enabled',
        createTime: '2024-01-17 11:10:00',
        updateTime: '2024-01-17 11:10:00'
          }
        ] as AirPricingRule[];
      case 'surcharge':
        return [
      {
        id: '6',
            chargeName: '燃油附加费',
            chargeCode: 'BAF',
            chargeType: 'percentage',
            currency: 'USD',
            percentage: 15,
            t0Price: 5,
            t1Price: 10,
            t2Price: 15,
            t3Price: 20,
            internalSalesPrice: 8,
        status: 'enabled',
        createTime: '2024-01-17 11:15:00',
        updateTime: '2024-01-17 11:15:00'
          }
        ] as SurchargePricingRule[];
      case 'precarriage':
        return [
      {
        id: '7',
            ruleId: generateRuleId(),
            origin: '深圳',
            destination: '盐田港',
            shippingCompany: 'COSCO',
            chargeName: '港前运输费',
            containerTypes: [
              {
                type: '20GP',
                basePrice: 800,
                t0Price: 50,
                t1Price: 100,
                t2Price: 150,
                t3Price: 200,
                internalSalesPrice: 80
              },
              {
                type: '40GP',
                basePrice: 1200,
                t0Price: 80,
                t1Price: 160,
                t2Price: 240,
                t3Price: 320,
                internalSalesPrice: 120
              }
            ],
            currency: 'CNY',
            validPeriod: {
              startDate: '2024-01-01',
              endDate: '2024-12-31'
            },
        status: 'enabled',
        createTime: '2024-01-18 08:45:00',
        updateTime: '2024-01-18 08:45:00'
      },
      {
        id: '8',
            ruleId: generateRuleId(),
            origin: '广州',
            destination: '南沙港',
            shippingCompany: 'MSC',
            chargeName: '港前运输费',
            containerTypes: [
              {
                type: '20GP',
                basePrice: 600,
                t0Price: 40,
                t1Price: 80,
                t2Price: 120,
                t3Price: 160,
                internalSalesPrice: 60
              },
              {
                type: '40HQ',
                basePrice: 1000,
        t0Price: 70,
        t1Price: 140,
        t2Price: 210,
        t3Price: 280,
                internalSalesPrice: 105
              }
            ],
            currency: 'CNY',
            validPeriod: {
              startDate: '2024-02-01',
              endDate: '2024-11-30'
            },
            status: 'enabled',
            createTime: '2024-01-18 09:15:00',
            updateTime: '2024-01-18 09:15:00'
          }
        ] as PrecarriagePricingRule[];
      case 'lastmile':
        return [
      {
        id: '9',
            ruleId: generateRuleId(),
            origin: '洛杉矶港',
            destination: 'LAX9仓库',
            shippingCompany: 'MAERSK',
            chargeName: '尾程配送费',
            containerTypes: [
              {
                type: '40GP',
                basePrice: 300,
                t0Price: 30,
                t1Price: 60,
                t2Price: 90,
                t3Price: 120,
                internalSalesPrice: 45
              },
              {
                type: '40HQ',
                basePrice: 350,
                t0Price: 35,
                t1Price: 70,
                t2Price: 105,
                t3Price: 140,
                internalSalesPrice: 52
              }
            ],
            currency: 'USD',
            validPeriod: {
              startDate: '2024-01-01',
              endDate: '2024-12-31'
            },
        status: 'enabled',
            createTime: '2024-01-18 09:00:00',
            updateTime: '2024-01-18 09:00:00'
      },
      {
        id: '10',
            ruleId: generateRuleId(),
            origin: '长滩港',
            destination: 'LGB2仓库',
            shippingCompany: 'CMA CGM',
            chargeName: '尾程配送费',
            containerTypes: [
              {
                type: '20GP',
                basePrice: 250,
                t0Price: 25,
                t1Price: 50,
                t2Price: 75,
                t3Price: 100,
                internalSalesPrice: 37
              },
              {
                type: '40GP',
                basePrice: 320,
                t0Price: 32,
                t1Price: 64,
                t2Price: 96,
                t3Price: 128,
                internalSalesPrice: 48
              }
            ],
        currency: 'USD',
            validPeriod: {
              startDate: '2024-03-01',
              endDate: '2024-10-31'
            },
        status: 'enabled',
            createTime: '2024-01-18 10:30:00',
            updateTime: '2024-01-18 10:30:00'
      }
        ] as LastmilePricingRule[];
      default:
        return [];
    }
  };

  // 初始化示例数据
  useEffect(() => {
    const mockData = getMockDataByFeeType(activeFeeType);
    setPricingRuleData(mockData);
    setFilteredData(mockData);
  }, [activeFeeType]);

  // 搜索处理
  const handleSearch = () => {
    let filtered = pricingRuleData;

    if (searchParams.routeName && (activeFeeType === 'fcl' || activeFeeType === 'lcl' || activeFeeType === 'air')) {
      filtered = filtered.filter(item => 'routeName' in item && item.routeName.includes(searchParams.routeName));
    }

    if (searchParams.shippingCompany && activeFeeType === 'fcl') {
      filtered = filtered.filter(item => 'shippingCompany' in item && item.shippingCompany.includes(searchParams.shippingCompany));
    }

    if (searchParams.originPort && activeFeeType === 'fcl') {
      filtered = filtered.filter(item => 'originPort' in item && item.originPort.includes(searchParams.originPort));
    }

    if (searchParams.chargeName && activeFeeType === 'fcl') {
      filtered = filtered.filter(item => 'chargeName' in item && item.chargeName.includes(searchParams.chargeName));
    }

    if (searchParams.validPeriodStart && searchParams.validPeriodEnd && activeFeeType === 'fcl') {
      filtered = filtered.filter(item => {
        if ('validPeriod' in item) {
          const startDate = item.validPeriod.startDate;
          const endDate = item.validPeriod.endDate;
          return startDate >= searchParams.validPeriodStart && endDate <= searchParams.validPeriodEnd;
        }
        return true;
      });
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
      routeName: '',
      shippingCompany: '',
      originPort: '',
      chargeName: '',
      status: '',
      validPeriodStart: '',
      validPeriodEnd: ''
    });
    setFilteredData(pricingRuleData);
    setSelectedRowKeys([]);
  };

  // 切换状态
  const handleToggleStatus = (id: string, currentStatus: 'enabled' | 'disabled' | 'expired') => {
    setPendingToggleRule({ id, currentStatus });
    setToggleStatusModalVisible(true);
  };

  const handleConfirmToggleStatus = () => {
    if (!pendingToggleRule) return;
    
    const { id, currentStatus } = pendingToggleRule;
    const newStatus = currentStatus === 'enabled' ? 'disabled' : 'enabled';
    const newData = pricingRuleData.map(item =>
      item.id === id ? { ...item, status: newStatus, updateTime: new Date().toLocaleString('zh-CN') } : item
    );
    setPricingRuleData(newData as PricingRule[]);
    setFilteredData(newData as PricingRule[]);
    
    setToggleStatusModalVisible(false);
    setPendingToggleRule(null);
    Message.success(`已${newStatus === 'enabled' ? '启用' : '禁用'}`);
  };

  // 批量切换状态
  const handleBatchToggleStatus = (targetStatus: 'enabled' | 'disabled') => {
    setPendingBatchToggleStatus(targetStatus);
    setBatchToggleModalVisible(true);
  };

  const handleConfirmBatchToggleStatus = () => {
    if (!pendingBatchToggleStatus) return;
    
    const selectedCount = selectedRowKeys.length;
    const newData = pricingRuleData.map(item =>
      selectedRowKeys.includes(item.id) 
        ? { ...item, status: pendingBatchToggleStatus, updateTime: new Date().toLocaleString('zh-CN') } 
        : item
    );
    setPricingRuleData(newData as PricingRule[]);
    setFilteredData(newData as PricingRule[]);
    setSelectedRowKeys([]);
    
    setBatchToggleModalVisible(false);
    setPendingBatchToggleStatus(null);
    Message.success(`已批量${pendingBatchToggleStatus === 'enabled' ? '启用' : '禁用'} ${selectedCount} 条记录`);
  };

  // 根据费用类型获取表格列定义
  const getColumns = () => {
    const baseColumns = [
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
      render: (_: unknown, record: PricingRule) => (
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
      }
    ];

      // 根据费用类型决定是否显示T0~T3加价列
  const shouldShowPriceColumns = activeFeeType !== 'fcl' && activeFeeType !== 'precarriage' && activeFeeType !== 'lastmile';
  
  const commonColumns = [
    // 只有拼箱、空运、附加费才显示T0~T3加价列
    ...(shouldShowPriceColumns ? [
    {
      title: 'T0加价',
      dataIndex: 't0Price',
      width: 100,
      render: (price: number, record: PricingRule) => `${price} ${record.currency}`
    },
    {
      title: 'T1加价',
      dataIndex: 't1Price',
      width: 100,
      render: (price: number, record: PricingRule) => `${price} ${record.currency}`
    },
    {
      title: 'T2加价',
      dataIndex: 't2Price',
      width: 100,
      render: (price: number, record: PricingRule) => `${price} ${record.currency}`
    },
    {
      title: 'T3加价',
      dataIndex: 't3Price',
      width: 100,
      render: (price: number, record: PricingRule) => `${price} ${record.currency}`
    },
    {
      title: '内部销售',
      dataIndex: 'internalSalesPrice',
      width: 100,
      render: (price: number, record: PricingRule) => `${price} ${record.currency}`
  }
    ] : []),
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
      title: '更新时间',
      dataIndex: 'updateTime',
      width: 160,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 200,
      fixed: 'right' as const,
      render: (_: unknown, record: PricingRule) => (
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
                  onClick={() => handleToggleStatus(record.id, record.status)}
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
      }
    ];

    let specificColumns: any[] = [];

    switch (activeFeeType) {
      case 'fcl':
        specificColumns = [
          {
            title: '规则ID',
            dataIndex: 'ruleId',
            width: 140,
            render: (ruleId: string) => (
              <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{ruleId}</span>
            )
          },
          {
            title: '航线名称',
            dataIndex: 'routeName',
            width: 120,
          },
          {
            title: '船公司',
            dataIndex: 'shippingCompany',
            width: 100,
          },
          {
            title: '起运港',
            dataIndex: 'originPort',
            width: 100,
          },
          {
            title: '费用名称',
            dataIndex: 'chargeName',
            width: 120,
          },
          {
            title: '箱型',
            dataIndex: 'containerTypes',
            width: 200,
            render: (containerTypes: any[], record: any) => (
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {containerTypes.map((container, index) => (
                  <Tooltip
                    key={index}
                    content={
                      <div style={{ padding: '8px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                          {container.type} 加价详情
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '12px' }}>
                          <div>T0加价: {container.t0Price} {record.currency}</div>
                          <div>T1加价: {container.t1Price} {record.currency}</div>
                          <div>T2加价: {container.t2Price} {record.currency}</div>
                          <div>T3加价: {container.t3Price} {record.currency}</div>
                          <div style={{ gridColumn: '1 / -1', marginTop: '4px', borderTop: '1px solid #eee', paddingTop: '4px' }}>
                            内部销售: {container.internalSalesPrice} {record.currency}
                          </div>
                        </div>
                      </div>
                    }
                    trigger="hover"
                  >
                    <Tag 
                      color="blue" 
                      style={{ cursor: 'pointer', margin: '2px' }}
                    >
                      {container.type}
                    </Tag>
                  </Tooltip>
                ))}
              </div>
            )
          },
          {
            title: '有效期',
            dataIndex: 'validPeriod',
            width: 200,
            render: (validPeriod: any) => (
              <span style={{ fontSize: '12px' }}>
                {validPeriod.startDate} 至 {validPeriod.endDate}
              </span>
            )
          }
        ];
        break;
      case 'lcl':
      case 'air':
        specificColumns = [
          {
            title: '航线名称',
            dataIndex: 'routeName',
            width: 150,
          },
          {
            title: '重量加价',
            dataIndex: 'weightPrice',
            width: 120,
            render: (price: number, record: PricingRule) => `${price} ${record.currency}/KG`
          },
          {
            title: '体积加价',
            dataIndex: 'volumePrice',
            width: 120,
            render: (price: number, record: PricingRule) => `${price} ${record.currency}/CBM`
          },
          {
            title: '最低加价',
            dataIndex: 'minPrice',
            width: 100,
            render: (price: number, record: PricingRule) => `${price} ${record.currency}`
          }
        ];
        break;
      case 'surcharge':
        specificColumns = [
          {
            title: '费用名称',
            dataIndex: 'chargeName',
            width: 150,
          },
          {
            title: '费用代码',
            dataIndex: 'chargeCode',
            width: 100,
          },
          {
            title: '费用类型',
            dataIndex: 'chargeType',
            width: 100,
            render: (type: string) => (
              <Tag color={type === 'fixed' ? 'blue' : 'purple'}>
                {type === 'fixed' ? '固定金额' : '百分比'}
              </Tag>
            )
          },
          {
            title: '基础费用',
            dataIndex: 'fixedAmount',
            width: 120,
            render: (amount: number, record: any) => {
              if (record.chargeType === 'fixed') {
                return `${amount || 0} ${record.currency}`;
              } else {
                return `${record.percentage || 0}%`;
              }
            }
          }
        ];
        break;
      case 'precarriage':
      case 'lastmile':
        specificColumns = [
          {
            title: '规则ID',
            dataIndex: 'ruleId',
            width: 150,
            render: (ruleId: string) => (
              <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#666' }}>
                {ruleId}
              </span>
            )
          },
          {
            title: activeFeeType === 'precarriage' ? '起运地' : '目的港',
            dataIndex: 'origin',
            width: 120,
          },
          {
            title: activeFeeType === 'precarriage' ? '目的港' : '配送地址',
            dataIndex: 'destination',
            width: 150,
          },
          {
            title: activeFeeType === 'precarriage' ? '供应商' : '目的港代理',
            dataIndex: 'shippingCompany',
            width: 120,
          },
          {
            title: '费用名称',
            dataIndex: 'chargeName',
            width: 120,
          },
          {
            title: '箱型',
            dataIndex: 'containerTypes',
            width: 200,
            render: (_: unknown, record: PrecarriagePricingRule | LastmilePricingRule) => (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {record.containerTypes.map((container, index) => (
                  <Tooltip
                    key={index}
                    content={
                      <div style={{ padding: '8px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#1d2129' }}>
                          {container.type} 详细信息
                        </div>
                        <div style={{ fontSize: '12px' }}>
                          <div>
                            <span style={{ color: '#86909c' }}>基础价格:</span>
                            <span style={{ marginLeft: '4px', fontWeight: 'bold' }}>
                              {container.basePrice} {record.currency}
                            </span>
                          </div>
                        </div>
                      </div>
                    }
                  >
                    <Tag 
                      color="blue" 
                      style={{ 
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {container.type}
                    </Tag>
                  </Tooltip>
                ))}
              </div>
            )
          },
          {
            title: '有效期',
            dataIndex: 'validPeriod',
            width: 180,
            render: (_: unknown, record: PrecarriagePricingRule | LastmilePricingRule) => (
              <span style={{ fontSize: '12px', color: '#666' }}>
                {record.validPeriod.startDate} 至 {record.validPeriod.endDate}
              </span>
            )
          }
        ];
        break;
    }

    return [...baseColumns, ...specificColumns, ...commonColumns];
  };

  // 详情处理
  const handleDetail = (record: PricingRule) => {
    setCurrentRule(record);
    setDetailModalVisible(true);
  };

  // 编辑处理 - 跳转到编辑页面
  const handleEdit = (record: PricingRule) => {
    navigate(`/controltower/saas/pricing-rule-management/edit/${record.id}?type=${activeFeeType}`);
  };

  // 新增处理 - 跳转到新增页面
  const handleAdd = () => {
    navigate(`/controltower/saas/pricing-rule-management/add?type=${activeFeeType}`);
  };



  return (
    <Card>
      <div style={{ marginBottom: '20px' }}>
        <Title heading={4} style={{ margin: 0 }}>加价规则维护</Title>
      </div>

      {/* 费用类型切换Tab */}
      <Card style={{ marginBottom: '16px' }}>
        <Tabs activeTab={activeFeeType} onChange={handleFeeTypeChange}>
          {feeTypeOptions.map(option => (
            <TabPane key={option.key} title={option.title} />
          ))}
        </Tabs>
      </Card>

      {/* 搜索筛选区域 */}
      <Card style={{ marginBottom: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>航线名称</div>
            <Select
              placeholder="选择航线"
              value={searchParams.routeName}
              onChange={(value) => setSearchParams(prev => ({ ...prev, routeName: value }))}
              allowClear
            >
              {routeOptions.map(option => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
              ))}
            </Select>
          </div>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>船公司</div>
            <Select
              placeholder="选择船公司"
              value={searchParams.shippingCompany}
              onChange={(value) => setSearchParams(prev => ({ ...prev, shippingCompany: value }))}
              allowClear
            >
              <Option value="COSCO">COSCO</Option>
              <Option value="MSC">MSC</Option>
              <Option value="MAERSK">MAERSK</Option>
              <Option value="CMA CGM">CMA CGM</Option>
              <Option value="EVERGREEN">EVERGREEN</Option>
            </Select>
          </div>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>起运港</div>
            <Select
              placeholder="选择起运港"
              value={searchParams.originPort}
              onChange={(value) => setSearchParams(prev => ({ ...prev, originPort: value }))}
              allowClear
            >
              <Option value="上海港">上海港</Option>
              <Option value="深圳港">深圳港</Option>
              <Option value="宁波港">宁波港</Option>
              <Option value="青岛港">青岛港</Option>
              <Option value="天津港">天津港</Option>
            </Select>
          </div>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>费用名称</div>
            <Select
              placeholder="选择费用名称"
              value={searchParams.chargeName}
              onChange={(value) => setSearchParams(prev => ({ ...prev, chargeName: value }))}
              allowClear
            >
              <Option value="基础海运费">基础海运费</Option>
              <Option value="燃油附加费">燃油附加费</Option>
              <Option value="港口费">港口费</Option>
              <Option value="文件费">文件费</Option>
            </Select>
          </div>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>有效期开始</div>
            <DatePicker
              placeholder="选择开始日期"
              value={searchParams.validPeriodStart}
              onChange={(value) => setSearchParams(prev => ({ ...prev, validPeriodStart: value || '' }))}
              allowClear
            />
          </div>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>有效期结束</div>
            <DatePicker
              placeholder="选择结束日期"
              value={searchParams.validPeriodEnd}
              onChange={(value) => setSearchParams(prev => ({ ...prev, validPeriodEnd: value || '' }))}
              allowClear
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
              <Option value="expired">过期</Option>
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
              新增规则
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
                onClick={() => handleBatchToggleStatus('enabled')}
              >
                批量启用 ({selectedRowKeys.length})
                </Button>
              <Button 
                type="outline" 
                status="warning"
                onClick={() => handleBatchToggleStatus('disabled')}
              >
                批量禁用 ({selectedRowKeys.length})
              </Button>
            </div>
          )}
        </div>
      </div>

      <Table
        columns={getColumns()}
        data={filteredData}
        rowKey="id"
        scroll={{ x: 1600 }}
        pagination={{
          pageSize: 10,
          showTotal: true,
          showJumper: true,
          sizeCanChange: true,
        }}
      />

      {/* 详情抽屉 */}
      <Drawer
        title="加价规则详情"
        visible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={
          <div style={{ textAlign: 'right' }}>
          <Button onClick={() => setDetailModalVisible(false)}>
            关闭
          </Button>
          </div>
        }
        width={600}
        placement="right"
      >
        {currentRule && (
          <div style={{ padding: '24px', height: '100%', overflow: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* 根据费用类型显示不同的字段 */}
              {activeFeeType === 'fcl' && (
                <>
                  {/* 基本信息卡片 */}
                  <div style={{ 
                    border: '1px solid #e5e6e7', 
                    borderRadius: '8px', 
                    padding: '16px',
                    backgroundColor: '#fafbfc'
                  }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#1d2129' }}>
                      基本信息
                    </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                        <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>规则ID</div>
                        <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#165DFF', backgroundColor: '#f2f3ff', padding: '4px 8px', borderRadius: '4px' }}>
                          {'ruleId' in currentRule ? currentRule.ruleId : '-'}
                        </div>
              </div>
              <div>
                        <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>航线名称</div>
                        <div style={{ color: '#1d2129' }}>{'routeName' in currentRule ? currentRule.routeName : '-'}</div>
                      </div>
                <div>
                        <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>船公司</div>
                        <div style={{ color: '#1d2129' }}>{'shippingCompany' in currentRule ? currentRule.shippingCompany : '-'}</div>
                </div>
                      <div>
                        <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>起运港</div>
                        <div style={{ color: '#1d2129' }}>{'originPort' in currentRule ? currentRule.originPort : '-'}</div>
              </div>
              <div>
                        <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>费用名称</div>
                        <div style={{ color: '#1d2129' }}>{'chargeName' in currentRule ? currentRule.chargeName : '-'}</div>
                      </div>
                <div>
                        <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>有效期</div>
                        <div style={{ color: '#1d2129' }}>
                          {'validPeriod' in currentRule ? 
                            `${currentRule.validPeriod.startDate} 至 ${currentRule.validPeriod.endDate}` : '-'}
                </div>
                      </div>
                    </div>
                  </div>

                  {/* 箱型及加价详情卡片 */}
                  <div style={{ 
                    border: '1px solid #e5e6e7', 
                    borderRadius: '8px', 
                    padding: '16px',
                    backgroundColor: '#fafbfc'
                  }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#1d2129' }}>
                      箱型及加价详情
              </div>
              <div>
                      {'containerTypes' in currentRule && currentRule.containerTypes ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {currentRule.containerTypes.map((container: any, index: number) => (
                            <div key={index} style={{ 
                              border: '1px solid #d9d9d9', 
                              borderRadius: '6px', 
                              padding: '16px',
                              backgroundColor: '#ffffff'
                            }}>
                              <div style={{ fontWeight: 'bold', marginBottom: '12px', color: '#1890ff', fontSize: '14px' }}>
                                📦 {container.type}
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                                <div style={{ padding: '8px', backgroundColor: '#f6f7f9', borderRadius: '4px' }}>
                                  <span style={{ color: '#4e5969', fontWeight: 'bold' }}>T0加价: </span>
                                  <span style={{ color: '#1d2129' }}>{container.t0Price} {currentRule.currency}</span>
                                </div>
                                <div style={{ padding: '8px', backgroundColor: '#f6f7f9', borderRadius: '4px' }}>
                                  <span style={{ color: '#4e5969', fontWeight: 'bold' }}>T1加价: </span>
                                  <span style={{ color: '#1d2129' }}>{container.t1Price} {currentRule.currency}</span>
                                </div>
                                <div style={{ padding: '8px', backgroundColor: '#f6f7f9', borderRadius: '4px' }}>
                                  <span style={{ color: '#4e5969', fontWeight: 'bold' }}>T2加价: </span>
                                  <span style={{ color: '#1d2129' }}>{container.t2Price} {currentRule.currency}</span>
                                </div>
                                <div style={{ padding: '8px', backgroundColor: '#f6f7f9', borderRadius: '4px' }}>
                                  <span style={{ color: '#4e5969', fontWeight: 'bold' }}>T3加价: </span>
                                  <span style={{ color: '#1d2129' }}>{container.t3Price} {currentRule.currency}</span>
                                </div>
                                <div style={{ 
                                  gridColumn: '1 / -1', 
                                  marginTop: '8px', 
                                  paddingTop: '12px', 
                                  borderTop: '1px solid #e5e6e7',
                                  padding: '8px',
                                  backgroundColor: '#e6f7ff',
                                  borderRadius: '4px'
                                }}>
                                  <span style={{ color: '#0958d9', fontWeight: 'bold' }}>内部销售: </span>
                                  <span style={{ color: '#1d2129' }}>{container.internalSalesPrice} {currentRule.currency}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', color: '#86909c', padding: '20px' }}>暂无箱型信息</div>
                      )}
                    </div>
                  </div>
                </>
              )}
              
              {(activeFeeType === 'lcl' || activeFeeType === 'air') && (
                <div style={{ 
                  border: '1px solid #e5e6e7', 
                  borderRadius: '8px', 
                  padding: '16px',
                  backgroundColor: '#fafbfc'
                }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#1d2129' }}>
                    {activeFeeType === 'lcl' ? '拼箱海运费' : '空运运费'}详情
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                      <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>航线名称</div>
                      <div style={{ color: '#1d2129' }}>{'routeName' in currentRule ? currentRule.routeName : '-'}</div>
                    </div>
                    <div>
                      <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>重量加价</div>
                      <div style={{ color: '#1d2129' }}>{'weightPrice' in currentRule ? `${currentRule.weightPrice} ${currentRule.currency}/KG` : '-'}</div>
                    </div>
                    <div>
                      <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>体积加价</div>
                      <div style={{ color: '#1d2129' }}>{'volumePrice' in currentRule ? `${currentRule.volumePrice} ${currentRule.currency}/CBM` : '-'}</div>
                    </div>
                    <div>
                      <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>最低加价</div>
                      <div style={{ color: '#1d2129' }}>{'minPrice' in currentRule ? `${currentRule.minPrice} ${currentRule.currency}` : '-'}</div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeFeeType === 'surcharge' && (
                <div style={{ 
                  border: '1px solid #e5e6e7', 
                  borderRadius: '8px', 
                  padding: '16px',
                  backgroundColor: '#fafbfc'
                }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#1d2129' }}>
                    附加费详情
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>费用名称</div>
                      <div style={{ color: '#1d2129' }}>{'chargeName' in currentRule ? currentRule.chargeName : '-'}</div>
                    </div>
                    <div>
                      <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>费用代码</div>
                      <div style={{ color: '#1d2129', fontFamily: 'monospace', backgroundColor: '#f2f3ff', padding: '4px 8px', borderRadius: '4px' }}>
                        {'chargeCode' in currentRule ? currentRule.chargeCode : '-'}
                      </div>
                    </div>
                    <div>
                      <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>费用类型</div>
                      <div>
                        {'chargeType' in currentRule ? (
                          <Tag color={currentRule.chargeType === 'fixed' ? 'blue' : 'purple'}>
                            {currentRule.chargeType === 'fixed' ? '固定金额' : '百分比'}
                  </Tag>
                        ) : '-'}
                </div>
              </div>
              <div>
                      <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>基础费用</div>
                      <div style={{ color: '#1d2129' }}>
                        {'chargeType' in currentRule ? (
                          currentRule.chargeType === 'fixed' 
                            ? `${'fixedAmount' in currentRule ? currentRule.fixedAmount || 0 : 0} ${currentRule.currency}`
                            : `${'percentage' in currentRule ? currentRule.percentage || 0 : 0}%`
                        ) : '-'}
              </div>
                    </div>
                  </div>
                </div>
              )}
              
              {(activeFeeType === 'precarriage' || activeFeeType === 'lastmile') && (
                <>
                  {/* 基本信息卡片 */}
                  <div style={{ 
                    border: '1px solid #e5e6e7', 
                    borderRadius: '8px', 
                    padding: '16px',
                    backgroundColor: '#fafbfc'
                  }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#1d2129' }}>
                      基本信息
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                        <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>规则ID</div>
                        <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#165DFF', backgroundColor: '#f2f3ff', padding: '4px 8px', borderRadius: '4px' }}>
                          {'ruleId' in currentRule ? currentRule.ruleId : '-'}
                        </div>
              </div>
              <div>
                        <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>
                          {activeFeeType === 'precarriage' ? '起运地' : '目的港'}
                        </div>
                        <div style={{ color: '#1d2129' }}>{'origin' in currentRule ? currentRule.origin : '-'}</div>
              </div>
              <div>
                        <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>
                          {activeFeeType === 'precarriage' ? '目的港' : '配送地址'}
                        </div>
                        <div style={{ color: '#1d2129' }}>{'destination' in currentRule ? currentRule.destination : '-'}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontWeight: 'bold' }}>{activeFeeType === 'precarriage' ? '供应商' : '目的港代理'}：</span>
                        <span>
                          {(() => {
                            const rule = pricingRuleData.find(r => r.id === pendingToggleRule!.id);
                            return rule && 'shippingCompany' in rule ? rule.shippingCompany : '-';
                          })()}
                        </span>
              </div>
              <div>
                        <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>费用名称</div>
                        <div style={{ color: '#1d2129' }}>{'chargeName' in currentRule ? currentRule.chargeName : '-'}</div>
              </div>
                      <div>
                        <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>有效期</div>
                        <div style={{ color: '#1d2129' }}>
                          {'validPeriod' in currentRule ? 
                            `${currentRule.validPeriod.startDate} 至 ${currentRule.validPeriod.endDate}` : '-'}
            </div>
                      </div>
                    </div>
                  </div>

                  {/* 箱型详情卡片 */}
                  <div style={{ 
                    border: '1px solid #e5e6e7', 
                    borderRadius: '8px', 
                    padding: '16px',
                    backgroundColor: '#fafbfc'
                  }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#1d2129' }}>
                      箱型详情
                    </div>
                    <div>
                      {'containerTypes' in currentRule && currentRule.containerTypes ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {currentRule.containerTypes.map((container: any, index: number) => (
                            <div key={index} style={{ 
                              border: '1px solid #d9d9d9', 
                              borderRadius: '6px', 
                              padding: '16px',
                              backgroundColor: '#ffffff'
                            }}>
                              <div style={{ fontWeight: 'bold', marginBottom: '12px', color: '#1890ff', fontSize: '14px' }}>
                                📦 {container.type}
                              </div>
                              <div style={{ fontSize: '13px' }}>
                                <div style={{ padding: '8px', backgroundColor: '#f6f7f9', borderRadius: '4px' }}>
                                  <span style={{ color: '#4e5969', fontWeight: 'bold' }}>基础价格: </span>
                                  <span style={{ color: '#1d2129' }}>{container.basePrice} {currentRule.currency}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', color: '#86909c', padding: '20px' }}>暂无箱型信息</div>
                      )}
                    </div>
                  </div>
                </>
              )}
              
              {/* 只有拼箱、空运、附加费才显示T0~T3加价信息 */}
              {activeFeeType !== 'fcl' && activeFeeType !== 'precarriage' && activeFeeType !== 'lastmile' && (
                <div style={{ 
                  border: '1px solid #e5e6e7', 
                  borderRadius: '8px', 
                  padding: '16px',
                  backgroundColor: '#fafbfc'
                }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#1d2129' }}>
                    加价详情
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ padding: '12px', backgroundColor: '#f6f7f9', borderRadius: '6px' }}>
                      <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>T0加价</div>
                      <div style={{ color: '#1d2129', fontSize: '14px', fontWeight: 'bold' }}>
                        {'t0Price' in currentRule ? `${currentRule.t0Price} ${currentRule.currency}` : '-'}
                      </div>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: '#f6f7f9', borderRadius: '6px' }}>
                      <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>T1加价</div>
                      <div style={{ color: '#1d2129', fontSize: '14px', fontWeight: 'bold' }}>
                        {'t1Price' in currentRule ? `${currentRule.t1Price} ${currentRule.currency}` : '-'}
                      </div>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: '#f6f7f9', borderRadius: '6px' }}>
                      <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>T2加价</div>
                      <div style={{ color: '#1d2129', fontSize: '14px', fontWeight: 'bold' }}>
                        {'t2Price' in currentRule ? `${currentRule.t2Price} ${currentRule.currency}` : '-'}
                      </div>
                    </div>
                    <div style={{ padding: '12px', backgroundColor: '#f6f7f9', borderRadius: '6px' }}>
                      <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>T3加价</div>
                      <div style={{ color: '#1d2129', fontSize: '14px', fontWeight: 'bold' }}>
                        {'t3Price' in currentRule ? `${currentRule.t3Price} ${currentRule.currency}` : '-'}
                      </div>
                    </div>
                    <div style={{ 
                      gridColumn: '1 / -1', 
                      padding: '12px', 
                      backgroundColor: '#e6f7ff', 
                      borderRadius: '6px',
                      marginTop: '8px'
                    }}>
                      <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#0958d9' }}>内部销售加价</div>
                      <div style={{ color: '#1d2129', fontSize: '14px', fontWeight: 'bold' }}>
                        {'internalSalesPrice' in currentRule ? `${currentRule.internalSalesPrice} ${currentRule.currency}` : '-'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 通用字段 */}
              <div style={{ 
                border: '1px solid #e5e6e7', 
                borderRadius: '8px', 
                padding: '16px',
                backgroundColor: '#fafbfc'
              }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#1d2129' }}>
                  规则状态
                </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                    <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>币种</div>
                    <div>
                      <Tag color={currentRule.currency === 'USD' ? 'green' : 'orange'}>{currentRule.currency}</Tag>
                    </div>
                </div>
                <div>
                    <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>状态</div>
                    <div>
                      <Tag color={currentRule.status === 'enabled' ? 'green' : 'red'}>
                        {currentRule.status === 'enabled' ? '启用' : '禁用'}
                      </Tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              {/* 时间信息 */}
              <div style={{ 
                border: '1px solid #e5e6e7', 
                borderRadius: '8px', 
                padding: '16px',
                backgroundColor: '#fafbfc'
              }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#1d2129' }}>
                  时间信息
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>创建时间</div>
                    <div style={{ color: '#1d2129', fontSize: '13px' }}>{currentRule.createTime}</div>
                  </div>
                  <div>
                    <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#4e5969' }}>更新时间</div>
                    <div style={{ color: '#1d2129', fontSize: '13px' }}>{currentRule.updateTime}</div>
                </div>
              </div>
              </div>
          </div>
        )}
      </Drawer>

      {/* 启用/禁用确认弹窗 */}
      <Modal
        title={pendingToggleRule ? `确定要${pendingToggleRule.currentStatus === 'enabled' ? '禁用' : '启用'}该规则吗？` : '确认操作'}
        visible={toggleStatusModalVisible}
        onCancel={() => {
          setToggleStatusModalVisible(false);
          setPendingToggleRule(null);
        }}
        onOk={handleConfirmToggleStatus}
        okText={pendingToggleRule ? `确定${pendingToggleRule.currentStatus === 'enabled' ? '禁用' : '启用'}` : '确定'}
        cancelText="取消"
        okButtonProps={{
          style: pendingToggleRule ? {
            backgroundColor: pendingToggleRule.currentStatus === 'enabled' ? '#F53F3F' : '#00B42A',
            borderColor: pendingToggleRule.currentStatus === 'enabled' ? '#F53F3F' : '#00B42A'
          } : {}
        }}
        style={{ width: 500 }}
      >
        {pendingToggleRule && (
          <div style={{ marginTop: '16px' }}>
            {/* 根据费用类型显示不同的规则信息 */}
            {activeFeeType === 'fcl' && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold' }}>规则ID：</span>
                  <span style={{ fontFamily: 'monospace', color: '#165DFF' }}>
                    {(() => {
                      const rule = pricingRuleData.find(r => r.id === pendingToggleRule.id);
                      return rule && 'ruleId' in rule ? rule.ruleId : '-';
                    })()}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold' }}>航线名称：</span>
                  <span>
                    {(() => {
                      const rule = pricingRuleData.find(r => r.id === pendingToggleRule.id);
                      return rule && 'routeName' in rule ? rule.routeName : '-';
                    })()}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold' }}>船公司：</span>
                  <span>
                    {(() => {
                      const rule = pricingRuleData.find(r => r.id === pendingToggleRule.id);
                      return rule && 'shippingCompany' in rule ? rule.shippingCompany : '-';
                    })()}
                  </span>
                </div>
              </>
            )}
            {(activeFeeType === 'lcl' || activeFeeType === 'air') && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>航线名称：</span>
                <span>
                  {(() => {
                    const rule = pricingRuleData.find(r => r.id === pendingToggleRule.id);
                    return rule && 'routeName' in rule ? rule.routeName : '-';
                  })()}
                </span>
              </div>
            )}
            {activeFeeType === 'surcharge' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>费用名称：</span>
                <span>
                  {(() => {
                    const rule = pricingRuleData.find(r => r.id === pendingToggleRule.id);
                    return rule && 'chargeName' in rule ? rule.chargeName : '-';
                  })()}
                </span>
              </div>
            )}
            {(activeFeeType === 'precarriage' || activeFeeType === 'lastmile') && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold' }}>规则ID：</span>
                  <span style={{ fontFamily: 'monospace', color: '#165DFF' }}>
                    {(() => {
                      const rule = pricingRuleData.find(r => r.id === pendingToggleRule.id);
                      return rule && 'ruleId' in rule ? rule.ruleId : '-';
                    })()}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold' }}>{activeFeeType === 'precarriage' ? '起运地' : '目的港'}：</span>
                  <span>
                    {(() => {
                      const rule = pricingRuleData.find(r => r.id === pendingToggleRule.id);
                      return rule && 'origin' in rule ? rule.origin : '-';
                    })()}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold' }}>{activeFeeType === 'precarriage' ? '目的港' : '配送地址'}：</span>
                  <span>
                    {(() => {
                      const rule = pricingRuleData.find(r => r.id === pendingToggleRule.id);
                      return rule && 'destination' in rule ? rule.destination : '-';
                    })()}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold' }}>{activeFeeType === 'precarriage' ? '供应商' : '目的港代理'}：</span>
                  <span>
                    {(() => {
                      const rule = pricingRuleData.find(r => r.id === pendingToggleRule.id);
                      return rule && 'shippingCompany' in rule ? rule.shippingCompany : '-';
                    })()}
                  </span>
                </div>
              </>
            )}
            <div style={{ 
              padding: '12px', 
              backgroundColor: pendingToggleRule.currentStatus === 'enabled' ? '#fff2f0' : '#f6ffed',
              border: `1px solid ${pendingToggleRule.currentStatus === 'enabled' ? '#F53F3F' : '#00B42A'}20`,
              borderRadius: '6px',
              marginTop: '12px'
            }}>
              <span style={{ 
                color: pendingToggleRule.currentStatus === 'enabled' ? '#F53F3F' : '#00B42A', 
                fontWeight: 'bold' 
              }}>
                {pendingToggleRule.currentStatus === 'enabled' ? '禁用' : '启用'}后，该规则将{pendingToggleRule.currentStatus === 'enabled' ? '停止生效' : '重新生效'}
              </span>
            </div>
          </div>
        )}
      </Modal>

      {/* 批量启用/禁用确认弹窗 */}
      <Modal
        title={pendingBatchToggleStatus ? `确定要批量${pendingBatchToggleStatus === 'enabled' ? '启用' : '禁用'}选中的规则吗？` : '确认批量操作'}
        visible={batchToggleModalVisible}
        onCancel={() => {
          setBatchToggleModalVisible(false);
          setPendingBatchToggleStatus(null);
        }}
        onOk={handleConfirmBatchToggleStatus}
        okText={pendingBatchToggleStatus ? `确定批量${pendingBatchToggleStatus === 'enabled' ? '启用' : '禁用'}` : '确定'}
        cancelText="取消"
        okButtonProps={{
          style: pendingBatchToggleStatus ? {
            backgroundColor: pendingBatchToggleStatus === 'enabled' ? '#00B42A' : '#F53F3F',
            borderColor: pendingBatchToggleStatus === 'enabled' ? '#00B42A' : '#F53F3F'
          } : {}
        }}
        style={{ width: 500 }}
      >
        {pendingBatchToggleStatus && (
          <div style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontWeight: 'bold' }}>选中规则数量：</span>
              <span style={{ color: '#165DFF', fontWeight: 'bold' }}>{selectedRowKeys.length} 条</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontWeight: 'bold' }}>费用类型：</span>
              <span>{feeTypeOptions.find(option => option.key === activeFeeType)?.title}</span>
            </div>
            <div style={{ 
              padding: '12px', 
              backgroundColor: pendingBatchToggleStatus === 'enabled' ? '#f6ffed' : '#fff2f0',
              border: `1px solid ${pendingBatchToggleStatus === 'enabled' ? '#00B42A' : '#F53F3F'}20`,
              borderRadius: '6px',
              marginTop: '12px'
            }}>
              <span style={{ 
                color: pendingBatchToggleStatus === 'enabled' ? '#00B42A' : '#F53F3F', 
                fontWeight: 'bold' 
              }}>
                批量{pendingBatchToggleStatus === 'enabled' ? '启用' : '禁用'}后，所选规则将{pendingBatchToggleStatus === 'enabled' ? '重新生效' : '停止生效'}
              </span>
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default PricingRuleManagement; 