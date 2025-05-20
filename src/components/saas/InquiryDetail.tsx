import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Breadcrumb, 
  Typography, 
  Button, 
  Space, 
  Table, 
  Radio, 
  Grid, 
  Input, 
  Form,
  Message
} from '@arco-design/web-react';
import { IconArrowLeft } from '@arco-design/web-react/icon';
import { useNavigate, useParams } from 'react-router-dom';
import SaasLayout from './SaasLayout';
import './CreateFclInquiry.css';

const { Title } = Typography;
const { Row, Col } = Grid;
const FormItem = Form.Item;

// 定义类型接口
interface ContainerInfo {
  type: string;
  count: number;
}

interface MainlineRate {
  id: string;
  certNo: string;
  departurePort: string;
  dischargePort: string;
  shipCompany: string;
  validPeriod: string;
  transitType: string;
  '20GP': string;
  '40GP': string;
  '40HC': string;
  transitTime: string;
  etd: string;
  eta: string;
  price: string;
  currency: string;
}

interface PrecarriageRate {
  id: string;
  certNo: string;
  type: string;
  origin: string;
  destination: string;
  vendor: string;
  '20GP': string;
  '40GP': string;
  '40HC': string;
  price: string;
  currency: string;
}

interface OncarriageRate {
  id: string;
  certNo: string;
  destination: string;
  addressType: string;
  zipCode: string;
  address: string;
  agentName: string;
  price: string;
  currency: string;
}

interface InquiryDetail {
  inquiryNo: string;
  inquiryType: 'fcl' | 'lcl' | 'air';
  source: string;
  inquirer: string;
  inquiryStatus: string;
  cargoReadyTime: string;
  cargoNature: string;
  shipCompany: string;
  transitType: string;
  route: string;
  departurePort: string;
  dischargePort: string;
  remark: string;
  clientType: string;
  clientName: string;
  // 整箱特有字段
  containerInfo?: ContainerInfo[];
  // 拼箱/空运特有字段
  weight?: string;
  volume?: string;
  // 报价方案数据
  mainlineRates: MainlineRate[];
  precarriageRates: PrecarriageRate[];
  oncarriageRates: OncarriageRate[];
}

