#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
生日信息服务

处理生日信息的增删改查操作。
"""

import json
from typing import List, Optional
from datetime import datetime
from pathlib import Path
from ..models.birthday import Birthday, LunarDate, SolarDate
from ..utils.date_converter import DateConverter

class BirthdayService:
    """生日信息服务类"""
    
    def __init__(self, birthday_file: Path):
        """
        初始化服务
        
        Args:
            birthday_file: 生日数据文件路径
        """
        self.birthday_file = birthday_file
        self.date_converter = DateConverter()
        self._ensure_file_exists()
    
    def _ensure_file_exists(self) -> None:
        """确保数据文件存在"""
        if not self.birthday_file.exists():
            self.birthday_file.parent.mkdir(parents=True, exist_ok=True)
            self.birthday_file.write_text('{"birthdays": []}')
    
    def     get_all(self) -> List[Birthday]:
        """
        获取所有生日信息，并计算公历日期
        
        Returns:
            List[Birthday]: 生日信息列表
        """
        with open(self.birthday_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            birthdays = []
            
            for item in data['birthdays']:
                birthday = Birthday.from_dict(item)
                # 如果是农历生日，计算当年的公历日期
                if birthday.type == 'lunar' and not all([
                    birthday.solar_date.year,
                    birthday.solar_date.month,
                    birthday.solar_date.day
                ]):
                    current_year = datetime.now().year
                    solar_date = self.date_converter.lunar_to_solar(
                        birthday.lunar_date,
                        current_year
                    )
                    birthday.solar_date = solar_date
                birthdays.append(birthday)
            
            return birthdays
    
    def add(self, birthday: Birthday) -> bool:
        """
        添加生日信息
        
        Args:
            birthday: 生日信息对象
            
        Returns:
            bool: 是否添加成功
        """
        birthdays = self.get_all()
        
        # 如果是农历生日，计算公历日期
        if birthday.type == 'lunar':
            birthday.solar_date = self.date_converter.lunar_to_solar(
                birthday.lunar_date
            )
        # 如果是公历生日，计算农历日期
        else:
            birthday.lunar_date = self.date_converter.solar_to_lunar(
                birthday.solar_date
            )
        
        birthdays.append(birthday)
        
        with open(self.birthday_file, 'w', encoding='utf-8') as f:
            json.dump({'birthdays': [b.to_dict() for b in birthdays]}, f, 
                     ensure_ascii=False, indent=2)
        
        return True 
