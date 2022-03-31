import { Suspense } from 'react'
import { PagePreloader } from '~shared/ui'

function withPageLoading(Page: React.ReactNode) {
    return (
        <Suspense fallback={<PagePreloader />}>
            <Page />
        </Suspense>
    )
}
export { withPageLoading }
