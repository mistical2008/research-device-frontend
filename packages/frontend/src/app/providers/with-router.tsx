import { BrowserRouter } from 'react-router-dom'

function withRouter(component: () => React.ReactNode) {
    return () => <BrowserRouter>{component()}</BrowserRouter>
}
export { withRouter }
