import React, { useState, useMemo, useEffect } from 'react';
import { 
  Card, 
  Breadcrumb, 
  // Typography, 
  Button, 
  Space, 
  Input, 
  Select, 
  Form, 
  Grid, 
  Checkbox,
  Radio, 
  // Tooltip, 删除未使用的导入
  Divider,
  Table,
  Message,
  Modal,
  DatePicker
} from '@arco-design/web-react';
import { IconSave, IconDelete, IconUpload, /* IconEye, */ IconPlus, IconMinus, IconRobot } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import SaasLayout from './SaasLayout';
import './CreateFclInquiry.css';


const { Row, Col } = Grid;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

// 省份数据
const provinceOptions = [
  { value: '浙江省', label: '浙江省' },
  { value: '江苏省', label: '江苏省' },
  { value: '上海市', label: '上海市' },
  { value: '广东省', label: '广东省' },
  { value: '内蒙古自治区', label: '内蒙古自治区' },
  { value: '黑龙江省', label: '黑龙江省' },
  { value: '新疆维吾尔自治区', label: '新疆维吾尔自治区' },
];

// 选项类型定义
interface OptionItem {
  value: string;
  label: string;
}

// 城市数据 (按省份分组)
const cityOptions: Record<string, OptionItem[]> = {
  '浙江省': [
    { value: '杭州市', label: '杭州市' },
    { value: '嘉兴市', label: '嘉兴市' },
    { value: '湖州市', label: '湖州市' },
    { value: '宁波市', label: '宁波市' },
    { value: '绍兴市', label: '绍兴市' },
  ],
  '江苏省': [
    { value: '苏州市', label: '苏州市' },
    { value: '南京市', label: '南京市' },
    { value: '无锡市', label: '无锡市' },
  ],
  '上海市': [
    { value: '上海市', label: '上海市' },
  ],
  '广东省': [
    { value: '广州市', label: '广州市' },
    { value: '佛山市', label: '佛山市' },
    { value: '深圳市', label: '深圳市' },
  ],
};

// 区县数据 (按城市分组)
const districtOptions: Record<string, OptionItem[]> = {
  '杭州市': [
    { value: '萧山区', label: '萧山区' },
    { value: '西湖区', label: '西湖区' },
    { value: '余杭区', label: '余杭区' },
  ],
  '嘉兴市': [
    { value: '海宁市', label: '海宁市' },
    { value: '平湖市', label: '平湖市' },
  ],
  '苏州市': [
    { value: '工业园区', label: '工业园区' },
    { value: '姑苏区', label: '姑苏区' },
  ],
  '上海市': [
    { value: '浦东新区', label: '浦东新区' },
    { value: '黄浦区', label: '黄浦区' },
  ],
};

// 街道/村镇数据 (按区县分组)
const streetOptions: Record<string, OptionItem[]> = {
  '萧山区': [
    { value: '新塘街道', label: '新塘街道' },
    { value: '北干街道', label: '北干街道' },
  ],
  '西湖区': [
    { value: '灵隐街道', label: '灵隐街道' },
    { value: '西溪街道', label: '西溪街道' },
  ],
  '工业园区': [
    { value: '娄葑街道', label: '娄葑街道' },
    { value: '斜塘街道', label: '斜塘街道' },
  ],
  '浦东新区': [
    { value: '陆家嘴街道', label: '陆家嘴街道' },
    { value: '张江镇', label: '张江镇' },
  ],
};

// 区域项接口定义
interface AreaItem {
  key: number;
  province: string;
  city: string;
  district: string;
  street: string;
}

// 模拟邮编和地址映射数据
const zipCodeAddressMap: Record<string, string> = {
  '90001': 'Los Angeles, CA',
  '90210': 'Beverly Hills, CA',
  '10001': 'New York, NY',
  '33101': 'Miami, FL',
  '60601': 'Chicago, IL',
  '98101': 'Seattle, WA',
  '94101': 'San Francisco, CA',
  '02101': 'Boston, MA',
  '77001': 'Houston, TX',
  '19101': 'Philadelphia, PA',
  '20001': 'Washington, DC',
  '30301': 'Atlanta, GA',
  '48201': 'Detroit, MI',
  '80201': 'Denver, CO',
  '85001': 'Phoenix, AZ',
  '92101': 'San Diego, CA',
  '75201': 'Dallas, TX',
  '89101': 'Las Vegas, NV',
  '97201': 'Portland, OR',
  '37201': 'Nashville, TN'
};

/**
 * 整箱询价表单组件
 */
