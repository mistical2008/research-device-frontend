import { Route, Routes } from 'react-router-dom'

import { routes } from 'shared/config/routes'

import { LayoutMain } from 'src/widgets'

import { withPageLoading } from './lib/providers/with-page-loading'

function Routing() {
    const homeRoute = routes.find((route) => route.path === '/')

    return (
        <Routes>
            <Route path={homeRoute?.path} element={<LayoutMain />}>
                {routes.map((route) => (
                    <Route
                        index={route.path === homeRoute?.path}
                        key={route.path}
                        path={route.path}
                        element={withPageLoading(route.element)}
                    />
                ))}
            </Route>
        </Routes>
    )
}

export { Routing }
