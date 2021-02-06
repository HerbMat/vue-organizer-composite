import HourDescription from '@/domain/domain/HourDescription'

export default interface DayList {
  key: string;
  hourDescription: Array<HourDescription>;
}
