function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { View, Text } from 'react-native';
export default function InfluenceBar(props) {
  const highlightedPercentage = Math.abs(props.influence) / (2 * Math.abs(props.range || 100)); // console.tron.log('?', highlightedPercentage * 100 + '%')

  const offset = (Math.abs(props.range || 100) - Math.abs(props.influence)) / 2 * Math.abs(props.range || 100); // console.tron.log('offset', offset + '%')

  const [zeroMarkerPosition, setZeroMarkerPosition] = React.useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  const [valueMarkerPosition, setValueMarkerPosition] = React.useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  const zeroMarker = React.useRef();
  const highlightedBar = React.useRef();
  React.useEffect(() => {
    // console.tron.log('useEffect', props.influence)
    zeroMarker.current.measure((x, y, width, height) => {
      // console.tron.log('measure: ', x, y, width, height)
      setZeroMarkerPosition({
        x,
        y,
        width,
        height
      });
    });
    highlightedBar.current.measure((x, y, width, height) => {
      console.tron.log('!!!measure: ', x, y, width, height);
      setValueMarkerPosition({
        x,
        y,
        width,
        height
      });
    });
  }, [props.influence]); //console.tron.log('highlighted percentage:', highlightedPercentage)

  return React.createElement(View, {
    style: _objectSpread({
      width: '100%'
    }, props.style)
  }, React.createElement(View, {
    style: {
      flexGrow: 1,
      height: props.height || 16,
      backgroundColor: props.backgroundColor || '#e3e3e3',
      borderRadius: 8,
      overflow: 'hidden'
    }
  }, React.createElement(View, {
    ref: highlightedBar,
    style: {
      position: 'absolute',
      left: props.influence < 0 ? "".concat(offset < 100 ? offset : 100, "%") : '50%',
      right: props.influence > 0 ? "".concat(offset < 100 ? offset : 100, "%") : '50%',
      top: 0,
      bottom: 0,
      backgroundColor: props.color || '#63819B',
      width: "".concat(highlightedPercentage * 100, "%")
    }
  })), React.createElement(View, {
    ref: zeroMarker,
    style: {
      position: 'absolute',
      left: '50%',
      top: -props.height * 0.5 / 2,
      width: 2,
      height: props.height * 1.5,
      backgroundColor: 'red',
      overflow: 'visible'
    }
  }), React.createElement(View, {
    style: {
      position: 'absolute',
      left: zeroMarkerPosition.x - 10,
      top: 20,
      width: 20,
      backgroundColor: 'red',
      overflow: 'visible',
      alignItems: 'center'
    }
  }, React.createElement(Text, null, "0")), props.influence < 0 && React.createElement(View, {
    style: {
      position: 'absolute'
    }
  }, React.createElement(View, {
    style: {
      position: 'absolute',
      left: valueMarkerPosition.x,
      top: -props.height * 0.5 / 2,
      width: 2,
      height: props.height * 1.5,
      backgroundColor: 'green',
      overflow: 'visible'
    }
  }), React.createElement(View, {
    style: {
      position: 'absolute',
      left: valueMarkerPosition.x - 10,
      top: 20,
      width: 20,
      backgroundColor: 'green',
      overflow: 'visible',
      alignItems: 'center'
    }
  }, React.createElement(Text, null, props.influence))), props.influence > 0 && React.createElement(View, {
    style: {
      position: 'absolute'
    }
  }, React.createElement(View, {
    style: {
      position: 'absolute',
      left: valueMarkerPosition.x + valueMarkerPosition.width,
      top: -props.height * 0.5 / 2,
      width: 2,
      height: props.height * 1.5,
      backgroundColor: 'green',
      overflow: 'visible'
    }
  }), React.createElement(View, {
    style: {
      position: 'absolute',
      left: valueMarkerPosition.x + valueMarkerPosition.width - 10,
      top: 20,
      width: 20,
      backgroundColor: 'green',
      overflow: 'visible',
      alignItems: 'center'
    }
  }, React.createElement(Text, null, props.influence))));
}
//# sourceMappingURL=influence-bar.js.map