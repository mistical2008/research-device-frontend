import { Button, Space } from 'antd'
import { useState } from 'react'
import { LayoutMain } from 'widgets'

function HomePage() {
    const [count, setCount] = useState(0)

    return (
        <LayoutMain headerTitle="Home page">
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
                <Button type="primary" onClick={() => setCount(count + 1)}>
                    count: {count}
                </Button>
                <Button onClick={() => setCount(0)}>Reset count</Button>
            </Space>
        </LayoutMain>
    )
}

export default HomePage
