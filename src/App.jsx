import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import { createBrowserHistory } from "history";
import {
    Router,
    Switch,
    Route,
} from "react-router-dom";
import Homepage from './pages/homepage/Homepage';
import Navbar from './partials/Navbar';
import Footer from './partials/Footer';
import Misc from './partials/Misc';

const history = createBrowserHistory();

function App() {
    const {
        loaded,
    } = useContext(AppContext) || {};

    return loaded && (
        <>
            <Router history={history}>
                <Navbar />
                <Switch>
                    <Route path="/">
                        <Homepage/>
                    </Route>
                </Switch>
                <Misc/>
                <Footer />
            </Router>
        </>
    )
}

export default App
