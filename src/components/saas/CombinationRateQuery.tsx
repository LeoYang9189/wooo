import React, { useState } from 'react';
import { 
  Card, 
  Breadcrumb, 
  Button, 
  Space, 
  Input, 
  Form, 
  Grid, 
  Checkbox,
  Radio, 
  Divider,
  Table,
  Typography
} from '@arco-design/web-react';
import { IconDownload, IconArrowLeft, IconCopy } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import SaasLayout from './SaasLayout';
import './CreateFclInquiry.css';

const { Row, Col } = Grid;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Title = Typography.Title;

const CombinationRateQuery: React.FC = () => {
  const navigate = useNavigate();
  
  // 顶部复选框状态
  const [checkedServices, setCheckedServices] = useState({
    precarriageChecked: true,  // 港前报价
    mainlineChecked: true,     // 干线报价
    lastmileChecked: true,     // 尾程报价
  });

  // 基础信息状态
  const [queryInfo] = useState({
    transitType: '直达',     // 直达/中转
    route: '跨太平洋东行',   // 航线
    departurePort: 'CNSHA | Shanghai',    // 起运港
    dischargePort: 'USLAX | Los Angeles', // 卸货港
    transitPort: '',           // 中转港
    shipCompany: '不指定',     // 船公司
    serviceTerms: 'DDP',       // 服务条款
  });

  // 货物类型
  const [cargoType] = useState('fcl'); // fcl, lcl, air

  // 集装箱信息 (整箱)
  const [containerInfo] = useState([
    { type: '20GP', count: '1' }
  ]);

  // LCL/空运信息
  const [cargoInfo] = useState({
    weight: '100', // KGS
    volume: '10'   // CBM
  });

  // 装箱门点 (港前)
  const [loadingPoint] = useState({
    province: '浙江省',
    city: '杭州市',
    district: '萧山区',
    street: '新塘街道',
    detail: '经济开发区红垦路535号'
  });

  // 尾程送货地址
  const [deliveryAddress] = useState({
    addressType: '第三方地址',
    zipCode: '92101',
    address: 'San Diego, CA',
    warehouseCode: ''
  });

  // 表格数据
  const [combinationRates] = useState([
    {
      key: '1',
      combination: '组合1',
      totalPrice: '$ 3560.00',
      transitTime: '32天',
      precarriageRate: 'P001',
      mainlineRate: 'M001',
      oncarriageRate: 'O001',
      etd: '2024-06-20',
      eta: '2024-07-22'
    },
    {
      key: '2',
      combination: '组合2',
      totalPrice: '$ 3420.00',
      transitTime: '35天',
      precarriageRate: 'P002',
      mainlineRate: 'M002',
      oncarriageRate: 'O002',
      etd: '2024-06-25',
      eta: '2024-07-30'
    },
    {
      key: '3',
      combination: '组合3',
      totalPrice: '$ 3680.00',
      transitTime: '30天',
      precarriageRate: 'P001',
      mainlineRate: 'M003',
      oncarriageRate: 'O003',
      etd: '2024-06-22',
      eta: '2024-07-21'
    }
  ]);

  // 处理复选框状态变化
  const handleCheckboxChange = (key: string, checked: boolean) => {
    setCheckedServices(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  // 返回上一页
  const handleBack = () => {
    navigate('/rate-query');
  };

  // 表格列定义
  const columns = [
    {
      title: '组合方案',
      dataIndex: 'combination',
      width: 100,
    },
    {
      title: '总价格',
      dataIndex: 'totalPrice',
      width: 120,
      sorter: (a: any, b: any) => {
        const priceA = parseFloat(a.totalPrice.replace('$', '').trim());
        const priceB = parseFloat(b.totalPrice.replace('$', '').trim());
        return priceA - priceB;
      }
    },
    {
      title: '航程',
      dataIndex: 'transitTime',
      width: 80,
      sorter: (a: any, b: any) => {
        const timeA = parseInt(a.transitTime.replace('天', '').trim());
        const timeB = parseInt(b.transitTime.replace('天', '').trim());
        return timeA - timeB;
      }
    },
    {
      title: '港前运价',
      dataIndex: 'precarriageRate',
      width: 100,
      render: (text: string) => checkedServices.precarriageChecked ? text : '-',
    },
    {
      title: '干线运价',
      dataIndex: 'mainlineRate',
      width: 100,
      render: (text: string) => checkedServices.mainlineChecked ? text : '-',
    },
    {
      title: '尾程运价',
      dataIndex: 'oncarriageRate',
      width: 100,
      render: (text: string) => checkedServices.lastmileChecked ? text : '-',
    },
    {
      title: 'ETD',
      dataIndex: 'etd',
      width: 120,
    },
    {
      title: 'ETA',
      dataIndex: 'eta',
      width: 120,
    },
    {
      title: '操作',
      dataIndex: 'operations',
      width: 150,
      render: () => (
        <Space>
          <Button type="text" size="mini" icon={<IconDownload />}>下载</Button>
          <Button type="text" size="mini" icon={<IconCopy />}>复制</Button>
        </Space>
      ),
    },
  ];

  return (
    <SaasLayout 
      menuSelectedKey="3" 
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>运价管理</Breadcrumb.Item>
          <Breadcrumb.Item>运价查询</Breadcrumb.Item>
          <Breadcrumb.Item>组合方案查询</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Form layout="vertical">
        <Card className="mb-4">
          <div className="flex items-center mb-4">
            <Button icon={<IconArrowLeft />} onClick={handleBack}>返回</Button>
            <Title heading={6} className="ml-4 mb-0">组合方案查询</Title>
            <div className="ml-auto">
              <Space>
                <Checkbox 
                  checked={checkedServices.precarriageChecked}
                  onChange={(checked) => handleCheckboxChange('precarriageChecked', checked)}
                >
                  港前价格
                </Checkbox>
                <Checkbox 
                  checked={checkedServices.mainlineChecked}
                  onChange={(checked) => handleCheckboxChange('mainlineChecked', checked)}
                >
                  干线价格
                </Checkbox>
                <Checkbox 
                  checked={checkedServices.lastmileChecked}
                  onChange={(checked) => handleCheckboxChange('lastmileChecked', checked)}
                >
                  尾程价格
                </Checkbox>
              </Space>
            </div>
          </div>
          
          <Row gutter={[16, 16]}>
            {/* 左侧区域：基本信息 */}
            <Col span={12}>
              <div className="border rounded p-4 mb-4">
                <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2 mb-4">基本信息</div>
                
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <FormItem label="直达/中转">
                      <RadioGroup 
                        value={queryInfo.transitType}
                        disabled
                      >
                        <Radio value="直达">直达</Radio>
                        <Radio value="中转">中转</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="航线">
                      <Input value={queryInfo.route} disabled />
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="起运港">
                      <Input value={queryInfo.departurePort} disabled />
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="卸货港">
                      <Input value={queryInfo.dischargePort} disabled />
                    </FormItem>
                  </Col>
                  
                  {queryInfo.transitType === '中转' && (
                    <Col span={24}>
                      <FormItem label="中转港">
                        <Input value={queryInfo.transitPort || '-'} disabled />
                      </FormItem>
                    </Col>
                  )}
                  
                  <Col span={24}>
                    <FormItem label="船公司">
                      <Input value={queryInfo.shipCompany} disabled />
                    </FormItem>
                  </Col>
                  
                  <Col span={24}>
                    <FormItem label="服务条款">
                      <Input value={queryInfo.serviceTerms} disabled />
                    </FormItem>
                  </Col>
                  
                  {/* 装箱门点区域，仅在勾选港前报价时显示 */}
                  {checkedServices.precarriageChecked && (
                    <Col span={24}>
                      <div className="mb-4">
                        <div className="text-gray-800 font-medium mb-2">装箱门点</div>
                        <div className="border-b border-gray-200 pb-2 mb-2">
                          <Row gutter={[8, 0]}>
                            <Col span={6}>
                              <FormItem label="省份" style={{ marginBottom: 0 }}>
                                <Input value={loadingPoint.province} disabled />
                              </FormItem>
                            </Col>
                            <Col span={6}>
                              <FormItem label="城市" style={{ marginBottom: 0 }}>
                                <Input value={loadingPoint.city} disabled />
                              </FormItem>
                            </Col>
                            <Col span={6}>
                              <FormItem label="区/县" style={{ marginBottom: 0 }}>
                                <Input value={loadingPoint.district} disabled />
                              </FormItem>
                            </Col>
                            <Col span={6}>
                              <FormItem label="街道/村镇" style={{ marginBottom: 0 }}>
                                <Input value={loadingPoint.street} disabled />
                              </FormItem>
                            </Col>
                          </Row>
                        </div>
                        <FormItem label="详细地址">
                          <Input value={loadingPoint.detail} disabled />
                        </FormItem>
                      </div>
                    </Col>
                  )}
                  
                  {/* 尾程送货地址，仅在勾选尾程报价时显示 */}
                  {checkedServices.lastmileChecked && (
                    <Col span={24}>
                      <div className="mb-4">
                        <div className="text-gray-800 font-medium mb-2">尾程送货地址</div>
                        <FormItem label="配送地址类型" style={{ marginBottom: '12px' }}>
                          <RadioGroup 
                            value={deliveryAddress.addressType}
                            disabled
                          >
                            <Radio value="第三方地址">第三方地址</Radio>
                            <Radio value="亚马逊仓库">亚马逊仓库</Radio>
                            <Radio value="易仓">易仓</Radio>
                          </RadioGroup>
                        </FormItem>
                        
                        {deliveryAddress.addressType === '第三方地址' && (
                          <>
                            <FormItem label="邮编" style={{ marginBottom: '12px' }}>
                              <Input value={deliveryAddress.zipCode} disabled />
                            </FormItem>
                            
                            <FormItem label="地址" style={{ marginBottom: '12px' }}>
                              <Input value={deliveryAddress.address} disabled />
                            </FormItem>
                          </>
                        )}
                        
                        {(deliveryAddress.addressType === '亚马逊仓库' || deliveryAddress.addressType === '易仓') && (
                          <FormItem 
                            label="仓库代码" 
                            style={{ marginBottom: '12px' }}
                          >
                            <Input value={deliveryAddress.warehouseCode} disabled />
                          </FormItem>
                        )}
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </Col>
            
            {/* 右侧区域：货物信息 */}
            <Col span={12}>
              <div className="border rounded p-4 mb-4">
                <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2 mb-4">货物信息</div>
                
                <FormItem label="货物类型">
                  <RadioGroup 
                    value={cargoType}
                    disabled
                  >
                    <Radio value="fcl">整箱</Radio>
                    <Radio value="lcl">拼箱</Radio>
                    <Radio value="air">空运</Radio>
                  </RadioGroup>
                </FormItem>
                
                {cargoType === 'fcl' ? (
                  <div className="border rounded p-4">
                    <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2 mb-4">箱型箱量</div>
                    
                    {containerInfo.map((container, index) => (
                      <Row gutter={[16, 16]} key={index} className="mb-3">
                        <Col span={12}>
                          <FormItem label="箱型">
                            <Input value={container.type} disabled />
                          </FormItem>
                        </Col>
                        
                        <Col span={12}>
                          <FormItem label="数量">
                            <Input value={container.count} disabled />
                          </FormItem>
                        </Col>
                      </Row>
                    ))}
                  </div>
                ) : (
                  <div className="border rounded p-4">
                    <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2 mb-4">
                      {cargoType === 'lcl' ? '拼箱信息' : '空运信息'}
                    </div>
                    
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <FormItem label="重量(KGS)">
                          <Input value={cargoInfo.weight} disabled />
                        </FormItem>
                      </Col>
                      
                      <Col span={12}>
                        <FormItem label="体积(CBM)">
                          <Input value={cargoInfo.volume} disabled />
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
            </Col>
          </Row>
          
          <Divider className="my-6" />
          
          {/* 底部区域：匹配的组合方案 */}
          <div className="border rounded p-4">
            <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2 mb-4">匹配的组合方案</div>
            
            <Table 
              rowKey="key"
              columns={columns}
              data={combinationRates}
              pagination={{
                total: combinationRates.length,
                pageSize: 10,
              }}
              border={true}
            />
          </div>
        </Card>
      </Form>
    </SaasLayout>
  );
};

export default CombinationRateQuery; 