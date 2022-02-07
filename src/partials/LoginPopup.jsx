import PopupModal from '../common/PopupModal.jsx'
import { useLoginModal } from '../context/LoginModalContext'

const LoginPopup = () => {
    const { popupActive } = useLoginModal()
    return (
        <PopupModal
            isActive={popupActive}
        >
            Connecting
        </PopupModal>
    )
}
export default LoginPopup
