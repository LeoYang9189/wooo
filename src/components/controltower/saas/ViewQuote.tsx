import React, { useState, useEffect } from 'react';
import {
  Card,
  Descriptions,
  Breadcrumb,
  Button,
  Space,
  Modal,
  Message,
  Checkbox,
  Tag,
  Table,
  Typography,
  Grid
} from '@arco-design/web-react';
import { IconClose, IconDownload, IconCheck } from '@arco-design/web-react/icon';
import { useNavigate, useParams } from 'react-router-dom';
import ControlTowerSaasLayout from "./ControlTowerSaasLayout";

const { Title } = Typography;
const { Row, Col } = Grid;

interface QuoteBasicInfo {
  quoteNo: string;
  inquiryNo: string;
  quoter: string;
  clientType: string;
  clientCompany: string;
  clientName: string;
  cargoNature: string;
  cargoReadyTime: string;
  cargoReadyDate?: string;
  loadingPointDetail?: string;
  addressType?: string;
  zipCode?: string;
  address?: string;
  warehouseCode?: string;
}

interface QuoteCargoInfo {
  transitType: string;
  route: string;
  departurePort: string;
  dischargePort: string;
  transitPort?: string;
  weight: string;
  shipCompany: string;
  remark: string;
}

interface ContainerInfo {
  id: number;
  type: string;
  count: number;
}

interface RateItem {
  id: number;
  feeName: string;
  currency: string;
  unit: string;
  unitPrice?: string;
  containerRates?: Record<string, string>;
  remark: string;
}

interface MainlineRate {
  id: number;
  selected: boolean;
  shipCompany: string;
  validPeriod: string;
  transitType: string;
  transitTime: string;
  freeBox: string;
  freeStorage: string;
  status: '已报价' | '待报价' | '拒绝报价' | '无需报价';
  rateItems: RateItem[];
}

interface PrecarriageRate {
  id: number;
  selected: boolean;
  type: string;
  subType?: string;
  vendor: string;
  validPeriod: string;
  status: '已报价' | '待报价' | '拒绝报价' | '无需报价';
  rateItems: RateItem[];
}

interface OncarriageRate {
  id: number;
  selected: boolean;
  agentName: string;
  validPeriod: string;
  status: '已报价' | '待报价' | '拒绝报价' | '无需报价';
  rateItems: RateItem[];
}

