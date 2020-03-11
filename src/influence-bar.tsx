import React from 'react';
import { View, Text, UIManager } from 'react-native';

export interface InfluenceBarProps {
  color?: string,
  backgroundColor?: string,
  influence: number,
  range: number,
  height?: number,
  style?: object
}

export default function InfluenceBar(props: InfluenceBarProps) {
  const highlightedPercentage = Math.abs(props.influence) / (2 * Math.abs(props.range || 100))
  // console.tron.log('?', highlightedPercentage * 100 + '%')
  
  const offset = (Math.abs(props.range || 100) - Math.abs(props.influence)) / 2 * (Math.abs(props.range || 100))
  // console.tron.log('offset', offset + '%')

  const [zeroMarkerPosition, setZeroMarkerPosition] = React.useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const [valueMarkerPosition, setValueMarkerPosition] = React.useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const zeroMarker = React.useRef()
  const highlightedBar = React.useRef()

  React.useEffect(() => {
    // console.tron.log('useEffect', props.influence)
    zeroMarker.current.measure((x, y, width, height) => {
      // console.tron.log('measure: ', x, y, width, height)
      setZeroMarkerPosition({ x, y, width, height })
    })
    highlightedBar.current.measure((x, y, width, height) => {
      console.tron.log('!!!measure: ', x, y, width, height)
      setValueMarkerPosition({ x, y, width, height })
    })
  }, [props.influence])

  //console.tron.log('highlighted percentage:', highlightedPercentage)
  return (
    <View style={{ width: '100%', ...props.style }}>
      <View style={{ flexGrow: 1, height: props.height || 16, backgroundColor: props.backgroundColor || '#e3e3e3', borderRadius: 8, overflow: 'hidden'}}>
        <View
          ref={highlightedBar}
          style={{
            position: 'absolute', 
            left: props.influence < 0 ? (`${offset < 100 ? offset : 100}%`) : '50%', 
            right: props.influence > 0 ? `${offset < 100 ? offset : 100}%` : '50%', 
            top: 0, 
            bottom: 0, 
            backgroundColor: props.color || '#63819B', 
            width: `${highlightedPercentage*100}%` }}
        />
      </View>
      <View ref={zeroMarker} style={{ position: 'absolute', left: '50%', top: -props.height * 0.5 / 2, width: 2, height: props.height * 1.5, backgroundColor: 'red', overflow: 'visible' }}></View>
      <View style={{ position: 'absolute', left: zeroMarkerPosition.x - 10, top: 20, width: 20, backgroundColor: 'red', overflow: 'visible', alignItems: 'center' }}>
        <Text>0</Text>
      </View>
      { props.influence < 0 &&
        <View style={{ position: 'absolute' }}>
          <View style={{ position: 'absolute', left: valueMarkerPosition.x, top: -props.height * 0.5 / 2, width: 2, height: props.height * 1.5, backgroundColor: 'green', overflow: 'visible' }}></View>
          <View style={{ position: 'absolute', left: valueMarkerPosition.x - 10, top: 20, width: 20, backgroundColor: 'green', overflow: 'visible', alignItems: 'center' }}>
              <Text>{props.influence}</Text>
          </View>
        </View>
      }
      {
        props.influence > 0 && 
        <View style={{ position: 'absolute' }}>
          <View style={{ position: 'absolute', left: valueMarkerPosition.x + valueMarkerPosition.width, top: -props.height * 0.5 / 2, width: 2, height: props.height * 1.5, backgroundColor: 'green', overflow: 'visible' }}></View>
          <View style={{ position: 'absolute', left: valueMarkerPosition.x + valueMarkerPosition.width - 10, top: 20, width: 20, backgroundColor: 'green', overflow: 'visible', alignItems: 'center' }}>
              <Text>{props.influence}</Text>
          </View>
        </View>
      }
    </View>
  )
}