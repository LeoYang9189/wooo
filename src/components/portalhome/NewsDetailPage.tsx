import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@arco-design/web-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faEye, faUser, faArrowLeft, faShare, faBookmark } from '@fortawesome/free-solid-svg-icons';
import PortalHeader from './PortalHeader';
import PortalFooter from './PortalFooter';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: string;
  image: string;
  views: number;
  isHot?: boolean;
  author: string;
}

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock 新闻数据（与列表页保持一致）
  const newsData: NewsItem[] = [
    {
      id: '1',
      title: '数字化转型助力国际物流业高质量发展',
      summary: '随着人工智能、大数据等技术的广泛应用，国际物流行业正迎来数字化转型的新机遇。',
      content: `
        <div class="prose max-w-none">
          <p>在全球化深入发展的今天，国际物流业正面临着前所未有的机遇与挑战。随着人工智能、大数据、云计算等新兴技术的快速发展，物流行业的数字化转型已成为不可逆转的趋势。</p>
          
          <h3>技术驱动的转型浪潮</h3>
          <p>智慧物流平台通过整合各类资源，实现了从订单管理到配送跟踪的全流程数字化。通过AI算法优化运输路径，大数据分析预测货物需求，IoT设备实时监控货物状态，整个物流生态系统的效率得到了显著提升。</p>
          
          <h3>降本增效的显著成果</h3>
          <p>数据显示，采用数字化管理系统的物流企业，运营成本平均降低了15-25%，配送效率提升了30%以上。智能仓储系统通过机器人自动分拣，将人工成本降低了40%，同时大大减少了错误率。</p>
          
          <h3>面临的挑战与机遇</h3>
          <p>尽管数字化转型带来了诸多优势，但也面临着数据安全、技术投入成本高、人才缺乏等挑战。企业需要制定合理的转型策略，循序渐进地推进数字化进程。</p>
          
          <h3>未来发展趋势</h3>
          <p>随着5G、区块链等技术的成熟应用，物流行业将迎来更加深刻的变革。预计到2030年，全球智慧物流市场规模将达到6万亿美元，中国作为全球最大的物流市场，将在这一转型中发挥重要作用。</p>
          
          <blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600">
            "数字化转型不仅仅是技术的升级，更是思维模式和运营理念的根本转变。只有真正理解并拥抱这种变化，企业才能在激烈的市场竞争中立于不败之地。"
          </blockquote>
          
          <p>总之，数字化转型为国际物流业带来了新的发展机遇。企业应当积极拥抱技术变革，加大研发投入，培养专业人才，以实现可持续的高质量发展。</p>
        </div>
      `,
      date: '2025-01-15',
      category: '行业动态',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      views: 1250,
      isHot: true,
      author: '李明'
    },
    // 更多文章数据...
  ];

  const currentNews = newsData.find(news => news.id === id);

  if (!currentNews) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">文章未找到</h2>
          <p className="text-gray-600 mb-6">您访问的文章可能已被删除或不存在</p>
          <Button type="primary" onClick={() => navigate('/portal/news')}>
            返回资讯列表
          </Button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/portal/news');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentNews.title,
        text: currentNews.summary,
        url: window.location.href,
      });
    } else {
      // 复制到剪贴板
      navigator.clipboard.writeText(window.location.href);
      alert('链接已复制到剪贴板');
    }
  };

  const handleBookmark = () => {
    // 模拟收藏功能
    alert('文章已收藏');
  };

  // 推荐文章（简单实现）
  const recommendedNews = newsData.filter(news => 
    news.id !== currentNews.id && news.category === currentNews.category
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalHeader />
      
      {/* 文章头部 */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <button 
            onClick={handleBack}
            className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            返回资讯列表
          </button>
          
          {/* 分类标签 */}
          <div className="flex items-center space-x-4 mb-4">
            <span className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full">
              {currentNews.category}
            </span>
            {currentNews.isHot && (
              <span className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-full animate-pulse">
                热门文章
              </span>
            )}
          </div>
          
          {/* 文章标题 */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {currentNews.title}
          </h1>
          
          {/* 文章元信息 */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
            <span className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500" />
              {currentNews.author}
            </span>
            <span className="flex items-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-green-500" />
              {currentNews.date}
            </span>
            <span className="flex items-center">
              <FontAwesomeIcon icon={faEye} className="mr-2 text-purple-500" />
              {currentNews.views} 次阅读
            </span>
          </div>
          
          {/* 操作按钮 */}
          <div className="flex items-center space-x-4">
            <Button 
              type="outline" 
              icon={<FontAwesomeIcon icon={faShare} />}
              onClick={handleShare}
            >
              分享
            </Button>
            <Button 
              type="outline" 
              icon={<FontAwesomeIcon icon={faBookmark} />}
              onClick={handleBookmark}
            >
              收藏
            </Button>
          </div>
        </div>
      </div>

      {/* 文章内容 */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* 主要内容 */}
            <div className="lg:col-span-3">
              <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* 文章图片 */}
                <img
                  src={currentNews.image}
                  alt={currentNews.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                
                {/* 文章正文 */}
                <div className="p-8">
                  {/* 摘要 */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">文章摘要</h3>
                    <p className="text-blue-800">{currentNews.summary}</p>
                  </div>
                  
                  {/* 正文内容 */}
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: currentNews.content }}
                  />
                  
                  {/* 文章底部 */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        最后更新：{currentNews.date}
                      </div>
                      <div className="flex items-center space-x-4">
                        <Button 
                          type="primary" 
                          icon={<FontAwesomeIcon icon={faShare} />}
                          onClick={handleShare}
                        >
                          分享文章
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* 侧边栏 */}
            <div className="lg:col-span-1">
              {/* 推荐阅读 */}
              {recommendedNews.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">推荐阅读</h3>
                  <div className="space-y-4">
                    {recommendedNews.map((news) => (
                      <div
                        key={news.id}
                        onClick={() => navigate(`/portal/news/${news.id}`)}
                        className="group cursor-pointer"
                      >
                        <div className="flex space-x-3">
                          <img
                            src={news.image}
                            alt={news.title}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0 group-hover:opacity-80 transition-opacity duration-300"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                              {news.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {news.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* 联系我们 */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">联系我们</h3>
                <p className="text-blue-100 text-sm mb-4">
                  想了解更多物流行业资讯？欢迎关注我们的官方账号
                </p>
                <Button 
                  type="primary" 
                  className="w-full bg-white text-blue-600 border-0 hover:bg-blue-50"
                  onClick={() => navigate('/portal/auth')}
                >
                  立即体验
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PortalFooter />
    </div>
  );
};

export default NewsDetailPage; 