# 树莓派部署指南

## 1. 系统准备

### 1.1 更新系统
```bash
sudo apt update
sudo apt upgrade -y
```

### 1.2 安装必要工具
```bash
sudo apt install -y git curl vim nginx
```

## 2. 安装 Python 环境

### 2.1 安装 Python 和相关工具
```bash
sudo apt install -y python3 python3-pip python3-venv
```

### 2.2 创建项目目录
```bash
mkdir -p /home/pi/apps
cd /home/pi/apps
git clone <your-repository-url> birthday-alert
cd birthday-alert
```

### 2.3 创建并激活虚拟环境
```bash
python3 -m venv venv
source venv/bin/activate
```

### 2.4 安装后端依赖
```bash
pip install -r requirements.txt
```

## 3. 安装 Node.js 环境

### 3.1 使用 Node Version Manager (nvm)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 16
nvm use 16
```

### 3.2 构建前端项目
```bash
cd frontend
npm install
npm run build
```

## 4. 配置 Nginx

### 4.1 创建 Nginx 配置文件
```bash
sudo nano /etc/nginx/sites-available/birthday-alert
```

### 4.2 添加以下配置
```nginx
server {
    listen 80;
    server_name localhost;  # 或你的域名

    # 前端静态文件
    location / {
        root /home/pi/apps/birthday-alert/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # 后端 API
    location /api {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 4.3 启用站点配置
```bash
sudo ln -s /etc/nginx/sites-available/birthday-alert /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 5. 配置后端服务

### 5.1 创建 systemd 服务文件
```bash
sudo nano /etc/systemd/system/birthday-alert.service
```

### 5.2 添加以下内容
```ini
[Unit]
Description=Birthday Alert Backend Service
After=network.target

[Service]
User=pi
WorkingDirectory=/home/pi/apps/birthday-alert
Environment="PATH=/home/pi/apps/birthday-alert/venv/bin"
ExecStart=/home/pi/apps/birthday-alert/venv/bin/python main.py
Restart=always

[Install]
WantedBy=multi-user.target
```

### 5.3 启动服务
```bash
sudo systemctl daemon-reload
sudo systemctl enable birthday-alert
sudo systemctl start birthday-alert
```

## 6. 配置自动启动

### 6.1 创建自动启动脚本
```bash
nano /home/pi/start-birthday-alert.sh
```

### 6.2 添加以下内容
```bash
#!/bin/bash
export DISPLAY=:0
chromium-browser --kiosk http://localhost &
```

### 6.3 设置执行权限
```bash
chmod +x /home/pi/start-birthday-alert.sh
```

### 6.4 添加到自启动
```bash
mkdir -p ~/.config/autostart
nano ~/.config/autostart/birthday-alert.desktop
```

添加以下内容：
```ini
[Desktop Entry]
Type=Application
Name=Birthday Alert
Exec=/home/pi/start-birthday-alert.sh
```

## 7. 检查和维护

### 7.1 检查服务状态
```bash
sudo systemctl status birthday-alert
sudo systemctl status nginx
```

### 7.2 查看日志
```bash
sudo journalctl -u birthday-alert -f
sudo tail -f /var/log/nginx/error.log
```

### 7.3 更新应用
```bash
cd /home/pi/apps/birthday-alert
git pull
cd frontend
npm install
npm run build
cd ..
sudo systemctl restart birthday-alert
```

## 8. 注意事项

1. 确保数据目录有正确的权限：
```bash
sudo chown -R pi:pi /home/pi/apps/birthday-alert
```

2. 设置防火墙规则（如果启用了防火墙）：
```bash
sudo ufw allow 80
```

3. 配置定时任务（可选）：
```bash
crontab -e
# 添加以下内容以每天重启服务
0 0 * * * sudo systemctl restart birthday-alert
```

4. 备份数据：
```bash
# 创建定时备份脚本
nano /home/pi/backup-birthday-alert.sh
```

添加以下内容：
```bash
#!/bin/bash
DATE=$(date +%Y%m%d)
BACKUP_DIR="/home/pi/backups"
mkdir -p $BACKUP_DIR
cp /home/pi/apps/birthday-alert/backend/data/birthdays.json $BACKUP_DIR/birthdays_$DATE.json
```

设置定时备份：
```bash
chmod +x /home/pi/backup-birthday-alert.sh
crontab -e
# 添加以下内容以每天备份数据
0 0 * * * /home/pi/backup-birthday-alert.sh
```

## 9. 故障排除

1. 如果前端无法访问后端 API：
- 检查 Nginx 配置
- 确认后端服务正在运行
- 检查防火墙设置

2. 如果自动启动失败：
- 检查权限设置
- 确认路径是否正确
- 查看系统日志

3. 如果数据无法保存：
- 检查目录权限
- 确认数据文件存在
- 查看后端日志

4. 如果显示不正常：
- 调整浏览器缩放设置
- 检查显示分辨率
- 确认 CSS 样式是否正确加载 