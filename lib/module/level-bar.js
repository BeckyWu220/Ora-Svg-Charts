function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function LevelBar(props) {
  const {
    level = 1,
    colors = ['#C3C9CE', '#86939E', '#74828F', '#687480', '#4D6071'],
    height = 24,
    style
  } = props;
  const container = React.useRef();
  const [barWidth, setBarWidth] = React.useState(0);
  return React.createElement(View, {
    ref: container,
    style: _objectSpread({
      flexDirection: 'row',
      width: '100%'
    }, props.style),
    onLayout: () => {
      container.current.measure((x, y, width, height) => {
        setBarWidth(width);
      });
    }
  }, colors.map((color, index) => React.createElement(View, {
    key: index,
    style: [styles.barContainer, {
      width: barWidth / colors.length,
      height
    }]
  }, React.createElement(View, {
    style: [styles.bar, index < level ? {
      backgroundColor: color
    } : null, {
      borderTopLeftRadius: index === 0 ? 10 : 0,
      borderBottomLeftRadius: index === 0 ? 10 : 0,
      borderTopRightRadius: index === colors.length - 1 ? 10 : 0,
      borderBottomRightRadius: index === colors.length - 1 ? 10 : 0
    }]
  }, index === level - 1 && React.createElement(Text, {
    style: styles.levelText
  }, level)))));
}
const styles = StyleSheet.create({
  barContainer: {
    paddingHorizontal: 1.5
  },
  bar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F1F1'
  },
  levelText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
//# sourceMappingURL=level-bar.js.map