const ViewQuote: React.FC = () => {
  const navigate = useNavigate();
  const { quoteId } = useParams<{ quoteId: string }>();
  
  // 状态管理
  const [loading, setLoading] = useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [incompleteModalVisible, setIncompleteModalVisible] = useState(false);
  
  // 报价数据
  const [basicInfo, setBasicInfo] = useState<QuoteBasicInfo>({} as QuoteBasicInfo);
  const [cargoInfo, setCargoInfo] = useState<QuoteCargoInfo>({} as QuoteCargoInfo);
  const [containerList, setContainerList] = useState<ContainerInfo[]>([]);
  const [mainlineRates, setMainlineRates] = useState<MainlineRate[]>([]);
  const [precarriageRates, setPrecarriageRates] = useState<PrecarriageRate[]>([]);
  const [oncarriageRates, setOncarriageRates] = useState<OncarriageRate[]>([]);

  // 加载报价数据
  useEffect(() => {
    loadQuoteData();
  }, [quoteId]);

  const loadQuoteData = async () => {
    setLoading(true);
    try {
      // 模拟加载数据
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 设置基本信息
      setBasicInfo({
        quoteNo: `QT${Date.now().toString().slice(-8)}`,
        inquiryNo: 'INQ20241201001',
        quoter: '张三',
        clientType: '正式客户',
        clientCompany: '阿里巴巴集团',
        clientName: '',
        cargoNature: '询价',
        cargoReadyTime: '一周内',
        loadingPointDetail: '浙江省杭州市萧山区某某路123号',
        addressType: '第三方地址',
        zipCode: '92101',
        address: 'San Diego, CA'
      });

      // 设置货物信息
      setCargoInfo({
        transitType: '中转',
        route: '美加线',
        departurePort: 'CNSHA | Shanghai',
        dischargePort: 'USLAX | Los Angeles',
        transitPort: 'SGSIN | Singapore',
        weight: '1500',
        shipCompany: 'MSC | 地中海',
        remark: 'LSE已含'
      });

      // 设置箱型箱量
      setContainerList([
        { id: 1, type: '20GP', count: 2 },
        { id: 2, type: '40HC', count: 1 }
      ]);

      // 设置mock运价数据
      setMainlineRates(generateMockMainlineRates());
      setPrecarriageRates(generateMockPrecarriageRates());
      setOncarriageRates(generateMockOncarriageRates());
      
    } catch (error) {
      Message.error('加载报价数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 生成mock数据的函数
  const generateMockMainlineRates = (): MainlineRate[] => {
    const statuses: Array<'已报价' | '待报价' | '拒绝报价' | '无需报价'> = ['已报价', '待报价', '拒绝报价', '无需报价'];
    
    return Array(3).fill(null).map((_, index) => ({
      id: index + 1,
      selected: index === 0, // 默认选中第一个
      shipCompany: ['MSC | 地中海', 'COSCO | 中远海运', 'MAERSK | 马士基'][index],
      validPeriod: '2024-05-01 至 2024-12-31',
      transitType: ['直达', '中转', '直达'][index],
      transitTime: `${20 + index * 2}天`,
      freeBox: `${7 + index}天`,
      freeStorage: `${5 + index}天`,
      status: statuses[index],
      rateItems: [
        {
          id: 1,
          feeName: '海运费',
          currency: 'USD',
          unit: '箱',
          containerRates: {
            '20GP': (500 + index * 50).toString(),
            '40HC': (900 + index * 80).toString()
          },
          remark: 'LSE已含'
        },
        {
          id: 2,
          feeName: '港杂费',
          currency: 'USD',
          unit: '箱',
          containerRates: {
            '20GP': (150 + index * 20).toString(),
            '40HC': (250 + index * 30).toString()
          },
          remark: ''
        }
      ]
    }));
  };

  const generateMockPrecarriageRates = (): PrecarriageRate[] => {
    const statuses: Array<'已报价' | '待报价' | '拒绝报价' | '无需报价'> = ['已报价', '待报价', '无需报价'];
    
    return Array(3).fill(null).map((_, index) => ({
      id: index + 1,
      selected: index === 0, // 默认选中第一个
      type: ['直拖', '支线', '海铁'][index],
      subType: index === 1 ? '乍浦支线' : index === 2 ? '湖州海铁' : undefined,
      vendor: ['安吉物流', '中远海运', '德邦物流'][index],
      validPeriod: '2024-05-01 至 2024-12-31',
      status: statuses[index],
      rateItems: [
        {
          id: 1,
          feeName: '拖车费',
          currency: 'CNY',
          unit: '箱',
          containerRates: {
            '20GP': (800 + index * 100).toString(),
            '40HC': (1200 + index * 150).toString()
          },
          remark: '含装卸费'
        }
      ]
    }));
  };

  const generateMockOncarriageRates = (): OncarriageRate[] => {
    const statuses: Array<'已报价' | '待报价' | '拒绝报价' | '无需报价'> = ['已报价', '拒绝报价', '无需报价'];
    
    return Array(3).fill(null).map((_, index) => ({
      id: index + 1,
      selected: index === 0, // 默认选中第一个
      agentName: ['XPO TRUCK LLC', 'DRAYEASY INC', 'AMERICAN FREIGHT'][index],
      validPeriod: '2024-05-01 至 2024-12-31',
      status: statuses[index],
      rateItems: [
        {
          id: 1,
          feeName: '配送费',
          currency: 'USD',
          unit: '箱',
          containerRates: {
            '20GP': (1200 + index * 100).toString(),
            '40HC': (1800 + index * 150).toString()
          },
          remark: '含卸货费'
        }
      ]
    }));
  };

  // 关闭页面
  const handleClose = () => {
    navigate(-1);
  };

  // 导出报价
  const handleExportQuote = () => {
    // 检查报价完整性
    const incompleteRates = checkQuoteCompleteness();
    
    if (incompleteRates.length > 0) {
      setIncompleteModalVisible(true);
    } else {
      setExportModalVisible(true);
    }
  };

  // 检查报价完整性
  const checkQuoteCompleteness = () => {
    const incomplete: string[] = [];
    
    // 检查干线运价
    const mainlineSelected = mainlineRates.filter(rate => rate.selected);
    if (mainlineSelected.some(rate => rate.status === '待报价' || rate.status === '拒绝报价')) {
      incomplete.push('干线运价：待报价');
    }
    
    // 检查港前运价
    const precarriageSelected = precarriageRates.filter(rate => rate.selected);
    if (precarriageSelected.some(rate => rate.status === '待报价' || rate.status === '拒绝报价')) {
      incomplete.push('港前运价：待报价');
    }
    
    // 检查尾程运价
    const oncarriageSelected = oncarriageRates.filter(rate => rate.selected);
    if (oncarriageSelected.some(rate => rate.status === '待报价' || rate.status === '拒绝报价')) {
      incomplete.push('尾程运价：待报价');
    }
    
    return incomplete;
  };

  // 处理运价选择
  const handleMainlineRateSelect = (rateId: number, checked: boolean) => {
    setMainlineRates(prev => prev.map(rate => 
      rate.id === rateId ? { ...rate, selected: checked } : rate
    ));
  };

  const handlePrecarriageRateSelect = (rateId: number, checked: boolean) => {
    setPrecarriageRates(prev => prev.map(rate => 
      rate.id === rateId ? { ...rate, selected: checked } : rate
    ));
  };

  const handleOncarriageRateSelect = (rateId: number, checked: boolean) => {
    setOncarriageRates(prev => prev.map(rate => 
      rate.id === rateId ? { ...rate, selected: checked } : rate
    ));
  };

  // 获取状态标签颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case '已报价': return 'green';
      case '待报价': return 'orange';
      case '拒绝报价': return 'red';
      case '无需报价': return 'gray';
      default: return 'blue';
    }
  };

  // 渲染运价表格
  const renderRateTable = (rateItems: RateItem[], containerTypes: string[]) => {
    const columns = [
      {
        title: '费用名称',
        dataIndex: 'feeName',
        width: 120,
      },
      {
        title: '币种',
        dataIndex: 'currency',
        width: 80,
      },
      ...containerTypes.map(type => ({
        title: type,
        dataIndex: 'containerRates',
        width: 100,
        render: (_: any, record: RateItem) => record.containerRates?.[type] || '-'
      })),
      {
        title: '备注',
        dataIndex: 'remark',
        width: 120,
        render: (value: string) => value || '-'
      }
    ];

    return (
      <Table
        columns={columns}
        data={rateItems}
        rowKey="id"
        pagination={false}
        size="small"
        border={{
          wrapper: true,
          cell: true
        }}
      />
    );
  };

  return (
    <ControlTowerSaasLayout
      menuSelectedKey="10"
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>询价报价</Breadcrumb.Item>
          <Breadcrumb.Item>报价管理</Breadcrumb.Item>
          <Breadcrumb.Item>查看报价</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Card 
        loading={loading}
        title={
          <div className="flex justify-between items-center">
            <span>报价详情</span>
            <Space>
              <Button 
                type="primary" 
                icon={<IconDownload />}
                onClick={handleExportQuote}
              >
                导出报价
              </Button>
              <Button 
                icon={<IconClose />}
                onClick={handleClose}
              >
                关闭
              </Button>
            </Space>
          </div>
        }
      >
        {/* 基本信息 */}
        <Card className="mb-4" title="基本信息">
          <Descriptions
            column={3}
            data={[
              { label: '报价编号', value: basicInfo.quoteNo },
              { label: '询价编号', value: basicInfo.inquiryNo },
              { label: '报价人', value: basicInfo.quoter },
              { label: '货盘性质', value: basicInfo.cargoNature },
              { label: '货好时间', value: basicInfo.cargoReadyTime },
              { label: '委托单位', value: basicInfo.clientType === '正式客户' ? basicInfo.clientCompany : basicInfo.clientName },
              ...(basicInfo.loadingPointDetail ? [{ label: '装箱门点', value: basicInfo.loadingPointDetail }] : []),
              ...(basicInfo.addressType ? [
                { label: '配送地址类型', value: basicInfo.addressType },
                ...(basicInfo.addressType === '第三方地址' ? [
                  { label: '邮编', value: basicInfo.zipCode },
                  { label: '地址', value: basicInfo.address }
                ] : [
                  { label: '仓库代码', value: basicInfo.warehouseCode }
                ])
              ] : [])
            ]}
          />
        </Card>

        {/* 货物信息 */}
        <Card className="mb-4" title="货物信息">
          <Descriptions
            column={3}
            data={[
              { label: '直达/中转', value: cargoInfo.transitType },
              { label: '航线', value: cargoInfo.route },
              { label: '起运港', value: cargoInfo.departurePort },
              { label: '卸货港', value: cargoInfo.dischargePort },
              ...(cargoInfo.transitPort ? [{ label: '中转港', value: cargoInfo.transitPort }] : []),
              { label: '重量', value: cargoInfo.weight ? `${cargoInfo.weight} KGS` : '' },
              { label: '船公司', value: cargoInfo.shipCompany },
              { label: '备注', value: cargoInfo.remark }
            ]}
          />
        </Card>

        {/* 箱型箱量 */}
        <Card className="mb-4" title="箱型箱量">
          <Row gutter={[16, 16]}>
            {containerList.map((container, index) => (
              <Col span={8} key={container.id}>
                <div className="border border-gray-200 rounded p-3 text-center">
                  <div className="text-lg font-semibold text-blue-600">
                    {container.type}
                  </div>
                  <div className="text-2xl font-bold mt-2">
                    {container.count}
                  </div>
                  <div className="text-gray-500 text-sm">箱</div>
                </div>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 运价明细模块 */}
        <Card title="运价明细">
          {/* 干线运价 */}
          {mainlineRates.length > 0 && (
            <div className="mb-6">
              <Title heading={6} className="mb-4 text-blue-600">干线运价</Title>
              <div className="space-y-4">
                {mainlineRates.map((rate) => (
                  <Card key={rate.id} className="border border-gray-200">
                    <div className="flex items-start gap-4">
                      {/* 选择框 */}
                      <div className="mt-2">
                        <Checkbox
                          checked={rate.selected}
                          onChange={(checked) => handleMainlineRateSelect(rate.id, checked)}
                        />
                      </div>
                      
                      {/* 运价内容 */}
                      <div className="flex-1">
                        {/* 基本信息 */}
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-4">
                            <span className="font-medium">船公司：{rate.shipCompany}</span>
                            <span>有效期：{rate.validPeriod}</span>
                            <span>直达/中转：{rate.transitType}</span>
                            <span>航程：{rate.transitTime}</span>
                          </div>
                          <Tag color={getStatusColor(rate.status)}>
                            {rate.status}
                          </Tag>
                        </div>
                        
                        {/* 免用箱免堆存 */}
                        <div className="flex gap-4 mb-4 text-sm text-gray-600">
                          <span>免用箱：{rate.freeBox}</span>
                          <span>免堆存：{rate.freeStorage}</span>
                        </div>
                        
                        {/* 费用明细表格 */}
                        {renderRateTable(rate.rateItems, containerList.map(c => c.type))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* 港前运价 */}
          {precarriageRates.length > 0 && (
            <div className="mb-6">
              <Title heading={6} className="mb-4 text-blue-600">港前运价</Title>
              <div className="space-y-4">
                {precarriageRates.map((rate) => (
                  <Card key={rate.id} className="border border-gray-200">
                    <div className="flex items-start gap-4">
                      {/* 选择框 */}
                      <div className="mt-2">
                        <Checkbox
                          checked={rate.selected}
                          onChange={(checked) => handlePrecarriageRateSelect(rate.id, checked)}
                        />
                      </div>
                      
                      {/* 运价内容 */}
                      <div className="flex-1">
                        {/* 基本信息 */}
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-4">
                            <span className="font-medium">类型：{rate.type}</span>
                            {rate.subType && <span>子类型：{rate.subType}</span>}
                            <span>供应商：{rate.vendor}</span>
                            <span>有效期：{rate.validPeriod}</span>
                          </div>
                          <Tag color={getStatusColor(rate.status)}>
                            {rate.status}
                          </Tag>
                        </div>
                        
                        {/* 费用明细表格 */}
                        {renderRateTable(rate.rateItems, containerList.map(c => c.type))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* 尾程运价 */}
          {oncarriageRates.length > 0 && (
            <div className="mb-6">
              <Title heading={6} className="mb-4 text-blue-600">尾程运价</Title>
              <div className="space-y-4">
                {oncarriageRates.map((rate) => (
                  <Card key={rate.id} className="border border-gray-200">
                    <div className="flex items-start gap-4">
                      {/* 选择框 */}
                      <div className="mt-2">
                        <Checkbox
                          checked={rate.selected}
                          onChange={(checked) => handleOncarriageRateSelect(rate.id, checked)}
                        />
                      </div>
                      
                      {/* 运价内容 */}
                      <div className="flex-1">
                        {/* 基本信息 */}
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-4">
                            <span className="font-medium">代理名称：{rate.agentName}</span>
                            <span>有效期：{rate.validPeriod}</span>
                          </div>
                          <Tag color={getStatusColor(rate.status)}>
                            {rate.status}
                          </Tag>
                        </div>
                        
                        {/* 费用明细表格 */}
                        {renderRateTable(rate.rateItems, containerList.map(c => c.type))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Card>

      </Card>

      {/* 报价不完整提示弹窗 */}
      <Modal
        title="报价不完整提示"
        visible={incompleteModalVisible}
        onOk={() => {
          setIncompleteModalVisible(false);
          setExportModalVisible(true);
        }}
        onCancel={() => setIncompleteModalVisible(false)}
        okText="确认"
        cancelText="取消"
      >
        <div className="space-y-4">
          <p>当前报价尚不完整，存在以下报价信息缺失：</p>
          <ul className="list-disc list-inside space-y-1">
            {checkQuoteCompleteness().map((item, index) => (
              <li key={index} className="text-red-500">{item}</li>
            ))}
          </ul>
          <p>是否仅导出已有的报价？</p>
        </div>
      </Modal>

      {/* 导出报价弹窗 - 将在后续步骤实现 */}
      <Modal
        title="导出报价"
        visible={exportModalVisible}
        onCancel={() => setExportModalVisible(false)}
        footer={null}
        style={{ width: '800px' }}
      >
        <div className="text-center py-8 text-gray-500">
          导出报价弹窗将在后续步骤实现
        </div>
      </Modal>
    </ControlTowerSaasLayout>
  );
};

export default ViewQuote; 