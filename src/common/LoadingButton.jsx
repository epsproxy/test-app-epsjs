import loading from '../img/loading.svg';
const LoadingButton = () => {
    return (
        <button className="button button-loading">
            <img src={loading} width="50"/>
        </button>
    )
}

export default LoadingButton
