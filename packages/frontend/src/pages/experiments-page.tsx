import { Card, Col, Row } from 'antd'

function ExperimentsPage() {
    const experiments = Array.from({ length: 11 }, (_, index) => index + 1)
    const cardStyle = { marginTop: '10px' }

    return (
        <Row gutter={16}>
            {experiments.map((experiment) => (
                <Col span={4} key={experiment}>
                    <Card
                        title={`Эксперимент: ${experiment}`}
                        style={cardStyle}
                    ></Card>
                </Col>
            ))}
        </Row>
    )
}

export default ExperimentsPage
