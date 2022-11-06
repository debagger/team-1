import * as React from 'react'
import styled from '@emotion/styled'
import { Container, Box, Tab, Tabs } from '@mui/material'
import ProfileForm from '../components/profile-form'
import { ICoreClientApi } from 'core'
import BudgetsList from '../components/budgets-list'
import { useNavigate } from 'react-router-dom'

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

type Props = { setAuth: any; api: ICoreClientApi; tabIndex?: number }

const Profile: React.FC<Props> = ({ setAuth, api, tabIndex }) => {
    const ref = React.useRef<any>(null)

    const navigate = useNavigate()

    const [tabIndexValue, setTabIndex] = React.useState(() => (tabIndex ? tabIndex : 0))

    const handleTabChange = (event: React.SyntheticEvent, newTabIndex: number) => {
        const tabLinks = ['/profile', '/profile/budgets']
        navigate({ pathname: tabLinks[newTabIndex] })
        setTabIndex(newTabIndex)
    }

    return (
        <div ref={ref}>
            <RootStyle>
                <Container maxWidth="sm">
                    <ContentStyle>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={tabIndexValue} onChange={handleTabChange} aria-label="basic tabs example">
                                    <Tab label="Профиль" {...a11yProps(0)} />
                                    <Tab label="Бюджеты" {...a11yProps(1)} />
                                </Tabs>
                            </Box>

                            <TabPanel value={tabIndexValue} index={0}>
                                <ProfileForm api={api} setAuth={setAuth} />
                            </TabPanel>

                            <TabPanel value={tabIndexValue} index={1}>
                                <BudgetsList api={api} />
                            </TabPanel>
                        </Box>
                    </ContentStyle>
                </Container>
            </RootStyle>
        </div>
    )
}

export default Profile
