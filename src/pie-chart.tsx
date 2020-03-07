import React from 'react';
const ReactNative = require('react-native');
const { View, Dimensions, Text: RNText, StyleSheet } = ReactNative;
// import { View, Dimensions, Text as RNText, StyleSheet } from 'react-native';
import { PieChart as SVGPieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'

interface ChartData {
    key: string,
    value: number,
    color?: string
}

export interface PieChartProps {
    data: Array<ChartData>
}

export default function PieChart(props: PieChartProps) {

    const [selectedSlice, setSelectedSlice] = React.useState({
        label: '',
        value: 0
    })

    const { label } = selectedSlice

    const colors = ['#9EA8B7', '#7D6A80', '#74988C', '#3E5567', '#63819B']
    const pieChartData = props.data.map((chartData, index) => {
        return {
            key: chartData.key,
            value: chartData.value,
            svg: {
                fill: chartData.color || colors[index],
                onClick: () => setSelectedSlice({
                    label: chartData.key,
                    value: chartData.value
                })
            },
            arc: {
                outerRadius: selectedSlice.label === chartData.key ? '100%' : '80%',
                padAngle: 0,
            },
            onPress: () => setSelectedSlice({
                label: chartData.key,
                value: chartData.value
            })
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
                    fill={'#FFFFFF'}
                    fontWeight={ selectedSlice.label === data.key ? "bold" : undefined}
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
        <View style={styles.container}>
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
                { selectedSlice && label }
            </RNText>
        </View>
      </View>
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
        color: '#262C33'
    }
});