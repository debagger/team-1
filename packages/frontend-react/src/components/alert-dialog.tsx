import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

// @ts-ignore
export default function AlertDialog({ state, title, text, hClose }) {
    return (
        <div>
            <Dialog
                open={state}
                onClose={hClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={hClose}>Отмена</Button>
                    <Button onClick={hClose} autoFocus>
                        ОК
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
