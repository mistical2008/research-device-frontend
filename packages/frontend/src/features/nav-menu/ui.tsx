import { Menu } from 'antd'
import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import { routes as routesConfig } from 'pages'

function MainNavigation() {
    const location = useLocation()
    const params = useParams()
    // TODO: use for :exId current experiment id from recoil store
    // TODO: replace :exId in the route.name and route.path with the current experiment id
    // route == '/experiments/:exId'
    // route == '/experiments/:exId/edit'
    // route == '/experiments/:exId/delete'
    // params.exId: string == '1'
    // route.replace(`:${paramskey}`, params[key])
    // const routes = routesConfig.map(route => ({
    //     ...route,
    //     path: route.path.replace(`${}`, ''),
    // }))

    useEffect(() => {
        const pathSnippets = location.pathname.split('/').filter((i) => i)
        console.log({ pathSnippets, location, params })
    }, [location, params])

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
