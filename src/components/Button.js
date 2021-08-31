import React from 'react'
import { Button as MuiButton } from "@material-ui/core"

export default function Button(props) {
    const { text, size, color, variant, onClick } = props

    return (
        <MuiButton
        variant={variant || 'contained'}
        size={size || 'large'}
        color={color || 'primary'}
        onClick={onClick}
        >
            {text}
        </MuiButton>
    )
}