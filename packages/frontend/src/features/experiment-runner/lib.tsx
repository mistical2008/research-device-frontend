import React, { useEffect } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'

import { useSession } from 'shared/api/websocket'

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
    const { connect, close, sendMessage } = useSession(
        () => console.log('Connected to websocket'),
        (data) => console.log({ data }),
        () => console.log('Disconnected from websocket')
    )
    const start = () => {
        setStatus('started')
        sendMessage({ source: 'client', cmd: 'test:start' })
    }
    const stop = () => {
        setStatus('stopped')
        sendMessage({ source: 'client', cmd: 'test:stop' })
    }
    const toggle = () => {
        if (started) {
            stop()
        } else {
            start()
        }
    }

    useEffect(() => {
        connect()
        return () => {
            close()
        }
    }, [])

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
