import { useState } from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  company: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      content: "飞书AI智能物流助手帮助我们优化了整个供应链流程，提高了30%的运作效率，大大降低了人为错误率。",
      author: "张明",
      role: "供应链总监",
      company: "中远海运"
    },
    {
      id: 2,
      content: "我们公司借助飞书AI伙伴实现了从订单到交付的自动跟踪，客户满意度提升了40%，是我们最得力的工作伙伴。",
      author: "李华",
      role: "运营经理",
      company: "顺丰国际"
    },
    {
      id: 3,
      content: "飞书的AI伙伴在处理国际贸易单据方面表现出色，自动化程度高，大幅减少了我们团队的文书工作量。",
      author: "王芳",
      role: "国际贸易主管",
      company: "海尔物流"
    }
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            客户<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">评价</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            了解我们的客户如何评价飞书AI智能物流解决方案
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-accent rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden">
            {/* 波浪装饰 */}
            <div className="absolute top-0 left-0 w-full h-16 opacity-50 bg-wave-pattern"></div>
            
            {/* 引号装饰 */}
            <div className="absolute top-6 left-6 text-primary opacity-20 text-6xl font-serif">"</div>
            
            {/* 内容区域 */}
            <div className="relative z-10">
              <blockquote className="text-lg md:text-xl text-gray-700 mb-6">
                {testimonials[activeIndex].content}
              </blockquote>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonials[activeIndex].author.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">{testimonials[activeIndex].author}</p>
                  <p className="text-gray-600 text-sm">{testimonials[activeIndex].role}, {testimonials[activeIndex].company}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 导航按钮 */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-primary scale-125' : 'bg-gray-300'
                }`}
                aria-label={`查看第 ${index + 1} 个客户评价`}
              />
            ))}
          </div>
          
          {/* 左右箭头 */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-5 bg-white rounded-full p-2 shadow-md text-primary hover:bg-gray-50 hidden md:block"
            aria-label="查看上一个客户评价"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-5 bg-white rounded-full p-2 shadow-md text-primary hover:bg-gray-50 hidden md:block"
            aria-label="查看下一个客户评价"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 