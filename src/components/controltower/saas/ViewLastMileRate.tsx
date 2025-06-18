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
import { useNavigate } from 'react-router-dom';
import ControlTowerSaasLayout from "./ControlTowerSaasLayout";
import './CreateFclInquiry.css'; // 复用已有的CSS

const { Title } = Typography;
const { Row, Col } = Grid;
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

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
  origin: string;
  addressType: '第三方地址' | '亚马逊仓库' | '易仓';
  zipCode: string;
  address: string;
  warehouseCode: string | null;
  agentName: string;
  validDateRange: string[];
  remark: string;
  status: string;
}

/**
 * 尾程运价查看组件
 */
const ViewLastMileRate: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
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
    origin: '',
    addressType: '第三方地址',
    zipCode: '',
    address: '',
    warehouseCode: null,
    agentName: '',
    validDateRange: [],
    remark: '',
    status: '正常'
  });

  // 返回尾程运价列表页面
  const handleClose = () => {
    navigate('/controltower/saas/lastmile-rates');
  };

  // 地址类型是否为第三方地址
  const isThirdPartyAddress = formState.addressType === '第三方地址';

  // 模拟加载数据
  useEffect(() => {
    // 模拟异步获取数据
    setTimeout(() => {
      // 模拟从服务器获取的数据
      const mockData = {
        code: 'LMR2024050001',
        origin: 'USLAX | LOS ANGELES',
        addressType: '第三方地址',
        zipCode: '92101',
        address: 'San Diego, CA 2950 5th Ave',
        warehouseCode: null,
        agentName: 'XPO TRUCK LLC',
        validDateRange: ['2024-05-01', '2024-12-31'],
        remark: '此运价适用于加州地区的派送服务，有效期内保证价格稳定。',
        status: '正常',
        containerRates: [
          {
            key: 1,
            feeName: '尾程卡车费',
            currency: 'USD',
            '20gp': '1200',
            '40gp': '1800',
            '40hc': '1900',
            '45hc': '2200',
            '40nor': '2000',
            specialNote: '含通行费'
          },
          {
            key: 2,
            feeName: '派送搬运费',
            currency: 'USD',
            '20gp': '200',
            '40gp': '300',
            '40hc': '300',
            '45hc': '350',
            '40nor': '320',
            specialNote: ''
          }
        ],
        nonContainerRates: [
          {
            key: 1,
            feeName: '报关费',
            currency: 'USD',
            unit: '票',
            price: '180',
            specialNote: '含AMS'
          },
          {
            key: 2,
            feeName: '延期费',
            currency: 'USD',
            unit: '天',
            price: '100',
            specialNote: '交货时间延长超过1天'
          }
        ]
      };

      // 更新状态
      setFormState({
        ...formState,
        code: mockData.code,
        origin: mockData.origin,
        addressType: mockData.addressType as FormStateType['addressType'],
        zipCode: mockData.zipCode,
        address: mockData.address,
        warehouseCode: mockData.warehouseCode,
        agentName: mockData.agentName,
        validDateRange: mockData.validDateRange,
        remark: mockData.remark,
        status: mockData.status
      });

      setRateList(mockData.containerRates);
      setNonContainerRateList(mockData.nonContainerRates);
    }, 500);
  }, []);

  // 获取状态标签样式
  const getStatusTag = (status: string) => {
    let color = 'green';
    if (status === '过期') color = 'gray';
    if (status === '下架') color = 'red';
    return <Tag color={color}>{status}</Tag>;
  };

  return (
    <ControlTowerSaasLayout 
      menuSelectedKey="23" 
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>门点服务管理</Breadcrumb.Item>
          <Breadcrumb.Item>尾程运价</Breadcrumb.Item>
          <Breadcrumb.Item>查看尾程运价</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Form form={form} layout="vertical" initialValues={formState} requiredSymbol={{ position: 'start' }}>
        <Card className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <Title heading={5}>查看尾程运价</Title>
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
                    <FormItem label="尾程运价编号" field="code">
                      <Input placeholder="自动生成" value={formState.code} disabled />
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="目的港" field="origin">
                      <Select 
                        value={formState.origin}
                        disabled
                      >
                        <Option value="USLAX | LOS ANGELES">USLAX | LOS ANGELES</Option>
                        <Option value="USNYC | NEW YORK">USNYC | NEW YORK</Option>
                        <Option value="DEHAM | HAMBURG">DEHAM | HAMBURG</Option>
                        <Option value="NLRTM | ROTTERDAM">NLRTM | ROTTERDAM</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="配送地址类型" field="addressType">
                      <Radio.Group 
                        value={formState.addressType}
                        disabled
                      >
                        <Radio value="第三方地址">第三方地址</Radio>
                        <Radio value="亚马逊仓库">亚马逊仓库</Radio>
                        <Radio value="易仓">易仓</Radio>
                      </Radio.Group>
                    </FormItem>
                  </Col>
                  
                  {isThirdPartyAddress && (
                    <>
                      <Col span={24}>
                        <FormItem label="邮编" field="zipCode">
                          <Input value={formState.zipCode} disabled />
                        </FormItem>
                      </Col>
                      
                      <Col span={24}>
                        <FormItem label="详细地址" field="address">
                          <Input.TextArea
                            value={formState.address}
                            style={{ minHeight: '60px' }}
                            disabled
                          />
                        </FormItem>
                      </Col>
                    </>
                  )}
                  
                  {!isThirdPartyAddress && (
                    <Col span={24}>
                      <FormItem label="仓库代码" field="warehouseCode">
                        <Input value={formState.warehouseCode || ''} disabled />
                      </FormItem>
                    </Col>
                  )}

                  <Col span={24}>
                    <FormItem label="状态">
                      {getStatusTag(formState.status)}
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </Col>
                  
            {/* 右侧区域：代理信息、有效期等 */}
            <Col span={12}>
              <div className="border rounded p-4 mb-4">
                <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2 mb-4">代理信息</div>
                
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <FormItem label="代理名称" field="agentName">
                      <Select 
                        value={formState.agentName}
                        disabled
                      >
                        <Option value="XPO TRUCK LLC">XPO TRUCK LLC</Option>
                        <Option value="DRAYEASY INC">DRAYEASY INC</Option>
                        <Option value="AMERICAN FREIGHT SOLUTIONS">AMERICAN FREIGHT SOLUTIONS</Option>
                        <Option value="WEST COAST CARRIERS LLC">WEST COAST CARRIERS LLC</Option>
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
    </ControlTowerSaasLayout>
  );
};

export default ViewLastMileRate; 