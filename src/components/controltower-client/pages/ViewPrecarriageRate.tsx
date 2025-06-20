import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Button, 
  Space, 
  Descriptions,
  Table
} from '@arco-design/web-react';
import { IconArrowLeft, IconDownload } from '@arco-design/web-react/icon';
import { useNavigate, useParams } from 'react-router-dom';

const { Title } = Typography;

/**
 * 港前运价查看页面
 */
const ViewPrecarriageRate: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const rateId = params.id;
  
  // 基本信息状态
  const [rateData, setRateData] = useState<any>({});

  // 加载运价数据
  useEffect(() => {
    if (rateId) {
      loadRateData(rateId);
    }
  }, [rateId]);

  const loadRateData = async (id: string) => {
    try {
      setLoading(true);
      // 模拟API调用获取运价数据
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟返回的数据
      const mockData = {
        code: `PCR2024050${id.padStart(3, '0')}`,
        rateType: '直拖',
        sublineType: null,
        origin: '浙江省杭州市萧山区',
        destination: 'CNSHA | SHANGHAI',
        terminal: '洋山',
        vendor: '安吉物流',
        '20gp': 800,
        '40gp': 1200,
        '40hc': 1300,
        '40nor': 1250,
        '45hc': 1500,
        validDateRange: '2024-05-01 至 2024-12-31',
        status: '正常',
        remark: '需提前24小时预约',
        createDate: '2024-05-01',
        createPerson: '张三',
        modifyDate: '2024-05-15',
        modifyPerson: '李四',
        validFrom: '2024-05-01',
        validTo: '2024-12-31'
      };
      
      setRateData(mockData);
      
    } catch (error) {
      console.error('加载运价数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 返回列表页
  const handleGoBack = () => {
    navigate('/controltower-client/saas/rate-query');
  };

  // 导出运价
  const handleExportRate = () => {
    console.log('导出港前运价数据');
    // TODO: 实现导出功能
  };

  return (
    <div>
      {/* 页面头部 */}
      <Card style={{ marginBottom: '20px' }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Title heading={4} style={{ margin: 0 }}>查看港前运价</Title>
          </div>
          <Space>
            <Button onClick={handleGoBack} icon={<IconArrowLeft />}>返回</Button>
            <Button 
              type="primary" 
              onClick={handleExportRate} 
              icon={<IconDownload />}
            >
              导出运价
            </Button>
          </Space>
        </div>
      </Card>

      {/* 基本信息区域 */}
      <Card title="基本信息" className="mb-6">
        <Descriptions 
          column={3}
          layout="vertical"
          data={[
            { label: '港前运价编号', value: rateData.code },
            { label: '运价类型', value: rateData.rateType },
            { label: '支线类型', value: rateData.sublineType || '-' },
            { label: '状态', value: rateData.status },
          ]}
        />
      </Card>

      {/* 起运信息区域 */}
      <Card title="起运信息" className="mb-6">
        <Descriptions 
          column={3}
          layout="vertical"
          data={[
            { label: '起运地', value: rateData.origin },
            { label: '起运港', value: rateData.destination },
            { label: '码头', value: rateData.terminal },
            { label: '供应商', value: rateData.vendor },
          ]}
        />
      </Card>

      {/* 有效期设置 */}
      <Card title="有效期设置" className="mb-6">
        <Descriptions 
          column={1}
          layout="vertical"
          data={[
            { label: '有效期', value: rateData.validDateRange },
          ]}
        />
      </Card>

      {/* 运价明细区域 */}
      <Card title="运价明细" className="mb-6">
        <div className="mb-4">
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
              {
                title: '20GP',
                dataIndex: '20gp',
                width: 120,
                render: (value: string) => value ? `¥ ${value}` : '-'
              },
              {
                title: '40GP',
                dataIndex: '40gp',
                width: 120,
                render: (value: string) => value ? `¥ ${value}` : '-'
              },
              {
                title: '40HC',
                dataIndex: '40hc',
                width: 120,
                render: (value: string) => value ? `¥ ${value}` : '-'
              },
              {
                title: '40NOR',
                dataIndex: '40nor',
                width: 120,
                render: (value: string) => value ? `¥ ${value}` : '-'
              },
              {
                title: '45HC',
                dataIndex: '45hc',
                width: 120,
                render: (value: string) => value ? `¥ ${value}` : '-'
              },
              {
                title: '特殊备注',
                dataIndex: 'specialNote',
                width: 200,
              }
            ]}
            data={[
              {
                key: 1,
                feeName: '港前运费',
                currency: 'CNY',
                '20gp': rateData['20gp'],
                '40gp': rateData['40gp'],
                '40hc': rateData['40hc'],
                '40nor': rateData['40nor'],
                '45hc': rateData['45hc'],
                specialNote: '基础运输费用'
              },
              {
                key: 2,
                feeName: '装卸费',
                currency: 'CNY',
                '20gp': '180',
                '40gp': '320',
                '40hc': '350',
                '40nor': '320',
                '45hc': '380',
                specialNote: '码头装卸操作费'
              },
              {
                key: 3,
                feeName: '操作费',
                currency: 'CNY',
                '20gp': '120',
                '40gp': '200',
                '40hc': '220',
                '40nor': '200',
                '45hc': '250',
                specialNote: '港前操作服务费'
              },
              {
                key: 4,
                feeName: '报关费',
                currency: 'CNY',
                '20gp': '150',
                '40gp': '150',
                '40hc': '150',
                '40nor': '150',
                '45hc': '150',
                specialNote: '出口报关费用'
              },
              {
                key: 5,
                feeName: '查验费',
                currency: 'CNY',
                '20gp': '300',
                '40gp': '450',
                '40hc': '450',
                '40nor': '450',
                '45hc': '500',
                specialNote: '海关查验时收取'
              }
            ]}
            pagination={false}
            scroll={{ x: 'max-content' }}
          />
        </div>

        {/* 非按箱型计费 */}
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
                render: (value: string, record: any) => value ? `${record.currency} ${value}` : '-'
              },
              {
                title: '特殊备注',
                dataIndex: 'specialNote',
                width: 250,
              }
            ]}
            data={[
              {
                key: 1,
                feeName: '订舱费',
                currency: 'CNY',
                unit: '票',
                price: '120',
                specialNote: '每票订舱手续费'
              },
              {
                key: 2,
                feeName: '单证费',
                currency: 'CNY',
                unit: '票',
                price: '80',
                specialNote: '单据制作费用'
              },
              {
                key: 3,
                feeName: '铅封费',
                currency: 'CNY',
                unit: '个',
                price: '25',
                specialNote: '每个铅封收取'
              },
              {
                key: 4,
                feeName: '监管费',
                currency: 'CNY',
                unit: '票',
                price: '150',
                specialNote: '监管查验费用'
              },
              {
                key: 5,
                feeName: '预录费',
                currency: 'CNY',
                unit: '票',
                price: '100',
                specialNote: '海关预录入费'
              }
            ]}
            pagination={false}
            scroll={{ x: 'max-content' }}
          />
        </div>
      </Card>
    </div>
  );
};

export default ViewPrecarriageRate; 