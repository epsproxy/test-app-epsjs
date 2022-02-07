import { AppProvider } from './context/AppContext'
import { LoginModalProvider } from './context/LoginModalContext'
import { EpsProvider } from "@epsproxy/epsjs"
// import { EpsProvider } from "../../web3lib"
import { EPSRegister } from './config';

export const Provider = ({ children }) => {
    const provider = Web3.givenProvider;
    provider.on("chainChanged", () => {
        window.location.reload()
    })
    return (
        <EpsProvider contractAddress={EPSRegister} provider={provider}>
            <AppProvider>
                <LoginModalProvider>
                    {children}
                </LoginModalProvider>
            </AppProvider>
        </EpsProvider>
    )
}

