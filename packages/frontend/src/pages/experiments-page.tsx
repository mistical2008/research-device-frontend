import { Card, Col, Row } from 'antd'
import { Link } from 'react-router-dom'

function ExperimentsPage() {
    const experiments = Array.from({ length: 11 }, (_, index) => index + 1)
    const cardStyle = { marginTop: '10px' }

    return (
        <Row gutter={16}>
            {experiments.map((experiment) => (
                <Col span={4} key={experiment}>
                    <Link to="/experiments/1">
                        <Card
                            title={`Эксперимент: ${experiment}`}
                            style={cardStyle}
                        ></Card>
                    </Link>
                </Col>
            ))}
        </Row>
    )
}

export default ExperimentsPage
