生日倒计日提醒

1. 目标

提供简洁高效的生日管理和倒计日提醒功能，支持农历和公历生日的灵活切换，便于个人管理亲友的生日。

2. 目标群众

需要进行生日提醒的用户。

3. 功能模块

3.1 核心功能

生日数据管理

读取：支持从 JSON 文件读取生日数据。

新增：

输入生日时支持农历和公历两种方式。

自动转换公历与农历并存储。

修改：允许用户修改已有生日信息，包括农历/公历切换。

删除：支持删除不需要的生日记录。

生日倒计日提醒

展示：

前端界面显示距离下一个生日的天数倒计日。

可切换显示农历或公历日期。

排序：按日期自动排列，优先显示最近的生日。

通知支持：

提前 N 天提醒用户即将到来的生日（最近的）。

显示农历和对应的公历日期。

国际化支持

多语言支持（如中文、英文），通过切换语言实现界面翻译。

3.2 可选功能

每日提醒：每天定时提醒最近的生日。

自定义提醒规则：如提前 X 天通知，支持定义。

星座或生肖显示（基于公历/农历生日计算）。

4. 技术要求

4.1 系统环境

硬件：树莓派 4B 8G。

操作系统：Debian 系统。

4.2 后端框架

推荐使用：Python 。

优选框架：Flask

数据存储：

JSON 文件

4.3 前端框架
- React
- TailwindCSS
4.4 界面设计
1. 主界面设计
全屏展示区域
居中显示最近生日人的姓名（大字体）
下方显示倒计时天数（醒目数字）
显示具体生日日期（同时展示农历和公历）
背景采用渐变色，搭配柔和的呼吸动效
字体采用优雅的无衬线字体

2. 交互设计
默认状态
启动即全屏
隐藏所有管理控件
纯净的显示界面
交互触发
点击屏幕任意位置显示管理按钮（右上角）
3秒无操作自动隐藏管理按钮
ESC键可退出全屏

3. 管理面板（弹窗形式）
生日列表管理
表格形式展示所有生日信息
支持排序和搜索
每条记录显示姓名、农历日期、公历日期、距离天数
添加/编辑表单
姓名输入框
日期选择器
日期类型选择（农历/公历）下拉框
自动显示转换后的对应日期



5. 项目结构

```
birthday-alert/
├── backend/
│   ├── src/
│   │   ├── __init__.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── birthday.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   └── birthday_service.py
│   │   ├── controllers/
│   │   │   ├── __init__.py
│   │   │   └── birthday_controller.py
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── date_converter.py
│   ├── tests/
│   │   └── __init__.py
│   ├── config/
│   │   └── config.py
│   ├── data/
│   │   └── birthdays.json
│   ├── dist/
│   └── logs/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── BirthdayDisplay/
│   │   │   └── BirthdayDisplay.tsx
│   │   └── ManageButton/
│   │       └── ManageButton.tsx
│   ├── hooks/
│   │   └── useBirthdays.ts
│   ├── services/
│   │   └── api.ts
│   ├── styles/
│   │   ├── GlobalStyles.ts
│   │   └── theme.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── dateUtils.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── main.py
├── requirements.txt
├── start.bat
├── start.sh
└── README.md
```

6. 技术栈说明

6.1 后端技术栈
- Python 3.8+
- Flask Web框架
- JSON文件存储

6.2 前端技术栈
- React 18
- TypeScript 4.8+
- TailwindCSS 3.2
- Axios HTTP客户端

6.3 开发工具
- VSCode/PyCharm
- Git版本控制
- Node.js 16+

7. 开发规范

7.1 代码规范
- Python代码遵循PEP8规范
- TypeScript使用Prettier格式化
- 使用ESLint进行代码检查

7.2 Git提交规范
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 重构
- test: 测试相关
- chore: 构建过程或辅助工具的变动


