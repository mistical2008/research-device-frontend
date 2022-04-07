import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

import { routesCollection as routes } from 'pages'

const Breadcrumbs = () => {
    // TODO: implement changing on navigation
    // TODO: add location path reading
    // https://ant.design/components/breadcrumb/
    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
                <Link to={routes.home.basePath}>{routes.home.name}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to={routes.experimentsList.basePath}>
                    {routes.experimentsList.name}
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to={routes.experiment.basePath}>
                    {routes.experiment.name}
                </Link>
            </Breadcrumb.Item>
        </Breadcrumb>
    )
}

export { Breadcrumbs }
