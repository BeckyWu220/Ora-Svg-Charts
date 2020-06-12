import React from 'react';
const ReactNative = require('react-native');
const { View, Text: RNText, StyleSheet, TouchableWithoutFeedback } = ReactNative;
// import { View, Dimensions, Text as RNText, StyleSheet } from 'react-native';
import { PieChart as SVGPieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import { palette, getRandomColor } from './colors';

interface ChartData {
    key: string,
    value: number,
    color?: string
}

export interface PieChartProps {
    data: Array<ChartData>,
    onSelect?(data?: ChartData): any,
    style: object,
}

export default function PieChart(props: PieChartProps) {

    const [ colors, setColors ] = React.useState([])

    const { data, style } = props

    const [selectedSliceIndex, setSelectedSliceIndex] = React.useState(null)

    React.useEffect(() => {
        props.onSelect && props.onSelect(selectedSliceIndex)
    }, [selectedSliceIndex])

    const preferredColors = [palette.blue_700, palette.purple_100, palette.green_100, palette.blue_600, palette.gray_200, palette.green_200, palette.purple_200, palette.gray_700]
    React.useEffect(() => {
        const numberOfColorsToGenerate = data.length - preferredColors.length
        const generatedColors = []
        for (var i = 0; i < numberOfColorsToGenerate; i++) { 
            let randomColor = null
            do {
                randomColor = getRandomColor()
            } while (preferredColors.includes(randomColor) || generatedColors.includes(randomColor))
            generatedColors.push(randomColor)
        }
        setColors(preferredColors.concat(generatedColors))
    }, [])
    
    const pieChartData = data.map((chartData, index) => {
        return {
            key: chartData.key,
            value: chartData.value,
            svg: {
                fill: chartData.color || colors[index],
                onClick: () => {
                    setSelectedSliceIndex(index)
                }
            },
            arc: {
                outerRadius: selectedSliceIndex === index ? '100%' : '80%',
                padAngle: 0,
            },
            onPress: () => {
                setSelectedSliceIndex(index)
            }
        }
    })

    const [chartWidth, setChartWidth] = React.useState(0)

    const Labels = ({ slices }) => {
        return slices.map((slice, index) => {
            const { pieCentroid, data } = slice;
            return (
                <Text
                    key={index}
                    x={pieCentroid[0]}
                    y={pieCentroid[1]}
                    fill={palette.white}
                    fontWeight={ selectedSliceIndex === index ? "bold" : "normal"}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={14}
                >
                    {data.value.toFixed(1) + '%'}
                </Text>
            )
        })
    }

    const chartRef = React.useRef()

    const innerRadiusRatio = 0.35

    return (
        <TouchableWithoutFeedback onPress={() => {
            setSelectedSliceIndex(null)
        }}>
            <View ref={chartRef} style={{ justifyContent: 'center', height: 360, ...style }}>
                <SVGPieChart
                    style={{ flex: 1 }}
                    outerRadius={'80%'}
                    innerRadius={`${innerRadiusRatio * 100}%`}
                    data={pieChartData}
                    valueAccessor={({ item }) => item.value}
                >
                    <Labels/>
                </SVGPieChart>
                <View
                    style={[styles.textContainer, { left: (chartWidth * (1 - innerRadiusRatio)) / 2, width: innerRadiusRatio * chartWidth }]}
                    onLayout={() => {
                        chartRef.current.measure((x, y, width, height) => {
                            setChartWidth(width)
                        })
                    }}
                >
                    <RNText
                        numberOfLines={2}
                        style={styles.text}
                        >
                        { selectedSliceIndex !== null && data[selectedSliceIndex].key ?  data[selectedSliceIndex].key : '' }
                    </RNText>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
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
        color: palette.gray_600,
    }
});