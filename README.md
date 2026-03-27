# 绿智未来生态环保 - 网页版

一个响应式的环保主题网页应用，包含首页展示、AI问答和AR识别功能。

## 功能特性

- 🏠 **首页** - 环保科普视频展示，轮播图
- 💬 **环保智能体** - AI问答助手（使用Pollinations AI）
- 📷 **AR识别** - 浏览器摄像头拍照识别垃圾分类
- 📱 **响应式设计** - 完美适配手机、平板、电脑

## 本地运行

```bash
# 使用 Python
python -m http.server 3000

# 或使用 Node.js
npx serve . -l 3000
```

访问 http://localhost:3000

## 部署到 Vercel

### 方法一：通过 GitHub 部署（推荐）

1. **创建 GitHub 仓库**
   - 访问 https://github.com/new
   - 创建新仓库，命名为 `eco-web-app`
   - 将 `web-app` 文件夹的所有内容上传到仓库

2. **在 Vercel 导入项目**
   - 访问 https://vercel.com/new
   - 点击 "Import Git Repository"
   - 选择你的 GitHub 仓库
   - 点击 "Deploy"

3. **完成！**
   - Vercel 会自动构建和部署
   - 几分钟后你会获得一个 HTTPS 链接

### 方法二：通过 Vercel CLI 部署

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署项目
cd web-app
vercel --prod
```

## 项目结构

```
web-app/
├── index.html      # 主页面
├── styles.css      # 样式文件
├── app.js          # 应用逻辑
├── vercel.json     # Vercel 配置
├── package.json    # 包配置
├── README.md       # 说明文档
└── images/        # 图片资源
    ├── tab/       # 导航图标
    ├── video/     # 视频封面
    └── ...
```

## 技术栈

- HTML5
- CSS3（Flexbox、Grid、响应式）
- JavaScript（ES6+）
- 无框架依赖

## 注意事项

- AR识别功能需要 HTTPS 或 localhost 才能访问摄像头
- AI问答使用免费的 Pollinations API，如需更稳定的AI服务可替换为其他API
- 部署后记得在 Vercel 控制台配置自定义域名（可选）

## 许可证

MIT
