import React, { useState, useEffect } from 'react';
import { IconArrowUp, IconArrowDown } from '@arco-design/web-react/icon';
import LeafletMap from './LeafletMap';
import './ControlTowerPanelStyles.css';
import * as echarts from 'echarts';

// 注册世界地图
import 'echarts-countries-js/echarts-countries-js/world';

const ControlTowerPanel: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mapRegistered, setMapRegistered] = useState(false);
  const [realtimeOrders, setRealtimeOrders] = useState<Array<{id: string, source: string, time: string}>>([]);
  const [realtimeTasks, setRealtimeTasks] = useState<Array<{id: string, task: string, time: string}>>([]);
  
  // 运价指数数据状态
  const [freightIndices, setFreightIndices] = useState([
    { code: 'FBX01', name: '上海→洛杉矶', value: 2230.75, change: -5.32, changePercent: -0.24 },
    { code: 'FBX02', name: '宁波→鹿特丹', value: 2767, change: -21.3, changePercent: -0.77 },
    { code: 'FBX03', name: '青岛→汉堡', value: 1417.75, change: -33.03, changePercent: -2.33 },
    { code: 'FBX04', name: '天津→纽约', value: 3978.75, change: -305.44, changePercent: -7.68 },
    { code: 'FBX05', name: '厦门→费利克斯托', value: 3543.25, change: -63.09, changePercent: -1.78 },
    { code: 'FBX06', name: '深圳→鹿特丹', value: 2360.75, change: -218.72, changePercent: -8.42 },
    { code: 'FBX07', name: '广州→汉堡', value: 3301.5, change: -180.28, changePercent: -5.18 },
    { code: 'FBX08', name: '大连→安特卫普', value: 3253.25, change: 97.60, changePercent: 3.09 },
    { code: 'FBX09', name: '连云港→费利克斯托', value: 3576.5, change: -111.25, changePercent: -3.01 },
    { code: 'FBX10', name: '烟台→勒阿弗尔', value: 3346.75, change: 195.36, changePercent: 6.19 },
    { code: 'FBX11', name: '宁波→洛杉矶', value: 2360.75, change: -8.42, changePercent: -0.42 },
    { code: 'FBX12', name: '上海→汉堡', value: 3301.5, change: -5.18, changePercent: -5.18 },
    { code: 'FBX13', name: '深圳→纽约', value: 3253.25, change: 3, changePercent: 3 },
    { code: 'FBX14', name: '青岛→鹿特丹', value: 3576.5, change: -3.01, changePercent: -3.01 },
    { code: 'FBX21', name: '天津→长滩', value: 3346.75, change: 6.19, changePercent: 6.19 }
  ]);

  // 运价指数数据更新
  useEffect(() => {
    const updateFreightIndices = () => {
      setFreightIndices(prev => prev.map(item => {
        // 随机变化 -5% 到 +5%
        const changePercent = (Math.random() - 0.5) * 10;
        const change = item.value * (changePercent / 100);
        const newValue = Math.max(1000, item.value + change);
        
        return {
          ...item,
          value: Math.round(newValue * 100) / 100,
          change: Math.round(change * 100) / 100,
          changePercent: Math.round(changePercent * 100) / 100
        };
      }));
    };

    // 每30秒更新一次运价指数
    const interval = setInterval(updateFreightIndices, 3000);
    return () => clearInterval(interval);
  }, []);

  // 注册世界地图数据
  useEffect(() => {
    const registerWorldMap = async () => {
      try {
        // 使用CDN加载世界地图GeoJSON数据
        await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
        
        // Map registration completed
      } catch (error) {
        console.error('Failed to load world map:', error);
        // 如果加载失败，使用备用方案
      }
    };

    registerWorldMap();
  }, []);

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 实时订单生成
  useEffect(() => {
    const sources = ['创建询价', 'API同步', '创建订舱', 'AI识别'];
    
    const generateOrder = () => {
      const orderNumber = `WO${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`;
      const source = sources[Math.floor(Math.random() * sources.length)];
      const time = new Date().toLocaleTimeString('zh-CN');
      
      setRealtimeOrders(prev => {
        const newOrders = [{
          id: orderNumber,
          source: source,
          time: time
        }, ...prev];
        // 保持最多15条记录
        return newOrders.slice(0, 15);
      });
    };

    // 初始生成几条订单
    for (let i = 0; i < 3; i++) {
      setTimeout(() => generateOrder(), i * 500);
    }

    // 每4-7秒随机生成一条新订单
    const interval = setInterval(() => {
      generateOrder();
    }, Math.random() * 3000 + 4000);

    return () => clearInterval(interval);
  }, []);

  // 实时任务生成
  useEffect(() => {
    const tasks = ['待报价', '待确认提单', '待确认账单', '待提交VGM'];
    
    const generateTask = () => {
      const orderNumber = `WO${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`;
      const task = tasks[Math.floor(Math.random() * tasks.length)];
      const time = new Date().toLocaleTimeString('zh-CN');
      
      setRealtimeTasks(prev => {
        const newTasks = [{
          id: orderNumber,
          task: task,
          time: time
        }, ...prev];
        // 保持最多15条记录
        return newTasks.slice(0, 15);
      });
    };

    // 初始生成几条任务
    for (let i = 0; i < 3; i++) {
      setTimeout(() => generateTask(), i * 800);
    }

    // 每5-9秒随机生成一条新任务
    const interval = setInterval(() => {
      generateTask();
    }, Math.random() * 4000 + 5000);

    return () => clearInterval(interval);
  }, []);

  // 通关异常订单直方图初始化
  useEffect(() => {
    const chartElement = document.getElementById('customs-anomaly-bar-chart');
    if (!chartElement) return;

    const chart = echarts.init(chartElement);
    
    // 生成初始数据
    const ports = ['上海港', '宁波舟山港', '深圳港', '青岛港', '广州港', '天津港', '厦门港', '大连港'];
    let anomalyData = ports.map(() => Math.floor(Math.random() * 30) + 5);

    const option = {
      backgroundColor: 'transparent',
      title: {
        show: false
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 20, 40, 0.9)',
        borderColor: '#ff6b6b',
        borderWidth: 1,
        textStyle: {
          color: '#ffffff'
        },
        formatter: (params: any) => {
          const dataArray = Array.isArray(params) ? params : [params];
          const data = dataArray[0] as { name: string; value: number };
          return `${data.name}<br/>异常订单: ${data.value} 单`;
        }
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ports,
        axisLine: {
          lineStyle: {
            color: '#ff6b6b'
          }
        },
        axisLabel: {
          color: '#99ccff',
          fontSize: 12,
          rotate: 30
        },
        axisTick: {
          alignWithLabel: true,
          lineStyle: {
            color: '#ff6b6b'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: '异常订单数',
        nameTextStyle: {
          color: '#ff6b6b',
          fontSize: 14
        },
        axisLine: {
          lineStyle: {
            color: '#ff6b6b'
          }
        },
        axisLabel: {
          color: '#99ccff',
          fontSize: 12
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 107, 107, 0.2)',
            type: 'dashed'
          }
        }
      },
      series: [{
        type: 'bar',
        data: anomalyData,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#ff6b6b' },
            { offset: 1, color: '#ff9999' }
          ]),
          borderRadius: [4, 4, 0, 0],
          shadowColor: 'rgba(255, 107, 107, 0.5)',
          shadowBlur: 10,
          shadowOffsetY: 3
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#ff5555' },
              { offset: 1, color: '#ff8888' }
            ])
          }
        },
        animationDelay: (idx: number) => idx * 100,
        animationEasing: 'elasticOut'
      }]
    };

    chart.setOption(option);

    // 定时更新数据
    const updateInterval = setInterval(() => {
      anomalyData = anomalyData.map(() => Math.floor(Math.random() * 30) + 5);
      chart.setOption({
        series: [{
          data: anomalyData
        }]
      });
    }, 10000); // 每10秒更新一次

    // 响应式处理
    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(updateInterval);
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []);

  // 询价成交趋势折线图初始化
  useEffect(() => {
    const chartElement = document.getElementById('inquiry-deal-line-chart');
    if (!chartElement) return;

    const chart = echarts.init(chartElement);
    
    // 生成过去30天的数据
    const generateDateRange = (days: number) => {
      const dates: string[] = [];
      const inquiryData: number[] = [];
      const dealData: number[] = [];
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }));
        
        const inquiry = Math.floor(Math.random() * 100) + 50;
        const deal = Math.floor(inquiry * (0.3 + Math.random() * 0.4));
        
        inquiryData.push(inquiry);
        dealData.push(deal);
      }
      
      return { dates, inquiryData, dealData };
    };

    const { dates, inquiryData, dealData } = generateDateRange(30);

    const option = {
      backgroundColor: 'transparent',
      title: {
        show: false
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 20, 40, 0.9)',
        borderColor: '#00f7ff',
        borderWidth: 1,
        textStyle: {
          color: '#ffffff'
        },
        axisPointer: {
          type: 'cross',
          lineStyle: {
            color: '#00f7ff',
            width: 1,
            type: 'dashed'
          }
        }
      },
      legend: {
        data: ['询价数量', '成交数量'],
        textStyle: {
          color: '#99ccff'
        },
        top: 'top',
        right: '10%'
      },
      grid: {
        left: '8%',
        right: '8%',
        bottom: '15%',
        top: '20%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: {
          lineStyle: {
            color: '#00f7ff'
          }
        },
        axisLabel: {
          color: '#99ccff',
          fontSize: 12,
          rotate: 45
        },
        axisTick: {
          alignWithLabel: true,
          lineStyle: {
            color: '#00f7ff'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: '数量',
        nameTextStyle: {
          color: '#00f7ff',
          fontSize: 14
        },
        axisLine: {
          lineStyle: {
            color: '#00f7ff'
          }
        },
        axisLabel: {
          color: '#99ccff',
          fontSize: 12
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(0, 247, 255, 0.2)',
            type: 'dashed'
          }
        }
      },
      series: [
        {
          name: '询价数量',
          type: 'line',
          data: inquiryData,
          lineStyle: {
            color: '#00f7ff',
            width: 3,
            shadowColor: 'rgba(0, 247, 255, 0.5)',
            shadowBlur: 10
          },
          itemStyle: {
            color: '#00f7ff',
            borderColor: '#ffffff',
            borderWidth: 2
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 247, 255, 0.3)' },
              { offset: 1, color: 'rgba(0, 247, 255, 0.05)' }
            ])
          },
          smooth: true,
          symbol: 'circle',
          symbolSize: 6
        },
        {
          name: '成交数量',
          type: 'line',
          data: dealData,
          lineStyle: {
            color: '#00ff88',
            width: 3,
            shadowColor: 'rgba(0, 255, 136, 0.5)',
            shadowBlur: 10
          },
          itemStyle: {
            color: '#00ff88',
            borderColor: '#ffffff',
            borderWidth: 2
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 255, 136, 0.3)' },
              { offset: 1, color: 'rgba(0, 255, 136, 0.05)' }
            ])
          },
          smooth: true,
          symbol: 'circle',
          symbolSize: 6
        }
      ]
    };

    chart.setOption(option);

    // 定时更新数据
    const updateInterval = setInterval(() => {
      // 移除第一个数据点，添加新的数据点
      dates.shift();
      inquiryData.shift();
      dealData.shift();
      
      const today = new Date();
      dates.push(today.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }));
      
      const newInquiry = Math.floor(Math.random() * 100) + 50;
      const newDeal = Math.floor(newInquiry * (0.3 + Math.random() * 0.4));
      
      inquiryData.push(newInquiry);
      dealData.push(newDeal);
      
      chart.setOption({
        xAxis: { data: dates },
        series: [
          { data: inquiryData },
          { data: dealData }
        ]
      });
    }, 15000); // 每15秒更新一次

    // 响应式处理
    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(updateInterval);
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []);

  // 热门询价排行榜初始化
  useEffect(() => {
    const contentElement = document.getElementById('hot-inquiry-ranking-content');
    if (contentElement) {
      
      // 热门航线数据
      const hotRoutes = [
        { route: 'Shanghai → Los Angeles', count: Math.floor(Math.random() * 200) + 300, rank: 1 },
        { route: 'Qingdao → Rotterdam', count: Math.floor(Math.random() * 180) + 250, rank: 2 },
        { route: 'Shenzhen → Hamburg', count: Math.floor(Math.random() * 160) + 220, rank: 3 },
        { route: 'Ningbo → Long Beach', count: Math.floor(Math.random() * 150) + 200, rank: 4 },
        { route: 'Tianjin → Dubai', count: Math.floor(Math.random() * 140) + 180, rank: 5 },
        { route: 'Xiamen → Singapore', count: Math.floor(Math.random() * 130) + 160, rank: 6 },
        { route: 'Dalian → Antwerp', count: Math.floor(Math.random() * 120) + 140, rank: 7 },
        { route: 'Guangzhou → New York', count: Math.floor(Math.random() * 110) + 120, rank: 8 },
        { route: 'Yantai → Felixstowe', count: Math.floor(Math.random() * 100) + 100, rank: 9 },
        { route: 'Lianyungang → Le Havre', count: Math.floor(Math.random() * 90) + 80, rank: 10 }
      ];

      const renderRanking = () => {
        // 重新排序（基于count降序）
        const sortedRoutes = [...hotRoutes].sort((a, b) => b.count - a.count);
        
        const rankingHTML = sortedRoutes.map((item, index) => {
          const rank = index + 1;
          const rankClass = rank <= 3 ? `top-${rank}` : 'normal';
          const trendClass = Math.random() > 0.5 ? 'up' : 'down';
          const trendIcon = trendClass === 'up' ? '↗' : '↘';
          
          return `
            <div class="ranking-item ${rankClass}" style="animation-delay: ${index * 0.1}s;">
              <div class="rank-number">
                <span class="rank">${rank}</span>
                ${rank <= 3 ? '<span class="crown">👑</span>' : ''}
              </div>
              <div class="route-info">
                <div class="route-name">${item.route}</div>
                <div class="route-meta">
                  <span class="inquiry-count">${item.count} 次询价</span>
                  <span class="trend ${trendClass}">${trendIcon} ${Math.floor(Math.random() * 20) + 5}%</span>
                </div>
              </div>
              <div class="ranking-bar">
                <div class="bar-fill ${rankClass}" style="width: ${(item.count / sortedRoutes[0].count) * 100}%"></div>
              </div>
            </div>
          `;
        }).join('');
        
        contentElement.innerHTML = rankingHTML;
      };

      // 初始渲染
      renderRanking();

      // 定时更新数据
      const updateInterval = setInterval(() => {
        // 随机更新部分航线的询价次数
        hotRoutes.forEach(route => {
          const change = Math.floor(Math.random() * 20) - 10; // -10 到 +10 的变化
          route.count = Math.max(50, route.count + change); // 确保最小值为50
        });
        
        renderRanking();
      }, 20000); // 每20秒更新一次

      return () => {
        clearInterval(updateInterval);
      };
    }
  }, []);

  // 销售报价时效排行榜初始化
  useEffect(() => {
    const contentElement = document.getElementById('sales-quote-efficiency-content');
    if (contentElement) {
      
      // 销售员报价时效数据
      const salesQuoteData = [
        { name: '张明', avgTime: '0.8h', efficiency: 95, orders: 142, rank: 1 },
        { name: '李思雨', avgTime: '1.2h', efficiency: 89, orders: 128, rank: 2 },
        { name: '王建华', avgTime: '1.5h', efficiency: 84, orders: 115, rank: 3 },
        { name: '陈晓东', avgTime: '1.8h', efficiency: 78, orders: 98, rank: 4 },
        { name: '赵美玲', avgTime: '2.1h', efficiency: 72, orders: 87, rank: 5 },
        { name: '刘志强', avgTime: '2.4h', efficiency: 68, orders: 76, rank: 6 },
        { name: '周雪婷', avgTime: '2.7h', efficiency: 63, orders: 69, rank: 7 },
        { name: '孙浩然', avgTime: '3.1h', efficiency: 58, orders: 58, rank: 8 },
        { name: '吴佳琪', avgTime: '3.5h', efficiency: 52, orders: 45, rank: 9 },
        { name: '胡锦涛', avgTime: '4.2h', efficiency: 46, orders: 38, rank: 10 }
      ];

      const renderSalesQuoteRanking = () => {
        // 按效率重新排序
        const sortedData = [...salesQuoteData].sort((a, b) => b.efficiency - a.efficiency);
        
        const rankingHTML = sortedData.map((item, index) => {
          const rank = index + 1;
          const rankClass = rank <= 3 ? `top-${rank}` : 'normal';
          const trendClass = Math.random() > 0.5 ? 'up' : 'down';
          const trendIcon = trendClass === 'up' ? '↗' : '↘';
          
          return `
            <div class="ranking-item ${rankClass}" style="animation-delay: ${index * 0.1}s;">
              <div class="rank-number">
                <span class="rank">${rank}</span>
                ${rank <= 3 ? '<span class="crown">🏆</span>' : ''}
              </div>
              <div class="route-info">
                <div class="route-name">${item.name}</div>
                <div class="route-meta">
                  <span class="inquiry-count">平均 ${item.avgTime}</span>
                  <span class="trend ${trendClass}">${trendIcon} ${item.efficiency}%</span>
                </div>
              </div>
              <div class="ranking-bar">
                <div class="bar-fill ${rankClass}" style="width: ${item.efficiency}%"></div>
              </div>
            </div>
          `;
        }).join('');
        
        contentElement.innerHTML = rankingHTML;
      };

      // 初始渲染
      renderSalesQuoteRanking();

      // 定时更新数据
      const updateInterval = setInterval(() => {
        // 随机更新销售员数据
        salesQuoteData.forEach(sales => {
          const efficiencyChange = Math.floor(Math.random() * 10) - 5; // -5 到 +5 的变化
          sales.efficiency = Math.max(30, Math.min(100, sales.efficiency + efficiencyChange)); // 30-100范围
          const avgTimeChange = (Math.random() - 0.5) * 0.5; // -0.25h 到 +0.25h 的变化
          const currentTime = parseFloat(sales.avgTime.replace('h', ''));
          const newTime = Math.max(0.5, currentTime + avgTimeChange);
          sales.avgTime = `${newTime.toFixed(1)}h`;
        });
        
        renderSalesQuoteRanking();
      }, 25000); // 每25秒更新一次

      return () => {
        clearInterval(updateInterval);
      };
    }
  }, []);

  // 成交订单量客户排行榜初始化
  useEffect(() => {
    const contentElement = document.getElementById('customer-orders-ranking-content');
    if (contentElement) {
      
      // 客户成交订单数据
      const customerOrdersData = [
        { company: '华为技术有限公司', orders: 2847, revenue: '¥1.24亿', growth: 15.6, rank: 1 },
        { company: '阿里巴巴集团', orders: 2156, revenue: '¥9680万', growth: 12.3, rank: 2 },
        { company: '腾讯科技', orders: 1893, revenue: '¥8520万', growth: 8.9, rank: 3 },
        { company: '比亚迪股份', orders: 1647, revenue: '¥7410万', growth: 22.1, rank: 4 },
        { company: '海康威视', orders: 1425, revenue: '¥6380万', growth: -3.2, rank: 5 },
        { company: '小米集团', orders: 1238, revenue: '¥5560万', growth: 18.7, rank: 6 },
        { company: '京东集团', orders: 1089, revenue: '¥4890万', growth: 5.4, rank: 7 },
        { company: '宁德时代', orders: 947, revenue: '¥4250万', growth: 28.9, rank: 8 },
        { company: '美的集团', orders: 856, revenue: '¥3840万', growth: 7.2, rank: 9 },
        { company: '格力电器', orders: 723, revenue: '¥3250万', growth: -1.8, rank: 10 }
      ];

      const renderCustomerOrdersRanking = () => {
        // 按订单量重新排序
        const sortedData = [...customerOrdersData].sort((a, b) => b.orders - a.orders);
        
        const rankingHTML = sortedData.map((item, index) => {
          const rank = index + 1;
          const rankClass = rank <= 3 ? `top-${rank}` : 'normal';
          const trendClass = item.growth >= 0 ? 'up' : 'down';
          const trendIcon = trendClass === 'up' ? '↗' : '↘';
          
          return `
            <div class="ranking-item ${rankClass}" style="animation-delay: ${index * 0.1}s;">
              <div class="rank-number">
                <span class="rank">${rank}</span>
                ${rank <= 3 ? '<span class="crown">💎</span>' : ''}
              </div>
              <div class="route-info">
                <div class="route-name">${item.company}</div>
                <div class="route-meta">
                  <span class="inquiry-count">${item.orders} 订单</span>
                  <span class="trend ${trendClass}">${trendIcon} ${Math.abs(item.growth)}%</span>
                </div>
              </div>
              <div class="ranking-bar">
                <div class="bar-fill ${rankClass}" style="width: ${(item.orders / sortedData[0].orders) * 100}%"></div>
              </div>
            </div>
          `;
        }).join('');
        
        contentElement.innerHTML = rankingHTML;
      };

      // 初始渲染
      renderCustomerOrdersRanking();

      // 定时更新数据
      const updateInterval = setInterval(() => {
        // 随机更新客户订单数据
        customerOrdersData.forEach(customer => {
          const orderChange = Math.floor(Math.random() * 40) - 20; // -20 到 +20 的变化
          customer.orders = Math.max(500, customer.orders + orderChange); // 确保最小值为500
          const growthChange = (Math.random() - 0.5) * 10; // -5% 到 +5% 的变化
          customer.growth = Math.round((customer.growth + growthChange) * 10) / 10;
        });
        
        renderCustomerOrdersRanking();
      }, 30000); // 每30秒更新一次

      return () => {
        clearInterval(updateInterval);
      };
    }
  }, []);

  // 数据总览配置
  const overviewData = [
    { title: '总订单数', value: 4823, change: 156, trend: 'up', unit: '单' },
    { title: '在途订单', value: 1247, change: 23, trend: 'up', unit: '单' },
    { title: '待处理任务', value: 89, change: -12, trend: 'down', unit: '个' },
    { title: '逾期任务', value: 15, change: -8, trend: 'down', unit: '个' },
    { title: '异常预警订单', value: 6, change: 2, trend: 'up', unit: '单' },
  ];

  return (
    <div className="control-tower-panel">
      {/* 运价指数滚动条 */}
      <div className="freight-ticker">
        <div className="ticker-content">
          {[...freightIndices, ...freightIndices].map((item, index) => (
            <div key={`${item.code}-${index}`} className="ticker-item">
              <span className="ticker-code">{item.code}</span>
              <span className="ticker-name">{item.name}</span>
              <span className="ticker-value">${item.value}</span>
              <span className={`ticker-change ${item.changePercent >= 0 ? 'up' : 'down'}`}>
                {item.changePercent >= 0 ? '↗' : '↘'} {Math.abs(item.changePercent)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 顶部标题栏 */}
      <div className="panel-header">
        <div className="header-left">
          <div className="panel-title">
            <span className="title-icon">◆</span>
            <span>Wo AI 控制塔面板</span>
          </div>
        </div>
        <div className="header-center">
          <div className="current-time">
            {currentTime.toLocaleString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
        </div>
        <div className="header-right">
          <div className="system-status">
            <span className="status-indicator online"></span>
            订单流转正常
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="panel-content">
        {/* 顶部数据概览 */}
        <div className="overview-section">
          {overviewData.map((item, index) => (
            <div key={index} className="overview-card">
              <div className="card-header">
                <span className="card-title">{item.title}</span>
                <div className={`trend-indicator ${item.trend}`}>
                  {item.trend === 'up' ? <IconArrowUp /> : <IconArrowDown />}
                  {Math.abs(item.change)}
                </div>
              </div>
              <div className="card-value">
                <span className="value">{item.value.toLocaleString()}</span>
                <span className="unit">{item.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 图表区域 */}
        <div className="charts-section">
          {/* 三列布局：实时订单列表 + 全球订单流向图 + 实时任务列表 */}
          <div className="charts-row three-column">
            {/* 左侧实时订单列表 */}
            <div className="chart-card realtime-orders">
              <div className="chart-title">
                <span className="title-icon">◆</span>
                实时订单
              </div>
              <div className="orders-list">
                {realtimeOrders.map((order, index) => (
                  <div key={order.id} className={`order-item ${index === 0 ? 'new-order' : ''}`}>
                    <div className="order-header">
                      <span className="order-number">{order.id}</span>
                      <span className="order-time">{order.time}</span>
                    </div>
                    <div className="order-source">
                      <span className={`source-tag source-${order.source}`}>{order.source}</span>
                    </div>
                  </div>
                ))}
                {realtimeOrders.length === 0 && (
                  <div className="no-orders">暂无实时订单</div>
                )}
              </div>
            </div>
            
            {/* 中间全球订单流向图 */}
            <div className="chart-card map-container">
              <LeafletMap height="600px" />
            </div>

            {/* 右侧实时任务列表 */}
            <div className="chart-card realtime-tasks">
              <div className="chart-title">
                <span className="title-icon">◆</span>
                实时任务
              </div>
              <div className="tasks-list">
                {realtimeTasks.map((task, index) => (
                  <div key={`${task.id}-${task.time}`} className={`task-item ${index === 0 ? 'new-task' : ''}`}>
                    <div className="task-header">
                      <span className="task-order-number">{task.id}</span>
                      <span className="task-time">{task.time}</span>
                    </div>
                    <div className="task-content">
                      <span className={`task-tag task-${task.task}`}>{task.task}</span>
                    </div>
                  </div>
                ))}
                {realtimeTasks.length === 0 && (
                  <div className="no-tasks">暂无实时任务</div>
                )}
              </div>
            </div>
          </div>

          {/* 通关异常订单直方图 */}
          <div className="charts-row two-column">
            <div className="chart-card customs-anomaly-chart">
              <div className="chart-title">
                <span className="title-icon">◆</span>
                通关异常订单统计
              </div>
              <div id="customs-anomaly-bar-chart" style={{ width: '100%', height: '300px' }}></div>
            </div>

            {/* 询价成交趋势折线图 */}
            <div className="chart-card inquiry-deal-chart">
              <div className="chart-title">
                <span className="title-icon">◆</span>
                询价成交趋势
              </div>
              <div id="inquiry-deal-line-chart" style={{ width: '100%', height: '300px' }}></div>
            </div>
          </div>

          {/* 三个排行榜并排布局 */}
          <div className="charts-row three-column">
            {/* 热门询价排行榜 */}
            <div className="chart-card hot-inquiry-ranking">
              <div className="chart-title">
                <span className="title-icon">◆</span>
                热门询价排行榜 TOP10
              </div>
              <div className="ranking-list">
                {/* 排行榜内容将通过useEffect动态生成 */}
                <div id="hot-inquiry-ranking-content" className="ranking-content">
                  {/* 动态内容 */}
                </div>
              </div>
            </div>

            {/* 销售报价时效排行榜 */}
            <div className="chart-card sales-quote-efficiency-ranking">
              <div className="chart-title">
                <span className="title-icon">◆</span>
                销售报价时效排行榜 TOP10
              </div>
              <div className="ranking-list">
                <div id="sales-quote-efficiency-content" className="ranking-content">
                  {/* 动态内容 */}
                </div>
              </div>
            </div>

            {/* 成交订单量客户排行榜 */}
            <div className="chart-card customer-orders-ranking">
              <div className="chart-title">
                <span className="title-icon">◆</span>
                成交订单量客户排行榜 TOP10
              </div>
              <div className="ranking-list">
                <div id="customer-orders-ranking-content" className="ranking-content">
                  {/* 动态内容 */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlTowerPanel;