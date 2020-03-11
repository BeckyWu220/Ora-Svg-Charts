function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { View, StyleSheet } from 'react-native';
export default function PercentageBar(props) {
  const {
    color = '#63819B',
    backgroundColor = '#E3E3E3',
    percentage = 0,
    height = 16,
    style
  } = props;
  return React.createElement(View, {
    style: _objectSpread({
      flexGrow: 1,
      height,
      backgroundColor,
      borderRadius: 8,
      overflow: 'hidden'
    }, style)
  }, React.createElement(View, {
    style: [styles.highlightedBar, {
      backgroundColor: color,
      width: "".concat(percentage, "%")
    }]
  }));
}
const styles = StyleSheet.create({
  highlightedBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});
//# sourceMappingURL=percentage-bar.js.map