import { Card, Col, Row } from 'antd'

import { useExperiment } from 'src/features'
import { Chart } from 'src/features/chart'

function SingleExperimentPage() {
    const { dataset } = useExperiment()
    return (
        <>
            <Row gutter={[16, 16]} style={{ height: '50%' }}>
                <Col span={24}>
                    {/* TODO: add sections - содержит основной график эксперимента */}
                    {/* Some references */}
                    {/* https://apexcharts.com/react-chart-demos/line-charts/realtime/ */}
                    {/* https://www.ag-grid.com/react-charts/gallery/real-time-data-updates/ */}
                    <Card title="Основной график эксперимента">
                        <div id="experiment-chart" />
                        <Chart dataset={dataset} />
                    </Card>
                </Col>
                <Col span={12}>
                    {/* TODO: add sections - окно с логом приходящих данных */}
                    <Card title="Окно с логом приходящих данных">
                        <div id="experiment-log" />
                    </Card>
                </Col>
                <Col span={12}>
                    {/* TODO: add sections - табличная часть эксперимента */}
                    <Card title="Табличная часть эксперимента">
                        <div id="experiment-data-table" />
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default SingleExperimentPage
