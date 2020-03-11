import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { palette } from './colors';

export interface InfluenceBarProps {
  color?: string,
  backgroundColor?: string,
  influence: number,
  range: number,
  height?: number,
  style?: object
}

export default function InfluenceBar(props: InfluenceBarProps) {

  const { influence = 0, range = 100, color = palette.gray_200, height = 16, backgroundColor = palette.gray_300 } = props

  const highlightedPercentage = `${Math.abs(influence) / (2 * Math.abs(range)) * 100}%`
  
  const offset = (Math.abs(range) - Math.abs(influence)) / 2 * Math.abs(range)

  const initialMarkPosition = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }

  const [zeroMarkerPosition, setZeroMarkerPosition] = React.useState(initialMarkPosition)
  const [valueMarkerPosition, setValueMarkerPosition] = React.useState(initialMarkPosition)

  const zeroMarker = React.useRef()
  const highlightedBar = React.useRef()

  React.useEffect(() => {
    zeroMarker.current.measure((x, y, width, height) => {
      setZeroMarkerPosition({ x, y, width, height })
    })
    highlightedBar.current.measure((x, y, width, height) => {
      setValueMarkerPosition({ x, y, width, height })
    })
  }, [influence])

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
            left: influence < 0 ? (`${offset < 100 ? offset : 100}%`) : '50%', 
            right: influence > 0 ? `${offset < 100 ? offset : 100}%` : '50%', 
            width: highlightedPercentage 
          }}
        />
      </View>
      {/* Zero Marker and Zero Marker Text */}
      <View ref={zeroMarker} style={{ position: 'absolute', left: '50%', top: -props.height * 0.5 / 2, width: 2, height: props.height * 1.5, backgroundColor: palette.gray_500, overflow: 'visible' }}></View>
      <View style={[styles.markerTextContainer, { left: zeroMarkerPosition.x - 10 }]}>
        <Text style={[styles.markerText, styles.zeroMarkerText]}>0</Text>
      </View>
      {/* Influence Marker Text */}
      <View style={[styles.markerTextContainer, { left: valueMarkerPosition.x - 10 + ( influence > 0 && valueMarkerPosition.width) }]}>
        <Text style={styles.markerText}>{influence}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  zeroMarkerText: {
    color: palette.gray_500
  },
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