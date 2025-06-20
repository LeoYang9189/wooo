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
 * 尾程运价查看页面
 */
const ViewOncarriageRate: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();

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
      
      // 模拟API调用获取运价数据
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟返回的数据
      const mockData = {
        code: `LMR2024050${id.padStart(3, '0')}`,
        origin: 'USLAX | LOS ANGELES',
        addressType: id === '1' ? '第三方地址' : id === '2' ? '亚马逊仓库' : '易仓',
        zipCode: id === '1' ? '92101' : '',
        address: id === '1' ? 'San Diego, CA' : '',
        warehouseCode: id === '1' ? null : id === '2' ? 'ONT8' : 'LAX203',
        agentName: 'XPO TRUCK LLC',
        validDateRange: '2024-05-01 至 2024-12-31',
        remark: id === '3' ? '需提前24小时预约' : '',
        status: '正常',
        '20gp': 1200,
        '40gp': 1800,
        '40hc': 1900,
        '45hc': 2200,
        '40nor': 2000,
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
      
    }
  };

  // 返回列表页
  const handleGoBack = () => {
    navigate('/controltower-client/saas/rate-query');
  };

  // 导出运价
  const handleExportRate = () => {
    console.log('导出尾程运价数据');
    // TODO: 实现导出功能
  };

  // 渲染地址信息
  const renderAddressInfo = () => {
    if (rateData.addressType === '第三方地址') {
      return [
        { label: '邮编', value: rateData.zipCode },
        { label: '地址', value: rateData.address },
      ];
    } else if (rateData.addressType === '亚马逊仓库' || rateData.addressType === '易仓') {
      return [
        { label: '仓库代码', value: rateData.warehouseCode },
      ];
    }
    return [];
  };

  return (
    <div>
      {/* 页面头部 */}
      <Card style={{ marginBottom: '20px' }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Title heading={4} style={{ margin: 0 }}>查看尾程运价</Title>
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
            { label: '尾程运价编号', value: rateData.code },
            { label: '目的港', value: rateData.origin },
            { label: '状态', value: rateData.status },
            { label: '代理名称', value: rateData.agentName },
          ]}
        />
      </Card>

      {/* 配送信息区域 */}
      <Card title="配送信息" className="mb-6">
        <Descriptions 
          column={3}
          layout="vertical"
          data={[
            { label: '配送地址类型', value: rateData.addressType },
            ...renderAddressInfo(),
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
                render: (value: string) => value ? `$ ${value}` : '-'
              },
              {
                title: '40GP',
                dataIndex: '40gp',
                width: 120,
                render: (value: string) => value ? `$ ${value}` : '-'
              },
              {
                title: '40HC',
                dataIndex: '40hc',
                width: 120,
                render: (value: string) => value ? `$ ${value}` : '-'
              },
              {
                title: '40NOR',
                dataIndex: '40nor',
                width: 120,
                render: (value: string) => value ? `$ ${value}` : '-'
              },
              {
                title: '45HC',
                dataIndex: '45hc',
                width: 120,
                render: (value: string) => value ? `$ ${value}` : '-'
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
                feeName: '尾程运费',
                currency: 'USD',
                '20gp': rateData['20gp'],
                '40gp': rateData['40gp'],
                '40hc': rateData['40hc'],
                '40nor': rateData['40nor'],
                '45hc': rateData['45hc'],
                specialNote: '基础运输费用'
              },
              {
                key: 2,
                feeName: '送货费',
                currency: 'USD',
                '20gp': '150',
                '40gp': '250',
                '40hc': '280',
                '40nor': '250',
                '45hc': '320',
                specialNote: '门到门送货费'
              },
              {
                key: 3,
                feeName: '卸货费',
                currency: 'USD',
                '20gp': '80',
                '40gp': '120',
                '40hc': '130',
                '40nor': '120',
                '45hc': '150',
                specialNote: '目的地卸货费'
              },
              {
                key: 4,
                feeName: '仓储费',
                currency: 'USD',
                '20gp': '60',
                '40gp': '90',
                '40hc': '95',
                '40nor': '90',
                '45hc': '110',
                specialNote: '临时仓储费用'
              },
              {
                key: 5,
                feeName: '操作费',
                currency: 'USD',
                '20gp': '100',
                '40gp': '150',
                '40hc': '160',
                '40nor': '150',
                '45hc': '180',
                specialNote: '尾程操作服务费'
              },
              {
                key: 6,
                feeName: '燃油附加费',
                currency: 'USD',
                '20gp': '45',
                '40gp': '75',
                '40hc': '80',
                '40nor': '75',
                '45hc': '90',
                specialNote: '燃油价格调节费'
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
                feeName: '预约费',
                currency: 'USD',
                unit: '票',
                price: '35',
                specialNote: '送货预约手续费'
              },
              {
                key: 2,
                feeName: '等候费',
                currency: 'USD',
                unit: '小时',
                price: '45',
                specialNote: '超时等候费用'
              },
              {
                key: 3,
                feeName: '派送费',
                currency: 'USD',
                unit: '票',
                price: '50',
                specialNote: '派送服务费'
              },
              {
                key: 4,
                feeName: '保险费',
                currency: 'USD',
                unit: '票',
                price: '25',
                specialNote: '货物运输保险'
              },
              {
                key: 5,
                feeName: '进仓费',
                currency: 'USD',
                unit: '票',
                price: '40',
                specialNote: '仓库进仓费用'
              },
              {
                key: 6,
                feeName: '通知费',
                currency: 'USD',
                unit: '票',
                price: '15',
                specialNote: '到货通知费'
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

export default ViewOncarriageRate; 