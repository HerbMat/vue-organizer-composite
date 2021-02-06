import HourDescription from '@/domain/domain/HourDescription'

function getTimeFrame (): Array<HourDescription> {
  const timeframes: Array<HourDescription> = []
  for (let i = 1; i < 25; ++i) {
    timeframes.push({ startHour: i, endHour: i + 1, description: '' })
  }
  return timeframes
}

export default getTimeFrame
