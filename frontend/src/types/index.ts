export interface LunarDate {
  year: number | null;
  month: number;
  day: number;
}

export interface SolarDate {
  year: number | null;
  month: number;
  day: number;
}

export interface Birthday {
  id?: string;
  name: string;
  type: 'lunar';
  lunar_date?: LunarDate;
  solar_date?: SolarDate;
  birth_date: string;
  notes?: string;
}
