import React from 'react'
import { createRoot } from 'react-dom/client'

import { worker } from 'mocks/server'

import App from 'app'

worker.start()

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
