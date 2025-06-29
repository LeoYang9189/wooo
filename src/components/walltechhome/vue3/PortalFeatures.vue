<template>
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">八大核心功能</h2>
        <p class="text-xl text-gray-600">强大的功能模块，全面提升物流管理效率</p>
      </div>
      
      <!-- 小卡片网格 -->
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
        <div
          v-for="feature in features"
          :key="feature.id"
          @click="selectFeature(feature.id)"
          :class="[
            'group relative p-6 text-center cursor-pointer transition-all duration-300 transform',
            'bg-gradient-to-br from-blue-50/80 via-white to-purple-50/80',
            'border border-gray-200/50 backdrop-blur-sm',
            'hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25',
            'before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-400/10 before:to-purple-400/10 before:opacity-0 before:transition-opacity before:duration-300',
            'hover:before:opacity-100',
            selectedFeatureId === feature.id ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/30' : ''
          ]"
        >
          <!-- 移除图标的方形底框，直接显示图标 -->
          <div class="mb-4 flex justify-center">
            <i :class="feature.icon" class="text-3xl text-blue-600"></i>
          </div>
          <h3 class="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {{ feature.title }}
          </h3>
          
          <!-- 微光动画效果 -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
          </div>
        </div>
      </div>
      
      <!-- 大卡片详细展示 -->
      <div v-if="selectedFeature" class="relative">
        <!-- 添加装饰性背景元素 -->
        <div class="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        <div class="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
        
        <div class="relative bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
          <!-- 装饰性顶部条纹 -->
          <div class="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 p-8">
            <!-- 左侧内容区 (2/5) -->
            <div class="lg:col-span-2 space-y-6">
              <!-- 移除图标的方形底框 -->
              <div class="flex items-center space-x-4">
                <i :class="selectedFeature.icon" class="text-4xl text-blue-600"></i>
                <h3 class="text-2xl font-bold text-gray-900">{{ selectedFeature.title }}</h3>
              </div>
              
              <p class="text-gray-600 leading-relaxed">{{ selectedFeature.description }}</p>
              
              <div class="space-y-3">
                <h4 class="font-semibold text-gray-900 flex items-center">
                  <i class="fas fa-star text-yellow-500 mr-2"></i>
                  核心特性
                </h4>
                <ul class="space-y-2">
                  <li v-for="point in selectedFeature.keyPoints" :key="point" 
                      class="flex items-start space-x-3 text-sm text-gray-600">
                    <i class="fas fa-check-circle text-green-500 mt-1 flex-shrink-0"></i>
                    <span>{{ point }}</span>
                  </li>
                </ul>
              </div>
              
              <!-- 修改按钮：去掉圆角，删除了解更多按钮 -->
              <div class="pt-4">
                <button
                  @click="openLeadForm"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold transition-colors shadow-lg hover:shadow-xl"
                >
                  立即体验
                </button>
              </div>
            </div>
            
            <!-- 右侧视频区 (3/5) -->
            <div class="lg:col-span-3">
              <div class="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
                <video
                  :src="selectedFeature.videoUrl"
                  class="w-full h-auto"
                  controls
                  autoplay
                  muted
                  loop
                  :poster="selectedFeature.posterUrl"
                >
                  您的浏览器不支持视频播放。
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 默认提示 -->
      <div v-else class="mt-16 text-center py-12">
        <i class="fas fa-mouse-pointer text-4xl text-gray-400 mb-4"></i>
        <p class="text-xl text-gray-500">点击上方功能卡片查看详细介绍</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// @ts-ignore
import { ref, computed } from 'vue'

// 定义emit
const emit = defineEmits(['openLeadForm'])

// 选中的功能ID
const selectedFeatureId = ref<number>(1)

