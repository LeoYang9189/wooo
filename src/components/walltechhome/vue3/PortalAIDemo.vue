<template>
  <section class="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">无处不在的AI</h2>
        <p class="text-xl text-gray-600">AI助手在各个业务场景中为您提供智能支持</p>
      </div>
      
      <!-- Tab切换按钮 -->
      <div class="flex justify-center mb-8">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-purple-200/50">
          <div class="flex gap-2">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              @click="selectTab(index)"
              :class="[
                'px-6 py-3 rounded-xl font-medium transition-all duration-300',
                selectedTab === index
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              ]"
            >
              <i :class="tab.icon" class="mr-2"></i>
              {{ tab.title }}
            </button>
          </div>
        </div>
      </div>

      <!-- AI对话演示区域 -->
      <div class="max-w-4xl mx-auto">
        <div 
          class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-200/50 overflow-hidden"
          style="height: 600px;"
        >
          <!-- 对话框头部 -->
          <div class="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 px-6 py-4 border-b border-purple-200/50">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center mr-3 shadow-md">
                  <img src="/assets/g6qmm-vsolk.gif" alt="AI助手" class="w-full h-full object-cover" />
                </div>
                <div>
                  <div class="text-lg font-medium text-gray-800">{{ tabs[selectedTab].title }}AI助手</div>
                  <div class="text-sm text-purple-600">{{ tabs[selectedTab].description }}</div>
                </div>
              </div>
                             <div class="flex items-center space-x-2">
                 <button 
                   @click="resetDemo"
                   class="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                 >
                   <i class="fas fa-refresh mr-2"></i>
                   重新演示
                 </button>
               </div>
            </div>
          </div>

          <!-- 消息区域 -->
          <div class="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white via-blue-50/20 to-purple-50/10" style="height: calc(600px - 140px);">
                         <!-- 欢迎消息 -->
             <div v-if="messages.length === 0 && !isPlaying" class="flex justify-center items-center h-full">
               <div class="text-center">
                 <div class="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center mx-auto mb-4 shadow-lg">
                   <img src="/assets/g6qmm-vsolk.gif" alt="AI助手" class="w-full h-full object-cover" />
                 </div>
                 <h3 class="text-xl font-medium text-gray-800 mb-2">{{ tabs[selectedTab].title }}AI助手</h3>
                 <p class="text-gray-600 mb-4">{{ tabs[selectedTab].welcomeMessage }}</p>
                 <div class="flex items-center justify-center">
                   <i class="fas fa-spinner fa-spin text-blue-500 mr-2"></i>
                   <span class="text-gray-600">AI演示即将开始...</span>
                 </div>
               </div>
             </div>

            <!-- 对话消息 -->
            <div v-for="(message, index) in messages" :key="index" :class="['flex mb-4', message.isUser ? 'justify-end' : 'justify-start']">
              <div v-if="!message.isUser" class="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center mr-3 flex-shrink-0 shadow-sm">
                <img src="/assets/g6qmm-vsolk.gif" alt="AI" class="w-full h-full object-cover" />
              </div>
              <div :class="['max-w-[80%]', message.isUser ? 'flex justify-end' : '']">
                <div :class="[
                  'px-4 py-3 rounded-2xl',
                  message.isUser 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-md' 
                    : 'bg-white text-gray-700 border border-gray-200 rounded-bl-md shadow-sm'
                ]">
                  <div v-if="message.type === 'price-list'" class="space-y-3">
                    <div class="font-medium mb-3">为您找到以下运价选项：</div>
                                         <div v-for="(price, idx) in message.priceData" :key="idx" class="bg-blue-50 rounded-lg p-3 border border-blue-200">
                       <div class="flex justify-between items-start mb-3">
                         <div class="font-medium text-blue-800">{{ price.carrier }}</div>
                         <div class="text-right">
                           <div class="grid grid-cols-3 gap-2 text-sm">
                             <div class="text-center">
                               <div class="text-xs text-gray-500">20GP</div>
                               <div class="font-bold text-blue-600">${{ price.price20GP }}</div>
                             </div>
                             <div class="text-center">
                               <div class="text-xs text-gray-500">40GP</div>
                               <div class="font-bold text-blue-600">${{ price.price40GP }}</div>
                             </div>
                             <div class="text-center">
                               <div class="text-xs text-gray-500">40HC</div>
                               <div class="font-bold text-blue-600">${{ price.price40HC }}</div>
                             </div>
                           </div>
                         </div>
                       </div>
                       <div class="text-sm text-gray-600 space-y-1">
                         <div><i class="fas fa-ship mr-2"></i>{{ price.service }}</div>
                         <div><i class="fas fa-clock mr-2"></i>{{ price.transit }}</div>
                         <div><i class="fas fa-calendar mr-2"></i>{{ price.sailing }}</div>
                       </div>
                     </div>
                  </div>
                                     <div v-else-if="message.type === 'inquiry-form'" class="space-y-3">
                     <div class="font-medium mb-3">{{ message.text }}</div>
                     <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                       <div class="text-green-800 font-medium mb-2">
                         <i class="fas fa-file-alt mr-2"></i>询价单已生成
                       </div>
                       <div class="text-sm space-y-2">
                         <div><span class="font-medium">询价编号：</span>{{ message.inquiryData.number }}</div>
                         <div><span class="font-medium">货物信息：</span>{{ message.inquiryData.cargo }}</div>
                         <div><span class="font-medium">专属销售：</span>{{ message.inquiryData.sales }}</div>
                         <div><span class="font-medium">预计回复：</span>{{ message.inquiryData.response }}</div>
                       </div>
                     </div>
                   </div>
                   <div v-else-if="message.type === 'task-list'" class="space-y-3">
                     <div class="font-medium mb-3">{{ message.text }}</div>
                     <div class="space-y-3">
                       <div class="bg-orange-50 rounded-lg p-3 border border-orange-200">
                         <div class="text-orange-800 font-medium mb-2">
                           <i class="fas fa-clipboard-list mr-2"></i>待提交舱单
                         </div>
                         <div class="flex flex-wrap gap-2">
                           <span v-for="order in message.taskData.pendingManifest" :key="order" class="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">{{ order }}</span>
                         </div>
                       </div>
                       <div class="bg-blue-50 rounded-lg p-3 border border-blue-200">
                         <div class="text-blue-800 font-medium mb-2">
                           <i class="fas fa-file-invoice mr-2"></i>待确认账单
                         </div>
                         <div class="flex flex-wrap gap-2">
                           <span v-for="order in message.taskData.pendingBilling" :key="order" class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">{{ order }}</span>
                         </div>
                       </div>
                       <div class="bg-red-50 rounded-lg p-3 border border-red-200">
                         <div class="text-red-800 font-medium mb-2">
                           <i class="fas fa-undo mr-2"></i>退关待确认
                         </div>
                         <div class="flex flex-wrap gap-2">
                           <span v-for="order in message.taskData.pendingReturn" :key="order" class="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">{{ order }}</span>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div v-else-if="message.type === 'operation-result'" class="space-y-3">
                     <div class="font-medium mb-3">{{ message.text }}</div>
                     <div class="space-y-3">
                       <div class="bg-green-50 rounded-lg p-3 border border-green-200">
                         <div class="text-green-800 font-medium mb-2">
                           <i class="fas fa-check-circle mr-2"></i>退关操作
                         </div>
                         <div class="text-sm text-green-700">{{ message.operationData.returnResult }}</div>
                       </div>
                       <div class="bg-blue-50 rounded-lg p-3 border border-blue-200">
                         <div class="text-blue-800 font-medium mb-2">
                           <i class="fas fa-edit mr-2"></i>箱型修改
                         </div>
                         <div class="text-sm space-y-1">
                           <div><span class="font-medium">订单号：</span>{{ message.operationData.modifyResult.orderNo }}</div>
                           <div><span class="font-medium">修改前：</span>{{ message.operationData.modifyResult.before }}</div>
                           <div><span class="font-medium">修改后：</span>{{ message.operationData.modifyResult.after }}</div>
                           <div><span class="font-medium">状态：</span>{{ message.operationData.modifyResult.ediStatus }}</div>
                           <div><span class="font-medium">EDI通道：</span>{{ message.operationData.modifyResult.ediChannel }}</div>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div v-else-if="message.type === 'pending-release'" class="space-y-3">
                     <div class="font-medium mb-3">{{ message.text }}</div>
                     <div class="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                       <div class="text-yellow-800 font-medium mb-2">
                         <i class="fas fa-ship mr-2"></i>马士基 - 待放舱订单
                       </div>
                       <div class="flex flex-wrap gap-2">
                         <span v-for="order in message.pendingOrders" :key="order" class="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-lg">{{ order }}</span>
                       </div>
                     </div>
                   </div>
                   <div v-else-if="message.type === 'batch-return'" class="space-y-3">
                     <div class="font-medium mb-3">{{ message.text }}</div>
                     <div class="bg-red-50 rounded-lg p-3 border border-red-200">
                       <div class="text-red-800 font-medium mb-2">
                         <i class="fas fa-check-circle mr-2"></i>批量退关完成
                       </div>
                       <div class="space-y-2">
                         <div v-for="order in message.returnedOrders" :key="order" class="flex items-center text-sm">
                           <i class="fas fa-check text-green-600 mr-2"></i>
                           <span class="text-gray-700">{{ order }} 已成功退关</span>
                         </div>
                       </div>
                     </div>
                   </div>
                                     <div v-else>
                     {{ message.text }}
                     <span v-if="message.isTyping" class="typing-cursor">|</span>
                   </div>
                </div>
              </div>
            </div>

            <!-- 正在输入指示器 -->
            <div v-if="isTyping" class="flex justify-start mb-4">
              <div class="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center mr-3 flex-shrink-0 shadow-sm">
                <img src="/assets/g6qmm-vsolk.gif" alt="AI" class="w-full h-full object-cover" />
              </div>
              <div class="bg-white text-gray-700 border border-gray-200 rounded-2xl rounded-bl-md shadow-sm px-4 py-3">
                <div class="flex items-center space-x-1">
                  <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                  <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
                  <span class="ml-2 text-sm text-gray-500">AI正在思考...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// @ts-ignore
