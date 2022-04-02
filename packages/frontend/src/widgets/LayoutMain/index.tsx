import { Layout, Menu } from 'antd'
import { Outlet } from 'react-router-dom'

import { Breadcrumbs } from '~features'

const { Header, Content } = Layout

function LayoutMain() {
    return (
        <Layout style={{ height: '100vh' }}>
            <Header
                style={{
                    position: 'fixed',
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
                {/* TODO: device metadata */}
            </Header>
            {/* TODO: breadcrumbs */}
            <Content
                style={{
                    padding: '0 50px',
                    marginTop: 64,
                    backgroundColor: '#ffffff',
                }}
            >
                <Breadcrumbs />
                <Outlet />
            </Content>
            {/* TODO: aside with controls */}
        </Layout>
    )
}

export { LayoutMain }
