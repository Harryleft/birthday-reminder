#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""生日信息模型"""

from dataclasses import dataclass
from typing import List, Optional

@dataclass
class LunarDate:
    """农历日期"""
    year: Optional[int]
    month: int
    day: int

@dataclass
class SolarDate:
    """公历日期"""
    year: Optional[int]
    month: Optional[int]
    day: Optional[int]

@dataclass
class Birthday:
    """生日信息"""
    id: str
    name: str
    lunar_date: LunarDate
    solar_date: SolarDate
    type: str
    notes: Optional[str] = None

    @classmethod
    def from_dict(cls, data: dict) -> 'Birthday':
        """从字典创建实例"""
        return cls(
            id=data['id'],
            name=data['name'],
            lunar_date=LunarDate(**data['lunar_date']),
            solar_date=SolarDate(**data['solar_date']),
            type=data['type'],
            notes=data.get('notes')
        )

    def to_dict(self) -> dict:
        """转换为字典"""
        return {
            'id': self.id,
            'name': self.name,
            'lunar_date': {
                'year': self.lunar_date.year,
                'month': self.lunar_date.month,
                'day': self.lunar_date.day
            },
            'solar_date': {
                'year': self.solar_date.year,
                'month': self.solar_date.month,
                'day': self.solar_date.day
            },
            'type': self.type,
            'notes': self.notes
        } 
