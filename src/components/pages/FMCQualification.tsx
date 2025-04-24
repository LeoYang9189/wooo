
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
  faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons';

const FMCQualification = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
                <div className="bg-gradient-to-r from-blue-400/90 to-indigo-500/90 p-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                    <FontAwesomeIcon icon={faFileSignature} className="text-white text-xl" />
                  </div>
                  <h3 className="text-white text-lg font-bold">申请FMC+AMS资质</h3>
                  <p className="text-blue-50 text-sm mt-1">一站式服务，同时获取两项资质</p>
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
                    className="w-full py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-all duration-300 hover:shadow-md"
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
                <div className="bg-gradient-to-r from-purple-400/90 to-pink-400/90 p-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                    <FontAwesomeIcon icon={faFileContract} className="text-white text-xl" />
                  </div>
                  <h3 className="text-white text-lg font-bold">申请FMC资质</h3>
                  <p className="text-purple-50 text-sm mt-1">美国联邦海事委员会认证</p>
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
                    className="w-full py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-all duration-300 hover:shadow-md"
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
                <div className="bg-gradient-to-r from-amber-400/90 to-orange-400/90 p-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                    <FontAwesomeIcon icon={faNetworkWired} className="text-white text-xl" />
                  </div>
                  <h3 className="text-white text-lg font-bold">申请AMS资质</h3>
                  <p className="text-amber-50 text-sm mt-1">美国海关自动舱单系统</p>
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
                    className="w-full py-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-all duration-300 hover:shadow-md"
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
                <div className="bg-gradient-to-r from-emerald-400/90 to-teal-400/90 p-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="text-white text-xl" />
                  </div>
                  <h3 className="text-white text-lg font-bold">申请海关Bond</h3>
                  <p className="text-emerald-50 text-sm mt-1">美国进口必备保证金</p>
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
                    className="w-full py-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-all duration-300 hover:shadow-md"
                  >
                    立即申请 <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 主要内容区域 */}
        <section className="py-12">
          <div className="container-custom">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">FMC资质介绍</h2>

              <div className="space-y-6">
                <p className="text-gray-700">
                  FMC（Federal Maritime Commission，联邦海事委员会）是美国政府的一个独立机构，负责监管美国的国际海运业务。任何在美国从事国际海运业务的公司，包括无船承运人(NVOCC)和海运货运代理(Ocean Freight Forwarder)，都需要获得FMC的许可。
                </p>

                <div className="border-l-4 border-primary pl-4 py-2 bg-gray-50">
                  <h3 className="font-semibold text-gray-800">FMC资质的重要性</h3>
                  <p className="text-gray-700 mt-2">
                    获得FMC资质是在美国合法经营海运业务的必要条件。没有FMC资质，公司将无法在美国提供国际海运服务，可能面临高额罚款和法律风险。
                  </p>
                </div>

                {/* 这里将根据您提供的信息添加更多内容 */}
                <p className="text-gray-700">
                  我们提供专业的FMC资质申请服务，帮助您快速获得美国联邦海事委员会的认证，合法开展美国海运业务。
                </p>
              </div>

              {/* 美国海关Bond部分 */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">美国海关Bond</h2>

                <div className="space-y-6">
                  <p className="text-gray-700">
                    美国海关Bond是一种保证金，用于确保进口商遵守美国海关法规并支付所有必要的关税和费用。任何在美国进行商业进口的企业都需要提供海关Bond。
                  </p>

                  <div className="border-l-4 border-secondary pl-4 py-2 bg-gray-50">
                    <h3 className="font-semibold text-gray-800">海关Bond的类型</h3>
                    <p className="text-gray-700 mt-2">
                      主要有单次进口Bond和连续Bond两种类型。连续Bond适用于经常进行进口的企业，有效期为一年，可以覆盖多次进口。
                    </p>
                  </div>

                  {/* 这里将根据您提供的信息添加更多内容 */}
                  <p className="text-gray-700">
                    我们提供专业的美国海关Bond申请服务，帮助您顺利完成海关清关手续，确保您的货物能够顺利进入美国市场。
                  </p>
                </div>
              </div>

              {/* 联系我们部分 */}
              <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">需要帮助？</h2>
                <p className="text-gray-700 mb-4">
                  如果您对FMC资质申请或美国海关Bond有任何疑问，或者需要专业的申请服务，请随时联系我们。
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
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FMCQualification;
