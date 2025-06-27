<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo和描述 -->
        <div class="md:col-span-2">
          <img 
            src="/assets/WX20250627-182147@2x.png" 
            alt="WallTech Logo" 
            class="h-8 w-auto mb-4 filter brightness-0 invert"
          />
          <p class="text-gray-400 leading-relaxed">
            WallTech控制塔系统，AI赋能的物流协同平台，
            为您提供智能化、高效化的物流管理解决方案。
          </p>
        </div>
        
        <!-- 产品链接 -->
        <div>
          <h3 class="text-lg font-bold mb-4">产品</h3>
          <ul class="space-y-2 text-gray-400">
            <li><a href="#" class="hover:text-white transition-colors">控制塔系统</a></li>
            <li><a href="#" class="hover:text-white transition-colors">AI智能助手</a></li>
            <li><a href="#" class="hover:text-white transition-colors">BI分析面板</a></li>
            <li><a href="#" class="hover:text-white transition-colors">订单管理</a></li>
          </ul>
        </div>
        
        <!-- 联系信息 -->
        <div>
          <h3 class="text-lg font-bold mb-4">联系我们</h3>
          <ul class="space-y-2 text-gray-400">
            <li>电话：400-XXX-XXXX</li>
            <li>邮箱：contact@walltech.com</li>
            <li>地址：上海市浦东新区</li>
          </ul>
        </div>
      </div>
      
      <!-- 版权信息 -->
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 WallTech. 保留所有权利。</p>
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