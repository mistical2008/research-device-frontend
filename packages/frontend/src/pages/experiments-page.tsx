import { Button, Space, Typography } from 'antd'
import { useState } from 'react'

function ExperimentsPage() {
    const initialState = 1
    const [count, setCount] = useState(initialState)

    return (
        <Space
            direction="vertical"
            align="center"
            style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
            }}
        >
            <Typography.Title level={2}>
                Welcome to the Experiments page
            </Typography.Title>
            <Button type="primary" onClick={() => setCount(count + 1)}>
                count: {count}
            </Button>
            <Button onClick={() => setCount(initialState)}>Reset count</Button>
        </Space>
    )
}

export default ExperimentsPage
