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
  Modal,
  Switch,
  Grid,
  Tooltip,
  Dropdown,
  Menu,
  Input,
  Checkbox
} from '@arco-design/web-react';
import { 
  IconSearch, 
  IconPlus, 
  IconUpload, 
  IconDownload, 
  IconEdit, 
  IconDelete, 
  IconRefresh, 
  IconList,
  IconDragDotVertical,
  IconMore,
  IconCopy,
  IconEye,
  IconToTop,
  IconDown,
  IconUp,
  IconSettings
} from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import ControlTowerSaasLayout from "./ControlTowerSaasLayout";
import './InquiryManagement.css';

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

// 默认筛选字段配置
export const DEFAULT_FILTER_FIELDS: FilterFieldConfig[] = [
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
    key: 'sublineType',
    label: '支线类型',
    type: 'select',
    options: [
      { label: '湖州海铁', value: '湖州海铁' },
      { label: '义乌海铁', value: '义乌海铁' },
      { label: '合肥海铁', value: '合肥海铁' }
    ],
    placeholder: '请选择支线类型'
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
      { label: 'CNNGB | NINGBO', value: 'CNNGB | NINGBO' },
      { label: 'CNTAO | QINGDAO', value: 'CNTAO | QINGDAO' }
    ],
    placeholder: '请选择起运港'
  },
  {
    key: 'terminal',
    label: '码头',
    type: 'select',
    options: [
      { label: '洋山', value: '洋山' },
      { label: '北仑', value: '北仑' },
      { label: '前湾', value: '前湾' }
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
  },
  {
    key: 'creator',
    label: '创建人',
    type: 'text',
    placeholder: '请输入创建人'
  },
  {
    key: 'createTime',
    label: '创建时间',
    type: 'dateRange',
    placeholder: '请选择创建时间范围'
  }
];

// 映射状态颜色到CSS类名
const StatusColorClasses: Record<string, string> = {
  '正常': 'bg-green-500',
  '过期': 'bg-gray-500',
  '下架': 'bg-red-500'
};

// 定义数据接口
interface DataItem {
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
  creator: string; // 创建人
  createTime: string; // 创建时间
  updater: string; // 更新人
  updateTime: string; // 更新时间
}

