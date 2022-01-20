const convertMilliSecsToMins = (durationInMs)=> {
    return durationInMs / 60000;
};

const timeRemaning = (datetime, duration)=> {

    var timeRemains = '',

    eventDateStart = new Date(datetime).getTime(),
    eventDateEnd = eventDateStart + duration,
    today = new Date().getTime(),

    diffInMilliSecs = Math.floor(eventDateStart - today),
    diffInSecs = Math.floor(diffInMilliSecs / 1000),
    diffInMins = Math.floor(diffInSecs / 60),
    diffInHrs = Math.floor(diffInMins / 60),
    diffInDays = Math.floor(diffInHrs / 24),
    diffInWeeks = Math.floor(diffInDays / 7);

    if(diffInWeeks > 0) timeRemains = `${diffInWeeks} weeks`
    else if(diffInDays > 0) timeRemains = `${diffInDays} days`
    else if(diffInHrs > 0) timeRemains = `${diffInHrs} hours`
    else if(diffInMins > 0) timeRemains = `${diffInMins} minutes`
    else if(diffInSecs > 0) timeRemains = `${diffInSecs} seconds`
    else if(Math.floor(eventDateEnd - today) > 0) timeRemains = `In Session`
    else timeRemains = `Done`


    return timeRemains;
};

const timeLapse = (datetime)=> {

    var dateCreated = new Date(datetime).getTime(),
    today = new Date().getTime(),
    time = '',

    diffInMilliSecs = Math.floor(today - dateCreated),
    diffInSecs = Math.floor(diffInMilliSecs / 1000),
    diffInMins = Math.floor(diffInSecs / 60),
    diffInHrs = Math.floor(diffInMins / 60),
    diffInDays = Math.floor(diffInHrs / 24),
    diffInWeeks = Math.floor(diffInDays / 7),
    diffInMonths = Math.floor(diffInWeeks / 4),
    diffInYears = Math.floor(diffInMonths / 12);

    if(diffInYears > 0) time = `${diffInYears} year${(diffInYears == 1) ?'':'s'} ago`
    else if(diffInMonths > 0) time = `${diffInMonths} month${(diffInMonths == 1) ?'':'s'} ago`
    else if(diffInWeeks > 0) time = `${diffInWeeks} week${(diffInWeeks == 1) ?'':'s'} ago`
    else if(diffInDays > 0) time = `${diffInDays} day${(diffInDays == 1) ?'':'s'} ago`
    else if(diffInHrs > 0) time = `${diffInHrs} hr${(diffInHrs == 1) ?'':'s'} ago`
    else if(diffInMins > 0) time = `${diffInMins} min${(diffInMins == 1) ?'':'s'} ago`
    else if(diffInSecs > 0) time = `${diffInSecs} sec${(diffInSecs == 1) ?'':'s'} ago`
    else time = `Less than a sec`


    return time;
};

const duration = { convertMilliSecsToMins, timeRemaning, timeLapse };

export default duration;
