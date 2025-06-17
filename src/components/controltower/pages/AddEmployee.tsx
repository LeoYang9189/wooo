import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Upload
} from '@arco-design/web-react';
import { 
  IconUser,
  IconArrowLeft,
  IconSave,
  IconCamera
} from '@arco-design/web-react/icon';

const { Title, Text } = Typography;
const { Option } = Select;

const AddEmployee: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState<string>('');

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

  const handleSubmit = async () => {
    try {
      const values = await form.validate();
      console.log('添加员工:', values);
      
      // 这里调用API保存员工信息
      Message.success('员工添加成功');
      navigate('/controltower/employee-management');
    } catch (error) {
      console.log('表单验证失败:', error);
    }
  };

  const handleCancel = () => {
    navigate('/controltower/employee-management');
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* 面包屑导航 */}
      <Breadcrumb style={{ marginBottom: '24px' }}>
        <Breadcrumb.Item onClick={() => navigate('/controltower')}>首页</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate('/controltower/employee-management')}>员工管理</Breadcrumb.Item>
        <Breadcrumb.Item>添加员工</Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面标题 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button 
            icon={<IconArrowLeft />} 
            onClick={handleCancel}
            size="large"
          />
          <Title heading={3} style={{ margin: 0 }}>添加员工</Title>
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
                    <Button icon={<IconCamera />}>上传头像</Button>
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
                initialValue="active"
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
              <strong>填写说明：</strong><br />
              • 归属分公司和归属部门为必填项，可多选<br />
              • 授权角色决定员工在系统中的权限范围<br />
              • 上级主管为可选项，用于建立组织架构关系<br />
              • 员工状态默认为"正常"，可根据需要调整
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AddEmployee; 