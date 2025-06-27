<template>
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">八大核心功能</h2>
        <p class="text-xl text-gray-600">强大的功能模块，全面提升物流管理效率</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div class="text-center">
            <i :class="`${feature.icon} text-4xl text-blue-600 mb-4`"></i>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const features = ref([
  {
    title: "智能BI面板",
    description: "实时数据分析与可视化",
    icon: "fas fa-chart-bar"
  },
  {
    title: "AI智能助手",
    description: "24/7在线智能解答",
    icon: "fas fa-robot"
  },
  {
    title: "灵活部署",
    description: "云端和本地部署支持",
    icon: "fas fa-cloud"
  },
  {
    title: "权限体系",
    description: "完整组织架构权限管理",
    icon: "fas fa-users-cog"
  },
  {
    title: "API整合",
    description: "完善第三方系统对接",
    icon: "fas fa-plug"
  },
  {
    title: "AI识别",
    description: "强大文档识别与数据提取",
    icon: "fas fa-eye"
  },
  {
    title: "询价报价",
    description: "功能齐全的报价管理系统",
    icon: "fas fa-calculator"
  },
  {
    title: "订单协作",
    description: "高度协同的订单履约管理",
    icon: "fas fa-handshake"
  }
])
</script>

<style scoped>
/* PortalFeatures特定样式 */
</style> 