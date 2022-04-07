import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import { LayoutMain } from 'src/widgets'

import { withPageLoading } from 'pages/lib/providers'

const HomePage = lazy(() => import('pages/home-page'))
const ExperimentsPage = lazy(() => import('pages/experiments-page'))
const SingleExperimentPage = lazy(() => import('pages/single-experiment-page'))

const routesCollection = {
    home: {
        basePath: '/',
        name: 'Главная',
    },
    experimentsList: {
        basePath: '/experiments',
        name: 'Список экспериментов',
    },
    experiment: {
        basePath: '/experiments/1',
        name: 'Эксперимент',
    },
}

const routes = [
    { path: '/', name: 'Главная', element: withPageLoading(HomePage) },
    {
        path: '/experiments',
        name: 'Список экспериментов',
        element: withPageLoading(ExperimentsPage),
    },
    {
        path: '/experiments/:exId',
        name: 'Эксперимент :exId',
        element: withPageLoading(SingleExperimentPage),
    },
]

function Routing() {
    const homeRoute = routes.find((route) => route.path === '/')

    return (
        <Routes>
            <Route path={homeRoute?.path} element={<LayoutMain />}>
                {routes.map((route) => (
                    // TODO: if route.path matches :exId than replace :exId with current experiment id
                    <Route
                        index={route.path === homeRoute?.path}
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}
                <Route path="*" element={<div> Not found: 404 </div>} />
            </Route>
        </Routes>
    )
}

export { Routing, routesCollection, routes }
