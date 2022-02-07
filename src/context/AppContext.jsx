import { useState, useContext, useEffect, createContext } from 'react';
import { useEps } from '@epsproxy/epsjs'
// import { useEps } from '../../../web3lib';
import { NETWORK_TYPE } from '../config'

export const AppContext = createContext();

export const AppProvider = props => {
    const {
        helper,
    } = useEps();

    const [user, setUser] = useState(undefined);
    const [loaded, setLoaded] = useState(false)
    const [invalidNetwork, setInvalidNetwork] = useState()

    useEffect(async () => {
        if (!helper) {
            return
        }

        const networktype = await helper.getNetworkType()
        if (networktype !== NETWORK_TYPE) {
            setInvalidNetwork(true)
            setLoaded(true)
            return
        }

        const isLoggedIn = sessionStorage.getItem("loggedin");
        const currentProvider = localStorage.getItem("current_provider");

        if (!isLoggedIn || currentProvider === "walletconnect") {
            logout();
        } else {
            try {
                let user;
                user = await helper.getAccount();
                setUser(user);
            } catch (err) {
                logout()
            }
        }

        setLoaded(true);
    }, [helper]);

    const login = async (provider) => {
        switch (provider) {
            case "metamask":
                await loginMetamask()
                break;
            case "walletconnect":
                await loginWalletConnect()
                break
            default:
                await loginMetamask()
        }

        const user = await helper.getAccount(provider)
        saveUserSession(user, provider)
        return user
    }

    const loginMetamask = async () => {
        await helper.changeProvider(Web3.givenProvider)
    }

    const loginWalletConnect = async () => {
        //  Create WalletConnect Provider
        const chainId = await getChainId(NETWORK_TYPE);
        const provider = new WalletConnectProvider.default({
            infuraId: "9aa3d95b3bc440fa88ea12eaa4456161", // Required
            chainId,
        });

        provider.on("chainChanged", () => {
            window.location.reload()
        })

        //  Enable session (triggers QR Code modal)
        await helper.changeProvider(provider)
    }

    const saveUserSession = (user, provider) => {
        localStorage.setItem("current_user", user.address);
        localStorage.setItem("current_provider", provider);
        sessionStorage.setItem("loggedin", true)
        setUser(user)
    }

    const logout = async () => {
        const currentProvider = localStorage.getItem("current_provider");
        if (!currentProvider) {
            return;
        }
        setUser(undefined)

        sessionStorage.removeItem("loggedin")
        localStorage.removeItem("current_user")
        localStorage.removeItem("current_provider")
    }

    return (
        <AppContext.Provider value={{
            loaded,
            user,
            invalidNetwork,
            login, logout
        }}>
            {props.children}
        </AppContext.Provider>
    );
}

export const useApp = () => useContext(AppContext)
