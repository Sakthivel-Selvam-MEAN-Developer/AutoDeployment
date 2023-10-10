export const formatDuration = (durationInMillis: number) => {
    const minutes: number = Math.floor(durationInMillis / 60000);
    const min: number = Math.floor(durationInMillis / 60000) % 60;
    const hours: number = Math.floor(durationInMillis / (60000 * 60));
    const days: number = Math.floor(durationInMillis / (24 * 60000 * 60));

    if (days > 10) {
        return `${days} ${days === 1 ? 'day' : 'days'}`;
    } else if (hours > 0 && min >= 0) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} and ${min} ${
            min === 1 ? 'min' : 'mins'
        }`;
    } else {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    }
};

export const epochToDate = (epochTime: number) => {
    const date: Date = new Date(epochTime * 1000);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    return date.toLocaleString('en-US', options);
};
