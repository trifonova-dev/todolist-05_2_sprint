
type PropsType = {
    title: string
    onClick: () => void
    disabled?: boolean
    className?: string
}

export const Button = ({ title, onClick, disabled, className }: PropsType) => {
    return (
        <button
            disabled={disabled}
            className={className}
            onClick={onClick}>{title}</button>
    )
}