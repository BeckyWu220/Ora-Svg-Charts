import React from 'react';
const ReactNative = require('react-native');
const { View } = ReactNative;
import { BarChart as SVGBarChart } from 'react-native-svg-charts';
import { Rect, G, Text } from 'react-native-svg';

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

    const colors = ['#9EA8B7', '#7D6A80', '#74988C', '#3E5567', '#63819B']
    const barChartData = props.data.map((charData, index) => {
        return {
            key: charData.key,
            value: charData.value,
            svg: {
                fill: charData.color || colors[index],
                onClick: () => setSelectedBar({
                    label: charData.key,
                    value: charData.value
                }),
                onPress: () => setSelectedBar({
                    label: charData.key,
                    value: charData.value
                })
            },
        }
    })

    const total = props.data.map(chartData => chartData.value).reduce((a, b) => a + b, 0)

    const Labels = (args) => {
        const { x, y, bandwidth, data } = args
        const colors = data.map((barData) => barData.svg.fill)
        const capHeight = 10
        const fontSize = 16
        return (
            data.map((barData, index) => {
                const { value, key } = barData
                return (
                    <G key={index}>
                        <Text
                            x={x(index) + (bandwidth / 2)}
                            y={y(value)-fontSize}
                            fontSize={fontSize}
                            fontWeight={ selectedBar.label === key ? 'bold' : undefined}
                            fill={'black'}
                            alignmentBaseline={'middle'}
                            textAnchor={'middle'}
                        >
                            {(value / total * 100).toFixed(2) + '%'}
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
        )
    }

    return (
        <View>
            <SVGBarChart
                style={{ height: 200 }}
                data={barChartData}
                gridMin={0}
                yAccessor={({ item }) => item.value}
                contentInset={{ top: 25, bottom: 20 }}
                spacingInner={0.6}
                spacingOuter={0.8}
            >
                <Labels />
            </SVGBarChart>
        </View>
    )
}