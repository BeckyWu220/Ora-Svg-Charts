import React from 'react';
const ReactNative = require('react-native');
const { View, Image, Text: RNText, TouchableOpacity } = ReactNative;
import { BarChart as SVGBarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { Rect, G, Text } from 'react-native-svg';
import * as scale from 'd3-scale';

interface ChartData {
    key: string,
    value: number,
    color?: string
}

export interface BarChartProps {
    data: Array<ChartData>
}

export default function BarChart(props: BarChartProps) {

    const [selectedBar, setSelectedBar] = React.useState({
        label: '',
        value: 0
    })

    const [barWidth, setBarWidth] = React.useState(0)
    const [positions, setPositions] = React.useState([])
    const [barMargin, setBarMargin] = React.useState(0)

    const colors = ['#9EA8B7', '#7D6A80', '#74988C', '#3E5567', '#63819B']
    const barChartData = props.data.map((chartData, index) => {
        return {
            key: chartData.key,
            value: chartData.value,
            svg: {
                fill: chartData.color || colors[index],
                onClick: () => setSelectedBar({
                    label: chartData.key,
                    value: chartData.value
                }),
                onPress: () => setSelectedBar({
                    label: chartData.key,
                    value: chartData.value
                })
            },
        }
    })

    const total = props.data.map(chartData => chartData.value).reduce((a, b) => a + b, 0)

    const Labels = (args) => {
        const { x, y, bandwidth, data } = args
        const colors = data.map((barData) => barData.svg.fill)
        const capHeight = 10
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
                        fontWeight={ selectedBar.label === key ? 'bold' : 'normal'}
                        fill={ selectedBar.label === key ? 'black' : 'gray'}
                        alignmentBaseline={'middle'}
                        textAnchor={'middle'}
                    >
                        {(value / total * 100).toFixed(1) + '%'}
                    </Text>
                    <Rect
                        x={x(index)}
                        y={y(value) - capHeight / 2 } // Subtract Height / 2 to make half of the Rect above the bar
                        rx={capHeight / 2} // Set to Height / 2
                        ry={capHeight / 2} // Set to Height / 2
                        width={bandwidth}
                        height={10} // Height of the Rect
                        fill={colors[index]}
                    />
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
        <View style={{ height: 250, flexDirection: 'row' }}>
            <YAxis
                data={barChartData.map((chartData) => chartData.value)}
                contentInset={{ top: 25, bottom: 70 }}
                svg={{
                    fill: 'grey',
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
                    <Grid svg={{ stroke: '#e3e3e3' }} />
                    <Labels />
                </SVGBarChart>
                {   barWidth > 0 &&
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 60 }}>
                        { barChartData.map((chartData, index) => {
                            return (
                                <View key={index} style={{ width: barWidth + 2 * barMargin, height: '100%', position: 'absolute', left: positions[index] - barMargin }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelectedBar({
                                                label: chartData.key,
                                                value: chartData.value
                                            })
                                        }}
                                        style={{ width: barWidth, height: barWidth, borderRadius: barWidth/2, overflow: 'hidden', alignSelf: 'center', maxWidth: 40, maxHeight: 40 }}
                                    >
                                        <Image
                                            style={{width: '100%', height: '100%', opacity: selectedBar.label === chartData.key ? 1 : 0.5}}
                                            resizeMode={"cover"}
                                            source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                                        />
                                    </TouchableOpacity>
                                    <View style={{ flexGrow: 1 }}>
                                        <RNText
                                            numberOfLines={2}
                                            style={{ textAlign: 'center', fontWeight: selectedBar.label === chartData.key ? 'bold' : 'normal' }}
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