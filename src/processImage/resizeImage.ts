import sharp from 'sharp'

const getDimensions = (size:any, metadata:sharp.Metadata) => {
  if ((size.width > 0 || size.height > 0) && size.width === size.height) return size
  const width = metadata.width! <= metadata.height! ? size.width : null
  const height = metadata.height! <= metadata.width! ? size.height : null
  return {height, width}
}

export default async ({ buffer, size, srcPath }) => {
  try {  
    const image = sharp(buffer)
    await image.metadata().then(metadata => {
      const {height, width} = getDimensions(size, metadata)

      return image
        .resize(width, height, { kernel: sharp.kernel.lanczos3, withoutEnlargement: true })
        .toFormat(metadata.format!)
        .toFile(srcPath)
    })
  } catch (error) {
    console.error('Failed to resize', srcPath, error)
  }
}