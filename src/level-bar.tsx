import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { palette } from './colors'

export interface LevelBarProps {
  level: number,
  colors: Array<string>,
  height?: number,
  borderRadius?: number,
  style: object
}

export default function LevelBar(props: LevelBarProps) {
  const { 
    level = 1, 
    colors = [palette.blue_100, palette.blue_200, palette.blue_300, palette.blue_400, palette.blue_500], 
    height = 24,
    borderRadius = 10, 
    style } = props

  const container = React.useRef()

  const [barWidth, setBarWidth] = React.useState(0)

  return (
    <View ref={container} style={{ flexDirection: 'row', flex: 1, ...props.style }} onLayout={() => {
      container.current.measure((x, y, width, height) => {
        setBarWidth(width)
      })
    }}>
      { colors.map((color, index) => (
        <View key={index} style={[styles.barContainer, { width: barWidth/colors.length, height }]}>
          <View
            style={[
              styles.bar, 
              index < level ? { backgroundColor: color } : null,
              { 
                borderTopLeftRadius: index === 0 ? borderRadius : 0, 
                borderBottomLeftRadius: index === 0 ? borderRadius : 0,
                borderTopRightRadius: index === colors.length - 1 ?  borderRadius : 0, 
                borderBottomRightRadius: index === colors.length - 1 ? borderRadius : 0 
              }
            ]}
          >
            { index === level - 1 &&
              <Text style={styles.levelText}>{level}</Text>
            }
          </View>
        </View>
      ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  barContainer: {
    paddingHorizontal: 1.5
  },
  bar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.gray_100
  },
  levelText: {
    color: palette.white,
    fontWeight: 'bold',
    fontFamily: "SourceSansPro-Regular"
  }
})