const PrecarriageRates: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
  const [customTableModalVisible, setCustomTableModalVisible] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({
    code: true,
    rateType: true,
    sublineType: true,
    origin: true,
    destination: true,
    terminal: true,
    vendor: true,
    '20gp': true,
    '40gp': true,
    '40hc': true,
    '40nor': true,
    '45hc': true,
    validDateRange: true,
    status: true,
    remark: true,
    creator: true,
    createTime: true,
    updater: true,
    updateTime: true
  });

  // 筛选相关状态
  const [filterExpanded, setFilterExpanded] = useState(true); // 筛选区展开状态
  const [filterConditions, setFilterConditions] = useState<FilterCondition[]>([]); // 当前筛选条件
  const [filterSchemes, setFilterSchemes] = useState<FilterScheme[]>([]); // 筛选方案列表
  const [currentSchemeId, setCurrentSchemeId] = useState<string>('default'); // 当前选中的方案ID
  const [filterFieldModalVisible, setFilterFieldModalVisible] = useState(false); // 增减条件弹窗
  const [schemeModalVisible, setSchemeModalVisible] = useState(false); // 另存为方案弹窗
  const [schemeName, setSchemeName] = useState(''); // 新方案名称

  const navigate = useNavigate();

  // 初始化默认筛选条件
  const initializeDefaultConditions = (): FilterCondition[] => {
    return DEFAULT_FILTER_FIELDS.map(field => ({
      key: field.key,
      mode: FilterMode.EQUAL,
      value: undefined,
      visible: true
    }));
  };

  // 初始化默认方案
  const initializeDefaultScheme = (): FilterScheme => {
    return {
      id: 'default',
      name: '默认方案',
      conditions: initializeDefaultConditions(),
      isDefault: true
    };
  };

  // 组件初始化
  React.useEffect(() => {
    const defaultScheme = initializeDefaultScheme();
    setFilterSchemes([defaultScheme]);
    setFilterConditions(defaultScheme.conditions);
  }, []);

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
  };

  // 更新筛选条件可见性
  const updateFilterConditionVisibility = (key: string, visible: boolean) => {
    setFilterConditions(prev => prev.map(condition => 
      condition.key === key 
        ? { ...condition, visible }
        : condition
    ));
  };

  // 打开自定义表格弹窗
  const openCustomTableModal = () => {
    setCustomTableModalVisible(true);
  };

  // 关闭自定义表格弹窗
  const closeCustomTableModal = () => {
    setCustomTableModalVisible(false);
  };

  // 处理列可见性变化
  const handleColumnVisibilityChange = (column: string, visible: boolean) => {
    setColumnVisibility(prev => ({
      ...prev,
      [column]: visible
    }));
  };

  // 重置列可见性
  const resetColumnVisibility = () => {
    setColumnVisibility({
      code: true,
      rateType: true,
      sublineType: true,
      origin: true,
      destination: true,
      terminal: true,
      vendor: true,
      '20gp': true,
      '40gp': true,
      '40hc': true,
      '40nor': true,
      '45hc': true,
      validDateRange: true,
      status: true,
      remark: true,
      creator: true,
      createTime: true,
      updater: true,
      updateTime: true
    });
  };

  const onSelectChange = (selectedRowKeys: (string | number)[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  // 渲染单个筛选条件
  const renderFilterCondition = (condition: FilterCondition) => {
    const fieldConfig = DEFAULT_FILTER_FIELDS.find(field => field.key === condition.key);
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
        <div className="mb-2 text-gray-600 text-sm">{fieldConfig.label}</div>
        <div className="flex gap-2">
          {/* 筛选模式下拉 */}
          <Select
            value={condition.mode}
            onChange={handleModeChange}
            style={{ width: '100px' }}
            size="small"
          >
            {FilterModeOptions.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
          
          {/* 输入控件 */}
          <div style={{ flex: 1 }}>
            {fieldConfig.type === 'text' && (
              <Input
                placeholder={isInputDisabled ? '' : fieldConfig.placeholder}
                value={condition.value || ''}
                onChange={handleValueChange}
                disabled={isInputDisabled}
                allowClear
              />
            )}
            {fieldConfig.type === 'select' && (
              <Select
                placeholder={isInputDisabled ? '' : fieldConfig.placeholder}
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
              />
            )}
            {fieldConfig.type === 'number' && (
              <Input
                placeholder={isInputDisabled ? '' : fieldConfig.placeholder}
                value={condition.value || ''}
                onChange={handleValueChange}
                disabled={isInputDisabled}
                allowClear
              />
            )}
          </div>
        </div>
      </Col>
    );
  };

  // 渲染筛选区域
  const renderFilterArea = () => {
    const conditionsToShow = filterExpanded ? getVisibleConditions() : getFirstRowConditions();
    
    // 调试日志
    console.log('Filter Debug:', {
      filterConditions,
      filterSchemes,
      conditionsToShow,
      filterExpanded,
      currentSchemeId
    });
    
    return (
      <Card className="mb-4" style={{ border: '3px solid red', background: 'yellow' }}>
        <div style={{ color: 'red', fontSize: '20px', fontWeight: 'bold' }}>
          🔥 新筛选区 DEBUG - conditionsToShow.length: {conditionsToShow.length}
        </div>
        <div className="flex justify-between items-center mb-4">
          <Title heading={6}>筛选条件</Title>
          <div className="flex gap-2">
            {/* 选择方案下拉 */}
            <Select
              value={currentSchemeId}
              onChange={applyFilterScheme}
              style={{ width: '150px' }}
              placeholder="选择方案"
            >
              {filterSchemes.map(scheme => (
                <Option key={scheme.id} value={scheme.id}>
                  {scheme.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        
        <Row gutter={[16, 16]}>
          {conditionsToShow.map(condition => renderFilterCondition(condition))}
        </Row>
        
        <div className="flex justify-between mt-4">
          <Space>
            <Button type="primary" icon={<IconSearch />}>查询</Button>
            <Button icon={<IconRefresh />} onClick={resetFilterConditions}>重置</Button>
            <Button icon={<IconSettings />} onClick={openFilterFieldModal}>增减条件</Button>
            <Button onClick={openSchemeModal}>另存为方案</Button>
          </Space>
          
          <Button 
            type="text" 
            icon={filterExpanded ? <IconUp /> : <IconDown />}
            onClick={toggleFilterExpanded}
          >
            {filterExpanded ? '收起' : '展开'}
          </Button>
        </div>
      </Card>
    );
  };

  // 获取运价状态标签
  const getRateStatusTag = (status: string) => {
    // 使用 StatusColorClasses 对象来获取颜色类名
    const colorClass = StatusColorClasses[status] || 'bg-blue-500';
    
    return (
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full ${colorClass} mr-2`}></div>
        <span>{status}</span>
      </div>
    );
  };

  // 渲染更多操作下拉菜单
  const renderMoreActions = () => {
    return (
      <Menu>
        <Menu.Item key="copy">
          <IconCopy className="mr-2" />复制
        </Menu.Item>
        <Menu.Item key="takeDown">
          <IconDelete className="mr-2" />下架
        </Menu.Item>
      </Menu>
    );
  };

  // 生成表格列配置
  const columns = [
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
      render: (value: string) => <Tooltip content={value} mini>{getRateStatusTag(value)}</Tooltip>
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
      title: '创建人',
      dataIndex: 'creator',
      width: 100,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 150,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '更新人',
      dataIndex: 'updater',
      width: 100,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      width: 150,
      sorter: true,
      resizable: true,
      render: (value: string) => <Tooltip content={value} mini><span className="arco-ellipsis">{value}</span></Tooltip>
    },
    {
      title: '操作',
      dataIndex: 'operation',
      fixed: 'right' as const,
      width: 180,
      render: (_: any, _record: DataItem) => (
        <div style={{display:'flex', flexWrap:'wrap', gap:4}}>
          <div style={{display:'flex', gap:4, width:'100%'}}>
            <Button type="text" size="mini" icon={<IconEye />}>查看</Button>
            <Button type="text" size="mini" icon={<IconEdit />}>编辑</Button>
          </div>
          <div style={{display:'flex', gap:4, width:'100%'}}>
            <Button type="text" size="mini" icon={<IconToTop />}>上架</Button>
            <Dropdown droplist={renderMoreActions()} position="br">
              <Button type="text" size="mini" icon={<IconMore />}>更多</Button>
            </Dropdown>
          </div>
        </div>
      ),
    }
  ];

  // 列配置项
  const columnConfigList = [
    { label: '港前运价编号', key: 'code' },
    { label: '运价类型', key: 'rateType' },
    { label: '支线类型', key: 'sublineType' },
    { label: '起运地', key: 'origin' },
    { label: '起运港', key: 'destination' },
    { label: '码头', key: 'terminal' },
    { label: '供应商', key: 'vendor' },
    { label: '20GP', key: '20gp' },
    { label: '40GP', key: '40gp' },
    { label: '40HC', key: '40hc' },
    { label: '40NOR', key: '40nor' },
    { label: '45HC', key: '45hc' },
    { label: '有效期', key: 'validDateRange' },
    { label: '状态', key: 'status' },
    { label: '备注', key: 'remark' },
    { label: '创建人', key: 'creator' },
    { label: '创建时间', key: 'createTime' },
    { label: '更新人', key: 'updater' },
    { label: '更新时间', key: 'updateTime' }
  ];

  // 模拟数据
  const data: DataItem[] = [
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
      creator: '张三',
      createTime: '2024-05-01 10:30:45',
      updater: '张三',
      updateTime: '2024-05-01 10:30:45'
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
      creator: '李四',
      createTime: '2024-05-02 14:20:33',
      updater: '王五',
      updateTime: '2024-05-03 09:15:10'
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
      creator: '赵六',
      createTime: '2024-04-28 16:45:22',
      updater: '赵六',
      updateTime: '2024-04-28 16:45:22'
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
      creator: '孙七',
      createTime: '2024-03-20 11:30:05',
      updater: '李四',
      updateTime: '2024-04-10 15:22:18'
    },
    {
      key: '5',
      code: 'PCR2024050004',
      rateType: '支线',
      sublineType: '乍浦支线',
      origin: '浙江省嘉兴市平湖市',
      destination: 'CNSHA | SHANGHAI',
      terminal: '洋山',
      vendor: '海得航运',
      '20gp': 450,
      '40gp': 750,
      '40hc': 800,
      '40nor': 780,
      '45hc': 920,
      validDateRange: '2024-05-01 至 2024-10-31',
      status: '正常',
      remark: '周一、周四发船',
      creator: '王五',
      createTime: '2024-04-29 09:10:56',
      updater: '王五',
      updateTime: '2024-04-29 09:10:56'
    },
    {
      key: '6',
      code: 'PCR2024030001',
      rateType: '支线',
      sublineType: '海宁支线',
      origin: '浙江省嘉兴市海宁市',
      destination: 'CNNGB | NINGBO',
      terminal: '北仑',
      vendor: '浙江海洋航运',
      '20gp': 500,
      '40gp': 800,
      '40hc': 850,
      '40nor': 830,
      '45hc': 950,
      validDateRange: '2024-03-15 至 2024-04-30',
      status: '下架',
      remark: '已停运',
      creator: '张三',
      createTime: '2024-03-10 13:50:42',
      updater: '张三',
      updateTime: '2024-04-25 10:05:38'
    }
  ];

  // 新增港前运价
  const handleCreatePrecarriageRate = () => {
    navigate('/controltower/saas/create-precarriage-rate');
  };

  return (
    <ControlTowerSaasLayout 
      menuSelectedKey="22" 
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>门点服务管理</Breadcrumb.Item>
          <Breadcrumb.Item>港前运价</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <div style={{ 
        background: 'red', 
        color: 'white', 
        padding: '20px', 
        fontSize: '24px', 
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        🚨 港前运价组件已加载 - 新版本筛选功能
      </div>
      
      {renderFilterArea()}

      {/* 表格卡片 */}
      <Card>
        <div className="flex justify-between mb-4">
          <Space>
            <Button type="primary" icon={<IconPlus />} onClick={handleCreatePrecarriageRate}>新增港前运价</Button>
            <Button icon={<IconUpload />}>批量导入</Button>
            <Button icon={<IconDownload />}>导出</Button>
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
          columns={columns.filter(col => {
            const dataIndex = col.dataIndex as string;
            return dataIndex === 'operation' || (columnVisibility[dataIndex as keyof typeof columnVisibility] !== false);
          })}
          data={data}
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
          }}
          pagination={{
            showTotal: true,
            total: data.length,
            showJumper: true,
            sizeCanChange: true,
            pageSize: 10,
          }}
          scroll={{ x: 1800 }}
          border={false}
          className="mt-4 inquiry-table-nowrap"
        />
      </Card>

      {/* 自定义表格弹窗 */}
      <Modal
        title="表头设置"
        visible={customTableModalVisible}
        onCancel={closeCustomTableModal}
        footer={[
          <Button key="reset" onClick={resetColumnVisibility} style={{ float: 'left' }}>重置</Button>,
          <Button key="cancel" onClick={closeCustomTableModal}>取消</Button>,
          <Button key="apply" type="primary" onClick={closeCustomTableModal}>确认</Button>,
        ]}
        style={{ width: 800 }}
      >
        <div className="p-4">
          <Row gutter={[16, 16]}>
            {columnConfigList.map((column) => (
              <Col span={8} key={column.key}>
                <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <IconDragDotVertical className="text-gray-400 mr-2" />
                      <span>{column.label}</span>
                    </div>
                    <Switch 
                      checked={columnVisibility[column.key as keyof typeof columnVisibility]} 
                      onChange={checked => handleColumnVisibilityChange(column.key, checked)}
                    />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Modal>

      {/* 增减条件弹窗 */}
      <Modal
        title="增减筛选条件"
        visible={filterFieldModalVisible}
        onCancel={closeFilterFieldModal}
        footer={[
          <Button key="cancel" onClick={closeFilterFieldModal}>取消</Button>,
          <Button key="apply" type="primary" onClick={closeFilterFieldModal}>确认</Button>,
        ]}
        style={{ width: 600 }}
      >
        <div className="p-4">
          <div className="mb-4 text-gray-600">请选择要显示的筛选条件：</div>
          <Row gutter={[16, 16]}>
            {DEFAULT_FILTER_FIELDS.map((field) => {
              const condition = filterConditions.find(c => c.key === field.key);
              return (
                <Col span={12} key={field.key}>
                  <Checkbox
                    checked={condition?.visible || false}
                    onChange={(checked) => updateFilterConditionVisibility(field.key, checked)}
                  >
                    {field.label}
                  </Checkbox>
                </Col>
              );
            })}
          </Row>
        </div>
      </Modal>

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
    </ControlTowerSaasLayout>
  );
};

export default PrecarriageRates; 