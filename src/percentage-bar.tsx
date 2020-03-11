import React from 'react';
import { View, Text } from 'react-native';

export interface PercentageBarProps {
  color?: string,
  backgroundColor?: string,
  percentage: number,
  height?: number,
  displayPercentage: boolean,
  style?: object
}

export default function PercentageBar(props: PercentageBarProps) {
  return (
    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', ...props.style }}>
      <View style={{ flexGrow: 1, height: props.height || 16, backgroundColor: props.backgroundColor || '#e3e3e3', borderRadius: 8, overflow: 'hidden'}}>
        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: props.color || '#63819B', width: `${props.percentage}%` }}></View>
      </View>
      { props.displayPercentage && <View style={{ marginLeft: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'gray' }}>{`${props.percentage || 0}%`}</Text>
      </View>}
    </View>
  )
}