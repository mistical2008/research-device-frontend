import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { LayoutMain } from 'widgets'

import { withPageLoading } from './lib/providers/with-page-loading'
const HomePage = lazy(() => import('pages/home'))

function Routing() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <LayoutMain headerTitle="Loading home page">
                        {''}
                    </LayoutMain>
                }
            />
            <Route index element={withPageLoading(HomePage)} />
            <Route path="*" element={<div>404</div>} />
        </Routes>
    )
}

export { Routing }
