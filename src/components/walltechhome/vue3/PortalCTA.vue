<template>
  <section class="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-4xl font-bold text-white mb-4">准备开始您的智能物流之旅？</h2>
      <p class="text-xl text-blue-100 mb-8">立即体验WallTech控制塔系统，感受AI赋能的物流管理</p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          class="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
          @click="handleGetStarted"
        >
          立即开始
        </button>
        <button 
          class="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
          @click="handleContact"
        >
          联系我们
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 事件处理函数
const handleGetStarted = () => {
  console.log('立即开始')
}

const handleContact = () => {
  console.log('联系我们')
}
</script>

<style scoped>
/* PortalCTA特定样式 */
</style> 