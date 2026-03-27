// 绿智未来生态环保 - 网页版主应用
class EcoApp {
  constructor() {
    this.currentPage = 'home';
    this.sidebarOpen = false;
    this.init();
  }

  init() {
    this.setupRouting();
    this.setupMobileMenu();
    this.loadPage('home');
  }

  // 设置路由
  setupRouting() {
    // 桌面端侧边栏导航
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        this.switchTab(page);
      });
    });

    // 移动端底部导航
    document.querySelectorAll('.tab-bar .tab-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        this.switchTab(page);
      });
    });

    // 浏览器前进后退
    window.addEventListener('popstate', () => {
      const hash = window.location.hash.slice(1) || 'home';
      this.switchTab(hash, false);
    });
  }

  // 设置移动端菜单
  setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        this.sidebarOpen = !this.sidebarOpen;
        sidebar.classList.toggle('open', this.sidebarOpen);
      });
    }

    // 点击外部关闭侧边栏
    document.addEventListener('click', (e) => {
      if (this.sidebarOpen && !sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        this.sidebarOpen = false;
        sidebar.classList.remove('open');
      }
    });
  }

  // 切换标签页
  switchTab(page, pushState = true) {
    if (pushState) {
      window.history.pushState({}, '', `#${page}`);
    }

    // 更新桌面端导航状态
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === page);
    });

    // 更新移动端导航状态
    document.querySelectorAll('.tab-bar .tab-item').forEach(item => {
      item.classList.remove('active');
      const icon = item.querySelector('.tab-icon');
      if (item.dataset.page === page) {
        item.classList.add('active');
        // 切换到激活图标
        if (icon && !icon.src.includes('_active')) {
          icon.src = icon.src.replace('.png', '_active.png');
        }
      } else {
        // 切换到普通图标
        if (icon && icon.src.includes('_active')) {
          icon.src = icon.src.replace('_active.png', '.png');
        }
      }
    });

    // 关闭移动端侧边栏
    if (this.sidebarOpen) {
      this.sidebarOpen = false;
      document.getElementById('sidebar').classList.remove('open');
    }

    this.loadPage(page);
  }

  // 加载页面
  loadPage(pageName) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    switch(pageName) {
      case 'home':
        this.renderHomePage(mainContent);
        break;
      case 'qa':
        this.renderQAPage(mainContent);
        break;
      case 'ar':
        this.renderARPage(mainContent);
        break;
    }
  }

  // ========== 首页 ==========
  renderHomePage(container) {
    const page = document.createElement('div');
    page.className = 'page-home page active';
    
    page.innerHTML = `
      <div class="hero-section">
        <div class="hero-swiper">
          <div class="swiper-wrapper" id="swiper-wrapper">
            <div class="swiper-slide">
              <img src="images/banner1.png" class="hero-img" alt="环保banner">
            </div>
            <div class="swiper-slide">
              <img src="images/banner2.png" class="hero-img" alt="环保banner">
            </div>
          </div>
          <div class="swiper-dots">
            <span class="swiper-dot active" data-index="0"></span>
            <span class="swiper-dot" data-index="1"></span>
          </div>
        </div>
        
        <div class="hero-info">
          <h1 class="hero-title">守护<span>绿色</span>地球<br>共建美好未来</h1>
          <p class="hero-desc">通过科技创新与环保意识的结合，我们致力于为每个人提供便捷的环保解决方案，让绿色生活触手可及。</p>
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-number">10K+</div>
              <div class="stat-label">活跃用户</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">50K+</div>
              <div class="stat-label">垃圾分类识别</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">100K+</div>
              <div class="stat-label">环保咨询</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="content-section">
        <div class="section-header">
          <h2 class="section-title">环保科普展示</h2>
          <a href="#" class="view-more">查看更多 →</a>
        </div>
        <div class="video-grid" id="video-grid"></div>
      </div>
    `;
    
    container.appendChild(page);
    this.initSwiper();
    this.loadVideos();
  }

  // 轮播图
  initSwiper() {
    const wrapper = document.getElementById('swiper-wrapper');
    const dots = document.querySelectorAll('.swiper-dot');
    let currentIndex = 0;
    const total = 2;

    const goToSlide = (index) => {
      currentIndex = index;
      wrapper.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    };

    // 点击指示器切换
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });

    // 自动轮播
    setInterval(() => {
      goToSlide((currentIndex + 1) % total);
    }, 4000);
  }

  // 加载视频列表
  loadVideos() {
    const videoList = [
      { title: '垃圾分类小知识：如何正确分类生活垃圾', poster: 'images/video/cover1.png', duration: '03:25', views: '1.2万' },
      { title: '低碳生活指南：从日常小事做起', poster: 'images/video/cover2.png', duration: '05:12', views: '8千' },
      { title: '环保从我做起：节约用水用电技巧', poster: 'images/video/cover3.png', duration: '04:08', views: '1.5万' },
    ];

    const grid = document.getElementById('video-grid');
    grid.innerHTML = videoList.map(item => `
      <div class="video-card">
        <div class="video-thumbnail">
          <img src="${item.poster}" class="video-player" alt="${item.title}">
          <div class="play-overlay">
            <div class="play-icon">▶</div>
          </div>
        </div>
        <div class="card-content">
          <div class="card-title">${item.title}</div>
          <div class="card-meta">${item.duration} · ${item.views}次观看</div>
        </div>
      </div>
    `).join('');
  }

  // ========== 问答页面 ==========
  renderQAPage(container) {
    const page = document.createElement('div');
    page.className = 'page-qa page active';
    
    page.innerHTML = `
      <div class="chat-header">
        <div class="chat-avatar">🤖</div>
        <div class="chat-info">
          <h3>环保智能体</h3>
          <p>在线</p>
        </div>
      </div>
      <div class="chat-area" id="chat-area">
        <div class="welcome-message">
          <h4>👋 你好！我是绿智未来环保智能体</h4>
          <p>有任何环保问题都可以问我，我会尽力为你解答～</p>
          <div class="welcome-tips">
            <span class="tip-chip" data-question="什么是垃圾分类？">什么是垃圾分类？</span>
            <span class="tip-chip" data-question="如何节约用水？">如何节约用水？</span>
            <span class="tip-chip" data-question="塑料瓶属于什么垃圾？">塑料瓶属于什么垃圾？</span>
            <span class="tip-chip" data-question="低碳生活有哪些方式？">低碳生活有哪些方式？</span>
          </div>
        </div>
      </div>
      <div class="input-area">
        <div class="input-wrapper">
          <input type="text" id="qa-input" placeholder="请输入你的环保问题..." maxlength="200">
        </div>
        <button class="btn-send" id="send-btn">➤</button>
      </div>
    `;
    
    container.appendChild(page);
    this.initQA();
  }

  initQA() {
    const chatArea = document.getElementById('chat-area');
    const input = document.getElementById('qa-input');
    const sendBtn = document.getElementById('send-btn');
    
    let messages = [];
    let loading = false;

    const addMessage = (role, content) => {
      // 如果是第一条消息，清除欢迎界面
      const welcomeMsg = chatArea.querySelector('.welcome-message');
      if (welcomeMsg) {
        welcomeMsg.remove();
      }

      const msgDiv = document.createElement('div');
      msgDiv.className = `msg-item ${role}`;
      const avatarSrc = role === 'user' ? 'images/avatar-user.png' : 'images/avatar-assistant.png';
      msgDiv.innerHTML = `
        <img src="${avatarSrc}" class="msg-avatar" alt="${role}">
        <div class="msg-bubble">${content}</div>
      `;
      chatArea.appendChild(msgDiv);
      chatArea.scrollTop = chatArea.scrollHeight;
    };

    const showLoading = () => {
      const loadingDiv = document.createElement('div');
      loadingDiv.className = 'msg-item assistant';
      loadingDiv.id = 'loading-msg';
      loadingDiv.innerHTML = `
        <img src="images/avatar-assistant.png" class="msg-avatar" alt="assistant">
        <div class="loading-indicator">
          <div class="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      `;
      chatArea.appendChild(loadingDiv);
      chatArea.scrollTop = chatArea.scrollHeight;
    };

    const hideLoading = () => {
      const loading = document.getElementById('loading-msg');
      if (loading) loading.remove();
    };

    const sendMessage = async (text) => {
      const content = text || input.value.trim();
      if (!content || loading) return;

      loading = true;
      sendBtn.disabled = true;
      input.value = '';

      // 添加用户消息
      addMessage('user', content);
      showLoading();

      try {
        // 调用AI接口
        const response = await this.callAI(content);
        hideLoading();
        addMessage('assistant', response);
      } catch (error) {
        hideLoading();
        addMessage('assistant', '抱歉😜，我暂时有点卡顿～换个环保问题再试试吧✨');
      }

      loading = false;
      sendBtn.disabled = false;
      input.focus();
    };

    sendBtn.addEventListener('click', () => sendMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });

    // 快捷问题点击
    chatArea.addEventListener('click', (e) => {
      if (e.target.classList.contains('tip-chip')) {
        const question = e.target.dataset.question;
        sendMessage(question);
      }
    });
  }

  // 调用AI接口
  async callAI(message) {
    // 使用 Pollinations AI (免费，无需API Key)
    try {
      const response = await fetch('https://text.pollinations.ai/' + encodeURIComponent(
        `你是亲切可爱的环保科普小助手🥰。请回答以下环保问题，语言活泼俏皮，可以用表情，分点说明，控制在350字以内：${message}`
      ), {
        method: 'GET'
      });
      
      if (response.ok) {
        const text = await response.text();
        return text;
      }
    } catch (e) {
      console.log('Pollinations API failed, using fallback');
    }

    // 本地规则回复（备用）
    return this.getLocalResponse(message);
  }

  // 本地规则回复
  getLocalResponse(message) {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('垃圾') || lowerMsg.includes('分类')) {
      return `垃圾分类小知识来啦✨\n\n1. 可回收物♻️：纸类、塑料、玻璃、金属、织物\n2. 有害垃圾☠️：电池、灯管、药品、油漆\n3. 湿垃圾🍎：剩菜剩饭、瓜皮果核、花卉绿植\n4. 干垃圾🗑️：污染纸张、烟蒂、尘土、一次性餐具\n\n记住口诀：能卖钱的蓝桶桶，有毒有害红桶桶，厨余垃圾绿桶桶，没人要的灰桶桶😊`;
    }
    
    if (lowerMsg.includes('低碳') || lowerMsg.includes('节能') || lowerMsg.includes('省电')) {
      return `低碳生活小贴士🌱\n\n1. 随手关灯，使用LED灯泡💡\n2. 空调温度夏季26℃，冬季20℃\n3. 少用一次性餐具，自带水杯\n4. 多乘坐公共交通或骑行🚲\n5. 购物自带环保袋\n\n小改变，大不同！一起为地球减负吧✨`;
    }
    
    if (lowerMsg.includes('水') || lowerMsg.includes('节约用水')) {
      return `节水小妙招💧\n\n1. 洗菜水浇花，一水多用\n2. 洗澡打香皂时关水\n3. 及时修理漏水龙头\n4. 使用节水型器具\n5. 洗衣机满载再洗\n\n珍惜每一滴水，让生命之源长流🌊`;
    }
    
    return `这是个很好的环保问题呢🌿\n\n环保其实就在我们身边：\n1. 从日常小事做起，比如垃圾分类\n2. 节约资源，减少浪费\n3. 绿色出行，低碳生活\n4. 爱护花草树木\n\n每个人都是地球的守护者，让我们一起行动吧💚\n\n你有其他具体的环保问题吗？我很乐意为你解答✨`;
  }

  // ========== AR识别页面 ==========
  renderARPage(container) {
    const page = document.createElement('div');
    page.className = 'page-ar page active';
    
    page.innerHTML = `
      <div class="ar-container">
        <div class="camera-section">
          <div class="camera-wrapper" id="camera-wrapper">
            <video class="camera-video" id="camera-video" autoplay playsinline></video>
            <canvas class="camera-canvas" id="camera-canvas"></canvas>
            <div class="camera-overlay" id="camera-overlay">
              <div class="camera-frame"></div>
              <p class="camera-hint">将垃圾放入框内，点击拍照识别</p>
            </div>
          </div>
          <div class="camera-controls">
            <button class="btn-shoot" id="shoot-btn" title="拍照识别"></button>
          </div>
        </div>
        
        <div class="result-section" id="result-section">
          <div class="result-header">
            <div class="result-icon">🎯</div>
            <h3>识别结果</h3>
          </div>
          <div class="result-content" id="result-content">
            <div class="result-item">
              <div class="result-label">垃圾名称</div>
              <div class="result-value" id="result-name">--</div>
            </div>
            <div class="result-item">
              <div class="result-label">垃圾类型</div>
              <div class="result-value" id="result-type">--</div>
            </div>
            <div class="result-tip-box">
              <div class="result-label">投放提示</div>
              <div class="result-value" id="result-tip">点击拍照按钮识别垃圾类型</div>
            </div>
          </div>
          <button class="btn-retry" id="re-btn" style="display: none;">重新识别</button>
        </div>
      </div>
    `;
    
    container.appendChild(page);
    this.initCamera();
  }

  initCamera() {
    const video = document.getElementById('camera-video');
    const canvas = document.getElementById('camera-canvas');
    const shootBtn = document.getElementById('shoot-btn');
    const reBtn = document.getElementById('re-btn');
    const wrapper = document.getElementById('camera-wrapper');

    // 请求摄像头权限
    navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      } 
    })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(err => {
      console.error('摄像头错误:', err);
      wrapper.innerHTML = `
        <div class="camera-error">
          <h3>📷 无法访问摄像头</h3>
          <p>请确保：<br>1. 使用HTTPS或localhost访问<br>2. 已授予摄像头权限<br>3. 设备有可用摄像头</p>
        </div>
      `;
    });

    // 拍照识别
    shootBtn.addEventListener('click', () => {
      this.takePhotoAndRecognize(video, canvas);
    });

    // 重新识别
    reBtn.addEventListener('click', () => {
      document.getElementById('result-name').textContent = '--';
      document.getElementById('result-type').textContent = '--';
      document.getElementById('result-tip').textContent = '点击拍照按钮识别垃圾类型';
      reBtn.style.display = 'none';
      shootBtn.style.display = 'flex';
    });
  }

  takePhotoAndRecognize(video, canvas) {
    const shootBtn = document.getElementById('shoot-btn');
    const reBtn = document.getElementById('re-btn');
    
    // 设置canvas尺寸
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // 模拟识别结果
    const mockResults = [
      { name: '塑料瓶', type: '可回收物', tip: '清空液体后投入蓝色可回收物垃圾桶' },
      { name: '苹果核', type: '湿垃圾', tip: '投入绿色湿垃圾/厨余垃圾桶' },
      { name: '废电池', type: '有害垃圾', tip: '投入红色有害垃圾桶，注意防漏' },
      { name: '餐巾纸', type: '干垃圾', tip: '投入灰色干垃圾/其他垃圾桶' },
    ];
    
    const result = mockResults[Math.floor(Math.random() * mockResults.length)];
    
    document.getElementById('result-name').textContent = result.name;
    document.getElementById('result-type').textContent = result.type;
    document.getElementById('result-tip').textContent = result.tip;
    
    // 显示重新识别按钮
    reBtn.style.display = 'block';
  }
}

// 启动应用
document.addEventListener('DOMContentLoaded', () => {
  new EcoApp();
});
