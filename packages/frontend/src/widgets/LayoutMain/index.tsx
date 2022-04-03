import { Layout, Menu } from 'antd'
import { useState } from 'react'
import { AiOutlineHeatMap, AiOutlinePoweroff } from 'react-icons/ai'
import { BsThermometerHalf } from 'react-icons/bs'
import { GiElectric } from 'react-icons/gi'
import { Link, Outlet } from 'react-router-dom'
import {isStarted, toggleExperiment} from 'features/experiment-runner'
import { useStore } from '@nanostores/react'

import { routesCollection as routes } from 'shared/config/routes'

import { Breadcrumbs } from 'features'
import { ToggleButton } from 'entities/ToggleButton'

const { Header, Content, Sider } = Layout

function LayoutMain() {
    const [asideCollapsed, setAsideCollapsed] = useState(false)
    const isToggled = useStore(isStarted)

    return (
        <Layout>
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
                        style={{ marginRight: 'auto' }}
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
                    <ToggleButton isToggled={isToggled} onClick={toggleExperiment} />
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
                <Sider
                    collapsible
                    collapsed={asideCollapsed}
                    onCollapse={setAsideCollapsed}
                    reverseArrow={true}
                    theme="light"
                    style={{
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
                    {/* TODO: buld device stats panel*/}
                    <Menu>
                        <Menu.Item key="model" icon={<AiOutlineHeatMap />}>
                            JY2000-2
                        </Menu.Item>
                        <Menu.Item
                            key="power-state"
                            icon={<AiOutlinePoweroff />}
                        >
                            {isToggled ? 'Включен' : 'Выключен'}
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