import { ref, reactive, onMounted } from 'vue'

// Tab配置
const tabs = ref([
  {
    title: '智能运价',
    icon: 'fas fa-calculator',
    description: '智能运价查询与询价助手',
    welcomeMessage: '我可以帮您查询运价、生成询价单，让运价管理更简单高效'
  },
  {
    title: '订单管理',
    icon: 'fas fa-clipboard-list',
    description: '订单处理与状态跟踪助手',
    welcomeMessage: '我可以帮您处理订单、跟踪状态，让订单管理更轻松便捷'
  },
  {
    title: 'AI识别',
    icon: 'fas fa-eye',
    description: '智能文档识别与数据提取',
    welcomeMessage: '我可以帮您识别各种单据、提取关键信息，让数据录入更准确快速'
  },
  {
    title: '运单跟踪',
    icon: 'fas fa-route',
    description: '货物运输状态实时跟踪',
    welcomeMessage: '我可以帮您跟踪货物状态、预测到达时间，让物流信息更透明及时'
  },
  {
    title: 'ChatBI',
    icon: 'fas fa-chart-bar',
    description: '智能数据分析与报表生成',
    welcomeMessage: '我可以帮您分析业务数据、生成可视化报表，让决策更科学准确'
  }
])

const selectedTab = ref(0)
const messages = ref<any[]>([])
const isPlaying = ref(false)
const isTyping = ref(false)
const currentTypingText = ref('')
const typingMessageIndex = ref(-1)

