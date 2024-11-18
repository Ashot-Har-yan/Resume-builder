import  {useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Use BrowserRouter
import LoadingWrapper from './LoadingWrapper';
import { ROUTE_CONSTANTS } from './util/constants';
import { Login, Register,Resume} from './pages/auth';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfileInfo } from './state/userProfile';
import './App.css';

function App() {
    const dispatch = useDispatch();
    const {loading,authUserInfo:{isAuth}} = useSelector(store=>store.userProfile);
    
    useEffect(()=>{
      dispatch(fetchUserProfileInfo());
    },[])
   
    return (
        <LoadingWrapper loading={loading}>
            <Router> 
                <Routes>
                    <Route
                        path={ROUTE_CONSTANTS.LOGIN}
                        element={isAuth ? <Navigate to={ROUTE_CONSTANTS.RESUME} /> : <Login />}
                    />
                    <Route
                        path={ROUTE_CONSTANTS.REGISTER}
                        element={isAuth ? <Navigate to={ROUTE_CONSTANTS.RESUME} /> : <Register />}
                    />
                    <Route
                        path={ROUTE_CONSTANTS.RESUME}
                        element={isAuth ? <Resume />: <Navigate to={ROUTE_CONSTANTS.LOGIN} />}
                    />
                </Routes>
            </Router>
        </LoadingWrapper>
    );
}

export default App;
