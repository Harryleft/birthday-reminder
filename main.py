#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
生日提醒应用主入口

这个模块作为应用程序的主入口点，负责初始化Flask应用、
配置加载以及路由注册等核心功能。
"""

from flask import Flask
from flask import send_from_directory
from flask_cors import CORS
from backend.src.controllers import register_routes
from backend.config.config import load_config
import os

def create_app() -> Flask:
    """
    创建并配置Flask应用实例
    
    Returns:
        Flask: 配置完成的Flask应用实例
    """
    app = Flask(__name__)
    
    # 启用CORS支持
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    # 加载配置
    config = load_config()
    app.config.update(config)
    
    # 注册路由
    register_routes(app)
    
    # 添加前端静态文件路由
    @app.route('/')
    def serve_frontend():
        return send_from_directory('frontend/dist', 'index.html')
    
    @app.route('/<path:path>')
    def serve_static(path):
        return send_from_directory('frontend/dist', path)
    
    return app

def main() -> None:
    """
    应用程序主入口函数
    """
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)

if __name__ == '__main__':
    main()
