import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Button, 
  Space, 
  Modal,
  Form,
  Input,
  Message,
  Descriptions,
  Grid,
  Checkbox,
  Empty,
  Menu,
  List
} from '@arco-design/web-react';
import { 
  IconSearch, 
  IconPlus, 
  IconRefresh,
  IconEdit,
  IconHome,
  IconUser,
  IconFolder,
  IconUnlock
} from '@arco-design/web-react/icon';

const { Title, Text } = Typography;
const { Row, Col } = Grid;

// 组织架构节点类型
type NodeType = 'company' | 'branch' | 'department' | 'role';

interface OrganizationNode {
  id: string;
  title: string;
  code: string;
  type: NodeType;
  parentId: string | null;
  description?: string;
  createTime: string;
  children?: OrganizationNode[];
  permissions?: string[];
}

// 权限项接口
interface PermissionItem {
  id: string;
  title: string;
  parentId: string | null;
  children?: PermissionItem[];
}

const PermissionManagement: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<OrganizationNode | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['HQ']);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'branch' | 'department' | 'role'>('branch');
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [form] = Form.useForm();
  
  // 权限相关状态
  const [assignedPermissions, setAssignedPermissions] = useState<string[]>([]);
  const [searchAssigned, setSearchAssigned] = useState('');
  const [searchAvailable, setSearchAvailable] = useState('');

  // 组织架构数据
  const [organizationData, setOrganizationData] = useState<OrganizationNode[]>([
    {
      id: 'HQ',
      title: '集团总公司',
      code: 'HQ',
      type: 'company',
      parentId: null,
      description: '企业集团总部',
      createTime: '2023-01-01 00:00:00',
      children: [
        {
          id: 'BRANCH_SH',
          title: '上海分公司',
          code: 'SH',
          type: 'branch',
          parentId: 'HQ',
          description: '上海地区分公司',
          createTime: '2023-03-01 09:00:00',
          children: [
            {
              id: 'DEPT_SH_LOGISTICS',
              title: '物流部门',
              code: 'LOGISTICS',
              type: 'department',
              parentId: 'BRANCH_SH',
              description: '负责物流运输业务',
              createTime: '2023-03-15 10:00:00',
              children: [
                {
                  id: 'ROLE_LOGISTICS_MANAGER',
                  title: '物流经理',
                  code: 'LOGISTICS_MANAGER',
                  type: 'role',
                  parentId: 'DEPT_SH_LOGISTICS',
                  description: '物流部门经理角色',
                  createTime: '2023-03-20 14:00:00',
                  permissions: ['order:view', 'order:create', 'logistics:manage']
                }
              ]
            }
          ]
        },
        {
          id: 'DEPT_HQ_HR',
          title: '人事部门',
          code: 'HR',
          type: 'department',
          parentId: 'HQ',
          description: '集团人力资源部',
          createTime: '2023-02-01 10:00:00',
          children: [
            {
              id: 'ROLE_HR_MANAGER',
              title: '人事经理',
              code: 'HR_MANAGER',
              type: 'role',
              parentId: 'DEPT_HQ_HR',
              description: '人事部经理角色',
              createTime: '2023-02-15 11:00:00',
              permissions: ['user:view', 'user:create', 'user:edit', 'employee:manage']
            }
          ]
        }
      ]
    }
  ]);

  // 权限数据
  const [permissionData] = useState<PermissionItem[]>([
    {
      id: 'dashboard',
      title: '仪表盘',
      parentId: null,
      children: [
        { id: 'dashboard:view', title: '查看仪表盘', parentId: 'dashboard' },
        { id: 'dashboard:export', title: '导出数据', parentId: 'dashboard' }
      ]
    },
    {
      id: 'order',
      title: '订单管理',
      parentId: null,
      children: [
        { id: 'order:view', title: '查看订单', parentId: 'order' },
        { id: 'order:create', title: '创建订单', parentId: 'order' },
        { id: 'order:edit', title: '编辑订单', parentId: 'order' },
        { id: 'order:delete', title: '删除订单', parentId: 'order' },
        { id: 'order:export', title: '导出订单', parentId: 'order' }
      ]
    },
    {
      id: 'user',
      title: '用户管理',
      parentId: null,
      children: [
        { id: 'user:view', title: '查看用户', parentId: 'user' },
        { id: 'user:create', title: '创建用户', parentId: 'user' },
        { id: 'user:edit', title: '编辑用户', parentId: 'user' },
        { id: 'user:delete', title: '删除用户', parentId: 'user' },
        { id: 'user:resetPassword', title: '重置密码', parentId: 'user' }
      ]
    },
    {
      id: 'company',
      title: '企业管理',
      parentId: null,
      children: [
        { id: 'company:view', title: '查看企业', parentId: 'company' },
        { id: 'company:create', title: '创建企业', parentId: 'company' },
        { id: 'company:edit', title: '编辑企业', parentId: 'company' },
        { id: 'company:audit', title: '企业审核', parentId: 'company' }
      ]
    },
    {
      id: 'system',
      title: '系统管理',
      parentId: null,
      children: [
        { id: 'system:role', title: '角色管理', parentId: 'system' },
        { id: 'system:permission', title: '权限管理', parentId: 'system' },
        { id: 'system:config', title: '系统配置', parentId: 'system' },
        { id: 'system:log', title: '操作日志', parentId: 'system' }
      ]
    },
    {
      id: 'logistics',
      title: '物流管理',
      parentId: null,
      children: [
        { id: 'logistics:manage', title: '物流调度', parentId: 'logistics' },
        { id: 'logistics:track', title: '物流跟踪', parentId: 'logistics' }
      ]
    },
    {
      id: 'employee',
      title: '员工管理',
      parentId: null,
      children: [
        { id: 'employee:manage', title: '员工管理', parentId: 'employee' },
        { id: 'employee:attendance', title: '考勤管理', parentId: 'employee' }
      ]
    }
  ]);

  // 初始化时选中集团总公司
  useEffect(() => {
    const hqNode = organizationData[0];
    if (hqNode) {
      setSelectedNode(hqNode);
    }
  }, [organizationData]);

  // 获取节点图标
  const getNodeIcon = (type: NodeType) => {
    switch (type) {
      case 'company':
        return <IconHome style={{ color: '#165DFF' }} />;
      case 'branch':
        return <IconHome style={{ color: '#00B42A' }} />;
      case 'department':
        return <IconFolder style={{ color: '#FF7D00' }} />;
      case 'role':
        return <IconUser style={{ color: '#722ED1' }} />;
      default:
        return <IconFolder />;
    }
  };

  // 递归查找节点
  const findNodeById = (nodes: OrganizationNode[], id: string): OrganizationNode | null => {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      }
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  // 递归更新节点
  const updateNodeInTree = (nodes: OrganizationNode[], targetId: string, updateFn: (node: OrganizationNode) => OrganizationNode): OrganizationNode[] => {
    return nodes.map(node => {
      if (node.id === targetId) {
        return updateFn(node);
      }
      if (node.children) {
        return {
          ...node,
          children: updateNodeInTree(node.children, targetId, updateFn)
        };
      }
      return node;
    });
  };

  // 递归添加子节点
  const addChildToNode = (nodes: OrganizationNode[], parentId: string, newChild: OrganizationNode): OrganizationNode[] => {
    return nodes.map(node => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...(node.children || []), newChild]
        };
      }
      if (node.children) {
        return {
          ...node,
          children: addChildToNode(node.children, parentId, newChild)
        };
      }
      return node;
    });
  };

  // 处理节点选择
  const handleNodeSelect = (nodeId: string) => {
    const node = findNodeById(organizationData, nodeId);
    if (node) {
      setSelectedNode(node);
      setSelectedKeys([nodeId]);
      if (node.type === 'role' && node.permissions) {
        setAssignedPermissions(node.permissions);
      }
    }
  };

  // 创建新节点
  const handleCreate = (type: 'branch' | 'department' | 'role') => {
    setModalType(type);
    form.resetFields();
    setModalVisible(true);
  };

  // 提交创建
  const handleSubmit = () => {
    form.validate().then(values => {
      if (!selectedNode) return;

      const newNode: OrganizationNode = {
        id: `${modalType.toUpperCase()}_${Date.now()}`,
        title: values.title,
        code: values.code,
        type: modalType,
        parentId: selectedNode.id,
        description: values.description,
        createTime: new Date().toLocaleString(),
        children: modalType === 'role' ? undefined : [],
        permissions: modalType === 'role' ? [] : undefined
      };

      setOrganizationData(prev => addChildToNode(prev, selectedNode.id, newNode));
      Message.success(`${getTypeText(modalType)}创建成功`);
      setModalVisible(false);
    });
  };

  // 获取类型文本
  const getTypeText = (type: NodeType) => {
    switch (type) {
      case 'company': return '集团';
      case 'branch': return '分公司';
      case 'department': return '部门';
      case 'role': return '角色';
      default: return '';
    }
  };

  // 配置权限
  const handleConfigPermission = () => {
    if (selectedNode && selectedNode.type === 'role') {
      setAssignedPermissions(selectedNode.permissions || []);
      setPermissionModalVisible(true);
    }
  };

  // 保存权限配置
  const handleSavePermissions = () => {
    if (!selectedNode || selectedNode.type !== 'role') return;

    setOrganizationData(prev => 
      updateNodeInTree(prev, selectedNode.id, node => ({
        ...node,
        permissions: assignedPermissions
      }))
    );

    // 更新当前选中节点
    setSelectedNode(prev => prev ? { ...prev, permissions: assignedPermissions } : null);
    
    Message.success('权限配置保存成功');
    setPermissionModalVisible(false);
  };

  // 递归渲染组织架构菜单
  const renderOrgMenu = (nodes: OrganizationNode[]): React.ReactNode[] => {
    return nodes.map(node => {
      if (node.children && node.children.length > 0) {
        return (
          <Menu.SubMenu
            key={node.id}
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {getNodeIcon(node.type)}
                <span>{node.title}</span>
                <Text type="secondary" style={{ fontSize: '12px' }}>({node.code})</Text>
              </div>
            }
          >
            <Menu.Item
              key={`${node.id}_self`}
              onClick={() => handleNodeSelect(node.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {getNodeIcon(node.type)}
                <span>{node.title}</span>
              </div>
            </Menu.Item>
            {renderOrgMenu(node.children)}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={node.id}
            onClick={() => handleNodeSelect(node.id)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {getNodeIcon(node.type)}
              <span>{node.title}</span>
              <Text type="secondary" style={{ fontSize: '12px' }}>({node.code})</Text>
            </div>
          </Menu.Item>
        );
      }
    });
  };

  // 渲染权限列表
  const renderPermissionList = (permissions: PermissionItem[], checkedKeys: string[], onCheck: (keys: string[]) => void, searchValue: string) => {
    const filteredPermissions = permissions.filter(perm => 
      !searchValue || 
      perm.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      (perm.children && perm.children.some(child => 
        child.title.toLowerCase().includes(searchValue.toLowerCase())
      ))
    );

    return (
      <List
        dataSource={filteredPermissions}
        render={(item) => (
          <List.Item key={item.id}>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Checkbox
                  checked={item.children ? item.children.every(child => checkedKeys.includes(child.id)) : checkedKeys.includes(item.id)}
                  indeterminate={item.children ? item.children.some(child => checkedKeys.includes(child.id)) && !item.children.every(child => checkedKeys.includes(child.id)) : false}
                  onChange={(checked) => {
                    let newKeys = [...checkedKeys];
                    if (item.children) {
                      if (checked) {
                        item.children.forEach(child => {
                          if (!newKeys.includes(child.id)) {
                            newKeys.push(child.id);
                          }
                        });
                      } else {
                        item.children.forEach(child => {
                          newKeys = newKeys.filter(key => key !== child.id);
                        });
                      }
                    } else {
                      if (checked) {
                        newKeys.push(item.id);
                      } else {
                        newKeys = newKeys.filter(key => key !== item.id);
                      }
                    }
                    onCheck(newKeys);
                  }}
                />
                <IconUnlock style={{ fontSize: '14px', color: '#165DFF' }} />
                <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
              </div>
              {item.children && (
                <div style={{ marginLeft: '32px' }}>
                  {item.children.map(child => (
                    <div key={child.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <Checkbox
                        checked={checkedKeys.includes(child.id)}
                        onChange={(checked) => {
                          let newKeys = [...checkedKeys];
                          if (checked) {
                            newKeys.push(child.id);
                          } else {
                            newKeys = newKeys.filter(key => key !== child.id);
                          }
                          onCheck(newKeys);
                        }}
                      />
                      <Text style={{ fontSize: '13px' }}>{child.title}</Text>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </List.Item>
        )}
      />
    );
  };

  // 渲染右侧内容
  const renderRightContent = () => {
    if (!selectedNode) {
      return <Empty description="请选择组织架构节点" />;
    }

    const { type, title, code, description, createTime } = selectedNode;

    // 根据节点类型显示不同内容
    switch (type) {
      case 'company':
      case 'branch':
      case 'department':
        return (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <Title heading={4} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {getNodeIcon(type)}
                {getTypeText(type)}基本信息
              </Title>
            </div>

            <Descriptions
              column={1}
              data={[
                { label: '名称', value: title },
                { label: '编码', value: code },
                { label: '描述', value: description || '-' },
                { label: '创建时间', value: createTime }
              ]}
              style={{ marginBottom: '32px' }}
            />

            <div>
              <Title heading={5} style={{ marginBottom: '16px' }}>操作</Title>
              <Space>
                {(type === 'company' || type === 'branch') && (
                  <Button 
                    type="primary" 
                    icon={<IconPlus />}
                    onClick={() => handleCreate('branch')}
                  >
                    创建分公司
                  </Button>
                )}
                <Button 
                  type="primary" 
                  icon={<IconPlus />}
                  onClick={() => handleCreate('department')}
                >
                  创建部门
                </Button>
                {type === 'department' && (
                  <Button 
                    type="primary" 
                    icon={<IconPlus />}
                    onClick={() => handleCreate('role')}
                  >
                    创建角色
                  </Button>
                )}
              </Space>
            </div>
          </div>
        );

      case 'role':
        return (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <Title heading={4} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {getNodeIcon(type)}
                角色权限配置
              </Title>
            </div>

            <Descriptions
              column={1}
              data={[
                { label: '角色名称', value: title },
                { label: '角色编码', value: code },
                { label: '描述', value: description || '-' },
                { label: '创建时间', value: createTime }
              ]}
              style={{ marginBottom: '24px' }}
            />

            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<IconEdit />}
                onClick={handleConfigPermission}
              >
                配置权限
              </Button>
            </div>

            <div>
              <Title heading={5} style={{ marginBottom: '16px' }}>
                当前权限 ({selectedNode.permissions?.length || 0})
              </Title>
              <div style={{ 
                border: '1px solid #E5E6EB', 
                borderRadius: '6px', 
                padding: '16px',
                minHeight: '200px',
                backgroundColor: '#F7F8FA'
              }}>
                {selectedNode.permissions && selectedNode.permissions.length > 0 ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedNode.permissions.map(permission => {
                      // 查找权限显示名称
                      const findPermissionTitle = (items: PermissionItem[], id: string): string => {
                        for (const item of items) {
                          if (item.id === id) return item.title;
                          if (item.children) {
                            const found = findPermissionTitle(item.children, id);
                            if (found) return found;
                          }
                        }
                        return id;
                      };
                      
                      return (
                        <div
                          key={permission}
                          style={{
                            padding: '4px 12px',
                            backgroundColor: '#165DFF',
                            color: 'white',
                            borderRadius: '4px',
                            fontSize: '12px'
                          }}
                        >
                          {findPermissionTitle(permissionData, permission)}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <Text type="secondary">暂无权限配置</Text>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return <Empty description="未知节点类型" />;
    }
  };

  return (
    <div style={{ padding: '0', height: 'calc(100vh - 120px)' }}>
      {/* 页面标题 */}
      <div style={{ marginBottom: '24px' }}>
        <Title heading={3} style={{ marginBottom: '8px' }}>权限管理</Title>
        <Text type="secondary">管理组织架构和角色权限配置</Text>
      </div>

      <Row gutter={24} style={{ height: 'calc(100% - 80px)' }}>
        {/* 左侧组织架构树 */}
        <Col span={8}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IconFolder />
                <span>组织架构</span>
              </div>
            }
            extra={
              <Button 
                icon={<IconRefresh />} 
                type="text" 
                onClick={() => Message.success('数据已刷新')}
              />
            }
            style={{ height: '100%' }}
            bodyStyle={{ height: 'calc(100% - 57px)', overflow: 'auto' }}
          >
            <Menu
              selectedKeys={selectedKeys}
              style={{ border: 'none' }}
            >
              {renderOrgMenu(organizationData)}
            </Menu>
          </Card>
        </Col>

        {/* 右侧详情内容 */}
        <Col span={16}>
          <Card 
            title={
              selectedNode ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {getNodeIcon(selectedNode.type)}
                  <span>{selectedNode.title}</span>
                </div>
              ) : '请选择节点'
            }
            style={{ height: '100%' }}
            bodyStyle={{ height: 'calc(100% - 57px)', overflow: 'auto' }}
          >
            {renderRightContent()}
          </Card>
        </Col>
      </Row>

      {/* 创建节点模态框 */}
      <Modal
        title={`创建${getTypeText(modalType)}`}
        visible={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="名称"
            field="title"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input placeholder={`请输入${getTypeText(modalType)}名称`} />
          </Form.Item>
          <Form.Item
            label="编码"
            field="code"
            rules={[{ required: true, message: '请输入编码' }]}
          >
            <Input placeholder={`请输入${getTypeText(modalType)}编码`} />
          </Form.Item>
          <Form.Item
            label="描述"
            field="description"
          >
            <Input.TextArea 
              placeholder={`请输入${getTypeText(modalType)}描述`} 
              rows={3} 
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 权限配置模态框 */}
      <Modal
        title="权限配置"
        visible={permissionModalVisible}
        onOk={handleSavePermissions}
        onCancel={() => setPermissionModalVisible(false)}
        okText="保存"
        cancelText="取消"
        style={{ width: '80vw', maxWidth: '1000px' }}
      >
        <Row gutter={24}>
          {/* 已分配权限 */}
          <Col span={12}>
            <div style={{ marginBottom: '16px' }}>
              <Title heading={6}>已分配权限</Title>
              <Input
                placeholder="搜索权限..."
                value={searchAssigned}
                onChange={setSearchAssigned}
                prefix={<IconSearch />}
                allowClear
                style={{ marginTop: '8px' }}
              />
            </div>
            <div style={{ border: '1px solid #E5E6EB', borderRadius: '6px', padding: '8px', height: '400px', overflow: 'auto' }}>
              {renderPermissionList(permissionData, assignedPermissions, setAssignedPermissions, searchAssigned)}
            </div>
          </Col>

          {/* 可用权限（显示用） */}
          <Col span={12}>
            <div style={{ marginBottom: '16px' }}>
              <Title heading={6}>可用权限</Title>
              <Input
                placeholder="搜索权限..."
                value={searchAvailable}
                onChange={setSearchAvailable}
                prefix={<IconSearch />}
                allowClear
                style={{ marginTop: '8px' }}
              />
            </div>
            <div style={{ border: '1px solid #E5E6EB', borderRadius: '6px', padding: '8px', height: '400px', overflow: 'auto' }}>
              {renderPermissionList(permissionData, [], () => {}, searchAvailable)}
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default PermissionManagement; 