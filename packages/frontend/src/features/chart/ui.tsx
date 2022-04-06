import { WebsocketMessage } from '@app/types'

type Props = {
    children?: React.ReactNode
    dataset: WebsocketMessage['payload'][] | []
}
const Chart = ({ dataset }: Props) => {
    return (
        <code>
            <pre>Chart: {JSON.stringify(dataset, null, 2)}</pre>
        </code>
    )
}

export { Chart }
