function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';

const ReactNative = require('react-native');

const {
  View,
  Image,
  Text: RNText,
  TouchableOpacity,
  TouchableWithoutFeedback
} = ReactNative;
import { BarChart as SVGBarChart, Grid, YAxis } from 'react-native-svg-charts';
import { Rect, G, Text } from 'react-native-svg';
import { palette, getRandomColor, blendWithWhite } from './colors';
export default function BarChart(props) {
  const [colors, setColors] = React.useState([]);
  const {
    data,
    style,
    strokeWidth = 5,
    strokeLinecap = 'round',
    selectedIndex = 0
  } = props;
  const [selectedBarIndex, setSelectedBarIndex] = React.useState(selectedIndex);

  const onSelectBar = barIndex => {
    setSelectedBarIndex(barIndex);
    props.onSelect && props.onSelect(barIndex);
  };

  React.useEffect(() => {
    setSelectedBarIndex(selectedIndex);
  }, [selectedIndex]);
  const [barWidth, setBarWidth] = React.useState(0);
  const [positions, setPositions] = React.useState([]);
  const [barMargin, setBarMargin] = React.useState(0);
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
  const barChartData = data.map((chartData, index) => {
    return {
      key: chartData.key,
      value: chartData.value,
      svg: {
        fill: selectedBarIndex !== null && selectedBarIndex === index ? chartData.color || colors[index] : blendWithWhite(chartData.color || colors[index]),
        onClick: () => onSelectBar(index),
        // Make sure the svg is clickable in web app.
        onPress: () => onSelectBar(index)
      },
      imageUri: chartData.imageUri
    };
  });

  const Labels = args => {
    const {
      x,
      y,
      bandwidth,
      data
    } = args;
    const colors = data.map(barData => barData.svg.fill);
    const fontSize = 12;
    let xPositions = [];
    const labels = data.map((barData, index) => {
      const {
        value,
        key
      } = barData;
      xPositions.push(x(index));
      return React.createElement(G, {
        key: index
      }, React.createElement(Text, {
        x: x(index) + bandwidth / 2,
        y: y(value) - fontSize,
        fontSize: fontSize,
        fontWeight: selectedBarIndex !== null && selectedBarIndex === index ? 'bold' : 'normal',
        fontFamily: "SourceSansPro-Regular",
        fill: selectedBarIndex !== null && selectedBarIndex === index ? palette.black : palette.gray_500,
        alignmentBaseline: 'middle',
        textAnchor: 'middle'
      }, value.toFixed(1) + '%'), strokeLinecap !== 'butt' && React.createElement(Rect, {
        x: x(index),
        y: y(value) - strokeWidth,
        rx: strokeLinecap === 'round' ? strokeWidth : undefined,
        ry: strokeLinecap === 'round' ? strokeWidth : undefined,
        width: bandwidth,
        height: 2 * strokeWidth,
        fill: colors[index]
      }));
    });

    if (barWidth === 0) {
      setBarWidth(bandwidth);
      setPositions(xPositions);

      if (xPositions.length > 2) {
        let x1 = xPositions[1];
        let x2 = xPositions[2];
        const margin = (x2 - x1 - bandwidth) / 2;
        setBarMargin(margin);
      }
    }

    return labels;
  };

  return React.createElement(View, {
    style: _objectSpread({
      height: 250,
      flexDirection: 'row'
    }, style)
  }, React.createElement(YAxis, {
    data: barChartData.map(chartData => chartData.value),
    contentInset: {
      top: 25,
      bottom: 70
    },
    svg: {
      fill: palette.gray_500,
      fontSize: 12,
      fontFamily: "SourceSansPro-Regular"
    },
    numberOfTicks: 4,
    min: 0,
    formatLabel: value => "".concat(value.toFixed(0), "%")
  }), React.createElement(View, {
    style: {
      flexGrow: 1
    }
  }, React.createElement(SVGBarChart, {
    style: {
      flex: 1
    },
    data: barChartData,
    gridMin: 0,
    yAccessor: ({
      item
    }) => item.value,
    contentInset: {
      top: 25,
      bottom: 10,
      left: 40,
      right: 40
    },
    spacingInner: 0.5
  }, React.createElement(Grid, {
    svg: {
      stroke: palette.gray_300
    }
  }), React.createElement(Labels, null)), barWidth > 0 && React.createElement(View, {
    style: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 60
    }
  }, barChartData.map((chartData, index) => {
    return React.createElement(View, {
      key: index,
      style: {
        width: barWidth + 2 * barMargin,
        height: '100%',
        position: 'absolute',
        left: positions[index] - barMargin
      }
    }, chartData.imageUri && React.createElement(TouchableOpacity, {
      onPress: () => onSelectBar(index),
      style: {
        width: barWidth,
        height: barWidth,
        borderRadius: barWidth / 2,
        overflow: 'hidden',
        alignSelf: 'center',
        maxWidth: 40,
        maxHeight: 40
      }
    }, React.createElement(Image, {
      style: {
        width: '100%',
        height: '100%',
        opacity: selectedBarIndex !== null && selectedBarIndex === index ? 1 : 0.5
      },
      resizeMode: "cover",
      source: chartData.imageUri
    })), React.createElement(View, {
      style: {
        flexGrow: 1
      }
    }, React.createElement(RNText, {
      numberOfLines: 2,
      style: {
        color: selectedBarIndex !== null && selectedBarIndex === index ? palette.gray_600 : palette.gray_500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: "SourceSansPro-Regular"
      }
    }, barChartData.map(chartData => chartData.key)[index])));
  }))));
}
//# sourceMappingURL=bar-chart.js.map