import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import {
    Assignment as AssignmentIcon,
    FactCheck as WishlistIcon,
    Layers as LayersIcon,
    BarChart as BarChartIcon,
    People as PeopleIcon,
    ShoppingCart as ShoppingCartIcon,
    Dashboard as DashboardIcon,
    WorkHistory,
} from '@mui/icons-material'
import { Link } from 'react-router-dom'

export const mainListItems = (
    <React.Fragment>
        {/* <Link to="dashboard">
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
        </Link>
        <Link to="orders">
            <ListItemButton>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItemButton>
        </Link> */}
        <Link to="transactions">
            <ListItemButton>
                <ListItemIcon>
                    <WorkHistory />
                </ListItemIcon>
                <ListItemText primary="Бюджеты" />
            </ListItemButton>
        </Link>
        {/* <ListItemButton>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
        </ListItemButton> */}
        <ListItemButton>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Отчеты" />
        </ListItemButton>
        {/* <ListItemButton>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
        </ListItemButton> */}
        <Link to="wishlists">
            <ListItemButton>
                <ListItemIcon>
                    <WishlistIcon />
                </ListItemIcon>
                <ListItemText primary="Крупные покупки" />
            </ListItemButton>
        </Link>
    </React.Fragment>
)

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Сохраненные отчеты
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="За месяц" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="За квартал" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="За год" />
        </ListItemButton>
    </React.Fragment>
)
