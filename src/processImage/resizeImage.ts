import sharp from 'sharp'

export default async ({ buffer, size, srcPath }) => {
  try {  
    const image = sharp(buffer)
    await image.metadata().then(metadata => {
      const w = metadata.width! <= metadata.height! ? size.width : null
      const h = metadata.height! <= metadata.width! ? size.height : null

      return image
        .resize(w, h, { kernel: sharp.kernel.lanczos3, withoutEnlargement: true })
        .toFormat(metadata.format!)
        .toFile(srcPath)
    })
  } catch (error) {
    console.error('Failed to resize', srcPath, error)
  }
}