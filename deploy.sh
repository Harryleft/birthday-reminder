#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 打印带颜色的日志
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

# 检查命令是否执行成功
check_result() {
    if [ $? -ne 0 ]; then
        error "$1"
        exit 1
    fi
}

# 1. 系统准备
log "开始系统准备..."
sudo apt update
check_result "系统更新失败"
sudo apt upgrade -y
check_result "系统升级失败"

# 安装必要工具
log "安装必要工具..."
sudo apt install -y git curl vim nginx python3 python3-pip python3-venv
check_result "工具安装失败"

# 2. 创建项目目录
log "创建项目目录..."
mkdir -p /home/pi/apps
cd /home/pi/apps

# 3. 克隆项目（如果不存在）
if [ ! -d "birthday-alert" ]; then
    log "克隆项目..."
    git clone https://github.com/yourusername/birthday-alert.git
    check_result "项目克隆失败"
fi

cd birthday-alert

# 4. Python环境配置
log "配置Python环境..."
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
check_result "Python依赖安装失败"

# 5. Node.js安装
log "安装Node.js..."
if ! command -v nvm &> /dev/null; then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    check_result "NVM安装失败"
fi

nvm install 16
nvm use 16
check_result "Node.js安装失败"

# 6. 前端构建
log "构建前端..."
cd frontend
npm install
check_result "NPM依赖安装失败"
npm run build
check_result "前端构建失败"
cd ..

# 7. Nginx配置
log "配置Nginx..."
sudo tee /etc/nginx/sites-available/birthday-alert > /dev/null << EOF
server {
    listen 80;
    server_name localhost;

    location / {
        root /home/pi/apps/birthday-alert/frontend/dist;
        try_files \$uri \$uri/ /index.html;
    }

    location /api {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/birthday-alert /etc/nginx/sites-enabled/
sudo nginx -t
check_result "Nginx配置测试失败"
sudo systemctl restart nginx
check_result "Nginx重启失败"

# 8. 配置系统服务
log "配置系统服务..."
sudo tee /etc/systemd/system/birthday-alert.service > /dev/null << EOF
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
EOF

sudo systemctl daemon-reload
sudo systemctl enable birthday-alert
sudo systemctl start birthday-alert
check_result "后端服务启动失败"

# 9. 配置自动启动
log "配置自动启动..."
tee /home/pi/start-birthday-alert.sh > /dev/null << EOF
#!/bin/bash
export DISPLAY=:0
chromium-browser --kiosk http://localhost &
EOF

chmod +x /home/pi/start-birthday-alert.sh

mkdir -p ~/.config/autostart
tee ~/.config/autostart/birthday-alert.desktop > /dev/null << EOF
[Desktop Entry]
Type=Application
Name=Birthday Alert
Exec=/home/pi/start-birthday-alert.sh
EOF

# 10. 设置权限
log "设置权限..."
sudo chown -R pi:pi /home/pi/apps/birthday-alert

# 11. 创建备份脚本
log "创建备份脚本..."
tee /home/pi/backup-birthday-alert.sh > /dev/null << EOF
#!/bin/bash
DATE=\$(date +%Y%m%d)
BACKUP_DIR="/home/pi/backups"
mkdir -p \$BACKUP_DIR
cp /home/pi/apps/birthday-alert/backend/data/birthdays.json \$BACKUP_DIR/birthdays_\$DATE.json
EOF

chmod +x /home/pi/backup-birthday-alert.sh

# 12. 添加定时任务
log "配置定时任务..."
(crontab -l 2>/dev/null; echo "0 0 * * * sudo systemctl restart birthday-alert") | crontab -
(crontab -l 2>/dev/null; echo "0 0 * * * /home/pi/backup-birthday-alert.sh") | crontab -

log "部署完成！"
log "请检查以下服务状态："
log "1. 后端服务：sudo systemctl status birthday-alert"
log "2. Nginx服务：sudo systemctl status nginx"
log "3. 访问 http://localhost 测试应用" 