const CreateFclInquiry: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  // 保存表单状态
  const [formState, setFormState] = useState({
    inquiryNo: 'R43597505',  // 询价编号，自动生成
    inquirer: '张三',        // 询价人，自动生成
    precarriageChecked: true,  // 港前报价
    mainlineChecked: true,     // 干线报价
    lastmileChecked: true,     // 尾程报价
    cargoNature: '询价',       // 货盘性质
    serviceType: '请选择',     // 服务条款
    clientType: '不指定',      // 委托单位，默认不指定
    clientCompany: '',         // 委托单位正式客户
    clientName: '',            // 委托单位名称
    cargoReadyTimeType: '区间', // 货好时间类型：区间或日期
    cargoReadyTime: '二周内',   // 货好时间
    cargoReadyDate: '',        // 货好具体日期
    transitType: '不指定',     // 直达/中转，默认不指定
    route: '跨太平洋东行',      // 航线，默认为跨太平洋东行
    departurePort: 'CNSHA | Shanghai',    // 起运港
    dischargePort: 'USLAX | Los Angeles', // 卸货港
    transitPort: '',           // 中转港
    cargoQuality: '实单',      // 货盘性质
    shipCompany: '不指定',     // 船公司，默认为不指定
    goodsType: '普货',         // 货物类型
    dangerLevel: '',           // 危险品等级
    unNo: '',                  // UN No
    length: '',                // 长宽高
    temperature: '',           // 温度
    humidity: '',              // 湿度量
    weight: '',                // 重量
    serviceTerms: 'DDP',       // 服务条款，默认为DDP (因为默认勾选了港前和尾程)
    customServiceTerms: '',    // 自定义服务条款
    hsCode: '',                // 品名（HS Code）
    remark: '',                // 备注
    containerType: '20GP',     // 箱型
    containerCount: 1,         // 箱量
    loadingPointDetail: '',    // 装箱门点详细地址
    // 尾程送货地址相关
    addressType: '第三方地址',  // 配送地址类型
    zipCode: '',               // 邮编
    address: '',               // 详细地址
    warehouseCode: ''          // 仓库代码
  });

  // 装箱门点区域选择相关状态
  const [areaList, setAreaList] = useState<AreaItem[]>([{
    key: 1,
    province: '',
    city: '',
    district: '',
    street: ''
  }]);
  
  // 城市选项状态
  const [citiesForProvince, setCitiesForProvince] = useState<Record<number, any[]>>({});
  // 区县选项状态
  const [districtsForCity, setDistrictsForCity] = useState<Record<number, any[]>>({});
  // 街道选项状态
  const [streetsForDistrict, setStreetsForDistrict] = useState<Record<number, any[]>>({});
  
  // 详细地址是否可编辑状态
  const [isLoadingPointDetailDisabled, setIsLoadingPointDetailDisabled] = useState(false);

  // 集装箱类型接口
  interface ContainerItem {
    id: number;
    type: string;
    count: number;
  }

  // 集装箱列表状态
  const [containerList, setContainerList] = useState<ContainerItem[]>([
    { id: 1, type: '20GP', count: 1 }
  ]);

  // 已选择的箱型列表，用于禁用重复选择
  const selectedContainerTypes = useMemo(() => {
    return containerList.map(item => item.type);
  }, [containerList]);

  // 添加新的箱型
  const addContainerItem = () => {
    // 如果已经有5个箱型，则不允许再添加
    if (containerList.length >= 5) {
      Message.warning('最多只能添加5个箱型');
      return;
    }
    
    const newId = containerList.length > 0 ? Math.max(...containerList.map(item => item.id)) + 1 : 1;
    // 找到第一个未被选择的箱型
    const boxTypes = ['20GP', '40GP', '40HC', '45HC', '20NOR', '40NOR'];
    const availableBoxType = boxTypes.find(type => !selectedContainerTypes.includes(type)) || '20GP';
    setContainerList([...containerList, { id: newId, type: availableBoxType, count: 1 }]);
  };

  // 更新箱型信息
  const updateContainerItem = (id: number, field: 'type' | 'count', value: string | number) => {
    setContainerList(
      containerList.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // 移除箱型
  const removeContainerItem = (id: number) => {
    if (containerList.length > 1) {
      setContainerList(containerList.filter(item => item.id !== id));
    } else {
      Message.warning('至少需要保留一个箱型');
    }
  };

  // 表格选择状态
  const [selectedMainlineRate, setSelectedMainlineRate] = useState<string>('');
  const [selectedPrecarriageRate, setSelectedPrecarriageRate] = useState<string>('');
  const [selectedOncarriageRates, setSelectedOncarriageRates] = useState<string[]>([]);
  
  // 负责人选择弹窗状态
  const [managerSelectVisible, setManagerSelectVisible] = useState(false);
  const [selectedLastMileManager, setSelectedLastMileManager] = useState<string>(''); // 尾程负责人
  const [selectedMainlineManager, setSelectedMainlineManager] = useState<string>(''); // 干线负责人
  
  // 运价详情弹窗状态
  const [rateDetailVisible, setRateDetailVisible] = useState(false);
  const [currentRateDetail, setCurrentRateDetail] = useState<string>('');
  const [currentRateType, setCurrentRateType] = useState<'mainline' | 'precarriage' | 'oncarriage'>('mainline');

  // AI识别相关状态
  const [loadingPointAiModalVisible, setLoadingPointAiModalVisible] = useState(false);
  const [loadingPointAddressText, setLoadingPointAddressText] = useState('');
  
  const [deliveryAiModalVisible, setDeliveryAiModalVisible] = useState(false);
  const [deliveryAddressText, setDeliveryAddressText] = useState('');

  // 更新保存表单状态
  const handleFormChange = (key: string, value: any) => {
    setFormState({
      ...formState,
      [key]: value
    });
  };

  // 处理复选框状态变化
  const handleCheckboxChange = (key: string, checked: boolean) => {
    setFormState(prev => ({
      ...prev,
      [key]: checked
    }));

    // 如果取消了港前价格勾选，则清空装箱门点相关数据
    if (key === 'precarriageChecked' && !checked) {
      // 重置装箱门点数据
      setAreaList([{
        key: 1,
        province: '',
        city: '',
        district: '',
        street: ''
      }]);
      
      // 清空装箱门点详细地址
      setFormState(prev => ({
        ...prev,
        [key]: checked,
        loadingPointDetail: ''
      }));
    }
    
    // 如果取消了尾程价格勾选，则清空送货地址相关数据
    if (key === 'lastmileChecked' && !checked) {
      setFormState(prev => ({
        ...prev,
        [key]: checked,
        addressType: '第三方地址',
        zipCode: '',
        address: '',
        warehouseCode: ''
      }));
    }
    
    // 更新服务条款默认值
    // 当只选了干线价格时，默认为CIF
    // 当选了港前或尾程时，默认为DDP
    const newCheckedState = {
      ...formState,
      [key]: checked
    };
    
    // 如果当前是自定义，不改变
    if (formState.serviceTerms === '自定义') {
      return;
    }
    
    if (key.includes('Checked')) {
      if (newCheckedState.precarriageChecked || newCheckedState.lastmileChecked) {
        setFormState(prev => ({
          ...prev,
          [key]: checked,
          serviceTerms: 'DDP'
        }));
      } else if (newCheckedState.mainlineChecked && !newCheckedState.precarriageChecked && !newCheckedState.lastmileChecked) {
        setFormState(prev => ({
          ...prev,
          [key]: checked,
          serviceTerms: 'CIF'
        }));
      }
    }
  };

  // 处理表单提交

  // 保存草稿
  const handleSaveDraft = () => {
    // 收集表单数据（不进行表单验证）
    const formData = {
      ...formState,
      status: 'draft', // 标记为草稿状态
      selectedRates: {
        mainlineRate: selectedMainlineRate,
        precarriageRate: selectedPrecarriageRate,
        oncarriageRates: selectedOncarriageRates
      },
      containers: containerList,
      loadingPoints: formState.precarriageChecked ? areaList : [], // 保存装箱门点数据
      deliveryAddress: formState.lastmileChecked ? {
        addressType: formState.addressType,
        zipCode: formState.zipCode,
        address: formState.address,
        warehouseCode: formState.warehouseCode
      } : null // 保存尾程送货地址数据
    };
    
    console.log('保存草稿数据:', formData);
    Message.success('草稿保存成功');
    navigate('/inquiry-management');
  };

  // 显示负责人选择弹窗

  // 确认选择负责人并提交
  const confirmManagerSelect = () => {
    // 验证每个表格至少选择了一个负责人
    if (!selectedLastMileManager && !selectedMainlineManager) {
      Message.error('请至少选择一位负责人');
      return;
    }

    // 整合所有状态
    const formData = {
      ...formState,
      status: 'submitted', // 标记为已提交状态
      selectedRates: {
        mainlineRate: selectedMainlineRate,
        precarriageRate: selectedPrecarriageRate,
        oncarriageRates: selectedOncarriageRates
      },
      selectedManagers: {
        lastMile: selectedLastMileManager,
        mainline: selectedMainlineManager
      },
      containers: containerList
    };
    
    console.log('提交表单数据:', formData);
    Message.success('询价单提交成功');
    setManagerSelectVisible(false);
    navigate('/inquiry-management');
  };

  // 返回询价管理页面
  const handleCancel = () => {
    navigate('/inquiry-management');
  };

  // 航线负责人表格数据
  const _routeManagersData = [
    {
      key: '1',
      route: '美加线',
      departurePort: 'CNSHA | Shanghai',
      destinationPort: 'USLAX | Los Angeles',
      manager: '王五'
    },
    {
      key: '2',
      route: '美加线',
      departurePort: 'CNSHA | Shanghai',
      destinationPort: 'USLAX | Los Angeles',
      manager: '李四'
    }
  ];

  // 干线运价负责人数据
  const _mainlineManagersData = [
    {
      key: '3',
      route: '美加线',
      departurePort: 'CNSHA | Shanghai',
      destinationPort: 'USLAX | Los Angeles',
      manager: '张三'
    },
    {
      key: '4',
      route: '美加线',
      departurePort: 'CNSHA | Shanghai',
      destinationPort: 'USLAX | Los Angeles',
      manager: '赵六'
    }
  ];

  // 航线负责人表格列定义

  // 打开运价详情弹窗
  const showRateDetail = (rateId: string, type: 'mainline' | 'precarriage' | 'oncarriage' = 'mainline') => {
    setCurrentRateDetail(rateId);
    setCurrentRateType(type);
    setRateDetailVisible(true);
  };

  // 关闭运价详情弹窗
  const closeRateDetail = () => {
    setRateDetailVisible(false);
  };

  // 运价表格数据接口
  interface RateData {
    certNo: string;
    departurePort: string;
    dischargePort: string;
    shipCompany: string;
    validPeriod: string; // 修改为有效期
    transitPort: string;
    transitType: string;
    '20GP': string;
    '40GP': string;
    '40HC': string;
    '45HC': string;
    '20NOR': string;
    '40NOR': string;
    etd: string;
    eta: string;
    transitTime: string;
    freeBox: string; // 免用箱天数
    freeStorage: string; // 免堆存天数
  }
  
  // 港前运价表格数据接口
  interface PrecarriageRateData {
    id: string;
    certNo: string; // 运价编号
    type: string;
    origin: string;
    destination: string;
    vendor: string;
    currency: string;
    '20GP': string;
    '40GP': string;
    '40HC': string;
    validDate: string;
  }
  
  // 尾程运价表格数据接口
  interface OncarriageRateData {
    id: string;
    certNo: string; // 运价编号
    origin: string; // 目的港
    addressType: '第三方地址' | '亚马逊仓库' | '易仓'; // 配送地址类型
    zipCode: string; // 邮编
    address: string; // 地址
    warehouseCode: string | null; // 仓库代码
    agentName: string; // 代理名称
    validDateRange: string; // 有效期区间
    remark: string; // 备注
    status: '正常' | '过期' | '下架'; // 状态，保留字段但不显示在表格中
  }
  
  // 运价表格数据
  const rateTableData: RateData[] = [
    {
      certNo: 'M001',
      departurePort: 'CNSHA | Shanghai',
      dischargePort: 'USLAX | Los Angeles',
      shipCompany: '地中海',
      validPeriod: '2024-06-01 ~ 2024-07-01',
      transitPort: '-',
      transitType: '直达',
      '20GP': '1500.00',
      '40GP': '2800.00',
      '40HC': '2900.00',
      '45HC': '3100.00',
      '20NOR': '1400.00',
      '40NOR': '2700.00',
      etd: '2024-07-10',
      eta: '2024-07-24',
      transitTime: '14天',
      freeBox: '14天',
      freeStorage: '7天',
    },
    {
      certNo: 'M002',
      departurePort: 'CNSHA | Shanghai',
      dischargePort: 'USLAX | Los Angeles',
      shipCompany: '马士基',
      validPeriod: '2024-07-01 ~ 2024-08-01',
      transitPort: 'KRPUS | Busan',
      transitType: '中转',
      '20GP': '1450.00',
      '40GP': '2750.00',
      '40HC': '2850.00',
      '45HC': '3050.00',
      '20NOR': '1350.00',
      '40NOR': '2650.00',
      etd: '2024-08-08',
      eta: '2024-08-24',
      transitTime: '16天',
      freeBox: '21天',
      freeStorage: '10天',
    },
    {
      certNo: 'M003',
      departurePort: 'CNSHA | Shanghai',
      dischargePort: 'USLAX | Los Angeles',
      shipCompany: '长荣',
      validPeriod: '2024-06-15 ~ 2024-07-15',
      transitPort: '-',
      transitType: '直达',
      '20GP': '1550.00',
      '40GP': '2880.00',
      '40HC': '2980.00',
      '45HC': '3180.00',
      '20NOR': '1480.00',
      '40NOR': '2780.00',
      etd: '2024-07-16',
      eta: '2024-07-29',
      transitTime: '13天',
      freeBox: '14天',
      freeStorage: '7天',
    },
  ];

  // 港前运价表格数据
  const precarriageRateData: PrecarriageRateData[] = [
    {
      id: '1',
      certNo: 'P001',
      type: '直达',
      origin: '苏州工业园区',
      destination: '洋山港',
      vendor: '德邦专线',
      currency: 'CNY',
      '20GP': '800.00',
      '40GP': '1200.00',
      '40HC': '1300.00',
      validDate: '2024-12-31',
    },
    {
      id: '2',
      certNo: 'P002',
      type: '支线',
      origin: '太仓港',
      destination: '洋山港',
      vendor: '速航65号',
      currency: 'CNY',
      '20GP': '400.00',
      '40GP': '700.00',
      '40HC': '750.00',
      validDate: '2024-11-30',
    }
  ];

  // 尾程运价表格数据
  const oncarriageRateData: OncarriageRateData[] = [
    {
      id: '1',
      certNo: 'O001',
      origin: 'USLAX | LOS ANGELES',
      addressType: '第三方地址',
      zipCode: '92101',
      address: 'San Diego, CA',
      warehouseCode: null,
      agentName: 'XPO TRUCK LLC',
      validDateRange: '2024-05-01 至 2024-12-31',
      remark: '',
      status: '正常'
    },
    {
      id: '2',
      certNo: 'O002',
      origin: 'USNYC | NEW YORK',
      addressType: '亚马逊仓库',
      zipCode: '',
      address: '',
      warehouseCode: 'ONT8',
      agentName: 'DRAYEASY INC',
      validDateRange: '2024-05-15 至 2024-11-30',
      remark: '',
      status: '正常'
    },
    {
      id: '3',
      certNo: 'O003',
      origin: 'DEHAM | HAMBURG',
      addressType: '易仓',
      zipCode: '',
      address: '',
      warehouseCode: 'LAX203',
      agentName: 'AMERICAN FREIGHT SOLUTIONS',
      validDateRange: '2024-04-01 至 2024-12-15',
      remark: '需提前24小时预约',
      status: '正常'
    },
    {
      id: '4',
      certNo: 'O004',
      origin: 'NLRTM | ROTTERDAM',
      addressType: '第三方地址',
      zipCode: '96001',
      address: 'Redding, CA',
      warehouseCode: null,
      agentName: 'WEST COAST CARRIERS LLC',
      validDateRange: '2024-03-01 至 2024-05-31',
      remark: '',
      status: '过期'
    }
  ];

  // 费用明细数据接口
  interface FeeDetail {
    key: string;
    name: string;
    price: string;
    currency: string;
    unit: string;
    remark: string;
    type: 'basic' | 'origin' | 'destination'; // 费用类型：基础运费、起运港附加费、目的港附加费
  }

  // 获取运价详情数据
  const getRateDetail = (rateId: string, type: 'mainline' | 'precarriage' | 'oncarriage' = 'mainline'): { basic: FeeDetail[], origin: FeeDetail[], destination: FeeDetail[] } => {
    // 根据不同的运价类型返回不同的数据
    if (type === 'precarriage') {
      // 港前运价详情
      switch(rateId) {
        case 'P001':
          return {
            basic: [
              { key: '1', name: '拖车费', price: '800.00', currency: 'CNY', unit: '20GP', remark: '', type: 'basic' },
              { key: '2', name: '拖车费', price: '1200.00', currency: 'CNY', unit: '40GP', remark: '', type: 'basic' },
              { key: '3', name: '拖车费', price: '1300.00', currency: 'CNY', unit: '40HC', remark: '', type: 'basic' }
            ],
            origin: [
              { key: '4', name: '装柜费', price: '200.00', currency: 'CNY', unit: '箱', remark: '', type: 'origin' },
              { key: '5', name: '单证费', price: '100.00', currency: 'CNY', unit: '票', remark: '', type: 'origin' }
            ],
            destination: []
          };
        case 'P002':
          return {
            basic: [
              { key: '1', name: '驳船费', price: '400.00', currency: 'CNY', unit: '20GP', remark: '', type: 'basic' },
              { key: '2', name: '驳船费', price: '700.00', currency: 'CNY', unit: '40GP', remark: '', type: 'basic' },
              { key: '3', name: '驳船费', price: '750.00', currency: 'CNY', unit: '40HC', remark: '', type: 'basic' }
            ],
            origin: [
              { key: '4', name: '出港费', price: '150.00', currency: 'CNY', unit: '箱', remark: '', type: 'origin' },
              { key: '5', name: '单证费', price: '80.00', currency: 'CNY', unit: '票', remark: '', type: 'origin' }
            ],
            destination: []
          };
        default:
          return {
            basic: [],
            origin: [],
            destination: []
          };
      }
    } else if (type === 'oncarriage') {
      // 尾程运价详情
      switch(rateId) {
        case 'O001':
          return {
            basic: [
              { key: '1', name: 'ISF CHARGE', price: '50.00', currency: 'USD', unit: 'B/L', remark: '', type: 'basic' }
            ],
            origin: [],
            destination: []
          };
        case 'O002':
          return {
            basic: [
              { key: '1', name: '清关费', price: '100.00', currency: 'USD', unit: 'B/L', remark: '', type: 'basic' }
            ],
            origin: [],
            destination: []
          };
        case 'O003':
          return {
            basic: [
              { key: '1', name: '文件费', price: '100.00', currency: 'USD', unit: 'B/L', remark: '', type: 'basic' }
            ],
            origin: [],
            destination: []
          };
        case 'O004':
          return {
            basic: [
              { key: '1', name: 'BOND', price: '100.00', currency: 'USD', unit: 'B/L', remark: '', type: 'basic' }
            ],
            origin: [],
            destination: []
          };
        case 'O005':
          return {
            basic: [
              { key: '1', name: '品检费', price: '2300.00', currency: 'USD', unit: '40HQ', remark: '', type: 'basic' }
            ],
            origin: [],
            destination: []
          };
        default:
          return {
            basic: [],
            origin: [],
            destination: []
          };
      }
    } else {
      // 干线运价详情 (原有逻辑)
      switch(rateId) {
        case 'M001':
          return {
            basic: [
              { key: '1', name: '海运费', price: '1500.00', currency: 'USD', unit: '20GP', remark: '', type: 'basic' },
              { key: '2', name: '海运费', price: '2800.00', currency: 'USD', unit: '40GP', remark: '', type: 'basic' },
              { key: '3', name: '海运费', price: '2900.00', currency: 'USD', unit: '40HC', remark: '', type: 'basic' },
            ],
            origin: [
              { key: '4', name: '文件费', price: '500.00', currency: 'CNY', unit: '票', remark: '', type: 'origin' },
              { key: '5', name: '电放费', price: '300.00', currency: 'CNY', unit: '票', remark: '', type: 'origin' },
              { key: '6', name: '港杂费', price: '1200.00', currency: 'CNY', unit: '20GP', remark: '', type: 'origin' },
              { key: '7', name: '港杂费', price: '1800.00', currency: 'CNY', unit: '40GP', remark: '', type: 'origin' },
              { key: '8', name: '港杂费', price: '1800.00', currency: 'CNY', unit: '40HC', remark: '', type: 'origin' },
            ],
            destination: [
              { key: '9', name: 'PSS', price: '200.00', currency: 'USD', unit: '箱', remark: '', type: 'destination' },
              { key: '10', name: '码头操作费', price: '150.00', currency: 'USD', unit: '箱', remark: '', type: 'destination' },
              { key: '11', name: '燃油附加费', price: '350.00', currency: 'USD', unit: '20GP', remark: '', type: 'destination' },
              { key: '12', name: '燃油附加费', price: '700.00', currency: 'USD', unit: '40GP', remark: '', type: 'destination' },
              { key: '13', name: '燃油附加费', price: '700.00', currency: 'USD', unit: '40HC', remark: '', type: 'destination' },
            ]
          };
        // ... 其他案例 (保持原有逻辑)
        default:
          return {
            basic: [],
            origin: [],
            destination: []
          };
      }
    }
  };

  // 检查区域选择是否重复
  const isAreaDuplicate = (currentKey: number, province: string, city: string, district: string, street: string): boolean => {
    if (!province || !city || !district) return false;
    
    return areaList.some(area => 
      area.key !== currentKey && 
      area.province === province && 
      area.city === city && 
      area.district === district && 
      ((street && area.street === street) || (!street && !area.street))
    );
  };
  
  // 获取已选择的街道列表（用于禁用已选择的街道）

  // 更新区域字段
  const updateAreaField = (key: number, field: string, value: string) => {
    const newAreaList = areaList.map(area => {
      if (area.key === key) {
        const updatedArea = { ...area, [field]: value };
        
        // 当选择省份时，重置下级选项
        if (field === 'province') {
          updatedArea.city = '';
          updatedArea.district = '';
          updatedArea.street = '';
          
          // 更新城市选项
          if (value && cityOptions[value]) {
            setCitiesForProvince(prev => ({ ...prev, [key]: cityOptions[value] }));
          }
        }
        
        // 当选择城市时，重置下级选项
        if (field === 'city') {
          updatedArea.district = '';
          updatedArea.street = '';
          
          // 更新区县选项
          if (value && districtOptions[value]) {
            setDistrictsForCity(prev => ({ ...prev, [key]: districtOptions[value] }));
          }
        }
        
        // 当选择区县时，重置街道
        if (field === 'district') {
          updatedArea.street = '';
          
          // 更新街道选项
          if (value && streetOptions[value]) {
            setStreetsForDistrict(prev => ({ ...prev, [key]: streetOptions[value] }));
          }
        }
        
        // 检查是否重复选择
        if (isAreaDuplicate(
          key, 
          field === 'province' ? value : updatedArea.province,
          field === 'city' ? value : updatedArea.city,
          field === 'district' ? value : updatedArea.district,
          field === 'street' ? value : updatedArea.street
        )) {
          Message.warning('不能选择重复的区域');
          return area; // 保持原值不变
        }
        
        return updatedArea;
      }
      return area;
    });
    
    setAreaList(newAreaList);
    
    // 检查详细地址输入框状态
    checkLoadingPointDetailStatus(newAreaList);
  };

  // 检查详细地址输入框状态
  const checkLoadingPointDetailStatus = (areas: AreaItem[]) => {
    // 计算有多少个街道被选择了
    const streetSelectedCount = areas.filter(area => area.street).length;
    
    // 如果选择了2个或以上的街道，则禁用详细地址
    const shouldDisable = streetSelectedCount >= 2;
    
    if (shouldDisable) {
      // 如果之前是启用状态，现在要禁用，清空详细地址
      if (!isLoadingPointDetailDisabled) {
        setFormState(prev => ({
          ...prev,
          loadingPointDetail: ''
        }));
      }
    }
    
    setIsLoadingPointDetailDisabled(shouldDisable);
  };

  // 初始化组件时设置第一个区域的城市选项
  useEffect(() => {
    if (areaList[0].province && cityOptions[areaList[0].province]) {
      setCitiesForProvince({ 1: cityOptions[areaList[0].province] });
    }
  }, []);

  // 处理邮编变化自动带出地址
  const handleZipCodeChange = (zipCode: string) => {
    // 更新邮编
    setFormState(prev => ({
      ...prev,
      zipCode
    }));

    // 如果邮编存在于映射中，自动填充地址
    if (zipCode && zipCodeAddressMap[zipCode]) {
      setFormState(prev => ({
        ...prev,
        zipCode,
        address: zipCodeAddressMap[zipCode]
      }));
      Message.success(`已自动填充地址: ${zipCodeAddressMap[zipCode]}`);
    }
  };

  // 打开装箱门点AI识别弹窗
  const openLoadingPointAiModal = () => {
    setLoadingPointAiModalVisible(true);
  };

  // 关闭装箱门点AI识别弹窗
  const closeLoadingPointAiModal = () => {
    setLoadingPointAiModalVisible(false);
  };

  // 打开尾程送货地址AI识别弹窗
  const openDeliveryAiModal = () => {
    setDeliveryAiModalVisible(true);
  };

  // 关闭尾程送货地址AI识别弹窗
  const closeDeliveryAiModal = () => {
    setDeliveryAiModalVisible(false);
  };

  // 处理装箱门点AI识别
  const handleLoadingPointAiRecognize = () => {
    // 模拟识别过程
    setTimeout(() => {
      if (loadingPointAddressText) {
        let recognizedArea: AreaItem = {
          key: 1,
          province: '',
          city: '',
          district: '',
          street: ''
        };
        
        // 解析地址文本
        if (loadingPointAddressText.includes('浙江')) {
          recognizedArea.province = '浙江省';
          
          if (loadingPointAddressText.includes('杭州')) {
            recognizedArea.city = '杭州市';
            
            if (loadingPointAddressText.includes('萧山')) {
              recognizedArea.district = '萧山区';
              
              if (loadingPointAddressText.includes('新塘')) {
                recognizedArea.street = '新塘街道';
              }
            } else if (loadingPointAddressText.includes('西湖')) {
              recognizedArea.district = '西湖区';
              
              if (loadingPointAddressText.includes('灵隐')) {
                recognizedArea.street = '灵隐街道';
              }
            }
          }
        } else if (loadingPointAddressText.includes('江苏')) {
          recognizedArea.province = '江苏省';
          
          if (loadingPointAddressText.includes('苏州')) {
            recognizedArea.city = '苏州市';
            
            if (loadingPointAddressText.includes('园区') || loadingPointAddressText.includes('工业园')) {
              recognizedArea.district = '工业园区';
              
              if (loadingPointAddressText.includes('娄葑')) {
                recognizedArea.street = '娄葑街道';
              }
            }
          }
        }
        
        // 如果识别成功
        if (recognizedArea.province) {
          // 更新区域
          setAreaList([recognizedArea]);
          
          // 更新城市选项
          if (recognizedArea.province && cityOptions[recognizedArea.province]) {
            setCitiesForProvince({ 1: cityOptions[recognizedArea.province] });
          }
          
          // 更新区县选项
          if (recognizedArea.city && districtOptions[recognizedArea.city]) {
            setDistrictsForCity({ 1: districtOptions[recognizedArea.city] });
          }
          
          // 更新街道选项
          if (recognizedArea.district && streetOptions[recognizedArea.district]) {
            setStreetsForDistrict({ 1: streetOptions[recognizedArea.district] });
          }
          
          // 更新详细地址
          setFormState(prev => ({
            ...prev,
            loadingPointDetail: loadingPointAddressText.replace(/浙江省|江苏省|杭州市|苏州市|萧山区|西湖区|工业园区|新塘街道|灵隐街道|娄葑街道/g, '').trim()
          }));
          
          Message.success('地址识别成功');
        } else {
          Message.error('无法识别地址信息，请手动选择');
        }
      }
      closeLoadingPointAiModal();
    }, 1000);
  };

  // 处理尾程送货地址AI识别
  const handleDeliveryAiRecognize = () => {
    // 模拟识别过程
    setTimeout(() => {
      if (deliveryAddressText) {
        // 模拟美国地址识别
        let zipCode = '';
        let address = '';
        let isWarehouse = false;
        let warehouseType = '';
        let warehouseCode = '';
        
        // 检查是否包含仓库代码
        if (deliveryAddressText.includes('ONT8') || deliveryAddressText.includes('BFI4')) {
          isWarehouse = true;
          warehouseType = '亚马逊仓库';
          warehouseCode = deliveryAddressText.includes('ONT8') ? 'ONT8' : 'BFI4';
        } else if (deliveryAddressText.includes('LAX203') || deliveryAddressText.includes('ATL205')) {
          isWarehouse = true;
          warehouseType = '易仓';
          warehouseCode = deliveryAddressText.includes('LAX203') ? 'LAX203' : 'ATL205';
        }
        
        // 如果是仓库类型，只设置仓库相关信息
        if (isWarehouse) {
          setFormState(prev => ({
            ...prev,
            addressType: warehouseType,
            warehouseCode: warehouseCode,
            // 清空不需要的字段
            zipCode: '',
            address: ''
          }));
          
          Message.success(`已识别为${warehouseType}，代码：${warehouseCode}`);
        } else {
          // 尝试提取邮编（美国标准5位数字邮编）
          const zipMatch = deliveryAddressText.match(/\b\d{5}\b/);
          if (zipMatch) {
            zipCode = zipMatch[0];
          }
          
          // 从文本中提取地址信息
          if (deliveryAddressText.includes('CA')) {
            // 识别加利福尼亚州的地址
            if (deliveryAddressText.includes('San Diego')) {
              address = 'San Diego, CA';
            } else if (deliveryAddressText.includes('Los Angeles')) {
              address = 'Los Angeles, CA';
            } else if (deliveryAddressText.includes('Ontario')) {
              address = 'Ontario, CA';
            } else {
              address = deliveryAddressText.replace(/\d{5}/, '').trim();
            }
          } else if (deliveryAddressText.includes('NY')) {
            address = 'New York, NY';
          } else {
            address = deliveryAddressText.replace(/\d{5}/, '').trim();
          }
          
          // 如果找到了地址和邮编
          if (address) {
            setFormState(prev => ({
              ...prev,
              addressType: '第三方地址',
              address: address,
              zipCode: zipCode || '',
              // 清空仓库代码
              warehouseCode: ''
            }));
            
            Message.success('已识别地址信息');
          } else {
            Message.info('无法识别地址，请手动输入');
          }
        }
      }
      closeDeliveryAiModal();
    }, 1000);
  };

  return (
    <SaasLayout 
      menuSelectedKey="9" 
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>询价报价</Breadcrumb.Item>
          <Breadcrumb.Item>询价管理</Breadcrumb.Item>
          <Breadcrumb.Item>新建整箱询价</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Form form={form} layout="vertical" initialValues={formState}>
        <Card className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <Checkbox 
                checked={formState.precarriageChecked} 
                onChange={(checked) => handleCheckboxChange('precarriageChecked', checked)}
                style={{ marginRight: 16 }}
              >
                港前价格
              </Checkbox>
              <Checkbox 
                checked={formState.mainlineChecked}
                onChange={(checked) => handleCheckboxChange('mainlineChecked', checked)}
                style={{ marginRight: 16 }}
              >
                干线价格
              </Checkbox>
              <Checkbox 
                checked={formState.lastmileChecked}
                onChange={(checked) => handleCheckboxChange('lastmileChecked', checked)}
              >
                尾程价格
              </Checkbox>
            </div>
            <Space>
              <Button icon={<IconSave />} onClick={handleSaveDraft}>保存草稿</Button>
              <Button type="primary" icon={<IconUpload />} onClick={() => setManagerSelectVisible(true)}>直接提交</Button>
              <Button icon={<IconDelete />} onClick={handleCancel}>取消</Button>
            </Space>
          </div>
          
          <Row gutter={[16, 16]}>
            {/* 左侧区域：基本信息 */}
            <Col span={12}>
              <div className="border rounded p-4 mb-4">
                <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2 mb-4">基本信息</div>
                
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <FormItem label="询价编号" field="inquiryNo">
                      <Input placeholder="R43597505" value={formState.inquiryNo} disabled />
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="询价人" field="inquirer">
                      <Input 
                        placeholder="自动生成" 
                        value={formState.inquirer}
                        onChange={(value) => handleFormChange('inquirer', value)}
                        disabled
                      />
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="货盘性质" field="cargoNature">
                      <Select 
                        placeholder="请选择" 
                        style={{ width: '100%' }}
                        value={formState.cargoNature}
                        onChange={(value) => handleFormChange('cargoNature', value)}
                      >
                        <Option value="询价">询价</Option>
                        <Option value="实单">实单</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="货好时间" field="cargoReadyTime">
                      <div className="flex items-center">
                        <div className="mr-3 flex items-center">
                          <Radio.Group
                            type="button"
                            name="cargoReadyTimeType"
                            value={formState.cargoReadyTimeType}
                            onChange={(value) => handleFormChange('cargoReadyTimeType', value)}
                          >
                            <Radio value="区间">区间</Radio>
                            <Radio value="日期">日期</Radio>
                          </Radio.Group>
                        </div>
                        <div className="flex-1">
                          {formState.cargoReadyTimeType === '区间' ? (
                            <Select 
                              placeholder="请选择" 
                              style={{ width: '100%' }}
                              value={formState.cargoReadyTime}
                              onChange={(value) => handleFormChange('cargoReadyTime', value)}
                            >
                              <Option value="一周内">一周内</Option>
                              <Option value="二周内">二周内</Option>
                              <Option value="一个月内">一个月内</Option>
                              <Option value="一月以上">一月以上</Option>
                              <Option value="时间未知">时间未知</Option>
                            </Select>
                          ) : (
                            <DatePicker 
                              style={{ width: '100%' }}
                              value={formState.cargoReadyDate ? formState.cargoReadyDate : undefined}
                              onChange={(dateString) => handleFormChange('cargoReadyDate', dateString)}
                              placeholder="请选择货好日期"
                            />
                          )}
                        </div>
                      </div>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="货盘质量" field="cargoQuality">
                      <Select 
                        placeholder="请选择" 
                        style={{ width: '100%' }}
                        value={formState.cargoQuality}
                        onChange={(value) => handleFormChange('cargoQuality', value)}
                      >
                        <Option value="实单">实单</Option>
                        <Option value="询价">询价</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="服务条款" field="serviceTerms">
                      <div className="flex items-center">
                        <Select 
                          placeholder="请选择" 
                          style={{ width: formState.serviceTerms === '自定义' ? 'calc(50% - 8px)' : '100%' }}
                          value={formState.serviceTerms}
                          onChange={(value) => {
                            if (value === '自定义') {
                              handleFormChange('serviceTerms', value);
                            } else {
                              // 清空自定义内容
                              setFormState(prev => ({
                                ...prev,
                                serviceTerms: value,
                                customServiceTerms: ''
                              }));
                            }
                          }}
                        >
                          <Option value="CIF">CIF</Option>
                          <Option value="FOB">FOB</Option>
                          <Option value="DDP">DDP</Option>
                          <Option value="DDU">DDU</Option>
                          <Option value="EXW">EXW</Option>
                          <Option value="DAP">DAP</Option>
                          <Option value="FBA">FBA</Option>
                          <Option value="自定义">自定义</Option>
                        </Select>
                        
                        {formState.serviceTerms === '自定义' && (
                          <Input 
                            placeholder="请输入自定义服务条款" 
                            value={formState.customServiceTerms}
                            onChange={(value) => handleFormChange('customServiceTerms', value)}
                            style={{ width: 'calc(50% - 8px)', marginLeft: 16 }}
                          />
                        )}
                      </div>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="委托单位" field="clientType">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <Select 
                            placeholder="请选择委托单位" 
                            style={{ width: '100%' }}
                            value={formState.clientType}
                            onChange={(value) => handleFormChange('clientType', value)}
                          >
                            <Option value="不指定">不指定</Option>
                            <Option value="正式客户">正式客户</Option>
                            <Option value="临时客户">临时客户</Option>
                          </Select>
                        </div>

                        {formState.clientType === '正式客户' && (
                          <div className="ml-3" style={{ width: '50%' }}>
                            <Select 
                              placeholder="选择客户抬头" 
                              style={{ width: '100%' }}
                              value={formState.clientCompany}
                              onChange={(value) => handleFormChange('clientCompany', value)}
                            >
                              <Option value="阿里巴巴集团">阿里巴巴集团</Option>
                              <Option value="京东物流有限公司">京东物流有限公司</Option>
                              <Option value="华为技术有限公司">华为技术有限公司</Option>
                              <Option value="小米科技有限公司">小米科技有限公司</Option>
                              <Option value="海尔集团公司">海尔集团公司</Option>
                              <Option value="宝钢集团有限公司">宝钢集团有限公司</Option>
                              <Option value="招商局集团">招商局集团</Option>
                              <Option value="中远海运集团">中远海运集团</Option>
                            </Select>
                          </div>
                        )}

                        {formState.clientType === '临时客户' && (
                          <div className="ml-3" style={{ width: '50%' }}>
                            <Input 
                              placeholder="请输入客户抬头" 
                              value={formState.clientName}
                              onChange={(value) => handleFormChange('clientName', value)}
                            />
                          </div>
                        )}
                      </div>
                    </FormItem>
                  </Col>
                  
                  {/* 装箱门点区域，仅在勾选港前报价时显示 */}
                  {formState.precarriageChecked && (
                    <Col span={24}>
                      <div className="mb-4">
                        <div className="text-gray-800 font-medium mb-2">装箱门点</div>
                        <div className="flex items-center justify-between mb-2">
                          <FormItem label="" style={{ width: '100%', marginBottom: 0 }}>
                            <div className="flex items-center w-full">
                              <div className="text-xs text-gray-500 mr-auto">选择装箱门点区域</div>
                              <Button 
                                type="primary" 
                                icon={<IconRobot />} 
                                onClick={openLoadingPointAiModal}
                              >
                                AI识别
                              </Button>
                            </div>
                          </FormItem>
                        </div>
                        
                        {areaList.map((area, _index) => (
                          <div key={area.key} className="mb-3 border-b border-gray-200 pb-2">
                            <Row gutter={[8, 0]}>
                              <Col span={6}>
                                <FormItem label="" required style={{ marginBottom: 0 }}>
                                  <Select 
                                    placeholder="省份"
                                    options={provinceOptions}
                                    value={area.province}
                                    onChange={(value) => updateAreaField(area.key, 'province', value)}
                                    style={{ width: '100%' }}
                                    size="default"
                                    allowClear
                                  />
                                </FormItem>
                              </Col>
                              <Col span={6}>
                                <FormItem label="" required style={{ marginBottom: 0 }}>
                                  <Select 
                                    placeholder="城市"
                                    options={citiesForProvince[_index] || []}
                                    value={area.city}
                                    onChange={(value) => updateAreaField(area.key, 'city', value)}
                                    style={{ width: '100%' }}
                                    size="default"
                                    disabled={!area.province}
                                    allowClear
                                  />
                                </FormItem>
                              </Col>
                              <Col span={6}>
                                <FormItem label="" required style={{ marginBottom: 0 }}>
                                  <Select 
                                    placeholder="区/县"
                                    options={districtsForCity[_index] || []}
                                    value={area.district}
                                    onChange={(value) => updateAreaField(area.key, 'district', value)}
                                    style={{ width: '100%' }}
                                    size="default"
                                    disabled={!area.city}
                                    allowClear
                                  />
                                </FormItem>
                              </Col>
                              <Col span={6}>
                                <FormItem label="" style={{ marginBottom: 0 }}>
                                  <Select 
                                    placeholder="街道/村镇"
                                    options={streetsForDistrict[_index] ? streetsForDistrict[_index] : []}
                                    value={area.street}
                                    onChange={(value) => updateAreaField(area.key, 'street', value)}
                                    style={{ width: '100%' }}
                                    size="default"
                                    disabled={!area.district}
                                    allowClear
                                  />
                                </FormItem>
                              </Col>
                            </Row>
                          </div>
                        ))}

                        <FormItem label="详细地址" field="loadingPointDetail">
                          <Input.TextArea
                            placeholder="请输入详细地址"
                            value={formState.loadingPointDetail}
                            onChange={(value) => handleFormChange('loadingPointDetail', value)}
                            style={{ minHeight: '60px' }}
                            allowClear
                          />
                        </FormItem>
                      </div>
                    </Col>
                  )}
                  
                  {/* 尾程送货地址，仅在勾选尾程报价时显示 */}
                  {formState.lastmileChecked && (
                    <Col span={24}>
                      <div className="mb-4">
                        <div className="text-gray-800 font-medium mb-2">尾程送货地址</div>
                        <div className="flex items-center justify-between mb-2">
                          <FormItem label="" style={{ width: '100%', marginBottom: 0 }}>
                            <div className="flex items-center w-full">
                              <div className="text-xs text-gray-500 mr-auto">配送地址信息</div>
                              <Button 
                                type="primary" 
                                icon={<IconRobot />} 
                                onClick={openDeliveryAiModal}
                              >
                                AI识别
                              </Button>
                            </div>
                          </FormItem>
                        </div>
                        
                        <FormItem label="配送地址类型" field="addressType" style={{ marginBottom: '12px' }}>
                          <RadioGroup 
                            value={formState.addressType}
                            onChange={(value) => handleFormChange('addressType', value)}
                          >
                            <Radio value="第三方地址">第三方地址</Radio>
                            <Radio value="亚马逊仓库">亚马逊仓库</Radio>
                            <Radio value="易仓">易仓</Radio>
                          </RadioGroup>
                        </FormItem>
                        
                        {formState.addressType === '第三方地址' && (
                          <>
                            <FormItem label="邮编" field="zipCode" style={{ marginBottom: '12px' }}>
                              <Input 
                                placeholder="请输入邮编" 
                                value={formState.zipCode}
                                onChange={(value) => handleZipCodeChange(value)}
                                allowClear
                              />
                            </FormItem>
                            
                            <FormItem label="地址" field="address" style={{ marginBottom: '12px' }}>
                              <Input 
                                placeholder="例如：San Diego, CA" 
                                value={formState.address}
                                onChange={(value) => handleFormChange('address', value)}
                                allowClear
                              />
                            </FormItem>
                          </>
                        )}
                        
                        {(formState.addressType === '亚马逊仓库' || formState.addressType === '易仓') && (
                          <FormItem 
                            label="仓库代码" 
                            field="warehouseCode"
                            style={{ marginBottom: '12px' }}
                          >
                            <Input 
                              placeholder={formState.addressType === '亚马逊仓库' ? "例如：ONT8" : "例如：LAX203"} 
                              value={formState.warehouseCode}
                              onChange={(value) => handleFormChange('warehouseCode', value)}
                              allowClear
                            />
                          </FormItem>
                        )}
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </Col>
            
            {/* 右侧区域：货物信息 */}
            <Col span={12}>
              <div className="border rounded p-4 mb-4">
                <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2 mb-4">货物信息</div>
                
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <FormItem label="直达/中转" field="transitType">
                      <RadioGroup 
                        value={formState.transitType}
                        onChange={(value) => handleFormChange('transitType', value)}
                      >
                        <Radio value="不指定">不指定</Radio>
                        <Radio value="直达">直达</Radio>
                        <Radio value="中转">中转</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="航线" field="route">
                      <Select
                        placeholder="请选择航线" 
                        value={formState.route}
                        onChange={(value) => handleFormChange('route', value)}
                        style={{ width: '100%' }}
                        showSearch
                      >
                        <Option value="跨太平洋东行">跨太平洋东行</Option>
                        <Option value="跨太平洋西行">跨太平洋西行</Option>
                        <Option value="远东西行">远东西行</Option>
                        <Option value="远东东行">远东东行</Option>
                        <Option value="欧地线">欧地线</Option>
                        <Option value="亚洲区域">亚洲区域</Option>
                        <Option value="中东印巴线">中东印巴线</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="起运港" field="departurePort">
                      <Select
                        placeholder="请选择起运港" 
                        value={formState.departurePort}
                        onChange={(value) => handleFormChange('departurePort', value)}
                        style={{ width: '100%' }}
                        showSearch
                      >
                        <Option value="CNSHA | Shanghai">CNSHA | Shanghai</Option>
                        <Option value="CNNGB | Ningbo">CNNGB | Ningbo</Option>
                        <Option value="CNQIN | Qingdao">CNQIN | Qingdao</Option>
                        <Option value="CNTXG | Tianjin">CNTXG | Tianjin</Option>
                        <Option value="CNCAN | Guangzhou">CNCAN | Guangzhou</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="卸货港" field="dischargePort">
                      <Select
                        placeholder="请选择卸货港" 
                        value={formState.dischargePort}
                        onChange={(value) => handleFormChange('dischargePort', value)}
                        style={{ width: '100%' }}
                        showSearch
                      >
                        <Option value="USLAX | Los Angeles">USLAX | Los Angeles</Option>
                        <Option value="USNYC | New York">USNYC | New York</Option>
                        <Option value="DEHAM | Hamburg">DEHAM | Hamburg</Option>
                        <Option value="NLRTM | Rotterdam">NLRTM | Rotterdam</Option>
                        <Option value="SGSIN | Singapore">SGSIN | Singapore</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  
                  {/* 中转港字段 - 仅在选择中转时显示 */}
                  {formState.transitType === '中转' && (
                    <Col span={24}>
                      <FormItem label="中转港" field="transitPort">
                        <Select
                          placeholder="请选择中转港" 
                          value={formState.transitPort}
                          onChange={(value) => handleFormChange('transitPort', value)}
                          style={{ width: '100%' }}
                          showSearch
                        >
                          <Option value="KRPUS | Busan">KRPUS | Busan</Option>
                          <Option value="SGSIN | Singapore">SGSIN | Singapore</Option>
                          <Option value="HKHKG | Hong Kong">HKHKG | Hong Kong</Option>
                          <Option value="TWKHH | Kaohsiung">TWKHH | Kaohsiung</Option>
                          <Option value="MYPKG | Port Klang">MYPKG | Port Klang</Option>
                        </Select>
                      </FormItem>
                    </Col>
                  )}
                  
                  <Col span={24}>
                    <FormItem label="货物类型" field="goodsType">
                      <Select 
                        placeholder="请选择" 
                        style={{ width: '100%' }}
                        value={formState.goodsType}
                        onChange={(value) => handleFormChange('goodsType', value)}
                      >
                        <Option value="普货">普货</Option>
                        <Option value="危险品">危险品</Option>
                        <Option value="冷冻货">冷冻货</Option>
                        <Option value="卷钢">卷钢</Option>
                        <Option value="化工品">化工品</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  
                  {formState.goodsType === '危险品' && (
                    <>
                      <Col span={24}>
                        <FormItem label="危险品等级" field="dangerLevel">
                          <Input
                            placeholder="请输入危险品等级"
                            value={formState.dangerLevel}
                            onChange={(value) => handleFormChange('dangerLevel', value)}
                          />
                        </FormItem>
                      </Col>
                      
                      <Col span={24}>
                        <FormItem label="UN No" field="unNo">
                          <Input
                            placeholder="请输入UN No"
                            value={formState.unNo}
                            onChange={(value) => handleFormChange('unNo', value)}
                          />
                        </FormItem>
                      </Col>
                    </>
                  )}
                  
                  {formState.goodsType === '冷冻货' && (
                    <>
                      <Col span={24}>
                        <FormItem label="温度" field="temperature">
                          <Input
                            placeholder="请输入温度"
                            value={formState.temperature}
                            onChange={(value) => handleFormChange('temperature', value)}
                            suffix="°C"
                          />
                        </FormItem>
                      </Col>
                      
                      <Col span={24}>
                        <FormItem label="通风量" field="humidity">
                          <Input
                            placeholder="请输入通风量"
                            value={formState.humidity}
                            onChange={(value) => handleFormChange('humidity', value)}
                            suffix="%"
                          />
                        </FormItem>
                      </Col>
                    </>
                  )}
                  
                  <Col span={24}>
                    <FormItem label="品名（HS Code）" field="hsCode">
                      <Input 
                        placeholder="请输入品名或HS Code" 
                        value={formState.hsCode}
                        onChange={(value) => handleFormChange('hsCode', value)}
                      />
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="重量" field="weight">
                      <Input 
                        placeholder="请输入重量" 
                        suffix="KGS"
                        value={formState.weight}
                        onChange={(value) => handleFormChange('weight', value)}
                      />
                    </FormItem>
                  </Col>
                  
                  {/* 移动船公司到货物信息区域 */}
                  <Col span={24}>
                    <FormItem label="船公司" field="shipCompany">
                      <Select 
                        placeholder="不指定" 
                        style={{ width: '100%' }}
                        value={formState.shipCompany}
                        onChange={(value) => handleFormChange('shipCompany', value)}
                        allowClear
                      >
                        <Option value="不指定">不指定</Option>
                        <Option value="MSC | 地中海">MSC | 地中海</Option>
                        <Option value="COSCO | 中远海运">COSCO | 中远海运</Option>
                        <Option value="MAERSK | 马士基">MAERSK | 马士基</Option>
                        <Option value="OOCL | 东方海外">OOCL | 东方海外</Option>
                        <Option value="CMA | 达飞轮船">CMA | 达飞轮船</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  
                  {/* 移动备注到货物信息区域 */}
                  <Col span={24}>
                    <FormItem label="备注" field="remark">
                      <Input.TextArea 
                        placeholder="请输入备注信息" 
                        value={formState.remark}
                        onChange={(value) => handleFormChange('remark', value)}
                        style={{ minHeight: '60px' }}
                      />
                    </FormItem>
                  </Col>
                </Row>
              </div>
              
              <div className="border rounded p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2">箱型箱量</div>
                  {containerList.length < 5 && (
                    <Button type="text" className="text-blue-600" icon={<IconPlus />} onClick={addContainerItem}>
                      添加箱型
                    </Button>
                  )}
                </div>
                
                {containerList.map((container, index) => (
                  <Row gutter={[16, 16]} key={container.id} className="mb-3">
                    <Col span={15}>
                      <FormItem label={index === 0 ? "箱型" : ""} rules={[{ required: true, message: '箱型必填' }]}>
                        <Select 
                          placeholder="请选择" 
                          style={{ width: '100%' }}
                          value={container.type}
                          onChange={(value) => updateContainerItem(container.id, 'type', value)}
                        >
                          {['20GP', '40GP', '40HC', '45HC', '20NOR', '40NOR'].map(boxType => (
                            <Option 
                              key={boxType} 
                              value={boxType} 
                              disabled={selectedContainerTypes.includes(boxType) && container.type !== boxType}
                            >
                              {boxType}
                            </Option>
                          ))}
                        </Select>
                      </FormItem>
                    </Col>
                    
                    <Col span={7}>
                      <FormItem label={index === 0 ? "数量" : ""} rules={[{ required: true, message: '箱量必填' }]}>
                        <Input 
                          type="number" 
                          placeholder="请输入数量" 
                          min={1} 
                          value={String(container.count)}
                          onChange={(value) => updateContainerItem(container.id, 'count', Number(value) || 1)}
                        />
                      </FormItem>
                    </Col>
                    
                    <Col span={2} className="flex items-center">
                      {index === 0 ? (
                        <div style={{ height: '32px' }}></div>
                      ) : (
                        <Button 
                          type="text" 
                          icon={<IconMinus />} 
                          onClick={() => removeContainerItem(container.id)}
                          className="text-red-500"
                        />
                      )}
                    </Col>
                  </Row>
                ))}
              </div>
            </Col>
          </Row>
          
          <Divider className="my-6" />
          
          {/* 底部区域：匹配报价 */}
          <div className="border rounded p-4">
            <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2 mb-4">匹配报价</div>
            
            <div className="bg-gray-100 p-4 rounded mb-4 rate-table-container">
              <div className="text-blue-600 font-bold mb-3 text-base rate-table-title">干线运价</div>
              <Table 
                rowKey="certNo"
                rowSelection={{
                  type: 'radio',
                  onChange: (selectedRowKeys) => {
                    setSelectedMainlineRate(selectedRowKeys[0] as string);
                  },
                  selectedRowKeys: selectedMainlineRate ? [selectedMainlineRate] : []
                }}
                columns={[
                  { title: '运价编号', dataIndex: 'certNo', width: 100 },
                  { 
                    title: '查看明细', 
                    dataIndex: 'view', 
                    width: 100, 
                    render: (_: any, record: { certNo: string }) => (
                      <span 
                        className="view-link" 
                        onClick={() => showRateDetail(record.certNo)}
                      >
                        查看
                      </span>
                    ) 
                  },
                  { title: '起运港', dataIndex: 'departurePort', width: 150 },
                  { title: '卸货港', dataIndex: 'dischargePort', width: 150 },
                  { title: '船公司', dataIndex: 'shipCompany', width: 120 },
                  { title: '有效期', dataIndex: 'validPeriod', width: 160 },
                  { title: '中转港', dataIndex: 'transitPort', width: 120 },
                  { title: '直达/中转', dataIndex: 'transitType', width: 100 },
                  { title: '20GP', dataIndex: '20GP', width: 90 },
                  { title: '40GP', dataIndex: '40GP', width: 90 },
                  { title: '40HC', dataIndex: '40HC', width: 90 },
                  { title: '45HC', dataIndex: '45HC', width: 90 },
                  { title: '20NOR', dataIndex: '20NOR', width: 90 },
                  { title: '40NOR', dataIndex: '40NOR', width: 90 },
                  { title: 'ETD', dataIndex: 'etd', width: 110 },
                  { title: 'ETA', dataIndex: 'eta', width: 110 },
                  { title: '航程', dataIndex: 'transitTime', width: 90 },
                  { title: '免用箱', dataIndex: 'freeBox', width: 90 },
                  { title: '免堆存', dataIndex: 'freeStorage', width: 90 },
                ]}
                data={rateTableData}
                scroll={{ x: 'max-content' }}
                pagination={false}
                border={true}
                className="mt-4 match-price-table"
                tableLayoutFixed={false}
              />
            </div>
            
            {/* 港前运价表格 */}
            <div className="bg-gray-100 p-4 rounded mb-4 rate-table-container">
              <div className="text-blue-600 font-bold mb-3 text-base rate-table-title">港前运价</div>
              <Table 
                rowKey="id"
                rowSelection={{
                  type: 'radio',
                  onChange: (selectedRowKeys) => {
                    setSelectedPrecarriageRate(selectedRowKeys[0] as string);
                  },
                  selectedRowKeys: selectedPrecarriageRate ? [selectedPrecarriageRate] : []
                }}
                columns={[
                  { title: '运价编号', dataIndex: 'certNo', width: 100 },
                  { 
                    title: '查看明细', 
                    dataIndex: 'view', 
                    width: 100, 
                    render: (_: any, record: { certNo: string }) => (
                      <span 
                        className="view-link" 
                        onClick={() => showRateDetail(record.certNo, 'precarriage')}
                      >
                        查看
                      </span>
                    ) 
                  },
                  { title: '类型', dataIndex: 'type', width: 100 },
                  { title: '起运地', dataIndex: 'origin', width: 150 },
                  { title: '目的地', dataIndex: 'destination', width: 150 },
                  { title: '供应商', dataIndex: 'vendor', width: 120 },
                  { title: '币种', dataIndex: 'currency', width: 80 },
                  { title: '20GP', dataIndex: '20GP', width: 100 },
                  { title: '40GP', dataIndex: '40GP', width: 100 },
                  { title: '40HC', dataIndex: '40HC', width: 100 },
                  { title: '有效期', dataIndex: 'validDate', width: 120 },
                ]}
                data={precarriageRateData}
                scroll={{ x: 1300 }}
                pagination={false}
                border={true}
                className="mt-2 match-price-table"
              />
            </div>
            
            {/* 尾程运价表格 */}
            <div className="bg-gray-100 p-4 rounded rate-table-container">
              <div className="text-blue-600 font-bold mb-3 text-base rate-table-title">尾程运价</div>
              <Table 
                rowKey="id"
                rowSelection={{
                  type: 'checkbox',
                  onChange: (selectedRowKeys) => {
                    setSelectedOncarriageRates(selectedRowKeys as string[]);
                  },
                  selectedRowKeys: selectedOncarriageRates
                }}
                columns={[
                  { title: '运价编号', dataIndex: 'certNo', width: 100 },
                  { 
                    title: '查看明细', 
                    dataIndex: 'view', 
                    width: 100, 
                    render: (_: any, record: { certNo: string }) => (
                      <span 
                        className="view-link" 
                        onClick={() => showRateDetail(record.certNo, 'oncarriage')}
                      >
                        查看
                      </span>
                    ) 
                  },
                  { title: '目的港', dataIndex: 'origin', width: 150 },
                  { title: '配送地址类型', dataIndex: 'addressType', width: 120 },
                  { 
                    title: '邮编', 
                    dataIndex: 'zipCode', 
                    width: 100,
                    render: (value: string, record: any) => {
                      if (record.addressType === '亚马逊仓库' || record.addressType === '易仓') {
                        return '-';
                      }
                      return value;
                    }
                  },
                  { 
                    title: '地址', 
                    dataIndex: 'address', 
                    width: 180,
                    render: (value: string, record: any) => {
                      if (record.addressType === '亚马逊仓库' || record.addressType === '易仓') {
                        return '-';
                      }
                      return value;
                    }
                  },
                  { 
                    title: '仓库代码', 
                    dataIndex: 'warehouseCode', 
                    width: 120,
                    render: (value: string | null) => value ? value : '-'
                  },
                  { title: '代理名称', dataIndex: 'agentName', width: 150 },
                  { title: '有效期', dataIndex: 'validDateRange', width: 180 },
                  { title: '备注', dataIndex: 'remark', width: 150 },
                ]}
                data={oncarriageRateData}
                scroll={{ x: 1300 }}
                pagination={false}
                border={true}
                className="mt-2 match-price-table"
              />
            </div>
          </div>
        </Card>
      </Form>

      {/* 航线负责人选择弹窗 */}
      <Modal
        title="选择询价负责人"
        visible={managerSelectVisible}
        onOk={confirmManagerSelect}
        onCancel={() => setManagerSelectVisible(false)}
        maskClosable={false}
        style={{ width: 700 }}
        footer={[
          <Button key="cancel" onClick={() => setManagerSelectVisible(false)}>
            取消
          </Button>,
          <Button key="confirm" type="primary" onClick={confirmManagerSelect}>
            确定
          </Button>
        ]}
      >
        <div>
          <div className="mb-4 pl-4 pt-2 text-gray-600">匹配到多个航线负责人信息，请选择需要发起询价的人员：</div>
          
          {/* 尾程运价负责人表格 */}
          <div className="mb-4">
            <div className="mb-2 pl-4 text-blue-600 font-medium border-l-2 border-blue-600">尾程运价负责人</div>
            <Table
              columns={[
                { title: '航线', dataIndex: 'route' },
                { title: '起运港', dataIndex: 'departurePort' },
                { title: '卸货港', dataIndex: 'destinationPort' },
                { title: '负责人', dataIndex: 'manager' },
                { 
                  title: '选择', 
                  render: (_, record) => (
                    <Radio
                      checked={selectedLastMileManager === record.key}
                      onChange={() => setSelectedLastMileManager(record.key)}
                    />
                  )
                }
              ]}
              data={_routeManagersData}
              pagination={false}
              border={true}
              rowKey="key"
            />
          </div>

          {/* 干线运价负责人表格 */}
          <div>
            <div className="mb-2 pl-4 text-blue-600 font-medium border-l-2 border-blue-600">干线运价负责人</div>
            <Table
              columns={[
                { title: '航线', dataIndex: 'route' },
                { title: '起运港', dataIndex: 'departurePort' },
                { title: '卸货港', dataIndex: 'destinationPort' },
                { title: '负责人', dataIndex: 'manager' },
                { 
                  title: '选择', 
                  render: (_, record) => (
                    <Radio
                      checked={selectedMainlineManager === record.key}
                      onChange={() => setSelectedMainlineManager(record.key)}
                    />
                  )
                }
              ]}
              data={_mainlineManagersData}
              pagination={false}
              border={true}
              rowKey="key"
            />
          </div>
        </div>
      </Modal>

      {/* 运价详情弹窗 */}
      <Modal
        title="运价详情"
        visible={rateDetailVisible}
        onOk={closeRateDetail}
        onCancel={closeRateDetail}
        maskClosable={false}
        style={{ width: 800 }}
      >
        <div className="p-4">
          {currentRateDetail && (
            <>
              {/* 基本信息 */}
              <div className="mb-6">
                <div className="text-blue-600 font-bold mb-3 border-l-4 border-blue-600 pl-2">基本信息</div>
                <div className="grid grid-cols-2 gap-4">
                  {currentRateType === 'mainline' && rateTableData.filter(item => item.certNo === currentRateDetail).map(rate => (
                    <React.Fragment key={rate.certNo}>
                      <div className="mb-2">
                        <span className="text-gray-500">运价编号：</span>
                        <span className="font-medium">{rate.certNo}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-500">船公司：</span>
                        <span className="font-medium">{rate.shipCompany}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-500">起运港：</span>
                        <span className="font-medium">{rate.departurePort}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-500">卸货港：</span>
                        <span className="font-medium">{rate.dischargePort}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-500">有效期：</span>
                        <span className="font-medium">{rate.validPeriod}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-500">直达/中转：</span>
                        <span className="font-medium">{rate.transitType}</span>
                      </div>
                    </React.Fragment>
                  ))}
                  
                  {currentRateType === 'precarriage' && precarriageRateData.filter(item => item.certNo === currentRateDetail).map(rate => (
                    <React.Fragment key={rate.certNo}>
                      <div className="mb-2">
                        <span className="text-gray-500">运价编号：</span>
                        <span className="font-medium">{rate.certNo}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-500">类型：</span>
                        <span className="font-medium">{rate.type}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-500">起运地：</span>
                        <span className="font-medium">{rate.origin}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-500">目的地：</span>
                        <span className="font-medium">{rate.destination}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-500">供应商：</span>
                        <span className="font-medium">{rate.vendor}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-500">有效期：</span>
                        <span className="font-medium">{rate.validDate}</span>
                      </div>
                    </React.Fragment>
                  ))}
                  
                  {currentRateType === 'oncarriage' && oncarriageRateData.filter(item => item.certNo === currentRateDetail).map(rate => (
                    <React.Fragment key={rate.certNo}>
                      <div className="mb-2">
                        <span className="text-gray-500">运价编号：</span>
                        <span className="font-medium">{rate.certNo}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-500">目的港：</span>
                        <span className="font-medium">{rate.origin}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-500">配送地址类型：</span>
                        <span className="font-medium">{rate.addressType}</span>
                      </div>
                      {rate.addressType === '第三方地址' && (
                        <>
                          <div className="mb-2">
                            <span className="text-gray-500">邮编：</span>
                            <span className="font-medium">{rate.zipCode}</span>
                          </div>
                          <div className="mb-2">
                            <span className="text-gray-500">地址：</span>
                            <span className="font-medium">{rate.address}</span>
                          </div>
                        </>
                      )}
                      {(rate.addressType === '亚马逊仓库' || rate.addressType === '易仓') && (
                        <div className="mb-2">
                          <span className="text-gray-500">仓库代码：</span>
                          <span className="font-medium">{rate.warehouseCode}</span>
                        </div>
                      )}
                      <div className="mb-2">
                        <span className="text-gray-500">代理名称：</span>
                        <span className="font-medium">{rate.agentName}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-500">有效期：</span>
                        <span className="font-medium">{rate.validDateRange}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-500">备注：</span>
                        <span className="font-medium">{rate.remark || '-'}</span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              
              {/* 费用明细 */}
              <div>
                <div className="text-blue-600 font-bold mb-3 border-l-4 border-blue-600 pl-2">费用明细</div>
                
                {/* 基础运费 */}
                <div className="mb-4">
                  <div className="text-gray-700 font-medium mb-2 border-l-2 border-gray-400 pl-2">基础运费</div>
                  <Table
                    columns={[
                      { title: '费用名称', dataIndex: 'name', width: 120 },
                      { title: '单价', dataIndex: 'price', width: 100 },
                      { title: '币种', dataIndex: 'currency', width: 80 },
                      { title: '计费单位', dataIndex: 'unit', width: 100 },
                      { title: '备注', dataIndex: 'remark', width: 150 }
                    ]}
                    data={currentRateDetail ? getRateDetail(currentRateDetail, currentRateType).basic : []}
                    pagination={false}
                    border={true}
                    rowKey="key"
                  />
                </div>
                
                {/* 起运港附加费 - 仅在有数据时显示 */}
                {currentRateDetail && getRateDetail(currentRateDetail, currentRateType).origin.length > 0 && (
                  <div className="mb-4">
                    <div className="text-gray-700 font-medium mb-2 border-l-2 border-gray-400 pl-2">起运港附加费</div>
                    <Table
                      columns={[
                        { title: '费用名称', dataIndex: 'name', width: 120 },
                        { title: '单价', dataIndex: 'price', width: 100 },
                        { title: '币种', dataIndex: 'currency', width: 80 },
                        { title: '计费单位', dataIndex: 'unit', width: 100 },
                        { title: '备注', dataIndex: 'remark', width: 150 }
                      ]}
                      data={getRateDetail(currentRateDetail, currentRateType).origin}
                      pagination={false}
                      border={true}
                      rowKey="key"
                    />
                  </div>
                )}
                
                {/* 目的港附加费 - 仅在有数据时显示 */}
                {currentRateDetail && getRateDetail(currentRateDetail, currentRateType).destination.length > 0 && (
                  <div>
                    <div className="text-gray-700 font-medium mb-2 border-l-2 border-gray-400 pl-2">目的港附加费</div>
                    <Table
                      columns={[
                        { title: '费用名称', dataIndex: 'name', width: 120 },
                        { title: '单价', dataIndex: 'price', width: 100 },
                        { title: '币种', dataIndex: 'currency', width: 80 },
                        { title: '计费单位', dataIndex: 'unit', width: 100 },
                        { title: '备注', dataIndex: 'remark', width: 150 }
                      ]}
                      data={getRateDetail(currentRateDetail, currentRateType).destination}
                      pagination={false}
                      border={true}
                      rowKey="key"
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* 装箱门点AI识别弹窗 */}
      <Modal
        title="AI智能识别地址"
        visible={loadingPointAiModalVisible}
        onCancel={closeLoadingPointAiModal}
        footer={[
          <Button key="cancel" onClick={closeLoadingPointAiModal}>取消</Button>,
          <Button key="recognize" type="primary" onClick={handleLoadingPointAiRecognize}>识别</Button>
        ]}
      >
        <div className="p-4">
          <p className="mb-2 text-gray-500">请将地址信息粘贴到下方文本框中：</p>
          <Input.TextArea
            placeholder="例如：浙江省杭州市萧山区新塘街道萧山经济技术开发区红垦路535号"
            style={{ minHeight: '120px' }}
            value={loadingPointAddressText}
            onChange={setLoadingPointAddressText}
          />
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-500">提示：系统将自动解析省市区街道信息，详细地址将填入详细地址栏</p>
          </div>
        </div>
      </Modal>

      {/* 尾程送货地址AI识别弹窗 */}
      <Modal
        title="AI智能识别地址"
        visible={deliveryAiModalVisible}
        onCancel={closeDeliveryAiModal}
        footer={[
          <Button key="cancel" onClick={closeDeliveryAiModal}>取消</Button>,
          <Button key="recognize" type="primary" onClick={handleDeliveryAiRecognize}>识别</Button>
        ]}
      >
        <div className="p-4">
          <p className="mb-2 text-gray-500">请将美国地址信息粘贴到下方文本框中：</p>
          <Input.TextArea
            placeholder="例如：Ontario, CA 91761 ONT8 或 Los Angeles, CA 90001"
            style={{ minHeight: '120px' }}
            value={deliveryAddressText}
            onChange={setDeliveryAddressText}
          />
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-500 mb-2">识别规则：</p>
            <ul className="text-sm text-gray-500 list-disc pl-5">
              <li>如包含亚马逊仓库代码(ONT8/BFI4等)，将自动设置为亚马逊仓库类型</li>
              <li>如包含易仓代码(LAX203/ATL205等)，将自动设置为易仓类型</li>
              <li>其他情况将设置为第三方地址，并解析地址和邮编</li>
            </ul>
          </div>
        </div>
      </Modal>
    </SaasLayout>
  );
};

export default CreateFclInquiry; 