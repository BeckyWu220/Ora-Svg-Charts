import React from 'react';
const ReactNative = require('react-native');
const { View, Dimensions, Text: RNText, StyleSheet, TouchableWithoutFeedback } = ReactNative;
// import { View, Dimensions, Text as RNText, StyleSheet } from 'react-native';
import { PieChart as SVGPieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import { palette } from './colors';

interface ChartData {
    key: string,
    value: number,
    color?: string
}

export interface PieChartProps {
    data: Array<ChartData>,
    onSelect?(data?: ChartData): any,
}

export default function PieChart(props: PieChartProps) {

    const [selectedSlice, setSelectedSlice] = React.useState<ChartData>({
        key: null,
        value: null
    })

    React.useEffect(() => {
        props.onSelect && props.onSelect(selectedSlice)
    }, [selectedSlice])

    const colors = [palette.blue_150, palette.purple_100, palette.green_100, palette.blue_600, palette.gray_200]
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
                padAngle: 0,
            },
            onPress: () => setSelectedSlice(chartData)
        }
    })

    const [labelWidth, setLabelWidth] = React.useState(0)
    const deviceWidth = Dimensions.get('window').width

    const total = props.data.map(chartData => chartData.value).reduce((a, b) => a + b, 0)

    const Labels = ({ slices }) => {
        return slices.map((slice, index) => {
            const { pieCentroid, data } = slice;
            return (
                <Text
                    key={index}
                    x={pieCentroid[0]}
                    y={pieCentroid[1]}
                    fill={palette.white}
                    fontWeight={ selectedSlice && selectedSlice.key === data.key ? "bold" : "normal"}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={14}
                >
                    {(data.value / total * 100).toFixed(2) + '%'}
                </Text>
            )
        })
    }

    return (
        <TouchableWithoutFeedback style={styles.container} onPress={() => setSelectedSlice(null)}>
            <View style={{ justifyContent: 'center' }}>
                <SVGPieChart
                    style={{ height: 400 }}
                    outerRadius={'80%'}
                    innerRadius={'40%'}
                    data={pieChartData}
                    valueAccessor={({ item }) => item.value}
                >
                    <Labels/>
                </SVGPieChart>
                <RNText
                    onLayout={({ nativeEvent: { layout: { width } } }) => {
                        setLabelWidth(width)
                    }}
                    style={[styles.text, { left: deviceWidth / 2 - labelWidth / 2 }]}>
                    { selectedSlice && selectedSlice.key ? selectedSlice.key : '' }
                </RNText>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    text: {
        position: 'absolute',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: palette.gray_600
    }
});