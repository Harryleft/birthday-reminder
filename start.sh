#!/bin/bash

# Detect operating system
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux system
    echo "Detected Linux system"
    
    # Create virtual environment if not exists
    if [ ! -d ".venv" ]; then
        echo "Creating Python virtual environment..."
        python3 -m venv .venv
    fi
    
    # Activate virtual environment
    source .venv/bin/activate
    
    # Install dependencies
    echo "Installing Python dependencies..."
    pip install -r requirements.txt
    
    # Start backend service
    echo "Starting backend service..."
    python main.py &
    
    # Enter frontend directory
    cd frontend
    
    # Install frontend dependencies
    echo "Installing frontend dependencies..."
    npm install
    
    # Start frontend development server
    echo "Starting frontend service..."
    npm run dev
    
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    # Windows 系统
    echo "检测到 Windows 系统"
    
    # 创建虚拟环境（如果不存在）
    if not exist ".venv" (
        echo "创建 Python 虚拟环境..."
        python -m venv .venv
    )
    
    # 激活虚拟环境
    call .venv\Scripts\activate
    
    # 安装依赖
    echo "安装 Python 依赖..."
    pip install -r requirements.txt
    
    # 启动后端服务
    echo "启动后端服务..."
    start /B python main.py
    
    # 进入前端目录
    cd frontend
    
    # 安装前端依赖
    echo "安装前端依赖..."
    npm install
    
    # 启动前端开发服务器
    echo "启动前端服务..."
    npm run dev
    
else
    echo "不支持的操作系统类型: $OSTYPE"
    exit 1
fi 