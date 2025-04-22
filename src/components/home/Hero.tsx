import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import octopusAvatar from '../../assets/octopus-avatar-new.svg';
import SimpleTypedText from '../common/SimpleTypedText';

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

  // 处理计划说明跳转
  const handlePlanButtonClick = () => {
    window.open('https://n72qv2rrvp.feishu.cn/docx/IP1idX5L5ohkp8xoQVjcaZCbnid?from=from_copylink', '_blank');
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
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1.0],
              marginTop: { duration: 0.7 },
              scale: { duration: 0.5 }
            }}
            className={`mb-8 ${isDialogExpanded ? 'mt-0' : 'mt-8'}`}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-3">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AI</span>，让
              <span className="text-gray-900">国际物流</span>
              <SimpleTypedText
                text="更简单"
                className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                typingSpeed={120}
                pauseTime={3000}
              />
            </h1>

            {/* 添加计划说明按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="mt-4"
            >
              <button
                type="button"
                onClick={handlePlanButtonClick}
                className="bg-white text-primary border border-primary/30 px-6 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:bg-primary/5 flex items-center mx-auto"
                aria-label="查看计划说明文档"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                点我查看计划说明
              </button>
            </motion.div>
          </motion.div>

          {/* AI对话区域 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1.0],
              delay: 0.1
            }}
            className={`w-full max-w-4xl mx-auto ${isDialogExpanded ? 'mb-8' : 'mb-16'}`}
          >
            {/* 对话界面 - 使用AnimatePresence处理组件的进入和退出 */}
            <AnimatePresence mode="wait">
              {isDialogExpanded ? (
                <motion.div
                  key="expanded-dialog"
                  initial={{ opacity: 0, height: 0, borderRadius: "9999px" }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    borderRadius: "0.75rem"
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    borderRadius: "9999px",
                    transition: { duration: 0.3 }
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1.0],
                    height: { duration: 0.4 }
                  }}
                  className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-4 overflow-hidden"
                >
                {/* 对话标题栏 */}
                <div className="flex items-center justify-center pb-3 border-b border-gray-100 relative">
                  <div className="absolute left-0">
                    <img src={octopusAvatar} alt="AI助手" className="w-8 h-8" />
                  </div>
                  <h3 className="font-medium text-gray-700">沃宝智能助手</h3>
                  <button
                    type="button"
                    className="absolute right-0 cursor-pointer bg-transparent border-0 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    onClick={handleCloseDialog}
                    aria-label="关闭对话"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
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
                  <button
                    type="button"
                    className="bg-primary hover:bg-secondary transition-colors duration-300 p-3 rounded-r-full"
                    aria-label="发送消息"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </motion.div>
              ) : (
                // 折叠的对话条
                <motion.div
                  key="collapsed-dialog"
                  initial={{ opacity: 0.9, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.2 }
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1.0]
                  }}
                  className="bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center p-2 pl-6 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  onClick={handleDialogClick}
                >
                <div className="mr-2">
                  <img src={octopusAvatar} alt="智能机器人" className="w-10 h-10" />
                </div>
                <div className="flex-1 py-3 px-4 outline-none text-gray-500 cursor-pointer bg-transparent flex items-center">
                  <span>{displayedInput}</span>
                  <span className="inline-block w-[2px] h-[1em] bg-gray-400 ml-1 animate-blink"></span>
                </div>
                <button
                  type="button"
                  className="bg-primary hover:bg-secondary transition-colors duration-300 p-3 rounded-full ml-2"
                  aria-label="发送消息"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 特性展示 - 当对话框展开时下移 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              marginTop: isDialogExpanded ? '620px' : '20px'
            }}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.1, 0.25, 1.0],
              marginTop: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }
            }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-5xl mx-auto"
          >
            {[
              {
                icon: <div className="w-16 h-16 flex items-center justify-center mb-2">
                  <svg viewBox="0 0 128 128" className="w-full h-full">
                    <linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                    <circle cx="64" cy="64" r="60" fill="white" stroke="#E5E7EB" strokeWidth="2" />
                    <path d="M64 16c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm-9 14c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10 4.5-10 10-10zm-15 48c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10zm24 18c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10zm15-28c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z" fill="url(#ai-gradient)" />
                    <circle cx="55" cy="40" r="6" fill="#3B82F6" />
                    <circle cx="40" cy="64" r="6" fill="#10B981" />
                    <circle cx="64" cy="88" r="6" fill="#F59E0B" />
                    <circle cx="88" cy="64" r="6" fill="#EF4444" />
                    <circle cx="64" cy="64" r="10" fill="white" stroke="#6366F1" strokeWidth="2" />
                    <circle cx="64" cy="64" r="3" fill="#6366F1" />
                  </svg>
                </div>,
                title: "专属AI",
                description: "每个人都能拥有专属自己的智能AI伙伴。"
              },
              {
                icon: <div className="w-16 h-16 flex items-center justify-center mb-2">
                  <svg viewBox="0 0 128 128" className="w-full h-full">
                    <defs>
                      <linearGradient id="service-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4ADE80" />
                        <stop offset="100%" stopColor="#22C55E" />
                      </linearGradient>
                      <linearGradient id="service-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                      <linearGradient id="service-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#EC4899" />
                        <stop offset="100%" stopColor="#F472B6" />
                      </linearGradient>
                      <filter id="service-shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0001" />
                      </filter>
                    </defs>
                    <circle cx="64" cy="64" r="60" fill="white" stroke="#E5E7EB" strokeWidth="2" />
                    <g filter="url(#service-shadow)">
                      <path d="M42 38a6 6 0 0 1 6-6h48a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H48a6 6 0 0 1-6-6V38z" fill="url(#service-gradient-1)" />
                      <path d="M26 58a6 6 0 0 1 6-6h48a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H32a6 6 0 0 1-6-6V58z" fill="url(#service-gradient-2)" />
                      <path d="M42 78a6 6 0 0 1 6-6h48a6 6 0 0 1 6 6v12a6 6 0 0 1-6 12H48a6 6 0 0 1-6-6V78z" fill="url(#service-gradient-3)" />
                    </g>
                    <circle cx="79" cy="44" r="3" fill="white" />
                    <circle cx="63" cy="64" r="3" fill="white" />
                    <circle cx="79" cy="84" r="3" fill="white" />
                  </svg>
                </div>,
                title: "全面服务",
                description: "产品覆盖国际物流环节的每个节点"
              },
              {
                icon: <div className="w-16 h-16 flex items-center justify-center mb-2">
                  <svg viewBox="0 0 128 128" className="w-full h-full">
                    <defs>
                      <linearGradient id="operation-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#F97316" />
                      </linearGradient>
                      <linearGradient id="operation-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#60A5FA" />
                      </linearGradient>
                      <filter id="operation-shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0001" />
                      </filter>
                    </defs>
                    <circle cx="64" cy="64" r="60" fill="white" stroke="#E5E7EB" strokeWidth="2" />
                    <g filter="url(#operation-shadow)">
                      <rect x="34" y="34" width="60" height="60" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="2" />
                      <rect x="40" y="48" width="48" height="8" rx="4" fill="#EEF2FF" />
                      <rect x="40" y="62" width="48" height="8" rx="4" fill="#EEF2FF" />
                      <rect x="40" y="76" width="48" height="8" rx="4" fill="#EEF2FF" />
                      <circle cx="48" cy="52" r="4" fill="url(#operation-gradient-1)" />
                      <circle cx="48" cy="66" r="4" fill="url(#operation-gradient-2)" />
                      <circle cx="48" cy="80" r="4" fill="#A855F7" />
                      <circle cx="30" cy="40" r="12" fill="url(#operation-gradient-1)" opacity="0.6" />
                      <circle cx="98" cy="78" r="16" fill="url(#operation-gradient-2)" opacity="0.6" />
                    </g>
                  </svg>
                </div>,
                title: "便捷操作",
                description: "接入并深度融合货代系统，一句话完成所有操作"
              },
              {
                icon: <div className="w-16 h-16 flex items-center justify-center mb-2">
                  <svg viewBox="0 0 128 128" className="w-full h-full">
                    <defs>
                      <linearGradient id="stable-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F43F5E" />
                        <stop offset="100%" stopColor="#FB7185" />
                      </linearGradient>
                      <filter id="stable-shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0001" />
                      </filter>
                    </defs>
                    <circle cx="64" cy="64" r="60" fill="white" stroke="#E5E7EB" strokeWidth="2" />
                    <g filter="url(#stable-shadow)">
                      <path d="M64 28L28 76h36l-8 24 36-48H56l8-24z" fill="url(#stable-gradient)" />
                    </g>
                  </svg>
                </div>,
                title: "专业稳定",
                description: "20年行业经验积累提供专业可靠的服务"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center h-72"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(116, 102, 240, 0.2)"
                }}
              >
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 my-4">{feature.title}</h3>
                <p className="text-gray-600 text-base mt-2">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;