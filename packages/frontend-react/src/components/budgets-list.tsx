import { Add, Delete, Edit } from '@mui/icons-material'
import * as React from 'react'
import DialogForm from './dialog-form'
import { ICoreClientApi } from 'core'
import TextField from '@mui/material/TextField/TextField'
import List from '@mui/material/List/List'
import ListItem from '@mui/material/ListItem/ListItem'
import ListItemText from '@mui/material/ListItemText/ListItemText'
import IconButton from '@mui/material/IconButton/IconButton'

type Props = {
    api: ICoreClientApi
}

const BudgetsList: React.FC<Props> = ({ api }) => {
    const [budgets, setBudgets] = React.useState<any[]>([])

    const updateBudgets = () =>
        api.budget.getBudgets().then(async (b) => (b.isRight() ? setBudgets(b.value) : console.log(b.value)))

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

    const [editFormData, setEditFormData] = React.useState({ name: '' })

    const handleUpdateName = (id: number, newName: string) => {
        api.budget.updateBudgetName({ budget_id: id, name: newName }).then(updateBudgets)
    }

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
                        <ListItemText primary={b.name} />
                        <DialogForm
                            buttonIcon={<Edit />}
                            title="Редактировать"
                            onOk={() => handleUpdateName(b.id, editFormData.name)}
                            onOpen={() => setEditFormData({ name: b.name })}
                        >
                            <TextField
                                label="Название"
                                value={editFormData.name}
                                onChange={(e) => setEditFormData({ name: e.currentTarget.value })}
                            />
                        </DialogForm>
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
