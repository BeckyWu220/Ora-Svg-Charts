import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
  style?: object
}

export default function AmplitudeRange(props: AmplitudeRangeProps) {

  const { min = 0, max = 100, minAmplitude = 10, maxAmplitude = 90, color = '#63819B', height = 16, backgroundColor = '#E3E3E3' } = props

  const highlightedPercentage = `${Math.abs(maxAmplitude - minAmplitude) / Math.abs(max-min) * 100}%`
  
  const offset = `${Math.abs(minAmplitude - min) /Math.abs(max-min) * 100}%`

  const initialMarkPosition = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }

  const [valueMarkerPosition, setValueMarkerPosition] = React.useState(initialMarkPosition)

  const highlightedBar = React.useRef()

  React.useEffect(() => {
    highlightedBar.current.measure((x, y, width, height) => {
      setValueMarkerPosition({ x, y, width, height })
    })
  }, [minAmplitude, maxAmplitude])

  return (
    <View style={{ width: '100%', ...props.style }}>
      <View style={{ 
          flexGrow: 1, 
          height, 
          backgroundColor, 
          borderRadius: 8, 
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
      <View style={[styles.markerTextContainer, { left: valueMarkerPosition.x - 10 }]}>
        <Text style={styles.markerText}>{minAmplitude}</Text>
      </View>
      <View style={[styles.markerTextContainer, { left: valueMarkerPosition.x - 10 + valueMarkerPosition.width }]}>
        <Text style={styles.markerText}>{maxAmplitude}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  markerText: {
    color: '#4A4A4A',
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