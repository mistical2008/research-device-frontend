import { ExperimentProvider } from 'features/experiment-runner'

function withExperimentState(component: () => React.ReactNode) {
    return () => <ExperimentProvider>{component()}</ExperimentProvider>
}
export { withExperimentState }
