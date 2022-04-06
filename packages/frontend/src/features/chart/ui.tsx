import {
    LineChart,
    Line,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from 'recharts'

import { DatasetBySensors } from '../experiment-runner/types'

type Props = {
    children?: React.ReactNode
    // dataset: DatasetBySensors[] | []
    dataset: DatasetBySensors | {}
}

function Chart({ dataset }: Props) {
    const colors = ['#0088FE', '#FF8042']

    return (
        <ResponsiveContainer width={'100%'} aspect={16 / 9}>
            <LineChart style={{ width: '100%' }} margin={{ right: -380 }}>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Object.keys(dataset).map((sensorId, idx) => {
                    return (
                        <Line
                            key={sensorId}
                            type="monotone"
                            dataKey="value"
                            data={dataset[sensorId]}
                            stroke={`${colors[idx]}`}
                        />
                    )
                })}
            </LineChart>
        </ResponsiveContainer>
    )
}

export { Chart }
