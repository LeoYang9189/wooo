import React from 'react';
import { Button, Space, Tag } from '@arco-design/web-react';

const PortalHero: React.FC = () => {
  const advantages = [
    {
      text: "提升运营效率 80%+",
      icon: "fas fa-chart-line",
      color: "#1D4ED8" // 深蓝色
    },
    {
      text: "降低人工成本 60%+",
      icon: "fas fa-coins",
      color: "#1D4ED8" // 深蓝色
    },
    {
      text: "减少操作错误 90%+",
      icon: "fas fa-shield-alt",
      color: "#1D4ED8" // 深蓝色
    },
    {
      text: "加快响应速度 70%+",
      icon: "fas fa-bolt",
      color: "#1D4ED8" // 深蓝色
    }
  ];

  return (
    <div 
      className="relative overflow-hidden"
      style={{
        backgroundImage: 'url(/2222222.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 左侧渐变遮罩 */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(to right, rgba(30, 58, 138, 0.85) 0%, rgba(37, 99, 235, 0.75) 20%, rgba(59, 130, 246, 0.5) 33%, rgba(96, 165, 250, 0.25) 40%, transparent 50%)'
        }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* 英雄区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* 左侧文字内容 */}
          <div className="lg:pr-8">
            <div className="mb-6">
              <Tag color="blue" size="large" className="px-6 py-2 text-base">
                WallTech 控制塔系统
              </Tag>
            </div>
            <h1 
              className="font-black mb-6 leading-tight"
              style={{ 
                fontSize: 'clamp(1.8rem, 5vw, 4rem)',
                lineHeight: '1.2'
              }}
            >
              <span 
                className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent"
                style={{ 
                  textShadow: '0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(59,130,246,0.3)',
                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                  whiteSpace: 'nowrap'
                }}
              >
                AI赋能的物流控制塔
              </span>
              <br />
              <span 
                className="bg-gradient-to-r from-cyan-200 via-blue-100 to-white bg-clip-text text-transparent"
                style={{ 
                  textShadow: '0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(59,130,246,0.3)',
                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                }}
              >
                协同系统
              </span>
            </h1>

            
            <Space size="large" className="mb-10">
              <Button 
                type="primary" 
                size="large"
                className="h-12 md:h-14 px-6 md:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 border-0 text-base md:text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                立即体验
              </Button>
              <Button 
                size="large"
                className="h-12 md:h-14 px-6 md:px-8 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition-all"
              >
                观看演示
              </Button>
            </Space>

            {/* 优势指标卡片 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {advantages.map((advantage, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                  style={{
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }}
                >
                  <div className="text-center">
                    <i 
                      className={`${advantage.icon} text-2xl mx-auto mb-2 block`}
                      style={{ color: advantage.color }}
                    />
                    <div className="text-white font-bold text-sm leading-tight">
                      {advantage.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 右侧预留空间（让背景图片显示） */}
          <div className="hidden lg:block">
            {/* 这里故意留空，让背景图片的右侧部分清晰显示 */}
          </div>
        </div>
      </div>


    </div>
  );
};

export default PortalHero; 