export default ({ dimensions, fileName, tempLocalPath }) => {
  const { height, width } = dimensions.imageUrl
  const mainDimension = `${width}${hasHeight(height)}`
  return Object.keys(dimensions).map(key => {
    const size          = dimensions[ key ]
    const newDimension  = `${size.width}${hasHeight(size.height)}`
    const name          = fileName.replace(mainDimension, newDimension)
    const srcPath       = tempLocalPath.replace(mainDimension, newDimension)
    return { name, size, srcPath }
  })
}

const hasHeight = (height) => height ? `x${height}` : ''
