#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
日期转换工具

提供农历和公历日期之间的转换功能。
使用 lunar-python 库实现日期转换。
"""

from typing import Tuple, Optional
from datetime import datetime, date
from lunar_python import Lunar as LunarCalendar, Solar as SolarCalendar
from ..models.birthday import LunarDate, SolarDate

class DateConverter:
    """日期转换工具类"""
    
    @staticmethod
    def lunar_to_solar(lunar_date: LunarDate, year: Optional[int] = None) -> SolarDate:
        """
        农历转换为公历
        
        Args:
            lunar_date: 农历日期
            year: 指定年份，默认为当前年
            
        Returns:
            SolarDate: 转换后的公历日期
        """
        if year is None:
            year = datetime.now().year
            
        # 创建农历日期对象
        lunar = LunarCalendar.fromYmd(year, lunar_date.month, lunar_date.day)
        solar = lunar.getSolar()
        
        return SolarDate(
            year=solar.getYear(),
            month=solar.getMonth(),
            day=solar.getDay()
        )
    
    @staticmethod
    def solar_to_lunar(solar_date: SolarDate) -> LunarDate:
        """
        公历转换为农历
        
        Args:
            solar_date: 公历日期
            
        Returns:
            LunarDate: 转换后的农历日期
        """
        if not all([solar_date.year, solar_date.month, solar_date.day]):
            raise ValueError("需要完整的公历日期")
            
        # 创建公历日期对象
        solar = SolarCalendar.fromYmd(solar_date.year, solar_date.month, solar_date.day)
        lunar = solar.getLunar()
        
        return LunarDate(
            year=lunar.getYear(),
            month=lunar.getMonth(),
            day=lunar.getDay()
        )
    
    @staticmethod
    def calculate_days_until(target_date: date, is_lunar: bool = False) -> int:
        """
        计算距离目标日期的天数
        
        Args:
            target_date: 目标日期
            is_lunar: 是否为农历日期
            
        Returns:
            int: 距离天数
        """
        today = date.today()
        
        if is_lunar:
            # 如果是农历日期，需要先转换为公历
            lunar_date = LunarDate(
                year=target_date.year,
                month=target_date.month,
                day=target_date.day
            )
            solar_date = DateConverter.lunar_to_solar(lunar_date)
            target_date = date(solar_date.year, solar_date.month, solar_date.day)
        
        # 计算日期差
        delta = target_date - today
        return delta.days 
