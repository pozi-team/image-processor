import fs from 'fs'

export default (tempLocalPath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(tempLocalPath, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}