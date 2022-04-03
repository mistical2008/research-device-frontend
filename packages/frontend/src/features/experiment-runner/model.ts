import { atom, action, computed } from 'nanostores'

type ExperimentStatus = 'idle' | 'started' | 'stopped'

const experimentStatus = atom<ExperimentStatus>('idle')

const startExperiment = action(experimentStatus, 'start', (status) =>
    status.set('started')
)

const stopExperiment = action(experimentStatus, 'start', (status) =>
    status.set('stopped')
)

const isStarted = computed(experimentStatus, (status) =>
    status === 'idle' || status === 'stopped' ? false : true
)

const toggleExperiment = action(experimentStatus, 'toggle', (started) => {
    if (started.get() === 'idle' || started.get() === 'stopped') {
        startExperiment()
    } else {
        stopExperiment()
    }
})

export {
    experimentStatus,
    startExperiment,
    stopExperiment,
    isStarted,
    toggleExperiment,
}
