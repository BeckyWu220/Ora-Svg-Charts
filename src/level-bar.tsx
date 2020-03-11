import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface LevelBarProps {
  level: number,
  colors: Array<string>,
  height: number,
  style: object
}

export default function LevelBar(props: LevelBarProps) {
  const { level = 1, colors = ['#C3C9CE', '#86939E', '#74828F', '#687480', '#4D6071'], height = 24, style } = props

  const container = React.useRef()

  const [barWidth, setBarWidth] = React.useState(0)

  return (
    <View ref={container} style={{ flexDirection: 'row', width: '100%', ...props.style }} onLayout={() => {
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
                borderTopLeftRadius: index === 0 ? 10 : 0, 
                borderBottomLeftRadius: index === 0 ? 10 : 0,
                borderTopRightRadius: index === colors.length - 1 ?  10 : 0, 
                borderBottomRightRadius: index === colors.length - 1 ? 10 : 0 
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
    backgroundColor: '#F1F1F1'
  },
  levelText: {
    color: 'white',
    fontWeight: 'bold'
  }
})