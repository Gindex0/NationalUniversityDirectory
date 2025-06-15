<template>
    <div class="university-detail">
      <!-- 顶部信息栏 -->
      <div class="university-header">
        <div class="header-content">
          <div class="university-basic">
            <div class="university-logo">
              <img :src="university.cover_img || defaultLogo" alt="大学logo" />
            </div>
            <div class="university-title">
              <h1>{{ university.name }}</h1>
              <div class="university-tags">
                <span class="tag" v-if="university.tag_flags & 1">985</span>
                <span class="tag" v-if="university.tag_flags & 2">211</span>
                <span class="tag" v-if="university.tag_flags & 4">双一流</span>
                <span class="tag">{{ university.type }}</span>
              </div>
            </div>
          </div>
          <div class="university-contact">
            <div class="contact-item">
              <svg viewBox="0 0 24 24" class="icon">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>{{ university.province }} · {{ university.adrress }}</span>
            </div>
            <div class="contact-item">
              <svg viewBox="0 0 24 24" class="icon">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
              <span>{{ university.Telephone }}</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 主要内容区域 -->
      <div class="main-content">
        <!-- 左侧内容 -->
        <div class="left-content">
          <!-- 学校简介 -->
          <section class="info-section">
            <h2 class="section-title">学校简介</h2>
            <div class="section-content">
              <p>{{ university.intro || '暂无学校简介' }}</p>
            </div>
          </section>
  
          <!-- 校园风光 -->
          <section class="info-section" v-if="university.Pictures">
            <h2 class="section-title">校园风光</h2>
            <div class="campus-gallery">
              <img 
                v-for="(img, index) in university.Pictures.split(',')" 
                :key="index" 
                :src="img" 
                alt="校园风光" 
                @click="showImagePreview(index)"
              />
            </div>
          </section>
  
          <!-- 特色专业 -->
          <section class="info-section">
            <h2 class="section-title">特色专业</h2>
            <div class="featured-majors">
              <div class="major-card" v-for="major in featuredMajors" :key="major.major_id">
                <h3>{{ major.name }}</h3>
                <div class="major-meta">
                  <span class="discipline">{{ major.discipline }}</span>
                  <span class="assessment" v-if="major.assessment">学科评估: {{ major.assessment }}</span>
                </div>
                <div class="major-tags">
                  <span class="tag" v-if="major.is_national_key">国家重点</span>
                  <span class="tag" v-if="major.Has_phd">博士点</span>
                  <span class="tag" v-if="major.Has_master">硕士点</span>
                </div>
              </div>
            </div>
          </section>
  
          <!-- 录取分数线 -->
          <section class="info-section">
            <h2 class="section-title">录取分数线</h2>
            <div class="score-filter">
              <div class="filter-group">
                <label>年份:</label>
                <select v-model="selectedYear">
                  <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
                </select>
              </div>
              <div class="filter-group">
                <label>省份:</label>
                <select v-model="selectedProvince">
                  <option v-for="province in availableProvinces" :key="province" :value="province">{{ province }}</option>
                </select>
              </div>
              <div class="filter-group">
                <label>科类:</label>
                <select v-model="selectedSubjectType">
                  <option value="文科">文科</option>
                  <option value="理科">理科</option>
                  <option value="综合">综合</option>
                </select>
              </div>
            </div>
            <div class="admission-scores">
              <div class="score-table">
                <div class="table-header">
                  <div class="header-cell">批次</div>
                  <div class="header-cell">最低分</div>
                  <div class="header-cell">平均分</div>
                  <div class="header-cell">最低位次</div>
                </div>
                <div class="table-row" v-for="score in filteredScores" :key="score.score_id">
                  <div class="table-cell">{{ score.batch }}</div>
                  <div class="table-cell">{{ score.min_score }}</div>
                  <div class="table-cell">{{ score.avg_score }}</div>
                  <div class="table-cell">{{ score.rank }}</div>
                </div>
                <div class="empty-tip" v-if="filteredScores.length === 0">
                  暂无该条件下的录取分数数据
                </div>
              </div>
            </div>
          </section>
  
          <!-- 校友评价 -->
          <section class="info-section">
            <h2 class="section-title">校友评价</h2>
            <div class="comment-list">
              <div class="comment-item" v-for="comment in comments" :key="comment.comment_id">
                <div class="comment-header">
                  <div class="comment-author">
                    <span v-if="comment.anonymity">匿名用户</span>
                    <span v-else>{{ comment.alumni_name || '校友' }}</span>
                    <span class="comment-time">{{ formatTime(comment.Created_at) }}</span>
                  </div>
                  <div class="comment-rating">
                    <span v-for="(value, key) in comment.rating" :key="key" class="rating-item">
                      {{ key }}: {{ value }}/5
                    </span>
                  </div>
                </div>
                <div class="comment-content">
                  {{ comment.content }}
                </div>
              </div>
              <div class="empty-tip" v-if="comments.length === 0">
                暂无校友评价
              </div>
            </div>
          </section>
        </div>
  
        <!-- 右侧侧边栏 -->
        <div class="right-sidebar">
          <!-- 快速导航 -->
          <div class="sidebar-card quick-nav">
            <h3>快速导航</h3>
            <ul>
              <li><a href="#intro">学校简介</a></li>
              <li><a href="#campus">校园风光</a></li>
              <li><a href="#majors">特色专业</a></li>
              <li><a href="#scores">录取分数</a></li>
              <li><a href="#comments">校友评价</a></li>
            </ul>
          </div>
  
          <!-- 学校排名 -->
          <div class="sidebar-card rankings">
            <h3>学校排名</h3>
            <div class="ranking-item">
              <span class="ranking-name">软科排名</span>
              <span class="ranking-value">{{ university.softRanking || '--' }}</span>
            </div>
            <div class="ranking-item">
              <span class="ranking-name">校友会排名</span>
              <span class="ranking-value">{{ university.alumniRanking || '--' }}</span>
            </div>
            <div class="ranking-item">
              <span class="ranking-name">QS排名</span>
              <span class="ranking-value">{{ university.qsRanking || '--' }}</span>
            </div>
          </div>
  
          <!-- 操作按钮 -->
          <div class="action-buttons">
            <button class="btn favorite-btn" @click="toggleFavorite">
              <svg viewBox="0 0 24 24" class="icon">
                <path :fill="isFavorite ? '#f44336' : 'none'" stroke="#f44336" stroke-width="2" 
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              {{ isFavorite ? '已收藏' : '收藏' }}
            </button>
            <button class="btn compare-btn" @click="addToCompare">
              <svg viewBox="0 0 24 24" class="icon">
                <path fill="none" stroke="#4CAF50" stroke-width="2" d="M8 3v18m8-18v18M3 8h18M3 16h18"/>
              </svg>
              加入对比
            </button>
            <button class="btn volunteer-btn" @click="addToVolunteer">
              <svg viewBox="0 0 24 24" class="icon">
                <path fill="none" stroke="#2196F3" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              加入志愿表
            </button>
          </div>
        </div>
      </div>
  
      <!-- 图片预览模态框 -->
      <div class="image-preview-modal" v-if="showPreview" @click.self="closeImagePreview">
        <div class="modal-content">
          <button class="close-btn" @click="closeImagePreview">&times;</button>
          <img :src="university.Pictures.split(',')[currentImageIndex]" alt="校园风光预览" />
          <div class="image-nav">
            <button @click="prevImage" :disabled="currentImageIndex === 0">上一张</button>
            <span>{{ currentImageIndex + 1 }} / {{ university.Pictures.split(',').length }}</span>
            <button @click="nextImage" :disabled="currentImageIndex === university.Pictures.split(',').length - 1">下一张</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import defaultLogo from '@/assets/suep.png'
  
  const route = useRoute()  
  // 大学ID从路由参数获取
  const universityId = ref(route.params.id)
  
  // 大学数据
  const university = ref({
    uni_id: 0,
    name: '',
    province: '',
    type: '',
    tag_flags: 0,
    intro: '',
    adrress: '',
    Telephone: '',
    cover_img: '',
    Pictures: '',
    softRanking: '',
    alumniRanking: '',
    qsRanking: ''
  })
  
  // 特色专业数据
  const featuredMajors = ref([])
  
  // 录取分数数据
  const admissionScores = ref([])
  const selectedYear = ref(new Date().getFullYear() - 1)
  const selectedProvince = ref('北京')
  const selectedSubjectType = ref('理科')
  
  // 校友评价数据
  const comments = ref([])
  
  // 图片预览相关
  const showPreview = ref(false)
  const currentImageIndex = ref(0)
  
  // 收藏状态
  const isFavorite = ref(false)
  
  // 加载状态
  const loading = ref(true)
  
  // 计算属性
  const availableYears = computed(() => {
    const years = new Set()
    admissionScores.value.forEach(score => years.add(score.year))
    return Array.from(years).sort((a, b) => b - a)
  })
  
  const availableProvinces = computed(() => {
    const provinces = new Set()
    admissionScores.value.forEach(score => provinces.add(score.province))
    return Array.from(provinces)
  })
  
  const filteredScores = computed(() => {
    return admissionScores.value.filter(score => {
      return score.year === selectedYear.value && 
             score.province === selectedProvince.value && 
             score.subject_type === selectedSubjectType.value
    }).sort((a, b) => {
      // 按批次排序
      const batchOrder = ['本科一批', '本科二批', '本科三批', '专科批']
      return batchOrder.indexOf(a.batch) - batchOrder.indexOf(b.batch)
    })
  })
  
  // 方法
  const fetchUniversityData = async () => {
    try {
      loading.value = true
      // 模拟API请求
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // 模拟大学数据
      university.value = {
        uni_id: universityId.value,
        name: '上海电力大学',
        province: '上海',
        type: '理工类',
        tag_flags: 4, // 双一流
        intro: '上海电力大学是中央与上海市共建、以上海市管理为主的全日制普通高等院校。学校创建于1951年，长期隶属于国家电力部门管理，2000年属地化管理。学校历经了上海电业学校、上海动力学校、上海电力学校、上海电力专科学校、上海电力学院的发展演变，2006年开始硕士层次办学，2018年成为博士学位授予单位，2018年更名为上海电力大学。学校现有杨浦、浦东两个校区，全日制在校生12000余人。',
        adrress: '上海市杨浦区长阳路2588号',
        Telephone: '021-61655223',
        cover_img: defaultLogo,
        Pictures: `${defaultLogo},${defaultLogo},${defaultLogo},${defaultLogo}`,
        softRanking: '200',
        alumniRanking: '180',
        qsRanking: '--'
      }
      
      // 模拟特色专业数据
      featuredMajors.value = [
        {
          major_id: 1,
          name: '电气工程及其自动化',
          discipline: '工学',
          is_national_key: true,
          assessment: 'B+',
          Has_phd: true,
          Has_master: true
        },
        {
          major_id: 2,
          name: '能源与动力工程',
          discipline: '工学',
          is_national_key: false,
          assessment: 'B',
          Has_phd: false,
          Has_master: true
        },
        {
          major_id: 3,
          name: '自动化',
          discipline: '工学',
          is_national_key: false,
          assessment: 'B-',
          Has_phd: false,
          Has_master: true
        }
      ]
      
      // 模拟录取分数数据
      admissionScores.value = [
        {
          score_id: 1,
          year: 2022,
          province: '北京',
          subject_type: '理科',
          batch: '本科一批',
          min_score: 580,
          avg_score: 590,
          rank: 12000
        },
        {
          score_id: 2,
          year: 2022,
          province: '北京',
          subject_type: '理科',
          batch: '本科二批',
          min_score: 550,
          avg_score: 560,
          rank: 15000
        },
        {
          score_id: 3,
          year: 2021,
          province: '北京',
          subject_type: '理科',
          batch: '本科一批',
          min_score: 570,
          avg_score: 580,
          rank: 12500
        },
        {
          score_id: 4,
          year: 2021,
          province: '上海',
          subject_type: '理科',
          batch: '本科一批',
          min_score: 520,
          avg_score: 530,
          rank: 10000
        }
      ]
      
      // 模拟校友评价数据
      comments.value = [
        {
          comment_id: 1,
          alumni_name: '张同学',
          anonymity: false,
          content: '学校的电力专业非常强，师资力量雄厚，就业前景很好。校园环境优美，学习氛围浓厚。',
          rating: {
            教学水平: 4,
            校园环境: 5,
            就业前景: 4
          },
          Created_at: '2023-05-15T10:30:00Z'
        },
        {
          comment_id: 2,
          alumni_name: '李同学',
          anonymity: true,
          content: '作为电力行业的黄埔军校，在行业内认可度很高，毕业生就业率一直保持在较高水平。',
          rating: {
            教学水平: 4,
            校园环境: 3,
            就业前景: 5
          },
          Created_at: '2023-03-20T14:15:00Z'
        }
      ]
      
      // 模拟收藏状态
      isFavorite.value = false
      
      loading.value = false
    } catch (error) {
      console.error('获取大学数据失败:', error)
      loading.value = false
    }
  }
  
