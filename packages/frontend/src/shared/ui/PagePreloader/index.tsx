import { Spin } from 'antd'

function PagePreloader() {
    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Spin />
        </div>
    )
}

export { PagePreloader }
