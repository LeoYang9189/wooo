import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Table, 
  Button, 
  Input, 
  Space, 
  Tag,
  Modal,
  Form,
  Message,
  Switch,
  Tooltip
} from '@arco-design/web-react';
import { 
  IconSearch, 
  IconPlus, 
  IconRefresh,
  IconEdit,
  IconDelete,
  IconUser,
  IconSettings
} from '@arco-design/web-react/icon';

const { Title } = Typography;

interface RoleData {
  id: string;
  roleName: string;
  roleCode: string;
  description: string;
  userCount: number;
  status: 'active' | 'inactive';
  createTime: string;
  permissions: string[];
}



const PermissionManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState<RoleData | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [form] = Form.useForm();



  // 模拟角色数据
  const [roleData, setRoleData] = useState<RoleData[]>([
    {
      id: '1',
      roleName: '超级管理员',
      roleCode: 'super_admin',
      description: '拥有系统所有权限的管理员角色',
      userCount: 2,
      status: 'active',
      createTime: '2023-12-01 09:15:30',
      permissions: ['dashboard:view', 'dashboard:export', 'order:view', 'order:create', 'order:edit', 'order:delete', 'order:export', 'user:view', 'user:create', 'user:edit', 'user:delete', 'user:resetPassword', 'company:view', 'company:create', 'company:edit', 'company:delete', 'company:audit', 'system:role', 'system:permission', 'system:config', 'system:log']
    },
    {
      id: '2',
      roleName: '订单管理员',
      roleCode: 'order_admin',
      description: '负责订单相关操作的管理员',
      userCount: 5,
      status: 'active',
      createTime: '2023-12-05 14:20:15',
      permissions: ['dashboard:view', 'order:view', 'order:create', 'order:edit', 'order:export']
    },
    {
      id: '3',
      roleName: '客服专员',
      roleCode: 'customer_service',
      description: '客户服务相关权限',
      userCount: 8,
      status: 'active',
      createTime: '2023-12-10 16:45:22',
      permissions: ['dashboard:view', 'order:view', 'user:view', 'company:view']
    },
    {
      id: '4',
      roleName: '财务专员',
      roleCode: 'finance',
      description: '财务相关操作权限',
      userCount: 3,
      status: 'inactive',
      createTime: '2023-12-15 11:30:18',
      permissions: ['dashboard:view', 'order:view', 'order:export']
    }
  ]);

  // 过滤后的数据
  const filteredData = roleData.filter(role => 
    role.roleName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    role.roleCode.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    role.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Message.success('搜索完成');
    }, 1000);
  };

  const handleRefresh = () => {
    setLoading(true);
    setSearchKeyword('');
    setTimeout(() => {
      setLoading(false);
      Message.success('刷新完成');
    }, 1000);
  };

  const handleAddRole = () => {
    setCurrentRole(null);
    setSelectedPermissions([]);
    form.resetFields();
    setRoleModalVisible(true);
  };

  const handleEditRole = (role: RoleData) => {
    setCurrentRole(role);
    setSelectedPermissions(role.permissions);
    form.setFieldsValue({
      roleName: role.roleName,
      roleCode: role.roleCode,
      description: role.description,
      status: role.status === 'active'
    });
    setRoleModalVisible(true);
  };

  const handleConfigPermission = (role: RoleData) => {
    setCurrentRole(role);
    setSelectedPermissions(role.permissions);
    setPermissionModalVisible(true);
  };

  const handleDeleteRole = (roleId: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个角色吗？删除后不可恢复。',
      onOk: () => {
        setRoleData(prev => prev.filter(role => role.id !== roleId));
        Message.success('删除成功');
      }
    });
  };

  const handleRoleSubmit = () => {
    form.validate().then(values => {
      if (currentRole) {
        // 编辑角色
        setRoleData(prev => prev.map(role => 
          role.id === currentRole.id 
            ? { 
                ...role, 
                roleName: values.roleName,
                roleCode: values.roleCode,
                description: values.description,
                status: values.status ? 'active' : 'inactive'
              }
            : role
        ));
        Message.success('角色更新成功');
      } else {
        // 新增角色
        const newRole: RoleData = {
          id: Date.now().toString(),
          roleName: values.roleName,
          roleCode: values.roleCode,
          description: values.description,
          userCount: 0,
          status: values.status ? 'active' : 'inactive',
          createTime: new Date().toLocaleString(),
          permissions: []
        };
        setRoleData(prev => [...prev, newRole]);
        Message.success('角色创建成功');
      }
      setRoleModalVisible(false);
    });
  };

  const handlePermissionSubmit = () => {
    if (currentRole) {
      setRoleData(prev => prev.map(role => 
        role.id === currentRole.id 
          ? { ...role, permissions: selectedPermissions }
          : role
      ));
      Message.success('权限配置成功');
      setPermissionModalVisible(false);
    }
  };

  const getStatusTag = (status: string) => {
    const statusConfig = {
      active: { color: 'green', text: '启用' },
      inactive: { color: 'red', text: '禁用' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'gray', text: '未知' };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      width: 150,
      render: (text: string) => <strong>{text}</strong>
    },
    {
      title: '角色编码',
      dataIndex: 'roleCode',
      key: 'roleCode',
      width: 150,
      render: (text: string) => <Tag color="blue">{text}</Tag>
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    },
    {
      title: '用户数量',
      dataIndex: 'userCount',
      key: 'userCount',
      width: 100,
      render: (count: number) => <span style={{ color: '#165DFF' }}>{count}</span>
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => getStatusTag(status)
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      fixed: 'right' as const,
      render: (_: any, record: RoleData) => (
        <Space>
          <Tooltip content="编辑角色">
            <Button 
              type="text" 
              icon={<IconEdit />} 
              onClick={() => handleEditRole(record)}
            />
          </Tooltip>
          <Tooltip content="配置权限">
            <Button 
              type="text" 
              icon={<IconSettings />} 
              onClick={() => handleConfigPermission(record)}
            />
          </Tooltip>
          <Tooltip content="删除角色">
            <Button 
              type="text" 
              status="danger"
              icon={<IconDelete />} 
              onClick={() => handleDeleteRole(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center' }}>
        <IconUser style={{ marginRight: '8px' }} />
        <Title heading={4}>权限管理</Title>
      </div>

      {/* 搜索和操作区域 */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space>
            <Input
              placeholder="搜索角色名称、编码或描述"
              value={searchKeyword}
              onChange={setSearchKeyword}
              style={{ width: 300 }}
              suffix={<IconSearch />}
              onPressEnter={handleSearch}
            />
            <Button type="primary" icon={<IconSearch />} onClick={handleSearch}>
              搜索
            </Button>
            <Button icon={<IconRefresh />} onClick={handleRefresh}>
              刷新
            </Button>
          </Space>
          <Button type="primary" icon={<IconPlus />} onClick={handleAddRole}>
            新增角色
          </Button>
        </div>
      </Card>

      {/* 数据表格 */}
      <Card>
        <Table
          columns={columns}
          data={filteredData}
          loading={loading}
          pagination={{
            total: filteredData.length,
            pageSize: 10,
            current: 1,
            showTotal: true,
            showJumper: true,
            sizeCanChange: true,
          }}
          scroll={{ x: 1000 }}
          rowKey="id"
        />
      </Card>

      {/* 角色编辑弹窗 */}
      <Modal
        title={currentRole ? '编辑角色' : '新增角色'}
        visible={roleModalVisible}
        onOk={handleRoleSubmit}
        onCancel={() => setRoleModalVisible(false)}
        okText="确定"
        cancelText="取消"
        style={{ width: 600 }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="角色名称"
            field="roleName"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>
          <Form.Item
            label="角色编码"
            field="roleCode"
            rules={[{ required: true, message: '请输入角色编码' }]}
          >
            <Input placeholder="请输入角色编码" />
          </Form.Item>
          <Form.Item
            label="描述"
            field="description"
            rules={[{ required: true, message: '请输入角色描述' }]}
          >
            <Input.TextArea placeholder="请输入角色描述" rows={3} />
          </Form.Item>
          <Form.Item
            label="状态"
            field="status"
            triggerPropName="checked"
          >
            <Switch checkedText="启用" uncheckedText="禁用" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 权限配置弹窗 */}
      <Modal
        title="配置权限"
        visible={permissionModalVisible}
        onOk={handlePermissionSubmit}
        onCancel={() => setPermissionModalVisible(false)}
        okText="确定"
        cancelText="取消"
        style={{ width: 800 }}
      >
        <div style={{ marginBottom: '16px' }}>
          <strong>角色：{currentRole?.roleName}</strong>
        </div>
        <div style={{ border: '1px solid #e4e7ed', borderRadius: '4px', padding: '16px' }}>
          <div>权限配置功能开发中...</div>
        </div>
      </Modal>
    </div>
  );
};

export default PermissionManagement; 