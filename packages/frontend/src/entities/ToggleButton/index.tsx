import { Button } from 'antd'

type Props = {
    isToggled: boolean
    onClick: () => void
    toggledText?: string
    untoggledText?: string
}

function ToggleButton({
    isToggled,
    onClick,
    toggledText = 'Стоп',
    untoggledText = 'Старт',
}: Props) {
    return (
        <Button
            type={isToggled ? 'default' : 'primary'}
            shape="round"
            size="large"
            onClick={onClick}
        >
            {isToggled ? toggledText : untoggledText}
        </Button>
    )
}

export { ToggleButton }