// 智能运价演示对话数据
const smartPricingDemo = [
  {
    isUser: true,
    text: '上海到洛杉矶下周什么价格？'
  },
  {
    isUser: false,
    type: 'price-list',
    text: '为您找到以下运价选项：',
    priceData: [
      {
        carrier: 'COSCO',
        price20GP: '2,650',
        price40GP: '2,850',
        price40HC: '3,020',
        service: 'CCX',
        transit: '15天',
        sailing: '下周二开船'
      },
      {
        carrier: 'OOCL',
        price20GP: '2,720',
        price40GP: '2,920',
        price40HC: '3,100',
        service: 'PAX',
        transit: '14天',
        sailing: '下周四开船'
      },
      {
        carrier: 'MSC',
        price20GP: '2,950',
        price40GP: '3,100',
        price40HC: '3,280',
        service: 'Eagle Express',
        transit: '12天',
        sailing: '下周六开船'
      }
    ]
  },
  {
    isUser: true,
    text: '太贵了，我有大票货要申请特价。'
  },
  {
    isUser: false,
    text: '请提供货号、时间、货量、品名等信息，将为您自动生成询价单。'
  },
  {
    isUser: true,
    text: '两周后货好，20*40HC，家具货，要快船。'
  },
  {
    isUser: false,
    type: 'inquiry-form',
    text: '已为您自动生成询价单：',
    inquiryData: {
      number: 'INQ20241230001',
      cargo: '20×40HC 家具货（快船）',
      sales: 'James Liu',
      response: '1小时内回复'
    }
  }
]

