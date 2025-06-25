import React, { useState } from 'react';
import { Modal, Button, Input } from '@arco-design/web-react';
import { IconList, IconSync, IconApps, IconFile, IconAttachment, IconSettings, IconUser, IconStorage } from '@arco-design/web-react/icon';

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
        text: `我已收到你的问题："${userInput}"。作为运营版智能助手，我正在处理中，请稍候...`,
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
                <img src="/assets/g6qmm-vsolk.gif" alt="运营智能助手" className="w-full h-full object-cover" />
              </div>
              <span className="text-base font-medium">运营智能助手</span>
            </div>
          </div>
          <div className="flex items-center" style={{ marginRight: '50px' }}>
            <Button 
              type="outline" 
              className="text-orange-600 border-orange-200"
              icon={<IconSync style={{ color: '#FF7D00' }} />}
              style={{ marginRight: '20px' }}
            >
              开启新对话
            </Button>
            <Button 
              type="outline" 
              className="text-orange-600 border-orange-200"
              icon={<IconApps style={{ color: '#FF7D00' }} />}
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
        <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 12px 32px rgba(255, 125, 0, 0.1)' }}>
          {modal}
        </div>
      )}
    >
      <div className="ai-chat-container flex flex-col h-full" style={{ height: '650px' }}>
        <div className="ai-chat-messages overflow-y-auto flex-grow p-6 pb-0">
          <div className="flex mb-5">
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center mr-2 flex-shrink-0 shadow-sm">
              <img src="/assets/g6qmm-vsolk.gif" alt="运营智能助手" className="w-full h-full object-cover" />
            </div>
            <div className="max-w-[90%]">
              <div className="mb-1">
                <span className="text-orange-500">👋 你好，我是运营版智能助手</span>
              </div>
              <div className="text-gray-700">
                我专门为运营团队设计，可以帮你管理客户、维护基础数据、配置运价、分析业务数据等运营工作，让我们开始对话吧！
              </div>
              
              <div className="mt-6">
                <div className="font-medium mb-3">运营专用功能示例</div>
                <div className="space-y-3">
                  <div className="p-2 text-sm flex items-center cursor-pointer hover:bg-orange-50 rounded-lg transition-all border border-orange-100">
                    <span className="text-orange-500 mr-2">›</span>
                    帮我查看今日新增客户数量和注册情况
                  </div>
                  <div className="p-2 text-sm flex items-center cursor-pointer hover:bg-orange-50 rounded-lg transition-all border border-orange-100">
                    <span className="text-orange-500 mr-2">›</span>
                    分析本月询价转化率和热门航线
                  </div>
                  <div className="p-2 text-sm flex items-center cursor-pointer hover:bg-orange-50 rounded-lg transition-all border border-orange-100">
                    <span className="text-orange-500 mr-2">›</span>
                    帮我批量更新Shanghai到Bangkok的运价
                  </div>
                  <div className="p-2 text-sm flex items-center cursor-pointer hover:bg-orange-50 rounded-lg transition-all border border-orange-100">
                    <span className="text-orange-500 mr-2">›</span>
                    生成客户服务质量分析报告
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="ai-chat-footer mt-auto border-t border-gray-200 p-4 sticky bottom-0 bg-white">
          <div className="mb-5">
            <div className="text-sm text-gray-500 mb-3">运营专用技能：</div>
            <div className="grid grid-cols-4 gap-2">
              <Button 
                size="small" 
                type="outline"
                className="text-orange-600 border-orange-200"
                icon={<IconUser style={{ color: '#FF7D00' }} />}
              >
                客户管理
              </Button>
              <Button 
                size="small" 
                type="outline"
                className="text-red-600 border-red-200"
                icon={<IconFile style={{ color: '#F53F3F' }} />}
              >
                运价配置
              </Button>
              <Button 
                size="small" 
                type="outline"
                className="text-purple-600 border-purple-200"
                icon={<IconStorage style={{ color: '#722ED1' }} />}
              >
                数据维护
              </Button>
              <Button 
                size="small" 
                type="outline"
                className="text-cyan-600 border-cyan-200"
                icon={<IconSettings style={{ color: '#14C9C9' }} />}
              >
                系统配置
              </Button>
            </div>
          </div>
          
          <div className="relative flex items-center">
            <Input
              value={userInput}
              onChange={value => setUserInput(value)}
              placeholder="需要我帮你处理什么运营工作呢？"
              className="flex-1"
              style={{ 
                backgroundColor: '#FFF7ED', 
                borderRadius: '20px', 
                height: '42px',
                paddingRight: '100px',
                borderColor: '#FFD4A3'
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
                backgroundColor: '#FF7D00'
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