#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
生日信息控制器

处理生日相关的HTTP请求。
"""

from typing import Dict, Any
from flask import Blueprint, jsonify, request, current_app
from ..services.birthday_service import BirthdayService
from ..models.birthday import Birthday
from ...config.config import load_config
import traceback

# 创建蓝图
birthday_bp = Blueprint('birthday', __name__)
config = load_config()
birthday_service = BirthdayService(config['BIRTHDAY_FILE'])

@birthday_bp.route('/api/birthday/list', methods=['GET'])
def get_birthdays() -> Dict[str, Any]:
    """获取所有生日信息"""
    try:
        birthdays = birthday_service.get_all()
        return jsonify([b.to_dict() for b in birthdays])
    except Exception as e:
        current_app.logger.error(f"Error in get_birthdays: {str(e)}\n{traceback.format_exc()}")
        return jsonify({'error': str(e)}), 500

@birthday_bp.route('/add', methods=['POST'])
def add_birthday() -> Dict[str, Any]:
    """添加生日信息"""
    try:
        data = request.get_json()
        birthday = Birthday(**data)
        success = birthday_service.add(birthday)
        return jsonify({'success': success})
    except Exception as e:
        return jsonify({'error': str(e)}), 400 