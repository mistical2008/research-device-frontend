import React from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'

import { status, isStarted } from 'features/experiment-runner'

interface ContextValue {
    start: () => void
    stop: () => void
    toggle: () => void
    started: boolean
}
const ExperimentContext = React.createContext<ContextValue | null>(null)
ExperimentContext.displayName = 'ExperimentContext'

function ExperimentProvider({ children }: React.PropsWithChildren<{}>) {
    const setStatus = useSetRecoilState(status)
    const started = useRecoilValue(isStarted)
    const start = () => {
        setStatus('started')
    }
    const stop = () => {
        setStatus('stopped')
    }
    const toggle = () => {
        if (started) {
            stop()
        } else {
            start()
        }
    }

    return (
        <ExperimentContext.Provider value={{ started, start, stop, toggle }}>
            {children}
        </ExperimentContext.Provider>
    )
}

function useExperiment() {
    const context = React.useContext(ExperimentContext)
    if (!context) {
        throw new Error(
            `hook 'useExperiment' must be used withing the 'ExperimentProvider'`
        )
    }
    return context
}

export { ExperimentProvider, useExperiment }
