import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Breadcrumb, 
  Typography, 
  Button, 
  Space, 
  Table, 
  Radio, 
  Descriptions,
  Modal,
  InputNumber,
  Select,
  Input,
  Message
} from '@arco-design/web-react';
import { IconArrowLeft, IconDownload, IconCopy, IconPrinter } from '@arco-design/web-react/icon';
import { useNavigate, useParams } from 'react-router-dom';
import ControlTowerSaasLayout from "./ControlTowerSaasLayout";
import './CreateFclInquiry.css';

const { Title } = Typography;

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
  
  // 状态
  const [inquiryDetail, setInquiryDetail] = useState<InquiryDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedMainlineRate, setSelectedMainlineRate] = useState<string>('');
  const [selectedPrecarriageRate, setSelectedPrecarriageRate] = useState<string>('');
  const [selectedOncarriageRate, setSelectedOncarriageRate] = useState<string>('');

  // 导出运价相关状态
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [containerSelections, setContainerSelections] = useState<Array<{
    id: number;
    type: string;
    count: number;
  }>>([{ id: 1, type: '20gp', count: 1 }]);
  const [copyTextModalVisible, setCopyTextModalVisible] = useState(false);
  const [pdfPreviewVisible, setPdfPreviewVisible] = useState(false);
  const [quotationText, setQuotationText] = useState('');

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

  // 导出报价
  const handleExportQuotation = () => {
    setExportModalVisible(true);
  };

  // 生成快捷报价文本
  const generateQuotationText = () => {
    if (!inquiryDetail || !selectedMainlineRate) {
      Message.warning('请先选择运价方案');
      return;
    }

    const selectedContainers = containerSelections
      .filter(item => item.count > 0)
      .map(item => `${item.count}*${item.type.toUpperCase()}`)
      .join(' + ');

    if (!selectedContainers || containerSelections.length === 0) {
      Message.warning('请先选择箱型箱量');
      return;
    }

    // 获取选中的运价信息
    const mainlineRate = inquiryDetail.mainlineRates.find(r => r.id === selectedMainlineRate);
    const precarriageRate = inquiryDetail.precarriageRates.find(r => r.id === selectedPrecarriageRate);
    const oncarriageRate = inquiryDetail.oncarriageRates.find(r => r.id === selectedOncarriageRate);

    // 计算总价格
    let totalMainlineFees = 0;
    let totalPrecarriageFees = 0;
    let totalOncarriageFees = 0;

    containerSelections.forEach(selection => {
      if (selection.count > 0) {
        // 干线费用
        if (mainlineRate) {
          const rate = type === 'fcl' ? parseInt(mainlineRate[selection.type as keyof MainlineRate] as string || '0') : parseInt(mainlineRate.price || '0');
          totalMainlineFees += rate * selection.count;
        }
        
        // 港前费用
        if (precarriageRate) {
          const rate = type === 'fcl' ? parseInt(precarriageRate[selection.type as keyof PrecarriageRate] as string || '0') : parseInt(precarriageRate.price || '0');
          totalPrecarriageFees += rate * selection.count;
        }
        
        // 尾程费用
        if (oncarriageRate) {
          const rate = parseInt(oncarriageRate.price || '0');
          totalOncarriageFees += rate * selection.count;
        }
      }
    });

    const totalCost = totalMainlineFees + totalPrecarriageFees + totalOncarriageFees;

    const text = `
【询价报价单】

询价编号：${inquiryDetail.inquiryNo}
询价类型：${inquiryDetail.inquiryType.toUpperCase()}
询价人：${inquiryDetail.inquirer}
${type === 'fcl' ? `箱型箱量：${selectedContainers}` : `重量：${inquiryDetail.weight} KGS\n体积：${inquiryDetail.volume} CBM`}

航线信息：
起运港：${inquiryDetail.departurePort}
目的港：${inquiryDetail.dischargePort}
${type === 'air' ? '航空公司' : '船公司'}：${inquiryDetail.shipCompany}
直达/中转：${inquiryDetail.transitType}

价格明细：
- 干线费用：${totalMainlineFees} ${mainlineRate?.currency || 'USD'}
- 港前费用：${totalPrecarriageFees} ${precarriageRate?.currency || 'CNY'}
- 尾程费用：${totalOncarriageFees} ${oncarriageRate?.currency || 'USD'}
总计：${totalCost} ${mainlineRate?.currency || 'USD'}

货好时间：${inquiryDetail.cargoReadyTime}
委托单位：${inquiryDetail.clientName}
备注：${inquiryDetail.remark}

※ 以上价格仅供参考，实际价格以正式合同为准
※ 如有任何疑问，请联系我们的客服团队
    `.trim();

    setQuotationText(text);
    setExportModalVisible(false);
    setCopyTextModalVisible(true);
  };

  // 复制到剪贴板
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(quotationText);
      Message.success('报价文本已复制到剪贴板');
      setCopyTextModalVisible(false);
    } catch (err) {
      Message.error('复制失败，请手动复制');
    }
  };

  // 生成并预览PDF
  const generatePDF = () => {
    if (!inquiryDetail || !selectedMainlineRate) {
      Message.warning('请先选择运价方案');
      return;
    }

    const selectedContainers = containerSelections.filter(item => item.count > 0);

    if (selectedContainers.length === 0) {
      Message.warning('请先选择箱型箱量');
      return;
    }

    setExportModalVisible(false);
    setPdfPreviewVisible(true);
  };

  // 添加新的箱型选择
  const addContainerSelection = () => {
    const newId = Math.max(...containerSelections.map(item => item.id)) + 1;
    setContainerSelections([...containerSelections, { id: newId, type: '20gp', count: 1 }]);
  };

  // 删除箱型选择
  const removeContainerSelection = (id: number) => {
    if (containerSelections.length > 1) {
      setContainerSelections(containerSelections.filter(item => item.id !== id));
    }
  };

  // 更新箱型选择
  const updateContainerSelection = (id: number, field: 'type' | 'count', value: string | number) => {
    setContainerSelections(containerSelections.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // 获取可选择的箱型列表
  const getAvailableContainerTypes = () => {
    const containerTypes = ['20gp', '40gp', '40hc', '45hc', '40nor'];
    return containerTypes.map(type => ({ label: type.toUpperCase(), value: type }));
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
    navigate(`/controltower/saas/create-delegate/${type}/${id}`, {
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
      <ControlTowerSaasLayout menuSelectedKey="9" breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>询价报价</Breadcrumb.Item>
          <Breadcrumb.Item>询价管理</Breadcrumb.Item>
          <Breadcrumb.Item>询价详情</Breadcrumb.Item>
        </Breadcrumb>
      }>
        <Card>
          <div className="p-4 text-center">{isLoading ? '加载中...' : '未找到详情信息'}</div>
        </Card>
      </ControlTowerSaasLayout>
    );
  }

  return (
    <ControlTowerSaasLayout menuSelectedKey="9" breadcrumb={
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
              <Button type="primary" onClick={handleExportQuotation} icon={<IconDownload />}>导出报价</Button>
              <Button type="primary" onClick={handleGenerateDelegate}>生成委托</Button>
            </Space>
          </div>
        </div>
        
        {/* 基本信息区域 */}
        <Card title="基本信息" className="mb-6">
          <Descriptions 
            column={3}
            layout="vertical"
            data={[
              { label: '询价编号', value: inquiryDetail.inquiryNo },
              { label: '询价来源', value: inquiryDetail.source },
              { label: '询价人', value: inquiryDetail.inquirer },
              { label: '货盘性质', value: inquiryDetail.cargoNature },
              { label: '货好时间', value: inquiryDetail.cargoReadyTime },
              { label: type === 'air' ? "航空公司" : "船公司", value: inquiryDetail.shipCompany },
              { label: '直达/中转', value: inquiryDetail.transitType },
              { label: '航线', value: inquiryDetail.route },
              { label: type === 'air' ? "起始地" : "起运港", value: inquiryDetail.departurePort },
              { label: type === 'air' ? "目的地" : "卸货港", value: inquiryDetail.dischargePort },
              { label: '委托单位类型', value: inquiryDetail.clientType },
              { label: '委托单位名称', value: inquiryDetail.clientName },
              // 根据类型显示不同字段
              ...(type === 'fcl' ? [
                { label: '箱型箱量', value: inquiryDetail.containerInfo?.map(item => `${item.count}*${item.type}`).join('+') || '-' }
              ] : [
                { label: '重量(KGS)', value: inquiryDetail.weight || '-' },
                { label: '体积(CBM)', value: inquiryDetail.volume || '-' }
              ]),
              { label: '备注', value: inquiryDetail.remark || '-' }
            ]}
          />
        </Card>
          
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

          {/* 导出运价弹窗 */}
          <Modal
            title="导出报价"
            visible={exportModalVisible}
            onCancel={() => setExportModalVisible(false)}
            footer={null}
            style={{ width: 600 }}
          >
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">选择箱型箱量：</div>
                {containerSelections.map((selection) => (
                  <div key={selection.id} className="flex items-center gap-4 mb-3">
                    <Select
                      style={{ width: 120 }}
                      value={selection.type}
                      onChange={(value) => updateContainerSelection(selection.id, 'type', value)}
                    >
                      {getAvailableContainerTypes().map(type => (
                        <Select.Option key={type.value} value={type.value}>{type.label}</Select.Option>
                      ))}
                    </Select>
                    <InputNumber
                      style={{ width: 100 }}
                      min={0}
                      value={selection.count}
                      onChange={(value) => updateContainerSelection(selection.id, 'count', value || 0)}
                    />
                    <span className="text-sm text-gray-500">个</span>
                    {containerSelections.length > 1 && (
                      <Button 
                        size="mini" 
                        type="text" 
                        status="danger"
                        onClick={() => removeContainerSelection(selection.id)}
                      >
                        删除
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  type="text" 
                  size="mini" 
                  onClick={addContainerSelection}
                  className="text-blue-600"
                >
                  + 添加箱型
                </Button>
              </div>
              
              <div className="flex gap-4 pt-4 border-t">
                <Button type="outline" onClick={generateQuotationText} icon={<IconCopy />}>
                  快捷报价
                </Button>
                <Button type="primary" onClick={generatePDF} icon={<IconPrinter />}>
                  PDF 报价单
                </Button>
              </div>
            </div>
          </Modal>

          {/* 快捷报价文本弹窗 */}
          <Modal
            title="快捷报价文本"
            visible={copyTextModalVisible}
            onCancel={() => setCopyTextModalVisible(false)}
            footer={
              <div className="flex justify-end gap-2">
                <Button onClick={() => setCopyTextModalVisible(false)}>关闭</Button>
                <Button type="primary" onClick={copyToClipboard} icon={<IconCopy />}>
                  复制到剪贴板
                </Button>
              </div>
            }
            style={{ width: 600 }}
          >
            <Input.TextArea
              value={quotationText}
              readOnly
              autoSize={{ minRows: 15, maxRows: 20 }}
              className="font-mono text-sm"
            />
          </Modal>

          {/* PDF预览弹窗 */}
          <Modal
            title="PDF 报价单预览"
            visible={pdfPreviewVisible}
            onCancel={() => setPdfPreviewVisible(false)}
            footer={
              <div className="flex justify-end gap-2">
                <Button onClick={() => setPdfPreviewVisible(false)}>关闭</Button>
                <Button type="primary" icon={<IconDownload />}>
                  下载 PDF
                </Button>
              </div>
            }
            style={{ width: 800, top: 20 }}
          >
            <div className="pdf-preview bg-white p-6 border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">询价报价单</h2>
                <div className="text-sm text-gray-600 mt-2">询价编号：{inquiryDetail?.inquiryNo}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <div className="font-medium text-gray-700 mb-1">基本信息</div>
                  <div>询价类型：{type?.toUpperCase()}</div>
                  <div>询价人：{inquiryDetail?.inquirer}</div>
                  <div>航线：{inquiryDetail?.departurePort} → {inquiryDetail?.dischargePort}</div>
                  <div>{type === 'air' ? '航空公司' : '船公司'}：{inquiryDetail?.shipCompany}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700 mb-1">货物信息</div>
                  {type === 'fcl' ? (
                    <div>箱型箱量：{inquiryDetail?.containerInfo?.map(item => `${item.count}*${item.type}`).join('+')}</div>
                  ) : (
                    <>
                      <div>重量：{inquiryDetail?.weight} KGS</div>
                      <div>体积：{inquiryDetail?.volume} CBM</div>
                    </>
                  )}
                  <div>货好时间：{inquiryDetail?.cargoReadyTime}</div>
                  <div>委托单位：{inquiryDetail?.clientName}</div>
                </div>
              </div>

              {/* 显示选中的箱型数量 */}
              <div className="mb-4">
                <div className="font-medium text-gray-700 mb-2">选择箱型箱量</div>
                <div className="text-sm">
                  {containerSelections
                    .filter(item => item.count > 0)
                    .map(item => `${item.count} × ${item.type.toUpperCase()}`)
                    .join('，')
                  }
                </div>
              </div>

              {/* 综合报价明细 */}
              <div className="mb-6">
                <div className="bg-blue-50 px-3 py-2 rounded-lg border-l-4 border-blue-500 mb-3">
                  <h4 className="font-bold text-blue-800 text-sm">综合报价明细</h4>
                </div>
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-blue-500 text-white">
                      <tr>
                        <th className="px-3 py-2 text-left font-bold">费用类型</th>
                        <th className="px-3 py-2 text-center font-bold">运价编号</th>
                        <th className="px-3 py-2 text-center font-bold">费用</th>
                        <th className="px-3 py-2 text-center font-bold">币种</th>
                        <th className="px-3 py-2 text-right font-bold">备注</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedMainlineRate && inquiryDetail?.mainlineRates.find(r => r.id === selectedMainlineRate) && (
                        <tr className="bg-blue-25">
                          <td className="px-3 py-2 font-medium">干线费用</td>
                          <td className="px-3 py-2 text-center">{inquiryDetail.mainlineRates.find(r => r.id === selectedMainlineRate)?.certNo}</td>
                          <td className="px-3 py-2 text-center">{inquiryDetail.mainlineRates.find(r => r.id === selectedMainlineRate)?.price}</td>
                          <td className="px-3 py-2 text-center">{inquiryDetail.mainlineRates.find(r => r.id === selectedMainlineRate)?.currency}</td>
                          <td className="px-3 py-2 text-right">{inquiryDetail.mainlineRates.find(r => r.id === selectedMainlineRate)?.shipCompany}</td>
                        </tr>
                      )}
                      {selectedPrecarriageRate && inquiryDetail?.precarriageRates.find(r => r.id === selectedPrecarriageRate) && (
                        <tr className="bg-green-25">
                          <td className="px-3 py-2 font-medium">港前费用</td>
                          <td className="px-3 py-2 text-center">{inquiryDetail.precarriageRates.find(r => r.id === selectedPrecarriageRate)?.certNo}</td>
                          <td className="px-3 py-2 text-center">{inquiryDetail.precarriageRates.find(r => r.id === selectedPrecarriageRate)?.price}</td>
                          <td className="px-3 py-2 text-center">{inquiryDetail.precarriageRates.find(r => r.id === selectedPrecarriageRate)?.currency}</td>
                          <td className="px-3 py-2 text-right">{inquiryDetail.precarriageRates.find(r => r.id === selectedPrecarriageRate)?.vendor}</td>
                        </tr>
                      )}
                      {selectedOncarriageRate && inquiryDetail?.oncarriageRates.find(r => r.id === selectedOncarriageRate) && (
                        <tr className="bg-orange-25">
                          <td className="px-3 py-2 font-medium">尾程费用</td>
                          <td className="px-3 py-2 text-center">{inquiryDetail.oncarriageRates.find(r => r.id === selectedOncarriageRate)?.certNo}</td>
                          <td className="px-3 py-2 text-center">{inquiryDetail.oncarriageRates.find(r => r.id === selectedOncarriageRate)?.price}</td>
                          <td className="px-3 py-2 text-center">{inquiryDetail.oncarriageRates.find(r => r.id === selectedOncarriageRate)?.currency}</td>
                          <td className="px-3 py-2 text-right">{inquiryDetail.oncarriageRates.find(r => r.id === selectedOncarriageRate)?.agentName}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 text-xs text-gray-500 border-t pt-4">
                <div>备注：{inquiryDetail?.remark}</div>
                <div className="mt-2">
                  <div>※ 以上价格仅供参考，实际价格以正式合同为准</div>
                  <div>※ 如有任何疑问，请联系我们的客服团队</div>
                </div>
              </div>
            </div>
          </Modal>
      </Card>
    </ControlTowerSaasLayout>
  );
};

export default InquiryDetail; 