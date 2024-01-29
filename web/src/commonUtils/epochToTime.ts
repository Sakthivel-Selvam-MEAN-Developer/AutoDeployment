export const formatDuration = (durationInMillis: number) => {
    const minutes: number = Math.floor(durationInMillis / 60000)
    const minutesMoreThan1Hour: number = Math.floor(durationInMillis / 60000) % 60
    const hours: number = Math.floor(durationInMillis / (60000 * 60))
    const days: number = Math.floor(durationInMillis / (24 * 60000 * 60))
    const hoursMoreThan24: number = Math.floor((durationInMillis / (60000 * 60)) % 24)

    if (days > 0 && hoursMoreThan24 >= 0) {
        return `${days} ${days === 1 ? 'day' : 'days'} and ${hoursMoreThan24} ${
            hoursMoreThan24 === 1 ? 'hour' : 'hours'
        }`
    } else if (hours > 0 && minutesMoreThan1Hour >= 0) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} and ${minutesMoreThan1Hour} ${
            minutesMoreThan1Hour === 1 ? 'min' : 'mins'
        }`
    } else {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
    }
}

export const epochToDate = (epochTime: number) => {
    const date: Date = new Date(epochTime * 1000)
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }
    return date.toLocaleString('en-US', options)
}

export const epochToMinimalDate = (epochTime: number) => {
    const date: Date = new Date(epochTime * 1000)
    const options: Intl.DateTimeFormatOptions = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour12: true
    }
    return date.toLocaleString('en-US', options)
}
