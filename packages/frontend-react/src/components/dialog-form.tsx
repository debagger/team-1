import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton/IconButton'
import { SvgIconComponent } from '@mui/icons-material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon'

type Props = {
    title: string
    buttonIcon: React.ReactElement<any, any>
    children?: React.ReactNode
    onOpen?: () => void
    onOk?: () => void
}

const FormDialog: React.FC<Props> = (props) => {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
        if (props.onOpen) props.onOpen()
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOk = () => {
        setOpen(false)
        if (props.onOk) props.onOk()
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen}>{props.buttonIcon}</IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>{props.children}</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={handleOk}>ОК</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default FormDialog
