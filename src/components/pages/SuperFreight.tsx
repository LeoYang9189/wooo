import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShip, faTruck, faGlobe, faCoins, faSearch, faChartLine, faHandshake, faCheck, faArrowDown, faHistory, faBroadcastTower, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

// 添加CSS动画样式到head
const spinAnimationStyle = `
  @keyframes spin-slow {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
  @keyframes spin-slow-reverse {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(-360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
  .animate-spin-slow-reverse {
    animation: spin-slow-reverse 15s linear infinite;
  }

  /* 卡片纹理样式 */
  .pattern-dots {
    background-image: radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px);
    background-size: 16px 16px;
  }
  
  .pattern-lines {
    background-image: linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px);
    background-size: 100% 32px;
  }
  
  .pattern-grid {
    background-size: 40px 40px;
    background-image: 
      linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
  }
  
  .pattern-diagonal {
    background-image: repeating-linear-gradient(
      -45deg,
      rgba(0, 0, 0, 0.02),
      rgba(0, 0, 0, 0.02) 1px,
      transparent 1px,
      transparent 10px
    );
  }
`;

const SuperFreight = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 添加CSS动画 */}
      <style dangerouslySetInnerHTML={{ __html: spinAnimationStyle }} />
      
      {/* 使用公共Header组件 */}
      <Header />

      {/* 页面顶部背景区域 - 使用与首页一致的紫色渐变 */}
      <div className="relative bg-gradient-to-r from-primary to-secondary py-16 md:py-24 overflow-hidden">
        {/* 波浪形底部装饰 - 使用纯白色 */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
            <path fill="#FFFFFF" fillOpacity="1" d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>

        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* 左侧文字内容 - 添加文字阴影和更高对比度 */}
            <div className="md:w-1/2 mb-8 md:mb-0 text-white">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-6 leading-tight drop-shadow-md"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
              >
                运价产品管理是国际物流数字化的基础
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white text-base md:text-lg leading-relaxed drop-shadow-sm backdrop-blur-sm bg-black/5 p-4 rounded-lg"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
              >
                覆盖国际物流海运箱运，海运拼箱，特种箱，冷冻箱，散杂货，进口，空运服务，海铁联运，集卡陆运，敏捷等全业务场景的报价系统，数百家中大型的企业的一致选择。
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 mt-6"
              >
                <Link to="/signup" className="inline-block">
                  <button className="bg-white text-primary hover:bg-opacity-90 font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    立即使用
                  </button>
                </Link>
                <Link to="/demo" className="inline-block">
                  <button className="bg-transparent text-white border-2 border-white hover:bg-white/10 font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    预约演示
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* 右侧图形装饰 - 优化设计 */}
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="w-full h-64 md:h-80 relative">
                  {/* 中央服务器装饰 - 优化阴影和外观 */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 bg-[#8F7CFA] rounded-xl p-4 shadow-[0_10px_25px_rgba(116,102,240,0.5)] flex items-center justify-center backdrop-blur-md">
                    <div className="absolute">
                      <div className="rounded-full w-48 h-48 md:w-56 md:h-56 border-2 border-white/30 animate-spin-slow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="rounded-full w-36 h-36 md:w-44 md:h-44 border-2 border-white/40 animate-spin-slow-reverse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <div className="text-white font-bold text-center text-xl z-10 drop-shadow-md">
                      Walltech
                      <div className="text-sm font-normal mt-1">运价系统</div>
                    </div>
                  </div>
                  
                  {/* 周围方块装饰 - 优化设计和布局 */}
                  <div className="absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 rounded-md shadow-lg flex flex-col items-center justify-center text-primary text-xs p-2 backdrop-blur-md border border-[#A891FF]/30">
                    <FontAwesomeIcon icon={faSearch} className="text-primary text-lg mb-1" />
                    <span className="font-medium">智能询价</span>
                  </div>
                  <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 rounded-md shadow-lg flex flex-col items-center justify-center text-primary text-xs p-2 backdrop-blur-md border border-[#A891FF]/30">
                    <FontAwesomeIcon icon={faCoins} className="text-primary text-lg mb-1" />
                    <span className="font-medium">运价管理</span>
                  </div>
                  <div className="absolute top-2/3 right-1/5 transform translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 rounded-md shadow-lg flex flex-col items-center justify-center text-primary text-xs p-2 backdrop-blur-md border border-[#A891FF]/30">
                    <FontAwesomeIcon icon={faChartLine} className="text-primary text-lg mb-1" />
                    <span className="font-medium">趋势预测</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* 业务痛点部分 */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-center mb-16"
          >
            业务痛点
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 痛点1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
            >
              <div className="mb-5 w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:bg-purple-100 transition-colors duration-300 shadow-sm">
                <FontAwesomeIcon icon={faArrowDown} className="text-primary text-2xl group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300">报价效率太低</h3>
              <p className="text-gray-600 text-sm">
                Excel查找太麻烦，运价变化太频繁，信息不同步，无有效管理，销售把控，来回沟通效率太低，客户体验差
              </p>
              <div className="w-0 group-hover:w-full h-1 bg-primary mt-4 transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100"></div>
            </motion.div>

            {/* 痛点2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
            >
              <div className="mb-5 w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors duration-300 shadow-sm">
                <FontAwesomeIcon icon={faHistory} className="text-secondary text-2xl group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-secondary transition-colors duration-300">无历史价格</h3>
              <p className="text-gray-600 text-sm">
                无法保存历史记录，出运货物历史运价无从查起，容易产生纠纷，无历史数据支撑更无法预测未来价格变化
              </p>
              <div className="w-0 group-hover:w-full h-1 bg-secondary mt-4 transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100"></div>
            </motion.div>

            {/* 痛点3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
            >
              <div className="mb-5 w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:bg-purple-100 transition-colors duration-300 shadow-sm">
                <FontAwesomeIcon icon={faBroadcastTower} className="text-primary text-2xl group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300">传播面太窄</h3>
              <p className="text-gray-600 text-sm">
                运价没有数字化，无法系统化的通过微信，QQ，网页，三方平台等数字化渠道进行高效传播，好产品推广不出去
              </p>
              <div className="w-0 group-hover:w-full h-1 bg-primary mt-4 transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100"></div>
            </motion.div>

            {/* 痛点4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
            >
              <div className="mb-5 w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors duration-300 shadow-sm">
                <FontAwesomeIcon icon={faExchangeAlt} className="text-secondary text-2xl group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-secondary transition-colors duration-300">上下游无法对接</h3>
              <p className="text-gray-600 text-sm">
                上游主流船公司运价都已经线上化，外贸企业也在寻求报价线上化，缺少报价系统就意味着与上下游的断层
              </p>
              <div className="w-0 group-hover:w-full h-1 bg-secondary mt-4 transition-all duration-300 rounded-full opacity-0 group-hover:opacity-100"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 搜索区域 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container-custom py-16"
      >
        {/* 特点亮点 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Walltech 超级运价优势</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-blue-500 hover:shadow-md transition-shadow duration-300 h-full relative overflow-hidden group">
              <div className="absolute inset-0 pattern-dots opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faHandshake} className="text-blue-500 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">完整询报价业务流</h3>
                <p className="text-gray-600">从客户询价、内部核价到正式报价，支持完整的业务流程闭环，实现多部门协作、多角色管控，大幅提升报价效率，确保价格准确无误。</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-teal-500 hover:shadow-md transition-shadow duration-300 h-full relative overflow-hidden group">
              <div className="absolute inset-0 pattern-grid opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faCoins} className="text-teal-500 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">电商价约价智能比价</h3>
                <p className="text-gray-600">智能抓取主流电商平台运价，一键比对多家船公司报价，根据时效、价格、服务等多维度进行智能排序，帮助您快速锁定最优价格方案。</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rose-500 hover:shadow-md transition-shadow duration-300 h-full relative overflow-hidden group">
              <div className="absolute inset-0 pattern-lines opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faChartLine} className="text-rose-500 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">运价趋势预测参考</h3>
                <p className="text-gray-600">基于海量历史数据和市场因素分析，提供航线运价趋势预测，包括周度、月度走势图表，助您把握市场脉搏，在最佳时机下单，降低物流成本。</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-amber-500 hover:shadow-md transition-shadow duration-300 h-full relative overflow-hidden group">
              <div className="absolute inset-0 pattern-diagonal opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faBroadcastTower} className="text-amber-500 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">AI合约识别导入</h3>
                <p className="text-gray-600">采用先进AI识别技术，自动从合约文件中提取关键信息并导入系统，包括航线、运价、有效期等，大幅减少人工录入工作量，降低录入错误率。</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 运价产品功能模块 */}
        <div className="py-16">
          {/* 海运整箱 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* 左侧内容区 */}
              <div className="lg:w-1/2 relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">海运整箱</h2>
                <p className="text-gray-600 mb-4">
                  支持各入模包自定义，批量加减价，多层加价规则，
                  支持船公司隐藏电商，附加费自动关联，自定义模
                  集报价单，支边提单等，附加费基数权限控制。
                </p>
                <Link to="#" className="inline-block">
                  <button className="bg-gradient-to-r from-primary to-secondary text-white font-medium py-2 px-6 rounded-full hover:shadow-lg transition-all duration-300 mt-4">
                    预约演示
                  </button>
                </Link>
              </div>
              
              {/* 右侧图片展示 */}
              <div className="lg:w-1/2">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-2">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                      <div className="bg-white px-5 py-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-lg font-semibold text-gray-800">目的港</div>
                          <div className="flex space-x-1">
                            <span className="text-lg font-semibold text-gray-800">20GP</span>
                            <span className="text-lg font-semibold text-gray-800">40GP</span>
                            <span className="text-lg font-semibold text-gray-800">40HQ</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <div className="text-gray-700">HONG KONG 香港</div>
                            <div className="flex space-x-8">
                              <span className="text-gray-700">$68</span>
                              <span className="text-gray-700">$216</span>
                              <span className="text-gray-700">$216</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <div className="text-gray-700">BUSAN 釜山</div>
                            <div className="flex space-x-8">
                              <span className="text-gray-700">$68</span>
                              <span className="text-gray-700">$216</span>
                              <span className="text-gray-700">$216</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <div className="text-gray-700">HAMBURG 汉堡</div>
                            <div className="flex space-x-8">
                              <span className="text-gray-700">$84</span>
                              <span className="text-gray-700">$300</span>
                              <span className="text-gray-700">$300</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-primary/5 p-3 flex justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faShip} className="text-primary text-xs" />
                          </div>
                          <span className="text-sm text-gray-700">运价详情</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-xs text-gray-500">数据更新: 2023-05-15</span>
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faSearch} className="text-primary text-xs" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center mt-4 gap-2">
                      <div className="bg-white px-3 py-2 rounded-full text-xs text-primary shadow-sm border border-primary/20">
                        导入自定义模板
                      </div>
                      <div className="bg-white px-3 py-2 rounded-full text-xs text-primary shadow-sm border border-primary/20">
                        批量加减价
                      </div>
                      <div className="bg-white px-3 py-2 rounded-full text-xs text-primary shadow-sm border border-primary/20">
                        批量操作
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 海运拼箱 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
              {/* 右侧内容区 */}
              <div className="lg:w-1/2 relative">
                <div className="absolute -right-4 top-0 w-1 h-full bg-gradient-to-b from-secondary to-primary rounded-full"></div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">海运拼箱</h2>
                <p className="text-gray-600 mb-4">
                  支持各种体积比设置，支持目的港20多种计算规则，
                  支持各种自由混装费市场转换，自动累加，自动生
                  成报价单，支持阶的规则，让拼箱报价So easy!
                </p>
                <Link to="#" className="inline-block">
                  <button className="bg-gradient-to-r from-secondary to-primary text-white font-medium py-2 px-6 rounded-full hover:shadow-lg transition-all duration-300 mt-4">
                    预约演示
                  </button>
                </Link>
              </div>
              
              {/* 左侧图片展示 */}
              <div className="lg:w-1/2">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-2">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                      <div className="bg-white px-5 py-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-lg font-semibold text-gray-800">目的港</div>
                          <div className="flex space-x-4">
                            <span className="text-lg font-semibold text-gray-800">CBM</span>
                            <span className="text-lg font-semibold text-gray-800">TON</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <div className="text-gray-700">GENERAL SANTOS</div>
                            <div className="flex space-x-8">
                              <span className="text-gray-700">$68</span>
                              <span className="text-gray-700">$148</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <div className="text-gray-700">BUSAN</div>
                            <div className="flex space-x-8">
                              <span className="text-gray-700">$102</span>
                              <span className="text-gray-700">$211</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <div className="text-gray-700">HAMBURG</div>
                            <div className="flex space-x-8">
                              <span className="text-gray-700">$57</span>
                              <span className="text-gray-700">$300</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-secondary/5 p-3 flex justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faCoins} className="text-secondary text-xs" />
                          </div>
                          <span className="text-sm text-gray-700">币种转换</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faSearch} className="text-secondary text-xs" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <div className="bg-white px-4 py-2 rounded-lg text-xs shadow-sm border border-secondary/20 flex items-center space-x-2">
                        <span className="font-medium text-gray-700">当前币种</span>
                        <span className="text-secondary font-bold">USD</span>
                        <FontAwesomeIcon icon={faCheck} className="text-secondary text-xs" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 空运运价 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* 左侧内容区 */}
              <div className="lg:w-1/2 relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">空运运价</h2>
                <p className="text-gray-600 mb-4">
                  支持空运进出口运价，起运机场收费，目的机场收费
                  信息管理维护，个性化展示，自定义加价，对标行业
                  主流空运平台。
                </p>
                <Link to="#" className="inline-block">
                  <button className="bg-gradient-to-r from-primary to-secondary text-white font-medium py-2 px-6 rounded-full hover:shadow-lg transition-all duration-300 mt-4">
                    预约演示
                  </button>
                </Link>
              </div>
              
              {/* 右侧图片展示 */}
              <div className="lg:w-1/2">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-2">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                      <div className="bg-white px-5 py-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-lg font-semibold text-gray-800">目的机场</div>
                          <div className="flex space-x-4">
                            <span className="text-lg font-semibold text-gray-800">45KG</span>
                            <span className="text-lg font-semibold text-gray-800">100KG</span>
                            <span className="text-lg font-semibold text-gray-800">300KG</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <div className="text-gray-700">PVG 浦东机场</div>
                            <div className="flex space-x-6">
                              <span className="text-gray-700">12</span>
                              <span className="text-gray-700">12</span>
                              <span className="text-gray-700">12</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <div className="text-gray-700">HKG 香港</div>
                            <div className="flex space-x-6">
                              <span className="text-gray-700">16.34</span>
                              <span className="text-gray-700">18.5</span>
                              <span className="text-gray-700">20.3</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <div className="text-gray-700">DXB 迪拜</div>
                            <div className="flex space-x-6">
                              <span className="text-gray-700">34</span>
                              <span className="text-gray-700">28</span>
                              <span className="text-gray-700">28</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-primary/5 p-3 flex justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faTruck} className="text-primary text-xs" />
                          </div>
                          <span className="text-sm text-gray-700">空运详情</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faSearch} className="text-primary text-xs" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 mt-4">
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-primary/10 flex flex-col items-center justify-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-1">
                          <FontAwesomeIcon icon={faTruck} className="text-blue-500 text-xs" />
                        </div>
                        <span className="text-xs text-gray-600 text-center">个性化展示</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-primary/10 flex flex-col items-center justify-center">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mb-1">
                          <FontAwesomeIcon icon={faGlobe} className="text-indigo-500 text-xs" />
                        </div>
                        <span className="text-xs text-gray-600 text-center">进出口运价</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-primary/10 flex flex-col items-center justify-center">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-1">
                          <FontAwesomeIcon icon={faShip} className="text-purple-500 text-xs" />
                        </div>
                        <span className="text-xs text-gray-600 text-center">起运机场收费</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-primary/10 flex flex-col items-center justify-center">
                        <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mb-1">
                          <FontAwesomeIcon icon={faCoins} className="text-pink-500 text-xs" />
                        </div>
                        <span className="text-xs text-gray-600 text-center">目的机场收费</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-primary/10 flex flex-col items-center justify-center">
                        <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mb-1">
                          <FontAwesomeIcon icon={faChartLine} className="text-teal-500 text-xs" />
                        </div>
                        <span className="text-xs text-gray-600 text-center">自定义加价</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 现船管理 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
              {/* 右侧内容区 */}
              <div className="lg:w-1/2 relative">
                <div className="absolute -right-4 top-0 w-1 h-full bg-gradient-to-b from-secondary to-primary rounded-full"></div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">现船管理</h2>
                <p className="text-gray-600 mb-4">
                  支持现船管理，现船预定，现船审批，现船预约，
                  现船申请，现船统计，现船在线支付预定，现船利
                  润统计，让船位管理更轻松。
                </p>
                <Link to="#" className="inline-block">
                  <button className="bg-gradient-to-r from-secondary to-primary text-white font-medium py-2 px-6 rounded-full hover:shadow-lg transition-all duration-300 mt-4">
                    预约演示
                  </button>
                </Link>
              </div>
              
              {/* 左侧图片展示 */}
              <div className="lg:w-1/2">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-2">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                      <div className="bg-white px-5 py-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-lg font-semibold text-gray-800">船公司</div>
                          <div className="flex space-x-4">
                            <span className="text-lg font-semibold text-gray-800">开航日</span>
                            <span className="text-lg font-semibold text-gray-800">箱型</span>
                            <span className="text-lg font-semibold text-gray-800">单价</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <div className="text-gray-700">MSK</div>
                            <div className="flex space-x-8">
                              <span className="text-gray-700">2021-12-31</span>
                              <span className="text-gray-700">40GP</span>
                              <span className="text-gray-700">$1852</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <div className="text-gray-700">MSK</div>
                            <div className="flex space-x-8">
                              <span className="text-gray-700">2021-12-31</span>
                              <span className="text-gray-700">40GP</span>
                              <span className="text-gray-700">$1852</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between py-2">
                            <div className="text-gray-700">OOCL</div>
                            <div className="flex space-x-8">
                              <span className="text-gray-700">2021-12-31</span>
                              <span className="text-gray-700">40GP</span>
                              <span className="text-gray-700">$1685</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-secondary/5 p-3 flex justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faShip} className="text-secondary text-xs" />
                          </div>
                          <span className="text-sm text-gray-700">现船详情</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faSearch} className="text-secondary text-xs" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm mt-4 p-3 border border-secondary/20">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center text-sm text-gray-700">
                          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                            <FontAwesomeIcon icon={faCheck} className="text-blue-500 text-xs" />
                          </div>
                          <span>客户名称"明海网"预定了20GP舱位请及时查看</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                            <FontAwesomeIcon icon={faCheck} className="text-blue-500 text-xs" />
                          </div>
                          <span>客户名称"明海网"预定了40GP舱位请及时查看</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 将常见问题和CTA移到这里，放在Footer上方 */}
      <div className="container-custom py-16">
        {/* 常见问题 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">常见问题</h2>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="mb-6 border-b border-gray-200 pb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">什么是超级运价系统？</h3>
              <p className="text-gray-600">
                超级运价是Walltech开发的一套智能运价查询和比对系统，通过整合全球50多家承运商的实时运价数据，为用户提供最优的物流运输方案。
              </p>
            </div>
            
            <div className="mb-6 border-b border-gray-200 pb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">如何保证运价的准确性和实时性？</h3>
              <p className="text-gray-600">
                我们与承运商建立了API直连，每天实时更新运价数据，同时通过AI算法对数据进行验证，确保运价的准确性和实时性。
              </p>
            </div>
            
            <div className="mb-6 border-b border-gray-200 pb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">超级运价支持哪些运输方式？</h3>
              <p className="text-gray-600">
                目前支持海运整箱(FCL)和拼箱(LCL)，覆盖全球主要航线和港口。我们计划在未来扩展到空运和铁路运输。
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">如何开始使用超级运价系统？</h3>
              <p className="text-gray-600">
                您只需注册一个Walltech账户，完成简单的企业认证后即可使用。新用户还可享受限时免费试用，体验系统全部功能。
              </p>
            </div>
          </div>
        </motion.div>

        {/* 行动召唤 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-center text-white"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">开始使用Walltech超级运价</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            立即体验行业领先的智能运价系统，助力您的物流业务更高效、更经济！
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300">
              免费试用
            </button>
            <button className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300">
              了解更多
            </button>
          </div>
        </motion.div>
      </div>

      {/* 使用公共Footer组件 */}
      <Footer />
    </div>
  );
};

export default SuperFreight; 