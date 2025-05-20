import React, { useState, useEffect } from 'react';
import { Card, Breadcrumb, Typography, Button, Space, Select, Table, Modal, Grid, Switch, Dropdown, Menu, Tooltip, Tabs } from '@arco-design/web-react';
import { IconSearch, IconRefresh, IconFilter, IconList, IconDragDotVertical, IconEdit, IconDelete, IconDownload, IconEye, IconUndo, IconDown, IconPlus } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import SaasLayout from './SaasLayout';
import './InquiryManagement.css';

const Title = Typography.Title;
const TabPane = Tabs.TabPane;

const Row = Grid.Row;
const Col = Grid.Col;

// 添加类型定义

// 定义询价项接口
interface InquiryItem {
  inquiryNo: string;
  source: string;
  inquirer: string;
  inquiryStatus: string;
  firstQuoteStatus: string;
  mainQuoteStatus: string;
  lastQuoteStatus: string;
  cargoReadyTime: string;
  cargoNature: string;
  shipCompany: string;
  transitType: string;
  route: string;
  departurePort: string;
  dischargePort: string;
  remark: string;
  createdAt: string;
  clientType: string;
  clientName: string;
  // FCL特有
  containerInfo?: string;
  // LCL/Air特有
  weight?: string;
  volume?: string;
}

// 定义列类型接口
interface ColumnItem {
  title: string;
  dataIndex?: string;
  width?: number;
  sorter?: boolean;
  resizable?: boolean;
  fixed?: 'left' | 'right';
  render?: (value: any, record: InquiryItem) => React.ReactNode;
}

