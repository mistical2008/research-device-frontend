import { Layout, Menu } from 'antd'
import { useEffect, useState } from 'react'
import { AiOutlineHeatMap, AiOutlinePoweroff } from 'react-icons/ai'
import { BsThermometerHalf } from 'react-icons/bs'
import { GiElectric } from 'react-icons/gi'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

import { routesCollection as routes } from 'shared/config/routes'

import { ToggleButton } from 'entities/ToggleButton'

import { Breadcrumbs } from 'features'
import { useExperiment } from 'features/experiment-runner'

const { Header, Content, Sider } = Layout

function LayoutMain() {
    const [asideCollapsed, setAsideCollapsed] = useState(false)
    const { started, toggle } = useExperiment()
    const toggleExperimentStatus = () => toggle()

    // TODO: move to a separate component
    const location = useLocation()
    const pathSnippets = location.pathname.split('/').filter((i) => i)

    useEffect(() => {
        console.log({ pathSnippets, location })
    }, [location])

    return (
        <Layout style={{ minHeight: '100vh', height: '100%' }}>
            <Layout
                hasSider
                style={{
                    minHeight: '100vh',
                }}
            >
                <Header
                    style={{
                        position: 'fixed',
                        zIndex: 10,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[location.pathname]}
                        style={{ marginRight: 'auto' }}
                    >
                        <Menu.Item key={routes.home.basePath}>
                            <Link to={routes.home.basePath}>
                                {routes.home.name}
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={routes.experimentsList.basePath}>
                            <Link to={routes.experimentsList.basePath}>
                                {routes.experimentsList.name}
                            </Link>
                        </Menu.Item>
                        {/* ???????????????????? ???????????? ?????????? ???????????? ???????????????????????? */}
                        {/* ?????? ?????? ?????????? ???????????????? ???? ??????. ???????????? ????????. */}
                        <Menu.Item key={routes.experiment.basePath}>
                            <NavLink to={routes.experiment.basePath}>
                                ?????????????? ??????????????????????
                            </NavLink>
                        </Menu.Item>
                    </Menu>
                    <ToggleButton
                        isOn={started}
                        onClick={toggleExperimentStatus}
                    />
                </Header>
                <Content
                    style={{
                        padding: '0 50px',
                        margin: '64px auto 0',
                        backgroundColor: '#ffffff',
                        minHeight: 'calc(100vh - 64px)',
                        height: '100%',
                        maxWidth: '1170px',
                    }}
                >
                    <Breadcrumbs />
                    <Outlet />
                </Content>
                <Sider
                    collapsible
                    collapsed={asideCollapsed}
                    onCollapse={setAsideCollapsed}
                    reverseArrow={true}
                    theme="light"
                    style={{
                        height: '100%',
                        position: 'fixed',
                        right: 0,
                        borderLeft: '1px solid #e8e8e8',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <div
                        className="logo"
                        style={{
                            height: '32px',
                            backgroundColor: '#eeeeee',
                            margin: '16px',
                        }}
                    />
                    <Menu selectable={false}>
                        <Menu.Item key="model" icon={<AiOutlineHeatMap />}>
                            JY2000-2
                        </Menu.Item>
                        <Menu.Item
                            key="power-state"
                            icon={<AiOutlinePoweroff />}
                        >
                            {started ? '??????????????' : '????????????????'}
                        </Menu.Item>
                        <Menu.Item key="voltage-state" icon={<GiElectric />}>
                            11??
                        </Menu.Item>
                        <Menu.Item
                            key="heat-state"
                            icon={<BsThermometerHalf />}
                            title="40??C"
                        >
                            40??C
                        </Menu.Item>
                    </Menu>
                </Sider>
            </Layout>
        </Layout>
    )
}

export { LayoutMain }
