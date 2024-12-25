import Pinyin from 'chinese-to-pinyin';

export class NameTranslator {
  static toEnglish(name: string): string {
    // 将中文名转换为拼音
    const pinyinStr = Pinyin(name, {
      removeSpace: false,
      toneType: 'none'
    });

    // 分割姓名
    const parts = pinyinStr.split(' ').filter(Boolean) as string[];
    const words = parts.map((part: string) => 
      part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    );

    // 假设最后一个字是名，其他的是姓
    if (words.length > 1) {
      const lastName = words[0];
      const firstName = words.slice(1).join(' ');
      return `${lastName} ${firstName}`;
    }

    return words.join(' ');
  }

  static toChinese(name: string): string {
    // 如果是英文名，可以保持原样或者查询映射表
    return name;
  }

  static translate(name: string, locale: 'zh' | 'en'): string {
    // 检测名字是否为中文
    const isChinese = /[\u4e00-\u9fa5]/.test(name);
    
    if (locale === 'en' && isChinese) {
      return this.toEnglish(name);
    }
    if (locale === 'zh' && !isChinese) {
      return this.toChinese(name);
    }
    return name;
  }
} 