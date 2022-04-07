import { List } from 'antd'
import { useCallback, useRef } from 'react'
import { useVirtual } from 'react-virtual'

import { WebsocketMessage } from '@app/types'

type Props = {
    children?: React.ReactNode
    dataset: WebsocketMessage['payload'][] | []
    height?: number
}

function DataLog({ dataset = [], height = 300 }: Props) {
    const parentRef = useRef<HTMLDivElement>()

    const rowVirtualizer = useVirtual({
        size: dataset.length,
        parentRef,
        estimateSize: useCallback(() => 75, []),
    })

    return (
        dataset && (
            <>
                <List size="large">
                    <div
                        ref={parentRef}
                        className="List"
                        style={{
                            height: `${height}px`,
                            width: `100%`,
                            overflow: 'auto',
                        }}
                    >
                        <div
                            style={{
                                height: `${rowVirtualizer.totalSize}px`,
                                width: '100%',
                                position: 'relative',
                            }}
                        >
                            {rowVirtualizer.virtualItems.map((virtualRow) => {
                                const item = dataset[virtualRow.index]

                                return (
                                        <div
                                            key={virtualRow.index}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: `80px`,
                                                transform: `translateY(${virtualRow.start}px)`,
                                                // borderBottom:
                                                //     '1px solid #eeeeee',
                                            }}
                                        >
                                            <List.Item
                                                key={`${item?.sensorId}-${item?.timestamp}`}
                                            >
                                                <List.Item.Meta
                                                    title={`${item?.sensorId}`}
                                                    description={`${item?.timestamp}`}
                                                />
                                                <div>{item?.value}</div>
                                            </List.Item>
                                        </div>
                                )
                            })}
                        </div>
                    </div>
                </List>
            </>
        )
    )
}

export { DataLog }
