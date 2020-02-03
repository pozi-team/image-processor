import fs from 'fs'

import deleteTemporaryFile from './deleteTemporaryFile'
import getJobs from './getJobs'
import resizeImage from './resizeImage'

export default async ({ dimensions, file }) => {
  const fileName = file.name
  const filePath = fileName.replace(/\//g, '-')
  const tempLocalPath = `/tmp/${filePath}`
  const jobs = getJobs({ dimensions, fileName, tempLocalPath })

  return file.download({ destination: tempLocalPath })
    .then(async () => {
      // Resize image.
      const buffer = fs.readFileSync(tempLocalPath)

      const promises = []
      jobs.forEach(({ size, srcPath }) => {
        // @ts-ignore
        promises.push( resizeImage({ buffer, size, srcPath }) )
      })
      return Promise.all( promises )
    })
    .then(() => {
      // Upload back into the bucket.
      const promises = []
      jobs.forEach(({ name, srcPath }) => {
        // @ts-ignore
        promises.push( file.bucket.upload(srcPath, { destination: name }) )
        console.log('Processed', srcPath)
      })
      return Promise.all( promises )
    })
    .then(() => deleteTemporaryFile( tempLocalPath ))
    .catch(err => Promise.reject(err))
}