const InquiryDetail: React.FC = () => {
  const navigate = useNavigate();
  const { type, id } = useParams<{ type: string; id: string }>();
  const [form] = Form.useForm();
  
  // 状态
  const [inquiryDetail, setInquiryDetail] = useState<InquiryDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedMainlineRate, setSelectedMainlineRate] = useState<string>('');
  const [selectedPrecarriageRate, setSelectedPrecarriageRate] = useState<string>('');
  const [selectedOncarriageRate, setSelectedOncarriageRate] = useState<string>('');

  // 模拟加载详情数据
  useEffect(() => {
    const fetchInquiryDetail = async () => {
      setIsLoading(true);
      
      // 这里应该调用API获取数据
      // 暂时使用模拟数据
      setTimeout(() => {
        const mockDetail: InquiryDetail = {
          inquiryNo: id || '',
          inquiryType: (type as 'fcl' | 'lcl' | 'air') || 'fcl',
          source: '内部',
          inquirer: '张三',
          inquiryStatus: '已提交',
          cargoReadyTime: '1周内',
          cargoNature: '询价',
          shipCompany: '不指定',
          transitType: '直达',
          route: '跨太平洋东行',
          departurePort: 'CNSHA | Shanghai',
          dischargePort: 'USLAX | Los Angeles',
          remark: '电子产品 优先考虑直达航线',
          clientType: '正式客户',
          clientName: '上海测试',
          
          // 根据类型设置不同字段
          ...(type === 'fcl' ? {
            containerInfo: [
              { type: '20GP', count: 1 },
              { type: '40HC', count: 2 }
            ]
          } : {
            weight: '1200',
            volume: '3.5'
          }),
          
          // 报价方案数据
          mainlineRates: [
            {
              id: '1',
              certNo: 'M001',
              departurePort: 'CNSHA | Shanghai',
              dischargePort: 'USLAX | Los Angeles',
              shipCompany: '地中海',
              validPeriod: '2024-06-01 ~ 2024-07-01',
              transitType: '直达',
              '20GP': '1500 USD',
              '40GP': '2800 USD',
              '40HC': '2900 USD',
              transitTime: '14天',
              etd: '2024-07-10',
              eta: '2024-07-24',
              price: '2900',
              currency: 'USD'
            },
            {
              id: '2',
              certNo: 'M002',
              departurePort: 'CNSHA | Shanghai',
              dischargePort: 'USLAX | Los Angeles',
              shipCompany: '马士基',
              validPeriod: '2024-07-01 ~ 2024-08-01',
              transitType: '中转',
              '20GP': '1450 USD',
              '40GP': '2750 USD',
              '40HC': '2850 USD',
              transitTime: '16天',
              etd: '2024-08-08',
              eta: '2024-08-24',
              price: '2850',
              currency: 'USD'
            }
          ],
          precarriageRates: [
            {
              id: '1',
              certNo: 'P001',
              type: '直达',
              origin: '苏州工业园区',
              destination: '洋山港',
              vendor: '德邦专线',
              '20GP': '800 CNY',
              '40GP': '1200 CNY',
              '40HC': '1300 CNY',
              price: '1300',
              currency: 'CNY'
            },
            {
              id: '2',
              certNo: 'P002',
              type: '支线',
              origin: '太仓港',
              destination: '洋山港',
              vendor: '速航65号',
              '20GP': '400 CNY',
              '40GP': '700 CNY',
              '40HC': '750 CNY',
              price: '750',
              currency: 'CNY'
            }
          ],
          oncarriageRates: [
            {
              id: '1',
              certNo: 'O001',
              destination: 'San Diego, CA',
              addressType: '第三方地址',
              zipCode: '92101',
              address: 'San Diego, CA',
              agentName: 'XPO TRUCK LLC',
              price: '800',
              currency: 'USD'
            },
            {
              id: '2',
              certNo: 'O002',
              destination: 'Amazon ONT8',
              addressType: '亚马逊仓库',
              zipCode: '',
              address: '',
              agentName: 'DRAYEASY INC',
              price: '750',
              currency: 'USD'
            }
          ]
        };
        
        setInquiryDetail(mockDetail);
        // 默认选中第一个报价
        if (mockDetail.mainlineRates.length > 0) {
          setSelectedMainlineRate(mockDetail.mainlineRates[0].id);
        }
        if (mockDetail.precarriageRates.length > 0) {
          setSelectedPrecarriageRate(mockDetail.precarriageRates[0].id);
        }
        if (mockDetail.oncarriageRates.length > 0) {
          setSelectedOncarriageRate(mockDetail.oncarriageRates[0].id);
        }
        
        setIsLoading(false);
      }, 500);
    };
    
    fetchInquiryDetail();
  }, [id, type]);

  // 返回上一页
  const handleGoBack = () => {
    navigate(-1);
  };

  // 打印报价单
  const handlePrintQuotation = () => {
    Message.success('正在准备打印报价单...');
    // 实现打印逻辑
  };

  // 生成委托
  const handleGenerateDelegate = () => {
    // 检查是否选择了必要的运价
    if (!selectedMainlineRate) {
      Message.warning('请选择干线运价');
      return;
    }
    
    Message.success('生成委托成功，即将跳转...');
    // 导航到委托页面，带上所选报价ID
    navigate(`/saas/create-delegate/${type}/${id}`, {
      state: {
        mainlineRateId: selectedMainlineRate,
        precarriageRateId: selectedPrecarriageRate,
        oncarriageRateId: selectedOncarriageRate
      }
    });
  };

  // 表格列 - 整箱干线运价
  const fclMainlineColumns = [
    {
      title: '选择',
      width: 80,
      render: (_: unknown, record: MainlineRate) => (
        <Radio
          checked={selectedMainlineRate === record.id}
          onChange={() => setSelectedMainlineRate(record.id)}
        />
      ),
    },
    { title: '运价编号', dataIndex: 'certNo', width: 120 },
    { title: '起运港', dataIndex: 'departurePort', width: 150 },
    { title: '卸货港', dataIndex: 'dischargePort', width: 150 },
    { title: '船公司', dataIndex: 'shipCompany', width: 120 },
    { title: '有效期', dataIndex: 'validPeriod', width: 180 },
    { title: '直达/中转', dataIndex: 'transitType', width: 100 },
    { title: '20GP', dataIndex: '20GP', width: 110 },
    { title: '40GP', dataIndex: '40GP', width: 110 },
    { title: '40HC', dataIndex: '40HC', width: 110 },
    { title: '航程', dataIndex: 'transitTime', width: 80 },
    { title: 'ETD', dataIndex: 'etd', width: 110 },
    { title: 'ETA', dataIndex: 'eta', width: 110 }
  ];
  
  // 表格列 - 拼箱/空运干线运价
  const lclAirMainlineColumns = [
    {
      title: '选择',
      width: 80,
      render: (_: unknown, record: MainlineRate) => (
        <Radio
          checked={selectedMainlineRate === record.id}
          onChange={() => setSelectedMainlineRate(record.id)}
        />
      ),
    },
    { title: '运价编号', dataIndex: 'certNo', width: 120 },
    { title: '起运地', dataIndex: 'departurePort', width: 150 },
    { title: '目的地', dataIndex: 'dischargePort', width: 150 },
    { title: '承运人', dataIndex: 'shipCompany', width: 120 },
    { title: '有效期', dataIndex: 'validPeriod', width: 180 },
    { title: '运价', dataIndex: 'price', width: 100 },
    { title: '币种', dataIndex: 'currency', width: 80 },
    { title: '航程', dataIndex: 'transitTime', width: 80 },
    { title: 'ETD', dataIndex: 'etd', width: 110 },
    { title: 'ETA', dataIndex: 'eta', width: 110 }
  ];
  
  // 表格列 - 港前运价
  const precarriageColumns = [
    {
      title: '选择',
      width: 80,
      render: (_: unknown, record: PrecarriageRate) => (
        <Radio
          checked={selectedPrecarriageRate === record.id}
          onChange={() => setSelectedPrecarriageRate(record.id)}
        />
      ),
    },
    { title: '运价编号', dataIndex: 'certNo', width: 120 },
    { title: '类型', dataIndex: 'type', width: 100 },
    { title: '起运地', dataIndex: 'origin', width: 150 },
    { title: '目的地', dataIndex: 'destination', width: 150 },
    { title: '承运人', dataIndex: 'vendor', width: 120 }
  ];
  
  // 添加箱型相关列 (仅整箱)
  if (type === 'fcl') {
    precarriageColumns.push(
      { title: '20GP', dataIndex: '20GP', width: 100 },
      { title: '40GP', dataIndex: '40GP', width: 100 },
      { title: '40HC', dataIndex: '40HC', width: 100 }
    );
  } else {
    precarriageColumns.push(
      { title: '运价', dataIndex: 'price', width: 100 },
      { title: '币种', dataIndex: 'currency', width: 80 }
    );
  }
  
  // 表格列 - 尾程运价
  const oncarriageColumns = [
    {
      title: '选择',
      width: 80,
      render: (_: unknown, record: OncarriageRate) => (
        <Radio
          checked={selectedOncarriageRate === record.id}
          onChange={() => setSelectedOncarriageRate(record.id)}
        />
      ),
    },
    { title: '运价编号', dataIndex: 'certNo', width: 120 },
    { title: '目的地', dataIndex: 'destination', width: 150 },
    { title: '地址类型', dataIndex: 'addressType', width: 100 },
    { title: '代理名称', dataIndex: 'agentName', width: 150 },
    { title: '运价', dataIndex: 'price', width: 100 },
    { title: '币种', dataIndex: 'currency', width: 80 }
  ];

  if (!inquiryDetail) {
    return (
      <SaasLayout menuSelectedKey="9" breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>询价报价</Breadcrumb.Item>
          <Breadcrumb.Item>询价管理</Breadcrumb.Item>
          <Breadcrumb.Item>询价详情</Breadcrumb.Item>
        </Breadcrumb>
      }>
        <Card>
          <div className="p-4 text-center">{isLoading ? '加载中...' : '未找到详情信息'}</div>
        </Card>
      </SaasLayout>
    );
  }

  return (
    <SaasLayout menuSelectedKey="9" breadcrumb={
      <Breadcrumb>
        <Breadcrumb.Item>询价报价</Breadcrumb.Item>
        <Breadcrumb.Item>询价管理</Breadcrumb.Item>
        <Breadcrumb.Item>询价详情</Breadcrumb.Item>
      </Breadcrumb>
    }>
      <Card>
        <div className="flex items-center mb-4">
          <Button icon={<IconArrowLeft />} onClick={handleGoBack}>返回</Button>
          <Title heading={6} className="ml-4 mb-0">询价详情：{inquiryDetail.inquiryNo}</Title>
          <div className="ml-auto">
            <Space>
              <Button type="primary" onClick={handlePrintQuotation}>打印报价单</Button>
              <Button type="primary" onClick={handleGenerateDelegate}>生成委托</Button>
            </Space>
          </div>
        </div>
        
        <Form form={form} layout="vertical">
          {/* 基本信息区域 */}
          <div className="border rounded p-4 mb-4">
            <div className="section-title">基本信息</div>
            
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <FormItem label="询价编号">
                  <Input value={inquiryDetail.inquiryNo} disabled />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="询价来源">
                  <Input value={inquiryDetail.source} disabled />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="询价人">
                  <Input value={inquiryDetail.inquirer} disabled />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="货盘性质">
                  <Input value={inquiryDetail.cargoNature} disabled />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="货好时间">
                  <Input value={inquiryDetail.cargoReadyTime} disabled />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={type === 'air' ? "航空公司" : "船公司"}>
                  <Input value={inquiryDetail.shipCompany} disabled />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="直达/中转">
                  <Input value={inquiryDetail.transitType} disabled />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="航线">
                  <Input value={inquiryDetail.route} disabled />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={type === 'air' ? "起始地" : "起运港"}>
                  <Input value={inquiryDetail.departurePort} disabled />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label={type === 'air' ? "目的地" : "卸货港"}>
                  <Input value={inquiryDetail.dischargePort} disabled />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="委托单位类型">
                  <Input value={inquiryDetail.clientType} disabled />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="委托单位名称">
                  <Input value={inquiryDetail.clientName} disabled />
                </FormItem>
              </Col>
              
              {/* 针对不同类型显示不同字段 */}
              {type === 'fcl' ? (
                <Col span={8}>
                  <FormItem label="箱型箱量">
                    <Input 
                      value={inquiryDetail.containerInfo?.map(item => `${item.count}*${item.type}`).join('+')} 
                      disabled 
                    />
                  </FormItem>
                </Col>
              ) : (
                <>
                  <Col span={8}>
                    <FormItem label="重量(KGS)">
                      <Input value={inquiryDetail.weight} disabled />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label="体积(CBM)">
                      <Input value={inquiryDetail.volume} disabled />
                    </FormItem>
                  </Col>
                </>
              )}
              
              <Col span={24}>
                <FormItem label="备注">
                  <Input.TextArea value={inquiryDetail.remark} disabled />
                </FormItem>
              </Col>
            </Row>
          </div>
          
          {/* 报价方案区域 */}
          <div className="border rounded p-4 mb-4">
            <div className="section-title">报价方案</div>
            
            {/* 干线运价 */}
            <div className="rate-table-container">
              <div className="rate-table-title">干线运价</div>
              <Table
                rowKey="id"
                columns={type === 'fcl' ? fclMainlineColumns : lclAirMainlineColumns}
                data={inquiryDetail.mainlineRates}
                className="match-price-table"
                pagination={false}
                border={true}
                scroll={{ x: 1500 }}
              />
            </div>
            
            {/* 港前运价 */}
            <div className="rate-table-container">
              <div className="rate-table-title">港前运价</div>
              <Table
                rowKey="id"
                columns={precarriageColumns}
                data={inquiryDetail.precarriageRates}
                className="match-price-table"
                pagination={false}
                border={true}
                scroll={{ x: 1200 }}
              />
            </div>
            
            {/* 尾程运价 */}
            <div className="rate-table-container">
              <div className="rate-table-title">尾程运价</div>
              <Table
                rowKey="id"
                columns={oncarriageColumns}
                data={inquiryDetail.oncarriageRates}
                className="match-price-table"
                pagination={false}
                border={true}
                scroll={{ x: 1000 }}
              />
            </div>
          </div>
        </Form>
      </Card>
    </SaasLayout>
  );
};

export default InquiryDetail; 