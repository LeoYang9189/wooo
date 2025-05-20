import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Breadcrumb, 
  Typography, 
  Button, 
  Space, 
  Input, 
  Select, 
  Form, 
  Grid, 
  Radio,
  DatePicker,
  Table,
  Tag
} from '@arco-design/web-react';
import { IconClose } from '@arco-design/web-react/icon';
import { useNavigate, useParams } from 'react-router-dom';
import SaasLayout from './SaasLayout';
import './CreateFclInquiry.css'; // 复用已有的CSS

const { Title } = Typography;
const { Row, Col } = Grid;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

// 区域项接口定义
interface AreaItem {
  key: number;
  province: string;
  city: string;
  district: string;
  street: string;
}

// 集装箱运价项目接口
interface RateItem {
  key: number;
  feeName: string;
  currency: string;
  '20gp': string;
  '40gp': string;
  '40hc': string;
  '45hc': string;
  '40nor': string;
  specialNote: string; // 添加特殊备注字段
}

// 非按箱型计费项目接口
interface NonContainerRateItem {
  key: number;
  feeName: string;
  currency: string;
  unit: string; // 计费单位
  price: string; // 单价
  specialNote: string;
}

// 表单状态接口
interface FormStateType {
  code: string;
  rateType: string;
  sublineType: string;
  originDetail: string;
  destination: string;
  terminal: string;
  vendor: string;
  validDateRange: string[];
  remark: string;
  status: string;
}

/**
 * 港前运价查看组件
 */
