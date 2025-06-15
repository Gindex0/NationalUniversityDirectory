<template>
  <div class="app-wrapper">
    <HeaderNav />
    <main class="main-content">
      <router-view />
    </main>
    <FooterNav />
  </div>
</template>

<script setup>
import HeaderNav from '@/components/HeaderNav.vue'
import FooterNav from '@/components/FooterNav.vue'
</script>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 确保容器至少占满整个视口高度 */
}

.main-content {
  flex: 1; /* 主要内容区域自动填充剩余空间 */
}
</style>

<style>
/* 全局样式重置 */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>