import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { palette } from './colors';

export interface PercentageBarProps {
  color?: string,
  backgroundColor?: string,
  percentage: number,
  height?: number,
  style?: object
}

export default function PercentageBar(props: PercentageBarProps) {
  const { color = palette.gray_200, backgroundColor = palette.gray_300, percentage = 0, height = 16, style } = props
  return (
    <View style={{ flexGrow: 1, height, backgroundColor, borderRadius: 8, overflow: 'hidden', ...style}}>
      <View style={[styles.highlightedBar, { backgroundColor: color, width: `${percentage}%` }]}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  highlightedBar: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    top: 0, 
    bottom: 0
  }
})