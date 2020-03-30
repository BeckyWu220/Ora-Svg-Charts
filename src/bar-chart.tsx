import React from 'react';
const ReactNative = require('react-native');
const { View, Image, Text: RNText, TouchableOpacity, TouchableWithoutFeedback } = ReactNative;
import { BarChart as SVGBarChart, Grid, YAxis } from 'react-native-svg-charts';
import { Rect, G, Text } from 'react-native-svg';
import { palette } from './colors';

interface ChartData {
    key: string,
    value: number,
    color?: string,
    imageUri?: string,
}

export interface BarChartProps {
    data: Array<ChartData>,
    style: object,
    strokeWidth: number,
    strokeLinecap: 'round' | 'square' | 'butt'
    onSelect?(data?: ChartData): any,
    selectedBarIndex: number,
}

export default function BarChart(props: BarChartProps) {

    const { data, style, strokeWidth = 5, strokeLinecap = 'round', selectedBarIndex = 0 } = props

    const [selectedBar, setSelectedBar] = React.useState<ChartData>(data[selectedBarIndex])

    React.useEffect(() => {
        props.onSelect && props.onSelect(selectedBar)
    }, [selectedBar])

    React.useEffect(() => {
        setSelectedBar(data[selectedBarIndex])
    }, [selectedBarIndex])

    const [barWidth, setBarWidth] = React.useState(0)
    const [positions, setPositions] = React.useState([])
    const [barMargin, setBarMargin] = React.useState(0)

    const colors = [palette.blue_150, palette.purple_100, palette.green_100, palette.blue_600, palette.gray_200]
    const barChartData = data.map((chartData, index) => {
        return {
            key: chartData.key,
            value: chartData.value,
            svg: {
                fill: chartData.color || colors[index],
                onClick: () => setSelectedBar(chartData), // Make sure the svg is clickable in web app.
                onPress: () => setSelectedBar(chartData)
            },
            imageUri: chartData.imageUri
        }
    })

    const total = data.map(chartData => chartData.value).reduce((a, b) => a + b, 0)

    const Labels = (args) => {
        const { x, y, bandwidth, data } = args
        const colors = data.map((barData) => barData.svg.fill)
        const fontSize = 14
    
        let xPositions = []
        const labels = data.map((barData, index) => {
            const { value, key } = barData
            xPositions.push(x(index))
            return (
                <G key={index}>
                    <Text
                        x={x(index) + (bandwidth / 2)}
                        y={y(value)-fontSize}
                        fontSize={fontSize}
                        fontWeight={ selectedBar && selectedBar.key === key ? 'bold' : 'normal'}
                        fill={  selectedBar && selectedBar.key === key ? palette.black : palette.gray_500}
                        alignmentBaseline={'middle'}
                        textAnchor={'middle'}
                    >
                        {(value / total * 100).toFixed(1) + '%'}
                    </Text>
                    { strokeLinecap !== 'butt' &&
                        <Rect
                            x={x(index)}
                            y={y(value) - strokeWidth }
                            rx={ strokeLinecap === 'round' ? strokeWidth : undefined}
                            ry={ strokeLinecap === 'round' ? strokeWidth : undefined}
                            width={bandwidth}
                            height={2*strokeWidth}
                            fill={colors[index]}
                        />
                    }
                </G>
            )
        })

        if (barWidth === 0) {
            setBarWidth(bandwidth)
            setPositions(xPositions)
            if (xPositions.length > 2) {
                let x1 = xPositions[1]
                let x2 = xPositions[2]
                const margin = (x2 - x1 - bandwidth) / 2
                setBarMargin(margin)
            }
        }
        
        return labels
    }

    return (
        <View style={{ height: 250, flexDirection: 'row', ...style }}>
            <YAxis
                data={barChartData.map((chartData) => chartData.value)}
                contentInset={{ top: 25, bottom: 70 }}
                svg={{
                    fill: palette.gray_500,
                    fontSize: 12,
                }}
                numberOfTicks={4}
                min={0}
                formatLabel={(value) => `${(value / total * 100).toFixed(0)}%`}
            />
            <View style={{ flexGrow: 1 }}>
                <SVGBarChart
                    style={{ flex: 1 }}
                    data={barChartData}
                    gridMin={0}
                    yAccessor={({ item }) => item.value}
                    contentInset={{ top: 25, bottom: 10, left: 40, right: 40 }}
                    spacingInner={0.5}
                >
                    <Grid svg={{ stroke: palette.gray_300 }} />
                    <Labels />
                </SVGBarChart>
                {   barWidth > 0 &&
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 60 }}>
                        { barChartData.map((chartData, index) => {
                            return (
                                <View key={index} style={{ width: barWidth + 2 * barMargin, height: '100%', position: 'absolute', left: positions[index] - barMargin }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelectedBar(chartData)
                                        }}
                                        style={{ width: barWidth, height: barWidth, borderRadius: barWidth/2, overflow: 'hidden', alignSelf: 'center', maxWidth: 40, maxHeight: 40 }}
                                    >
                                        <Image
                                            style={{width: '100%', height: '100%', opacity: selectedBar && selectedBar.key === chartData.key ? 1 : 0.5}}
                                            resizeMode={"cover"}
                                            source={{uri: chartData.imageUri || 'https://reactnative.dev/img/tiny_logo.png'}}
                                        />
                                    </TouchableOpacity>
                                    <View style={{ flexGrow: 1 }}>
                                        <RNText
                                            numberOfLines={2}
                                            style={{ color: selectedBar && selectedBar.key === chartData.key ? palette.gray_600 : palette.gray_500, textAlign: 'center', fontWeight: 'bold' }}
                                        >
                                            {barChartData.map((chartData) => chartData.key)[index]}
                                        </RNText>
                                    </View>
                                </View>
                            )
                        }) }
                        
                    </View>
                }
            </View>
        </View>
    )
}