<template>
    <header class="app-header">
      <div class="header-container">
        <div class="logo-container">
          <img src="@/assets/logo.png" alt="全国大学图鉴" class="logo" />
          <div class="logo-text">
            <h1>全国大学图鉴</h1>
            <p>全国大学搜索</p>
          </div>
        </div>
        <nav class="main-nav">
          <router-link to="/" class="nav-item" exact-active-class="active">
            <svg class="nav-icon" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span>首页</span>
          </router-link>
          <router-link to="/search" class="nav-item" active-class="active">
            <svg class="nav-icon" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <span>搜索</span>
          </router-link>
          <router-link to="/compare" class="nav-item" active-class="active">
            <svg class="nav-icon" viewBox="0 0 24 24">
              <path d="M10 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v2h2V1h-2v2zm0 15H5l5-6v6zm9-15h-5v2h5v13l-5-6v9h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
            </svg>
            <span>对比</span>
          </router-link>
        </nav>
      </div>
    </header>
  </template>
  
  <script setup>
  // 不需要额外的逻辑
  </script>
  
  <style scoped>
  .app-header {
    background: linear-gradient(135deg, #3182ce 0%, #63b3ed 100%);
    color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0.75rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .logo {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
  }
  
  .logo-text h1 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.2;
  }
  
  .logo-text p {
    margin: 0;
    font-size: 0.875rem;
    opacity: 0.9;
  }
  
  .main-nav {
    display: flex;
    gap: 1.5rem;
  }
  
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    padding: 0.5rem 0;
  }
  
  .nav-item:hover {
    color: white;
    transform: translateY(-2px);
  }
  
  .nav-item.active {
    color: white;
    font-weight: 500;
  }
  
  .nav-icon {
    width: 1.5rem;
    height: 1.5rem;
    fill: currentColor;
    margin-bottom: 0.25rem;
  }
  
  @media (max-width: 768px) {
    .header-container {
      padding: 0.75rem 1rem;
    }
    
    .logo-text h1 {
      font-size: 1.1rem;
    }
    
    .main-nav {
      gap: 1rem;
    }
    
    .nav-item {
      font-size: 0.75rem;
    }
    
    .nav-icon {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
  </style>