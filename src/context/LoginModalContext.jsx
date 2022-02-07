import React, { createContext, useState, useContext } from 'react'
import { useApp } from '../context/AppContext'

const LoginModalContext = createContext()

export const LoginModalProvider = ({ children }) => {
    const { login: appLogin } = useApp()
    const [modalActive, setModalActive] = useState()
    const [popupActive, setPopupActive] = useState()
    const showLoginModal = () => {
        setModalActive(true)
    }

    const closeLoginModal = () => {
        setModalActive(false)
    }

    const login = async (provider) => {
        setModalActive(false)
        setPopupActive(true)
        try {
            await appLogin(provider)
        } finally {
            setPopupActive(false)
        }
    }

    return (
        <LoginModalContext.Provider value={{ showLoginModal, closeLoginModal, modalActive, popupActive, login }}>
            {children}
        </LoginModalContext.Provider>
    )
}

export const useLoginModal = () => useContext(LoginModalContext)
