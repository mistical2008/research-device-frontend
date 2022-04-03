import { Layout, Menu } from 'antd'
import { Link, Outlet } from 'react-router-dom'

import { routesCollection as routes } from 'shared/config/routes'

import { Breadcrumbs } from 'features'

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
                    defaultSelectedKeys={['1']}
                >
                    <Menu.Item key="1">
                        <Link to={routes.home.basePath}>
                            {routes.home.name}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={routes.experimentsList.basePath}>
                            {routes.experimentsList.name}
                        </Link>
                    </Menu.Item>
                    {/* Появляется только после старта эксперимента */}
                    <Menu.Item key="3">
                        <Link to={routes.experiment.basePath}>
                            Текущий эксперимент
                        </Link>
                    </Menu.Item>
                </Menu>
                {/* TODO: Start experiment button which navigates to a currently started experiment */}
                {/* TODO: device metadata */}
            </Header>
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
