import React from 'react';

function PopupModal(props) {
    const activeClass = props.isActive ? " active" : "";
    const modalContainerClass = `modal-container small${activeClass}`;

    return (
        <div className={modalContainerClass}>
            <div className="modal">
                {props.onClose && (
                    <button className="button button-modal-close" onClick={props.onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                )}
                <div className="modal-inner">
                    <div className="modal-body text-center">
                        {props.children}
                    </div>

                    {props.okLabel && (
                        <div className="modal-footer">
                            <button type="button" className="button button-modal-footer" onClick={props.onClose}>
                                {props.okLabel}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PopupModal;
