export const epochToMinimalDate = (epochTime: number) => {
    const date: Date = new Date(epochTime * 1000)
    const options: Intl.DateTimeFormatOptions = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour12: true
    }
    return date.toLocaleString('en-GB', options)
}
