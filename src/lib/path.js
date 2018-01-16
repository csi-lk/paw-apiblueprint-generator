// Returns path from url
export default (url) => {
  let path = url.replace(/^https?:\/\/[^/]+/i, '')
  if (!path) {
    path = '/'
  }
  return path
}
