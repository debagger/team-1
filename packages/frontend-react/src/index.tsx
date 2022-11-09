import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './root'
import ErrorPage from './pages/error-page'
import Login from './pages/login'
import Profile from './pages/profile'
import Dashboard from './pages/dashboard'
import Orders from './pages/orders'
import Signup from './pages/signup'
import { demoApi } from './api/demo-api'
import BudgetEdit from './pages/budget-edit'
import Wishlists from './pages/wishlists'
import Transactions from './pages/transactions'

const api = demoApi

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'orders',
                element: <Orders />,
            },
            {
                path: 'transactions',
                element: <Transactions api={api} />
            },
            {
                path: 'wishlists',
                element: <Wishlists />,
            },
            {
                path: 'profile',
                element: <Profile tabIndex={0} api={api} setAuth={(...args: any[]) => console.log(args)} />,
            },
            {
                path: 'profile/budgets',
                element: <Profile tabIndex={1} api={api} setAuth={(...args: any[]) => console.log(args)} />,
            },
            {
                path: 'profile/budgets/:id',
                element: <BudgetEdit api={api} />,
            },
        ],
    },
    {
        path: 'login',
        element: <Login api={api} setAuth={(...args: any[]) => console.log(args)} />,
    },
    {
        path: 'signup',
        element: <Signup api={api} setAuth={(...args: any[]) => console.log(args)} />,
    },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
