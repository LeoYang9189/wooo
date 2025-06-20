import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Button, 
  Space, 
  Input, 
  Select, 
  Form, 
  Grid, 
  DatePicker,
  Table,
  Tag,
  InputNumber,
  Message
} from '@arco-design/web-react';
import { IconArrowLeft, IconDownload } from '@arco-design/web-react/icon';
import { useNavigate, useParams } from 'react-router-dom';

const { Title } = Typography;
const { Row, Col } = Grid;
const FormItem = Form.Item;
const Option = Select.Option;

// 按箱型计费项目接口
interface ContainerRateItem {
  key: number;
  feeName: string;
  currency: string;
  '20gp': string;
  '40gp': string;
  '40hc': string;
  '45hc': string;
  '40nor': string;
  '20nor': string;
  '20hc': string;
  '20tk': string;
  '40tk': string;
  '20ot': string;
  '40ot': string;
  '20fr': string;
  '40fr': string;
  specialNote: string;
}

// 非按箱型计费项目接口
interface NonContainerRateItem {
  key: number;
  feeName: string;
  currency: string;
  unit: string;
  price: string;
  specialNote: string;
}

/**
 * 整箱运价查看页面（客户版只读）
 */
const ViewFclRate: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [form] = Form.useForm();
  
  const rateId = params.id;
  
  // 基本信息状态
  const [rateType, setRateType] = useState('合约价');
  const [transitType, setTransitType] = useState('直达');
  
  // 按箱型计费列表状态
  const [containerRateList] = useState<ContainerRateItem[]>([
    {
      key: 1,
      feeName: '海运费',
      currency: 'USD',
      '20gp': '1500',
      '40gp': '2800',
      '40hc': '2900',
      '45hc': '3100',
      '40nor': '2750',
      '20nor': '1450',
      '20hc': '1550',
      '20tk': '1600',
      '40tk': '2950',
      '20ot': '1650',
      '40ot': '3000',
      '20fr': '1700',
      '40fr': '3050',
      specialNote: '含码头费'
    },
    {
      key: 2,
      feeName: '燃油费',
      currency: 'USD',
      '20gp': '150',
      '40gp': '280',
      '40hc': '290',
      '45hc': '310',
      '40nor': '275',
      '20nor': '145',
      '20hc': '155',
      '20tk': '160',
      '40tk': '295',
      '20ot': '165',
      '40ot': '300',
      '20fr': '170',
      '40fr': '305',
      specialNote: '按月调整'
    }
  ]);
  
  // 非按箱型计费列表状态
  const [nonContainerRateList] = useState<NonContainerRateItem[]>([
    {
      key: 1,
      feeName: '订舱费',
      currency: 'USD',
      unit: '票',
      price: '50',
      specialNote: '每票固定费用'
    },
    {
      key: 2,
      feeName: '文件费',
      currency: 'USD',
      unit: '票',
      price: '30',
      specialNote: '单证处理费'
    }
  ]);
  
  // 箱型显示设置
  const [boxTypeVisibility] = useState({
    '20gp': true,
    '40gp': true,
    '40hc': true,
    '20nor': true,
    '40nor': true,
    '45hc': true,
    '20hc': false,
    '20tk': false,
    '40tk': false,
    '20ot': false,
    '40ot': false,
    '20fr': false,
    '40fr': false
  });
  
  // 在组件加载时加载数据
  useEffect(() => {
    if (rateId) {
      loadRateData(rateId);
    }
  }, [rateId]);

  // 加载运价数据
  const loadRateData = async (id: string) => {
    try {
      // 模拟API调用获取运价数据
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟返回的数据
      const mockData = {
        routeCode: `FCL${id}`,
        rateType: '合约价',
        cargoType: '普货',
        departurePort: 'CNSHA',
        dischargePort: 'USLAX',
        transitType: '直达',
        shipCompany: 'COSCO',
        spaceStatus: '正常',
        contractNo: 'CONTRACT001',
        priceStatus: '价格稳定',
        nac: 'NAC01',
        vesselSchedule: ['周一', '周三'],
        voyage: 15,
        chargeSpecialNote: '注意包装',
        shipName: 'COSCO SHIPPING UNIVERSE',
        voyageNumber: 'V001',
        freeContainerDays: 7,
        freeStorageDays: 5,
        validPeriod: ['2024-05-01 10:00:00', '2024-12-31 18:00:00'],
        overweightNote: '超重另计',
        notes: '特价优惠，LSE已含'
      };
      
      // 设置表单数据
      form.setFieldsValue(mockData);
      setRateType(mockData.rateType);
      setTransitType(mockData.transitType);
      
    } catch (error) {
      console.error('加载运价数据失败:', error);
      Message.error('加载运价数据失败');
    }
  };

  // 返回列表页
  const handleGoBack = () => {
    navigate(-1);
  };

  // 导出运价
  const handleExport = () => {
    Message.success('运价导出功能开发中...');
  };

  return (
    <div style={{ padding: '16px' }}>
      <Card style={{ marginBottom: '20px' }}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Title heading={4} style={{ margin: 0 }}>查看整箱运价</Title>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">运价状态：</span>
              <Tag color="green" size="small">正常</Tag>
            </div>
          </div>
          <Space>
             <Button onClick={handleGoBack} icon={<IconArrowLeft />}>返回</Button>
             <Button type="primary" onClick={handleExport} icon={<IconDownload />}>
               导出运价
             </Button>
           </Space>
        </div>

        <Form
          form={form}
          layout="vertical"
          disabled={true}
        >
          {/* 基本信息区域 */}
          <Card title="基本信息" className="mb-6">
            <Row gutter={24}>
              <Col span={6}>
                <FormItem label="运价号" field="routeCode">
                  <Input placeholder="运价号" />
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="运价类型" field="rateType">
                  <Select placeholder="运价类型" value={rateType}>
                    <Option value="合约价">合约价</Option>
                    <Option value="SPOT电商">SPOT电商</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="货物类型" field="cargoType">
                  <Select placeholder="货物类型">
                    <Option value="普货">普货</Option>
                    <Option value="危险品">危险品</Option>
                    <Option value="冷冻品">冷冻品</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="舱位状态" field="spaceStatus">
                  <Select placeholder="舱位状态">
                    <Option value="畅接">畅接</Option>
                    <Option value="正常">正常</Option>
                    <Option value="单票申请">单票申请</Option>
                    <Option value="爆舱">爆舱</Option>
                    <Option value="不接">不接</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            
            <Row gutter={24}>
              <Col span={6}>
                <FormItem label="价格趋势" field="priceStatus">
                  <Select placeholder="价格趋势">
                    <Option value="价格上涨">价格上涨</Option>
                    <Option value="价格下调">价格下调</Option>
                    <Option value="价格稳定">价格稳定</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </Card>

          {/* 航线信息区域 */}
          <Card title="航线信息" className="mb-6">
            <Row gutter={24}>
              <Col span={6}>
                <FormItem label="起运港" field="departurePort">
                  <Select placeholder="起运港" showSearch>
                    <Option value="CNSHA">CNSHA | 上海</Option>
                    <Option value="CNNGB">CNNGB | 宁波</Option>
                    <Option value="CNYTN">CNYTN | 烟台</Option>
                    <Option value="CNQIN">CNQIN | 青岛</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="目的港" field="dischargePort">
                  <Select placeholder="目的港" showSearch>
                    <Option value="USLAX">USLAX | 洛杉矶</Option>
                    <Option value="USNYC">USNYC | 纽约</Option>
                    <Option value="USLGB">USLGB | 长滩</Option>
                    <Option value="USOAK">USOAK | 奥克兰</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="直达/中转" field="transitType">
                  <Select placeholder="运输方式" value={transitType}>
                    <Option value="直达">直达</Option>
                    <Option value="中转">中转</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="船名" field="shipName">
                  <Input placeholder="船名" />
                </FormItem>
              </Col>
            </Row>
            
            <Row gutter={24}>
              <Col span={6}>
                <FormItem label="航次" field="voyageNumber">
                  <Input placeholder="航次" />
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="船期" field="vesselSchedule">
                  <Select placeholder="船期" mode="multiple">
                    <Option value="周一">周一</Option>
                    <Option value="周二">周二</Option>
                    <Option value="周三">周三</Option>
                    <Option value="周四">周四</Option>
                    <Option value="周五">周五</Option>
                    <Option value="周六">周六</Option>
                    <Option value="周日">周日</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="航程" field="voyage">
                  <InputNumber placeholder="航程(天)" min={0} />
                </FormItem>
              </Col>
            </Row>
            
            {transitType === '中转' && (
              <Row gutter={24}>
                <Col span={6}>
                  <FormItem label="中转港" field="transitPort">
                    <Select placeholder="中转港" showSearch>
                      <Option value="KRPUS">KRPUS | 釜山</Option>
                      <Option value="SGSIN">SGSIN | 新加坡</Option>
                      <Option value="HKHKG">HKHKG | 香港</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
            )}
          </Card>

          {/* 船公司信息区域 */}
          <Card title="船公司信息" className="mb-6">
            <Row gutter={24}>
              <Col span={6}>
                <FormItem label="船公司" field="shipCompany">
                  <Select placeholder="船公司" showSearch>
                    <Option value="COSCO">中远海运</Option>
                    <Option value="MSC">地中海</Option>
                    <Option value="MAERSK">马士基</Option>
                    <Option value="EVERGREEN">长荣</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="约号" field="contractNo">
                  <Select placeholder="约号" showSearch>
                    <Option value="CONTRACT001">CONTRACT001</Option>
                    <Option value="CONTRACT002">CONTRACT002</Option>
                    <Option value="CONTRACT003">CONTRACT003</Option>
                    <Option value="SPOT">SPOT</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="NAC" field="nac">
                  <Select placeholder="NAC">
                    <Option value="NAC01">NAC01</Option>
                    <Option value="NAC02">NAC02</Option>
                    <Option value="NAC03">NAC03</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </Card>

          {/* 免费期限设置 */}
          <Card title="D&D" className="mb-6">
            <Row gutter={24}>
              <Col span={8}>
                <FormItem label="免用箱" field="freeContainerDays">
                  <InputNumber placeholder="免用箱(天)" min={0} />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="免堆存" field="freeStorageDays">
                  <InputNumber placeholder="免堆存(天)" min={0} />
                </FormItem>
              </Col>
            </Row>
          </Card>

          {/* 有效期设置 */}
          <Card title="有效期设置" className="mb-6">
            <Row gutter={24}>
              <Col span={12}>
                <FormItem label="有效期" field="validPeriod">
                  <DatePicker.RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={['开始时间', '结束时间']}
                    style={{ width: '100%' }}
                  />
                </FormItem>
              </Col>
            </Row>
          </Card>

          {/* 备注信息 */}
          <Card title="备注信息" className="mb-6">
            <Row gutter={24}>
              <Col span={12}>
                <FormItem label="超重说明" field="overweightNote">
                  <Input placeholder="超重说明" />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="接货特殊说明" field="chargeSpecialNote">
                  <Input placeholder="接货特殊说明" />
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <FormItem label="备注" field="notes">
                  <Input.TextArea placeholder="备注" rows={3} />
                </FormItem>
              </Col>
            </Row>
          </Card>

          {/* 运价明细区域 */}
          <Card title="运价明细" className="mb-6">
            {/* 按箱型计费区域 */}
            <div className="mb-8">
              <div className="text-blue-600 font-bold border-l-4 border-blue-600 pl-2 mb-4">按箱型计费</div>
              
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
                  ...(boxTypeVisibility['20nor'] ? [{
                    title: '20NOR',
                    dataIndex: '20nor',
                    width: 120,
                  }] : []),
                  ...(boxTypeVisibility['40nor'] ? [{
                    title: '40NOR',
                    dataIndex: '40nor',
                    width: 120,
                  }] : []),
                  ...(boxTypeVisibility['45hc'] ? [{
                    title: '45HC',
                    dataIndex: '45hc',
                    width: 120,
                  }] : []),
                  {
                    title: '特殊备注',
                    dataIndex: 'specialNote',
                    width: 200,
                  }
                ]}
                data={containerRateList}
                pagination={false}
                scroll={{ x: 'max-content' }}
              />
            </div>

            {/* 非按箱型计费区域 */}
            <div className="mb-4">
              <div className="text-green-600 font-bold border-l-4 border-green-600 pl-2 mb-4">非按箱型计费</div>
              
              <Table
                borderCell={true}
                columns={[
                  {
                    title: '费用名称',
                    dataIndex: 'feeName',
                    width: 200,
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
                    width: 150,
                  },
                  {
                    title: '特殊备注',
                    dataIndex: 'specialNote',
                    width: 250,
                  }
                ]}
                data={nonContainerRateList}
                pagination={false}
                scroll={{ x: 'max-content' }}
              />
            </div>
          </Card>
        </Form>
      </Card>
    </div>
  );
};

export default ViewFclRate; 