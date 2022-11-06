import * as React from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Container, Box, IconButton, TextField, InputAdornment, Stack } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import PersonIcon from '@mui/icons-material/Person'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'

import styled from '@emotion/styled'
import { ArrowLeft } from '@mui/icons-material'
import { ICoreClientApi } from 'core'

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

type Props = { api: ICoreClientApi }

const BudgetEdit: React.FC<Props> = ({ api }) => {
    const params = useParams()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/profile/budgets/'
    const navigate = useNavigate()

    const [editFormData, setEditFormData] = React.useState({ name: '' })

    const handleUpdateName = (id: number, newName: string) => {
        api.budget.updateBudgetName({ budget_id: id, name: newName })
    }

    // const budgetUsers = api.budget.getBudgetInfo({params.id})

    return (
        <div>
            <RootStyle>
                <Container maxWidth="sm">
                    <ContentStyle>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <h3>
                                    <span>
                                        <IconButton onClick={() => navigate(from)}>
                                            <ArrowLeft />
                                        </IconButton>
                                    </span>
                                    Редактировать бюджет {params.id}
                                </h3>
                            </Box>
                            <Stack spacing={2}>
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Название"
                                    defaultValue="Название шаблона"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Владелец"
                                    defaultValue="Владелец Иванов"
                                    InputProps={{
                                        readOnly: true,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Участник"
                                    defaultValue="Участник Петров"
                                    InputProps={{
                                        readOnly: true,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Участник"
                                    defaultValue="Участник брат Петрова"
                                    InputProps={{
                                        readOnly: true,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Зритель"
                                    defaultValue="Зритель Сидоров"
                                    InputProps={{
                                        readOnly: true,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PermIdentityIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    id="outlined-read-only-input"
                                    label="Зритель"
                                    defaultValue="Зритель сестра Сидорова"
                                    InputProps={{
                                        readOnly: true,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PermIdentityIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                {/* {params.id && handleUpdateName} */}
                            </Stack>
                        </Box>
                    </ContentStyle>
                </Container>
            </RootStyle>
        </div>
    )
}

export default BudgetEdit
