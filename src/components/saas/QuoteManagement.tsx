import React, { useState, useEffect } from 'react';
import { Card, Breadcrumb, Typography, Button, Space, Select, Table, Modal, Grid, Switch, Tooltip, Tabs } from '@arco-design/web-react';
import { IconSearch, IconRefresh, IconFilter, IconList, IconDragDotVertical, IconEdit, IconDelete, IconDownload, IconEye, IconPlus } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import SaasLayout from './SaasLayout';
import './InquiryManagement.css';

const Title = Typography.Title;
const TabPane = Tabs.TabPane;

const Row = Grid.Row;
const Col = Grid.Col;

// 定义报价项接口
interface QuoteItem {
  quoteNo: string;
  inquiryNo: string;
  source: string;
  quoter: string;
  quoteStatus: string;
  firstQuoteStatus: string;
  mainQuoteStatus: string;
  lastQuoteStatus: string;
  validityDate: string;
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
  render?: (value: string, record: QuoteItem) => React.ReactNode;
}

const QuoteManagement: React.FC = () => {
  // 筛选项状态
  const [customTableModalVisible, setCustomTableModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);
  const onSelectChange = (keys: (string | number)[]) => setSelectedRowKeys(keys);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  
  // 当前选中的Tab
  const [activeTab, setActiveTab] = useState<string>('fcl');

  // 导航到报价页面
  const navigateToQuoteForm = () => {
    // 根据当前选中的Tab类型跳转到对应页面
    switch(activeTab) {
      case 'fcl':
        navigate('/saas/create-quote/fcl');
        break;
      case 'lcl':
        navigate('/saas/create-quote/lcl');
        break;
      case 'air':
        navigate('/saas/create-quote/air');
        break;
      default:
        navigate('/saas/create-quote/fcl');
    }
  };

  // 处理Tab切换
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    // 重置分页和选中项
    setCurrent(1);
    setSelectedRowKeys([]);
  };

  // 筛选区收起/展开状态
  const [filterCollapsed, setFilterCollapsed] = useState(false);

  // 切换筛选区收起/展开
  const toggleFilterCollapse = () => {
    setFilterCollapsed(!filterCollapsed);
  };

  // 根据Tab获取当前要显示的列
  const getColumns = () => {
    // 基础列（所有类型共有）
    const baseColumns: ColumnItem[] = [
      { title: '报价编号', dataIndex: 'quoteNo', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '询价编号', dataIndex: 'inquiryNo', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '报价来源', dataIndex: 'source', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '报价人', dataIndex: 'quoter', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { 
        title: '报价状态', 
        dataIndex: 'quoteStatus', 
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
            case '已过期':
              color = '#F7BA1E'; // 黄色
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
      { title: '有效期', dataIndex: 'validityDate', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '货盘性质', dataIndex: 'cargoNature', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '船公司', dataIndex: 'shipCompany', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '直达/中转', dataIndex: 'transitType', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '航线', dataIndex: 'route', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '起运港', dataIndex: 'departurePort', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '卸货港', dataIndex: 'dischargePort', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '备注', dataIndex: 'remark', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '创建时间', dataIndex: 'createdAt', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '委托单位', dataIndex: 'clientType', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      { title: '委托单位名称', dataIndex: 'clientName', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
    ];

    // 根据Tab类型添加特定列
    let specificColumns: ColumnItem[] = [];
    if (activeTab === 'fcl') {
      specificColumns = [
        { title: '箱型箱量', dataIndex: 'containerInfo', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      ];
    } else if (activeTab === 'lcl' || activeTab === 'air') {
      specificColumns = [
        { title: '重量', dataIndex: 'weight', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
        { title: '体积', dataIndex: 'volume', sorter: true, resizable: true, render: (val: string) => <Tooltip content={val} mini><span className="arco-ellipsis">{val}</span></Tooltip> },
      ];
    }

    // 操作列
    const actionColumn: ColumnItem = {
      title: '操作',
      fixed: 'right',
      width: 200,
      render: () => (
        <Space>
          <Button type="text" size="small" icon={<IconEye />}>查看</Button>
          <Button type="text" size="small" icon={<IconEdit />}>编辑</Button>
          <Button type="text" size="small" icon={<IconDelete />} status="danger">删除</Button>
        </Space>
      ),
    };

    return [...baseColumns, ...specificColumns, actionColumn];
  };

  const columns = getColumns();

  // Mock数据
  const mockData: QuoteItem[] = [
    {
      quoteNo: 'QT2024050001',
      inquiryNo: 'INQ2024050001',
      source: '客户询价',
      quoter: '张三',
      quoteStatus: '已提交',
      firstQuoteStatus: '已报价',
      mainQuoteStatus: '已报价',
      lastQuoteStatus: '待报价',
      validityDate: '2024-06-30',
      cargoNature: '普货',
      shipCompany: 'COSCO',
      transitType: '直达',
      route: '中国-美国',
      departurePort: 'CNSHA',
      dischargePort: 'USLAX',
      remark: '客户要求快船',
      createdAt: '2024-05-01 10:30:00',
      clientType: '直客',
      clientName: '上海贸易有限公司',
      containerInfo: '20GP*2, 40HC*1',
    },
    {
      quoteNo: 'QT2024050002',
      inquiryNo: 'INQ2024050002',
      source: '平台询价',
      quoter: '李四',
      quoteStatus: '草稿',
      firstQuoteStatus: '待报价',
      mainQuoteStatus: '已报价',
      lastQuoteStatus: '已报价',
      validityDate: '2024-07-15',
      cargoNature: '危险品',
      shipCompany: 'MSK',
      transitType: '中转',
      route: '中国-欧洲',
      departurePort: 'CNNGB',
      dischargePort: 'DEHAM',
      remark: '需要危险品证书',
      createdAt: '2024-05-02 14:20:00',
      clientType: '货代',
      clientName: '德国物流公司',
      weight: '15.5吨',
      volume: '25.8立方米',
    },
    {
      quoteNo: 'QT2024050003',
      inquiryNo: 'INQ2024050003',
      source: '系统询价',
      quoter: '王五',
      quoteStatus: '已过期',
      firstQuoteStatus: '已报价',
      mainQuoteStatus: '已报价',
      lastQuoteStatus: '拒绝报价',
      validityDate: '2024-05-20',
      cargoNature: '普货',
      shipCompany: 'ONE',
      transitType: '直达',
      route: '中国-日本',
      departurePort: 'CNSHA',
      dischargePort: 'JPTYO',
      remark: '价格敏感客户',
      createdAt: '2024-05-03 09:15:00',
      clientType: '直客',
      clientName: '东京贸易株式会社',
      containerInfo: '40HC*3',
    },
    {
      quoteNo: 'QT2024050004',
      inquiryNo: 'INQ2024050004',
      source: '客户询价',
      quoter: '赵六',
      quoteStatus: '已撤回',
      firstQuoteStatus: '拒绝报价',
      mainQuoteStatus: '待报价',
      lastQuoteStatus: '待报价',
      validityDate: '2024-08-01',
      cargoNature: '冷冻品',
      shipCompany: 'CMA',
      transitType: '中转',
      route: '中国-澳洲',
      departurePort: 'CNQIN',
      dischargePort: 'AUSYD',
      remark: '需要冷链运输',
      createdAt: '2024-05-04 16:45:00',
      clientType: '货代',
      clientName: '澳洲物流有限公司',
      weight: '22.3吨',
      volume: '18.5立方米',
    },
  ];

  const getCurrentData = () => {
    return mockData;
  };

  const data = getCurrentData();

  // 获取字段列表用于自定义表格
  const getFieldList = () => {
    // 基础字段
    const baseFields = [
      { label: '报价编号', key: 'quoteNo' },
      { label: '询价编号', key: 'inquiryNo' },
      { label: '报价来源', key: 'source' },
      { label: '报价人', key: 'quoter' },
      { label: '报价状态', key: 'quoteStatus' },
      { label: '头程报价状态', key: 'firstQuoteStatus' },
      { label: '干线报价状态', key: 'mainQuoteStatus' },
      { label: '尾程报价状态', key: 'lastQuoteStatus' },
      { label: '有效期', key: 'validityDate' },
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
    
    // 根据Tab类型添加特定字段
    let specificFields: { label: string; key: string }[] = [];
    if (activeTab === 'fcl') {
      specificFields = [
        { label: '箱型箱量', key: 'containerInfo' },
      ];
    } else if (activeTab === 'lcl' || activeTab === 'air') {
      specificFields = [
        { label: '重量', key: 'weight' },
        { label: '体积', key: 'volume' },
      ];
    }
    
    return [...baseFields, ...specificFields];
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
    <SaasLayout menuSelectedKey="10" breadcrumb={
      <Breadcrumb>
        <Breadcrumb.Item>询价报价</Breadcrumb.Item>
        <Breadcrumb.Item>报价管理</Breadcrumb.Item>
      </Breadcrumb>
    }>
      <Card>
        <Tabs activeTab={activeTab} onChange={handleTabChange} className="mb-4">
          <TabPane key="fcl" title="整箱报价" />
          <TabPane key="lcl" title="拼箱报价" />
          <TabPane key="air" title="空运报价" />
          <TabPane key="precarriage" title="港前报价" />
          <TabPane key="oncarriage" title="尾程报价" />
        </Tabs>
        <Card className="mb-4">
          <Title heading={6} className="mb-4">筛选条件</Title>
          {!filterCollapsed && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* 第一行 */}
              <div>
                <div className="text-gray-500 text-sm mb-1">报价编号</div>
                <Select placeholder="等于" style={{ width: '100%' }} allowClear />
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">询价编号</div>
                <Select placeholder="等于" style={{ width: '100%' }} allowClear />
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">船公司</div>
                <Select placeholder="等于" style={{ width: '100%' }} allowClear />
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">报价来源</div>
                <Select placeholder="等于" style={{ width: '100%' }} allowClear />
              </div>
              {/* 第二行 */}
              <div>
                <div className="text-gray-500 text-sm mb-1">干线报价状态</div>
                <Select placeholder="等于" style={{ width: '100%' }} allowClear />
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">头程报价状态</div>
                <Select placeholder="等于" style={{ width: '100%' }} allowClear />
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">尾程报价状态</div>
                <Select placeholder="等于" style={{ width: '100%' }} allowClear />
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">报价状态</div>
                <Select placeholder="等于" style={{ width: '100%' }} allowClear />
              </div>
              {/* 第三行 */}
              <div>
                <div className="text-gray-500 text-sm mb-1">有效期</div>
                <Select placeholder="等于" style={{ width: '100%' }} allowClear />
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">报价人</div>
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
              {/* 第四行 */}
              <div>
                <div className="text-gray-500 text-sm mb-1">起运港</div>
                <Select placeholder="等于" style={{ width: '100%' }} allowClear />
              </div>
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
              {/* 新增报价按钮 - 直接使用当前Tab类型 */}
              <Button 
                type="primary" 
                icon={<IconPlus />} 
                onClick={navigateToQuoteForm}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {activeTab === 'fcl' ? '新增整箱报价' : 
                 activeTab === 'lcl' ? '新增拼箱报价' : 
                 activeTab === 'air' ? '新增空运报价' :
                 activeTab === 'precarriage' ? '新增港前报价' : '新增尾程报价'}
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
            rowKey="quoteNo"
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
      </Card>
    </SaasLayout>
  );
};

export default QuoteManagement;     