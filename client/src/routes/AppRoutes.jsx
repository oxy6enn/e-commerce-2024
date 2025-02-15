// rafce

import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/Shop'

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: 'shop', element: <Shop /> },
])
const AppRoutes = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default AppRoutes
