declare module 'chinese-to-pinyin' {
  interface PinyinOptions {
    removeSpace?: boolean;
    toneType?: 'none' | 'number' | 'symbol';
  }

  function Pinyin(text: string, options?: PinyinOptions): string;
  export default Pinyin;
} 