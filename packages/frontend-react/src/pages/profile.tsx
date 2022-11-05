import * as React from 'react'
import styled from '@emotion/styled'
import {
    Container,
    Box,
    Tab,
    Tabs,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    TextField,
} from '@mui/material'
import { Delete, Add, Edit } from '@mui/icons-material'
import ProfileForm from '../components/profile-form'
import { ICoreClientApi } from 'core'
import { isEither } from '@sweet-monads/either'
import DialogForm from '../components/dialog-form'

//////////////////////////////////
const RootStyle = styled('div')({
    background: 'rgb(249, 250, 251)',
    // height: '100vh',
    display: 'grid',
    placeItems: 'center',
})

const ContentStyle = styled(Box)({
    maxWidth: 480,
    padding: 25,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    background: '#fff',
})

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const Profile = ({ setAuth, api }: { setAuth: any; api: ICoreClientApi }) => {
    const ref = React.useRef<any>(null)
    const [tabIndex, setTabIndex] = React.useState(0)
    const handleTabChange = (event: React.SyntheticEvent, newTabIndex: number) => {
        setTabIndex(newTabIndex)
    }

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
        <div ref={ref}>
            <RootStyle>
                <Container maxWidth="sm">
                    <ContentStyle>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="basic tabs example">
                                    <Tab label="Профиль" {...a11yProps(0)} />
                                    <Tab label="Бюджеты" {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={tabIndex} index={0}>
                                <ProfileForm api={api} setAuth={setAuth} />
                            </TabPanel>
                            <TabPanel value={tabIndex} index={1}>
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
                            </TabPanel>
                        </Box>
                    </ContentStyle>
                </Container>
            </RootStyle>
        </div>
    )
}

export default Profile
