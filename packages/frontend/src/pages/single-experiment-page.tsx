import { Card, Col, Row } from 'antd'

import { useExperimentState } from 'features'
import { Chart } from 'features/chart'
import { DataLog } from 'features/data-log'
import { DataTable } from 'features/data-table'

function SingleExperimentPage() {
    const { datasetBySensors, dataset } = useExperimentState()
    return (
        <Row gutter={[16, 16]} style={{ height: '50%' }}>
            <Col span={24}>
                <Card title="Основной график эксперимента">
                    <Chart dataset={datasetBySensors} />
                </Card>
            </Col>
            <Col span={12}>
                <Card title="Окно с логом приходящих данных">
                    <DataLog dataset={dataset} height={500} />
                </Card>
            </Col>
            <Col span={12}>
                <Card
                    bodyStyle={{ padding: 0 }}
                    title="Табличная часть эксперимента"
                >
                    <DataTable dataset={dataset} />
                </Card>
            </Col>
        </Row>
    )
}

export default SingleExperimentPage
