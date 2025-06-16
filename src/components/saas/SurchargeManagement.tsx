import React, { useState } from 'react';
import {
  Card,
  Button,
  Space,
  Table,
  Select,
  DatePicker,
  Message,
  Typography,
  Tag,
  Dropdown,
  Tabs,
  Modal,
  Tooltip
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
const { TabPane } = Tabs;

// 生成8位随机费用ID
const generateSurchargeId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// 附加费类型枚举
type SurchargeType = 'fcl' | 'lcl' | 'air';

// 附加费类型选项
const surchargeTypeOptions = [
  { key: 'fcl', title: '整箱附加费' },
  { key: 'lcl', title: '拼箱附加费' },
  { key: 'air', title: '空运附加费' }
];

// 附加费数据接口
interface SurchargeData {
  id: string;
  code: string; // 费用ID - 8位数字字母随机组合
  usageLocation: string; // 适用地点
  company: string; // 船公司/航空公司
  usageLine: string; // 适用航线
  usageStatus: 'active' | 'inactive' | 'expired'; // 费用状态：正常、禁用、过期
  updateTime: string; // 更新时间
  type: SurchargeType; // 附加费类型
}

// 模拟数据
const mockData: SurchargeData[] = [
  // 整箱附加费
  {
    id: 'LESE00000048',
    code: generateSurchargeId(),
    usageLocation: 'Shanghai',
    company: '商汇',
    usageLine: '东南亚线,日韩线,东南亚干线,泰国线,越南线',
    usageStatus: 'active',
    updateTime: '2025-04-16 14:05',
    type: 'fcl'
  },
  {
    id: 'LESE00000047',
    code: generateSurchargeId(),
    usageLocation: 'Shanghai',
    company: '阿联酋航运',
    usageLine: '地中海线,欧洲线,地中海东线,地中海西线,黑海线,北非线',
    usageStatus: 'active',
    updateTime: '2025-03-06 14:40',
    type: 'fcl'
  },
  {
    id: 'LESE00000046',
    code: generateSurchargeId(),
    usageLocation: 'Ningbo',
    company: 'MAERSK',
    usageLine: '欧洲线,北欧线',
    usageStatus: 'expired',
    updateTime: '2025-03-01 10:20',
    type: 'fcl'
  },
  {
    id: 'LESE00000060',
    code: generateSurchargeId(),
    usageLocation: 'Shenzhen',
    company: 'EVERGREEN',
    usageLine: '美西线,美东线,美国内陆线,加拿大线,墨西哥线,南美西线,南美东线',
    usageStatus: 'active',
    updateTime: '2025-04-18 09:30',
    type: 'fcl'
  },
  {
    id: 'LESE00000061',
    code: generateSurchargeId(),
    usageLocation: 'Tianjin',
    company: 'CMA CGM',
    usageLine: '中东线',
    usageStatus: 'active',
    updateTime: '2025-04-17 16:45',
    type: 'fcl'
  },
  // 拼箱附加费
  {
    id: 'LESE00000049',
    code: generateSurchargeId(),
    usageLocation: 'Ningbo',
    company: '马士基',
    usageLine: '欧洲线,地中海线,北欧线,西地中海线,东地中海线,意大利线',
    usageStatus: 'active',
    updateTime: '2025-04-15 10:30',
    type: 'lcl'
  },
  {
    id: 'LESE00000050',
    code: generateSurchargeId(),
    usageLocation: 'Shenzhen',
    company: 'COSCO',
    usageLine: '美西线,美东线',
    usageStatus: 'inactive',
    updateTime: '2025-04-14 16:20',
    type: 'lcl'
  },
  {
    id: 'LESE00000045',
    code: generateSurchargeId(),
    usageLocation: 'Shanghai',
    company: 'CMA CGM',
    usageLine: '地中海线,西非线,东非线,南非线',
    usageStatus: 'expired',
    updateTime: '2025-02-28 15:30',
    type: 'lcl'
  },
  {
    id: 'LESE00000062',
    code: generateSurchargeId(),
    usageLocation: 'Guangzhou',
    company: 'ONE',
    usageLine: '澳洲线,新西兰线,澳洲内陆线,塔斯马尼亚线,太平洋岛国线',
    usageStatus: 'active',
    updateTime: '2025-04-16 11:20',
    type: 'lcl'
  },
  {
    id: 'LESE00000063',
    code: generateSurchargeId(),
    usageLocation: 'Xiamen',
    company: 'YANG MING',
    usageLine: '印度线,巴基斯坦线,孟加拉线',
    usageStatus: 'active',
    updateTime: '2025-04-15 14:10',
    type: 'lcl'
  },
  // 空运附加费
  {
    id: 'LESE00000051',
    code: generateSurchargeId(),
    usageLocation: 'Shanghai',
    company: '国航货运',
    usageLine: '欧洲航线,德国航线,法国航线,英国航线,意大利航线,西班牙航线,荷兰航线',
    usageStatus: 'active',
    updateTime: '2025-04-13 14:15',
    type: 'air'
  },
  {
    id: 'LESE00000052',
    code: generateSurchargeId(),
    usageLocation: 'Beijing',
    company: '东航货运',
    usageLine: '美洲航线,美西航线,美东航线',
    usageStatus: 'active',
    updateTime: '2025-04-12 09:45',
    type: 'air'
  },
  {
    id: 'LESE00000044',
    code: generateSurchargeId(),
    usageLocation: 'Guangzhou',
    company: '南航货运',
    usageLine: '澳洲航线,新西兰航线',
    usageStatus: 'inactive',
    updateTime: '2025-04-10 11:20',
    type: 'air'
  },
  {
    id: 'LESE00000064',
    code: generateSurchargeId(),
    usageLocation: 'Chengdu',
    company: '川航货运',
    usageLine: '东南亚航线,泰国航线,越南航线,新加坡航线,马来西亚航线,印尼航线',
    usageStatus: 'active',
    updateTime: '2025-04-14 13:30',
    type: 'air'
  },
  {
    id: 'LESE00000065',
    code: generateSurchargeId(),
    usageLocation: 'Shenzhen',
    company: '顺丰航空',
    usageLine: '日韩航线',
    usageStatus: 'active',
    updateTime: '2025-04-13 10:15',
    type: 'air'
  },
  {
    id: 'LESE00000066',
    code: generateSurchargeId(),
    usageLocation: 'Hangzhou',
    company: '长龙航空',
    usageLine: '中东航线,迪拜航线,卡塔尔航线,沙特航线,科威特航线',
    usageStatus: 'active',
    updateTime: '2025-04-12 15:45',
    type: 'air'
  }
];

const SurchargeManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeSurchargeType, setActiveSurchargeType] = useState<SurchargeType>('fcl');
  const [allData] = useState<SurchargeData[]>(mockData);
  const [filteredData, setFilteredData] = useState<SurchargeData[]>(mockData.filter(item => item.type === 'fcl'));
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  // 确认弹窗相关状态
  const [toggleStatusModalVisible, setToggleStatusModalVisible] = useState(false);
  const [batchToggleModalVisible, setBatchToggleModalVisible] = useState(false);
  const [pendingToggleRule, setPendingToggleRule] = useState<{ id: string; currentStatus: 'active' | 'inactive' | 'expired' } | null>(null);
  const [pendingBatchToggleStatus, setPendingBatchToggleStatus] = useState<'active' | 'inactive' | null>(null);
  
  const [searchForm, setSearchForm] = useState({
    usageLocation: '',
    company: '',
    status: '',
    dateRange: undefined as CalendarValue[] | undefined
  });

  // Tab切换处理
  const handleSurchargeTypeChange = (type: string) => {
    const surchargeType = type as SurchargeType;
    setActiveSurchargeType(surchargeType);
    const typeData = allData.filter(item => item.type === surchargeType);
    setFilteredData(typeData);
    setSelectedRowKeys([]); // 重置选中项
    // 重置搜索表单
    setSearchForm({
      usageLocation: '',
      company: '',
      status: '',
      dateRange: undefined
    });
  };

  // 搜索处理
  const handleSearch = () => {
    setLoading(true);
    // 模拟搜索
    setTimeout(() => {
      let filtered = allData.filter(item => item.type === activeSurchargeType);
      
      // 应用搜索条件
      if (searchForm.usageLocation) {
        filtered = filtered.filter(item => item.usageLocation.includes(searchForm.usageLocation));
      }
      if (searchForm.company) {
        filtered = filtered.filter(item => item.company.includes(searchForm.company));
      }
      if (searchForm.status) {
        filtered = filtered.filter(item => item.usageStatus === searchForm.status);
      }
      
      setFilteredData(filtered);
      setLoading(false);
      Message.success('搜索完成');
    }, 1000);
  };

  // 重置搜索
  const handleReset = () => {
    setSearchForm({
      usageLocation: '',
      company: '',
      status: '',
      dateRange: undefined
    });
    setFilteredData(allData.filter(item => item.type === activeSurchargeType));
  };

  // 查看详情
  const handleView = (id: string) => {
    navigate(`/controltower/saas/surcharge/view/${id}?type=${activeSurchargeType}`);
  };

  // 编辑附加费
  const handleEdit = (id: string) => {
    navigate(`/controltower/saas/surcharge/edit/${id}?type=${activeSurchargeType}`);
  };

  // 切换状态（禁用/启用）- 显示确认弹窗
  const handleToggleStatus = (id: string, currentStatus: 'active' | 'inactive' | 'expired') => {
    setPendingToggleRule({ id, currentStatus });
    setToggleStatusModalVisible(true);
  };

  // 确认切换状态
  const handleConfirmToggleStatus = () => {
    if (!pendingToggleRule) return;
    
    const newStatus = pendingToggleRule.currentStatus === 'active' ? 'inactive' : 'active';
    setFilteredData(prev => prev.map(item => 
      item.id === pendingToggleRule.id ? { ...item, usageStatus: newStatus } : item
    ));
    
    setToggleStatusModalVisible(false);
    setPendingToggleRule(null);
    Message.success(newStatus === 'active' ? '启用成功' : '禁用成功');
  };

  // 批量切换状态
  const handleBatchToggleStatus = (targetStatus: 'active' | 'inactive') => {
    setPendingBatchToggleStatus(targetStatus);
    setBatchToggleModalVisible(true);
  };

  // 确认批量切换状态
  const handleConfirmBatchToggleStatus = () => {
    if (!pendingBatchToggleStatus) return;
    
    setFilteredData(prev => prev.map(item => 
      selectedRowKeys.includes(item.id) ? { ...item, usageStatus: pendingBatchToggleStatus } : item
    ));
    
    setBatchToggleModalVisible(false);
    setPendingBatchToggleStatus(null);
    setSelectedRowKeys([]);
    Message.success(`批量${pendingBatchToggleStatus === 'active' ? '启用' : '禁用'}成功`);
  };

  // 新增附加费
  const handleAdd = () => {
    navigate(`/controltower/saas/surcharge/add?type=${activeSurchargeType}`);
  };

  // 表格列定义
  const getColumns = () => {
    const baseColumns = [
      {
        title: '费用ID',
        dataIndex: 'code',
        key: 'code',
        width: 120,
      },
      {
        title: activeSurchargeType === 'air' ? '适用机场' : '适用起运港',
        dataIndex: 'usageLocation',
        key: 'usageLocation',
        width: 120,
      },
      {
        title: activeSurchargeType === 'air' ? '航空公司' : '船公司',
        dataIndex: 'company',
        key: 'company',
        width: 120,
      },
      {
        title: activeSurchargeType === 'air' ? '适用航线' : '适用航线',
        dataIndex: 'usageLine',
        key: 'usageLine',
        width: 150,
        render: (text: string) => {
          const lines = text.split(',').filter(line => line.trim());
          const firstLine = lines[0] || '';
          const remainingCount = lines.length - 1;

          if (lines.length <= 1) {
            return <Tag color="blue">{firstLine}</Tag>;
          }

          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Tag color="blue">{firstLine}</Tag>
              <Tooltip
                content={
                  <div style={{ maxWidth: '200px' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>所有适用航线：</div>
                    {lines.map((line, index) => (
                      <div key={index} style={{ padding: '2px 0' }}>
                        <Tag color="blue" size="small">{line.trim()}</Tag>
                      </div>
                    ))}
                  </div>
                }
                position="top"
              >
                <Tag color="gray" style={{ cursor: 'pointer' }}>
                  +{remainingCount}
                </Tag>
              </Tooltip>
            </div>
          );
        }
      },
      {
        title: '费用状态',
        dataIndex: 'usageStatus',
        key: 'usageStatus',
        width: 100,
        render: (status: string) => (
          <Tag color={status === 'active' ? 'green' : status === 'inactive' ? 'red' : 'orange'}>
            {status === 'active' ? '正常' : status === 'inactive' ? '停用' : '过期'}
          </Tag>
        )
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
                  <div style={{ padding: '4px 0', backgroundColor: '#fff' }}>
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

    return baseColumns;
  };

  return (
    <div style={{ padding: '8px' }}>
      <Card>
        <div style={{ marginBottom: '12px' }}>
          <Title heading={4} style={{ margin: 0 }}>附加费维护</Title>
        </div>
      </Card>

      {/* Tab切换 */}
      <Card style={{ marginBottom: '8px' }}>
        <Tabs
          activeTab={activeSurchargeType}
          onChange={handleSurchargeTypeChange}
        >
          {surchargeTypeOptions.map(option => (
            <TabPane key={option.key} title={option.title} />
          ))}
        </Tabs>
      </Card>

      {/* 搜索区域 */}
      <Card style={{ marginBottom: '8px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '12px', 
          alignItems: 'end' 
        }}>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>
              {activeSurchargeType === 'air' ? '适用机场' : '适用起运港'}
            </div>
            <Select
              placeholder="请选择"
              value={searchForm.usageLocation}
              onChange={(value) => setSearchForm(prev => ({ ...prev, usageLocation: value }))}
              allowClear
            >
              {activeSurchargeType === 'air' ? (
                <>
                  <Option value="Shanghai">上海浦东机场</Option>
                  <Option value="Beijing">北京首都机场</Option>
                  <Option value="Guangzhou">广州白云机场</Option>
                </>
              ) : (
                <>
                  <Option value="Shanghai">Shanghai</Option>
                  <Option value="Ningbo">Ningbo</Option>
                  <Option value="Shenzhen">Shenzhen</Option>
                </>
              )}
            </Select>
          </div>

          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>
              {activeSurchargeType === 'air' ? '航空公司' : '船公司'}
            </div>
            <Select
              placeholder="请选择"
              value={searchForm.company}
              onChange={(value) => setSearchForm(prev => ({ ...prev, company: value }))}
              allowClear
            >
              {activeSurchargeType === 'air' ? (
                <>
                  <Option value="国航货运">国航货运</Option>
                  <Option value="东航货运">东航货运</Option>
                  <Option value="南航货运">南航货运</Option>
                </>
              ) : (
                <>
                  <Option value="商汇">商汇</Option>
                  <Option value="阿联酋航运">阿联酋航运</Option>
                  <Option value="马士基">马士基</Option>
                  <Option value="COSCO">COSCO</Option>
                  <Option value="MAERSK">MAERSK</Option>
                  <Option value="CMA CGM">CMA CGM</Option>
                </>
              )}
            </Select>
          </div>

          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>费用状态</div>
            <Select
              placeholder="请选择"
              value={searchForm.status}
              onChange={(value) => setSearchForm(prev => ({ ...prev, status: value }))}
              allowClear
            >
              <Option value="active">正常</Option>
              <Option value="inactive">停用</Option>
              <Option value="expired">过期</Option>
            </Select>
          </div>

          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>有效期</div>
            <RangePicker
              value={searchForm.dateRange}
              onChange={(value) => setSearchForm(prev => ({ ...prev, dateRange: value }))}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button type="primary" icon={<IconSearch />} onClick={handleSearch}>
              查询
            </Button>
            <Button icon={<IconRefresh />} onClick={handleReset}>
              重置
            </Button>
          </div>
        </div>
      </Card>

      {/* 操作按钮区域 */}
      <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button type="primary" icon={<IconPlus />} onClick={handleAdd}>
              新增{surchargeTypeOptions.find(opt => opt.key === activeSurchargeType)?.title}
            </Button>
          </div>
          {selectedRowKeys.length > 0 && (
            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              paddingLeft: '8px', 
              borderLeft: '1px solid #e5e6e7',
              marginLeft: '4px'
            }}>
              <Button 
                type="outline" 
                status="success"
                onClick={() => handleBatchToggleStatus('active')}
              >
                批量启用 ({selectedRowKeys.length})
              </Button>
              <Button 
                type="outline" 
                status="warning"
                onClick={() => handleBatchToggleStatus('inactive')}
              >
                批量禁用 ({selectedRowKeys.length})
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 数据表格 */}
      <Table
        columns={getColumns()}
        data={filteredData}
        loading={loading}
        rowKey="id"
        scroll={{ x: 1000 }}
        pagination={{
          total: filteredData.length,
          pageSize: 10,
          showTotal: true,
          showJumper: true,
          sizeCanChange: true,
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedRowKeys: (string | number)[]) => {
            setSelectedRowKeys(selectedRowKeys as string[]);
          },
        }}
      />

      {/* 单个状态切换确认弹窗 */}
      <Modal
        title="确认操作"
        visible={toggleStatusModalVisible}
        onOk={handleConfirmToggleStatus}
        onCancel={() => {
          setToggleStatusModalVisible(false);
          setPendingToggleRule(null);
        }}
        okText="确认"
        cancelText="取消"
      >
        <div>
          {pendingToggleRule && (
            <div>
              确定要{pendingToggleRule.currentStatus === 'active' ? '禁用' : '启用'}该附加费吗？
              <div style={{ marginTop: '8px', padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 'bold' }}>费用ID：</span>
                  <span style={{ fontFamily: 'monospace', color: '#165DFF' }}>
                    {(() => {
                      const rule = filteredData.find(r => r.id === pendingToggleRule.id);
                      return rule ? rule.code : '-';
                    })()}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 'bold' }}>适用航线：</span>
                  <span>
                    {(() => {
                      const rule = filteredData.find(r => r.id === pendingToggleRule.id);
                      return rule ? rule.usageLine : '-';
                    })()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* 批量状态切换确认弹窗 */}
      <Modal
        title="确认批量操作"
        visible={batchToggleModalVisible}
        onOk={handleConfirmBatchToggleStatus}
        onCancel={() => {
          setBatchToggleModalVisible(false);
          setPendingBatchToggleStatus(null);
        }}
        okText="确认"
        cancelText="取消"
      >
        <div>
          确定要批量{pendingBatchToggleStatus === 'active' ? '启用' : '禁用'} {selectedRowKeys.length} 个附加费吗？
        </div>
      </Modal>
    </div>
  );
};

export default SurchargeManagement; 