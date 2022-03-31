import { createRoot } from 'react-dom/client'

import { worker } from 'mocks/server'

import App from 'app'

worker.start()

const container = document.getElementById('root')
const root = createRoot(container as Element)
root.render(<App />)
