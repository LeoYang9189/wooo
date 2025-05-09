import React, { useState, useEffect, useRef } from 'react';
import { Card, Typography, Grid, Button, Statistic, Tabs, Select, Space } from '@arco-design/web-react';
import {
  IconDashboard,
  IconStorage,
  IconTool,
  IconDesktop,
  IconBook,
  IconList,
  IconCalendar,
  IconNotification,
  IconRefresh
} from '@arco-design/web-react/icon';
import { Pie, Column } from '@ant-design/charts';
import { Loader } from '@googlemaps/js-api-loader';

// 声明全局 Google Maps 类型
declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: any) => any;
        Marker: new (options: any) => any;
        InfoWindow: new (options: any) => any;
        SymbolPath: {
          CIRCLE: any;
        };
        MapTypeId: {
          ROADMAP: string;
        };
      };
    };
  }
}

const { Title } = Typography;
const { Row, Col } = Grid;
const { TabPane } = Tabs;
const Option = Select.Option;

// 谷歌地图API密钥（注意：实际项目中应该从环境变量获取，避免硬编码）
const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY';

// 箱型分类数据
const containerTypeData = [
  { type: '20GP', value: 452, color: '#1890ff' },
  { type: '40GP', value: 368, color: '#52c41a' },
  { type: '40HC', value: 284, color: '#fa8c16' },
  { type: '20RF', value: 98, color: '#722ed1' },
  { type: '40RF', value: 54, color: '#eb2f96' },
];

// 港口分布数据
const portDistributionData = [
  { port: '上海港', count: 382, lat: 31.2304, lng: 121.4737 },
  { port: '宁波港', count: 278, lat: 29.8683, lng: 121.5440 },
  { port: '青岛港', count: 195, lat: 36.0671, lng: 120.3826 },
  { port: '深圳港', count: 245, lat: 22.5431, lng: 114.0579 },
  { port: '广州港', count: 156, lat: 23.1066, lng: 113.2487 },
];

// 堆场分布数据
const yardDistributionData = [
  { yard: 'A 堆场', location: '上海宝山区', count: 320, utilization: 78, lat: 31.4045, lng: 121.4837 },
  { yard: 'B 堆场', location: '上海浦东新区', count: 256, utilization: 65, lat: 31.2304, lng: 121.5440 },
  { yard: 'C 堆场', location: '上海嘉定区', count: 198, utilization: 92, lat: 31.3759, lng: 121.2642 },
  { yard: 'D 堆场', location: '上海青浦区', count: 175, utilization: 55, lat: 31.1497, lng: 121.1242 },
];

// 集装箱状态数据
const containerStatusData = [
  { month: '1月', 可用: 520, 占用: 230, 维修中: 40 },
  { month: '2月', 可用: 560, 占用: 250, 维修中: 35 },
  { month: '3月', 可用: 590, 占用: 260, 维修中: 42 },
  { month: '4月', 可用: 610, 占用: 245, 维修中: 38 },
  { month: '5月', 可用: 635, 占用: 270, 维修中: 45 },
  { month: '6月', 可用: 650, 占用: 285, 维修中: 52 },
];