// 订单管理演示对话数据
const orderManagementDemo = [
  {
    isUser: true,
    text: '今天有啥待办任务？'
  },
  {
    isUser: false,
    type: 'task-list',
    text: '有以下订单待处理：',
    taskData: {
      pendingManifest: ['SH2024120001', 'SH2024120002'],
      pendingBilling: ['SH2024119001', 'SH2024119002'],
      pendingReturn: ['SH2024118001', 'SH2024118002']
    }
  },
  {
    isUser: true,
    text: 'SH2024119001退关，SH2024119002箱型改成2*20GP后重新订舱'
  },
  {
    isUser: false,
    type: 'operation-result',
    text: '操作完成：',
    operationData: {
      returnResult: 'SH2024119001已操作退关',
      modifyResult: {
        orderNo: 'SH2024119002',
        before: '1*40HQ',
        after: '2*20GP',
        ediStatus: '订舱EDI已提交',
        ediChannel: 'INTTRA'
      }
    }
  },
  {
    isUser: true,
    text: '下周ETD 船公司 马士基 还有几票没放舱？'
  },
  {
    isUser: false,
    type: 'pending-release',
    text: 'ETD在下周之内，舱位状态为Pending的订单有：',
    pendingOrders: ['SH2024120101', 'SH2024120102', 'SH2024120103']
  },
  {
    isUser: true,
    text: '这些都给我退关吧。'
  },
  {
    isUser: false,
    type: 'batch-return',
    text: '以下订单已操作退关：',
    returnedOrders: ['SH2024120101', 'SH2024120102', 'SH2024120103']
  }
]

// 切换Tab
const selectTab = async (index: number) => {
  selectedTab.value = index
  resetDemo()
  // 延迟一秒后自动开始演示
  await delay(1000)
  startDemo()
}

// 开始演示
const startDemo = async () => {
  if (isPlaying.value) return
  
  isPlaying.value = true
  messages.value = []
  
  if (selectedTab.value === 0) {
    // 智能运价演示
    await playSmartPricingDemo()
  } else if (selectedTab.value === 1) {
    // 订单管理演示
    await playOrderManagementDemo()
  }
  
  isPlaying.value = false
}

// 播放智能运价演示
const playSmartPricingDemo = async () => {
  for (let i = 0; i < smartPricingDemo.length; i++) {
    const message = smartPricingDemo[i]
    
    if (message.isUser) {
      // 用户消息直接显示
      await delay(1000)
      messages.value.push(message)
    } else {
      // AI消息需要显示打字效果
      await delay(800)
      
      if (message.type === 'price-list' || message.type === 'inquiry-form') {
        // 特殊类型消息直接显示
        isTyping.value = true
        await delay(1500)
        isTyping.value = false
        messages.value.push(message)
      } else {
        // 普通文本消息使用打字机效果
        await typewriterEffect(message.text, i)
      }
    }
  }
}

// 播放订单管理演示
const playOrderManagementDemo = async () => {
  for (let i = 0; i < orderManagementDemo.length; i++) {
    const message = orderManagementDemo[i]
    
    if (message.isUser) {
      // 用户消息直接显示
      await delay(1000)
      messages.value.push(message)
    } else {
      // AI消息需要显示打字效果
      await delay(800)
      
      if (message.type === 'task-list' || message.type === 'operation-result' || 
          message.type === 'pending-release' || message.type === 'batch-return') {
        // 特殊类型消息直接显示
        isTyping.value = true
        await delay(1500)
        isTyping.value = false
        messages.value.push(message)
      } else {
        // 普通文本消息使用打字机效果
        await typewriterEffect(message.text, i)
      }
    }
  }
}

// 打字机效果
const typewriterEffect = async (text: string, messageIndex: number) => {
  typingMessageIndex.value = messageIndex
  currentTypingText.value = ''
  
  // 添加一个临时消息用于显示打字效果
  const tempMessage = {
    isUser: false,
    text: '',
    isTyping: true
  }
  messages.value.push(tempMessage)
  
  // 逐字显示
  for (let i = 0; i <= text.length; i++) {
    currentTypingText.value = text.slice(0, i)
    tempMessage.text = currentTypingText.value
    await delay(50) // 每个字符延迟50ms
  }
  
  // 完成打字，移除isTyping标记
  tempMessage.isTyping = false
  typingMessageIndex.value = -1
}

// 重置演示
const resetDemo = () => {
  messages.value = []
  isPlaying.value = false
  isTyping.value = false
  currentTypingText.value = ''
  typingMessageIndex.value = -1
}

// 延迟函数
const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 组件挂载时自动开始演示
onMounted(async () => {
  await delay(500)
  startDemo()
})
</script>

<style scoped>
/* PortalAIDemo特定样式 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.message-enter-active {
  animation: fadeIn 0.5s ease-out;
}

.typing-cursor {
  animation: blink 1s infinite;
  color: #3B82F6;
  font-weight: bold;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .max-w-4xl {
    margin-left: 0;
    margin-right: 0;
  }
}
</style> 