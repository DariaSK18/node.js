export function getSeason() {
    const month = new Date().getMonth()
    let season
    switch (month) {
        case 11:
        case 0:
        case 1:
            season = 'Winter'
            break;
        case 2:
        case 3:
        case 4:
            season = 'Spring'
            break;
        case 5:
        case 6:
        case 7:
            season = 'Summen'
            break;
        case 8:
        case 9:
        case 10:
            season = 'Autumn'
            break;
        default:
            season = 'Unknown season'
            break;
    }
    return season
}

export function getDay() {
    const dayNum = new Date().getDay()
    // let day
    // switch (dayNum) {
    //     case 0:
    //         day = 'Sunday'
    //         break;
    //     case 1:
    //         day = 'Monday'
    //         break;
    //     case 2:
    //         day = 'Tuesday'
    //         break;
    //     case 3:
    //         day = 'Wednesday'
    //         break;
    //     case 4:
    //         day = 'Thursday'
    //         break;
    //     case 5:
    //         day = 'Friday'
    //         break;
    //     case 6:
    //         day = 'Saturday'
    //         break;
    //     default:
    //         day = 'Unknown day'
    //         break;
    // }
    // return day

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[dayNum] ?? 'Unknown day'
}

export function getTime() {
    const hours = new Date().getHours()
    if (hours >= 5 && hours < 12) return 'Morning'
    if (hours >= 12 && hours < 18) return 'Afternoon'
    if (hours >= 18 && hours < 23) return 'Evening'
    else return 'Night'
}
