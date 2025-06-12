import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Switch,
  Space,
  Typography,
  Popconfirm,
  Message,
  Input,
  Select,
  Checkbox,
  Form,
  Modal,
  Dropdown,
  Menu,
  Tag,
  Transfer
} from '@arco-design/web-react';
import {
  IconPlus,
  IconSearch,
  IconRefresh
} from '@arco-design/web-react/icon';
import type { TransferItem } from '@arco-design/web-react/es/Transfer/interface';

const { Title } = Typography;
const { Option } = Select;

interface Role {
  id: string;
  code: string;
  name: string;
  description: string;
  status: boolean;
}

const initialData: Role[] = [
  {
    id: '1',
    code: 'CSR',
    name: '客服',
    description: '船期查询 / 运价查询 / 本地费用查询 / 询价管理',
    status: true,
  },
  {
    id: '2',
    code: 'DOCSP',
    name: '单证主管',
    description: '费用管理 / 计费单位 / 本地费用备注',
    status: true,
  },
  {
    id: '3',
    code: 'SALES',
    name: '销售',
    description: '船期查询 / 运价查询 / 本地费用查询 / 询价管理',
    status: true,
  },
  {
    id: '4',
    code: 'TRADE',
    name: '航线',
    description: '船期查询 / 运价查询 / 本地费用查询 / 询价管理 / 近价管理 / 本地费用备注 / 船公司管理 / 船舶管理 / 航线管理 / 码头管理',
    status: true,
  },
  {
    id: '5',
    code: 'ADMIN',
    name: '系统管理员',
    description: '系统管理员',
    status: true,
  },
];

const mockStaffList = [
  { key: '1', value: '1', title: 'aclProd' },
  { key: '2', value: '2', title: '朱伟' },
  { key: '3', value: '3', title: '陈剑云' },
  { key: '4', value: '4', title: '韩源远' },
  { key: '5', value: '5', title: '吴汇丰' },
  { key: '6', value: '6', title: '李海楠' },
];

// 权限点树结构（侧边栏菜单）
const permissionTreeData = [
  {
    key: 'dashboard', title: '仪表盘',
  },
  {
    key: 'control-tower-panel', title: '控制塔面板',
  },
  {
    key: 'super-freight', title: '超级运价',
    children: [
      {
        key: 'rate-management', title: '运价管理',
        children: [
          { key: 'saas/fcl-rates', title: '海运整箱' },
          { key: 'saas/lcl-rates', title: '海运拼箱' },
          { key: 'saas/air-rates', title: '空运运价' },
          { key: 'saas/fcl-surcharge', title: '整箱附加费' },
          { key: 'saas/lcl-surcharge', title: '拼箱附加费' },
          { key: 'saas/air-surcharge', title: '空运附加费' },
          { key: 'saas/rate-query', title: '运价查询' },
        ]
      },
      {
        key: 'door-service', title: '门点服务管理',
        children: [
          { key: 'saas/precarriage-rates', title: '港前运价' },
          { key: 'saas/lastmile-rates', title: '尾程运价' },
        ]
      },
      {
        key: 'inquiry-quote', title: '询价报价',
        children: [
          { key: 'saas/inquiry-management', title: '询价管理' },
          { key: 'saas/quote-management', title: '报价管理' },
          { key: 'saas/quote-approval', title: '报价审核' },
        ]
      },
      {
        key: 'space-management', title: '舱位管理',
        children: [
          { key: 'saas/space-query', title: '舱位查询' },
          { key: 'saas/space-booking', title: '舱位预订' },
          { key: 'saas/space-statistics', title: '舱位统计' },
        ]
      },
      {
        key: 'base-data', title: '基础数据',
        children: [
          { key: 'saas/shipping-company', title: '船公司管理' },
          { key: 'saas/port-management', title: '港口管理' },
          { key: 'saas/route-management', title: '航线管理' },
          { key: 'saas/currency-management', title: '货币管理' },
          { key: 'saas/region-management', title: '行政区划' },
          { key: 'saas/zipcode-management', title: '邮编管理' },
          { key: 'saas/fba-warehouse', title: 'FBA仓库' },
        ]
      },
      { key: 'saas/contract-management', title: '合约管理' },
      { key: 'saas/customer-management', title: '客户管理' },
      { key: 'saas/system-settings', title: '系统设置' },
    ]
  },
  {
    key: 'order', title: '订单中心',
    children: [
      { key: 'order-management', title: '订单管理' },
      { key: 'order-tracking', title: '状态追踪' },
    ]
  },
  {
    key: 'customer', title: '客户中心',
    children: [
      { key: 'user-management', title: '用户管理' },
      { key: 'company-management', title: '企业管理' },
    ]
  },
  {
    key: 'user', title: '用户中心',
    children: [
      { key: 'user-profile', title: '个人信息' },
      { key: 'company-profile', title: '企业信息' },
    ]
  },
  { key: 'application', title: '应用中心' },
  {
    key: 'system-settings', title: '系统设置',
    children: [
      { key: 'role-management', title: '角色管理' },
      { key: 'staff-management', title: '员工管理' },
      { key: 'department-management', title: '部门管理' },
      { key: 'post-management', title: '岗位管理' },
    ]
  },
  {
    key: 'basic-data', title: '基础资料维护',
    children: [
      { key: 'port-management', title: '港口管理' },
      { key: 'carrier-management', title: '承运人管理' },
      { key: 'country-region-management', title: '国家（地区）' },
      { key: 'china-administrative', title: '中国行政区划' },
      { key: 'overseas-warehouse', title: '海外仓库' },
      { key: 'zipcode-management', title: '邮编管理' },
      { key: 'route-management', title: '航线管理' },
      { key: 'container-management', title: '集装箱管理' },
      { key: 'package-unit', title: '包装单位' },
      { key: 'transport-terms', title: '运输条款' },
      { key: 'trade-terms', title: '贸易条款' },
      { key: 'calculation-unit', title: '计费单位' },
      { key: 'charge-management', title: '费用管理' },
      { key: 'ship-agent', title: '船舶代理' },
      { key: 'ship-data', title: '船舶资料' },
      { key: 'terminal-management', title: '码头管理' },
    ]
  },
];

