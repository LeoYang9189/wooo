import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Select, 
  DatePicker, 
  Card, 
  Tag,
  Tooltip,
  Tabs,
  Input,
  Grid,
  Typography
} from '@arco-design/web-react';
import { 
  IconSearch, 
  IconDownload, 
  IconRefresh, 
  IconList,
  IconEye,
  IconDown,
  IconUp
} from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
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
          key: 'routeCode',
          label: '运价号',
          type: 'text',
          placeholder: '请输入运价号'
        },
        {
          key: 'rateType',
          label: '运价类型',
          type: 'select',
          options: [
            { label: '合约价', value: '合约价' },
            { label: 'SPOT电商', value: 'SPOT电商' }
          ],
          placeholder: '请选择运价类型'
        },
        {
          key: 'departurePort',
          label: '起运港',
          type: 'select',
          options: [
            { label: 'CNSHA', value: 'CNSHA' },
            { label: 'CNNGB', value: 'CNNGB' },
            { label: 'CNQIN', value: 'CNQIN' },
            { label: 'CNYTN', value: 'CNYTN' }
          ],
          placeholder: '请选择起运港'
        },
        {
          key: 'dischargePort',
          label: '目的港',
          type: 'select',
          options: [
            { label: 'USLAX', value: 'USLAX' },
            { label: 'USNYC', value: 'USNYC' },
            { label: 'USLGB', value: 'USLGB' },
            { label: 'USOAK', value: 'USOAK' }
          ],
          placeholder: '请选择目的港'
        },
        {
          key: 'directTransit',
          label: '直达',
          type: 'select',
          options: [
            { label: '直达', value: '直达' },
            { label: '中转', value: '中转' }
          ],
          placeholder: '请选择直达/中转'
        },
        {
          key: 'transitPort',
          label: '中转港',
          type: 'select',
          options: [
            { label: 'SINGAPORE', value: 'SINGAPORE' },
            { label: 'HONG KONG', value: 'HONG KONG' },
            { label: 'KRPUS', value: 'KRPUS' }
          ],
          placeholder: '请选择中转港'
        },
        {
          key: 'shipCompany',
          label: '船公司',
          type: 'select',
          options: [
            { label: 'SITC', value: 'SITC' },
            { label: 'COSCO', value: 'COSCO' },
            { label: 'MSK', value: 'MSK' },
            { label: 'ONE', value: 'ONE' },
            { label: 'MAERSK', value: 'MAERSK' },
            { label: 'EVERGREEN', value: 'EVERGREEN' }
          ],
          placeholder: '请选择船公司'
        },
        {
          key: 'validPeriod',
          label: '有效期',
          type: 'dateRange',
          placeholder: '请选择有效期范围'
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
  transitPort: string; // 中转港
  spaceStatus: string; // 舱位状态
  priceStatus: string; // 价格趋势
  containerType: string; // 箱种
  '20gp': number; // 20'
  '40gp': number; // 40'
  '40hc': number; // 40' HC
  '45hc': number; // 45'
  '40nor': number; // 40' NOR
  '20nor': number; // 20' NOR
  shipCompany: string; // 船公司
  contractNo: string; // 约号
  vesselSchedule: string; // 船期
  voyage: string; // 航程
  cargoType: string; // 货物类型
  freeContainerDays: number; // 免用箱
  freeStorageDays: number; // 免堆存
  chargeSpecialNote: string; // 接货特殊说明
  nac: string; // NAC
  validPeriod: string; // 有效期
  rateType: string; // 运价类型
  vesselName: string; // 船名
  voyageNo: string; // 航次
  etd: string; // ETD
  eta: string; // ETA
  transitType: string; // 中转类型
}