const DashboardPage: React.FC = () => {
  const [mapReady, setMapReady] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [mapsError, setMapsError] = useState<string | null>(null);
  
  const portMapRef = useRef<HTMLDivElement>(null);
  const yardMapRef = useRef<HTMLDivElement>(null);
  
  // 箱型分类统计图配置
  const pieConfig = {
    data: containerTypeData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.5,
    label: {
      type: 'spider',
      content: '{name}: {percentage}',
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
      title: {
        style: { fontSize: '14px', lineHeight: '1.5', color: 'rgba(0,0,0,0.65)' },
        formatter: () => '总数量',
      },
      content: {
        style: { fontSize: '20px', lineHeight: '1.5', color: 'rgba(0,0,0,0.85)' },
        formatter: () => `${containerTypeData.reduce((prev, curr) => prev + curr.value, 0)}`,
      },
    },
  };

  // 集装箱状态趋势图数据转换
  const columnData = containerStatusData.map(item => [
    { month: item.month, status: '可用', value: item.可用 },
    { month: item.month, status: '占用', value: item.占用 },
    { month: item.month, status: '维修中', value: item.维修中 }
  ]).flat();

  // 集装箱状态趋势图配置
  const columnConfig = {
    data: columnData,
    xField: 'month',
    yField: 'value',
    seriesField: 'status',
    isStack: true,
    legend: { position: 'top-right' },
    columnStyle: { radius: [10, 10, 0, 0] },
  };

  // 初始化谷歌地图
  useEffect(() => {
    // 如果没有API密钥，则不加载谷歌地图
    if (GOOGLE_MAPS_API_KEY === 'YOUR_API_KEY') {
      setMapsError('请配置有效的谷歌地图API密钥');
      setMapReady(true);
      return;
    }

    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places', 'visualization']
    });

    loader.load()
      .then(() => {
        setGoogleLoaded(true);
        setMapReady(true);
      })
      .catch((err) => {
        console.error('Google Maps 加载错误:', err);
        setMapsError('Google Maps加载失败，请检查API密钥和网络连接');
        setMapReady(true);
      });
  }, []);

  // 初始化港口分布地图
  useEffect(() => {
    if (!googleLoaded || !portMapRef.current || mapsError) return;

    try {
      const map = new window.google.maps.Map(portMapRef.current, {
        center: { lat: 31.2304, lng: 121.4737 }, // 上海为中心
        zoom: 5,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
      });

      // 添加港口标记
      portDistributionData.forEach((port) => {
        // 计算标记大小（基于箱子数量）
        const maxCount = Math.max(...portDistributionData.map(p => p.count));
        const minSize = 25;
        const maxSize = 50;
        const size = minSize + (port.count / maxCount) * (maxSize - minSize);

        const marker = new window.google.maps.Marker({
          position: { lat: port.lat, lng: port.lng },
          map,
          title: port.port,
          label: {
            text: port.count.toString(),
            color: 'white',
            fontSize: '12px',
          },
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: '#1890ff',
            fillOpacity: 0.7,
            strokeWeight: 0,
            scale: size / 10,
          }
        });

        // 信息窗口
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              <h3 style="margin-top: 0;">${port.port}</h3>
              <p>集装箱数量: <b>${port.count}</b> 个</p>
              <p>占比: <b>${Math.round(port.count / portDistributionData.reduce((acc, curr) => acc + curr.count, 0) * 100)}%</b></p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    } catch (error) {
      console.error('初始化港口地图错误:', error);
      setMapsError('初始化地图失败');
    }
  }, [googleLoaded, mapsError]);

  // 初始化堆场分布地图
  useEffect(() => {
    if (!googleLoaded || !yardMapRef.current || mapsError || activeTab !== '2') return;

    try {
      const map = new window.google.maps.Map(yardMapRef.current, {
        center: { lat: 31.2304, lng: 121.4737 }, // 上海为中心
        zoom: 10,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
      });

      // 添加堆场标记
      yardDistributionData.forEach((yard) => {
        // 颜色基于利用率
        let color = '#52c41a'; // 默认绿色
        if (yard.utilization > 85) {
          color = '#fa8c16'; // 橙色表示接近满载
        } else if (yard.utilization > 95) {
          color = '#f5222d'; // 红色表示几乎满载
        }

        const marker = new window.google.maps.Marker({
          position: { lat: yard.lat, lng: yard.lng },
          map,
          title: yard.yard,
          label: {
            text: yard.yard.charAt(0), // A, B, C, D
            color: 'white',
            fontSize: '14px',
          },
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: color,
            fillOpacity: 0.7,
            strokeWeight: 0,
            scale: 5,
          }
        });

        // 信息窗口
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              <h3 style="margin-top: 0;">${yard.yard}</h3>
              <p>位置: <b>${yard.location}</b></p>
              <p>集装箱数量: <b>${yard.count}</b> 个</p>
              <p>容量使用率: <b>${yard.utilization}%</b></p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    } catch (error) {
      console.error('初始化堆场地图错误:', error);
      setMapsError('初始化地图失败');
    }
  }, [googleLoaded, mapsError, activeTab]);

  return (
    <>
      {/* 统计卡片区域 */}
      <Card className="mb-4">
        <div className="mb-4 flex justify-between items-center">
          <Title heading={5}>数据统计</Title>
          <Space>
            <Select defaultValue="2023" style={{ width: 100 }}>
              <Option value="2022">2022年</Option>
              <Option value="2023">2023年</Option>
              <Option value="2024">2024年</Option>
            </Select>
            <Button type="text" icon={<IconRefresh />}>刷新</Button>
          </Space>
        </div>
        <Row gutter={16}>
          <Col span={6}>
            <Card className="dashboard-card h-full bg-blue-50 border border-blue-100">
              <Statistic
                title="在库集装箱"
                value={1256}
                groupSeparator
                suffix="个"
                prefix={<IconStorage className="text-blue-600 mr-2" />}
                styleValue={{ color: '#1890ff', fontSize: '24px', fontWeight: 'bold' }}
              />
              <div className="text-xs text-gray-500 mt-2">较上周增加35个</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="dashboard-card h-full bg-green-50 border border-green-100">
              <Statistic
                title="可用箱数"
                value={875}
                groupSeparator
                suffix="个"
                prefix={<IconDashboard className="text-green-600 mr-2" />}
                styleValue={{ color: '#52c41a', fontSize: '24px', fontWeight: 'bold' }}
              />
              <div className="text-xs text-gray-500 mt-2">占比 70.2%</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="dashboard-card h-full bg-orange-50 border border-orange-100">
              <Statistic
                title="在途箱数"
                value={328}
                groupSeparator
                suffix="个"
                prefix={<IconDesktop className="text-orange-600 mr-2" />}
                styleValue={{ color: '#fa8c16', fontSize: '24px', fontWeight: 'bold' }}
              />
              <div className="text-xs text-gray-500 mt-2">较上周减少12个</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="dashboard-card h-full bg-red-50 border border-red-100">
              <Statistic
                title="待维修箱数"
                value={52}
                groupSeparator
                suffix="个"
                prefix={<IconTool className="text-red-600 mr-2" />}
                styleValue={{ color: '#f5222d', fontSize: '24px', fontWeight: 'bold' }}
              />
              <div className="text-xs text-gray-500 mt-2">较上周增加8个</div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 图表区域 */}
      <Row gutter={16} className="mb-4">
        <Col span={12}>
          <Card title="集装箱箱型分布" className="h-full">
            <div style={{ height: 320 }}>
              <Pie {...pieConfig} />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="集装箱状态趋势" className="h-full">
            <div style={{ height: 320 }}>
              <Column {...columnConfig} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* 地图分布 */}
      <Card title="集装箱地理分布" className="mb-4">
        <Tabs activeTab={activeTab} onChange={setActiveTab}>
          <TabPane key="1" title="港口分布">
            <div style={{ height: 400 }}>
              {mapReady ? (
                mapsError ? (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-center text-red-500 mb-4">
                      <IconDesktop className="text-3xl mb-2" />
                      <p>{mapsError}</p>
                      <p className="text-xs mt-2">当前使用模拟数据显示</p>
                    </div>
                    <div className="relative">
                      {/* 备用地图图片 */}
                      <div className="w-full h-64 bg-blue-50 border border-blue-100 rounded-lg overflow-hidden mb-4">
                        <div style={{
                          backgroundImage: 'url(https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*uRO-ToprEL4AAAAAAAAAAAAAARQnAQ)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          width: '100%',
                          height: '100%',
                          position: 'relative'
                        }}>
                          {/* 模拟港口标记点 */}
                          {portDistributionData.map((port, index) => (
                            <div 
                              key={index}
                              className="absolute w-6 h-6 rounded-full flex items-center justify-center text-white text-xs transform -translate-x-1/2 -translate-y-1/2 shadow-md"
                              style={{
                                backgroundColor: '#1890ff',
                                left: `${(port.lng - 105) * 5}%`,
                                top: `${70 - (port.lat - 18) * 3}%`,
                                boxShadow: '0 0 0 4px rgba(24, 144, 255, 0.2)',
                                cursor: 'pointer'
                              }}
                              title={`${port.port}: ${port.count}个`}
                            >
                              {index + 1}
                            </div>
                          ))}
                          <div className="absolute bottom-2 right-2 bg-white p-2 rounded-md shadow-sm text-xs">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                              <span>港口集装箱分布</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full">
                    <div ref={portMapRef} style={{ height: '100%', width: '100%', borderRadius: '8px' }}></div>
                  </div>
                )
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">地图加载中...</p>
                </div>
              )}
              <div className="mt-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left">序号</th>
                      <th className="p-2 text-left">港口</th>
                      <th className="p-2 text-left">数量</th>
                      <th className="p-2 text-left">占比</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portDistributionData.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{item.port}</td>
                        <td className="p-2">{item.count} 个</td>
                        <td className="p-2">
                          {Math.round(item.count / portDistributionData.reduce((acc, curr) => acc + curr.count, 0) * 100)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>
          <TabPane key="2" title="堆场分布">
            <div style={{ height: 400 }}>
              {mapReady ? (
                mapsError ? (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-center text-red-500 mb-4">
                      <IconDesktop className="text-3xl mb-2" />
                      <p>{mapsError}</p>
                      <p className="text-xs mt-2">当前使用模拟数据显示</p>
                    </div>
                    <div className="w-full h-64 bg-green-50 border border-green-100 rounded-lg overflow-hidden mb-4">
                      <div style={{
                        backgroundImage: 'url(https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*BHcCQ6LmXZwAAAAAAAAAAAAAARQnAQ)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%',
                        position: 'relative'
                      }}>
                        {/* 模拟堆场标记点 */}
                        <div className="absolute w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 shadow-md" style={{boxShadow: '0 0 0 4px rgba(56, 158, 13, 0.2)'}}>A</div>
                        <div className="absolute w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md" style={{boxShadow: '0 0 0 4px rgba(56, 158, 13, 0.2)'}}>B</div>
                        <div className="absolute w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 shadow-md" style={{boxShadow: '0 0 0 4px rgba(56, 158, 13, 0.2)'}}>C</div>
                        <div className="absolute w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 shadow-md" style={{boxShadow: '0 0 0 4px rgba(56, 158, 13, 0.2)'}}>D</div>
                        <div className="absolute bottom-2 right-2 bg-white p-2 rounded-md shadow-sm text-xs">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                            <span>堆场位置分布</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full">
                    <div ref={yardMapRef} style={{ height: '100%', width: '100%', borderRadius: '8px' }}></div>
                  </div>
                )
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">地图加载中...</p>
                </div>
              )}
              <div className="mt-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left">堆场</th>
                      <th className="p-2 text-left">位置</th>
                      <th className="p-2 text-left">数量</th>
                      <th className="p-2 text-left">利用率</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yardDistributionData.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{item.yard}</td>
                        <td className="p-2">{item.location}</td>
                        <td className="p-2">{item.count} 个</td>
                        <td className="p-2">{item.utilization}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Card>

      {/* 预警区域 */}
      <Card className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <Title heading={5}>系统预警</Title>
          <Button type="text" icon={<IconNotification />}>查看全部</Button>
        </div>
        <Row gutter={16}>
          <Col span={8}>
            <Card className="dashboard-card border border-orange-100">
              <div className="flex items-center text-orange-500 mb-2">
                <IconTool className="mr-2" />
                <span className="font-medium">维修提醒</span>
              </div>
              <div className="text-gray-700">有 8 个集装箱需要进行常规维护</div>
              <div className="text-xs text-gray-500 mt-2">截止日期：2023-06-15</div>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="dashboard-card border border-blue-100">
              <div className="flex items-center text-blue-500 mb-2">
                <IconCalendar className="mr-2" />
                <span className="font-medium">租期提醒</span>
              </div>
              <div className="text-gray-700">有 12 个集装箱租期即将到期</div>
              <div className="text-xs text-gray-500 mt-2">最近到期日：2023-06-10</div>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="dashboard-card border border-red-100">
              <div className="flex items-center text-red-500 mb-2">
                <IconNotification className="mr-2" />
                <span className="font-medium">库存预警</span>
              </div>
              <div className="text-gray-700">20GP型集装箱库存不足</div>
              <div className="text-xs text-gray-500 mt-2">当前库存：25个，低于警戒值</div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 快速入口区域 */}
      <Card>
        <div className="mb-4">
          <Title heading={5}>快速入口</Title>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button type="outline" size="large" className="h-24 flex flex-col items-center justify-center">
            <IconList className="text-xl mb-2 text-blue-500" />
            <span>库存查询</span>
          </Button>
          <Button type="outline" size="large" className="h-24 flex flex-col items-center justify-center">
            <IconStorage className="text-xl mb-2 text-green-500" />
            <span>箱子维护</span>
          </Button>
          <Button type="outline" size="large" className="h-24 flex flex-col items-center justify-center">
            <IconTool className="text-xl mb-2 text-orange-500" />
            <span>费用管理</span>
          </Button>
          <Button type="outline" size="large" className="h-24 flex flex-col items-center justify-center">
            <IconBook className="text-xl mb-2 text-purple-500" />
            <span>生成报表</span>
          </Button>
        </div>
      </Card>
    </>
  );
};

export default DashboardPage; 