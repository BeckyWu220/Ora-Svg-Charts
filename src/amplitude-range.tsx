import React from 'react';
import { View, Text, StyleSheet, findNodeHandle } from 'react-native';
import { palette } from './colors';

export interface AmplitudeRangeProps {
  color?: string,
  backgroundColor?: string,
  min: number,
  max: number,
  minAmplitude: number,
  maxAmplitude: number,
  influence: number,
  range: number,
  height?: number,
  borderRadius?: number,
  style?: object
}

export default function AmplitudeRange(props: AmplitudeRangeProps) {

  const { 
    min = 0, 
    max = 100, 
    minAmplitude = 0, 
    maxAmplitude = 100, 
    color = palette.gray_200, 
    height = 16, 
    borderRadius = 8,
    backgroundColor = palette.gray_300
  } = props

  const highlightedPercentage = `${Math.abs(maxAmplitude - minAmplitude) / Math.abs(max-min) * 100}%`
  
  const offset = `${Math.abs(minAmplitude - min) /Math.abs(max-min) * 100}%`

  const initialMarkPosition = {
    x: null,
    y: null,
    width: 0,
    height: 0,
  }

  const [valueMarkerPosition, setValueMarkerPosition] = React.useState(initialMarkPosition)

  const highlightedBar = React.useRef()
  const container = React.useRef()

  const measureHighlightedBar = () => {
    highlightedBar.current && highlightedBar.current.measureLayout(findNodeHandle(container.current), (x, y, width, height) => {
      setValueMarkerPosition({ x, y, width, height })
      let minValueMarkerPositionX = x - 10
      let maxValueMarkerPositionX = x - 10 + width
      if (maxValueMarkerPositionX - minValueMarkerPositionX <= 40) {
        minValueMarkerPositionX = x + width * 0.5 - 20
        maxValueMarkerPositionX = x + width * 0.5
      }
      setMinMarkerPositionX(minValueMarkerPositionX)
      setMaxMarkerPositionX(maxValueMarkerPositionX)
    })
  }

  React.useEffect(() => {
    measureHighlightedBar()
  }, [ minAmplitude, maxAmplitude ])

  const [minMarkerPositionX, setMinMarkerPositionX] = React.useState(null)
  const [maxMarkerPositionX, setMaxMarkerPositionX] = React.useState(null)

  return (
    <View
      ref={container}
      style={{ flex: 1, ...props.style }}
      onLayout={() => {
        measureHighlightedBar()
      }}
    >
      <View style={{ 
          flexGrow: 1, 
          height, 
          backgroundColor, 
          borderRadius, 
          overflow: 'hidden'
        }}>
        {/* Highlighted Bar */}
        <View
          ref={highlightedBar}
          style={{
            position: 'absolute', 
            top: 0, 
            bottom: 0, 
            backgroundColor: color,
            left: offset, 
            width: highlightedPercentage
          }}
        />
      </View>
      <View style={[styles.markerTextContainer, { left: minMarkerPositionX }]}>
        { valueMarkerPosition.x !== null && <Text style={styles.markerText}>{minAmplitude}</Text> }
      </View>
      <View style={[styles.markerTextContainer, { left: maxMarkerPositionX }]}>
        { valueMarkerPosition.x !== null && <Text style={styles.markerText}>{maxAmplitude}</Text> }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  markerText: {
    color: palette.gray_400,
    fontWeight: 'bold'
  },
  markerTextContainer: {
    position: 'absolute', 
    top: 14, 
    width: 20, 
    overflow: 'visible', 
    alignItems: 'center'
  }
})