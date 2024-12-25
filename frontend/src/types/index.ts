export interface LunarDate {
  year: number | null;
  month: number;
  day: number;
}

export interface SolarDate {
  year: number | null;
  month: number | null;
  day: number | null;
}

export interface Birthday {
  id: string;
  name: string;
  lunar_date: LunarDate;
  solar_date: SolarDate;
  type: 'lunar' | 'solar';
  notes?: string;
}
