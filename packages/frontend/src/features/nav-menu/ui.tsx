import { Menu } from 'antd'
import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import { routes as routesConfig } from 'shared/config/routes'

function MainNavigation() {
    const location = useLocation()
    const params = useParams()
    // const routes = routesConfig.map(route => ({
    //     ...route,
    //     path: route.path.replace(`${}`, ''),
    // }))

    useEffect(() => {
        const pathSnippets = location.pathname.split('/').filter((i) => i)
        console.log({ pathSnippets, location, params })
    }, [location])

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            style={{ marginRight: 'auto' }}
        >
            {routesConfig.map((route) => (
                <Menu.Item key={route.path}>
                    <Link to={route.path}>{route.name}</Link>
                </Menu.Item>
            ))}
        </Menu>
    )
}

export { MainNavigation }
