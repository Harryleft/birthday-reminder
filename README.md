# 生日倒计日提醒

一个简洁高效的生日管理和倒计日提醒应用，支持农历生日，便于个人管理亲友的生日。

## 功能特点

- 🎂 农历生日管理
- ⏰ 倒计时提醒
- 🌏 中英文界面
- 🖥️ 全屏展示
- 💾 自动备份
- 🔄 定时刷新

## 技术栈

### 前端
- React 18
- TypeScript 4.8+
- Styled Components
- Vite

### 后端
- Python 3.8+
- Flask

## 项目结构

```
birthday-reminder/
├── backend/                # 后端代码
│   ├── src/
│   │   ├── models/        # 数据模型
│   │   ├── services/      # 业务逻辑
│   │   ├── controllers/   # 路由控制
│   │   └── utils/         # 工具函数
│   ├── tests/             # 测试文件
│   ├── config/            # 配置文件
│   └── data/              # 数据存储
├── frontend/              # 前端代码
│   ├── src/
│   │   ├── components/    # React组件
│   │   ├── hooks/         # 自定义Hooks
│   │   ├── services/      # API服务
│   │   ├── styles/        # 样式文件
│   │   ├── types/         # 类型定义
│   │   └── utils/         # 工具函数
│   └── public/            # 静态资源
└── docs/                  # 文档
```

## 功能说明

### 生日管理
- 添加：支持输入农历日期
- 编辑：修改已有生日信息
- 删除：移除不需要的记录
- 自动转换：农历日期自动转换为公历显示

### 倒计时显示
- 自动计算最近生日
- 显示剩余天数
- 同时展示农历和公历日期

### 界面设计
- 全屏沉浸式体验
- 简洁优雅的界面
- 响应式布局
- 支持中英文切换

## 部署说明

详细的部署步骤请参考 [部署指南](DEPLOY.md)。

### 快速部署
```bash
# 克隆项目
git clone https://github.com/yourusername/birthday-alert.git

# 运行部署脚本
chmod +x deploy.sh
./deploy.sh
```

## 开发指南

### 环境要求
- Node.js 16+
- Python 3.8+
- Git

### 开发设置
```bash
# 前端开发
cd frontend
npm install
npm run dev

# 后端开发
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

## 贡献指南

欢迎提交 Pull Request 或提出 Issue。

## 许可证

MIT License


