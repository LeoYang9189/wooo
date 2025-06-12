import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  Typography, 
  Table, 
  Button, 
  Input, 
  Select, 
  Space, 
  Tag, 
  Avatar, 

  Modal,
  Form,
  Message,
  Descriptions,
  Dropdown,
  Menu
} from '@arco-design/web-react';
import { 
  IconSearch, 
  IconPlus, 
   
  IconRefresh,
  IconHome,
  IconPhone,
  IconLocation,
  IconUser,

} from '@arco-design/web-react/icon';

const { Title, Text } = Typography;
const { Option } = Select;

interface CompanyData {
  id: string;
  name: string;
  englishName: string;
  contactPerson: string;
  contactPhone: string;
  email: string;
  address: string;
  industry: string;
  scale: string;
  businessLicense: string;
  status: 'active' | 'inactive' | 'pending' | 'rejected';
  userCount: number;
  createTime: string;
  lastActive: string;
}

const CompanyManagement: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [auditModalVisible, setAuditModalVisible] = useState(false);
  const [bindTenantModalVisible, setBindTenantModalVisible] = useState(false);
  const [currentCompany, setCurrentCompany] = useState<CompanyData | null>(null);
  const [auditForm] = Form.useForm();
  const [bindForm] = Form.useForm();

  // 模拟企业数据
  const [companyData, setCompanyData] = useState<CompanyData[]>([
    {
      id: '1',
      name: '货拉拉物流科技有限公司',
      englishName: 'Huolala Logistics Technology Co., Ltd.',
      contactPerson: '张经理',
      contactPhone: '13800138001',
      email: 'contact@huolala.com',
      address: '北京市朝阳区建国路88号SOHO现代城',
      industry: '物流运输',
      scale: '大型企业',
      businessLicense: '91110000123456789X',
      status: 'active',
      userCount: 156,
      createTime: '2023-03-15 09:30:00',
      lastActive: '2024-01-15 16:20:35'
    },
    {
      id: '2',
      name: '顺丰速运集团',
      englishName: 'SF Express Group',
      contactPerson: '李总监',
      contactPhone: '13800138002',
      email: 'business@sf-express.com',
      address: '深圳市福田区益田路6009号新世界中心',
      industry: '快递服务',
      scale: '大型企业',
      businessLicense: '91440300987654321A',
      status: 'active',
      userCount: 2340,
      createTime: '2023-01-20 11:15:20',
      lastActive: '2024-01-15 14:45:12'
    },
    {
      id: '3',
      name: '德邦物流股份有限公司',
      englishName: 'Deppon Logistics Co., Ltd.',
      contactPerson: '王主管',
      contactPhone: '13800138003',
      email: 'service@deppon.com',
      address: '上海市青浦区徐泾镇盈港东路7799号',
      industry: '物流运输',
      scale: '中型企业',
      businessLicense: '91310000456789123B',
      status: 'pending',
      userCount: 89,
      createTime: '2024-01-10 14:22:18',
      lastActive: '2024-01-12 10:15:30'
    },
          {
        id: '4',
        name: '中通快递股份有限公司',
        englishName: 'ZTO Express Co., Ltd.',
        contactPerson: '赵副总',
        contactPhone: '13800138004',
        email: 'cooperation@zto.com',
        address: '杭州市余杭区仓前街道文一西路1378号',
        industry: '快递服务',
        scale: '大型企业',
        businessLicense: '91330000654321987C',
        status: 'rejected',
        userCount: 45,
        createTime: '2023-11-05 16:45:30',
        lastActive: '2023-12-20 09:30:15'
      },
      {
        id: '5',
        name: '申通快递有限公司',
        englishName: 'STO Express Co., Ltd.',
        contactPerson: '陈经理',
        contactPhone: '13800138005',
        email: 'info@sto.cn',
        address: '上海市奉贤区青村镇申隆生态园',
        industry: '快递服务',
        scale: '中型企业',
        businessLicense: '91310000321987654D',
        status: 'inactive',
        userCount: 234,
        createTime: '2023-06-18 13:20:45',
        lastActive: '2024-01-14 11:25:40'
      },
      {
        id: '6',
        name: '韵达速递有限公司',
        englishName: 'Yunda Express Co., Ltd.',
        contactPerson: '刘总',
        contactPhone: '13800138006',
        email: 'service@yunda.com',
        address: '上海市青浦区华新镇华志路1685号',
        industry: '快递服务',
        scale: '中型企业',
        businessLicense: '91310000789456123E',
        status: 'rejected',
        userCount: 67,
        createTime: '2023-08-12 10:30:25',
        lastActive: '2023-09-15 14:20:10'
      }
  ]);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Message.success('搜索完成');
    }, 800);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Message.success('数据已刷新');
    }, 500);
  };

  const handleViewDetail = (company: CompanyData) => {
    setCurrentCompany(company);
    setDetailModalVisible(true);
  };



  const handleToggleStatus = (company: CompanyData) => {
    const newStatus = company.status === 'active' ? 'inactive' : 'active';
    setCompanyData(prev => prev.map(c => 
      c.id === company.id ? { ...c, status: newStatus } : c
    ));
    Message.success(`企业状态已${newStatus === 'active' ? '启用' : '停用'}`);
  };

  const handleDeleteCompany = (companyId: string) => {
    setCompanyData(prev => prev.filter(c => c.id !== companyId));
    Message.success('企业已删除');
  };

  const handleAuditCompany = (company: CompanyData) => {
    setCurrentCompany(company);
    auditForm.setFieldsValue({
      auditResult: '',
      auditReason: ''
    });
    setAuditModalVisible(true);
  };

  const handleBindTenant = (company: CompanyData) => {
    setCurrentCompany(company);
    bindForm.setFieldsValue({
      tenantId: '',
      tenantName: '',
      tenantType: '',
      bindNote: ''
    });
    setBindTenantModalVisible(true);
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'active':
        return <Tag color="green">正常</Tag>;
      case 'inactive':
        return <Tag color="red">已停用</Tag>;
      case 'pending':
        return <Tag color="orange">待审核</Tag>;
      case 'rejected':
        return <Tag color="gray">审核拒绝</Tag>;
      default:
        return <Tag color="gray">未知</Tag>;
    }
  };

  const getScaleTag = (scale: string) => {
    switch (scale) {
      case '大型企业':
        return <Tag color="blue">大型企业</Tag>;
      case '中型企业':
        return <Tag color="cyan">中型企业</Tag>;
      case '小型企业':
        return <Tag color="gray">小型企业</Tag>;
      default:
        return <Tag color="gray">未知</Tag>;
    }
  };

  const filteredData = companyData.filter(company => {
    const matchesKeyword = !searchKeyword || 
      company.name.includes(searchKeyword) || 
      company.contactPerson.includes(searchKeyword) ||
      company.industry.includes(searchKeyword);
    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    const matchesIndustry = industryFilter === 'all' || company.industry === industryFilter;
    
    return matchesKeyword && matchesStatus && matchesIndustry;
  });

  return (
    <div style={{ padding: '0' }}>
      {/* 页面标题 */}
      <div style={{ marginBottom: '24px' }}>
        <Title heading={3} style={{ marginBottom: '8px' }}>企业管理</Title>
        <Text type="secondary">管理平台注册企业，包括企业信息、状态审核和用户统计</Text>
      </div>

      {/* 搜索和筛选区域 */}
      <Card style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Space size="medium">
            <Input
              style={{ width: 280 }}
              placeholder="搜索企业名称、联系人或行业"
              value={searchKeyword}
              onChange={(value) => setSearchKeyword(value)}
              prefix={<IconSearch />}
              allowClear
            />
            <Select
              placeholder="状态筛选"
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 120 }}
            >
              <Option value="all">全部状态</Option>
              <Option value="active">正常</Option>
              <Option value="inactive">已停用</Option>
              <Option value="pending">待审核</Option>
              <Option value="rejected">审核拒绝</Option>
            </Select>
            <Select
              placeholder="行业筛选"
              value={industryFilter}
              onChange={setIndustryFilter}
              style={{ width: 120 }}
            >
              <Option value="all">全部行业</Option>
              <Option value="物流运输">物流运输</Option>
              <Option value="快递服务">快递服务</Option>
              <Option value="仓储服务">仓储服务</Option>
              <Option value="供应链">供应链</Option>
            </Select>
            <Button type="primary" icon={<IconSearch />} onClick={handleSearch}>
              搜索
            </Button>
          </Space>
          
          <Space>
            <Button icon={<IconRefresh />} onClick={handleRefresh}>
              刷新
            </Button>
            <Button 
              type="primary" 
              icon={<IconPlus />}
              onClick={() => {
                navigate('/platformadmin/company-management/add');
              }}
            >
              添加企业
            </Button>
          </Space>
        </div>
      </Card>

      {/* 企业统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        <Card 
          className={`stat-card-clickable ${statusFilter === 'all' ? 'selected' : ''}`}
          style={{ textAlign: 'center' }}
          onClick={() => {
            setStatusFilter('all');
            Message.info('已显示所有企业');
          }}
        >
          <div style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: statusFilter === 'all' ? '#165DFF' : '#165DFF', 
            marginBottom: '8px',
            position: 'relative',
            zIndex: 1
          }}>
            {companyData.length}
          </div>
          <Text type="secondary" style={{ position: 'relative', zIndex: 1 }}>总企业数</Text>
        </Card>
        <Card 
          className={`stat-card-clickable ${statusFilter === 'active' ? 'selected' : ''}`}
          style={{ textAlign: 'center' }}
          onClick={() => {
            setStatusFilter('active');
            Message.info('已筛选正常企业');
          }}
        >
          <div style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: statusFilter === 'active' ? '#00B42A' : '#00B42A', 
            marginBottom: '8px',
            position: 'relative',
            zIndex: 1
          }}>
            {companyData.filter(c => c.status === 'active').length}
          </div>
          <Text type="secondary" style={{ position: 'relative', zIndex: 1 }}>正常</Text>
        </Card>
        <Card 
          className={`stat-card-clickable ${statusFilter === 'inactive' ? 'selected' : ''}`}
          style={{ textAlign: 'center' }}
          onClick={() => {
            setStatusFilter('inactive');
            Message.info('已筛选已停用企业');
          }}
        >
          <div style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: statusFilter === 'inactive' ? '#F53F3F' : '#F53F3F', 
            marginBottom: '8px',
            position: 'relative',
            zIndex: 1
          }}>
            {companyData.filter(c => c.status === 'inactive').length}
          </div>
          <Text type="secondary" style={{ position: 'relative', zIndex: 1 }}>已停用</Text>
        </Card>
        <Card 
          className={`stat-card-clickable ${statusFilter === 'pending' ? 'selected' : ''}`}
          style={{ textAlign: 'center' }}
          onClick={() => {
            setStatusFilter('pending');
            Message.info('已筛选待审核企业');
          }}
        >
          <div style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: statusFilter === 'pending' ? '#FF7D00' : '#FF7D00', 
            marginBottom: '8px',
            position: 'relative',
            zIndex: 1
          }}>
            {companyData.filter(c => c.status === 'pending').length}
          </div>
          <Text type="secondary" style={{ position: 'relative', zIndex: 1 }}>待审核</Text>
        </Card>
        <Card 
          className={`stat-card-clickable ${statusFilter === 'rejected' ? 'selected' : ''}`}
          style={{ textAlign: 'center' }}
          onClick={() => {
            setStatusFilter('rejected');
            Message.info('已筛选审核拒绝企业');
          }}
        >
          <div style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: statusFilter === 'rejected' ? '#722ED1' : '#722ED1', 
            marginBottom: '8px',
            position: 'relative',
            zIndex: 1
          }}>
            {companyData.filter(c => c.status === 'rejected').length}
          </div>
          <Text type="secondary" style={{ position: 'relative', zIndex: 1 }}>审核拒绝</Text>
        </Card>
      </div>

      {/* 企业列表表格 */}
      <Card title={`企业列表 (${filteredData.length})`}>
        <Table
          loading={loading}
          data={filteredData}
          columns={[
            {
              title: '企业信息',
              dataIndex: 'name',
              key: 'name',
              width: 280,
              render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar size={40} style={{ backgroundColor: '#165DFF' }}>
                    <IconHome />
                  </Avatar>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
                      {record.name}
                    </div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      营业执照：{record.businessLicense}
                    </Text>
                  </div>
                </div>
              )
            },
            {
              title: '英文名称',
              dataIndex: 'englishName',
              key: 'englishName',
              width: 220,
              render: (englishName) => (
                <Text style={{ fontSize: '13px', fontStyle: 'italic' }}>
                  {englishName}
                </Text>
              )
            },
            {
              title: '联系信息',
              dataIndex: 'contactPerson',
              key: 'contactPerson',
              render: (_, record) => (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                    <IconUser style={{ fontSize: '12px', color: '#86909C' }} />
                    <Text style={{ fontSize: '14px' }}>{record.contactPerson}</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <IconPhone style={{ fontSize: '12px', color: '#86909C' }} />
                    <Text copyable={{ text: record.contactPhone }} style={{ fontSize: '12px' }}>
                      {record.contactPhone}
                    </Text>
                  </div>
                </div>
              )
            },
            {
              title: '地址',
              dataIndex: 'address',
              key: 'address',
              width: 200,
              render: (address) => (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                  <IconLocation style={{ fontSize: '12px', color: '#86909C', marginTop: '2px' }} />
                  <Text style={{ fontSize: '12px', lineHeight: '1.4' }}>
                    {address}
                  </Text>
                </div>
              )
            },
            {
              title: '用户数',
              dataIndex: 'userCount',
              key: 'userCount',
              render: (userCount, record) => (
                <div style={{ textAlign: 'left' }}>
                  <div 
                    style={{ 
                      fontSize: '16px', 
                      fontWeight: 'bold', 
                      color: '#165DFF',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                    onClick={() => {
                      // 跳转到用户管理页面，并传递企业筛选条件
                      navigate(`/platformadmin/user-management?company=${encodeURIComponent(record.name)}`);
                      Message.info(`正在查看 ${record.name} 的用户`);
                    }}
                    title="点击查看该企业的用户"
                  >
                    {userCount}
                  </div>
                  <Text type="secondary" style={{ fontSize: '11px' }}>用户</Text>
                </div>
              )
            },
            {
              title: '状态',
              dataIndex: 'status',
              key: 'status',
              render: (status) => getStatusTag(status)
            },
            {
              title: '最后活跃',
              dataIndex: 'lastActive',
              key: 'lastActive',
              render: (lastActive) => (
                <Text style={{ fontSize: '12px' }}>
                  {lastActive}
                </Text>
              )
            },
            {
              title: '操作',
              key: 'actions',
              width: 180,
              render: (_, record) => {
                const moreMenuItems = [
                  {
                    key: 'toggle-status',
                    title: record.status === 'active' ? '停用' : '启用',
                    style: { color: '#165DFF' },
                    onClick: () => handleToggleStatus(record)
                  },
                  {
                    key: 'bind-tenant',
                    title: '绑定租户',
                    style: { color: '#165DFF' },
                    onClick: () => handleBindTenant(record)
                  },
                  ...(record.status === 'pending' ? [{
                    key: 'audit',
                    title: '审核认证',
                    style: { color: '#165DFF' },
                    onClick: () => handleAuditCompany(record)
                  }] : []),

                  {
                    key: 'delete',
                    title: '删除',
                    style: { color: '#F53F3F' },
                    onClick: () => {
                      Modal.confirm({
                        title: '确定要删除这家企业吗？',
                        content: '删除后将无法恢复',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => handleDeleteCompany(record.id)
                      });
                    }
                  }
                ];

                return (
                  <Space>
                    <Button
                      type="text"
                      size="small"
                      onClick={() => handleViewDetail(record)}
                    >
                      详情
                    </Button>
                                      <Button
                    type="text"
                    size="small"
                    onClick={() => navigate(`/platformadmin/company-management/edit/${record.id}`)}
                  >
                    编辑
                  </Button>
                    <Dropdown
                      droplist={
                        <Menu>
                          {moreMenuItems.map((item) => (
                            <Menu.Item 
                              key={item.key} 
                              onClick={item.onClick}
                              style={item.style}
                            >
                              {item.title}
                            </Menu.Item>
                          ))}
                        </Menu>
                      }
                      position="bottom"
                    >
                      <Button type="text" size="small">
                        更多
                      </Button>
                    </Dropdown>
                  </Space>
                );
              }
            }
          ]}
          pagination={{
            total: filteredData.length,
            pageSize: 10,
            showTotal: (total, range) => 
              `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
            showJumper: true,
            sizeCanChange: true,
            sizeOptions: [10, 20, 50]
          }}
          rowKey="id"
          stripe
          border
        />
      </Card>



      {/* 企业详情模态框 */}
      <Modal
        title="企业详情"
        visible={detailModalVisible}
        onCancel={() => {
          setDetailModalVisible(false);
          setCurrentCompany(null);
        }}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            关闭
          </Button>,
          <Button 
            key="edit" 
            type="primary"
            onClick={() => {
              setDetailModalVisible(false);
              if (currentCompany) {
                navigate(`/platformadmin/company-management/edit/${currentCompany.id}`);
              }
            }}
          >
            编辑
          </Button>
        ]}
        style={{ width: 800 }}
      >
        {currentCompany && (
          <Descriptions 
            column={2} 
            labelStyle={{ fontWeight: 'bold' }}
            data={[
              {
                label: '企业名称',
                value: currentCompany.name
              },
              {
                label: '营业执照号',
                value: currentCompany.businessLicense
              },
              {
                label: '联系人',
                value: currentCompany.contactPerson
              },
              {
                label: '联系电话',
                value: (
                  <Text copyable={{ text: currentCompany.contactPhone }}>
                    {currentCompany.contactPhone}
                  </Text>
                )
              },
              {
                label: '企业邮箱',
                value: (
                  <Text copyable={{ text: currentCompany.email }}>
                    {currentCompany.email}
                  </Text>
                )
              },
              {
                label: '行业类型',
                value: (
                  <Tag color="arcoblue">{currentCompany.industry}</Tag>
                )
              },
              {
                label: '企业规模',
                value: getScaleTag(currentCompany.scale)
              },
              {
                label: '企业状态',
                value: getStatusTag(currentCompany.status)
              },
              {
                label: '用户数量',
                value: (
                  <Text style={{ color: '#165DFF', fontWeight: 'bold' }}>
                    {currentCompany.userCount} 个用户
                  </Text>
                )
              },
              {
                label: '创建时间',
                value: currentCompany.createTime
              },
              {
                label: '最后活跃',
                value: currentCompany.lastActive
              },
              {
                label: '企业地址',
                value: currentCompany.address,
                span: 2
              }
            ]}
                     />
         )}
       </Modal>

      {/* 审核认证模态框 */}
      <Modal
        title="企业审核认证"
        visible={auditModalVisible}
        onCancel={() => {
          setAuditModalVisible(false);
          setCurrentCompany(null);
          auditForm.resetFields();
        }}
        onOk={() => {
          auditForm.validate().then((values) => {
            if (currentCompany) {
              const newStatus = values.auditResult === 'approve' ? 'active' : 'inactive';
              setCompanyData(prev => prev.map(company => 
                company.id === currentCompany.id 
                  ? { ...company, status: newStatus }
                  : company
              ));
              Message.success(
                values.auditResult === 'approve' 
                  ? '企业审核通过，已激活' 
                  : '企业审核未通过，已停用'
              );
            }
            setAuditModalVisible(false);
            setCurrentCompany(null);
            auditForm.resetFields();
          }).catch((error) => {
            console.error('审核表单验证失败:', error);
          });
        }}
        okText="确定"
        cancelText="取消"
        style={{ width: 600 }}
      >
        {currentCompany && (
          <div>
            <div style={{ 
              background: '#f7f8fa', 
              padding: '16px', 
              borderRadius: '6px', 
              marginBottom: '16px' 
            }}>
                             <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>待审核企业信息</Text>
              <div style={{ marginTop: '8px' }}>
                <Text>企业名称：{currentCompany.name}</Text>
                <br />
                <Text>营业执照：{currentCompany.businessLicense}</Text>
                <br />
                <Text>联系人：{currentCompany.contactPerson}</Text>
                <br />
                <Text>联系电话：{currentCompany.contactPhone}</Text>
              </div>
            </div>
            
            <Form
              form={auditForm}
              layout="vertical"
              autoComplete="off"
            >
              <Form.Item
                label="审核结果"
                field="auditResult"
                rules={[
                  { required: true, message: '请选择审核结果' }
                ]}
              >
                <Select placeholder="请选择审核结果">
                  <Option value="approve">
                    <span style={{ color: '#00B42A' }}>✓ 审核通过</span>
                  </Option>
                  <Option value="reject">
                    <span style={{ color: '#F53F3F' }}>✗ 审核不通过</span>
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="审核意见"
                field="auditReason"
                rules={[
                  { required: true, message: '请输入审核意见' }
                ]}
              >
                <Input.TextArea 
                  placeholder="请详细说明审核的原因和意见"
                  rows={4}
                  maxLength={500}
                  showWordLimit
                />
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>

      {/* 绑定第三方租户模态框 */}
      <Modal
        title="绑定第三方租户"
        visible={bindTenantModalVisible}
        onCancel={() => {
          setBindTenantModalVisible(false);
          setCurrentCompany(null);
          bindForm.resetFields();
        }}
        onOk={() => {
          bindForm.validate().then((values) => {
            // 这里可以调用实际的绑定API
            Message.success(`已成功为 ${currentCompany?.name} 绑定第三方租户：${values.tenantName}`);
            setBindTenantModalVisible(false);
            setCurrentCompany(null);
            bindForm.resetFields();
          }).catch((error) => {
            console.error('绑定表单验证失败:', error);
          });
        }}
        okText="确定绑定"
        cancelText="取消"
        style={{ width: 600 }}
      >
        {currentCompany && (
          <div>
            <div style={{ 
              background: '#f0f9ff', 
              padding: '16px', 
              borderRadius: '6px', 
              marginBottom: '16px',
              border: '1px solid #91d5ff'
            }}>
                             <Text style={{ fontSize: '14px', color: '#1890ff', fontWeight: 'bold' }}>
                 🏢 当前企业：{currentCompany.name}
               </Text>
              <div style={{ marginTop: '8px' }}>
                <Text type="secondary">将为此企业绑定第三方租户系统</Text>
              </div>
            </div>
            
            <Form
              form={bindForm}
              layout="vertical"
              autoComplete="off"
            >
              <Form.Item
                label="租户ID"
                field="tenantId"
                rules={[
                  { required: true, message: '请输入租户ID' }
                ]}
              >
                <Input placeholder="请输入第三方系统的租户ID" />
              </Form.Item>

              <Form.Item
                label="租户名称"
                field="tenantName"
                rules={[
                  { required: true, message: '请输入租户名称' }
                ]}
              >
                <Input placeholder="请输入租户的显示名称" />
              </Form.Item>

              <Form.Item
                label="租户类型"
                field="tenantType"
                rules={[
                  { required: true, message: '请选择租户类型' }
                ]}
              >
                <Select placeholder="请选择第三方系统类型">
                  <Option value="erp">ERP系统</Option>
                  <Option value="wms">WMS仓储系统</Option>
                  <Option value="tms">TMS运输系统</Option>
                  <Option value="crm">CRM客户系统</Option>
                  <Option value="oms">OMS订单系统</Option>
                  <Option value="other">其他系统</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="绑定说明"
                field="bindNote"
                rules={[
                  { required: false }
                ]}
              >
                <Input.TextArea 
                  placeholder="请输入绑定的相关说明（可选）"
                  rows={3}
                  maxLength={300}
                  showWordLimit
                />
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CompanyManagement; 