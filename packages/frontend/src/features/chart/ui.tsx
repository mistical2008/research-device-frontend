import {
    LineChart,
    Line,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
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
            <LineChart width={500} height={300} margin={{ right: 0 }}>
                <XAxis dataKey="timestamp" scale={'time'} />
                <YAxis dataKey="value" />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                {Object.keys(dataset).map((sensorId, idx) => {
                    return (
                        <Line
                            name={`sensor: ${sensorId}`}
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
