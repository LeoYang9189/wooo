import React from 'react';
import { 
  Card, 
  Avatar, 
  Typography, 
  Grid, 
  Form,
  Input,
  Button,
  Select,
  Upload,
  Message
} from '@arco-design/web-react';
import { 
  IconUser,
  IconUpload
} from '@arco-design/web-react/icon';

const { Title } = Typography;
const { Row, Col } = Grid;
const FormItem = Form.Item;
const TextArea = Input.TextArea;

const UserProfile: React.FC = () => {
  const [form] = Form.useForm();

  const onSubmit = async () => {
    try {
      await form.validate();
      const values = await form.getFields();
      console.log('form values:', values);
      Message.success('保存成功');
    } catch (error) {
      console.error('表单验证失败:', error);
      Message.error('请检查表单填写是否正确');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-4">
        <div className="flex items-center mb-6">
          <Avatar size={64} className="bg-blue-500">
            <IconUser style={{ fontSize: 32 }} />
          </Avatar>
          <div className="ml-4">
            <Title heading={4} className="mb-1">个人信息</Title>
            <div className="text-gray-500">管理您的个人资料信息</div>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            name: '张三',
            email: 'zhangsan@example.com',
            phone: '13800138000',
            position: '运营经理',
            department: '运营部',
            language: 'zh-CN'
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="姓名" field="name" rules={[{ required: true }]}>
                <Input placeholder="请输入姓名" />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="邮箱" field="email" rules={[{ required: true, type: 'email' }]}>
                <Input placeholder="请输入邮箱" />
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="手机号" field="phone" rules={[{ required: true }]}>
                <Input placeholder="请输入手机号" />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="职位" field="position">
                <Input placeholder="请输入职位" />
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="部门" field="department">
                <Input placeholder="请输入部门" />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="语言偏好" field="language">
                <Select placeholder="请选择语言">
                  <Select.Option value="zh-CN">简体中文</Select.Option>
                  <Select.Option value="en-US">English</Select.Option>
                </Select>
              </FormItem>
            </Col>
          </Row>

          <FormItem label="个人简介" field="bio">
            <TextArea placeholder="请输入个人简介" maxLength={500} showWordLimit />
          </FormItem>

          <FormItem label="头像" field="avatar">
            <Upload
              listType="picture-card"
              limit={1}
              onPreview={() => {}}
            >
              <div className="flex flex-col items-center">
                <IconUpload />
                <div className="mt-2">上传头像</div>
              </div>
            </Upload>
          </FormItem>

          <FormItem>
            <Button type="primary" onClick={onSubmit}>保存更改</Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  );
};

export default UserProfile; 