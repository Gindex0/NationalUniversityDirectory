<template>
    <div class="university-search">
      <!-- 搜索框 -->
      <div class="search-box-container">
        <div class="search-box">
          <input
            type="text"
            v-model="searchInput"
            @input="handleInput"
            @keyup.enter="searchUniversities"
            placeholder="输入大学名称，如：上海电力大学..."
          />
          <button @click="searchUniversities" class="search-button">
            <svg class="search-icon" viewBox="0 0 24 24">
              <path
                d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
          </button>
  
          <!-- 智能提示下拉框 -->
          <transition name="fade">
            <div v-if="suggestions.length > 0" class="suggestions">
              <div
                v-for="item in suggestions"
                :key="item.id"
                @click="selectSuggestion(item)"
                class="suggestion-item"
              >
                <span class="suggestion-text">{{ item.name }}</span>
                <span class="suggestion-hint">点击查看详情</span>
              </div>
            </div>
          </transition>
        </div>
        <div class="search-tips">试试搜索：清华大学、北京大学、上海电力大学</div>
      </div>
  
      <!-- 加载状态 -->
      <transition name="fade">
        <div v-if="loading" class="loading-container">
          <div class="loading-spinner"></div>
          <span class="loading-text">正在搜索中...</span>
        </div>
      </transition>
  
      <!-- 搜索结果 -->
      <transition-group name="list" tag="div" class="results-container">
        <div
          v-for="university in filteredUniversities"
          :key="university.id"
          class="university-card"
          @click="goToDetail(university.id)"
        >
          <div class="university-logo">
            <img :src="university?.logo || defaultLogo" alt="大学logo" />
          </div>
          <div class="university-info">
            <h3>{{ university?.name || '未知大学' }}</h3>
            <div class="university-meta">
              <span class="location">
                <svg class="icon" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {{ university?.province || '未知地区' }}
              </span>
            </div>
            <div class="university-tags">
              <span class="tag" v-if="university?.is985">985</span>
              <span class="tag" v-if="university?.is211">211</span>
              <span class="tag">双一流</span>
            </div>
          </div>
          <div class="university-rankings">
            <div class="ranking-item">
              <span class="ranking-label">软科排名</span>
              <span class="ranking-value">{{ university?.softRanking || '--' }}</span>
            </div>
            <div class="ranking-item">
              <span class="ranking-label">校友会排名</span>
              <span class="ranking-value">{{ university?.alumniRanking || '--' }}</span>
            </div>
            <div class="ranking-item">
              <span class="ranking-label">QS排名</span>
              <span class="ranking-value">{{ university?.qsRanking || '--' }}</span>
            </div>
          </div>
          <div class="university-arrow">
            <svg viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </div>
        </div>
      </transition-group>
  
      <!-- 空状态 -->
      <transition name="fade">
        <div v-if="showEmpty" class="empty-container">
          <img src="@/assets/logo.png" alt="无结果" class="empty-image" />
          <h3 class="empty-title">没有找到相关大学</h3>
          <p class="empty-subtitle">请尝试不同的搜索关键词</p>
          <button @click="resetSearch" class="empty-button">重新搜索</button>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import { useRouter } from "vue-router";
  import defaultLogo from "@/assets/suep.png";
  import axios from "axios";
  
  const router = useRouter();
  
  // 数据状态
  const searchInput = ref("");
  const suggestions = ref([]);
  const universities = ref([]);
  const loading = ref(false);
  const showEmpty = ref(false);
  const debounceTimer = ref(null);
  
  // 计算属性过滤无效数据
  const filteredUniversities = computed(() => {
    return universities.value.filter(university => university)
  });
  
  // 智能提示
  const handleInput = () => {
    clearTimeout(debounceTimer.value);
  
    if (searchInput.value.length < 2) {
      suggestions.value = [];
      return;
    }
  
    debounceTimer.value = setTimeout(async () => {
      try {
        // 模拟建议数据
        suggestions.value = [
          { id: 1, name: "上海电力大学", province: "上海" },
          { id: 2, name: "上海电力大学临港校区", province: "上海" },
          { id: 3, name: "上海电力大学杨浦校区", province: "上海" },
        ];
      } catch (error) {
        console.error("获取搜索建议失败:", error);
      }
    }, 300);
  };
  
  // 选择建议项
  const selectSuggestion = (item) => {
    searchInput.value = item.name;
    suggestions.value = [];
    searchUniversities();
  };
  
  // 搜索大学
  const searchUniversities = async () => {
  if (!searchInput.value.trim()) return;

  loading.value = true;
  showEmpty.value = false;
  suggestions.value = [];

  try {
    await new Promise((resolve) => setTimeout(resolve, 800));

    universities.value = [
      {
        id: 1,
        name: searchInput.value || "上海电力大学",
        logo: defaultLogo,
        province: "上海",
        softRanking: "200",
        alumniRanking: "180",
        qsRanking: "--",
        is985: false,
        is211: false
      },
      {
        id: 2,
        name: "清华大学",
        logo: defaultLogo,
        province: "北京",
        softRanking: "1",
        alumniRanking: "2",
        qsRanking: "17",
        is985: true,
        is211: true
      },
      {
        id: 3,
        name: "北京大学",
        logo: defaultLogo,
        province: "北京",
        softRanking: "2",
        alumniRanking: "1",
        qsRanking: "18",
        is985: true,
        is211: true
      },
      {
        id: 4,  // 新的唯一ID
        name: "复旦大学",
        logo: defaultLogo,
        province: "上海",
        softRanking: "6",
        alumniRanking: "7",
        qsRanking: "34",
        is985: true,
        is211: true
      },
      {
        id: 5,  // 新的唯一ID
        name: "上海交通大学",
        logo: defaultLogo,
        province: "上海",
        softRanking: "4",
        alumniRanking: "5",
        qsRanking: "47",
        is985: true,
        is211: true
      }
    ];

    showEmpty.value = filteredUniversities.value.length === 0;
  } catch (error) {
    console.error("搜索失败:", error);
    universities.value = [];
    showEmpty.value = true;
  } finally {
    loading.value = false;
  }
};
  // 重置搜索
  const resetSearch = () => {
    searchInput.value = "";
    universities.value = [];
    showEmpty.value = false;
  };
  
  // 跳转到详情页
  const goToDetail = (id) => {
    router.push({ name: "UniversityDetail", params: { id } });
  };

  const apiResponse = ref('');
  // 测试API连接
