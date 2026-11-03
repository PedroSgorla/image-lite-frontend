import React from 'react'

interface InputTextProps {
    style?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeHolder?: string;
}

export const InputText: React.FC<InputTextProps> = ({style, onChange, placeHolder}: InputTextProps) => {
    return (
        <input type="text"
                onChange={onChange}
                placeholder={placeHolder}
                className={`${style} border px-3 py-2 rounded-lg text-gary-900`}/>
    )
}