import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import { DatasetBySensors } from '../experiment-runner/types'

type Props = {
    children?: React.ReactNode
    // dataset: DatasetBySensors[] | []
    dataset: DatasetBySensors | {}
}

function Chart({ dataset }: Props) {
    return (
        <ResponsiveContainer width={'100%'} height={500}>
            <LineChart width={500} height={500}>
                <XAxis dataKey="timestamp" />
                <YAxis dataKey="value" />
                {Object.keys(dataset).map((sensorId) => {
                    return (
                        <Line
                            key={sensorId}
                            type="monotone"
                            dataKey="value"
                            data={dataset[sensorId]}
                            stroke={`#${Math.floor(
                                Math.random() * 16777215
                            ).toString(16)}`}
                        />
                    )
                })}
            </LineChart>
        </ResponsiveContainer>
    )
}

export { Chart }
