function formatHour (hour: number): string {
  const date = new Date(0)
  date.setHours(hour)
  return date.toISOString().substr(11, 5)
}

export { formatHour }
