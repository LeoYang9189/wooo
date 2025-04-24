
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { motion } from 'framer-motion';

const FMCQualification = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* 页面标题 */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
          <div className="container-custom">
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              FMC资质
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              美国联邦海事委员会(FMC)资质申请与美国海关Bond办理服务
            </motion.p>
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
                <button className="btn-primary">
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