const ClientRateQuery: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
  const [activeTab, setActiveTab] = useState('fcl');
  const [filterConditions, setFilterConditions] = useState<FilterCondition[]>([]);
  const [filterExpanded, setFilterExpanded] = useState(false);

  const onSelectChange = (selectedRowKeys: (string | number)[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  // 查看运价详情
  const handleViewRate = (key: string) => {
    navigate(`/controltower-client/saas/view-fcl-rate/${key}`);
  };

  // FCL列定义 - 删除运价状态列
  const fclColumns = [
    {
      title: '运价号',
      dataIndex: 'routeCode',
      width: 180,
      render: (value: string) => <Tooltip content={value} mini><span className="no-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '运价类型',
      dataIndex: 'rateType',
      width: 140,
      render: (value: string) => <Tooltip content={value} mini><span className="no-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '起运港',
      dataIndex: 'departurePort',
      width: 180,
      render: (value: string) => {
        const [code, name] = value.split('|');
        return (
          <Tooltip content={value} mini>
            <div className="text-left">
              <div className="text-xs font-mono">{code}</div>
              <div className="text-xs text-gray-600">{name}</div>
            </div>
          </Tooltip>
        );
      },
      sorter: true,
      resizable: true,
    },
    {
      title: '目的港',
      dataIndex: 'dischargePort',
      width: 200,
      render: (value: string) => {
        const [code, name] = value.split('|');
        return (
          <Tooltip content={value} mini>
            <div className="text-left">
              <div className="text-xs font-mono">{code}</div>
              <div className="text-xs text-gray-600">{name}</div>
            </div>
          </Tooltip>
        );
      },
      sorter: true,
      resizable: true,
    },
    {
      title: '中转港',
      dataIndex: 'transitPort',
      width: 180,
      render: (value: string) => {
        const [code, name] = value.split('|');
        return (
          <Tooltip content={value} mini>
            <div className="text-left">
              <div className="text-xs font-mono">{code}</div>
              <div className="text-xs text-gray-600">{name}</div>
            </div>
          </Tooltip>
        );
      },
      sorter: true,
      resizable: true,
    },
    {
      title: '中转类型',
      dataIndex: 'transitType',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="no-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '船公司',
      dataIndex: 'shipCompany',
      width: 220,
      render: (value: string) => <Tooltip content={value} mini><span className="no-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '约号',
      dataIndex: 'contractNo',
      width: 160,
      render: (value: string) => <Tooltip content={value} mini><span className="no-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '舱位状态',
      dataIndex: 'spaceStatus',
      width: 120,
      render: (value: string) => {
        const colorMap: Record<string, string> = {
          '畅接': 'green',
          '正常': 'blue', 
          '单票申请': 'orange',
          '爆舱': 'red',
          '不接': 'gray'
        };
        return (
          <Tooltip content={value} mini>
            <Tag color={colorMap[value] || 'blue'} size="small">
              {value}
            </Tag>
          </Tooltip>
        );
      },
      sorter: true,
      resizable: true,
    },
    {
      title: '价格趋势',
      dataIndex: 'priceStatus',
      width: 120,
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
      title: '货物类型',
      dataIndex: 'cargoType',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="no-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    // 运价状态列已删除
    {
      title: "20GP",
      dataIndex: '20gp',
      width: 100,
      render: (value: number) => <Tooltip content={value.toString()} mini><span className="no-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: "40GP",
      dataIndex: '40gp',
      width: 100,
      render: (value: number) => <Tooltip content={value.toString()} mini><span className="no-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: "40HC",
      dataIndex: '40hc',
      width: 100,
      render: (value: number) => <Tooltip content={value.toString()} mini><span className="no-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '船期',
      dataIndex: 'vesselSchedule',
      width: 120,
      render: (value: string) => <Tooltip content={value} mini><span className="no-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '有效期',
      dataIndex: 'validPeriod',
      width: 240,
      render: (value: string) => <Tooltip content={value} mini><span className="no-ellipsis">{value}</span></Tooltip>,
      sorter: true,
      resizable: true,
    },
    {
      title: '操作',
      dataIndex: 'operations',
      fixed: 'right' as const,
      width: 80,
      render: (_: unknown, record: DataItem) => (
        <Button type="text" size="mini" icon={<IconEye />} onClick={() => handleViewRate(record.key)}>
          查看
        </Button>
      ),
    },
  ];

  // FCL数据 - 只包含正常状态的运价
  const fclData: DataItem[] = Array(12).fill(null).map((_, index) => {
    const random20gp = [510, 560, 865, 1130, 530, 620].sort(() => Math.random() - 0.5)[0];
    const random40gp = random20gp === 510 ? 1020 : random20gp === 560 ? 1120 : random20gp === 865 ? 1730 : random20gp === 1130 ? 2260 : 1060;

    const departurePorts = [
      { code: 'CNSHA', fullName: 'SHANGHAI', name: '上海' },
      { code: 'CNNGB', fullName: 'NINGBO', name: '宁波' },
      { code: 'CNQIN', fullName: 'QINGDAO', name: '青岛' },
      { code: 'CNYTN', fullName: 'YANTAI', name: '烟台' }
    ];
    const dischargePorts = [
      { code: 'USLAX', fullName: 'LOS ANGELES', name: '洛杉矶' },
      { code: 'USNYC', fullName: 'NEW YORK', name: '纽约' },
      { code: 'USLGB', fullName: 'LONG BEACH', name: '长滩' },
      { code: 'USOAK', fullName: 'OAKLAND', name: '奥克兰' },
      { code: 'PHMNL', fullName: 'MANILA', name: '马尼拉' },
      { code: 'SGSIN', fullName: 'SINGAPORE', name: '新加坡' }
    ];
    const transitPorts = [
      { code: 'SGSIN', fullName: 'SINGAPORE', name: '新加坡' },
      { code: 'HKHKG', fullName: 'HONG KONG', name: '香港' },
      { code: 'KRPUS', fullName: 'PUSAN', name: '釜山' }
    ];
    
    const selectedDeparturePort = departurePorts[Math.floor(Math.random() * departurePorts.length)];
    const selectedDischargePort = dischargePorts[Math.floor(Math.random() * dischargePorts.length)];
    const selectedTransitPort = transitPorts[Math.floor(Math.random() * transitPorts.length)];
    
    return {
      key: `${index}`,
      routeCode: `FCL${2024}${String(index + 1).padStart(4, '0')}`,
      departurePort: `${selectedDeparturePort.fullName} (${selectedDeparturePort.code})|${selectedDeparturePort.name}`,
      dischargePort: `${selectedDischargePort.fullName} (${selectedDischargePort.code})|${selectedDischargePort.name}`,
      transitPort: `${selectedTransitPort.fullName} (${selectedTransitPort.code})|${selectedTransitPort.name}`,
      spaceStatus: ['畅接', '正常', '单票申请'][Math.floor(Math.random() * 3)], // 只显示正常状态
      priceStatus: ['价格稳定', '价格上涨', '价格下调'][Math.floor(Math.random() * 3)],
      containerType: ['普通箱', '冷冻箱', '开顶箱'][Math.floor(Math.random() * 3)],
      '20gp': random20gp,
      '40gp': random40gp,
      '40hc': random40gp + 50,
      '40nor': random40gp - 20,
      '20nor': random20gp - 10,
      '45hc': random40gp + 100,
      shipCompany: ['MSK-马士基', 'SITC-海丰国际', 'COSCO-中远海运', 'ONE-海洋网联', 'EMC-长荣海运'][Math.floor(Math.random() * 5)],
      contractNo: Math.random() > 0.3 ? ['CONTRACT001', 'CONTRACT002', 'CONTRACT003', 'SPOT'][Math.floor(Math.random() * 4)] : '',
      vesselSchedule: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'][Math.floor(Math.random() * 7)],
      voyage: `${4 + Math.floor(Math.random() * 6)}天`,
      cargoType: ['普货', '危险品', '冷冻品', '特种箱'][Math.floor(Math.random() * 4)],
      freeContainerDays: 5 + Math.floor(Math.random() * 8),
      freeStorageDays: 7 + Math.floor(Math.random() * 8),
      chargeSpecialNote: '需提前预约',
      nac: Math.random() > 0.4 ? ['NAC01', 'NAC02', 'NAC03'][Math.floor(Math.random() * 3)] : '',
      validPeriod: '2024-05-01 至 2024-12-31',
      rateType: ['合约价', 'SPOT电商'][Math.floor(Math.random() * 2)],
      vesselName: ['MEDKON QUO', 'SITC PENANG', 'SITC YOKOHAMA', 'SITC XINCHENG'][Math.floor(Math.random() * 4)],
      voyageNo: Math.random() > 0.3 ? `25${10 + Math.floor(Math.random() * 9)}S` : '',
      etd: Math.random() > 0.3 ? `05-${15 + Math.floor(Math.random() * 4)}` : '',
      eta: Math.random() > 0.3 ? `06-${1 + Math.floor(Math.random() * 10)}` : '',
      transitType: Math.random() > 0.5 ? '中转' : '直达'
    };
  });

  // 获取表格数据
  const getTableData = (): any => {
    switch (activeTab) {
      case 'fcl':
      default:
        return fclData;
    }
  };

  // 获取表格列
  const getTableColumns = (): any => {
    switch (activeTab) {
      case 'fcl':
      default:
        return fclColumns;
    }
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

  // 初始化默认筛选条件
  const initializeDefaultConditions = (activeTab: string): FilterCondition[] => {
    const filterFields = getFilterFieldsByTab(activeTab);
    return filterFields.map(field => ({
      key: field.key,
      mode: FilterMode.EQUAL,
      value: '',
      visible: ['shipCompany', 'departurePort', 'dischargePort'].includes(field.key)
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

  // 组件初始化
  useEffect(() => {
    const defaultScheme = initializeDefaultScheme(activeTab);
    setFilterConditions(defaultScheme.conditions);
  }, [activeTab]);

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
          
          {/* 输入控件 */}
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
          </div>
        </div>
      </Col>
    );
  };

  // 渲染筛选区域
  const renderFilterArea = () => {
    const conditionsToShow = filterExpanded ? getVisibleConditions() : getFirstRowConditions();
    
    return (
      <Card className="mb-4 filter-area-card">
        {/* 筛选区头部 */}
        <div className="filter-header flex justify-between items-center mb-6">
          <Title heading={6} className="!mb-0 !text-gray-800">
            筛选条件
          </Title>
          <div className="flex items-center gap-3">
            {/* 操作按钮 */}
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
        
        {/* 筛选条件网格 */}
        <Row gutter={[20, 20]}>
          {conditionsToShow.map(condition => renderFilterCondition(condition))}
        </Row>
      </Card>
    );
  };

  return (
    <div style={{ padding: '16px' }}>
      <Card>
        <Tabs activeTab={activeTab} onChange={setActiveTab} className="mb-4">
          <Tabs.TabPane key="fcl" title="整箱运价" />
          <Tabs.TabPane key="lcl" title="拼箱运价" />
          <Tabs.TabPane key="air" title="空运运价" />
        </Tabs>
        
        {/* 筛选区域 */}
        {renderFilterArea()}
        
        <Card>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Button type="primary" icon={<IconSearch />}>
                直接询价
              </Button>
              <Button icon={<IconDownload />}>
                导出数据
              </Button>
            </div>
            <Button 
              icon={<IconList />}
              onClick={() => {}}
            >
              自定义表格
            </Button>
          </div>
          
          <Table
            rowKey="key"
            loading={false}
            columns={getTableColumns()}
            data={getTableData()}
            rowSelection={{
              selectedRowKeys,
              onChange: onSelectChange,
              columnWidth: 60
            }}
            pagination={pagination}
            scroll={{ x: 2800, y: 'calc(100vh - 400px)' }}
            border={false}
            className="mt-4 inquiry-table-nowrap"
          />
        </Card>
      </Card>
    </div>
  );
};

export default ClientRateQuery; 