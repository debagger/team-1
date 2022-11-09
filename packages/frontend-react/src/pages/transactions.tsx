import { AddCircleOutline } from '@mui/icons-material'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Pagination,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { chain } from '@sweet-monads/either'
import { ICoreClientApi } from 'core'
import { BudgetEntity } from 'core/dist/domain/budget/budget.entity'
import { TransactionEntity } from 'core/dist/domain/transactions/transaction.entity'
import dayjs, { Dayjs } from 'dayjs'
import { FC, Fragment, useEffect, useState } from 'react'

function usePagination(data: any[], itemsPerPage: number) {
    const [currentPage, setCurrentPage] = useState(1)
    const maxPage = Math.ceil(data.length / itemsPerPage)

    function currentData() {
        const begin = (currentPage - 1) * itemsPerPage
        const end = begin + itemsPerPage
        return data.slice(begin, end)
    }

    function next() {
        setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage))
    }

    function prev() {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 1))
    }

    function jump(page: number) {
        const pageNumber = Math.max(1, page)
        setCurrentPage(() => Math.min(pageNumber, maxPage))
    }

    return { next, prev, jump, currentData, currentPage, maxPage }
}

type Props = { api: ICoreClientApi }

const Transactions: FC<Props> = ({ api }) => {
    const [transactions, setTransactions] = useState<TransactionEntity[]>([])
    const itemsPerPage = 10
    const [page, setPage] = useState(1)
    const pages = usePagination(transactions, itemsPerPage)
    const pagesCount = Math.ceil(transactions.length / itemsPerPage)
    const handlePageChanged = (e: any, p: number) => {
        setPage(p)
        pages.jump(p)
    }

    const [budgets, setBudgets] = useState<BudgetEntity[]>([
        { id: 0, name: 'Бюджет 1' },
        { id: 1, name: 'Бюджет 2' },
        { id: 2, name: 'Бюджет 3' },
    ])

    const [selectedBudget, setSelectedBudget] = useState<number>(budgets[0].id)

    const [dialogOpen, setDialogOpen] = useState(false)
    const closeDialog = () => setDialogOpen(false)

    const [name, setName] = useState('')
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState<Dayjs | null>(dayjs())
    const changeDate = (newDate: Dayjs | null) => setDate(newDate)

    const loadTransactions = async () => {
        await api.transactions.getTransactions({ budget_id: selectedBudget }).then((data) =>
            data.mapRight((tr) => {
                setTransactions(tr)
            })
        )
    }

    useEffect(() => {
        api.budget.getBudgets().then((b) => {
            if (b.isRight()) {
                debugger
                setBudgets(b.value)
                setSelectedBudget(b.value[0].id)
            }
        })
        loadTransactions()
    }, [selectedBudget])

    return (
        <>
            <IconButton
                aria-label="Добавить новую запись"
                size="large"
                onClick={() => {
                    setDialogOpen(true)
                }}
                sx={{
                    backgroundColor: 'white',
                    position: 'fixed',
                    margin: {
                        left: 'auto',
                        top: 'auto',
                        right: '15px',
                        bottom: '15px',
                    },
                    boxShadow: '3px 3px 3px lightgray',
                }}
            >
                <AddCircleOutline fontSize="large" />
            </IconButton>

            <Fragment>
                <Select
                    label="Бюджет"
                    value={selectedBudget}
                    onChange={(e) => {
                        setSelectedBudget(Number(e.target.value))
                    }}
                >
                    {budgets.map((b) => (
                        <MenuItem key={b.id} value={b.id}>
                            {b.name}
                        </MenuItem>
                    ))}
                </Select>

                <Table size="small">
                    <TableHead>
                        <TableRow key={0}>
                            <TableCell>Дата</TableCell>
                            <TableCell>Название</TableCell>
                            <TableCell>Сумма</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {pages.currentData().map((row: TransactionEntity) => (
                            <TableRow key={row.id + 1}>
                                <TableCell>{row.date.toLocaleDateString()}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {transactions.length > itemsPerPage && (
                    <Box alignItems="center" justifyContent="center" display="flex" marginTop={1}>
                        <Pagination
                            count={pagesCount}
                            page={page}
                            size="large"
                            variant="outlined"
                            shape="circular"
                            onChange={handlePageChanged}
                        />
                    </Box>
                )}
            </Fragment>

            <Dialog open={dialogOpen} onClose={closeDialog}>
                <DialogTitle>Новая транзакция</DialogTitle>
                <DialogContent>
                    <Stack spacing={3}>
                        <TextField label="Название" onChange={(e) => setName(e.currentTarget.value)} />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Дата"
                                value={date}
                                onChange={changeDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                        <TextField label="Сумма" onChange={(e) => setAmount(Number(e.currentTarget.value))} />
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog}>Отмена</Button>
                    <Button
                        onClick={async () => {
                            const newTransaction = {
                                amount: amount,
                                date: date!.toDate(),
                                name: name,
                                budget_id: selectedBudget,
                            }

                            await api.transactions.addTransaction(newTransaction).then(() => {
                                setTransactions([...transactions, { ...newTransaction, id: 0, user_email: '' }])
                            })

                            closeDialog()
                        }}
                    >
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Transactions
