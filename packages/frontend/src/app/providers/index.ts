import { flow } from 'fp-ts/function'

import { withRouter } from 'app/providers/with-router'
import { withReactQuery } from './with-react-query'

export const withProviders = flow(withReactQuery, withRouter)
