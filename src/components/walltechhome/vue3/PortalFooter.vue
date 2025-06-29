<template>
  <footer class="bg-white pt-16 pb-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
        <!-- 公司信息 -->
        <div class="md:col-span-1">
          <div class="flex items-center mb-4">
            <img 
              src="/assets/WX20250627-182147@2x.png" 
              alt="WallTech Logo" 
              class="h-10 w-auto"
            />
          </div>
          <p class="text-gray-600 text-sm mb-4">
            为全球国际物流提供智能化解决方案
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-blue-600" title="YouTube" aria-label="访问我们的YouTube频道">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-blue-600" title="Instagram" aria-label="访问我们的Instagram账号">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.917 18.339c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm8.342-8.248c-1.105 0-2-0.895-2-2 0-1.105 0.895-2 2-2 1.104 0 2 0.895 2 2 0 1.105-0.896 2-2 2z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-blue-600" title="LinkedIn" aria-label="访问我们的LinkedIn主页">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- 链接列表 -->
        <div class="md:col-span-1">
          <h3 class="text-gray-800 font-semibold mb-4">产品</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 hover:text-blue-600 text-sm">功能介绍</a></li>
            <li><a href="#" class="text-gray-600 hover:text-blue-600 text-sm">定价</a></li>
            <li><a href="#" class="text-gray-600 hover:text-blue-600 text-sm">安全说明</a></li>
            <li><a href="#" class="text-gray-600 hover:text-blue-600 text-sm">下载客户端</a></li>
          </ul>
        </div>
        
        <div class="md:col-span-1">
          <h3 class="text-gray-800 font-semibold mb-4">解决方案</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 hover:text-blue-600 text-sm">国际货运</a></li>
            <li><a href="#" class="text-gray-600 hover:text-blue-600 text-sm">航空物流</a></li>
            <li><a href="#" class="text-gray-600 hover:text-blue-600 text-sm">供应链管理</a></li>
            <li><a href="#" class="text-gray-600 hover:text-blue-600 text-sm">跨境电商</a></li>
          </ul>
        </div>
        
        <div class="md:col-span-1">
          <h3 class="text-gray-800 font-semibold mb-4">支持</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 hover:text-blue-600 text-sm">帮助中心</a></li>
            <li><a href="#" class="text-gray-600 hover:text-blue-600 text-sm">专业支持</a></li>
            <li><a href="#" class="text-gray-600 hover:text-blue-600 text-sm">运维服务</a></li>
            <li><a href="#" class="text-gray-600 hover:text-blue-600 text-sm">常见问题</a></li>
          </ul>
        </div>
        
        <div class="md:col-span-1">
          <h3 class="text-gray-800 font-semibold mb-4">公司</h3>
          <ul class="space-y-2">
            <li><a href="/about" class="text-gray-600 hover:text-blue-600 text-sm">关于我们</a></li>
            <li><a href="#" class="text-gray-600 hover:text-blue-600 text-sm">新闻中心</a></li>
            <li><a href="#" class="text-gray-600 hover:text-blue-600 text-sm">加入我们</a></li>
            <li><a href="#" class="text-gray-600 hover:text-blue-600 text-sm">联系我们</a></li>
          </ul>
        </div>
      </div>

      <!-- 底部版权信息 -->
      <div class="pt-8 border-t border-gray-200">
        <div class="flex flex-col md:flex-row justify-between items-center mb-4">
          <p class="text-gray-500 text-sm">
            © 2025 WallTech. 保留所有权利.
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" class="text-gray-500 hover:text-blue-600 text-sm">隐私政策</a>
            <a href="/terms" class="text-gray-500 hover:text-blue-600 text-sm">服务条款</a>
            <a href="/cookie-settings" class="text-gray-500 hover:text-blue-600 text-sm">Cookie 设置</a>
          </div>
        </div>

        <!-- 备案信息 -->
        <div class="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 text-xs text-gray-400">
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center hover:text-blue-600 transition-colors duration-300"
          >
            <span>沪ICP备20230512号-1</span>
          </a>
          <a
            href="http://www.beian.gov.cn/portal/registerSystemInfo"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center hover:text-blue-600 transition-colors duration-300"
          >
            <img
              src="/gongan.png"
              alt="公安备案图标"
              class="h-4 mr-1"
            />
            <span>沪公网安备31010402005432号</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer组件
</script>

<style scoped>
/* PortalFooter特定样式 */
</style> 