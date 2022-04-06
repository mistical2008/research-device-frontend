import { Card, Col, Row } from 'antd'

import { useExperiment } from 'src/features'
import { Chart } from 'src/features/chart'

function SingleExperimentPage() {
    const { datasetBySensors } = useExperiment()
    return (
        <>
            <Row gutter={[16, 16]} style={{ height: '50%' }}>
                <Col span={24}>
                    <Card title="Основной график эксперимента">
                        <Chart dataset={datasetBySensors} />
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
