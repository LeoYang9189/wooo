import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  Dropdown,
  Menu
} from '@arco-design/web-react';
import { 
  IconSearch, 
  IconPlus, 
   
  IconRefresh,
  IconUser,

} from '@arco-design/web-react/icon';

const { Title, Text } = Typography;
const { Option } = Select;

// 统计卡片样式
const cardStyles = `
  .stats-card {
    position: relative;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid transparent !important;
    overflow: hidden;
  }

  .stats-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(22, 93, 255, 0.1), rgba(22, 93, 255, 0.05));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  .stats-card:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 25px rgba(22, 93, 255, 0.15);
    border-color: rgba(22, 93, 255, 0.3) !important;
  }

  .stats-card:hover::before {
    opacity: 1;
  }

  .stats-card:active {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 4px 15px rgba(22, 93, 255, 0.2);
  }

  .stats-card.selected {
    border-color: #165DFF !important;
    background: linear-gradient(135deg, rgba(22, 93, 255, 0.08), rgba(22, 93, 255, 0.03));
    box-shadow: 0 6px 20px rgba(22, 93, 255, 0.12);
    transform: translateY(-2px);
  }

  .stats-card.selected::before {
    opacity: 0.7;
  }

  .stats-card .card-content {
    position: relative;
    z-index: 2;
  }

  .stats-card .stats-number {
    position: relative;
    z-index: 2;
    font-weight: bold;
    transition: all 0.3s ease;
  }

  .stats-card:hover .stats-number {
    transform: scale(1.05);
  }

  .stats-card .stats-label {
    position: relative;
    z-index: 2;
    transition: all 0.3s ease;
  }

  .stats-card:hover .stats-label {
    transform: translateY(-1px);
  }
`;

// 添加样式到文档
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = cardStyles;
  if (!document.head.querySelector('style[data-stats-cards]')) {
    styleElement.setAttribute('data-stats-cards', 'true');
    document.head.appendChild(styleElement);
  }
}

interface UserData {
  id: string;
  username: string;
  email: string;
  phone: string;
  company: string;
  role: 'super_admin' | 'user';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  createTime: string;
  avatar?: string;
  thirdPartyUserIds?: {
    [systemName: string]: string;
  };
}

const UserManagement: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [bindCompanyModalVisible, setBindCompanyModalVisible] = useState(false);
  const [resetPasswordModalVisible, setResetPasswordModalVisible] = useState(false);
  const [resetConfirmModalVisible, setResetConfirmModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [toggleStatusModalVisible, setToggleStatusModalVisible] = useState(false);
  const [targetUser, setTargetUser] = useState<UserData | null>(null);
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [form] = Form.useForm();
  const [bindCompanyForm] = Form.useForm();

  // 模拟用户数据
  const [userData, setUserData] = useState<UserData[]>([
    {
      id: 'A3K9M2X7N8Q5',
      username: '张三',
      email: 'zhangsan@example.com',
      phone: '13800138001',
      company: '货拉拉物流科技有限公司',
      role: 'super_admin',
      status: 'active',
      lastLogin: '2024-01-15 14:30:25',
      createTime: '2023-12-01 09:15:30',
      thirdPartyUserIds: {
        'CargoWare': 'huh768gh',
        'eTower': 'ghuhi788'
      }
    },
    {
      id: 'B7H4P1Y6R9L2',
      username: '李四',
      email: 'lisi@example.com',
      phone: '13800138002',
      company: '顺丰速运集团',
      role: 'user',
      status: 'active',
      lastLogin: '2024-01-14 16:22:18',
      createTime: '2023-11-15 11:20:45',
      thirdPartyUserIds: {
        'CargoWare': 'sf987xyz',
        'eTower': 'tower456'
      }
    },
    {
      id: 'C8F5T3W9E1K4',
      username: '王五',
      email: 'wangwu@example.com',
      phone: '13800138003',
      company: '德邦物流股份有限公司',
      role: 'user',
      status: 'inactive',
      lastLogin: '2024-01-10 10:15:32',
      createTime: '2023-10-20 15:30:15',
      thirdPartyUserIds: {
        'CargoWare': 'db123qwe',
        'eTower': 'etw789asd'
      }
    },
    {
      id: 'D2J6V8S3G7N1',
      username: '赵六',
      email: 'zhaoliu@example.com',
      phone: '13800138004',
      company: '中通快递股份有限公司',
      role: 'user',
      status: 'pending',
      lastLogin: '从未登录',
      createTime: '2024-01-12 13:45:20',
      thirdPartyUserIds: {
        'eTower': 'zt456def'
      }
    },
    {
      id: 'E9L4Z2M6X8Q3',
      username: '陈七',
      email: 'chenqi@example.com',
      phone: '13800138005',
      company: '货拉拉物流科技有限公司',
      role: 'user',
      status: 'active',
      lastLogin: '2024-01-13 09:45:12',
      createTime: '2023-12-15 14:20:45',
      thirdPartyUserIds: {
        'CargoWare': 'abc123def',
        'eTower': 'xyz789uvw'
      }
    },
    {
      id: 'F5R7U1H9C4P6',
      username: '孙八',
      email: 'sunba@example.com',
      phone: '13800138006',
      company: '顺丰速运集团',
      role: 'user',
      status: 'active',
      lastLogin: '2024-01-12 11:30:18',
      createTime: '2023-11-20 16:15:30',
      thirdPartyUserIds: {
        'CargoWare': 'sf999mmm',
        'eTower': 'etw333nnn'
      }
    },
    {
      id: 'G3T8Y5K2W7B9',
      username: '周九',
      email: 'zhoujiu@example.com',
      phone: '13800138007',
      company: '申通快递有限公司',
      role: 'user',
      status: 'active',
      lastLogin: '2024-01-11 13:22:45',
      createTime: '2023-10-10 10:30:15',
      thirdPartyUserIds: {
        'CargoWare': 'st777bbb'
      }
    }
  ]);

  // 处理从企业管理页面传递过来的筛选条件
  useEffect(() => {
    const companyFilter = searchParams.get('company');
    if (companyFilter) {
      setSearchKeyword(companyFilter);
      Message.info(`已自动筛选企业：${companyFilter}`);
    }
  }, [searchParams]);

  // 根据当前筛选状态设置选中的卡片
  useEffect(() => {
    if (searchKeyword || roleFilter !== 'all') {
      setSelectedCard('');
    } else {
      switch (statusFilter) {
        case 'all':
          setSelectedCard('total');
          break;
        case 'active':
          setSelectedCard('active');
          break;
        case 'inactive':
          setSelectedCard('inactive');
          break;
        case 'pending':
          setSelectedCard('pending');
          break;
        default:
          setSelectedCard('');
      }
    }
  }, [statusFilter, roleFilter, searchKeyword]);

  const handleSearch = () => {
    setLoading(true);
    // 模拟搜索延迟
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

  const handleViewDetail = (user: UserData) => {
    setCurrentUser(user);
    setDetailModalVisible(true);
  };

  const handleEditUser = (user: UserData) => {
    setCurrentUser(user);
    form.setFieldsValue(user);
    setEditModalVisible(true);
  };

  const handleBindCompany = (user: UserData) => {
    setCurrentUser(user);
    bindCompanyForm.resetFields();
    // 设置默认值
    bindCompanyForm.setFieldsValue({
      targetRole: 'user' // 默认选中普通员工
    });
    setBindCompanyModalVisible(true);
  };

  const handleToggleStatus = (user: UserData) => {
    setTargetUser(user);
    setToggleStatusModalVisible(true);
  };

  const handleConfirmToggleStatus = () => {
    if (targetUser) {
      const newStatus = targetUser.status === 'active' ? 'inactive' : 'active';
      setUserData(prev => prev.map(u => 
        u.id === targetUser.id ? { ...u, status: newStatus } : u
      ));
      Message.success(`用户 ${targetUser.username} 已${newStatus === 'active' ? '启用' : '禁用'}`);
      setToggleStatusModalVisible(false);
      setTargetUser(null);
    }
  };

  const handleDeleteUser = (userId: string) => {
    setUserData(prev => prev.filter(u => u.id !== userId));
    Message.success('用户已删除');
  };

  const handleResetPassword = (user: UserData) => {
    setCurrentUser(user);
    setResetConfirmModalVisible(true);
  };

  const confirmResetPassword = () => {
    if (currentUser) {
      // 生成8位随机密码
      const generatePassword = () => {
        const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
        let password = '';
        for (let i = 0; i < 8; i++) {
          password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
      };

      const newPwd = generatePassword();
      setNewPassword(newPwd);
      setResetConfirmModalVisible(false);
      setResetPasswordModalVisible(true);
    }
  };

  const handleCardClick = (cardType: string) => {
    setSelectedCard(cardType);
    
    switch (cardType) {
      case 'total':
        setStatusFilter('all');
        setRoleFilter('all');
        setSearchKeyword('');
        Message.info('显示全部用户');
        break;
      case 'active':
        setStatusFilter('active');
        setRoleFilter('all');
        setSearchKeyword('');
        Message.info('筛选活跃用户');
        break;
      case 'inactive':
        setStatusFilter('inactive');
        setRoleFilter('all');
        setSearchKeyword('');
        Message.info('筛选禁用用户');
        break;
      case 'pending':
        setStatusFilter('pending');
        setRoleFilter('all');
        setSearchKeyword('');
        Message.info('筛选待激活用户');
        break;
    }
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'active':
        return <Tag color="green">正常</Tag>;
      case 'inactive':
        return <Tag color="red">禁用</Tag>;
      case 'pending':
        return <Tag color="orange">待激活</Tag>;
      default:
        return <Tag color="gray">未知</Tag>;
    }
  };

  const getRoleTag = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <Tag color="blue">超级管理员</Tag>;
      case 'user':
        return <Tag color="gray">普通用户</Tag>;
      default:
        return <Tag color="gray">未知</Tag>;
    }
  };

  const filteredData = userData.filter(user => {
    const matchesKeyword = !searchKeyword || 
      user.username.includes(searchKeyword) || 
      user.email.includes(searchKeyword) ||
      user.company.includes(searchKeyword);
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesKeyword && matchesStatus && matchesRole;
  });

  return (
    <div style={{ padding: '0' }}>


      {/* 搜索和筛选区域 */}
      <Card style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Space size="medium">
            <Input
              style={{ width: 280 }}
              placeholder="搜索用户名、邮箱或公司"
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
              <Option value="inactive">禁用</Option>
              <Option value="pending">待激活</Option>
            </Select>
            <Select
              placeholder="角色筛选"
              value={roleFilter}
              onChange={setRoleFilter}
              style={{ width: 120 }}
            >
              <Option value="all">全部角色</Option>
              <Option value="super_admin">超级管理员</Option>
              <Option value="user">普通用户</Option>
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
                setCurrentUser(null);
                form.resetFields();
                setEditModalVisible(true);
              }}
            >
              添加用户
            </Button>
          </Space>
        </div>
      </Card>

      {/* 用户统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        <Card 
          className={`stats-card ${selectedCard === 'total' ? 'selected' : ''}`}
          style={{ textAlign: 'center' }}
          onClick={() => handleCardClick('total')}
        >
          <div className="card-content">
            <div className="stats-number" style={{ fontSize: '24px', color: '#165DFF', marginBottom: '8px' }}>
              {userData.length}
            </div>
            <Text type="secondary" className="stats-label">总用户数</Text>
          </div>
        </Card>
        <Card 
          className={`stats-card ${selectedCard === 'active' ? 'selected' : ''}`}
          style={{ textAlign: 'center' }}
          onClick={() => handleCardClick('active')}
        >
          <div className="card-content">
            <div className="stats-number" style={{ fontSize: '24px', color: '#00B42A', marginBottom: '8px' }}>
              {userData.filter(u => u.status === 'active').length}
            </div>
            <Text type="secondary" className="stats-label">活跃用户</Text>
          </div>
        </Card>
        <Card 
          className={`stats-card ${selectedCard === 'inactive' ? 'selected' : ''}`}
          style={{ textAlign: 'center' }}
          onClick={() => handleCardClick('inactive')}
        >
          <div className="card-content">
            <div className="stats-number" style={{ fontSize: '24px', color: '#F53F3F', marginBottom: '8px' }}>
              {userData.filter(u => u.status === 'inactive').length}
            </div>
            <Text type="secondary" className="stats-label">禁用用户</Text>
          </div>
        </Card>
        <Card 
          className={`stats-card ${selectedCard === 'pending' ? 'selected' : ''}`}
          style={{ textAlign: 'center' }}
          onClick={() => handleCardClick('pending')}
        >
          <div className="card-content">
            <div className="stats-number" style={{ fontSize: '24px', color: '#FF7D00', marginBottom: '8px' }}>
              {userData.filter(u => u.status === 'pending').length}
            </div>
            <Text type="secondary" className="stats-label">待激活</Text>
          </div>
        </Card>
      </div>

      {/* 用户列表表格 */}
      <Card title={`用户列表 (${filteredData.length})`}>
        <Table
          loading={loading}
          data={filteredData}
          scroll={{ x: 1200 }}
          columns={[
            {
              title: '用户ID',
              dataIndex: 'id',
              key: 'id',
              width: 140,
              sorter: true,
              render: (id) => (
                <Text 
                  copyable={{ text: id, icon: null, tooltips: ['复制ID', '已复制'] }}
                  style={{ fontFamily: 'monospace', fontSize: '12px', whiteSpace: 'nowrap' }}
                >
                  {id}
                </Text>
              )
            },
            {
              title: '用户信息',
              dataIndex: 'username',
              key: 'username',
              width: 200,
              sorter: true,
              render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar size={40} style={{ backgroundColor: '#165DFF' }}>
                    <IconUser />
                  </Avatar>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                      {record.username}
                    </div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {record.email}
                    </Text>
                  </div>
                </div>
              )
            },
            {
              title: '联系方式',
              dataIndex: 'phone',
              key: 'phone',
              width: 130,
              sorter: true,
              render: (phone) => (
                <Text 
                  copyable={{ text: phone, icon: null, tooltips: ['复制手机号', '已复制'] }}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {phone}
                </Text>
              )
            },
            {
              title: '所属公司',
              dataIndex: 'company',
              key: 'company',
              width: 180,
              sorter: true,
              render: (company) => (
                <Text style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>
                  {company}
                </Text>
              )
            },
            {
              title: '角色',
              dataIndex: 'role',
              key: 'role',
              width: 100,
              sorter: true,
              render: (role) => getRoleTag(role)
            },
            {
              title: '状态',
              dataIndex: 'status',
              key: 'status',
              width: 80,
              sorter: true,
              render: (status) => getStatusTag(status)
            },
            {
              title: '最后登录',
              dataIndex: 'lastLogin',
              key: 'lastLogin',
              width: 140,
              sorter: true,
              render: (lastLogin) => (
                <Text style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
                  {lastLogin}
                </Text>
              )
            },
            {
              title: '创建时间',
              dataIndex: 'createTime',
              key: 'createTime',
              width: 140,
              sorter: true,
              render: (createTime) => (
                <Text style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
                  {createTime}
                </Text>
              )
            },
            {
              title: '操作',
              key: 'actions',
              width: 180,
              fixed: 'right',
              render: (_, record) => (
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
                    onClick={() => handleEditUser(record)}
                  >
                    编辑
                  </Button>
                  <Dropdown
                    droplist={
                      <Menu>
                        <Menu.Item
                          key="toggle"
                          onClick={() => handleToggleStatus(record)}
                          style={{ color: '#165DFF' }}
                        >
                          {record.status === 'active' ? '禁用用户' : '启用用户'}
                        </Menu.Item>
                        <Menu.Item
                          key="bind"
                          onClick={() => handleBindCompany(record)}
                          style={{ color: '#165DFF' }}
                        >
                          绑定企业
                        </Menu.Item>
                        <Menu.Item
                          key="resetPassword"
                          onClick={() => handleResetPassword(record)}
                          style={{ color: '#FF7D00' }}
                        >
                          重置密码
                        </Menu.Item>
                        <Menu.Item
                          key="delete"
                          onClick={() => {
                            Modal.confirm({
                              title: '确定要删除这个用户吗？',
                              content: `删除后用户 ${record.username} 的所有信息将无法恢复`,
                              okText: '确定删除',
                              cancelText: '取消',
                              onOk: () => handleDeleteUser(record.id)
                            });
                          }}
                          style={{ color: '#F53F3F' }}
                        >
                          删除用户
                        </Menu.Item>
                      </Menu>
                    }
                    position="bottom"
                    trigger="click"
                  >
                    <Button type="text" size="small">
                      更多
                    </Button>
                  </Dropdown>
                </Space>
              )
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

      {/* 编辑/添加用户模态框 */}
      <Modal
        title={currentUser ? "编辑用户" : "添加用户"}
        visible={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          setCurrentUser(null);
          form.resetFields();
        }}
        onOk={() => {
          form.validate().then((values) => {
            if (currentUser) {
              // 编辑用户
              setUserData(prev => prev.map(user => 
                user.id === currentUser.id 
                  ? { ...user, ...values }
                  : user
              ));
              Message.success('用户信息已更新');
            } else {
              // 生成12位随机ID（字母和数字组合）
              const generateRandomId = () => {
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                let result = '';
                for (let i = 0; i < 12; i++) {
                  result += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                return result;
              };

              // 添加新用户
              const newUser: UserData = {
                id: generateRandomId(),
                ...values,
                createTime: new Date().toLocaleString(),
                lastLogin: '从未登录'
              };
              setUserData(prev => [...prev, newUser]);
              Message.success('用户已添加');
            }
            setEditModalVisible(false);
            setCurrentUser(null);
            form.resetFields();
          }).catch((error) => {
            console.error('表单验证失败:', error);
          });
        }}
        okText="确定"
        cancelText="取消"
        style={{ width: 600 }}
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            field="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { minLength: 2, message: '用户名至少2个字符' }
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="邮箱"
            field="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { 
                type: 'email', 
                message: '请输入有效的邮箱地址' 
              }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            label="手机号"
            field="phone"
            rules={[
              { required: true, message: '请输入手机号' },
              {
                validator: (value, callback) => {
                  if (value && !/^1[3-9]\d{9}$/.test(value)) {
                    callback('请输入有效的手机号');
                  } else {
                    callback();
                  }
                }
              }
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            label="所属公司"
            field="company"
            rules={[
              { required: true, message: '请输入所属公司' }
            ]}
          >
            <Input placeholder="请输入所属公司" />
          </Form.Item>

          <Form.Item
            label="用户角色"
            field="role"
            rules={[
              { required: true, message: '请选择用户角色' }
            ]}
          >
            <Select placeholder="请选择用户角色">
              <Option value="super_admin">超级管理员</Option>
              <Option value="user">普通用户</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="用户状态"
            field="status"
            rules={[
              { required: true, message: '请选择用户状态' }
            ]}
          >
            <Select placeholder="请选择用户状态">
              <Option value="active">正常</Option>
              <Option value="inactive">禁用</Option>
              <Option value="pending">待激活</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 用户详情查看模态框 */}
      <Modal
        title="用户详情"
        visible={detailModalVisible}
        onCancel={() => {
          setDetailModalVisible(false);
          setCurrentUser(null);
        }}
        footer={
          <Button type="primary" onClick={() => setDetailModalVisible(false)}>
            确定
          </Button>
        }
        style={{ width: 600 }}
      >
        {currentUser && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px 24px', alignItems: 'center' }}>
              <Text type="secondary">用户头像：</Text>
              <div>
                <Avatar size={60} style={{ backgroundColor: '#165DFF' }}>
                  <IconUser />
                </Avatar>
              </div>

              <Text type="secondary">用户名：</Text>
              <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>{currentUser.username}</Text>

              <Text type="secondary">邮箱地址：</Text>
              <Text copyable={{ text: currentUser.email }}>{currentUser.email}</Text>

              <Text type="secondary">手机号：</Text>
              <Text copyable={{ text: currentUser.phone }}>{currentUser.phone}</Text>

              <Text type="secondary">所属公司：</Text>
              <Text>{currentUser.company}</Text>

              <Text type="secondary">用户角色：</Text>
              <div>{getRoleTag(currentUser.role)}</div>

              <Text type="secondary">用户状态：</Text>
              <div>{getStatusTag(currentUser.status)}</div>

              <Text type="secondary">最后登录：</Text>
              <Text>{currentUser.lastLogin}</Text>

              <Text type="secondary">创建时间：</Text>
              <Text>{currentUser.createTime}</Text>

              <Text type="secondary">用户ID：</Text>
              <Text copyable={{ text: currentUser.id }} style={{ fontFamily: 'monospace' }}>
                {currentUser.id}
              </Text>
            </div>
          </div>
        )}
      </Modal>

      {/* 绑定企业模态框 */}
      <Modal
        title="绑定企业"
        visible={bindCompanyModalVisible}
        onCancel={() => {
          setBindCompanyModalVisible(false);
          setCurrentUser(null);
          bindCompanyForm.resetFields();
        }}
        onOk={() => {
          bindCompanyForm.validate().then((values) => {
            const roleText = values.targetRole === 'super_admin' ? '超级管理员' : '普通员工';
            Message.success(`已成功为用户 ${currentUser?.username} 绑定企业：${values.targetCompany}，角色：${roleText}`);
            setBindCompanyModalVisible(false);
            setCurrentUser(null);
            bindCompanyForm.resetFields();
          }).catch((error) => {
            console.error('表单验证失败:', error);
          });
        }}
        okText="确定绑定"
        cancelText="取消"
        style={{ width: 500 }}
      >
        {currentUser && (
          <Form
            form={bindCompanyForm}
            layout="vertical"
            autoComplete="off"
          >
                         <div style={{ padding: '16px', backgroundColor: '#F7F8FA', borderRadius: '6px', marginBottom: '16px' }}>
               <Text type="secondary">当前用户：</Text>
               <Text style={{ fontWeight: 'bold', marginLeft: '8px' }}>{currentUser.username}</Text>
               <br />
               <Text type="secondary">当前企业：</Text>
               <Text style={{ marginLeft: '8px' }}>{currentUser.company}</Text>
               <br />
               <Text type="secondary">当前企业内角色：</Text>
               <span style={{ marginLeft: '8px' }}>{getRoleTag(currentUser.role)}</span>
             </div>

            <Form.Item
              label="目标企业"
              field="targetCompany"
              rules={[
                { required: true, message: '请选择要绑定的企业' }
              ]}
            >
              <Select placeholder="请选择要绑定的企业">
                <Option value="货拉拉物流科技有限公司">货拉拉物流科技有限公司</Option>
                <Option value="顺丰速运集团">顺丰速运集团</Option>
                <Option value="德邦物流股份有限公司">德邦物流股份有限公司</Option>
                <Option value="中通快递股份有限公司">中通快递股份有限公司</Option>
                <Option value="申通快递有限公司">申通快递有限公司</Option>
                <Option value="圆通速递股份有限公司">圆通速递股份有限公司</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="目标角色"
              field="targetRole"
              rules={[
                { required: true, message: '请选择目标角色' }
              ]}
            >
              <Select placeholder="请选择目标角色">
                <Option value="super_admin">超级管理员</Option>
                <Option value="user">普通员工</Option>
              </Select>
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* 重置密码确认弹窗 */}
      <Modal
        title="重置密码确认"
        visible={resetConfirmModalVisible}
        onCancel={() => {
          setResetConfirmModalVisible(false);
          setCurrentUser(null);
        }}
        onOk={confirmResetPassword}
        okText="确认重置"
        cancelText="取消"
        style={{ width: 480 }}
      >
        {currentUser && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ 
              backgroundColor: '#FFF7E6', 
              border: '1px solid #FFD591', 
              borderRadius: '6px', 
              padding: '16px',
              marginBottom: '16px'
            }}>
              <Text style={{ fontSize: '16px', color: '#FA8C16', fontWeight: 'bold' }}>
                ⚠️ 操作确认
              </Text>
            </div>
            
            <Text style={{ fontSize: '16px', lineHeight: '24px' }}>
              将会重置用户 <Text style={{ fontWeight: 'bold', color: '#165DFF' }}>{currentUser.username}</Text> 的登录密码，是否确认？
            </Text>
            
            <div style={{ 
              backgroundColor: '#F6F6F6', 
              borderRadius: '6px', 
              padding: '12px',
              marginTop: '16px'
            }}>
              <Text type="secondary" style={{ fontSize: '14px' }}>
                注意：密码重置后将生成随机8位密码，并自动发送至用户邮箱
              </Text>
            </div>
          </div>
        )}
      </Modal>

      {/* 用户状态切换确认弹窗 */}
      <Modal
        title="用户状态确认"
        visible={toggleStatusModalVisible}
        onCancel={() => {
          setToggleStatusModalVisible(false);
          setTargetUser(null);
        }}
        footer={[
          <Button key="cancel" onClick={() => {
            setToggleStatusModalVisible(false);
            setTargetUser(null);
          }}>
            取消
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirmToggleStatus}>
            确定{targetUser?.status === 'active' ? '禁用' : '启用'}
          </Button>
        ]}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '16px', 
              height: '16px', 
              borderRadius: '50%', 
              backgroundColor: targetUser?.status === 'active' ? '#FF7D00' : '#165DFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>
                {targetUser?.status === 'active' ? '!' : '✓'}
              </Text>
            </div>
            <Text>
              确定要{targetUser?.status === 'active' ? '禁用' : '启用'}用户 
              <Text style={{ color: '#165DFF', fontWeight: 'bold' }}> {targetUser?.username} </Text>
              吗？
            </Text>
          </div>
          
          {targetUser?.status === 'active' ? (
            <div style={{ 
              padding: '12px', 
              backgroundColor: '#FFF7E6', 
              border: '1px solid #FFD666',
              borderRadius: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Text style={{ color: '#FF7D00', fontWeight: 'bold', fontSize: '14px' }}>⚠️ 禁用警告</Text>
              </div>
              <Text style={{ color: '#86909C', fontSize: '13px' }}>
                禁用后，该用户将无法登录系统，所有正在进行的操作将被中断。
              </Text>
            </div>
          ) : (
            <div style={{ 
              padding: '12px', 
              backgroundColor: '#F8F9FF', 
              border: '1px solid #B8D4FF',
              borderRadius: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Text style={{ color: '#165DFF', fontWeight: 'bold', fontSize: '14px' }}>✓ 启用说明</Text>
              </div>
              <Text style={{ color: '#86909C', fontSize: '13px' }}>
                启用后，该用户将恢复正常的系统访问权限，可以重新登录使用系统。
              </Text>
            </div>
          )}
          
          <div style={{ 
            padding: '12px', 
            backgroundColor: '#F7F8FA', 
            border: '1px solid #E5E6EB',
            borderRadius: '6px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">用户信息：</Text>
                <Text>{targetUser?.username}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">所属企业：</Text>
                <Text>{targetUser?.company}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">当前状态：</Text>
                {targetUser && getStatusTag(targetUser.status)}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* 重置密码成功提示弹窗 */}
      <Modal
        title="密码重置成功"
        visible={resetPasswordModalVisible}
        onCancel={() => {
          setResetPasswordModalVisible(false);
          setCurrentUser(null);
          setNewPassword('');
        }}
        footer={
          <Button type="primary" onClick={() => {
            setResetPasswordModalVisible(false);
            setCurrentUser(null);
            setNewPassword('');
          }}>
            确定
          </Button>
        }
        style={{ width: 500 }}
      >
        {currentUser && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ 
              backgroundColor: '#F0F9FF', 
              border: '1px solid #BAE7FF', 
              borderRadius: '6px', 
              padding: '16px',
              marginBottom: '16px'
            }}>
              <Text style={{ fontSize: '16px', color: '#1890FF', fontWeight: 'bold' }}>
                🎉 密码重置成功！
              </Text>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Text type="secondary" style={{ minWidth: '80px' }}>用户名称：</Text>
                <Text style={{ fontWeight: 'bold' }}>{currentUser.username}</Text>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Text type="secondary" style={{ minWidth: '80px' }}>新密码：</Text>
                <Text 
                  copyable={{ text: newPassword }} 
                  style={{ 
                    fontFamily: 'monospace', 
                    fontSize: '16px', 
                    backgroundColor: '#F6F6F6',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    color: '#165DFF'
                  }}
                >
                  {newPassword}
                </Text>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Text type="secondary" style={{ minWidth: '80px' }}>用户邮箱：</Text>
                <Text copyable={{ text: currentUser.email }}>{currentUser.email}</Text>
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: '#F6FFED', 
              border: '1px solid #B7EB8F', 
              borderRadius: '6px', 
              padding: '12px',
              marginTop: '16px'
            }}>
              <Text style={{ fontSize: '14px', color: '#52C41A' }}>
                ✅ 密码重置信息已自动发送至用户邮箱 {currentUser.email}
              </Text>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement; 