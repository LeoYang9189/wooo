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
  Menu
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
  IconList,
  IconDragDotVertical,
  IconMore,
  IconCopy,
  IconEye,
  IconToTop
} from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import SaasLayout from './SaasLayout';
import './InquiryManagement.css';

const Title = Typography.Title;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const Row = Grid.Row;
const Col = Grid.Col;

// 定义状态类型和对应颜色
/* 未使用的常量
const StatusColors: Record<string, string> = {
  '正常': 'green',
  '过期': 'gray',
  '下架': 'red'
};
*/

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
  destination: string; // 目的港
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
    remark: true
  });
  const navigate = useNavigate();

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
      remark: true
    });
  };

  const onSelectChange = (selectedRowKeys: (string | number)[]) => {
    setSelectedRowKeys(selectedRowKeys);
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
      title: '目的港',
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
      remark: ''
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
      remark: ''
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
      remark: '需提前24小时预约'
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
      remark: ''
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
      remark: '周一、周四发船'
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
      remark: '已停运'
    }
  ];

  // 筛选项列表
  const filterItems = [
    { 
      label: '运价类型', 
      placeholder: '请选择运价类型', 
      options: ['直拖', '支线'] 
    },
    { 
      label: '支线类型', 
      placeholder: '请选择支线类型', 
      options: ['湖州海铁', '海宁支线', '乍浦支线'] 
    },
    { 
      label: '起运地', 
      placeholder: '请选择起运地' 
    },
    { 
      label: '目的港', 
      placeholder: '请选择目的港',
      options: ['CNSHA | SHANGHAI', 'CNNGB | NINGBO']
    },
    { 
      label: '码头', 
      placeholder: '请选择码头',
      options: ['洋山', '外高桥', '北仑']
    },
    { 
      label: '有效期', 
      type: 'dateRange' 
    },
    { 
      label: '状态', 
      placeholder: '请选择状态',
      options: ['正常', '过期', '下架']
    }
  ];

  // 列配置项
  const columnConfigList = [
    { label: '港前运价编号', key: 'code' },
    { label: '运价类型', key: 'rateType' },
    { label: '支线类型', key: 'sublineType' },
    { label: '起运地', key: 'origin' },
    { label: '目的港', key: 'destination' },
    { label: '码头', key: 'terminal' },
    { label: '供应商', key: 'vendor' },
    { label: '20GP', key: '20gp' },
    { label: '40GP', key: '40gp' },
    { label: '40HC', key: '40hc' },
    { label: '40NOR', key: '40nor' },
    { label: '45HC', key: '45hc' },
    { label: '有效期', key: 'validDateRange' },
    { label: '状态', key: 'status' },
    { label: '备注', key: 'remark' }
  ];

  // 新增港前运价
  const handleCreatePrecarriageRate = () => {
    navigate('/saas/create-precarriage-rate');
  };

  return (
    <SaasLayout 
      menuSelectedKey="22" 
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>门点服务管理</Breadcrumb.Item>
          <Breadcrumb.Item>港前运价</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      {/* 筛选条件卡片 */}
      <Card className="mb-4">
        <Title heading={6} className="mb-4">筛选条件</Title>
        <Row gutter={[16, 16]}>
          {filterItems.map((item, index) => (
            <Col span={6} key={index}>
              <div className="mb-2 text-gray-600 text-sm">{item.label}</div>
              {item.type === 'dateRange' ? (
                <RangePicker style={{ width: '100%' }} />
              ) : (
                <Select placeholder={item.placeholder} allowClear style={{ width: '100%' }}>
                  {item.options?.map(option => (
                    <Option key={option} value={option}>{option}</Option>
                  ))}
                </Select>
              )}
            </Col>
          ))}
        </Row>
        <div className="flex justify-end mt-4">
          <Space>
            <Button type="primary" icon={<IconSearch />}>查询</Button>
            <Button icon={<IconRefresh />}>重置</Button>
            <Button icon={<IconFilter />}>收起</Button>
          </Space>
        </div>
      </Card>

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
    </SaasLayout>
  );
};

export default PrecarriageRates; 