const InquiryManagement: React.FC = () => {
  // 筛选项状态
  
  const [customTableModalVisible, setCustomTableModalVisible] = useState(false);
  
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
  const onSelectChange = (keys: (string | number)[]) => setSelectedRowKeys(keys);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  
  // 当前选中的Tab
  const [activeTab, setActiveTab] = useState<string>('fcl');

  // 导航到询价页面
  const navigateToInquiryForm = () => {
    // 根据当前选中的Tab类型跳转到对应页面
    switch(activeTab) {
      case 'fcl':
        navigate('/saas/create-inquiry/fcl');
        break;
      case 'lcl':
        navigate('/saas/create-inquiry/lcl');
        break;
      case 'air':
        navigate('/saas/create-inquiry/air');
        break;
      default:
        navigate('/saas/create-inquiry/fcl');
    }
  };

  // 处理Tab切换
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    // 重置分页和选中项
    setCurrent(1);
    setSelectedRowKeys([]);
  };

  // 表格数据（示例）
  // 根据Tab获取当前要显示的列
  const getColumns = () => {
    // 基础列（所有类型共有）
    const baseColumns: ColumnItem[] = [
      { title: '询价编号', dataIndex: 'inquiryNo', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '询价来源', dataIndex: 'source', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '询价人', dataIndex: 'inquirer', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { 
        title: '询价状态', 
        dataIndex: 'inquiryStatus', 
        sorter: true, 
        resizable: true, 
        render: (val: string) => {
          let color = '';
          switch(val) {
            case '草稿':
              color = '#86909C'; // 灰色
              break;
            case '已提交':
              color = '#00B42A'; // 绿色
              break;
            case '已撤回':
              color = '#F53F3F'; // 红色
              break;
            default:
              color = '#86909C'; // 默认灰色
          }
          return (
            <Tooltip content={val} mini>
              <div className="flex items-center">
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, marginRight: 8 }}></div>
                <span className="arco-ellipsis">{val}</span>
              </div>
            </Tooltip>
          );
        }
      },
      { 
        title: '头程报价状态', 
        dataIndex: 'firstQuoteStatus', 
        sorter: true, 
        resizable: true, 
        width: 150,
        render: (val: string) => {
          let color = '';
          switch(val) {
            case '待报价':
              color = '#F7BA1E'; // 黄色
              break;
            case '已报价':
              color = '#00B42A'; // 绿色
              break;
            case '拒绝报价':
              color = '#F53F3F'; // 红色
              break;
            default:
              color = '#86909C'; // 默认灰色
          }
          return (
            <Tooltip content={val} mini>
              <div className="flex items-center">
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, marginRight: 8 }}></div>
                <span className="arco-ellipsis">{val}</span>
              </div>
            </Tooltip>
          );
        }
      },
      { 
        title: '干线报价状态', 
        dataIndex: 'mainQuoteStatus', 
        sorter: true, 
        resizable: true, 
        width: 150,
        render: (val: string) => {
          let color = '';
          switch(val) {
            case '待报价':
              color = '#F7BA1E'; // 黄色
              break;
            case '已报价':
              color = '#00B42A'; // 绿色
              break;
            case '拒绝报价':
              color = '#F53F3F'; // 红色
              break;
            default:
              color = '#86909C'; // 默认灰色
          }
          return (
            <Tooltip content={val} mini>
              <div className="flex items-center">
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, marginRight: 8 }}></div>
                <span className="arco-ellipsis">{val}</span>
              </div>
            </Tooltip>
          );
        }
      },
      { 
        title: '尾程报价状态', 
        dataIndex: 'lastQuoteStatus', 
        sorter: true, 
        resizable: true, 
        width: 150,
        render: (val: string) => {
          let color = '';
          switch(val) {
            case '待报价':
              color = '#F7BA1E'; // 黄色
              break;
            case '已报价':
              color = '#00B42A'; // 绿色
              break;
            case '拒绝报价':
              color = '#F53F3F'; // 红色
              break;
            default:
              color = '#86909C'; // 默认灰色
          }
          return (
            <Tooltip content={val} mini>
              <div className="flex items-center">
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, marginRight: 8 }}></div>
                <span className="arco-ellipsis">{val}</span>
              </div>
            </Tooltip>
          );
        }
      },
    ];

    // 根据Tab添加特定的列
    let specificColumns: ColumnItem[] = [];
    if (activeTab === 'fcl') {
      specificColumns = [
        { title: '箱型箱量', dataIndex: 'containerInfo', width: 160, sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      ];
    } else if (activeTab === 'lcl' || activeTab === 'air') {
      specificColumns = [
        { title: '重量(KGS)', dataIndex: 'weight', width: 120, sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
        { title: '体积(CBM)', dataIndex: 'volume', width: 120, sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      ];
    }

    // 公共后续列
    const commonColumns: ColumnItem[] = [
      { title: '货好时间', dataIndex: 'cargoReadyTime', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '货盘性质', dataIndex: 'cargoNature', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '船公司', dataIndex: 'shipCompany', width: 160, sorter: true, resizable: true, render: (val: string) => {
          if (val === '不指定') {
            return <Tooltip content="不指定" mini><span className="arco-ellipsis text-gray-400">不指定</span></Tooltip>;
          }
          return <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip>;
        }
      },
      { title: '直达/中转', dataIndex: 'transitType', sorter: true, resizable: true, render: (val: string) => {
          if (!val) {
            return <Tooltip content="不限" mini><span className="arco-ellipsis text-gray-400">不限</span></Tooltip>;
          }
          return <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip>;
        } 
      },
      { title: '航线', dataIndex: 'route', width: 150, sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '起运港', dataIndex: 'departurePort', width: 160, sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '卸货港', dataIndex: 'dischargePort', width: 160, sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '备注', dataIndex: 'remark', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '创建时间', dataIndex: 'createdAt', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '委托单位', dataIndex: 'clientType', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '委托单位名称', dataIndex: 'clientName', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      {
        title: '操作',
        dataIndex: 'operations',
        fixed: 'right' as const,
        width: 150,
        render: (_: unknown, record: { inquiryNo: string }) => (
          <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
            <div style={{display:'flex',gap:4,width:'100%'}}>
              <Button 
                type="text" 
                size="mini" 
                icon={<IconEye />} 
                onClick={() => navigate(`/saas/inquiry-detail/${activeTab}/${record.inquiryNo}`)}
              >
                查看
              </Button>
              <Button type="text" size="mini" icon={<IconEdit />}>编辑</Button>
            </div>
            <div style={{display:'flex',gap:4,width:'100%'}}>
              <Button type="text" size="mini" icon={<IconUndo />}>撤销</Button>
              <Dropdown
                droplist={
                  <Menu>
                    <Menu.Item key="delete"><IconDelete style={{marginRight:4}} />删除</Menu.Item>
                  </Menu>
                }
                position="br"
              >
                <Button type="text" size="mini" icon={<IconDown />}>更多</Button>
              </Dropdown>
            </div>
          </div>
        ),
      },
    ];

    return [...baseColumns, ...specificColumns, ...commonColumns];
  };
  
  const columns = getColumns();

  // 整箱数据
  const fclData: InquiryItem[] = [
    {
      inquiryNo: 'R20240001', source: '内部', inquirer: '张三', inquiryStatus: '草稿', firstQuoteStatus: '待报价', mainQuoteStatus: '待报价', lastQuoteStatus: '待报价', containerInfo: '1*20GP+2*40HC', cargoReadyTime: '1周内', cargoNature: '询价', shipCompany: '不指定', transitType: '直达', route: '跨太平洋东行', departurePort: 'CNSHA | Shanghai', dischargePort: 'USLAX | Los Angeles', remark: '电子产品 优先考虑直达航线', createdAt: '2024-05-10 08:30:15', clientType: '正式客户', clientName: '上海测试',
    },
    {
      inquiryNo: 'R20240002', source: '内部', inquirer: '李四', inquiryStatus: '已提交', firstQuoteStatus: '已报价', mainQuoteStatus: '已报价', lastQuoteStatus: '待报价', containerInfo: '3*40HC', cargoReadyTime: '2周内', cargoNature: '实单', shipCompany: 'COSCO | 中远海运', transitType: '', route: '跨太平洋东行', departurePort: 'CNTAO | Qingdao', dischargePort: 'USNYC | New York', remark: '需要温控设备', createdAt: '2024-05-10 09:45:22', clientType: '正式客户', clientName: '深圳测试',
    },
    {
      inquiryNo: 'R20240003', source: '内部', inquirer: '王五', inquiryStatus: '已提交', firstQuoteStatus: '已报价', mainQuoteStatus: '已报价', lastQuoteStatus: '已报价', containerInfo: '2*20GP', cargoReadyTime: '2024-06-15', cargoNature: '询价', shipCompany: '不指定', transitType: '直达', route: '远东西行', departurePort: 'CNNGB | Ningbo', dischargePort: 'DEHAM | Hamburg', remark: '', createdAt: '2024-05-10 10:15:30', clientType: '正式客户', clientName: '青岛测试',
    },
    {
      inquiryNo: 'R20240004', source: '内部', inquirer: '赵六', inquiryStatus: '草稿', firstQuoteStatus: '拒绝报价', mainQuoteStatus: '待报价', lastQuoteStatus: '待报价', containerInfo: '1*40HC+1*40HQ', cargoReadyTime: '1个月内', cargoNature: '实单', shipCompany: 'CMA | 达飞轮船', transitType: '', route: '远东西行', departurePort: 'CNXMN | Xiamen', dischargePort: 'GBFXT | Felixstowe', remark: '客户要求准班期', createdAt: '2024-05-10 10:20:45', clientType: '正式客户', clientName: '宁波测试',
    },
    {
      inquiryNo: 'R20240005', source: '内部', inquirer: '钱七', inquiryStatus: '草稿', firstQuoteStatus: '待报价', mainQuoteStatus: '待报价', lastQuoteStatus: '拒绝报价', containerInfo: '5*40GP', cargoReadyTime: '暂不确定', cargoNature: '询价', shipCompany: '不指定', transitType: '', route: '亚洲区域', departurePort: 'CNDLC | Dalian', dischargePort: 'SGSIN | Singapore', remark: '危险品6.1类', createdAt: '2024-05-10 10:25:10', clientType: '正式客户', clientName: '大连测试',
    },
  ];

  // 拼箱数据
  const lclData: InquiryItem[] = [
    {
      inquiryNo: 'L20240001', source: '内部', inquirer: '张三', inquiryStatus: '草稿', firstQuoteStatus: '待报价', mainQuoteStatus: '待报价', lastQuoteStatus: '待报价', weight: '1200', volume: '3.5', cargoReadyTime: '1周内', cargoNature: '询价', shipCompany: '不指定', transitType: '直达', route: '跨太平洋东行', departurePort: 'CNSHA | Shanghai', dischargePort: 'USLAX | Los Angeles', remark: '服装类产品', createdAt: '2024-05-12 08:30:15', clientType: '正式客户', clientName: '杭州测试',
    },
    {
      inquiryNo: 'L20240002', source: '内部', inquirer: '李四', inquiryStatus: '已提交', firstQuoteStatus: '已报价', mainQuoteStatus: '已报价', lastQuoteStatus: '待报价', weight: '850', volume: '2.1', cargoReadyTime: '2周内', cargoNature: '实单', shipCompany: 'COSCO | 中远海运', transitType: '', route: '跨太平洋东行', departurePort: 'CNTAO | Qingdao', dischargePort: 'USNYC | New York', remark: '鞋类产品', createdAt: '2024-05-12 09:45:22', clientType: '正式客户', clientName: '温州测试',
    },
    {
      inquiryNo: 'L20240003', source: '内部', inquirer: '王五', inquiryStatus: '已提交', firstQuoteStatus: '已报价', mainQuoteStatus: '已报价', lastQuoteStatus: '已报价', weight: '1500', volume: '4.8', cargoReadyTime: '2024-06-15', cargoNature: '询价', shipCompany: '不指定', transitType: '直达', route: '远东西行', departurePort: 'CNNGB | Ningbo', dischargePort: 'DEHAM | Hamburg', remark: '五金配件', createdAt: '2024-05-12 10:15:30', clientType: '正式客户', clientName: '宁波测试',
    },
  ];

  // 空运数据
  const airData: InquiryItem[] = [
    {
      inquiryNo: 'A20240001', source: '内部', inquirer: '张三', inquiryStatus: '草稿', firstQuoteStatus: '待报价', mainQuoteStatus: '待报价', lastQuoteStatus: '待报价', weight: '350', volume: '1.2', cargoReadyTime: '1周内', cargoNature: '询价', shipCompany: '不指定', transitType: '直达', route: '跨太平洋东行', departurePort: 'CNPVG | Shanghai Pudong', dischargePort: 'USLAX | Los Angeles', remark: '电子产品 紧急发货', createdAt: '2024-05-15 08:30:15', clientType: '正式客户', clientName: '上海电子',
    },
    {
      inquiryNo: 'A20240002', source: '内部', inquirer: '李四', inquiryStatus: '已提交', firstQuoteStatus: '已报价', mainQuoteStatus: '已报价', lastQuoteStatus: '待报价', weight: '120', volume: '0.5', cargoReadyTime: '3天内', cargoNature: '实单', shipCompany: 'CX | 国泰航空', transitType: '', route: '跨太平洋东行', departurePort: 'CNHKG | Hong Kong', dischargePort: 'USNYC | New York', remark: '医疗产品', createdAt: '2024-05-15 09:45:22', clientType: '正式客户', clientName: '深圳医疗',
    },
  ];

  // 根据当前Tab获取对应数据
  const getCurrentData = () => {
    switch(activeTab) {
      case 'fcl':
        return fclData;
      case 'lcl':
        return lclData;
      case 'air':
        return airData;
      default:
        return fclData;
    }
  };
  
  const data = getCurrentData();

  // 自定义表格字段
  const getFieldList = () => {
    // 基础字段（所有类型共有）
    const baseFields: {label: string, key: string}[] = [
      { label: '询价编号', key: 'inquiryNo' },
      { label: '询价来源', key: 'source' },
      { label: '询价人', key: 'inquirer' },
      { label: '询价状态', key: 'inquiryStatus' },
      { label: '头程报价状态', key: 'firstQuoteStatus' },
      { label: '干线报价状态', key: 'mainQuoteStatus' },
      { label: '尾程报价状态', key: 'lastQuoteStatus' },
    ];
    
    // 特定类型字段
    let specificFields: {label: string, key: string}[] = [];
    if (activeTab === 'fcl') {
      specificFields = [
        { label: '箱型箱量', key: 'containerInfo' },
      ];
    } else if (activeTab === 'lcl' || activeTab === 'air') {
      specificFields = [
        { label: '重量(KGS)', key: 'weight' },
        { label: '体积(CBM)', key: 'volume' },
      ];
    }
    
    // 公共后续字段
    const commonFields: {label: string, key: string}[] = [
      { label: '货好时间', key: 'cargoReadyTime' },
      { label: '货盘性质', key: 'cargoNature' },
      { label: '船公司', key: 'shipCompany' },
      { label: '直达/中转', key: 'transitType' },
      { label: '航线', key: 'route' },
      { label: '起运港', key: 'departurePort' },
      { label: '卸货港', key: 'dischargePort' },
      { label: '备注', key: 'remark' },
      { label: '创建时间', key: 'createdAt' },
      { label: '委托单位', key: 'clientType' },
      { label: '委托单位名称', key: 'clientName' },
    ];
    
    return [...baseFields, ...specificFields, ...commonFields];
  };
  
  const fieldList = getFieldList();

  // 自定义表格弹窗字段开关 - 监听activeTab变化时更新
  const [customFields, setCustomFields] = useState<{[key:string]: boolean}>(
    Object.fromEntries(getFieldList().map(f => [f.key, true]))
  );
  
  // 当Tab变化时，重置自定义字段
  useEffect(() => {
    setCustomFields(Object.fromEntries(fieldList.map(f => [f.key, true])));
  }, [activeTab]);
  
  const handleFieldSwitch = (key: string, checked: boolean) => {
    setCustomFields({ ...customFields, [key]: checked });
  };
  
  const resetCustomFields = () => {
    setCustomFields(Object.fromEntries(fieldList.map(f => [f.key, true])));
  };

  const pagination = {
    showTotal: true,
    total: data.length,
    pageSize,
    current,
    showJumper: true,
    sizeCanChange: true,
    pageSizeChangeResetCurrent: true,
    sizeOptions: [10, 20, 50, 100],
    onChange: (page: number) => setCurrent(page),
    onPageSizeChange: (size: number) => setPageSize(size),
  };

  return (
    <SaasLayout menuSelectedKey="9" breadcrumb={
      <Breadcrumb>
        <Breadcrumb.Item>询价报价</Breadcrumb.Item>
        <Breadcrumb.Item>询价管理</Breadcrumb.Item>
      </Breadcrumb>
    }>
      <Card className="mb-4">
        <Title heading={6} className="mb-4">筛选条件</Title>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* 第一行 */}
          <div>
            <div className="text-gray-500 text-sm mb-1">约号</div>
            <Select placeholder="等于" style={{ width: '100%' }} allowClear />
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">船公司</div>
            <Select placeholder="等于" style={{ width: '100%' }} allowClear />
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">询价来源</div>
            <Select placeholder="等于" style={{ width: '100%' }} allowClear />
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">干线报价状态</div>
            <Select placeholder="等于" style={{ width: '100%' }} allowClear />
          </div>
          {/* 第二行 */}
          <div>
            <div className="text-gray-500 text-sm mb-1">头程报价状态</div>
            <Select placeholder="等于" style={{ width: '100%' }} allowClear />
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">尾程报价状态</div>
            <Select placeholder="等于" style={{ width: '100%' }} allowClear />
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">询价状态</div>
            <Select placeholder="等于" style={{ width: '100%' }} allowClear />
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">货好时间</div>
            <Select placeholder="等于" style={{ width: '100%' }} allowClear />
          </div>
          {/* 第三行 */}
          <div>
            <div className="text-gray-500 text-sm mb-1">询价人</div>
            <Select placeholder="等于" style={{ width: '100%' }} allowClear />
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">货盘性质</div>
            <Select placeholder="等于" style={{ width: '100%' }} allowClear />
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">直达/中转</div>
            <Select placeholder="等于" style={{ width: '100%' }} allowClear />
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">航线</div>
            <Select placeholder="等于" style={{ width: '100%' }} allowClear />
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">起运港</div>
            <Select placeholder="等于" style={{ width: '100%' }} allowClear />
          </div>
          {/* 第四行 */}
          <div>
            <div className="text-gray-500 text-sm mb-1">卸货港</div>
            <Select placeholder="等于" style={{ width: '100%' }} allowClear />
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">创建时间</div>
            <Select placeholder="等于" style={{ width: '100%' }} allowClear />
          </div>
          <div>
            <div className="text-gray-500 text-sm mb-1">委托单位名称</div>
            <Select placeholder="等于" style={{ width: '100%' }} allowClear />
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
        <Tabs activeTab={activeTab} onChange={handleTabChange} className="mb-4">
          <TabPane key="fcl" title="海运整箱" />
          <TabPane key="lcl" title="海运拼箱" />
          <TabPane key="air" title="空运" />
        </Tabs>
        <div className="flex justify-between mb-4">
          <Space>
            {/* 新增询价按钮 - 直接使用当前Tab类型 */}
            <Button 
              type="primary" 
              icon={<IconPlus />} 
              onClick={navigateToInquiryForm}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {activeTab === 'fcl' ? '新增整箱询价' : 
               activeTab === 'lcl' ? '新增拼箱询价' : '新增空运询价'}
            </Button>
            
            {/* 导出列表按钮 */}
            <Button icon={<IconDownload />}>导出列表</Button>
          </Space>
          <div 
            className="flex items-center text-blue-500 cursor-pointer hover:text-blue-700"
            onClick={() => setCustomTableModalVisible(true)}
          >
            <IconList className="mr-1" />
            <span>自定义表格</span>
          </div>
        </div>
        <Table
          rowKey="inquiryNo"
          loading={false}
          columns={columns}
          data={data}
          rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
          pagination={pagination}
          scroll={{ x: 2800 }}
          border={false}
          className="mt-4 inquiry-table-nowrap"
        />
        <div className="mt-2 text-gray-500 text-sm">共 {data.length} 条记录，每页 {pageSize} 条，共 {Math.ceil(data.length / pageSize)} 页</div>
      </Card>
      {/* 自定义表格弹窗 */}
      <Modal
        title="表头设置"
        visible={customTableModalVisible}
        onCancel={() => setCustomTableModalVisible(false)}
        footer={[
          <Button key="reset" onClick={resetCustomFields} style={{ float: 'left' }}>重置</Button>,
          <Button key="cancel" onClick={() => setCustomTableModalVisible(false)}>取消</Button>,
          <Button key="apply" type="primary" onClick={() => setCustomTableModalVisible(false)}>确认</Button>,
        ]}
        style={{ width: 800 }}
      >
        <div className="p-4">
          <Row gutter={[16, 16]}>
            {fieldList.map((field) => (
              <Col span={8} key={field.key}>
                <div className="custom-column-item border border-gray-200 rounded p-4 mt-3">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <IconDragDotVertical className="text-gray-400 mr-2" />
                      <span>{field.label}</span>
                    </div>
                    <Switch checked={customFields[field.key]} onChange={checked => handleFieldSwitch(field.key, checked)} />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Modal>
    </SaasLayout>
  );
};

export default InquiryManagement; 