import React from 'react';
import { 
  Card, 
  Typography, 
  Grid, 
  Form,
  Input,
  Button,
  Select,
  Upload,
  Message,
  DatePicker
} from '@arco-design/web-react';
import { 
  IconUpload
} from '@arco-design/web-react/icon';

const { Title } = Typography;
const { Row, Col } = Grid;
const FormItem = Form.Item;
const TextArea = Input.TextArea;

const CompanyProfile: React.FC = () => {
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
        <div className="mb-6">
          <Title heading={4} className="mb-1">企业信息</Title>
          <div className="text-gray-500">管理您的企业基本信息</div>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            companyName: '某某国际物流有限公司',
            registrationNumber: '91310000XXXXXXXX1X',
            legalRepresentative: '李四',
            registeredCapital: '1000',
            establishmentDate: '2020-01-01',
            businessScope: '国际货运代理、仓储服务、物流信息咨询',
            companyType: 'LLC',
            industry: 'logistics',
            scale: '100-499'
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="企业名称" field="companyName" rules={[{ required: true }]}>
                <Input placeholder="请输入企业名称" />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="统一社会信用代码" field="registrationNumber" rules={[{ required: true }]}>
                <Input placeholder="请输入统一社会信用代码" />
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="法定代表人" field="legalRepresentative" rules={[{ required: true }]}>
                <Input placeholder="请输入法定代表人姓名" />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="注册资本(万元)" field="registeredCapital">
                <Input placeholder="请输入注册资本" />
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="成立日期" field="establishmentDate">
                <DatePicker style={{ width: '100%' }} />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="企业类型" field="companyType">
                <Select placeholder="请选择企业类型">
                  <Select.Option value="LLC">有限责任公司</Select.Option>
                  <Select.Option value="JSC">股份有限公司</Select.Option>
                  <Select.Option value="SOLE">个人独资企业</Select.Option>
                </Select>
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="所属行业" field="industry">
                <Select placeholder="请选择所属行业">
                  <Select.Option value="logistics">物流运输</Select.Option>
                  <Select.Option value="trade">贸易</Select.Option>
                  <Select.Option value="manufacturing">制造业</Select.Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="企业规模" field="scale">
                <Select placeholder="请选择企业规模">
                  <Select.Option value="1-99">1-99人</Select.Option>
                  <Select.Option value="100-499">100-499人</Select.Option>
                  <Select.Option value="500-999">500-999人</Select.Option>
                  <Select.Option value="1000+">1000人以上</Select.Option>
                </Select>
              </FormItem>
            </Col>
          </Row>

          <FormItem label="经营范围" field="businessScope">
            <TextArea placeholder="请输入经营范围" maxLength={1000} showWordLimit />
          </FormItem>

          <FormItem label="营业执照" field="license">
            <Upload
              listType="picture-card"
              limit={1}
              onPreview={() => {}}
            >
              <div className="flex flex-col items-center">
                <IconUpload />
                <div className="mt-2">上传营业执照</div>
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

export default CompanyProfile; 