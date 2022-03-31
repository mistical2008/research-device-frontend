import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

function withReactQuery(component: () => React.ReactNode) {
    const client = new QueryClient()

    return () => (
        <QueryClientProvider client={client}>
            <ReactQueryDevtools initialIsOpen={false} />
            {component()}
        </QueryClientProvider>
    )
}
export { withReactQuery }
