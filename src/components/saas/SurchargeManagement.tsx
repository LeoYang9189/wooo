import React, { useState } from 'react';
import {
  Card,
  Button,
  Space,
  Table,
  Input,
  Select,
  DatePicker,
  Message,
  Typography,
  Tag,
  Dropdown
} from '@arco-design/web-react';
import type { CalendarValue } from '@arco-design/web-react/es/DatePicker/interface';
import {
  IconPlus,
  IconSearch,
  IconRefresh,
  IconMore
} from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// 附加费数据接口
interface SurchargeData {
  id: string;
  code: string; // 费用编号
  usageLocation: string; // 适用地点
  company: string; // 船公司
  usageLine: string; // 适用航线
  usageStatus: 'active' | 'inactive'; // 费用状态
  usageUser: string; // 费用用户
  updateTime: string; // 更新时间
}

// 模拟数据
const mockData: SurchargeData[] = [
  {
    id: 'LESE00000048',
    code: 'LESE00000048',
    usageLocation: 'Shanghai',
    company: '商汇',
    usageLine: '东南亚线',
    usageStatus: 'active',
    usageUser: '李海峰',
    updateTime: '2025-04-16 14:05'
  },
  {
    id: 'LESE00000047',
    code: 'LESE00000047',
    usageLocation: 'Shanghai',
    company: '阿联酋航运',
    usageLine: '地中海线',
    usageStatus: 'active',
    usageUser: '李海峰',
    updateTime: '2025-03-06 14:40'
  }
];

const SurchargeManagement: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<SurchargeData[]>(mockData);
  const [loading, setLoading] = useState(false);
  const [searchForm, setSearchForm] = useState({
    usageLocation: '',
    company: '',
    usageUser: '',
    dateRange: undefined as CalendarValue[] | undefined
  });

  // 搜索处理
  const handleSearch = () => {
    setLoading(true);
    // 模拟搜索
    setTimeout(() => {
      setLoading(false);
      Message.success('搜索完成');
    }, 1000);
  };

  // 重置搜索
  const handleReset = () => {
    setSearchForm({
      usageLocation: '',
      company: '',
      usageUser: '',
      dateRange: undefined
    });
    setData(mockData);
  };

  // 查看详情
  const handleView = (id: string) => {
    navigate(`/controltower/saas/surcharge/view/${id}`);
  };

  // 编辑附加费
  const handleEdit = (id: string) => {
    navigate(`/controltower/saas/surcharge/edit/${id}`);
  };

  // 切换状态（禁用/启用）
  const handleToggleStatus = (id: string, currentStatus: 'active' | 'inactive') => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    setData(prev => prev.map(item => 
      item.id === id ? { ...item, usageStatus: newStatus } : item
    ));
    Message.success(newStatus === 'active' ? '启用成功' : '禁用成功');
  };

  // 新增附加费
  const handleAdd = () => {
    navigate('/controltower/saas/surcharge/add');
  };

  // 表格列定义
  const columns = [
    {
      title: '费用编号',
      dataIndex: 'code',
      key: 'code',
      width: 150,
    },
    {
      title: '适用起运港',
      dataIndex: 'usageLocation',
      key: 'usageLocation',
      width: 120,
    },
    {
      title: '船公司',
      dataIndex: 'company',
      key: 'company',
      width: 120,
    },
    {
      title: '适用航线',
      dataIndex: 'usageLine',
      key: 'usageLine',
      width: 150,
      render: (text: string) => (
        <div>
          {text.split('、').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      )
    },
    {
      title: '费用状态',
      dataIndex: 'usageStatus',
      key: 'usageStatus',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '正常' : '停用'}
        </Tag>
      )
    },
    {
      title: '更新用户',
      dataIndex: 'usageUser',
      key: 'usageUser',
      width: 100,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: unknown, record: SurchargeData) => {
        const moreMenuItems = [
          {
            key: 'toggle-status',
            title: record.usageStatus === 'active' ? '禁用' : '启用',
            onClick: () => handleToggleStatus(record.id, record.usageStatus)
          }
        ];

        return (
          <Space>
            <Button
              type="text"
              size="small"
              onClick={() => handleView(record.id)}
            >
              详情
            </Button>
            <Button
              type="text"
              size="small"
              onClick={() => handleEdit(record.id)}
            >
              编辑
            </Button>
            <Dropdown
              droplist={
                <div style={{ padding: '4px 0' }}>
                  {moreMenuItems.map(item => (
                    <div
                      key={item.key}
                      style={{
                        padding: '8px 12px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                      onClick={item.onClick}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f5f5f5';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              }
              position="bottom"
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
        );
      },
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Card>
        <div style={{ marginBottom: '20px' }}>
          <Title heading={4}>附加费维护</Title>
        </div>

        {/* 搜索区域 */}
        <Card style={{ marginBottom: '20px' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px', 
            alignItems: 'center' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ minWidth: '80px' }}>适用起运港:</span>
              <Select
                placeholder="请选择"
                style={{ flex: 1 }}
                value={searchForm.usageLocation}
                onChange={(value) => setSearchForm(prev => ({ ...prev, usageLocation: value }))}
                allowClear
              >
                <Option value="Shanghai">Shanghai</Option>
                <Option value="Ningbo">Ningbo</Option>
                <Option value="Shenzhen">Shenzhen</Option>
              </Select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ minWidth: '60px' }}>船公司:</span>
              <Select
                placeholder="请选择"
                style={{ flex: 1 }}
                value={searchForm.company}
                onChange={(value) => setSearchForm(prev => ({ ...prev, company: value }))}
                allowClear
              >
                <Option value="商汇">商汇</Option>
                <Option value="阿联酋航运">阿联酋航运</Option>
                <Option value="马士基">马士基</Option>
              </Select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ minWidth: '70px' }}>更新用户:</span>
              <Input
                placeholder="请输入"
                style={{ flex: 1 }}
                value={searchForm.usageUser}
                onChange={(value) => setSearchForm(prev => ({ ...prev, usageUser: value }))}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ minWidth: '50px' }}>有效期:</span>
              <RangePicker
                style={{ flex: 1 }}
                value={searchForm.dateRange}
                onChange={(value) => setSearchForm(prev => ({ ...prev, dateRange: value }))}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <Button type="primary" icon={<IconSearch />} onClick={handleSearch}>
                查询
              </Button>
              <Button icon={<IconRefresh />} onClick={handleReset}>
                重置
              </Button>
            </div>
          </div>


        </Card>

        {/* 操作按钮 */}
        <div style={{ marginBottom: '20px' }}>
          <Button type="primary" icon={<IconPlus />} onClick={handleAdd}>
            新增附加费
          </Button>
        </div>

        {/* 数据表格 */}
        <Table
          columns={columns}
          data={data}
          loading={loading}
          pagination={{
            total: data.length,
            pageSize: 10,
            showTotal: true,
            showJumper: true,
            sizeCanChange: true,
          }}
          rowKey="id"
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default SurchargeManagement; 