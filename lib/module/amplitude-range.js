function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { View, Text, StyleSheet, findNodeHandle } from 'react-native';
import { palette } from './colors';
export default function AmplitudeRange(props) {
  const {
    min = 0,
    max = 100,
    minAmplitude = 10,
    maxAmplitude = 90,
    color = palette.gray_200,
    height = 16,
    borderRadius = 8,
    backgroundColor = palette.gray_300
  } = props;
  const highlightedPercentage = "".concat(Math.abs(maxAmplitude - minAmplitude) / Math.abs(max - min) * 100, "%");
  const offset = "".concat(Math.abs(minAmplitude - min) / Math.abs(max - min) * 100, "%");
  const initialMarkPosition = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };
  const [valueMarkerPosition, setValueMarkerPosition] = React.useState(initialMarkPosition);
  const highlightedBar = React.useRef();
  const container = React.useRef();
  React.useEffect(() => {
    highlightedBar.current.measureLayout(findNodeHandle(container.current), (x, y, width, height) => {
      setValueMarkerPosition({
        x,
        y,
        width,
        height
      });
    });
  }, [minAmplitude, maxAmplitude]);
  return React.createElement(View, {
    ref: container,
    style: _objectSpread({
      flex: 1
    }, props.style)
  }, React.createElement(View, {
    style: {
      flexGrow: 1,
      height,
      backgroundColor,
      borderRadius,
      overflow: 'hidden'
    }
  }, React.createElement(View, {
    ref: highlightedBar,
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      backgroundColor: color,
      left: offset,
      width: highlightedPercentage
    }
  })), React.createElement(View, {
    style: [styles.markerTextContainer, {
      left: valueMarkerPosition.x - 10
    }]
  }, React.createElement(Text, {
    style: styles.markerText
  }, minAmplitude)), React.createElement(View, {
    style: [styles.markerTextContainer, {
      left: valueMarkerPosition.x - 10 + valueMarkerPosition.width
    }]
  }, React.createElement(Text, {
    style: styles.markerText
  }, maxAmplitude)));
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
});
//# sourceMappingURL=amplitude-range.js.map