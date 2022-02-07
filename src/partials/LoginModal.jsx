import metamaskLogo from '../img/metamask-logo.png';
import walletconnectLogo from '../img/walletconnect-logo.png';
import trustWalletLogo from '../img/trustwallet-logo.svg';

import { useLoginModal } from '../context/LoginModalContext'

function LoginModal() {
    const { modalActive, login, closeLoginModal } = useLoginModal()
    const activeClass = modalActive ? " active": "";
    const modalContainerClass = `modal-container small${activeClass}`;

    return (
        <div className={modalContainerClass}>
            <div className="modal">
                <button className="button button-modal-close" onClick={closeLoginModal}>
                    <i className="fas fa-times"></i> 
                </button>
                <div className="modal-inner">
                    <div className="modal-body p-0">
                        <div className="modal-body-group vertical">
                            <div className="modal-chooser">
                                <div className="modal-chooser-item" onClick={() => login("metamask")}>
                                    <h4>Metamask</h4>
                                    <div className="wallet-logo-img">
                                        <img className="img-100" src={metamaskLogo}/>
                                    </div>
                                </div>
                                <div className="modal-chooser-item mt-1" onClick={() => login("walletconnect")}>
                                    <h4>WalletConnect</h4>
                                    <div className="wallet-logo-img">
                                    <img className="img-100" src={walletconnectLogo}/>
                                    </div>
                                </div>
                                <div className="modal-chooser-item mt-1" onClick={() => login("metamask")}>
                                    <h4>Trust Wallet</h4>
                                    <div className="wallet-logo-img">
                                    <img className="img-80" src={trustWalletLogo}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal;
