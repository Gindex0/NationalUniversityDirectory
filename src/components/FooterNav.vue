
<template>
    <footer class="app-footer">
      <div class="footer-container">
        <div class="footer-main">
          <h2 class="footer-title">全国大学图鉴</h2>
          <div class="footer-links">
            <router-link to="/about" class="footer-link">关于我们</router-link>
            <router-link to="/contact" class="footer-link">联系方式</router-link>
            <router-link to="/privacy" class="footer-link">隐私政策</router-link>
            <router-link to="/terms" class="footer-link">服务条款</router-link>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="copyright">© 2025 全国大学图鉴 版权所有</p>
          <div class="social-links">
            <a href="#" class="social-link">
              <svg viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg viewBox="0 0 24 24">
                <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg viewBox="0 0 24 24">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  // 不需要额外的逻辑
  </script>
  
  <style scoped>
  .app-footer {
    background: #2d3748;
    color: white;
    padding: 2.5rem 0 1rem;
    
  }
  
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  
  .footer-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  
  .footer-title {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 700;
    background: linear-gradient(to right, #63b3ed, #4299e1);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  .footer-links {
    display: flex;
    gap: 1.5rem;
  }
  
  .footer-link {
    color: #a0aec0;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .footer-link:hover {
    color: white;
  }
  
  .footer-bottom {
    border-top: 1px solid #4a5568;
    padding-top: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .copyright {
    margin: 0;
    color: #a0aec0;
    font-size: 0.875rem;
  }
  
  .social-links {
    display: flex;
    gap: 1rem;
  }
  
  .social-link {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }
  
  .social-link:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  
  .social-link svg {
    width: 1rem;
    height: 1rem;
    fill: white;
  }
  
  @media (max-width: 768px) {
    .footer-main {
      flex-direction: column;
      gap: 1.5rem;
      text-align: center;
    }
    
    .footer-links {
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .footer-bottom {
      flex-direction: column;
      gap: 1rem;
    }
  }
  </style>