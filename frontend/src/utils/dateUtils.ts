import { Birthday } from '../types';
import { Lunar } from 'lunar-typescript';

export class DateCalculator {
  static getNextBirthday(birthdays: Birthday[]): { birthday: Birthday; daysUntil: number } | null {
    if (!birthdays.length) return null;

    const today = new Date();
    let nearestBirthday: Birthday | null = null;
    let minDays = Infinity;

    birthdays.forEach(birthday => {
      if (!birthday.lunar_date?.month || !birthday.lunar_date?.day) return;

      // 农历转公历
      const lunar = Lunar.fromYmd(
        today.getFullYear(),
        birthday.lunar_date.month,
        birthday.lunar_date.day
      );
      const solar = lunar.getSolar();
      let nextDate = new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay());
      
      // 如果今年的日期已过，计算明年的日期
      if (nextDate < today) {
        const nextYearLunar = Lunar.fromYmd(
          today.getFullYear() + 1,
          birthday.lunar_date.month,
          birthday.lunar_date.day
        );
        const nextSolar = nextYearLunar.getSolar();
        nextDate = new Date(nextSolar.getYear(), nextSolar.getMonth() - 1, nextSolar.getDay());
      }

      const daysUntil = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntil < minDays) {
        minDays = daysUntil;
        nearestBirthday = birthday;
      }
    });

    return nearestBirthday ? { birthday: nearestBirthday, daysUntil: minDays } : null;
  }
}
