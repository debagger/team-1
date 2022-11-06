import * as React from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Container, Box, IconButton } from '@mui/material'
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
                                    Редактировать бюджет
                                </h3>
                            </Box>
                            {params.id}
                        </Box>
                    </ContentStyle>
                </Container>
            </RootStyle>
        </div>
    )
}

export default BudgetEdit