//   const formatTime = (timeStr) => {
//     return dayjs(timeStr).format('YYYY-MM-DD')
//   }
const formatTime = (timeStr) => {
  const date = new Date(timeStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}  

  const showImagePreview = (index) => {
    currentImageIndex.value = index
    showPreview.value = true
  }
  
  const closeImagePreview = () => {
    showPreview.value = false
  }
  
  const prevImage = () => {
    if (currentImageIndex.value > 0) {
      currentImageIndex.value--
    }
  }
  
  const nextImage = () => {
    const images = university.value.Pictures.split(',')
    if (currentImageIndex.value < images.length - 1) {
      currentImageIndex.value++
    }
  }
  
  const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value
    // 这里应该调用API更新收藏状态
  }
  
  const addToCompare = () => {
    // 添加到对比列表逻辑
    alert('已添加到对比列表')
  }
  
  const addToVolunteer = () => {
    // 添加到志愿表逻辑
    alert('已添加到志愿表')
  }
  
  // 监听大学ID变化
  watch(() => route.params.id, (newId) => {
    universityId.value = newId
    fetchUniversityData()
  })
  
  // 初始化加载数据
  onMounted(() => {
    fetchUniversityData()
  })
  </script>
  
  <style scoped>
  .university-detail {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  }
  
  /* 顶部信息栏样式 */
  .university-header {
    background: linear-gradient(135deg, #3182ce, #63b3ed);
    color: white;
    border-radius: 12px;
    margin-bottom: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .header-content {
    padding: 2rem;
  }
  
  .university-basic {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .university-logo {
    width: 80px;
    height: 80px;
    border-radius: 12px;
    overflow: hidden;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .university-logo img {
    width: 70%;
    height: 70%;
    object-fit: contain;
  }
  
  .university-title h1 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
  }
  
  .university-tags {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  
  .university-tags .tag {
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
  }
  
  .university-contact {
    display: flex;
    gap: 2rem;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
  }
  
  .contact-item .icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    fill: white;
  }
  
  /* 主要内容区域 */
  .main-content {
    display: flex;
    gap: 2rem;
  }
  
  .left-content {
    flex: 1;
    min-width: 0;
  }
  
  .right-sidebar {
    width: 280px;
    flex-shrink: 0;
  }
  
  /* 信息区块样式 */
  .info-section {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .section-title {
    margin: 0 0 1.5rem 0;
    font-size: 1.25rem;
    color: #2d3748;
    position: relative;
    padding-bottom: 0.5rem;
  }
  
  .section-title::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(to right, #3182ce, #63b3ed);
    border-radius: 3px;
  }
  
  .section-content {
    line-height: 1.6;
    color: #4a5568;
  }
  
  /* 校园风光图库 */
  .campus-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .campus-gallery img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .campus-gallery img:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  /* 特色专业卡片 */
  .featured-majors {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .major-card {
    background: #f7fafc;
    border-radius: 8px;
    padding: 1rem;
    transition: all 0.3s ease;
  }
  
  .major-card:hover {
    background: #ebf8ff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
  
  .major-card h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    color: #2d3748;
  }
  
  .major-meta {
    display: flex;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: #718096;
    margin-bottom: 0.5rem;
  }
  
  .major-tags {
    display: flex;
    gap: 0.5rem;
  }
  
  .major-tags .tag {
    padding: 0.2rem 0.5rem;
    font-size: 0.7rem;
    border-radius: 4px;
    background: #e6fffa;
    color: #38b2ac;
  }
  
  /* 录取分数筛选 */
  .score-filter {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }
  
  .filter-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .filter-group label {
    font-size: 0.9rem;
    color: #4a5568;
  }
  
  .filter-group select {
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background: white;
    font-size: 0.9rem;
    color: #4a5568;
  }
  
  /* 分数表格 */
  .score-table {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .table-header {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: #3182ce;
    color: white;
    font-weight: 500;
  }
  
  .header-cell {
    padding: 0.75rem;
    text-align: center;
  }
  
  .table-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-bottom: 1px solid #e2e8f0;
    transition: background 0.2s ease;
  }
  
  .table-row:hover {
    background: #ebf8ff;
  }
  
  .table-cell {
    padding: 0.75rem;
    text-align: center;
    color: #4a5568;
  }
  
  .empty-tip {
    padding: 2rem;
    text-align: center;
    color: #a0aec0;
    font-size: 0.9rem;
  }
  
  /* 校友评价 */
  .comment-list {
    margin-top: 1rem;
  }
  
  .comment-item {
    padding: 1rem 0;
    border-bottom: 1px solid #edf2f7;
  }
  
  .comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  
  .comment-author {
    font-weight: 500;
    color: #2d3748;
  }
  
  .comment-time {
    font-size: 0.8rem;
    color: #a0aec0;
    margin-left: 0.5rem;
  }
  
  .comment-rating {
    display: flex;
    gap: 0.5rem;
    font-size: 0.8rem;
  }
  
  .rating-item {
    color: #718096;
  }
  
  .comment-content {
    line-height: 1.6;
    color: #4a5568;
  }
  
  /* 右侧边栏 */
  .sidebar-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .sidebar-card h3 {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    color: #2d3748;
    position: relative;
    padding-bottom: 0.5rem;
  }
  
  .sidebar-card h3::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 30px;
    height: 2px;
    background: linear-gradient(to right, #3182ce, #63b3ed);
    border-radius: 2px;
  }
  
  .quick-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .quick-nav li {
    margin-bottom: 0.5rem;
  }
  
  .quick-nav a {
    display: block;
    padding: 0.5rem 0;
    color: #4a5568;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .quick-nav a:hover {
    color: #3182ce;
  }
  
  /* 排名样式 */
  .ranking-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px dashed #e2e8f0;
  }
  
  .ranking-item:last-child {
    border-bottom: none;
  }
  
  .ranking-name {
    color: #718096;
  }
  
  .ranking-value {
    font-weight: 500;
    color: #2d3748;
  }
  
  /* 操作按钮 */
  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    width: 100%;
  }
  
  .btn .icon {
    width: 1rem;
    height: 1rem;
  }
  
  .favorite-btn {
    background: rgba(244, 67, 54, 0.1);
    color: #f44336;
  }
  
  .favorite-btn:hover {
    background: rgba(244, 67, 54, 0.2);
  }
  
  .compare-btn {
    background: rgba(76, 175, 80, 0.1);
    color: #4CAF50;
  }
  
  .compare-btn:hover {
    background: rgba(76, 175, 80, 0.2);
  }
  
  .volunteer-btn {
    background: rgba(33, 150, 243, 0.1);
    color: #2196F3;
  }
  
  .volunteer-btn:hover {
    background: rgba(33, 150, 243, 0.2);
  }
  
  /* 图片预览模态框 */
  .image-preview-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    position: relative;
    max-width: 80%;
    max-height: 80%;
  }
  
  .modal-content img {
    max-width: 100%;
    max-height: 70vh;
    display: block;
    margin: 0 auto;
    border-radius: 8px;
  }
  
  .close-btn {
    position: absolute;
    top: -40px;
    right: 0;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
  }
  
  .image-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    color: white;
  }
  
  .image-nav button {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  
  .image-nav button:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  .image-nav button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    .main-content {
      flex-direction: column;
    }
    
    .right-sidebar {
      width: 100%;
    }
    
    .university-basic {
      flex-direction: column;
      text-align: center;
    }
    
    .university-logo {
      margin-right: 0;
      margin-bottom: 1rem;
    }
    
    .university-contact {
      flex-direction: column;
      gap: 1rem;
    }
    
    .featured-majors {
      grid-template-columns: 1fr;
    }
    
    .score-filter {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .modal-content {
      max-width: 95%;
    }
  }
  </style>