const testApi = async () => {
  try {
    // 假设后端地址为http://localhost:8080/hello（请根据实际情况修改）
    const response = await axios.get('http://localhost:8080/hello');
    apiResponse.value = response.data;
    console.log('API响应:', apiResponse.value);
  } catch (error) {
    console.error('API请求失败:', error);
    apiResponse.value = '请求失败，请检查后端服务';
  }
};
  // 初始加载热门大学
  onMounted(() => {
    testApi();
    universities.value = [
      {
        id: 1,
        name: '上海电力大学',
        logo: defaultLogo,
        province: '上海',
        softRanking: '200',
        alumniRanking: '180',
        qsRanking: '--',
        is985: false,
        is211: false
      },
      {
        id: 2,
        name: '清华大学',
        logo: defaultLogo,
        province: '北京',
        softRanking: '1',
        alumniRanking: '2',
        qsRanking: '17',
        is985: true,
        is211: true
      },
      {
        id: 3,
        name: '北京大学',
        logo: defaultLogo,
        province: '北京',
        softRanking: '2',
        alumniRanking: '1',
        qsRanking: '18',
        is985: true,
        is211: true
      },
    ]
  });
  </script>
  
  <style scoped>
  .university-search {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  }
  
  /* 搜索框区域 */
  .search-box-container {
    margin-bottom: 2.5rem;
    position: relative;
  }
  
  .search-box {
    position: relative;
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .search-box:hover {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  }
  
  .search-box input {
    flex: 1;
    padding: 1rem 1.5rem;
    font-size: 1rem;
    border: none;
    outline: none;
    background: transparent;
    color: #333;
  }
  
  .search-box input::placeholder {
    color: #a0aec0;
  }
  
  .search-button {
    padding: 0 1.25rem;
    height: 100%;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .search-icon {
    width: 1.25rem;
    height: 1.25rem;
    fill: #4a5568;
    transition: all 0.2s ease;
  }
  
  .search-button:hover .search-icon {
    fill: #3182ce;
    transform: scale(1.1);
  }
  
  .search-tips {
    margin-top: 0.75rem;
    font-size: 0.875rem;
    color: #718096;
    text-align: center;
  }
  
  /* 智能提示下拉框 */
  .suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 0.5rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    z-index: 10;
    overflow: hidden;
  }
  
  .suggestion-item {
    padding: 0.75rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .suggestion-item:hover {
    background: #f7fafc;
  }
  
  .suggestion-text {
    font-weight: 500;
    color: #2d3748;
  }
  
  .suggestion-hint {
    font-size: 0.75rem;
    color: #a0aec0;
  }
  
  /* 加载状态 */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 0;
  }
  
  .loading-spinner {
    width: 3rem;
    height: 3rem;
    border: 3px solid #e2e8f0;
    border-top-color: #3182ce;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  .loading-text {
    color: #4a5568;
    font-size: 0.875rem;
  }
  
  /* 搜索结果 */
  .results-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .university-card {
    display: flex;
    align-items: center;
    padding: 1.25rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .university-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
  
  .university-card::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, #3182ce, #63b3ed);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .university-card:hover::before {
    opacity: 1;
  }
  
  .university-logo {
    width: 3.5rem;
    height: 3.5rem;
    margin-right: 1.25rem;
    border-radius: 10px;
    overflow: hidden;
    background: #f7fafc;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }
  
  .university-logo img {
    width: 80%;
    height: 80%;
    object-fit: contain;
  }
  
  .university-info {
    flex: 1;
    min-width: 0;
    margin-right: 1rem;
  }
  
  .university-info h3 {
    margin: 0 0 0.5rem 0;
    color: #2d3748;
    font-size: 1.125rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .university-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .university-meta span {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    color: #4a5568;
  }
  
  .location {
    display: flex;
    align-items: center;
  }
  
  .icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.25rem;
    fill: #718096;
  }
  
  .university-tags {
    display: flex;
    gap: 0.5rem;
  }
  
  .tag {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    border-radius: 4px;
    font-weight: 500;
  }
  
  .tag:nth-child(1) {
    background: #ebf8ff;
    color: #3182ce;
  }
  
  .tag:nth-child(2) {
    background: #fff5f5;
    color: #e53e3e;
  }
  
  .tag:nth-child(3) {
    background: #f0fff4;
    color: #38a169;
  }
  
  .university-rankings {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-right: 1rem;
    min-width: 120px;
  }
  
  .ranking-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
  }
  
  .ranking-label {
    color: #718096;
    margin-right: 0.5rem;
  }
  
  .ranking-value {
    color: #2d3748;
    font-weight: 500;
  }
  
  .university-arrow {
    margin-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #cbd5e0;
    transition: all 0.2s ease;
  }
  
  .university-card:hover .university-arrow {
    color: #3182ce;
    transform: translateX(2px);
  }
  
  .university-arrow svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  /* 空状态 */
  .empty-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 0;
    text-align: center;
  }
  
  .empty-image {
    width: 8rem;
    opacity: 0.6;
    margin-bottom: 1.5rem;
  }
  
  .empty-title {
    margin: 0 0 0.5rem 0;
    color: #2d3748;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .empty-subtitle {
    margin: 0 0 1.5rem 0;
    color: #718096;
    font-size: 0.875rem;
  }
  
  .empty-button {
    padding: 0.5rem 1.5rem;
    background: #3182ce;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .empty-button:hover {
    background: #2c5282;
    transform: translateY(-1px);
  }
  
  /* 动画效果 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  /* 响应式设计 */
  @media (max-width: 640px) {
    .university-search {
      padding: 1.5rem 1rem;
    }
  
    .university-card {
      padding: 1rem;
      flex-wrap: wrap;
    }
  
    .university-logo {
      width: 3rem;
      height: 3rem;
      margin-right: 1rem;
    }
  
    .university-info h3 {
      font-size: 1rem;
    }
  
    .university-rankings {
      flex-direction: row;
      flex-wrap: wrap;
      min-width: 100%;
      margin-top: 0.5rem;
      margin-right: 0;
    }
  
    .ranking-item {
      flex: 1;
      min-width: 100px;
    }
  }
  </style>