function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';

const ReactNative = require('react-native');

const {
  View,
  Text: RNText,
  StyleSheet,
  TouchableWithoutFeedback
} = ReactNative; // import { View, Dimensions, Text as RNText, StyleSheet } from 'react-native';

import { PieChart as SVGPieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import { palette, getRandomColor } from './colors';
export default function PieChart(props) {
  const [colors, setColors] = React.useState([]);
  const {
    data,
    style,
    instructionText = ''
  } = props;
  const [selectedSliceIndex, setSelectedSliceIndex] = React.useState(null);
  React.useEffect(() => {
    props.onSelect && props.onSelect(selectedSliceIndex);
  }, [selectedSliceIndex]);
  const preferredColors = [palette.blue_700, palette.purple_100, palette.green_100, palette.blue_600, palette.gray_200, palette.green_200, palette.purple_200, palette.gray_700];
  React.useEffect(() => {
    const numberOfColorsToGenerate = data.length - preferredColors.length;
    const generatedColors = [];

    for (var i = 0; i < numberOfColorsToGenerate; i++) {
      let randomColor = null;

      do {
        randomColor = getRandomColor();
      } while (preferredColors.includes(randomColor) || generatedColors.includes(randomColor));

      generatedColors.push(randomColor);
    }

    setColors(preferredColors.concat(generatedColors));
  }, []);
  const pieChartData = data.map((chartData, index) => {
    return {
      key: chartData.key,
      value: chartData.value,
      svg: {
        fill: chartData.color || colors[index],
        onClick: () => {
          setSelectedSliceIndex(index);
        }
      },
      arc: {
        outerRadius: selectedSliceIndex === index ? '100%' : '80%',
        padAngle: 0
      },
      onPress: () => {
        setSelectedSliceIndex(index);
      }
    };
  });
  const [chartWidth, setChartWidth] = React.useState(0);

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
        fill: palette.white,
        fontWeight: selectedSliceIndex === index ? "bold" : "normal",
        textAnchor: 'middle',
        alignmentBaseline: 'middle',
        fontSize: 14,
        fontFamily: "SourceSansPro-Regular"
      }, data.value.toFixed(1) + '%');
    });
  };

  const chartRef = React.useRef();
  const innerRadiusRatio = 0.35;
  return React.createElement(TouchableWithoutFeedback, {
    onPress: () => {
      setSelectedSliceIndex(null);
    }
  }, React.createElement(View, {
    ref: chartRef,
    style: _objectSpread({
      justifyContent: 'center',
      height: 360
    }, style)
  }, React.createElement(SVGPieChart, {
    style: {
      flex: 1
    },
    outerRadius: '80%',
    innerRadius: "".concat(innerRadiusRatio * 100, "%"),
    data: pieChartData,
    valueAccessor: ({
      item
    }) => item.value
  }, React.createElement(Labels, null)), React.createElement(View, {
    style: [styles.textContainer, {
      left: chartWidth * (1 - innerRadiusRatio) / 2 + 10,
      width: innerRadiusRatio * chartWidth - 20
    }],
    onLayout: () => {
      chartRef.current.measure((x, y, width, height) => {
        setChartWidth(width);
      });
    }
  }, React.createElement(RNText, {
    numberOfLines: 4,
    style: [styles.text, !(selectedSliceIndex !== null && data[selectedSliceIndex].key) ? styles.instructionText : null]
  }, selectedSliceIndex !== null && data[selectedSliceIndex].key ? data[selectedSliceIndex].key : instructionText))));
}
const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    padding: 10
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "SourceSansPro-Regular",
    color: palette.gray_600
  },
  instructionText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: palette.gray_600
  }
});
//# sourceMappingURL=pie-chart.js.map