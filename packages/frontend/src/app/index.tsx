import { Routing } from 'pages'

import { withProviders } from 'app/providers'

import './index.css'

function App() {
    return (
        <>
            <Routing />
        </>
    )
}

export default withProviders(App)
