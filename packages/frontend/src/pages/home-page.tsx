import { Button, Space } from 'antd'
import { useState } from 'react'

function HomePage() {
    const [count, setCount] = useState(0)

    return (
        <Space
            direction="vertical"
            align="center"
            style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                minHeight: '80vh',
                height: '100%',
            }}
        >
            <Button type="primary" onClick={() => setCount(count + 1)}>
                count: {count}
            </Button>
            <Button onClick={() => setCount(0)}>Reset count</Button>
        </Space>
    )
}

export default HomePage
