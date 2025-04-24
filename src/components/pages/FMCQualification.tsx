
import { useState, useEffect } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShip,
  faFileAlt,
  faHandshake,
  faGlobe,
  faBuilding,
  faClipboardCheck,
  faFileInvoiceDollar,
  faFileContract,
  faArrowRight,
  faCheck,
  faLock,
  faFileSignature,
  faShieldAlt,
  faNetworkWired,
  faMoneyBillWave,
  faEye
} from '@fortawesome/free-solid-svg-icons';

const FMCQualification = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'fmc' | 'bond'>('fmc');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* 页面标题 - 炫酷版 */}
        <section className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-white py-20">
          {/* 背景图案 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 10 + 5 + 'px',
                    height: Math.random() * 10 + 5 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    opacity: Math.random() * 0.5 + 0.1
                  }}
                />
              ))}
            </div>
          </div>

          {/* 动态光效 */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full bg-white opacity-10 blur-[100px] pointer-events-none"
            style={{
              left: mousePosition.x - 250 + 'px',
              top: mousePosition.y - 250 + 'px',
              transform: 'translate(-50%, -50%)'
            }}
          />

          {/* 波浪效果 */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
              <path fill="#ffffff" fillOpacity="0.1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto absolute bottom-0">
              <path fill="#ffffff" fillOpacity="0.2" d="M0,96L48,128C96,160,192,224,288,213.3C384,203,480,117,576,101.3C672,85,768,139,864,181.3C960,224,1056,256,1152,261.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>

          <div className="container-custom relative z-10">
            {/* 图标装饰 */}
            <motion.div
              className="absolute -top-10 -left-10 text-white opacity-10 hidden md:block"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <FontAwesomeIcon icon={faShip} size="6x" />
            </motion.div>

            <motion.div
              className="absolute top-20 right-10 text-white opacity-10 hidden md:block"
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <FontAwesomeIcon icon={faGlobe} size="5x" />
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              FMC 资质与海关Bond
              <span className="absolute -top-4 -right-4 text-yellow-300 animate-pulse">
                <FontAwesomeIcon icon={faFileContract} size="xs" />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl max-w-3xl mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              美国联邦海事委员会(FMC)资质申请与美国海关Bond办理服务
            </motion.p>

            <motion.div
              className="flex items-center text-yellow-200 text-sm mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FontAwesomeIcon icon={faClipboardCheck} className="mr-2" />
              <span>专业团队 · 快速办理 · 全程服务 · 安全可靠</span>
            </motion.div>
          </div>
        </section>

        {/* 四个功能卡片 */}
        <section className="py-12 -mt-6 relative z-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 卡片1: 申请FMC+AMS资质 */}
              <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-gradient-to-r from-blue-300/80 to-indigo-400/80 p-4">
                  <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center mb-3">
                    <FontAwesomeIcon icon={faFileSignature} className="text-indigo-700 text-xl" />
                  </div>
                  <h3 className="text-indigo-800 text-lg font-bold">申请FMC+AMS资质</h3>
                  <p className="text-indigo-700 text-sm mt-1">一站式服务，同时获取两项资质</p>
                </div>
                <div className="p-5">
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1 mr-2" />
                      <span className="text-gray-700 text-sm">快速获取FMC和AMS双重资质</span>
                    </li>
                    <li className="flex items-start">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1 mr-2" />
                      <span className="text-gray-700 text-sm">专业团队全程指导</span>
                    </li>
                    <li className="flex items-start">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1 mr-2" />
                      <span className="text-gray-700 text-sm">优惠套餐价格</span>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="w-full py-2 bg-gradient-to-r from-blue-300 to-indigo-400 text-indigo-800 font-medium rounded-lg flex items-center justify-center hover:opacity-90 transition-all duration-300 hover:shadow-md"
                  >
                    立即申请 <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </button>
                </div>
              </motion.div>

              {/* 卡片2: 申请FMC资质 */}
              <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-gradient-to-r from-purple-300/80 to-pink-300/80 p-4">
                  <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center mb-3">
                    <FontAwesomeIcon icon={faFileContract} className="text-purple-700 text-xl" />
                  </div>
                  <h3 className="text-purple-800 text-lg font-bold">申请FMC资质</h3>
                  <p className="text-purple-700 text-sm mt-1">美国联邦海事委员会认证</p>
                </div>
                <div className="p-5">
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1 mr-2" />
                      <span className="text-gray-700 text-sm">合法经营海运业务的必要条件</span>
                    </li>
                    <li className="flex items-start">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1 mr-2" />
                      <span className="text-gray-700 text-sm">专业材料准备与提交</span>
                    </li>
                    <li className="flex items-start">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1 mr-2" />
                      <span className="text-gray-700 text-sm">高效审批流程</span>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="w-full py-2 bg-gradient-to-r from-purple-300 to-pink-300 text-purple-800 font-medium rounded-lg flex items-center justify-center hover:opacity-90 transition-all duration-300 hover:shadow-md"
                  >
                    立即申请 <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </button>
                </div>
              </motion.div>

              {/* 卡片3: 申请AMS资质 */}
              <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="bg-gradient-to-r from-amber-300/80 to-orange-300/80 p-4">
                  <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center mb-3">
                    <FontAwesomeIcon icon={faNetworkWired} className="text-amber-700 text-xl" />
                  </div>
                  <h3 className="text-amber-800 text-lg font-bold">申请AMS资质</h3>
                  <p className="text-amber-700 text-sm mt-1">美国海关自动舱单系统</p>
                </div>
                <div className="p-5">
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1 mr-2" />
                      <span className="text-gray-700 text-sm">提前申报货物信息</span>
                    </li>
                    <li className="flex items-start">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1 mr-2" />
                      <span className="text-gray-700 text-sm">避免货物延误和滞港</span>
                    </li>
                    <li className="flex items-start">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1 mr-2" />
                      <span className="text-gray-700 text-sm">专业团队协助申请</span>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="w-full py-2 bg-gradient-to-r from-amber-300 to-orange-300 text-amber-800 font-medium rounded-lg flex items-center justify-center hover:opacity-90 transition-all duration-300 hover:shadow-md"
                  >
                    立即申请 <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </button>
                </div>
              </motion.div>

              {/* 卡片4: 申请海关Bond */}
              <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="bg-gradient-to-r from-emerald-300/80 to-teal-300/80 p-4">
                  <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center mb-3">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="text-emerald-700 text-xl" />
                  </div>
                  <h3 className="text-emerald-800 text-lg font-bold">申请海关Bond</h3>
                  <p className="text-emerald-700 text-sm mt-1">美国进口必备保证金</p>
                </div>
                <div className="p-5">
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1 mr-2" />
                      <span className="text-gray-700 text-sm">单次和连续Bond申请</span>
                    </li>
                    <li className="flex items-start">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1 mr-2" />
                      <span className="text-gray-700 text-sm">快速办理，高效审批</span>
                    </li>
                    <li className="flex items-start">
                      <FontAwesomeIcon icon={faCheck} className="text-green-500 mt-1 mr-2" />
                      <span className="text-gray-700 text-sm">专业咨询与指导</span>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="w-full py-2 bg-gradient-to-r from-emerald-300 to-teal-300 text-emerald-800 font-medium rounded-lg flex items-center justify-center hover:opacity-90 transition-all duration-300 hover:shadow-md"
                  >
                    立即申请 <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 主要内容区域 - 带Tab切换 */}
        <section className="py-12">
          <div className="container-custom">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              {/* Tab切换按钮 */}
              <div className="flex border-b border-gray-200 mb-8">
                <button
                  type="button"
                  className={`py-3 px-6 font-medium text-lg border-b-2 transition-colors duration-200 ${
                    activeTab === 'fmc'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('fmc')}
                >
                  FMC资质介绍
                </button>
                <button
                  type="button"
                  className={`py-3 px-6 font-medium text-lg border-b-2 transition-colors duration-200 ${
                    activeTab === 'bond'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('bond')}
                >
                  海关Bond介绍
                </button>
              </div>

              {/* FMC资质介绍内容 */}
              <div className={`space-y-8 ${activeTab === 'fmc' ? 'block' : 'hidden'}`}>
                {/* 什么是FMC部分 */}
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6">什么是FMC?</h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      FMC是美国联邦海事委员会(Federal Maritime Commission)的简称，总部设在华盛顿，兼具行政立法、准司法和执法三种职能，掌管和监管以美国为起点或的以集装箱海运为主的水上商业活动，海运承运人和经纪人均受其监管。
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      根据美国联邦海事委员会规定，企业在美国发起单从事进出美国港口的无船承运货运业务，须预先向美国联邦海事委员会申请并取得美国无船承运人资质。
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      目前JCtrans客户已有多家非美国公司成功申请到该资质，实现与当地船公司签订合约价、自主发送AMS/ISF等申报信息。
                    </p>
                  </div>
                </div>

                {/* 为什么要申请FMC部分 */}
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6">为什么要申请FMC?</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* 优势1 */}
                    <div className="bg-blue-500 text-white p-6 rounded-lg">
                      <div className="flex items-center justify-center h-full">
                        <p className="text-center font-medium">
                          合法合规地从事美国无船承运人业务，享受担保；
                        </p>
                      </div>
                    </div>

                    {/* 优势2 */}
                    <div className="bg-blue-400 text-white p-6 rounded-lg">
                      <div className="flex items-center justify-center h-full">
                        <p className="text-center font-medium">
                          可以直接跟船司订舱，能签发拥有自己抬头的提单，不用找一代/上层代理订舱单，可拥有更优惠的合约运价"Contract Rate"；
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      FMC资质备案有助于提升公司的信誉度和市场竞争力。在航运物流领域，信任是至关重要的。通过完成FMC资质备案，公司可以向潜在客户和合作伙伴展示其合规性和专业性，从而赢得他们的信任和青睐。此外，这也是公司展示自身实力，扩大市场份额、提升品牌形象的重要途径。
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      另外，FMC资质备案有助于公司与美国本土企业建立更紧密的合作关系。在美国市场，与当地企业建立合作关系是开展业务的关键。而拥有FMC资质备案的公司，更容易获得美国本土企业的认可和信任，从而与其建立长期稳定的合作关系。
                    </p>
                  </div>
                </div>

                {/* FMC资质及AMS资质的作用 */}
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6">FMC资质（OTI-NVOCC Lisence）及AMS资质的作用（具体业务）</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* 作用1 */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start mb-3">
                        <span className="text-primary font-bold text-xl mr-3">01.</span>
                        <p className="text-gray-700">
                          合法合规地从事美国无船承运人业务，为托运人签发提单，提升企业核心竞争力。
                        </p>
                      </div>
                    </div>

                    {/* 作用2 */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start mb-3">
                        <span className="text-primary font-bold text-xl mr-3">02.</span>
                        <p className="text-gray-700">
                          企业无需通过船代或是一代，可直接与船东以及美国资代开展业务。
                        </p>
                      </div>
                    </div>

                    {/* 作用3 */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start mb-3">
                        <span className="text-primary font-bold text-xl mr-3">03.</span>
                        <p className="text-gray-700">
                          企业通过运价信息，可以直接和船东询价采购到最优价格并再次销售。
                        </p>
                      </div>
                    </div>

                    {/* 作用4 */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start mb-3">
                        <span className="text-primary font-bold text-xl mr-3">04.</span>
                        <p className="text-gray-700">
                          与潜在发货人开发租船业务。
                        </p>
                      </div>
                    </div>

                    {/* 作用5 */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start mb-3">
                        <span className="text-primary font-bold text-xl mr-3">05.</span>
                        <p className="text-gray-700">
                          签发提单或同等文件。
                        </p>
                      </div>
                    </div>

                    {/* 作用6 */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start mb-3">
                        <span className="text-primary font-bold text-xl mr-3">06.</span>
                        <p className="text-gray-700">
                          租赁集装箱。
                        </p>
                      </div>
                    </div>

                    {/* 作用7 */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start mb-3">
                        <span className="text-primary font-bold text-xl mr-3">07.</span>
                        <p className="text-gray-700">
                          拥有24小时申报服务系统提交AMS/ISF等，时间更可控、更灵活。
                        </p>
                      </div>
                    </div>

                    {/* 作用8 */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start mb-3">
                        <span className="text-primary font-bold text-xl mr-3">08.</span>
                        <p className="text-gray-700">
                          随时掌握货物报关、清关状态、货物信息。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FMC所含具体项目 */}
                <div className="relative">
                  <h2 className="text-2xl font-bold text-gray-800 mb-8">FMC 所含具体项目</h2>

                  <div className="mb-8">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      在包含以下全部项目的基础上，我们为您提供包含以下全部项目的，质优价廉的FMC申请服务
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      费用一次收取，绝无后续隐藏费用
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-8">
                      现在联系我们，为您提供超时优惠价格
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-full text-white mr-3">
                          <FontAwesomeIcon icon={faFileAlt} />
                        </div>
                        <span className="font-medium text-gray-700">广覆盖</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full text-white mr-3">
                          <FontAwesomeIcon icon={faCheck} />
                        </div>
                        <span className="font-medium text-gray-700">高质量</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center bg-blue-400 rounded-full text-white mr-3">
                          <FontAwesomeIcon icon={faMoneyBillWave} />
                        </div>
                        <span className="font-medium text-gray-700">低价格</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-full text-white mr-3">
                          <FontAwesomeIcon icon={faEye} />
                        </div>
                        <span className="font-medium text-gray-700">透明费用</span>
                      </div>
                    </div>
                  </div>

                  {/* 便当盒式布局 */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* 左侧卡片 */}
                    <div className="md:col-span-5 flex flex-col gap-6">
                      {/* 申请项目卡片 */}
                      <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">申请项目</h3>
                        <p className="text-primary font-medium">FMC资质（OTI-NVOCC Lisence）</p>
                      </div>

                      {/* 时间卡片 */}
                      <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">时间（参考）</h3>
                        <p className="text-gray-700 text-lg">15个工作日</p>
                      </div>
                    </div>

                    {/* 右侧卡片 */}
                    <div className="md:col-span-7 flex flex-col gap-6">
                      {/* 申请目的卡片 */}
                      <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">申请目的</h3>
                        <p className="text-gray-700">办理完成后可以在美线业务中签发无船承运人提单</p>
                      </div>

                      {/* 具体事项及流程卡片 */}
                      <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">具体事项及流程</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-start mb-3">
                              <span className="text-blue-600 font-bold mr-2">01.</span>
                              <p className="text-gray-700">FMC BOND</p>
                            </div>

                            <div className="flex items-start mb-3">
                              <span className="text-blue-600 font-bold mr-2">02.</span>
                              <p className="text-gray-700">FMC登记（FMC-1/FMC-65）</p>
                            </div>

                            <div className="flex items-start mb-3">
                              <span className="text-blue-600 font-bold mr-2">03.</span>
                              <p className="text-gray-700">FMC申请授权（LOA）</p>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-start mb-3">
                              <span className="text-blue-600 font-bold mr-2">04.</span>
                              <p className="text-gray-700">提单审核</p>
                            </div>

                            <div className="flex items-start mb-3">
                              <span className="text-blue-600 font-bold mr-2">05.</span>
                              <p className="text-gray-700">数据库维护年费</p>
                            </div>

                            <div className="flex items-start mb-3">
                              <span className="text-blue-600 font-bold mr-2">06.</span>
                              <p className="text-gray-700">开通运价备案系统账户</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 背景装饰 */}
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500 opacity-10 rounded-r-lg -z-10"></div>
                </div>

                {/* 联系我们部分 */}
                <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">需要帮助？</h2>
                  <p className="text-gray-700 mb-4">
                    如果您对FMC资质申请有任何疑问，或者需要专业的申请服务，请随时联系我们。
                  </p>
                  <button
                    type="button"
                    className="btn-primary"
                  >
                    联系我们
                  </button>
                </div>
              </div>

              {/* 海关Bond介绍内容 */}
              <div className={`space-y-8 ${activeTab === 'bond' ? 'block' : 'hidden'}`}>
                {/* 什么是海关Bond部分 */}
                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-6">什么是海关Bond?</h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      美国海关Bond是一种保证金，用于确保进口商遵守美国海关法规并支付所有必要的关税和费用。任何在美国进行商业进口的企业都需要提供海关Bond。
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      海关Bond是美国海关与边境保护局(CBP)要求的一种担保形式，它保证进口商将遵守所有适用的法律法规，并支付所有应缴的关税、税费和罚款。
                    </p>
                  </div>
                </div>

                {/* 海关Bond的类型 */}
                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-6">海关Bond的类型</h2>

                  <div className="border-l-4 border-secondary pl-4 py-3 bg-gray-50 mb-6">
                    <h3 className="font-semibold text-gray-800">主要有两种类型的海关Bond：</h3>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start">
                        <span className="text-secondary font-bold mr-2">•</span>
                        <div>
                          <span className="font-medium">单次进口Bond (Single Entry Bond)：</span>
                          <span className="text-gray-700">适用于偶尔进行进口的企业，每次进口都需要单独申请。</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-secondary font-bold mr-2">•</span>
                        <div>
                          <span className="font-medium">连续Bond (Continuous Bond)：</span>
                          <span className="text-gray-700">适用于经常进行进口的企业，有效期为一年，可以覆盖多次进口。</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    大多数进口商选择连续Bond，因为它更加方便，不需要为每次进口单独申请Bond。连续Bond的金额通常基于过去一年支付的关税、税费和费用的10%计算，最低金额为50,000美元。
                  </p>
                </div>

                {/* 为什么需要海关Bond */}
                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-6">为什么需要海关Bond?</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* 原因1 */}
                    <div className="bg-teal-500 text-white p-6 rounded-lg">
                      <div className="flex items-center justify-center h-full">
                        <p className="text-center font-medium">
                          美国法律要求：所有商业进口都必须提供海关Bond，这是法律强制要求的。
                        </p>
                      </div>
                    </div>

                    {/* 原因2 */}
                    <div className="bg-teal-400 text-white p-6 rounded-lg">
                      <div className="flex items-center justify-center h-full">
                        <p className="text-center font-medium">
                          保障进口流程：有了海关Bond，您的货物清关过程将更加顺畅，避免不必要的延误。
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    海关Bond不仅是法律要求，也是保护您业务的重要工具。它确保您的进口流程符合美国海关的所有要求，避免因违规而导致的罚款和货物扣留。
                  </p>
                </div>

                {/* 联系我们部分 */}
                <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">需要帮助？</h2>
                  <p className="text-gray-700 mb-4">
                    如果您对美国海关Bond申请有任何疑问，或者需要专业的申请服务，请随时联系我们。
                  </p>
                  <button
                    type="button"
                    className="btn-primary"
                  >
                    联系我们
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FMCQualification;