// 8大核心功能数据
const features = [
  {
    id: 1,
    title: 'BI面板',
    icon: 'fas fa-chart-line',
    description: '全方位数据可视化，实时掌握业务动态，智能分析助力决策优化。',
    keyPoints: [
      '实时数据监控与分析',
      '多维度业务指标展示',
      '智能预警与异常检测',
      '自定义报表与图表'
    ],
    videoUrl: '/qrcodes/video/BI.mp4',
    posterUrl: '/assets/v2_snyjmq-Lh_sDSg4.png'
  },
  {
    id: 2,
    title: '询价管理',
    icon: 'fas fa-file-invoice-dollar',
    description: '智能询价系统，快速响应客户需求，提升报价效率和准确性。',
    keyPoints: [
      '一键智能询价',
      '多供应商比价',
      '历史价格分析',
      '自动报价生成'
    ],
    videoUrl: '/qrcodes/video/BI.mp4',
    posterUrl: '/assets/v2_snyjmq-Lh_sDSg4.png'
  },
  {
    id: 3,
    title: '订单管理',
    icon: 'fas fa-clipboard-list',
    description: '全生命周期订单跟踪，从下单到交付的完整流程管理。',
    keyPoints: [
      '订单全程跟踪',
      '状态实时更新',
      '异常自动提醒',
      '批量操作处理'
    ],
    videoUrl: '/qrcodes/video/BI.mp4',
    posterUrl: '/assets/v2_snyjmq-Lh_sDSg4.png'
  },
  {
    id: 4,
    title: '船期查询',
    icon: 'fas fa-ship',
    description: '实时船期信息查询，精准掌握货物运输时间安排。',
    keyPoints: [
      '全球船期实时查询',
      '多航线对比分析',
      '延误预警通知',
      '最优路线推荐'
    ],
    videoUrl: '/qrcodes/video/BI.mp4',
    posterUrl: '/assets/v2_snyjmq-Lh_sDSg4.png'
  },
  {
    id: 5,
    title: '费率查询',
    icon: 'fas fa-calculator',
    description: '透明费率体系，快速查询各项费用，成本控制更精准。',
    keyPoints: [
      '实时费率查询',
      '多币种支持',
      '费用明细展示',
      '成本分析报告'
    ],
    videoUrl: '/qrcodes/video/BI.mp4',
    posterUrl: '/assets/v2_snyjmq-Lh_sDSg4.png'
  },
  {
    id: 6,
    title: '报关管理',
    icon: 'fas fa-file-alt',
    description: '智能报关流程，简化手续办理，提升通关效率。',
    keyPoints: [
      '智能报关单生成',
      '合规性自动检查',
      '进度实时跟踪',
      '文档电子化管理'
    ],
    videoUrl: '/qrcodes/video/BI.mp4',
    posterUrl: '/assets/v2_snyjmq-Lh_sDSg4.png'
  },
  {
    id: 7,
    title: '财务管理',
    icon: 'fas fa-coins',
    description: '完整财务解决方案，从开票到收付款的全流程管理。',
    keyPoints: [
      '自动化账单生成',
      '多币种结算',
      '应收应付管理',
      '财务报表分析'
    ],
    videoUrl: '/qrcodes/video/BI.mp4',
    posterUrl: '/assets/v2_snyjmq-Lh_sDSg4.png'
  },
  {
    id: 8,
    title: '客户管理',
    icon: 'fas fa-users',
    description: '360度客户视图，深度了解客户需求，提升服务质量。',
    keyPoints: [
      '客户档案管理',
      '服务历史跟踪',
      '需求分析预测',
      '满意度调查'
    ],
    videoUrl: '/qrcodes/video/BI.mp4',
    posterUrl: '/assets/v2_snyjmq-Lh_sDSg4.png'
  }
]

// 计算当前选中的功能
const selectedFeature = computed(() => {
  return features.find(f => f.id === selectedFeatureId.value) || null
})

// 选择功能
const selectFeature = (id: number) => {
  selectedFeatureId.value = id
}

// 打开留资表单
const openLeadForm = () => {
  emit('openLeadForm')
}
</script>

<style scoped>
/* PortalFeatures特定样式 */
.animate-slideUp {
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 微光效果动画 */
.shimmer-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);
  opacity: 0;
  transform: translateX(-100%);
  transition: opacity 0.3s ease;
  pointer-events: none;
  animation: shimmer 2s infinite;
}

.group:hover .shimmer-effect {
  opacity: 1;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* 卡片悬浮阴影优化 */
.group:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
              0 10px 10px -5px rgba(0, 0, 0, 0.04),
              0 0 0 1px rgba(59, 130, 246, 0.05);
}

/* 选中状态的特殊效果 */
.group.ring-2 {
  box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25),
              0 0 0 2px rgba(59, 130, 246, 0.5);
}

/* 响应式优化 */
@media (max-width: 1024px) {
  .grid-cols-4 {
    gap: 0.75rem;
  }
}

@media (max-width: 768px) {
  .grid-cols-4 .group {
    padding: 0.75rem;
  }
  
  .grid-cols-4 h3 {
    font-size: 0.75rem;
    line-height: 1;
  }
  
  .grid-cols-4 .w-12 {
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style> 