const ViewPrecarriageRate: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  
  // 区域选择相关状态
  const [areaList, setAreaList] = useState<AreaItem[]>([]);
  
  // 集装箱运价列表状态
  const [rateList, setRateList] = useState<RateItem[]>([]);
  
  // 非按箱型计费列表状态
  const [nonContainerRateList, setNonContainerRateList] = useState<NonContainerRateItem[]>([]);
  
  // 箱型显示设置
  const [boxTypeVisibility] = useState({
    '20gp': true,
    '40gp': true,
    '40hc': true,
    '45hc': true,
    '40nor': true
  });
  
  // 保存表单状态
  const [formState, setFormState] = useState<FormStateType>({
    code: '',
    rateType: '',
    sublineType: '',
    originDetail: '',
    destination: '',
    terminal: '',
    vendor: '',
    validDateRange: [],
    remark: '',
    status: '正常'
  });

  // 返回港前运价列表页面
  const handleClose = () => {
    navigate('/rate-query');
  };

  // 支线类型是否显示
  const showSublineType = formState.rateType === '支线';

  // 模拟加载数据
  useEffect(() => {
    // 模拟异步获取数据
    setTimeout(() => {
      console.log('Loading precarriage rate with ID:', id);
      
      // 模拟从服务器获取的数据
      const mockData = {
        code: `PCR${id || '2024050001'}`,
        rateType: '直拖',
        sublineType: '',
        originDetail: '萧山区宁围街道花城路与金城路交叉口',
        destination: 'CNSHA | SHANGHAI',
        terminal: '洋山',
        vendor: '安吉物流',
        validDateRange: ['2024-05-01', '2024-12-31'],
        remark: '此运价适用于杭州市萧山区及周边地区的工厂提货，有效期内保证价格稳定。',
        status: '正常',
        areas: [
          {
            key: 1,
            province: '浙江省',
            city: '杭州市',
            district: '萧山区',
            street: '宁围街道'
          },
          {
            key: 2,
            province: '浙江省',
            city: '杭州市',
            district: '萧山区',
            street: '北干街道'
          }
        ],
        containerRates: [
          {
            key: 1,
            feeName: '支线拖车费',
            currency: 'CNY',
            '20gp': '800',
            '40gp': '1200',
            '40hc': '1300',
            '45hc': '1500',
            '40nor': '1250',
            specialNote: '含上门提货费用'
          },
          {
            key: 2,
            feeName: '支线订舱费',
            currency: 'CNY',
            '20gp': '150',
            '40gp': '150',
            '40hc': '150',
            '45hc': '180',
            '40nor': '150',
            specialNote: ''
          }
        ],
        nonContainerRates: [
          {
            key: 1,
            feeName: '报关费',
            currency: 'CNY',
            unit: '票',
            price: '350',
            specialNote: '含商检'
          },
          {
            key: 2,
            feeName: '压夜费',
            currency: 'CNY',
            unit: '天',
            price: '200',
            specialNote: '工作日18:00后加收'
          }
        ]
      };

      // 更新状态
      setFormState({
        ...formState,
        code: mockData.code,
        rateType: mockData.rateType,
        sublineType: mockData.sublineType,
        originDetail: mockData.originDetail,
        destination: mockData.destination,
        terminal: mockData.terminal,
        vendor: mockData.vendor,
        validDateRange: mockData.validDateRange,
        remark: mockData.remark,
        status: mockData.status
      });

      setAreaList(mockData.areas);
      setRateList(mockData.containerRates);
      setNonContainerRateList(mockData.nonContainerRates);
    }, 500);
  }, [id]);

  // 获取状态标签样式
  const getStatusTag = (status: string) => {
    let color = 'green';
    if (status === '过期') color = 'gray';
    if (status === '下架') color = 'red';
    return <Tag color={color}>{status}</Tag>;
  };

  return (
    <SaasLayout 
      menuSelectedKey="22" 
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>门点服务管理</Breadcrumb.Item>
          <Breadcrumb.Item>港前运价</Breadcrumb.Item>
          <Breadcrumb.Item>查看港前运价</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Form form={form} layout="vertical" initialValues={formState} requiredSymbol={{ position: 'start' }}>
        <Card className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <Title heading={5}>查看港前运价</Title>
            <Space>
              <Button icon={<IconClose />} onClick={handleClose}>关闭</Button>
            </Space>
          </div>
          
          <Row gutter={[16, 16]}>
            {/* 左侧区域：基本信息 */}
            <Col span={12}>
              <div className="border rounded p-4 mb-4">
                <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2 mb-4">基本信息</div>
                
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <FormItem label="港前运价编号" field="code">
                      <Input placeholder="自动生成" value={formState.code} disabled />
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="运价类型" field="rateType">
                      <RadioGroup 
                        value={formState.rateType}
                        disabled
                      >
                        <Radio value="直拖">直拖</Radio>
                        <Radio value="支线">支线</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                  
                  {showSublineType && (
                    <Col span={24}>
                      <FormItem label="支线类型" field="sublineType">
                        <Select 
                          placeholder="请选择支线类型" 
                          style={{ width: '100%' }}
                          value={formState.sublineType}
                          disabled
                        >
                          <Option value="湖州海铁">湖州海铁</Option>
                          <Option value="海宁支线">海宁支线</Option>
                          <Option value="乍浦支线">乍浦支线</Option>
                        </Select>
                      </FormItem>
                    </Col>
                  )}
                  
                  <Col span={24}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-gray-800 font-medium">起运地区域</div>
                    </div>
                    
                    {areaList.map((area, index) => (
                      <div key={area.key} className="mb-3 border-b border-gray-200 pb-2">
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-xs text-gray-500">区域 {index + 1}</div>
                        </div>
                        <Row gutter={[8, 0]}>
                          <Col span={5}>
                            <FormItem label="" style={{ marginBottom: 0 }}>
                              <Input value={area.province} disabled />
                            </FormItem>
                          </Col>
                          <Col span={5}>
                            <FormItem label="" style={{ marginBottom: 0 }}>
                              <Input value={area.city} disabled />
                            </FormItem>
                          </Col>
                          <Col span={5}>
                            <FormItem label="" style={{ marginBottom: 0 }}>
                              <Input value={area.district} disabled />
                            </FormItem>
                          </Col>
                          <Col span={9}>
                            <FormItem label="" style={{ marginBottom: 0 }}>
                              <Input value={area.street} disabled />
                            </FormItem>
                          </Col>
                        </Row>
                      </div>
                    ))}
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="详细地址" field="originDetail">
                      <Input.TextArea
                        value={formState.originDetail}
                        style={{ minHeight: '60px' }}
                        disabled
                      />
                    </FormItem>
                  </Col>

                  <Col span={24}>
                    <FormItem label="状态">
                      {getStatusTag(formState.status)}
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </Col>
            
            {/* 右侧区域：起运港、码头、供应商 */}
            <Col span={12}>
              <div className="border rounded p-4 mb-4">
                <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2 mb-4">起运港信息</div>
                
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <FormItem label="起运港" field="destination">
                      <Select 
                        value={formState.destination}
                        disabled
                      >
                        <Option value="CNSHA | SHANGHAI">CNSHA | SHANGHAI</Option>
                        <Option value="CNNGB | NINGBO">CNNGB | NINGBO</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="码头" field="terminal">
                      <Select 
                        value={formState.terminal}
                        disabled
                      >
                        <Option value="外高桥">外高桥</Option>
                        <Option value="洋山">洋山</Option>
                        <Option value="北仑">北仑</Option>
                        <Option value="大榭">大榭</Option>
                        <Option value="梅山">梅山</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="供应商" field="vendor">
                      <Select 
                        value={formState.vendor}
                        disabled
                      >
                        <Option value="安吉物流">安吉物流</Option>
                        <Option value="德邦物流">德邦物流</Option>
                        <Option value="中远海运">中远海运</Option>
                        <Option value="顺丰物流">顺丰物流</Option>
                        <Option value="海得航运">海得航运</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="有效期" field="validDateRange">
                      <RangePicker 
                        style={{ width: '100%' }} 
                        value={formState.validDateRange}
                        disabled
                      />
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="备注" field="remark">
                      <Input.TextArea 
                        style={{ minHeight: '80px' }}
                        value={formState.remark}
                        disabled
                      />
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </Col>
            
            {/* 运价信息模块 - 占据整行 */}
            <Col span={24}>
              <div className="border rounded p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2">运价信息</div>
                </div>
                
                {/* 按箱型计费条目 */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-700 font-medium">按箱型计费条目</div>
                  </div>
                
                <Table
                  borderCell={true}
                  columns={[
                    {
                      title: '费用名称',
                      dataIndex: 'feeName',
                      width: 180,
                    },
                    {
                      title: '币种',
                      dataIndex: 'currency',
                      width: 120,
                    },
                    ...(boxTypeVisibility['20gp'] ? [{
                      title: '20GP',
                      dataIndex: '20gp',
                      width: 120,
                    }] : []),
                    ...(boxTypeVisibility['40gp'] ? [{
                      title: '40GP',
                      dataIndex: '40gp',
                      width: 120,
                    }] : []),
                    ...(boxTypeVisibility['40hc'] ? [{
                      title: '40HC',
                      dataIndex: '40hc',
                      width: 120,
                    }] : []),
                    ...(boxTypeVisibility['45hc'] ? [{
                      title: '45HC',
                      dataIndex: '45hc',
                      width: 120,
                    }] : []),
                    ...(boxTypeVisibility['40nor'] ? [{
                      title: '40NOR',
                      dataIndex: '40nor',
                      width: 120,
                    }] : []),
                    {
                      title: '特殊备注',
                      dataIndex: 'specialNote',
                      width: 180,
                    }
                  ]}
                  data={rateList}
                  pagination={false}
                  rowKey="key"
                />
                </div>
                
                {/* 非按箱型计费条目 */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-700 font-medium">非按箱型计费条目</div>
                  </div>
                  
                  <Table
                    borderCell={true}
                    columns={[
                      {
                        title: '费用名称',
                        dataIndex: 'feeName',
                        width: 180,
                      },
                      {
                        title: '币种',
                        dataIndex: 'currency',
                        width: 120,
                      },
                      {
                        title: '计费单位',
                        dataIndex: 'unit',
                        width: 120,
                      },
                      {
                        title: '单价',
                        dataIndex: 'price',
                        width: 120,
                      },
                      {
                        title: '特殊备注',
                        dataIndex: 'specialNote',
                        width: 180,
                      }
                    ]}
                    data={nonContainerRateList}
                    pagination={false}
                    rowKey="key"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Form>
    </SaasLayout>
  );
};

export default ViewPrecarriageRate; 