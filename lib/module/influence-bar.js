function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { View, Text, StyleSheet, findNodeHandle } from 'react-native';
import { palette } from './colors';
export default function InfluenceBar(props) {
  const {
    influence = 0,
    range = 100,
    color = palette.gray_200,
    height = 16,
    borderRadius = 8,
    backgroundColor = palette.gray_300
  } = props;
  const highlightedPercentage = "".concat(Math.abs(influence) / (2 * Math.abs(range)) * 100, "%");
  const offset = (Math.abs(range) - Math.abs(influence)) / 2 * Math.abs(range);
  const initialMarkPosition = {
    x: null,
    y: null,
    width: 0,
    height: 0
  };
  const [zeroMarkerPosition, setZeroMarkerPosition] = React.useState(initialMarkPosition);
  const [valueMarkerPosition, setValueMarkerPosition] = React.useState(initialMarkPosition);
  const zeroMarker = React.useRef();
  const highlightedBar = React.useRef();
  const container = React.useRef();

  const measureHighlightedBar = () => {
    highlightedBar.current.measureLayout(findNodeHandle(container.current), (x, y, width, height) => {
      setValueMarkerPosition({
        x,
        y,
        width,
        height
      });
    });
  };

  React.useEffect(() => {
    measureHighlightedBar();
  }, [influence]);
  return React.createElement(View, {
    ref: container,
    style: _objectSpread({
      flex: 1
    }, props.style),
    onLayout: () => {
      zeroMarker.current.measureLayout(findNodeHandle(container.current), (x, y, width, height) => {
        setZeroMarkerPosition({
          x,
          y,
          width,
          height
        });
      });
      measureHighlightedBar();
    }
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
      left: influence < 0 ? "".concat(offset < 100 ? offset : 100, "%") : '50%',
      right: influence > 0 ? "".concat(offset < 100 ? offset : 100, "%") : '50%',
      width: highlightedPercentage
    }
  })), React.createElement(View, {
    ref: zeroMarker,
    style: {
      position: 'absolute',
      left: '50%',
      top: -props.height * 0.5 / 2,
      width: 2,
      height: props.height * 1.5,
      backgroundColor: palette.gray_500,
      overflow: 'visible'
    }
  }), React.createElement(View, {
    style: [styles.markerTextContainer, {
      left: zeroMarkerPosition.x - 10
    }]
  }, zeroMarkerPosition.x !== null && React.createElement(Text, {
    style: [styles.markerText, styles.zeroMarkerText]
  }, "0")), React.createElement(View, {
    style: [styles.markerTextContainer, {
      left: valueMarkerPosition.x - 10 + (influence > 0 && valueMarkerPosition.width)
    }]
  }, valueMarkerPosition.x !== null && React.createElement(Text, {
    style: styles.markerText
  }, influence)));
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
});
//# sourceMappingURL=influence-bar.js.map