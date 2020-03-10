import React from 'react';

const ReactNative = require('react-native');

const {
  View,
  Dimensions,
  Text: RNText,
  StyleSheet,
  TouchableWithoutFeedback
} = ReactNative; // import { View, Dimensions, Text as RNText, StyleSheet } from 'react-native';

import { PieChart as SVGPieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
export default function PieChart(props) {
  const [selectedSlice, setSelectedSlice] = React.useState({
    key: null,
    value: null
  });
  React.useEffect(() => {
    props.onSelect && props.onSelect(selectedSlice);
  }, [selectedSlice]);
  const colors = ['#9EA8B7', '#7D6A80', '#74988C', '#3E5567', '#63819B'];
  const pieChartData = props.data.map((chartData, index) => {
    return {
      key: chartData.key,
      value: chartData.value,
      svg: {
        fill: chartData.color || colors[index],
        onClick: () => setSelectedSlice(chartData)
      },
      arc: {
        outerRadius: selectedSlice && selectedSlice.key === chartData.key ? '100%' : '80%',
        padAngle: 0
      },
      onPress: () => setSelectedSlice(chartData)
    };
  });
  const [labelWidth, setLabelWidth] = React.useState(0);
  const deviceWidth = Dimensions.get('window').width;
  const total = props.data.map(chartData => chartData.value).reduce((a, b) => a + b, 0);

  const Labels = ({
    slices
  }) => {
    return slices.map((slice, index) => {
      const {
        pieCentroid,
        data
      } = slice;
      return React.createElement(Text, {
        key: index,
        x: pieCentroid[0],
        y: pieCentroid[1],
        fill: '#FFFFFF',
        fontWeight: selectedSlice && selectedSlice.key === data.key ? "bold" : "normal",
        textAnchor: 'middle',
        alignmentBaseline: 'middle',
        fontSize: 14
      }, (data.value / total * 100).toFixed(2) + '%');
    });
  };

  return React.createElement(TouchableWithoutFeedback, {
    style: styles.container,
    onPress: () => setSelectedSlice(null)
  }, React.createElement(View, {
    style: {
      justifyContent: 'center'
    }
  }, React.createElement(SVGPieChart, {
    style: {
      height: 400
    },
    outerRadius: '80%',
    innerRadius: '40%',
    data: pieChartData,
    valueAccessor: ({
      item
    }) => item.value
  }, React.createElement(Labels, null)), React.createElement(RNText, {
    onLayout: ({
      nativeEvent: {
        layout: {
          width
        }
      }
    }) => {
      setLabelWidth(width);
    },
    style: [styles.text, {
      left: deviceWidth / 2 - labelWidth / 2
    }]
  }, selectedSlice && selectedSlice.key ? selectedSlice.key : '')));
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  text: {
    position: 'absolute',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#262C33'
  }
});
//# sourceMappingURL=pie-chart.js.map