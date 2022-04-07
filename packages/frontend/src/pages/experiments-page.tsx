import { Card, Col, Row } from 'antd'
import { Link } from 'react-router-dom'

function ExperimentsPage() {
    const experiments = Array.from({ length: 11 }, (_, index) => index + 1)
    const cardStyle = { marginTop: '10px' }

    return (
        <Row gutter={16}>
            {experiments.map((experiment, idx) => (
                <Col span={4} key={experiment}>
                    {/* TODO: use current experiment id instead of idx */}
                    <Link to={`/experiments/${idx + 1}`}>
                        <Card
                            // TODO: use route.name instead of idx and replace :exId with the current experiment id
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
