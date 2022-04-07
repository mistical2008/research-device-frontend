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
import { MainNavigation } from 'src/features/nav-menu'

const { Header, Content, Sider } = Layout

function LayoutMain() {
    const [asideCollapsed, setAsideCollapsed] = useState(false)
    const { started, toggle } = useExperiment()
    const toggleExperimentStatus = () => toggle()

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
                    <MainNavigation />
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
                            {started ? 'Включен' : 'Выключен'}
                        </Menu.Item>
                        <Menu.Item key="voltage-state" icon={<GiElectric />}>
                            11В
                        </Menu.Item>
                        <Menu.Item
                            key="heat-state"
                            icon={<BsThermometerHalf />}
                            title="40°C"
                        >
                            40°C
                        </Menu.Item>
                    </Menu>
                </Sider>
            </Layout>
        </Layout>
    )
}

export { LayoutMain }
