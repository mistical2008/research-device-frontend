import { Layout, Typography } from 'antd'

const { Header, Content } = Layout

type Props = {
    children: React.ReactNode
    headerTitle: React.ReactNode | string
}

function LayoutMain({ children, headerTitle }: Props) {
    return (
        <Layout style={{ height: '100vh' }}>
            <Header>
                <Typography.Title style={{ color: '#fff' }} level={1}>
                    {headerTitle}
                </Typography.Title>
            </Header>
            <Content>{children}</Content>
        </Layout>
    )
}

export { LayoutMain }
