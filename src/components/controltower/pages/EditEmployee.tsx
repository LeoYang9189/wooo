import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Card, 
  Typography, 
  Form, 
  Input, 
  Select, 
  Button, 
  Space, 
  Message,
  Breadcrumb,
  Avatar,
  Upload,
  Spin
} from '@arco-design/web-react';
import { 
  IconUser,
  IconArrowLeft,
  IconSave,
  IconCamera
} from '@arco-design/web-react/icon';

const { Title, Text } = Typography;
const { Option } = Select;

interface EmployeeData {
  id: string;
  username: string;
  email: string;
  phone: string;
  branches: string[];
  departments: string[];
  roles: string[];
  supervisors: string[];
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  createTime: string;
  avatar?: string;
}

const EditEmployee: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState<string>('');
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);

  // 模拟数据选项
  const branchOptions = [
    '货拉拉物流科技有限公司',
    '货拉拉华南分公司',
    '顺丰速运集团',
    '顺丰华东分公司',
    '德邦物流股份有限公司',
    '德邦华北分公司',
    '中通快递股份有限公司',
    '申通快递有限公司',
    '圆通速递股份有限公司'
  ];

  const departmentOptions = [
    '物流部门',
    '技术部门',
    '客服部门',
    '市场部门',
    '运营部门',
    '财务部门',
    '人事部门',
    '产品部门',
    '销售部门',
    '法务部门'
  ];

  const roleOptions = [
    '超级管理员',
    '部门经理',
    '客服经理',
    '普通用户',
    '运营专员',
    '财务经理',
    '人事专员',
    '技术主管',
    '产品经理',
    '市场专员'
  ];

  const supervisorOptions = [
    '张三',
    '李四',
    '王五',
    '赵六',
    '陈七',
    '孙八',
    '周九',
    '刘十'
  ];

  // 模拟员工数据
  const mockEmployeeData: EmployeeData[] = [
    {
      id: 'A3K9M2X7N8Q5',
      username: '张三',
      email: 'zhangsan@example.com',
      phone: '13800138001',
      branches: ['货拉拉物流科技有限公司', '货拉拉华南分公司'],
      departments: ['物流部门', '技术部门'],
      roles: ['超级管理员', '部门经理'],
      supervisors: [],
      status: 'active',
      lastLogin: '2024-01-15 14:30:25',
      createTime: '2023-12-01 09:15:30'
    },
    {
      id: 'B7H4P1Y6R9L2',
      username: '李四',
      email: 'lisi@example.com',
      phone: '13800138002',
      branches: ['顺丰速运集团'],
      departments: ['客服部门', '市场部门'],
      roles: ['客服经理'],
      supervisors: ['张三'],
      status: 'active',
      lastLogin: '2024-01-14 16:22:18',
      createTime: '2023-11-15 11:20:45'
    },
    {
      id: 'C8F5T3W9E1K4',
      username: '王五',
      email: 'wangwu@example.com',
      phone: '13800138003',
      branches: ['德邦物流股份有限公司', '德邦华北分公司'],
      departments: ['运营部门'],
      roles: ['普通用户', '运营专员'],
      supervisors: ['李四', '张三'],
      status: 'inactive',
      lastLogin: '2024-01-10 10:15:32',
      createTime: '2023-10-20 15:30:15'
    }
  ];

  useEffect(() => {
    const loadEmployeeData = async () => {
      if (!id) {
        Message.error('员工ID不存在');
        navigate('/controltower/employee-management');
        return;
      }

      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const employee = mockEmployeeData.find(emp => emp.id === id);
        if (!employee) {
          Message.error('未找到该员工信息');
          navigate('/controltower/employee-management');
          return;
        }

        setEmployeeData(employee);
        // 预填充表单数据
        form.setFieldsValue({
          username: employee.username,
          email: employee.email,
          phone: employee.phone,
          branches: employee.branches,
          departments: employee.departments,
          roles: employee.roles,
          supervisors: employee.supervisors,
          status: employee.status
        });
      } catch (error) {
        console.error('加载员工数据失败:', error);
        Message.error('加载员工数据失败');
      }
    };

    loadEmployeeData();
  }, [id, navigate, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validate();
      console.log('更新员工:', values);
      
      // 这里调用API更新员工信息
      Message.success('员工信息更新成功');
      navigate('/controltower/employee-management');
    } catch (error) {
      console.log('表单验证失败:', error);
    }
  };

  const handleCancel = () => {
    navigate('/controltower/employee-management');
  };

  if (!employeeData) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Spin size={40} />
        <div style={{ marginTop: '16px' }}>
          <Text type="secondary">正在加载员工数据...</Text>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* 面包屑导航 */}
      <Breadcrumb style={{ marginBottom: '24px' }}>
        <Breadcrumb.Item onClick={() => navigate('/controltower')}>首页</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate('/controltower/employee-management')}>员工管理</Breadcrumb.Item>
        <Breadcrumb.Item>编辑员工</Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面标题 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button 
            icon={<IconArrowLeft />} 
            onClick={handleCancel}
            size="large"
          />
          <Title heading={3} style={{ margin: 0 }}>
            编辑员工 - {employeeData?.username}
          </Title>
        </div>
        <Space>
          <Button size="large" onClick={handleCancel}>
            取消
          </Button>
          <Button 
            type="primary" 
            size="large" 
            icon={<IconSave />}
            onClick={handleSubmit}
          >
            保存
          </Button>
        </Space>
      </div>

      <Card>
        {/* 员工基本信息显示 */}
        <div style={{ 
          marginBottom: '24px', 
          padding: '16px', 
          backgroundColor: '#F7F8FA', 
          borderRadius: '6px',
          border: '1px solid #E5E6EB'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Avatar size={60} style={{ backgroundColor: '#165DFF' }}>
              <IconUser />
            </Avatar>
            <div>
              <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {employeeData?.username}
              </Text>
              <br />
              <Text type="secondary">员工ID: {employeeData?.id}</Text>
              <br />
              <Text type="secondary">创建时间: {employeeData?.createTime}</Text>
              <br />
              <Text type="secondary">最后登录: {employeeData?.lastLogin}</Text>
            </div>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          style={{ maxWidth: '800px' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* 左侧列 */}
            <div>
              <Form.Item
                label="员工头像"
                style={{ marginBottom: '24px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Avatar size={80} style={{ backgroundColor: '#165DFF' }}>
                    {avatar ? <img src={avatar} alt="avatar" /> : <IconUser />}
                  </Avatar>
                  <Upload
                    accept="image/*"
                    showUploadList={false}
                    onChange={(fileList) => {
                      if (fileList && fileList.length > 0) {
                        const file = fileList[0].originFile;
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setAvatar(e.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }
                    }}
                  >
                    <Button icon={<IconCamera />}>更换头像</Button>
                  </Upload>
                </div>
              </Form.Item>

              <Form.Item
                label="用户名"
                field="username"
                rules={[
                  { required: true, message: '请输入用户名' },
                  { minLength: 2, message: '用户名至少2个字符' }
                ]}
              >
                <Input placeholder="请输入用户名" size="large" />
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
                <Input placeholder="请输入邮箱" size="large" />
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
                <Input placeholder="请输入手机号" size="large" />
              </Form.Item>

              <Form.Item
                label="归属分公司"
                field="branches"
                rules={[
                  { required: true, message: '请选择归属分公司' }
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="请选择归属分公司"
                  size="large"
                  maxTagCount={2}
                >
                  {branchOptions.map(option => (
                    <Option key={option} value={option}>{option}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="归属部门"
                field="departments"
                rules={[
                  { required: true, message: '请选择归属部门' }
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="请选择归属部门"
                  size="large"
                  maxTagCount={2}
                >
                  {departmentOptions.map(option => (
                    <Option key={option} value={option}>{option}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* 右侧列 */}
            <div>
              <Form.Item
                label="授权角色"
                field="roles"
                rules={[
                  { required: true, message: '请选择授权角色' }
                ]}
                style={{ marginTop: '104px' }} // 对齐右侧内容
              >
                <Select
                  mode="multiple"
                  placeholder="请选择授权角色"
                  size="large"
                  maxTagCount={2}
                >
                  {roleOptions.map(option => (
                    <Option key={option} value={option}>{option}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="上级主管"
                field="supervisors"
              >
                <Select
                  mode="multiple"
                  placeholder="请选择上级主管"
                  size="large"
                  maxTagCount={2}
                  allowClear
                >
                  {supervisorOptions.map(option => (
                    <Option key={option} value={option}>{option}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="员工状态"
                field="status"
                rules={[
                  { required: true, message: '请选择员工状态' }
                ]}
              >
                <Select placeholder="请选择员工状态" size="large">
                  <Option value="active">正常</Option>
                  <Option value="inactive">禁用</Option>
                  <Option value="pending">待激活</Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          {/* 说明文字 */}
          <div style={{ 
            marginTop: '32px', 
            padding: '16px', 
            backgroundColor: '#F7F8FA', 
            borderRadius: '6px',
            border: '1px solid #E5E6EB'
          }}>
            <Text type="secondary">
              <strong>编辑说明：</strong><br />
              • 修改任何字段后请点击"保存"按钮提交更改<br />
              • 归属分公司和归属部门为必填项，可多选<br />
              • 授权角色决定员工在系统中的权限范围<br />
              • 上级主管为可选项，用于维护组织架构关系
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default EditEmployee; 