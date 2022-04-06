import React, { useEffect } from 'react'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'

import { useSession } from 'shared/api/websocket'

import {
    status,
    isStarted,
    experimentDataset,
} from 'features/experiment-runner'

import { WebsocketMessage } from '@app/types'

interface ContextValue {
    start: () => void
    stop: () => void
    toggle: () => void
    started: boolean
    dataset: WebsocketMessage['payload'][]
}
const ExperimentContext = React.createContext<ContextValue | null>(null)
ExperimentContext.displayName = 'ExperimentContext'

function ExperimentProvider({ children }: React.PropsWithChildren<{}>) {
    const setStatus = useSetRecoilState(status)
    const started = useRecoilValue(isStarted)
    const [dataset, setDataset] = useRecoilState(experimentDataset)
    const { connect, close, sendMessage } = useSession(
        () => console.log('Connected to websocket'),
        (data) => setDataset([...dataset, data.payload]),
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
        <ExperimentContext.Provider
            value={{ started, dataset, start, stop, toggle }}
        >
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
