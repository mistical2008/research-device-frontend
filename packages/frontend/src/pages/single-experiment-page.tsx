import { Button, Col, Row } from 'antd'
import { useState } from 'react'

function SingleExperimentPage() {
    const [started, setStarted] = useState(false)
    const handleClick = () => setStarted(!started)

    return (
        <>
            <Row gutter={[16, 16]} style={{ height: '50%' }}>
                <Col span={12}>
                    {/* TODO: add sections - содержит основной график эксперимента */}
                    {/* Some references */}
                    {/* https://apexcharts.com/react-chart-demos/line-charts/realtime/ */}
                    {/* https://www.ag-grid.com/react-charts/gallery/real-time-data-updates/ */}
                </Col>
                <Col span={12}>
                    {/* TODO: add sections - окно с логом приходящих данных */}
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ height: '50%' }}>
                <Col span={12}>
                    {/* TODO: add sections - табличная часть эксперимента */}
                </Col>
                <Col span={12}>
                    {/* TODO: add sections - [x] кнопка "Начать эксперимент" */}
                    <Button
                        type={started ? 'default' : 'primary'}
                        shape="round"
                        size="large"
                        onClick={handleClick}
                    >
                        {started ? 'Остановить' : 'Начать'} эксперимент
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default SingleExperimentPage
