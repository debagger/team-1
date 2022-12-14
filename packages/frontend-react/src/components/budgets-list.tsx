import { Add, Delete, Edit } from '@mui/icons-material'
import * as React from 'react'
import DialogForm from './dialog-form'
import { ICoreClientApi } from 'core'
import TextField from '@mui/material/TextField/TextField'
import List from '@mui/material/List/List'
import ListItem from '@mui/material/ListItem/ListItem'
import ListItemText from '@mui/material/ListItemText/ListItemText'
import IconButton from '@mui/material/IconButton/IconButton'
import { useNavigate } from 'react-router-dom'

type Props = {
    api: ICoreClientApi
}

const BudgetsList: React.FC<Props> = ({ api }) => {
    const navigate = useNavigate()

    const [budgets, setBudgets] = React.useState<any[]>([])

    const updateBudgets = () => {
        api.budget.getBudgets().then(async (b) => {
            b.isRight() ? setBudgets(b.value) : console.log(b.value)
            if (!(b.value as any[]).length) api.budget.createBudget({ name: 'Мой бюджет' }).then(updateBudgets)
        })
    }

    React.useEffect(() => {
        updateBudgets()
    }, [])

    const handleAddBudget = (data: { name: string }) => {
        api.budget.createBudget(data).then(updateBudgets)
    }

    const handleDeleteBudget = (id: number) => () => {
        api.budget.deleteBudget({ budget_id: id }).then(updateBudgets)
    }

    const [addFormData, setAddFormData] = React.useState({ name: '' })

    return (
        <>
            <DialogForm
                buttonIcon={<Add />}
                title="Добавить"
                onOpen={() => setAddFormData({ name: '' })}
                onOk={() => handleAddBudget(addFormData)}
            >
                <TextField
                    label="Название"
                    value={addFormData.name}
                    onChange={(e) => setAddFormData({ name: e.currentTarget.value })}
                />
            </DialogForm>

            <List>
                {budgets.map((b) => (
                    <ListItem key={b.id}>
                        <ListItemText
                            primary={b.name}
                            secondary={
                                <React.Fragment>{'Владелец Иванов, Участник Петров, Зритель Сидоров'}</React.Fragment>
                            }
                        />
                        <IconButton onClick={() => navigate({ pathname: `/profile/budgets/${b.id}` })}>
                            <Edit />
                        </IconButton>
                        <IconButton onClick={handleDeleteBudget(b.id)}>
                            <Delete />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default BudgetsList
