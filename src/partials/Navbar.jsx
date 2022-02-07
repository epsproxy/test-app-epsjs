import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import brandMarkAllWhite from '../img/brandMarkAllWhite.png';
import { useLoginModal } from '../context/LoginModalContext'

function Navbar() {
    const {
        user,
        logout,
        invalidNetwork
    } = useContext(AppContext) || {};

    const { showLoginModal } = useLoginModal();

    const getUserFormattedAddress = () => {
        if (!user) {
            return
        }
        const address = user.address;
        const front = address.substr(0, 5)
        const dots = '...'
        const back = address.substr(address.length - 4)
        return front + dots + back
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <div className="navbar-logo">
                        <img src={brandMarkAllWhite} width="80" alt="PROXY" />
                    </div>
                </div>
                <div className="navbar-right">
                    {!invalidNetwork && (
                        user ? (
                            <>
                                <div className="user-container" onClick={logout}>
                                    <div className="address">{getUserFormattedAddress()}</div>
                                </div>
                            </>
                        ) : (
                            <button
                                onClick={showLoginModal}
                                className="button button-signin button-primary-outline curved">CONNECT</button>
                        )
                    )}
                </div>
            </nav>
        </>
    )
}

export default Navbar;
