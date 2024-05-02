import React from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({children}) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('user'))
    return getTokenFromLocalStorage?.token !== undefined ? children : (<Navigate to={'/'} replace={true} />)
}
