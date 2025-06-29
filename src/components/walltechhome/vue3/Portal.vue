<template>
  <div class="min-h-screen bg-white">
    <PortalHeader />
    <main>
      <PortalHero @open-lead-form="showLeadForm = true" />
      <PortalFeatures />
      <PortalFeatureDetail />
      <PortalTechSpecs />
      <PortalCTA />
    </main>
    <PortalFooter />
    
    <!-- 留资弹窗 -->
    <div v-if="showLeadForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h3 class="text-2xl font-bold text-gray-800 mb-6">获取产品演示</h3>
        <form @submit.prevent="handleSubmitForm">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
              <input 
                v-model="formData.name"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">公司</label>
              <input 
                v-model="formData.company"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">电话</label>
              <input 
                v-model="formData.phone"
                type="tel" 
                class="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
              <input 
                v-model="formData.email"
                type="email" 
                class="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
            </div>
          </div>
          <div class="flex gap-4 mt-6">
            <button 
              type="submit"
              class="flex-1 bg-blue-600 text-white py-2 hover:bg-blue-700 transition-colors"
            >
              提交
            </button>
            <button 
              type="button"
              @click="showLeadForm = false"
              class="flex-1 border border-gray-300 text-gray-700 py-2 hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { ref, reactive } from 'vue'
import PortalHeader from './PortalHeader.vue'
import PortalFooter from './PortalFooter.vue'
import PortalHero from './PortalHero.vue'
import PortalFeatures from './PortalFeatures.vue'
import PortalFeatureDetail from './PortalFeatureDetail.vue'
import PortalTechSpecs from './PortalTechSpecs.vue'
import PortalCTA from './PortalCTA.vue'
import './PortalStyles.css'

// 留资弹窗状态
const showLeadForm = ref(false)

// 表单数据
const formData = reactive({
  name: '',
  company: '',
  phone: '',
  email: ''
})

// 提交表单
const handleSubmitForm = () => {
  console.log('提交表单数据:', formData)
  // 这里可以添加实际的提交逻辑
  alert('提交成功！我们会尽快与您联系。')
  showLeadForm.value = false
  // 重置表单
  formData.name = ''
  formData.company = ''
  formData.phone = ''
  formData.email = ''
}
</script>

<style scoped>
/* Portal特定样式 */
</style> 