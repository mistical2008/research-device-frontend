import { Card, Col, Row } from 'antd'

import { useExperiment } from 'src/features'
import { Chart } from 'src/features/chart'
import { DataLog } from 'src/features/data-log'
import { DataTable } from 'src/features/data-table'

function SingleExperimentPage() {
    const { datasetBySensors, dataset } = useExperiment()
    return (
        <>
            <Row gutter={[16, 16]} style={{ height: '50%' }}>
                <Col span={24}>
                    <Card title="Основной график эксперимента">
                        <Chart dataset={datasetBySensors} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Окно с логом приходящих данных">
                        <DataLog dataset={dataset} />
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
        </>
    )
}

export default SingleExperimentPage
