import { lazy } from 'react'

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

const HomePage = lazy(() => import('pages/home-page'))
const ExperimentsPage = lazy(() => import('pages/experiments-page'))
const SingleExperimentPage = lazy(() => import('pages/single-experiment-page'))

const routes = [
    { path: '/', name: 'Главная', element: HomePage },
    {
        path: '/experiments',
        name: 'Список экспериментов',
        element: ExperimentsPage,
    },
    {
        path: '/experiments/:exId',
        name: 'Эксперимент :exId',
        element: SingleExperimentPage,
    },
]

export { routesCollection, routes }
