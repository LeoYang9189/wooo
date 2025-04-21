import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import octopusAvatar from '../../assets/octopus-avatar.svg';
import ColoredTypedText from '../common/ColoredTypedText';

const Hero = () => {
  const [inputValue, setInputValue] = useState('什么是沃宝？');
  const [displayedInput, setDisplayedInput] = useState('');
  const [isDialogExpanded, setIsDialogExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  
  // 打字机效果
  useEffect(() => {
    if (!isTyping) return;
    
    const text = '什么是沃宝？';
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedInput(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        
        // 重置打字机效果，循环播放
        setTimeout(() => {
          setDisplayedInput('');
          currentIndex = 0;
          setIsTyping(true);
        }, 3000);
      }
    }, 150);
    
    return () => clearInterval(typingInterval);
  }, [isTyping]);
  
  // 示例对话数据 - 修改为单个气泡
  const chatMessages = [
    {
      sender: 'bot',
      avatar: octopusAvatar,
      content: 'Hello, 我叫沃宝\n\nWallTech创造了我，赋予了我理解大家语言的能力，当然我也在快速训练、学习成长中，请各位多多支持呀~\n\n如果你想了解我们的产品，你可以这样问：',
      time: '06月13日 13:04'
    }
  ];
  
  // 示例问题建议
  const suggestedQuestions = [
    '什么是沃宝？有什么功能？',
    'Wo AI！包含哪些产品？或功能模块？',
    '物流可视平台的时效性能达到什么程度？数据多长时间更新一次？',
    '能识别哪些类型的单证呢？识别率是多少？',
  ];
  
  // 处理对话框点击
  const handleDialogClick = () => {
    setIsDialogExpanded(true);
  };
  
  // 处理关闭对话
  const handleCloseDialog = () => {
    setIsDialogExpanded(false);
  };
  
  // 处理问题选择
  const handleQuestionSelect = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="bg-gradient-to-b from-white via-accent to-white wave-bg section-padding min-h-[80vh] flex items-center relative">
      {/* 背景效果 */}
      <div className="silk-overlay"></div>
      <div className="light-shimmer"></div>
      
      {/* 弧形波浪线 */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
        {/* 顶部左侧弧形 */}
        <div className="curved-line" style={{
          top: '-60%',
          left: '-30%',
          width: '120%',
          height: '120%',
          transform: 'rotate(15deg)'
        }}></div>
        
        {/* 右上角弧形 */}
        <div className="curved-line" style={{
          top: '-80%',
          right: '-50%',
          width: '140%',
          height: '140%',
          transform: 'rotate(-5deg)'
        }}></div>
        
        {/* 左下方弧形 */}
        <div className="curved-line" style={{
          bottom: '-70%',
          left: '-20%',
          width: '100%',
          height: '120%',
          transform: 'rotate(10deg)'
        }}></div>
        
        {/* 底部中央弧形 */}
        <div className="curved-line" style={{
          bottom: '-90%',
          left: '20%',
          width: '140%',
          height: '140%',
          transform: 'rotate(-15deg)'
        }}></div>
        
        {/* 中部弧形 */}
        <div className="curved-line" style={{
          top: '10%',
          right: '-40%',
          width: '90%',
          height: '90%',
          transform: 'rotate(5deg)',
          opacity: '0.1'
        }}></div>
        
        {/* 中下部弧形 */}
        <div className="curved-line" style={{
          bottom: '-30%',
          left: '5%',
          width: '80%',
          height: '80%',
          transform: 'rotate(-8deg)',
          opacity: '0.08'
        }}></div>
        
        {/* 小型弧形 */}
        <div className="curved-line" style={{
          top: '15%',
          left: '10%',
          width: '50%',
          height: '50%',
          transform: 'rotate(12deg)',
          opacity: '0.06',
          border: '0.5px solid rgba(237, 210, 248, 0.1)'
        }}></div>
        
        {/* 右侧小型弧形 */}
        <div className="curved-line" style={{
          top: '40%',
          right: '15%',
          width: '40%',
          height: '40%',
          transform: 'rotate(-20deg)',
          opacity: '0.05',
          border: '0.5px solid rgba(242, 220, 252, 0.08)'
        }}></div>
      </div>
      
      {/* 柔和的渐变色背景块 */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
        <div className="aurora-wave aurora-wave-1"></div>
        <div className="aurora-wave aurora-wave-2"></div>
        <div className="aurora-wave aurora-wave-3"></div>
      </div>
      
      <div className="container-custom relative z-10 hero-content">
        <div className="flex flex-col items-center text-center">
          {/* 主标题 - 当对话框展开时上移 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              marginTop: isDialogExpanded ? '-60px' : '0px',
              scale: isDialogExpanded ? 0.8 : 1,
            }}
            transition={{ duration: 0.5 }}
            className={`mb-8 transition-all duration-500 ${isDialogExpanded ? 'mt-0' : 'mt-8'}`}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-3">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AI</span>，让
              <ColoredTypedText
                textParts={[
                  { text: '国际物流', className: 'text-gray-900' },
                  { text: '更简单', className: 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent' }
                ]}
                typingSpeed={150}
                loop={true}
                loopDelay={3000}
              />
            </h1>
          </motion.div>
          
          {/* AI对话区域 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`w-full max-w-4xl mx-auto transition-all duration-500 ${isDialogExpanded ? 'mb-8' : 'mb-16'}`}
          >
            {/* 展开的对话界面 */}
            {isDialogExpanded ? (
              <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-4 transition-all duration-500 overflow-hidden">
                {/* 对话标题栏 */}
                <div className="flex items-center justify-center pb-3 border-b border-gray-100 relative">
                  <div className="absolute left-0">
                    <img src={octopusAvatar} alt="AI助手" className="w-8 h-8" />
                  </div>
                  <h3 className="font-medium text-gray-700">沃宝智能助手</h3>
                  <div className="absolute right-0 cursor-pointer" onClick={handleCloseDialog}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                {/* 对话时间戳 */}
                <div className="text-center my-3">
                  <span className="text-xs text-gray-400">{chatMessages[0].time}</span>
                </div>
                
                {/* 对话内容 - 单个气泡 */}
                <div className="max-h-[400px] overflow-y-auto py-2">
                  <div className="mb-4">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <img src={chatMessages[0].avatar} alt="AI助手" className="w-10 h-10" />
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-left max-w-[90%]">
                        <p className="text-gray-800 whitespace-pre-line">{chatMessages[0].content}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* 建议问题列表 */}
                  <div className="mt-6 space-y-3">
                    {suggestedQuestions.map((question, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-left cursor-pointer transition-colors"
                        onClick={() => handleQuestionSelect(question)}
                      >
                        <p className="text-primary text-sm">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 底部输入框 */}
                <div className="mt-4 border-t border-gray-100 pt-4 flex items-center">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 py-3 px-4 outline-none text-gray-700 bg-gray-50 rounded-l-full"
                    placeholder="在这里输入你的问题..."
                  />
                  <button className="bg-primary hover:bg-secondary transition-colors duration-300 p-3 rounded-r-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              // 折叠的对话条
              <div 
                className="bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center p-2 pl-6 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={handleDialogClick}
              >
                <div className="mr-2">
                  <img src={octopusAvatar} alt="智能机器人" className="w-10 h-10" />
                </div>
                <div className="flex-1 py-3 px-4 outline-none text-gray-500 cursor-pointer bg-transparent flex items-center">
                  <span>{displayedInput}</span>
                  <span className="inline-block w-[2px] h-[1em] bg-gray-400 ml-1 animate-blink"></span>
                </div>
                <button className="bg-primary hover:bg-secondary transition-colors duration-300 p-3 rounded-full ml-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </motion.div>
          
          {/* 特性展示 - 当对话框展开时下移 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              marginTop: isDialogExpanded ? '620px' : '20px'
            }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-5xl mx-auto transition-all duration-500"
          >
            {[
              { icon: "👤", title: "专属形象", description: "每个人都能拥有专属形象的智能伙伴。" },
              { icon: "🧠", title: "有记忆", description: "有记忆的伙伴, 会记住与你重要的信息。" },
              { icon: "🔍", title: "开放的", description: "开放的伙伴，让飞书更能适应各种工作。" },
              { icon: "⚡", title: "统一体验", description: "跨各种场景的统一体验的智能伙伴。" }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 25px -5px rgba(116, 102, 240, 0.2)"
                }}
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 