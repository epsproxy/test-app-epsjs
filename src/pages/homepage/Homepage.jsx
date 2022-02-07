import SectionTitle from './SectionTitle';
import { useApp } from '../../context/AppContext';
import SectionMain from './SectionMain';

function Homepage() {
    const {
        user,
    } = useApp();

    return (
        <>
            <SectionTitle user={user} />
            <SectionMain />
        </>
    )
}

export default Homepage
