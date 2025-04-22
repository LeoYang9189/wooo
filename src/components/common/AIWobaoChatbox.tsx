import { useState } from 'react';
import octopusAvatar from '../../assets/octopus-avatar.svg';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AIWobaoChatbox: React.FC<Props> = ({ isOpen, onClose }) => {
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '800px',
      maxWidth: '90vw',
      height: '700px',
      maxHeight: '90vh',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 2000,
    }}>
      {/* 头部 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px 20px',
        borderBottom: '1px solid #f0f0f0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={octopusAvatar} alt="AI 沃宝" style={{ width: '32px', height: '32px' }} />
          <div style={{ fontSize: '16px', fontWeight: 'bold' }}>AI 沃宝</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
          <button
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 12px',
              border: '1px solid #e6e6e6',
              borderRadius: '20px',
              backgroundColor: 'white',
              color: '#666',
              fontSize: '14px',
            }}
            aria-label="开启新对话"
          >
            <span style={{ marginRight: '6px' }}>⟳</span>
            开启新对话
          </button>
          <button
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 12px',
              border: '1px solid #e6e6e6',
              borderRadius: '20px',
              backgroundColor: 'white',
              color: '#666',
              fontSize: '14px',
            }}
            aria-label="切换助手模式"
          >
            <span style={{ marginRight: '6px' }}>⇱</span>
            切换助手模式
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#999',
            }}
            aria-label="关闭对话框"
          >
            ×
          </button>
        </div>
      </div>

      {/* 内容区 - 顶部部分包含三个卡片 */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <div style={{
          display: 'flex',
          gap: '12px',
        }}>
          {/* 热门话题 */}
          <div style={{
            flex: 1,
            backgroundColor: '#fff2f4',
            backgroundImage: 'linear-gradient(to bottom right, #fff2f4, #ffe6e8)',
            padding: '16px',
            borderRadius: '12px'
          }}>
            <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>热门话题</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'AI沃宝全新升级了什么功能',
                '如何开启AI沃宝对话',
                'AI沃宝有什么更新计划'
              ].map((item, index) => (
                <div key={index} style={{
                  padding: '12px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  fontSize: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}>
                  {item}
                  <span>›</span>
                </div>
              ))}
            </div>
          </div>

          {/* 使用反馈 */}
          <div style={{
            flex: 1,
            backgroundColor: '#e8f8ee',
            backgroundImage: 'linear-gradient(to bottom right, #e8f8ee, #d3f6d8)',
            padding: '16px',
            borderRadius: '12px'
          }}>
            <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>AI沃宝使用反馈</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '8px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <span style={{ marginRight: '8px', color: '#FFB100' }}>✦</span>
                许愿新功能
                <span style={{ marginLeft: 'auto' }}>›</span>
              </div>
              <div style={{
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '8px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <span style={{ marginRight: '8px', color: '#F56C6C' }}>⊙</span>
                吐槽产品经理
                <span style={{ marginLeft: 'auto' }}>›</span>
              </div>
              <div style={{
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '8px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <span style={{ marginRight: '8px', color: '#409EFF' }}>○</span>
                联系客服了解更多
                <span style={{ marginLeft: 'auto' }}>›</span>
              </div>
            </div>
          </div>

          {/* 样例提问 */}
          <div style={{
            flex: 1,
            backgroundColor: '#e0f7ee',
            backgroundImage: 'linear-gradient(to bottom right, #e0f7ee, #c2efdf)',
            padding: '16px',
            borderRadius: '12px'
          }}>
            <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>你可以这样问</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '8px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                给我查一下我创建的E...
                <span style={{ marginLeft: 'auto' }}>›</span>
              </div>
              <div style={{
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '8px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                给我查一下 Shanghai ...
                <span style={{ marginLeft: 'auto' }}>›</span>
              </div>
              <div style={{
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '8px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                给我查一下SHSE1234...
                <span style={{ marginLeft: 'auto' }}>›</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 对话内容 */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            marginRight: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img src={octopusAvatar} alt="AI 沃宝" style={{ width: '32px', height: '32px' }} />
          </div>
          <div style={{
            backgroundColor: '#f9f9f9',
            padding: '12px 16px',
            borderRadius: '0 8px 8px 8px',
            maxWidth: '80%'
          }}>
            <div style={{ marginBottom: '8px' }}>
              <span role="img" aria-label="thumbs up" style={{ marginRight: '8px' }}>👍</span>
              你好，我是 AI 沃宝
            </div>
            <div>
              基于Cargoware 云物流平台设计的智能助手方案，我可以帮你操作订单、查询
              运价、跟踪订单等，快和我对话试试吧！
            </div>
          </div>
        </div>
      </div>

      {/* 底部工具栏和输入框 */}
      <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
        <div style={{
          display: 'flex',
          marginBottom: '10px',
          alignItems: 'center',
          color: '#666',
          fontSize: '14px'
        }}>
          <span style={{ marginRight: '10px' }}>常用技能：</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{
              padding: '6px 10px',
              border: '1px solid #e6e6e6',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer'
            }}>
              <span style={{ color: '#409EFF' }}>📋</span>
              订单操作
            </div>
            <div style={{
              padding: '6px 10px',
              border: '1px solid #e6e6e6',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer'
            }}>
              <span style={{ color: '#67C23A' }}>⊕</span>
              智能运价
            </div>
            <div style={{
              padding: '6px 10px',
              border: '1px solid #e6e6e6',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer'
            }}>
              <span style={{ color: '#B065E4' }}>⊛</span>
              订单跟踪
            </div>
            <div style={{
              padding: '6px 10px',
              border: '1px solid #e6e6e6',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer'
            }}>
              <span style={{ color: '#F56C6C' }}>⊗</span>
              Cargoware FAQ
            </div>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{
            flex: 1,
            border: '1px solid #e6e6e6',
            borderRadius: '24px',
            padding: '10px 16px',
            display: 'flex'
          }}>
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="输入消息..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '16px'
              }}
            />
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                color: '#999',
                fontSize: '18px',
                cursor: 'pointer'
              }}
              aria-label="附件"
            >
              📎
            </button>
          </div>
          <button
            type="button"
            style={{
              marginLeft: '10px',
              backgroundColor: '#1677ff',
              color: 'white',
              border: 'none',
              borderRadius: '24px',
              padding: '0 24px',
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="发送消息"
          >
            <span style={{ marginRight: '4px' }}>⟰</span>
            发送
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIWobaoChatbox;