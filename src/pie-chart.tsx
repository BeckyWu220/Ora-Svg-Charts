import React from 'react';
const ReactNative = require('react-native');
const { View, Text: RNText, StyleSheet, TouchableWithoutFeedback } = ReactNative;
// import { View, Dimensions, Text as RNText, StyleSheet } from 'react-native';
import { PieChart as SVGPieChart } from 'react-native-svg-charts';
import { isTablet } from 'react-native-device-detection';
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
    instructionText?: string
}

export default function PieChart(props: PieChartProps) {

    const [ colors, setColors ] = React.useState([])

    const { data, style, instructionText = '' } = props

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
    const offsetX = React.useRef(0)

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
                    fontSize={16}
                    fontFamily={"SourceSansPro-Regular"}
                >
                    {data.value.toFixed(1) + '%'}
                </Text>
            )
        })
    }

    const chartRef = React.useRef()

    const innerRadiusRatio = 0.42

    return (
        <TouchableWithoutFeedback onPress={() => {
            setSelectedSliceIndex(null)
        }}>
            <View ref={chartRef} style={{ justifyContent: 'center',  height: 360, ...style }}>
                <SVGPieChart
                    style={{ flex: 1 }}  
                    outerRadius={'95%'}
                    innerRadius={`${innerRadiusRatio * 100}%`}
                    data={pieChartData}
                    valueAccessor={({ item }) => item.value}
                >
                    <Labels/>
                </SVGPieChart>
                
                <View
                    style={[styles.textContainer,{left: offsetX.current + (1-innerRadiusRatio) * chartWidth / 2 ,width: innerRadiusRatio * chartWidth}]}
                    onLayout={() => {
                        chartRef.current.measure((x, y, width, height) => {
                            offsetX.current = (width - height) / 2
                            setChartWidth(height)
                        })
                    }}
                >
                    <RNText
                        numberOfLines={4}
                        style={[styles.text, !(selectedSliceIndex !== null && data[selectedSliceIndex].key) ? styles.instructionText : null]}
                        >
                        { selectedSliceIndex !== null && data[selectedSliceIndex].key ?  data[selectedSliceIndex].key : instructionText }
                    </RNText>
                </View>
                
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        position: 'absolute',
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: "SourceSansPro-Regular",
        color: palette.gray_600
    },
    instructionText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: palette.gray_600
    }
});