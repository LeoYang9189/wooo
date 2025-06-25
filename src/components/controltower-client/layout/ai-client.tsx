import React, { useState } from 'react';
import { Modal, Button, Input } from '@arco-design/web-react';
import { IconList, IconSync, IconApps, IconFile, IconAttachment, IconEye, IconLocation } from '@arco-design/web-react/icon';

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
    <Modal
      title={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Button type="text" icon={<IconList />} className="mr-2" />
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center mr-2 shadow-sm">
                <img src="/assets/g6qmm-vsolk.gif" alt="智能助手卡卡" className="w-full h-full object-cover" />
              </div>
              <span className="text-base font-medium">智能助手卡卡</span>
            </div>
          </div>
          <div className="flex items-center" style={{ marginRight: '50px' }}>
            <Button 
              type="outline" 
              className="text-blue-600 border-blue-200"
              icon={<IconSync style={{ color: '#1677FF' }} />}
              style={{ marginRight: '20px' }}
            >
              开启新对话
            </Button>
            <Button 
              type="outline" 
              className="text-blue-600 border-blue-200"
              icon={<IconApps style={{ color: '#1677FF' }} />}
            >
              切换全屏模式
            </Button>
          </div>
        </div>
      }
      visible={visible}
      onCancel={onClose}
      footer={null}
      style={{ width: '900px', maxHeight: '80vh' }}
      className="ai-chat-modal vertical-center-modal"
      getPopupContainer={() => document.body}
      alignCenter={true}
      modalRender={(modal) => (
        <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)' }}>
          {modal}
        </div>
      )}
    >
      <div className="ai-chat-container flex flex-col h-full" style={{ height: '650px' }}>
        <div className="ai-chat-messages overflow-y-auto flex-grow p-6 pb-0">
          <div className="flex mb-5">
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center mr-2 flex-shrink-0 shadow-sm">
              <img src="/assets/g6qmm-vsolk.gif" alt="智能助手卡卡" className="w-full h-full object-cover" />
            </div>
            <div className="max-w-[90%]">
              <div className="mb-1">
                <span className="text-blue-500">👋 你好，我是智能助手卡卡</span>
              </div>
              <div className="text-gray-700">
                我专门为客户设计，可以帮你查询运价、跟踪货物、管理订单、获取物流信息等，让我来为你提供专业服务吧！
              </div>
              
              <div className="mt-6">
                <div className="font-medium mb-3">你可以这样问我</div>
                <div className="space-y-3">
                  <div className="p-2 text-sm flex items-center cursor-pointer hover:bg-blue-50 rounded-lg transition-all border border-blue-100">
                    <span className="text-blue-500 mr-2">›</span>
                    查询我的订单CT1234567最新状态
                  </div>
                  <div className="p-2 text-sm flex items-center cursor-pointer hover:bg-blue-50 rounded-lg transition-all border border-blue-100">
                    <span className="text-blue-500 mr-2">›</span>
                    上海到洛杉矶海运费是多少？
                  </div>
                  <div className="p-2 text-sm flex items-center cursor-pointer hover:bg-blue-50 rounded-lg transition-all border border-blue-100">
                    <span className="text-blue-500 mr-2">›</span>
                    我的货物CT121212现在到哪里了？
                  </div>
                  <div className="p-2 text-sm flex items-center cursor-pointer hover:bg-blue-50 rounded-lg transition-all border border-blue-100">
                    <span className="text-blue-500 mr-2">›</span>
                    帮我创建一个新的运输询价
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="ai-chat-footer mt-auto border-t border-gray-200 p-4 sticky bottom-0 bg-white">
          <div className="mb-5">
            <div className="text-sm text-gray-500 mb-3">常用服务：</div>
            <div className="grid grid-cols-4 gap-2">
              <Button 
                size="small" 
                type="outline"
                className="text-blue-600 border-blue-200"
                icon={<IconFile style={{ color: '#1677FF' }} />}
              >
                订单查询
              </Button>
              <Button 
                size="small" 
                type="outline"
                className="text-green-600 border-green-200"
                icon={<IconSync style={{ color: '#00B42A' }} />}
              >
                运价查询
              </Button>
              <Button 
                size="small" 
                type="outline"
                className="text-purple-600 border-purple-200"
                icon={<IconLocation style={{ color: '#722ED1' }} />}
              >
                货物追踪
              </Button>
              <Button 
                size="small" 
                type="outline"
                className="text-cyan-600 border-cyan-200"
                icon={<IconEye style={{ color: '#14C9C9' }} />}
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
              className="flex-1"
              style={{ 
                backgroundColor: '#F0F8FF', 
                borderRadius: '20px', 
                height: '42px',
                paddingRight: '100px',
                borderColor: '#91D5FF'
              }}
            />
            <Button
              type="text"
              className="absolute right-[45px]"
              style={{ 
                height: '36px',
                padding: 0
              }}
              icon={<IconAttachment style={{ color: '#86909C', fontSize: '18px' }} />}
            />
            <Button 
              type="primary" 
              className="absolute right-1"
              style={{ 
                borderRadius: '4px', 
                height: '36px',
                width: '80px',
                padding: '0 12px',
                backgroundColor: '#1677FF'
              }}
              onClick={handleSendMessage}
            >
              <span style={{ marginRight: '2px' }}>发送</span> <span>&gt;&gt;</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AIAssistant; 