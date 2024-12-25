#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
路由控制器初始化模块

负责注册所有的路由控制器。
"""

from flask import Flask
from .birthday_controller import birthday_bp

def register_routes(app: Flask) -> None:
    """注册所有路由"""
    app.register_blueprint(birthday_bp) 
