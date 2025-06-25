import React, { useState } from 'react';
import { Drawer, Button, Input } from '@arco-design/web-react';
import { IconSync, IconApps, IconFile, IconAttachment, IconEye, IconLocation, IconClose } from '@arco-design/web-react/icon';

interface AIAssistantProps {
  visible: boolean;
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ visible, onClose }) => {
  const [aiMessages, setAiMessages] = useState<{text: string, isUser: boolean}[]>([]);
  const [userInput, setUserInput] = useState('');

  // 处理AI对话
  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    // 添加用户消息
    setAiMessages([...aiMessages, {text: userInput, isUser: true}]);
    
    // 模拟AI回复
    setTimeout(() => {
      setAiMessages(prev => [...prev, {
        text: `我已收到你的问题："${userInput}"。作为客户端智能助手，我正在为你查询处理，请稍候...`,
        isUser: false
      }]);
      setUserInput('');
    }, 500);
  };

  return (
    <Drawer
      title={null}
      visible={visible}
      onCancel={onClose}
      placement="right"
      width={420}
      footer={null}
      mask={false}
      closable={false}
      autoFocus={false}
      focusLock={false}
      escToExit={false}
      style={{
        position: 'fixed',
        right: '20px',
        top: '80px',
        height: 'calc(100vh - 100px)',
        borderRadius: '16px',
        boxShadow: '0 8px 40px rgba(79, 70, 229, 0.15)',
        border: '1px solid rgba(79, 70, 229, 0.1)',
        zIndex: 1000
      }}
      bodyStyle={{
        padding: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* 头部 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center mr-3 shadow-sm">
            <img src="/assets/g6qmm-vsolk.gif" alt="智能助手卡卡" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-base font-medium text-gray-800">智能助手卡卡</div>
            <div className="text-xs text-purple-600">专业客户服务</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            type="text" 
            size="small"
            className="text-purple-600"
            icon={<IconSync style={{ color: '#7C3AED' }} />}
            title="开启新对话"
          />
          <Button 
            type="text" 
            size="small"
            className="text-purple-600"
            icon={<IconApps style={{ color: '#7C3AED' }} />}
            title="全屏模式"
          />
          <Button 
            type="text" 
            size="small"
            className="text-gray-500 hover:text-gray-700"
            icon={<IconClose />}
            onClick={onClose}
            title="关闭"
          />
        </div>
      </div>

      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/20">
        <div className="flex mb-4">
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center mr-3 flex-shrink-0 shadow-sm">
            <img src="/assets/g6qmm-vsolk.gif" alt="智能助手卡卡" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="mb-2">
              <span className="text-purple-600 font-medium">👋 你好，我是智能助手卡卡</span>
            </div>
            <div className="text-gray-700 text-sm leading-relaxed">
              我专门为客户设计，可以帮你查询运价、跟踪货物、管理订单、获取物流信息等，让我来为你提供专业服务吧！
            </div>
            
            <div className="mt-4">
              <div className="font-medium mb-3 text-sm">你可以这样问我</div>
              <div className="space-y-2">
                <div className="p-2 text-xs flex items-center cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all border border-purple-100">
                  <span className="text-purple-500 mr-2">›</span>
                  <span className="text-gray-700">查询我的订单CT1234567最新状态</span>
                </div>
                <div className="p-2 text-xs flex items-center cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all border border-purple-100">
                  <span className="text-purple-500 mr-2">›</span>
                  <span className="text-gray-700">上海到洛杉矶海运费是多少？</span>
                </div>
                <div className="p-2 text-xs flex items-center cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all border border-purple-100">
                  <span className="text-purple-500 mr-2">›</span>
                  <span className="text-gray-700">我的货物CT121212现在到哪里了？</span>
                </div>
                <div className="p-2 text-xs flex items-center cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all border border-purple-100">
                  <span className="text-purple-500 mr-2">›</span>
                  <span className="text-gray-700">帮我创建一个新的运输询价</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 显示对话消息 */}
        {aiMessages.map((message, index) => (
          <div key={index} className={`flex mb-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            {!message.isUser && (
              <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center mr-2 flex-shrink-0">
                <img src="/assets/g6qmm-vsolk.gif" alt="AI" className="w-full h-full object-cover" />
              </div>
            )}
            <div className={`max-w-[80%] p-2 rounded-lg text-sm ${
              message.isUser 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none' 
                : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none shadow-sm'
            }`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      
      {/* 底部输入区域 */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="mb-3">
          <div className="text-xs text-gray-500 mb-2">常用服务：</div>
          <div className="grid grid-cols-2 gap-1">
            <Button 
              size="mini" 
              type="outline"
              className="text-blue-600 border-blue-200 text-xs"
              icon={<IconFile style={{ color: '#3B82F6', fontSize: '12px' }} />}
            >
              订单查询
            </Button>
            <Button 
              size="mini" 
              type="outline"
              className="text-purple-600 border-purple-200 text-xs"
              icon={<IconSync style={{ color: '#7C3AED', fontSize: '12px' }} />}
            >
              运价查询
            </Button>
            <Button 
              size="mini" 
              type="outline"
              className="text-pink-600 border-pink-200 text-xs"
              icon={<IconLocation style={{ color: '#EC4899', fontSize: '12px' }} />}
            >
              货物追踪
            </Button>
            <Button 
              size="mini" 
              type="outline"
              className="text-indigo-600 border-indigo-200 text-xs"
              icon={<IconEye style={{ color: '#6366F1', fontSize: '12px' }} />}
            >
              状态查看
            </Button>
          </div>
        </div>
        
        <div className="relative flex items-center">
          <Input
            value={userInput}
            onChange={value => setUserInput(value)}
            placeholder="需要我帮你查询什么信息呢？"
            className="flex-1 text-sm"
            style={{ 
              background: 'linear-gradient(to right, #EFF6FF, #F3E8FF, #FDF2F8)', 
              borderRadius: '16px', 
              height: '36px',
              paddingRight: '80px',
              borderColor: '#C7D2FE'
            }}
            onPressEnter={handleSendMessage}
          />
          <Button
            type="text"
            className="absolute right-[35px]"
            style={{ 
              height: '28px',
              padding: 0
            }}
            icon={<IconAttachment style={{ color: '#86909C', fontSize: '14px' }} />}
          />
          <Button 
            type="primary" 
            size="small"
            className="absolute right-1"
            style={{ 
              borderRadius: '12px', 
              height: '28px',
              width: '60px',
              padding: '0 8px',
              background: 'linear-gradient(to right, #3B82F6, #7C3AED)',
              fontSize: '12px',
              border: 'none'
            }}
            onClick={handleSendMessage}
          >
            发送
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default AIAssistant; 