<template>
  <div class="min-h-screen bg-white">
    <PortalHeader />
    <main>
      <PortalHero />
      <PortalFeatures />
      <PortalFeatureDetail />
      <PortalTechSpecs />
      <PortalCTA />
    </main>
    <PortalFooter />
  </div>
</template>

<script setup lang="ts">
import PortalHeader from './PortalHeader.vue'
import PortalFooter from './PortalFooter.vue'
import PortalHero from './PortalHero.vue'
import PortalFeatures from './PortalFeatures.vue'
import PortalFeatureDetail from './PortalFeatureDetail.vue'
import PortalTechSpecs from './PortalTechSpecs.vue'
import PortalCTA from './PortalCTA.vue'
import '../PortalStyles.css'

// Vue3 Portal组件，对应React版本的Portal.tsx
</script>

<style scoped>
/* Portal特定样式 */
</style> 