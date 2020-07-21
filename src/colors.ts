export const palette = {
  /** Basic */
  black: "#1D1D1D",
  white: "#FFFFFF",
  
  /** Blueish */
  blue_100: '#C3C9CE',
  blue_200: '#86939E', 
  blue_300: '#74828F',
  blue_400: '#687480', 
  blue_500: '#4D6071',
  blue_600: '#3E5567',
  blue_700: '#9EA8B7',

  /** Grayish */
  gray_100: '#F1F1F1',
  gray_200: '#63819B',
  gray_300: '#E3E3E3',
  gray_400: '#4A4A4A',
  gray_500: '#A9A9A9',
  gray_600: '#5F5F5F',
  gray_700: '#4B5156',

  /** Purple */
  purple_100: '#7D6A80',
  purple_200: '#8A7E89',

  /** Green */
  green_100: '#74988C',
  green_200: '#778F83',

}

export const getRandomColor = () => {
  const availableColors = Object.values(palette)
  const firstColorIndex = Math.floor((Math.random() * availableColors.length))
  let secondColorIndex = null
  do {
    secondColorIndex = Math.floor((Math.random() * availableColors.length))
  } while (secondColorIndex === firstColorIndex)
  
  const firstColorHex = availableColors[firstColorIndex].replace('#', '')
  const secondColorHex = availableColors[secondColorIndex].replace('#', '')

  const firstColorPartials = firstColorHex.match(/.{2}/g); 
  const secondColorPartials = secondColorHex.match(/.{2}/g); 
  const blendColorPartials = firstColorPartials.map((p, index) => {

    const firstPartial = parseInt(`0x${p}`)
    const secondPartial = parseInt(`0x${secondColorPartials[index]}`)

    const avgPartial = Math.floor((firstPartial + secondPartial) / 2)
    return avgPartial.toString(16)
  }).join('')
  return `#${blendColorPartials}`
}

export const blendWithWhite = (color) => {
  const firstColorHex = color.replace('#', '')
  const secondColorHex = 'FFFFFF'

  const firstColorPartials = firstColorHex.match(/.{2}/g); 
  const secondColorPartials = secondColorHex.match(/.{2}/g); 
  const blendColorPartials = firstColorPartials.map((p, index) => {

    const firstPartial = parseInt(`0x${p}`)
    const secondPartial = parseInt(`0x${secondColorPartials[index]}`)

    const avgPartial = Math.floor(((firstPartial + secondPartial) / 2 + firstPartial) / 2)
    return avgPartial.toString(16)
  }).join('')
  return `#${blendColorPartials}`
}

