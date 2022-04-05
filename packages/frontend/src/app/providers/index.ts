import { flow } from 'fp-ts/function'

import { withExperimentState } from 'app/providers/with-experiment-state'
import { withRecoil } from 'app/providers/with-recoil'
import { withRouter } from 'app/providers/with-router'

export const withProviders = flow(withExperimentState, withRecoil, withRouter)
