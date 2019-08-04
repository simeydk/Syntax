function timeStampToSeconds(timeStamp) {
  if(typeof(timeStamp) !== 'string') return;
  const re = /(?:(\d+)m)?(?:(\d+)s?)?/;
  const match = timeStamp.match(re);
  const [unused, minStr, secStr] = match;
  const mins = minStr ? Number(minStr) : 0;
  const secs = secStr ? Number(secStr) : 0;
  const totalSecs = mins * 60 + secs;
  return totalSecs;
}

function secondsToTimeStamp(seconds) {
    const rounded = Math.round(seconds,0)
    const mins = Math.floor(rounded,60)
    const secs = rounded - mins
    const minStr = mins ? mins + "m" : ""
    const secStr = secs + "s"
    const str = minStr + secStr
    return str
}

export default timeStampToSeconds;
export {timeStampToSeconds, secondsToTimeStamp}
