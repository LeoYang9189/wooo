import React, { useState } from 'react';
import { 
  Card, 
  Breadcrumb, 
  // Typography, 
  Button, 
  Space, 
  Input, 
  Select, 
  Form, 
  Grid, 
  Checkbox,
  Radio, 
  Tooltip,
  Divider,
  Table
} from '@arco-design/web-react';
import { IconSave, IconDelete } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import SaasLayout from './SaasLayout';
import './CreateFclInquiry.css';


const { Row, Col } = Grid;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

/**
 * 整箱询价表单组件
 */
const CreateFclInquiry: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  // 保存表单状态
  const [formState, setFormState] = useState({
    inquiryNo: 'R43597505',
    inquirer: '张三',
    inquirySource: '内部',
    cargoNature: '询价',
    serviceType: '请选择',
    clientType: '请选择',
    transitType: '直达',
    departurePort: '青岛 CNSHA | Shanghai',
    dischargePort: '洛杉矶 USLAX | Los Angeles',
    goodsType: '普货',
    hsCode: '',
    weight: '',
    containerType: '20GP',
    containerCount: 1,
    precarriageChecked: true,
    mainlineChecked: true,
    oncarriageChecked: true
  });

  // 表格选择状态
  const [selectedMainlineRate, setSelectedMainlineRate] = useState<string>('');
  const [selectedPrecarriageRate, setSelectedPrecarriageRate] = useState<string>('');
  const [selectedOncarriageRates, setSelectedOncarriageRates] = useState<string[]>([]);

  // 更新保存表单状态
  const handleFormChange = (key: string, value: any) => {
    setFormState({
      ...formState,
      [key]: value
    });
  };

  // 处理复选框状态变化
  const handleCheckboxChange = (key: string, checked: boolean) => {
    setFormState({
      ...formState,
      [key]: checked
    });
  };

  // 处理表单提交
  const handleSubmit = () => {
    form.validate().then((values) => {
      // 整合所有状态
      const formData = {
        ...formState,
        ...values,
        selectedRates: {
          mainlineRate: selectedMainlineRate,
          precarriageRate: selectedPrecarriageRate,
          oncarriageRates: selectedOncarriageRates
        }
      };
      
      console.log('表单数据:', formData);
      // 提交表单数据
      navigate('/inquiry-management');
    }).catch(error => {
      console.error('表单错误:', error);
    });
  };

  // 返回询价管理页面
  const handleCancel = () => {
    navigate('/inquiry-management');
  };

  // 未使用的函数
  /*
  const handleAddContainer = () => {
    // 实现未使用...
  };
  */

  return (
    <SaasLayout 
      menuSelectedKey="9" 
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>询价报价</Breadcrumb.Item>
          <Breadcrumb.Item>询价管理</Breadcrumb.Item>
          <Breadcrumb.Item>新建整箱询价</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Form form={form} layout="vertical" initialValues={formState}>
        <Card className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <Checkbox 
                checked={formState.precarriageChecked} 
                onChange={(checked) => handleCheckboxChange('precarriageChecked', checked)}
                style={{ marginRight: 16 }}
              >
                港前价格
              </Checkbox>
              <Checkbox 
                checked={formState.mainlineChecked}
                onChange={(checked) => handleCheckboxChange('mainlineChecked', checked)}
                style={{ marginRight: 16 }}
              >
                干线价格
              </Checkbox>
              <Checkbox 
                checked={formState.oncarriageChecked}
                onChange={(checked) => handleCheckboxChange('oncarriageChecked', checked)}
              >
                尾程价格
              </Checkbox>
            </div>
            <Space>
              <Button type="primary" icon={<IconSave />} onClick={handleSubmit}>保存</Button>
              <Button icon={<IconDelete />} onClick={handleCancel}>取消</Button>
            </Space>
          </div>
          
          <Row gutter={[16, 16]}>
            {/* 左侧区域：基本信息 */}
            <Col span={12}>
              <div className="border rounded p-4 mb-4">
                <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2 mb-4">基本信息</div>
                
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <FormItem label="询价编号" field="inquiryNo">
                      <Input placeholder="R43597505" value={formState.inquiryNo} disabled />
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="询价人" field="inquirer">
                      <Input 
                        placeholder="请输入询价人" 
                        value={formState.inquirer}
                        onChange={(value) => handleFormChange('inquirer', value)}
                      />
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="询价来源" field="inquirySource">
                      <Select 
                        placeholder="请选择" 
                        style={{ width: '100%' }}
                        value={formState.inquirySource}
                        onChange={(value) => handleFormChange('inquirySource', value)}
                      >
                        <Option value="内部">内部</Option>
                        <Option value="外部">外部</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="货盘性质" field="cargoNature">
                      <Select 
                        placeholder="请选择" 
                        style={{ width: '100%' }}
                        value={formState.cargoNature}
                        onChange={(value) => handleFormChange('cargoNature', value)}
                      >
                        <Option value="询价">询价</Option>
                        <Option value="实单">实单</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="服务条款" field="serviceType">
                      <Select 
                        placeholder="请选择" 
                        style={{ width: '100%' }}
                        value={formState.serviceType}
                        onChange={(value) => handleFormChange('serviceType', value)}
                      >
                        <Option value="服务条款1">服务条款1</Option>
                        <Option value="服务条款2">服务条款2</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="委托单位" field="clientType">
                      <Select 
                        placeholder="请选择委托单位" 
                        style={{ width: '100%' }}
                        value={formState.clientType}
                        onChange={(value) => handleFormChange('clientType', value)}
                      >
                        <Option value="正式客户">正式客户</Option>
                        <Option value="潜在客户">潜在客户</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </Col>
            
            {/* 右侧区域：货物信息 */}
            <Col span={12}>
              <div className="border rounded p-4 mb-4">
                <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2 mb-4">货物信息</div>
                
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <FormItem label="直达/中转" field="transitType">
                      <RadioGroup 
                        value={formState.transitType}
                        onChange={(value) => handleFormChange('transitType', value)}
                      >
                        <Radio value="直达">直达</Radio>
                        <Radio value="中转">中转</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="起运港" field="departurePort">
                      <Input 
                        placeholder="请输入起运港" 
                        value={formState.departurePort}
                        onChange={(value) => handleFormChange('departurePort', value)}
                      />
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="卸货港" field="dischargePort">
                      <Input 
                        placeholder="请输入卸货港" 
                        value={formState.dischargePort}
                        onChange={(value) => handleFormChange('dischargePort', value)}
                      />
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="货物类型" field="goodsType">
                      <Select 
                        placeholder="请选择" 
                        style={{ width: '100%' }}
                        value={formState.goodsType}
                        onChange={(value) => handleFormChange('goodsType', value)}
                      >
                        <Option value="普货">普货</Option>
                        <Option value="危险品">危险品</Option>
                        <Option value="冷藏品">冷藏品</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="品名（HS Code）" field="hsCode">
                      <Input 
                        placeholder="请输入HS Code" 
                        value={formState.hsCode}
                        onChange={(value) => handleFormChange('hsCode', value)}
                      />
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <Row gutter={8}>
                      <Col span={12}>
                        <FormItem label="重量" field="weight">
                          <Input 
                            placeholder="请输入重量" 
                            suffix="KGS"
                            value={formState.weight}
                            onChange={(value) => handleFormChange('weight', value)}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              
              <div className="border rounded p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2">箱型箱量</div>
                  <Button type="text" className="text-blue-600">
                    <div className="flex items-center cursor-pointer">
                      <Tooltip content="添加箱型箱量">
                        <span>+ 添加箱型</span>
                      </Tooltip>
                    </div>
                  </Button>
                </div>
                
                <Row gutter={[16, 16]}>
                  <Col span={16}>
                    <FormItem label="箱型" field="containerType">
                      <Select 
                        placeholder="请选择" 
                        style={{ width: '100%' }}
                        value={formState.containerType}
                        onChange={(value) => handleFormChange('containerType', value)}
                      >
                        <Option value="20GP">20GP</Option>
                        <Option value="40GP">40GP</Option>
                        <Option value="40HC">40HC</Option>
                        <Option value="45HC">45HC</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  
                  <Col span={8}>
                    <FormItem label="数量" field="containerCount">
                      <Input 
                        type="number" 
                        placeholder="请输入数量" 
                        min={1} 
                        value={String(formState.containerCount)}
                        onChange={(value) => handleFormChange('containerCount', Number(value) || 1)}
                      />
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          
          <Divider className="my-6" />
          
          {/* 底部区域：匹配报价 */}
          <div className="border rounded p-4">
            <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2 mb-4">匹配报价</div>
            
            <div className="bg-gray-100 p-4 rounded mb-4 rate-table-container">
              <div className="text-blue-600 font-bold mb-3 text-base rate-table-title">干线运价</div>
              <Table 
                rowKey="certNo"
                rowSelection={{
                  type: 'radio',
                  onChange: (selectedRowKeys) => {
                    setSelectedMainlineRate(selectedRowKeys[0] as string);
                  },
                  selectedRowKeys: selectedMainlineRate ? [selectedMainlineRate] : []
                }}
                columns={[
                  { title: '证书编号', dataIndex: 'certNo', width: 100 },
                  { title: '起运港', dataIndex: 'departurePort', width: 150 },
                  { title: '卸货港', dataIndex: 'dischargePort', width: 150 },
                  { title: '船公司', dataIndex: 'shipCompany', width: 120 },
                  { title: '有效期止', dataIndex: 'validThru', width: 120 },
                  { title: '中转港', dataIndex: 'transitPort', width: 130 },
                  { title: '直达/中转', dataIndex: 'transitType', width: 100 },
                  { title: '20GP', dataIndex: '20GP', width: 100 },
                  { title: '40GP', dataIndex: '40GP', width: 100 },
                  { title: '40HC', dataIndex: '40HC', width: 100 },
                  { title: '45HC', dataIndex: '45HC', width: 100 },
                  { title: '20NOR', dataIndex: '20NOR', width: 100 },
                  { title: '40NOR', dataIndex: '40NOR', width: 100 },
                  { title: 'ETD', dataIndex: 'etd', width: 120 },
                  { title: 'ETA', dataIndex: 'eta', width: 120 },
                  { title: '航程', dataIndex: 'transitTime', width: 80 },
                ]}
                data={[
                  {
                    certNo: 'M001',
                    departurePort: 'CNSHA | Shanghai',
                    dischargePort: 'USLAX | Los Angeles',
                    shipCompany: '地中海',
                    validThru: '2024-07-01',
                    transitPort: '-',
                    transitType: '直达',
                    '20GP': '1500.00',
                    '40GP': '2800.00',
                    '40HC': '2900.00',
                    '45HC': '3100.00',
                    '20NOR': '1400.00',
                    '40NOR': '2700.00',
                    etd: '2024-07-10',
                    eta: '2024-07-24',
                    transitTime: '14天',
                  },
                  {
                    certNo: 'M002',
                    departurePort: 'CNSHA | Shanghai',
                    dischargePort: 'USLAX | Los Angeles',
                    shipCompany: '马士基',
                    validThru: '2024-08-01',
                    transitPort: 'KRPUS | Busan',
                    transitType: '中转',
                    '20GP': '1450.00',
                    '40GP': '2750.00',
                    '40HC': '2850.00',
                    '45HC': '3050.00',
                    '20NOR': '1350.00',
                    '40NOR': '2650.00',
                    etd: '2024-08-08',
                    eta: '2024-08-24',
                    transitTime: '16天',
                  },
                  {
                    certNo: 'M003',
                    departurePort: 'CNSHA | Shanghai',
                    dischargePort: 'USLAX | Los Angeles',
                    shipCompany: '长荣',
                    validThru: '2024-07-15',
                    transitPort: '-',
                    transitType: '直达',
                    '20GP': '1550.00',
                    '40GP': '2880.00',
                    '40HC': '2980.00',
                    '45HC': '3180.00',
                    '20NOR': '1480.00',
                    '40NOR': '2780.00',
                    etd: '2024-07-16',
                    eta: '2024-07-29',
                    transitTime: '13天',
                  },
                ]}
                scroll={{ x: 1800 }}
                pagination={false}
                border={true}
                className="mt-4 match-price-table"
              />
            </div>
            
            {/* 港前运价表格 */}
            <div className="bg-gray-100 p-4 rounded mb-4 rate-table-container">
              <div className="text-blue-600 font-bold mb-3 text-base rate-table-title">港前运价</div>
              <Table 
                rowKey="id"
                rowSelection={{
                  type: 'radio',
                  onChange: (selectedRowKeys) => {
                    setSelectedPrecarriageRate(selectedRowKeys[0] as string);
                  },
                  selectedRowKeys: selectedPrecarriageRate ? [selectedPrecarriageRate] : []
                }}
                columns={[
                  { title: '类型', dataIndex: 'type', width: 100 },
                  { title: '起运地', dataIndex: 'origin', width: 150 },
                  { title: '目的地', dataIndex: 'destination', width: 150 },
                  { title: '供应商', dataIndex: 'vendor', width: 120 },
                  { title: '币种', dataIndex: 'currency', width: 80 },
                  { title: '20GP', dataIndex: '20GP', width: 100 },
                  { title: '40GP', dataIndex: '40GP', width: 100 },
                  { title: '40HC', dataIndex: '40HC', width: 100 },
                  { title: '有效期', dataIndex: 'validDate', width: 120 },
                  { title: '选择', dataIndex: 'select', width: 80 },
                ]}
                data={[
                  {
                    id: '1',
                    type: '直达',
                    origin: '苏州工业园区',
                    destination: '洋山港',
                    vendor: '德邦专线',
                    currency: 'CNY',
                    '20GP': '800.00',
                    '40GP': '1200.00',
                    '40HC': '1300.00',
                    validDate: '2024-12-31',
                  },
                  {
                    id: '2',
                    type: '支线',
                    origin: '太仓港',
                    destination: '洋山港',
                    vendor: '速航65号',
                    currency: 'CNY',
                    '20GP': '400.00',
                    '40GP': '700.00',
                    '40HC': '750.00',
                    validDate: '2024-11-30',
                  }
                ]}
                scroll={{ x: 1200 }}
                pagination={false}
                border={true}
                className="mt-2 match-price-table"
              />
            </div>
            
            {/* 尾程运价表格 */}
            <div className="bg-gray-100 p-4 rounded rate-table-container">
              <div className="text-blue-600 font-bold mb-3 text-base rate-table-title">尾程运价</div>
              <Table 
                rowKey="id"
                rowSelection={{
                  type: 'checkbox',
                  onChange: (selectedRowKeys) => {
                    setSelectedOncarriageRates(selectedRowKeys as string[]);
                  },
                  selectedRowKeys: selectedOncarriageRates
                }}
                columns={[
                  { title: '费用描述', dataIndex: 'description', width: 150 },
                  { title: '币种', dataIndex: 'currency', width: 80 },
                  { title: '单价', dataIndex: 'price', width: 100 },
                  { title: '单位', dataIndex: 'unit', width: 80 },
                  { title: '总金额', dataIndex: 'totalAmount', width: 100 },
                  { title: '备注', dataIndex: 'remark', width: 150 },
                  { title: '选择', dataIndex: 'select', width: 80 },
                ]}
                data={[
                  {
                    id: '1',
                    description: 'ISF CHARGE',
                    currency: 'USD',
                    price: '50.00',
                    unit: 'B/L',
                    totalAmount: '$50.00',
                    remark: '',
                  },
                  {
                    id: '2',
                    description: '清关费',
                    currency: 'USD',
                    price: '100.00',
                    unit: 'B/L',
                    totalAmount: '$100.00',
                    remark: '',
                  },
                  {
                    id: '3',
                    description: '文件费',
                    currency: 'USD',
                    price: '100.00',
                    unit: 'B/L',
                    totalAmount: '$100.00',
                    remark: '',
                  },
                  {
                    id: '4',
                    description: 'BOND',
                    currency: 'USD',
                    price: '100.00',
                    unit: 'B/L',
                    totalAmount: '$100.00',
                    remark: '',
                  },
                  {
                    id: '5',
                    description: '品检费',
                    currency: 'USD',
                    price: '2300.00',
                    unit: '40HQ',
                    totalAmount: '$2300.00',
                    remark: '',
                  },
                  {
                    id: '6',
                    description: '检疫费',
                    currency: 'USD',
                    price: '65.00',
                    unit: 'B/L',
                    totalAmount: '$65.00',
                    remark: '',
                  },
                  {
                    id: '7',
                    description: '报关费',
                    currency: 'USD',
                    price: '150.00',
                    unit: '40HQ',
                    totalAmount: '$150.00',
                    remark: 'AT COST',
                  },
                  {
                    id: '8',
                    description: '仓租费',
                    currency: 'USD',
                    price: '150.00',
                    unit: 'DAYS',
                    totalAmount: '$150.00',
                    remark: 'MIN 3 DAYS',
                  },
                  {
                    id: '9',
                    description: '拖柜费',
                    currency: 'USD',
                    price: '95.00',
                    unit: 'HOUR',
                    totalAmount: '$95.00',
                    remark: '2 HOUR FREE',
                  },
                  {
                    id: '10',
                    description: '车架分离',
                    currency: 'USD',
                    price: '150.00',
                    unit: '40HQ',
                    totalAmount: '$150.00',
                    remark: 'AT COST',
                  },
                ]}
                scroll={{ x: 700 }}
                pagination={false}
                border={true}
                className="mt-2 match-price-table"
              />
            </div>
          </div>
        </Card>
      </Form>
    </SaasLayout>
  );
};

export default CreateFclInquiry; 