import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Grid,
  Tabs
} from '@arco-design/web-react';
import { 
  IconBook, 
  IconPalette, 
  IconFile
} from '@arco-design/web-react/icon';

const { Title, Text } = Typography;
const { Row, Col } = Grid;
const { TabPane } = Tabs;

const UIStandards: React.FC = () => {
  const [activeTab, setActiveTab] = useState('colors');

  return (
    <div style={{ padding: '24px', background: '#f5f6fa', minHeight: '100vh' }}>
      {/* 页面标题 */}
      <div style={{ marginBottom: '24px' }}>
        <Title heading={2} style={{ 
          margin: 0, 
          color: '#1d2129',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <IconBook style={{ color: '#165DFF' }} />
          通用规范约定
        </Title>
        <Text style={{ color: '#86909c', fontSize: '14px', marginTop: '8px', display: 'block' }}>
          基于项目代码扫描总结的UI设计规范、组件样式标准和通用功能约定
        </Text>
      </div>

      {/* 主要内容区域 */}
      <Tabs 
        activeTab={activeTab} 
        onChange={setActiveTab}
        size="large"
        style={{ background: 'white', borderRadius: '8px', padding: '16px' }}
      >
        {/* 颜色规范 */}
        <TabPane key="colors" title={
          <span>
            <IconPalette style={{ marginRight: '8px' }} />
            颜色规范
          </span>
        }>
          <div style={{ padding: '16px 0' }}>
            <Title heading={4} style={{ marginBottom: '16px' }}>标准颜色规范</Title>
            <Text style={{ color: '#666', marginBottom: '24px', display: 'block' }}>
              基于项目代码扫描，以下是系统中使用的标准颜色值：
            </Text>
            
            <Row gutter={24}>
              <Col span={12}>
                <Card title="主色调" style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: '#165DFF', 
                        borderRadius: '6px',
                        border: '1px solid #e0e6ed'
                      }}></div>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>#165DFF</div>
                        <div style={{ color: '#666', fontSize: '12px' }}>主蓝色 - 按钮、链接、强调色</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: '#4080FF', 
                        borderRadius: '6px',
                        border: '1px solid #e0e6ed'
                      }}></div>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>#4080FF</div>
                        <div style={{ color: '#666', fontSize: '12px' }}>浅蓝色 - 渐变、辅助色</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
              
              <Col span={12}>
                <Card title="状态颜色" style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: '#00B42A', 
                        borderRadius: '6px',
                        border: '1px solid #e0e6ed'
                      }}></div>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>#00B42A</div>
                        <div style={{ color: '#666', fontSize: '12px' }}>成功/正常状态</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: '#F53F3F', 
                        borderRadius: '6px',
                        border: '1px solid #e0e6ed'
                      }}></div>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>#F53F3F</div>
                        <div style={{ color: '#666', fontSize: '12px' }}>错误/危险状态</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: '#F7BA1E', 
                        borderRadius: '6px',
                        border: '1px solid #e0e6ed'
                      }}></div>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>#F7BA1E</div>
                        <div style={{ color: '#666', fontSize: '12px' }}>警告/待处理状态</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
            
            <Row gutter={24}>
              <Col span={12}>
                <Card title="文字颜色" style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: '#1d2129', 
                        borderRadius: '6px',
                        border: '1px solid #e0e6ed'
                      }}></div>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>#1d2129</div>
                        <div style={{ color: '#666', fontSize: '12px' }}>主要文字色</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: '#4e5969', 
                        borderRadius: '6px',
                        border: '1px solid #e0e6ed'
                      }}></div>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>#4e5969</div>
                        <div style={{ color: '#666', fontSize: '12px' }}>次要文字色</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: '#86909c', 
                        borderRadius: '6px',
                        border: '1px solid #e0e6ed'
                      }}></div>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>#86909c</div>
                        <div style={{ color: '#666', fontSize: '12px' }}>提示文字色</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
              
              <Col span={12}>
                <Card title="背景颜色" style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: '#f7f8fa', 
                        borderRadius: '6px',
                        border: '1px solid #e0e6ed'
                      }}></div>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>#f7f8fa</div>
                        <div style={{ color: '#666', fontSize: '12px' }}>页面背景色</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: '#f2f3f5', 
                        borderRadius: '6px',
                        border: '1px solid #e0e6ed'
                      }}></div>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>#f2f3f5</div>
                        <div style={{ color: '#666', fontSize: '12px' }}>内容区背景色</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: '#ffffff', 
                        borderRadius: '6px',
                        border: '1px solid #e0e6ed'
                      }}></div>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>#ffffff</div>
                        <div style={{ color: '#666', fontSize: '12px' }}>卡片/组件背景色</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </TabPane>

        {/* 字体规范 */}
        <TabPane key="typography" title={
          <span>
            <IconFile style={{ marginRight: '8px' }} />
            字体规范
          </span>
        }>
          <div style={{ padding: '16px 0' }}>
            <Title heading={4} style={{ marginBottom: '16px' }}>字体大小规范</Title>
            <Text style={{ color: '#666', marginBottom: '24px', display: 'block' }}>
              基于项目代码扫描总结的字体大小使用规范：
            </Text>
            
            <Card>
              <Text>字体规范内容完善中，基础框架已建立...</Text>
            </Card>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UIStandards; 