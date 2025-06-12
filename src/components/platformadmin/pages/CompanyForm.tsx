import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Typography, 
  Tabs, 
  Form, 
  Input, 
  Select, 
  Button, 
  Space, 
  Message,
  Breadcrumb,
  Table,
  Tag,
  Switch,
  Avatar,
  Modal
} from '@arco-design/web-react';
import { 
  IconArrowLeft,
  IconSave,
  IconUser,
  IconPhone,
  IconEmail,
  IconPlus,
  IconEdit,
  IconDelete,
  IconStar,
  IconStarFill
} from '@arco-design/web-react/icon';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

interface CompanyFormData {
  id?: string;
  name: string;
  englishName: string;
  businessLicense: string;
  industry: string;
  scale: string;
  address: string;
  description: string;
  status: 'active' | 'inactive' | 'pending' | 'rejected';
}

interface ContactPerson {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  isDefault: boolean;
}

interface RelatedUser {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: 'super_admin' | 'user';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  createTime: string;
}

interface AuthorizedProduct {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  expireDate: string;
}

interface FinancialInfo {
  taxNumber: string;
  registeredCapital: string;
  bankName: string;
  bankAccount: string;
  creditCode: string;
  paymentTerms: string;
}

const CompanyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [form] = Form.useForm();
  const [contactForm] = Form.useForm();
  const [financialForm] = Form.useForm();
  
  const isEdit = Boolean(id && id !== 'add');
  const pageTitle = isEdit ? '编辑企业' : '添加企业';

  // 模拟企业数据
  const [, setCompanyData] = useState<CompanyFormData>({
    name: '',
    englishName: '',
    businessLicense: '',
    industry: '',
    scale: '',
    address: '',
    description: '',
    status: 'pending'
  });

  // 联系人数据
  const [contacts, setContacts] = useState<ContactPerson[]>([]);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactPerson | null>(null);

  // 模拟关联用户数据
  const [relatedUsers] = useState<RelatedUser[]>([
    {
      id: 'A3K9M2X7N8Q5',
      username: '张三',
      email: 'zhangsan@example.com',
      phone: '13800138001',
      role: 'super_admin',
      status: 'active',
      lastLogin: '2024-01-15 14:30:22',
      createTime: '2023-12-01 09:15:30'
    },
    {
      id: 'E9L4Z2M6X8Q3',
      username: '陈七',
      email: 'chenqi@example.com',
      phone: '13800138007',
      role: 'user',
      status: 'active',
      lastLogin: '2024-01-14 16:45:10',
      createTime: '2023-12-15 14:20:45'
    }
  ]);

  // 模拟已授权产品数据
  const [authorizedProducts, setAuthorizedProducts] = useState<AuthorizedProduct[]>([
    {
      id: 'product-1',
      name: '超级运价',
      description: '智能运价计算和优化系统',
      enabled: true,
      expireDate: '2024-12-31'
    },
    {
      id: 'product-2',
      name: '控制塔',
      description: '物流全程可视化管控平台',
      enabled: true,
      expireDate: '2024-12-31'
    },
    {
      id: 'product-3',
      name: '智慧箱管',
      description: '集装箱智能管理系统',
      enabled: false,
      expireDate: '2024-06-30'
    }
  ]);

  // 财务信息数据
  const [, setFinancialInfo] = useState<FinancialInfo>({
    taxNumber: '',
    registeredCapital: '',
    bankName: '',
    bankAccount: '',
    creditCode: '',
    paymentTerms: ''
  });

  useEffect(() => {
    if (isEdit) {
      // 模拟加载企业数据
      setLoading(true);
      setTimeout(() => {
        const mockData: CompanyFormData = {
          id: id,
          name: '货拉拉物流科技有限公司',
          englishName: 'Huolala Logistics Technology Co., Ltd.',
          businessLicense: '91110000123456789X',
          industry: '物流运输',
          scale: '大型企业',
          address: '北京市朝阳区建国路88号SOHO现代城',
          description: '专业的物流科技服务提供商，致力于为客户提供高效、便捷的物流解决方案。',
          status: 'active'
        };
        setCompanyData(mockData);
        form.setFieldsValue(mockData);

        // 模拟联系人数据
        const mockContacts: ContactPerson[] = [
          {
            id: '1',
            name: '张经理',
            title: '商务总监',
            phone: '13800138001',
            email: 'zhang@huolala.com',
            isDefault: true
          },
          {
            id: '2',
            name: '李助理',
            title: '商务助理',
            phone: '13800138002',
            email: 'li@huolala.com',
            isDefault: false
          }
        ];
        setContacts(mockContacts);

        // 模拟财务信息
        const mockFinancial: FinancialInfo = {
          taxNumber: '91110000123456789X',
          registeredCapital: '10000万元',
          bankName: '中国银行北京分行',
          bankAccount: '1234567890123456',
          creditCode: '91110000123456789X',
          paymentTerms: '月结30天'
        };
        setFinancialInfo(mockFinancial);
        financialForm.setFieldsValue(mockFinancial);

        setLoading(false);
      }, 1000);
    }
  }, [id, isEdit, form, financialForm]);

  const handleSave = () => {
    form.validate().then(() => {
      setLoading(true);
      setTimeout(() => {
        if (isEdit) {
          Message.success('企业信息已更新');
        } else {
          Message.success('企业已添加');
        }
        setLoading(false);
        navigate('/platformadmin/company-management');
      }, 1000);
    }).catch((error) => {
      console.error('表单验证失败:', error);
    });
  };

  const handleProductToggle = (productId: string, enabled: boolean) => {
    setAuthorizedProducts(prev => 
      prev.map(product => 
        product.id === productId ? { ...product, enabled } : product
      )
    );
    Message.success(`产品授权已${enabled ? '启用' : '停用'}`);
  };

  const handleAddContact = () => {
    setEditingContact(null);
    contactForm.resetFields();
    setContactModalVisible(true);
  };

  const handleEditContact = (contact: ContactPerson) => {
    setEditingContact(contact);
    contactForm.setFieldsValue(contact);
    setContactModalVisible(true);
  };

  const handleDeleteContact = (contactId: string) => {
    Modal.confirm({
      title: '确定要删除这个联系人吗？',
      content: '删除后将无法恢复',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setContacts(prev => prev.filter(c => c.id !== contactId));
        Message.success('联系人已删除');
      }
    });
  };

  const handleSetDefaultContact = (contactId: string) => {
    setContacts(prev => prev.map(contact => ({
      ...contact,
      isDefault: contact.id === contactId
    })));
    Message.success('已设置为默认联系人');
  };

  const handleContactSubmit = () => {
    contactForm.validate().then((values) => {
      if (editingContact) {
        // 编辑联系人
        setContacts(prev => prev.map(contact => 
          contact.id === editingContact.id 
            ? { ...contact, ...values }
            : contact
        ));
        Message.success('联系人信息已更新');
      } else {
        // 添加新联系人
        const newContact: ContactPerson = {
          id: Date.now().toString(),
          ...values,
          isDefault: contacts.length === 0 // 如果是第一个联系人，自动设为默认
        };
        setContacts(prev => [...prev, newContact]);
        Message.success('联系人已添加');
      }
      setContactModalVisible(false);
      setEditingContact(null);
      contactForm.resetFields();
    }).catch((error) => {
      console.error('联系人表单验证失败:', error);
    });
  };

  const handleFinancialSave = () => {
    financialForm.validate().then((values) => {
      setFinancialInfo(values);
      Message.success('财务信息已保存');
    }).catch((error) => {
      console.error('财务信息表单验证失败:', error);
    });
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

  // 基本信息Tab内容
  const BasicInfoTab = () => (
    <Card>
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item
            label="企业名称"
            field="name"
            rules={[
              { required: true, message: '请输入企业名称' }
            ]}
          >
            <Input placeholder="请输入企业名称" />
          </Form.Item>

          <Form.Item
            label="英文名称"
            field="englishName"
            rules={[
              { required: true, message: '请输入企业英文名称' }
            ]}
          >
            <Input placeholder="请输入企业英文名称" />
          </Form.Item>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item
            label="营业执照号"
            field="businessLicense"
            rules={[
              { required: true, message: '请输入营业执照号' },
              {
                validator: (value, callback) => {
                  if (value && !/^[0-9A-Z]{18}$/.test(value)) {
                    callback('请输入有效的营业执照号（18位数字和字母）');
                  } else {
                    callback();
                  }
                }
              }
            ]}
          >
            <Input placeholder="请输入18位营业执照号" />
          </Form.Item>

          <Form.Item
            label="企业状态"
            field="status"
            rules={[
              { required: true, message: '请选择企业状态' }
            ]}
          >
            <Select placeholder="请选择企业状态">
              <Option value="active">正常营业</Option>
              <Option value="inactive">已停用</Option>
              <Option value="pending">待审核</Option>
              <Option value="rejected">审核拒绝</Option>
            </Select>
          </Form.Item>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item
            label="行业类型"
            field="industry"
            rules={[
              { required: true, message: '请选择行业类型' }
            ]}
          >
            <Select placeholder="请选择行业类型">
              <Option value="物流运输">物流运输</Option>
              <Option value="快递服务">快递服务</Option>
              <Option value="仓储服务">仓储服务</Option>
              <Option value="供应链">供应链</Option>
              <Option value="电商">电商</Option>
              <Option value="制造业">制造业</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="企业规模"
            field="scale"
            rules={[
              { required: true, message: '请选择企业规模' }
            ]}
          >
            <Select placeholder="请选择企业规模">
              <Option value="小型企业">小型企业</Option>
              <Option value="中型企业">中型企业</Option>
              <Option value="大型企业">大型企业</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          label="企业地址"
          field="address"
          rules={[
            { required: true, message: '请输入企业地址' }
          ]}
        >
          <Input placeholder="请输入详细的企业地址" />
        </Form.Item>

        <Form.Item
          label="企业描述"
          field="description"
        >
          <Input.TextArea
            placeholder="请输入企业描述（可选）"
            rows={4}
            maxLength={500}
            showWordLimit
          />
        </Form.Item>
      </Form>
    </Card>
  );

  // 联系人Tab内容
  const ContactTab = () => (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Title heading={6} style={{ margin: 0 }}>
          联系人列表 ({contacts.length})
        </Title>
        <Button 
          type="primary" 
          icon={<IconPlus />}
          onClick={handleAddContact}
        >
          添加联系人
        </Button>
      </div>
      
      <Table
        data={contacts}
        columns={[
          {
            title: '联系人信息',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Avatar size={32} style={{ backgroundColor: '#165DFF' }}>
                  <IconUser />
                </Avatar>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: '14px' }}>
                      {record.name}
                    </Text>
                    {record.isDefault && (
                      <Tag color="orange" icon={<IconStarFill />}>
                        默认
                      </Tag>
                    )}
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {record.title}
                  </Text>
                </div>
              </div>
            )
          },
          {
            title: '联系方式',
            dataIndex: 'phone',
            key: 'contact',
            render: (_, record) => (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                  <IconPhone style={{ fontSize: '12px', color: '#86909C' }} />
                  <Text copyable={{ text: record.phone }} style={{ fontSize: '12px' }}>
                    {record.phone}
                  </Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <IconEmail style={{ fontSize: '12px', color: '#86909C' }} />
                  <Text copyable={{ text: record.email }} style={{ fontSize: '12px' }}>
                    {record.email}
                  </Text>
                </div>
              </div>
            )
          },
          {
            title: '操作',
            key: 'actions',
            width: 200,
            render: (_, record) => (
              <Space>
                {!record.isDefault && (
                  <Button 
                    type="text" 
                    size="small" 
                    icon={<IconStar />}
                    onClick={() => handleSetDefaultContact(record.id)}
                  >
                    设为默认
                  </Button>
                )}
                <Button 
                  type="text" 
                  size="small" 
                  icon={<IconEdit />}
                  onClick={() => handleEditContact(record)}
                >
                  编辑
                </Button>
                <Button 
                  type="text" 
                  size="small" 
                  status="danger"
                  icon={<IconDelete />}
                  onClick={() => handleDeleteContact(record.id)}
                  disabled={contacts.length === 1}
                >
                  删除
                </Button>
              </Space>
            )
          }
        ]}
        pagination={false}
        border
      />

      {/* 联系人添加/编辑模态框 */}
      <Modal
        title={editingContact ? "编辑联系人" : "添加联系人"}
        visible={contactModalVisible}
        onCancel={() => {
          setContactModalVisible(false);
          setEditingContact(null);
          contactForm.resetFields();
        }}
        onOk={handleContactSubmit}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={contactForm}
          layout="vertical"
          autoComplete="off"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              label="联系人姓名"
              field="name"
              rules={[
                { required: true, message: '请输入联系人姓名' }
              ]}
            >
              <Input placeholder="请输入联系人姓名" />
            </Form.Item>

            <Form.Item
              label="联系人职位"
              field="title"
            >
              <Input placeholder="请输入联系人职位" />
            </Form.Item>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              label="联系电话"
              field="phone"
              rules={[
                { required: true, message: '请输入联系电话' },
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
              <Input placeholder="请输入联系电话" />
            </Form.Item>

            <Form.Item
              label="邮箱地址"
              field="email"
              rules={[
                { required: true, message: '请输入邮箱地址' },
                { 
                  type: 'email', 
                  message: '请输入有效的邮箱地址' 
                }
              ]}
            >
              <Input placeholder="请输入邮箱地址" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </Card>
  );

  // 关联用户Tab内容
  const RelatedUsersTab = () => (
    <Card title={`关联用户 (${relatedUsers.length})`}>
      <Table
        data={relatedUsers}
        columns={[
          {
            title: '用户ID',
            dataIndex: 'id',
            key: 'id',
            width: 120,
            render: (id) => (
              <Text style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                {id}
              </Text>
            )
          },
          {
            title: '用户信息',
            dataIndex: 'username',
            key: 'username',
            width: 200,
            render: (_, record) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Avatar size={32} style={{ backgroundColor: '#165DFF' }}>
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
            width: 140,
            render: (phone) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <IconPhone style={{ fontSize: '12px', color: '#86909C' }} />
                <Text copyable={{ text: phone }} style={{ fontSize: '12px' }}>
                  {phone}
                </Text>
              </div>
            )
          },
          {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
            width: 120,
            render: (role) => getRoleTag(role)
          },
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 90,
            render: (status) => getStatusTag(status)
          },
          {
            title: '最后登录',
            dataIndex: 'lastLogin',
            key: 'lastLogin',
            width: 160,
            render: (lastLogin) => (
              <Text style={{ fontSize: '12px' }}>
                {lastLogin}
              </Text>
            )
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 160,
            render: (createTime) => (
              <Text style={{ fontSize: '12px' }}>
                {createTime}
              </Text>
            )
          },
          {
            title: '操作',
            key: 'actions',
            width: 140,
            render: () => (
              <Space>
                <Button type="text" size="small">
                  详情
                </Button>
                <Button type="text" size="small" status="danger">
                  移除
                </Button>
              </Space>
            )
          }
        ]}
        pagination={false}
        border
        scroll={{ x: 1130 }}
      />
    </Card>
  );

  // 已授权产品Tab内容
  const AuthorizedProductsTab = () => (
    <Card title={`已授权产品 (${authorizedProducts.filter(p => p.enabled).length}/${authorizedProducts.length})`}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {authorizedProducts.map(product => (
          <Card 
            key={product.id}
            style={{ 
              border: `2px solid ${product.enabled ? '#165DFF' : '#E5E6EB'}`,
              backgroundColor: product.enabled ? '#F8F9FF' : '#FFFFFF'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <Title heading={6} style={{ margin: 0, marginBottom: '4px' }}>
                  {product.name}
                </Title>
                <Tag color={product.enabled ? 'green' : 'red'}>
                  {product.enabled ? '已启用' : '已停用'}
                </Tag>
              </div>
              <Switch
                checked={product.enabled}
                onChange={(checked) => handleProductToggle(product.id, checked)}
              />
            </div>
            
            <Text type="secondary" style={{ fontSize: '13px', marginBottom: '12px', display: 'block' }}>
              {product.description}
            </Text>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
              <Text type="secondary">到期时间</Text>
              <Text style={{ color: product.enabled ? '#165DFF' : '#86909C' }}>
                {product.expireDate}
              </Text>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );

  // 财务信息Tab内容
  const FinancialInfoTab = () => (
    <Card>
      <Form
        form={financialForm}
        layout="vertical"
        autoComplete="off"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item
            label="税务登记号"
            field="taxNumber"
            rules={[
              { required: true, message: '请输入税务登记号' }
            ]}
          >
            <Input placeholder="请输入税务登记号" />
          </Form.Item>

          <Form.Item
            label="注册资本"
            field="registeredCapital"
            rules={[
              { required: true, message: '请输入注册资本' }
            ]}
          >
            <Input placeholder="请输入注册资本，如：1000万元" />
          </Form.Item>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item
            label="开户银行"
            field="bankName"
            rules={[
              { required: true, message: '请输入开户银行' }
            ]}
          >
            <Input placeholder="请输入开户银行名称" />
          </Form.Item>

          <Form.Item
            label="银行账号"
            field="bankAccount"
            rules={[
              { required: true, message: '请输入银行账号' }
            ]}
          >
            <Input placeholder="请输入银行账号" />
          </Form.Item>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item
            label="统一社会信用代码"
            field="creditCode"
            rules={[
              { required: true, message: '请输入统一社会信用代码' }
            ]}
          >
            <Input placeholder="请输入统一社会信用代码" />
          </Form.Item>

          <Form.Item
            label="付款条件"
            field="paymentTerms"
          >
            <Select placeholder="请选择付款条件">
              <Option value="现金">现金</Option>
              <Option value="月结30天">月结30天</Option>
              <Option value="月结60天">月结60天</Option>
              <Option value="月结90天">月结90天</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Form.Item>
        </div>

        <div style={{ marginTop: '24px' }}>
          <Button type="primary" onClick={handleFinancialSave}>
            保存财务信息
          </Button>
        </div>
      </Form>
    </Card>
  );

  // WTF信息Tab内容
  const WTFInfoTab = () => (
    <Card>
      <div style={{ 
        textAlign: 'center', 
        padding: '60px 0',
        color: '#86909C'
      }}>
        <Title heading={4} style={{ color: '#86909C', marginBottom: '8px' }}>
          WTF信息
        </Title>
        <Text type="secondary">
          此页签内容正在开发中，敬请期待...
        </Text>
      </div>
    </Card>
  );

  return (
    <div>
      {/* 面包屑导航 */}
      <div style={{ marginBottom: '16px' }}>
        <Breadcrumb>
          <Breadcrumb.Item>平台运营后台</Breadcrumb.Item>
          <Breadcrumb.Item 
            onClick={() => navigate('/platformadmin/company-management')}
            style={{ cursor: 'pointer', color: '#165DFF' }}
          >
            企业管理
          </Breadcrumb.Item>
          <Breadcrumb.Item>{pageTitle}</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* 页面标题和操作 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button 
            type="text" 
            icon={<IconArrowLeft />}
            onClick={() => navigate('/platformadmin/company-management')}
          >
            返回
          </Button>
          <Title heading={4} style={{ margin: 0 }}>
            {pageTitle}
          </Title>
        </div>
        
        <Space>
          <Button onClick={() => navigate('/platformadmin/company-management')}>
            取消
          </Button>
          <Button 
            type="primary" 
            icon={<IconSave />}
            loading={loading}
            onClick={handleSave}
          >
            保存
          </Button>
        </Space>
      </div>

      {/* Tab页签内容 */}
      <Tabs 
        activeTab={activeTab} 
        onChange={setActiveTab}
        type="line"
        size="large"
      >
        <TabPane key="basic" title="基本信息">
          <BasicInfoTab />
        </TabPane>
        <TabPane key="contact" title="联系人">
          <ContactTab />
        </TabPane>
        <TabPane key="users" title="关联用户">
          <RelatedUsersTab />
        </TabPane>
        <TabPane key="products" title="已授权产品">
          <AuthorizedProductsTab />
        </TabPane>
        <TabPane key="financial" title="财务信息">
          <FinancialInfoTab />
        </TabPane>
        <TabPane key="wtf" title="WTF信息">
          <WTFInfoTab />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CompanyForm; 