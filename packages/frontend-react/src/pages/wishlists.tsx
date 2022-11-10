import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Delete as DeleteIcon } from '@mui/icons-material'
import { Box, Button, IconButton } from '@mui/material'
import AlertDialog from '../components/alert-dialog'

const wishlistArray = [
    {
        // wishlistName: 'PC and video',
        wishlistName: 'Техника',
        items: [
            {
                itemName: 'TV',
                price: 25000,
                plannedFlow: '?',
            },
            {
                itemName: 'Playstation 5',
                price: 55000,
                plannedFlow: '?',
            },
            {
                itemName: 'RTX 4090',
                price: 155000,
                plannedFlow: '?',
            },
        ],
    },
    {
        // wishlistName: 'Relax',
        wishlistName: 'Отдых',
        items: [
            {
                // itemName: 'Hookah',
                itemName: 'Кальян',
                price: 11000,
                plannedFlow: '?',
            },
            {
                // itemName: 'Home lamp',
                itemName: 'Ночник',
                price: 5000,
                plannedFlow: '?',
            },
            {
                // itemName: 'Soft chair',
                itemName: 'Кресло',
                price: 15000,
                plannedFlow: '?',
            },
        ],
    },
]

export default function Wishlists() {
    const [open, setOpen] = React.useState(false)
    const [text, setText] = React.useState('')
    const [items, setItems] = React.useState(wishlistArray)
    const [isWishList, setIsWishList] = React.useState(true)
    const [itemName, setItemName] = React.useState('')

    const handleClickOpen = (itemName: string, isWishList: boolean) => {
        setText(`Вы действительно хотите удалить элемент "${itemName}"?`)
        setItemName(itemName)
        setOpen(true)
        setIsWishList(isWishList)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOk = () => {
        if (isWishList) {
            setItems(items.filter((el) => el.wishlistName !== itemName))
        }
        setOpen(false)
        handleClose()
    }

    return (
        <div>
            <AlertDialog state={open} title={'Удаление элемента'} text={text} hClose={handleClose} hOk={handleOk} />
            {items.map((wishlist, index) => (
                <Box
                    key={wishlist.wishlistName + index}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={() => handleClickOpen(wishlist.wishlistName, true)}
                        startIcon={<DeleteIcon />}
                        sx={{ marginRight: '10px' }}
                    >
                        {/* Delete */}
                        Удалить
                    </Button>
                    <Accordion sx={{ marginBottom: '6px', marginTop: '6px' }} key={wishlist.wishlistName + index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{wishlist.wishlistName}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            {/* <TableCell>Item&nbsp;name</TableCell>
                                            <TableCell align="right">Price,&nbsp;RUB</TableCell>
                                            <TableCell align="right">Planned&nbsp;flow</TableCell>
                                            <TableCell align="right">Actions</TableCell> */}
                                            <TableCell>Затраты</TableCell>
                                            <TableCell align="right">Стоимость,&nbsp;руб.</TableCell>
                                            <TableCell align="right">Плановая покупка</TableCell>
                                            <TableCell align="right">Действия</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {wishlist.items.map((row, index) => (
                                            <TableRow
                                                key={row.itemName + index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.itemName}
                                                </TableCell>
                                                <TableCell align="right">{row.price}</TableCell>
                                                <TableCell align="right">{row.plannedFlow}</TableCell>
                                                <TableCell align="right">
                                                    <IconButton
                                                        onClick={() => handleClickOpen(row.itemName, false)}
                                                        aria-label="delete"
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            ))}
        </div>
    )
}