const RoleManagement: React.FC = () => {
  const [data, setData] = useState<Role[]>(initialData);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchStatus, setSearchStatus] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [form] = Form.useForm();
  const [staffModalVisible, setStaffModalVisible] = useState(false);
  const [selectedStaffKeys, setSelectedStaffKeys] = useState<string[]>(['6']); // mock: 李海楠已分配
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [checkedPermissionKeys, setCheckedPermissionKeys] = useState<string[]>([]);
  const [expandedPermissionKeys, setExpandedPermissionKeys] = useState<string[]>(permissionTreeData.map(item => item.key));

  // 获取所有权限key递归
  interface PermissionTreeNode {
    key: string;
    title: string;
    children?: PermissionTreeNode[];
  }

  function getAllPermissionKeys(tree: PermissionTreeNode[]): string[] {
    let keys: string[] = [];
    tree.forEach(item => {
      keys.push(item.key);
      if (item.children) {
        keys = keys.concat(getAllPermissionKeys(item.children));
      }
    });
    return keys;
  }
  const allPermissionKeys = getAllPermissionKeys(permissionTreeData);
  const allExpandedKeys = allPermissionKeys;
  const rootKeys = permissionTreeData.map(item => item.key);

  // 搜索筛选
  const handleSearch = () => {
    let filtered = initialData;
    if (searchKeyword) {
      filtered = filtered.filter(role =>
        role.code.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        role.name.includes(searchKeyword) ||
        role.description.includes(searchKeyword)
      );
    }
    if (searchStatus) {
      filtered = filtered.filter(role =>
        searchStatus === 'enabled' ? role.status : !role.status
      );
    }
    setData(filtered);
  };

  // 重置搜索
  const handleReset = () => {
    setSearchKeyword('');
    setSearchStatus('');
    setData(initialData);
  };

  // 批量启用
  const handleBatchEnable = () => {
    if (selectedRowKeys.length === 0) {
      Message.warning('请选择要启用的角色');
      return;
    }
    setData(prev => prev.map(role =>
      selectedRowKeys.includes(role.id) ? { ...role, status: true } : role
    ));
    setSelectedRowKeys([]);
    Message.success(`已启用 ${selectedRowKeys.length} 个角色`);
  };

  // 批量禁用
  const handleBatchDisable = () => {
    if (selectedRowKeys.length === 0) {
      Message.warning('请选择要禁用的角色');
      return;
    }
    setData(prev => prev.map(role =>
      selectedRowKeys.includes(role.id) ? { ...role, status: false } : role
    ));
    setSelectedRowKeys([]);
    Message.success(`已禁用 ${selectedRowKeys.length} 个角色`);
  };

  // 单个状态切换
  const handleStatusChange = (id: string, checked: boolean) => {
    setData(prev => prev.map(role => role.id === id ? { ...role, status: checked } : role));
    Message.success(`角色已${checked ? '启用' : '禁用'}`);
  };

  // 删除
  const handleDelete = (id: string) => {
    setData(prev => prev.filter(role => role.id !== id));
    Message.success('角色已删除');
  };

  // 新增
  const handleAdd = () => {
    setIsEditing(false);
    setCurrentRole(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 编辑
  const handleEdit = (record: Role) => {
    setIsEditing(true);
    setCurrentRole(record);
    form.setFieldsValue({
      code: record.code,
      name: record.name,
      description: record.description,
      status: record.status,
    });
    setModalVisible(true);
  };

  // 保存
  const handleSave = async () => {
    try {
      const values = await form.validate();
      if (isEditing && currentRole) {
        setData(prev => prev.map(role =>
          role.id === currentRole.id ? { ...role, ...values } : role
        ));
        Message.success('角色信息已更新');
      } else {
        const newRole: Role = {
          ...values,
          id: Date.now().toString(),
        };
        setData(prev => [...prev, newRole]);
        Message.success('角色已添加');
      }
      setModalVisible(false);
      form.resetFields();
    } catch {
      // 校验失败
    }
  };

  // 打开员工设置弹窗
  const handleStaffSetting = () => {
    setStaffModalVisible(true);
  };
  // 确认员工设置
  const handleStaffOk = () => {
    setStaffModalVisible(false);
    Message.success('员工设置已保存');
  };
  // 取消员工设置
  const handleStaffCancel = () => {
    setStaffModalVisible(false);
  };

  const handlePermissionSetting = () => {
    setPermissionModalVisible(true);
  };
  const handlePermissionOk = () => {
    setPermissionModalVisible(false);
    Message.success('权限设置已保存');
  };
  const handlePermissionCancel = () => {
    setPermissionModalVisible(false);
  };
  const isAllChecked = checkedPermissionKeys.length === allPermissionKeys.length;
  const isAllExpanded = expandedPermissionKeys.length === allExpandedKeys.length;

  const handlePermissionCheckAll = () => {
    if (isAllChecked) {
      setCheckedPermissionKeys([]);
    } else {
      setCheckedPermissionKeys(allPermissionKeys);
    }
  };
  const handlePermissionExpandAll = () => {
    if (isAllExpanded) {
      setExpandedPermissionKeys(rootKeys);
    } else {
      setExpandedPermissionKeys(allExpandedKeys);
    }
  };

  const columns = [
    {
      title: (
        <Checkbox
          indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < data.length}
          checked={selectedRowKeys.length === data.length && data.length > 0}
          onChange={checked => {
            if (checked) {
              setSelectedRowKeys(data.map(item => item.id));
            } else {
              setSelectedRowKeys([]);
            }
          }}
        />
      ),
      dataIndex: 'checkbox',
      width: 60,
      render: (_: unknown, record: Role) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.id)}
          onChange={checked => {
            if (checked) {
              setSelectedRowKeys([...selectedRowKeys, record.id]);
            } else {
              setSelectedRowKeys(selectedRowKeys.filter(key => key !== record.id));
            }
          }}
        />
      ),
    },
    {
      title: '角色代码',
      dataIndex: 'code',
      width: 120,
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '角色描述',
      dataIndex: 'description',
      width: 400,
      ellipsis: true,
    },
    {
      title: '角色状态',
      dataIndex: 'status',
      width: 120,
      render: (status: boolean) => (
        <Tag color={status ? 'green' : 'red'}>{status ? '正常' : '禁用'}</Tag>
      ),
    },
    {
      title: '操作',
      dataIndex: 'actions',
      width: 200,
      render: (_: unknown, record: Role) => {
        const menu = (
          <Menu>
            <Menu.Item
              key="toggle"
              onClick={() => handleStatusChange(record.id, !record.status)}
            >
              {record.status ? '禁用' : '启用'}
            </Menu.Item>
            <Menu.Item key="staff" onClick={handleStaffSetting}>
              关联员工
            </Menu.Item>
            <Menu.Item key="permission" onClick={handlePermissionSetting}>
              权限配置
            </Menu.Item>
          </Menu>
        );
        return (
          <Space>
            <Button type="text" size="small" onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Popconfirm title="确定要删除该角色吗？" onOk={() => handleDelete(record.id)}>
              <Button type="text" size="small">
                删除
              </Button>
            </Popconfirm>
            <Dropdown droplist={menu} position="br">
              <Button type="text" size="small">更多</Button>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  return (
    <Card>
      <div style={{ marginBottom: '20px' }}>
        <Title heading={4} style={{ margin: 0 }}>角色管理</Title>
      </div>
      {/* 搜索筛选区域 */}
      <Card style={{ marginBottom: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '16px', alignItems: 'flex-end' }}>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>关键词搜索</div>
            <Input
              placeholder="角色代码、名称、描述"
              value={searchKeyword}
              onChange={setSearchKeyword}
            />
          </div>
          <div>
            <div style={{ marginBottom: '4px', fontSize: '14px', color: '#666' }}>状态</div>
            <Select
              placeholder="选择状态"
              value={searchStatus}
              onChange={setSearchStatus}
              allowClear
            >
              <Option value="enabled">正常</Option>
              <Option value="disabled">禁用</Option>
            </Select>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button type="primary" icon={<IconSearch />} onClick={handleSearch}>
              搜索
            </Button>
            <Button icon={<IconRefresh />} onClick={handleReset}>
              重置
            </Button>
          </div>
        </div>
      </Card>
      {/* 操作按钮区域 */}
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button type="primary" icon={<IconPlus />} onClick={handleAdd}>
              新增角色
            </Button>
          </div>
          {selectedRowKeys.length > 0 && (
            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              paddingLeft: '12px', 
              borderLeft: '1px solid #e5e6e7',
              marginLeft: '4px'
            }}>
              <Button type="outline" onClick={handleBatchEnable}>
                批量启用 ({selectedRowKeys.length})
              </Button>
              <Button type="outline" status="warning" onClick={handleBatchDisable}>
                批量禁用 ({selectedRowKeys.length})
              </Button>
            </div>
          )}
        </div>
      </div>
      <Table
        columns={columns}
        data={data}
        rowKey="id"
        scroll={{ x: 900 }}
        pagination={{
          pageSize: 10,
          showTotal: true,
          showJumper: true,
          sizeCanChange: true,
        }}
      />
      {/* 新增/编辑弹窗 */}
      <Modal
        title={isEditing ? '编辑角色' : '新增角色'}
        visible={modalVisible}
        onOk={handleSave}
        onCancel={() => setModalVisible(false)}
        style={{ width: 600 }}
      >
        <Form form={form} layout="vertical">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              field="code"
              label="角色代码"
              rules={[{ required: true, message: '请输入角色代码' }]}
            >
              <Input placeholder="请输入角色代码，如：ADMIN" maxLength={20} />
            </Form.Item>
            <Form.Item
              field="name"
              label="角色名称"
              rules={[{ required: true, message: '请输入角色名称' }]}
            >
              <Input placeholder="请输入角色名称，如：系统管理员" maxLength={20} />
            </Form.Item>
            <Form.Item
              field="description"
              label="角色描述"
              rules={[{ required: true, message: '请输入角色描述' }]}
              style={{ gridColumn: '1/3' }}
            >
              <Input.TextArea placeholder="请输入角色描述" maxLength={100} autoSize={{ minRows: 2, maxRows: 4 }} />
            </Form.Item>
            <Form.Item
              field="status"
              label="角色状态"
              style={{ gridColumn: '1/3' }}
              triggerPropName="checked"
              initialValue={true}
            >
              <Switch checkedText="正常" uncheckedText="禁用" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
      {/* 员工设置弹窗 */}
      <Modal
        title="员工设置"
        visible={staffModalVisible}
        onOk={handleStaffOk}
        onCancel={handleStaffCancel}
        style={{ width: 600 }}
        footer={null}
      >
        <div style={{ padding: '8px 0 16px 0' }}>
          <Transfer
            dataSource={mockStaffList}
            listStyle={{ width: 220, height: 320 }}
            titleTexts={['未选择员工', '已选择员工']}
            targetKeys={selectedStaffKeys}
            onChange={setSelectedStaffKeys}
            render={(item: TransferItem & { title?: string }) => item.title || ''}
            showSearch
          />
        </div>
        <div style={{ textAlign: 'right', marginTop: 8 }}>
          <Button onClick={handleStaffCancel} style={{ marginRight: 12 }}>取消</Button>
          <Button type="primary" onClick={handleStaffOk}>确定</Button>
        </div>
      </Modal>
      {/* 权限设置弹窗 */}
      <Modal
        title="权限设置"
        visible={permissionModalVisible}
        onOk={handlePermissionOk}
        onCancel={handlePermissionCancel}
        style={{ width: 600 }}
        footer={null}
      >
        <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
          <Button onClick={handlePermissionCheckAll}>{isAllChecked ? '全不选' : '全选'}</Button>
          <Button onClick={handlePermissionExpandAll}>{isAllExpanded ? '收起' : '展开'}</Button>
        </div>
        <div style={{ maxHeight: 400, overflow: 'auto', border: '1px solid #f0f0f0', borderRadius: 4, padding: 8 }}>
          <div>权限树组件暂时不可用</div>
        </div>
        <div style={{ textAlign: 'right', marginTop: 16 }}>
          <Button onClick={handlePermissionCancel} style={{ marginRight: 12 }}>取消</Button>
          <Button type="primary" onClick={handlePermissionOk}>确定</Button>
        </div>
      </Modal>
    </Card>
  );
};

export default RoleManagement; 