import { Table } from 'antd'

import { WebsocketMessage } from '@app/types'

type Props = {
    children?: React.ReactNode
    dataset: WebsocketMessage['payload'][] | []
}

function DataTable({ dataset = [] }: Props) {
    const columns = [
        {
            title: 'id',
            dataIndex: 'sensorId',
            key: 'sensorId',
            fixed: true,
            width: 150,
        },
        { title: 'Time', dataIndex: 'timestamp', key: 'timestamp' },
        { title: 'Value', dataIndex: 'value', key: 'value' },
    ]

    return (
        <Table
            rowKey="timestamp"
            bordered
            // @ts-expect-error
            dataSource={dataset}
            columns={columns}
            scroll={{ x: 500 }}
        />
    )
}

export { DataTable }
