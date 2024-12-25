#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""配置加载模块"""

from pathlib import Path

def load_config():
    """加载配置"""
    return {
        'BIRTHDAY_FILE': Path('backend/data/birthdays.json'),
        'DEBUG': True,
    } 