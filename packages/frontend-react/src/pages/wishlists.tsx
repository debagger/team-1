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

const wishlistArray = [
    {
        wishlistName: 'PC and video',
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
        wishlistName: 'Relax',
        items: [
            {
                itemName: 'Hookah',
                price: 11000,
                plannedFlow: '?',
            },
            {
                itemName: 'Home lamp',
                price: 5000,
                plannedFlow: '?',
            },
            {
                itemName: 'Soft chair',
                price: 15000,
                plannedFlow: '?',
            },
        ],
    },
]

export default function Wishlists() {
    return (
        <div>
            {wishlistArray.map((el, index) => (
                <Accordion sx={{ marginBottom: '7px' }} key={el.wishlistName + index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{el.wishlistName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item&nbsp;name</TableCell>
                                        <TableCell align="right">Price,&nbsp;RUB</TableCell>
                                        <TableCell align="right">Planned&nbsp;flow</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {el.items.map((row, index) => (
                                        <TableRow
                                            key={row.itemName + index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.itemName}
                                            </TableCell>
                                            <TableCell align="right">{row.price}</TableCell>
                                            <TableCell align="right">{row.plannedFlow}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            ))}
            <Accordion disabled>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                    <Typography>Inactive wishlist</Typography>
                </AccordionSummary>
            </Accordion>
        </div>
    )
}
