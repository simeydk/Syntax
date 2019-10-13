function getHashParams() {
  if (typeof window === 'undefined') return {}

  const hashString = window.location.hash
  const hashObj = {}
  hashString.slice(1).split('&').forEach(hashParam => {
    const [key,val] = hashParam.split('=')
    hashObj[key] = val === undefined ? true : val
  })
  return hashObj
} 

export default getHashParams