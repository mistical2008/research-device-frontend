import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import { routesCollection as routes } from 'shared/config/routes'

import { LayoutMain } from 'widgets'

import { withPageLoading } from './lib/providers/with-page-loading'

const HomePage = lazy(() => import('pages/home-page'))
const ExperimentsPage = lazy(() => import('pages/experiments-page'))
const SingleExperimentPage = lazy(() => import('pages/single-experiment-page'))

function Routing() {
    return (
        <Routes>
            <Route path={routes.home.basePath} element={<LayoutMain />}>
                <Route index element={withPageLoading(HomePage)} />
                <Route
                    path={routes.experimentsList.basePath}
                    element={withPageLoading(ExperimentsPage)}
                />
                <Route
                    path={routes.experiment.basePath}
                    element={withPageLoading(SingleExperimentPage)}
                />
                <Route path="*" element={<div>404</div>} />
            </Route>
        </Routes>
    )
}

export { Routing }
