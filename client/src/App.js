import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import './App.css';
import {useSelector} from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import UsersPage from './pages/Users';
import KnowledgeCentrePage from './pages/KnowledgeCentrePage';


function App() {
  const {loading} = useSelector(state =>state.alerts)
  return (
   <>
    <BrowserRouter>
    {loading ? <Spinner/>:
      <Routes>
        <Route path = '/' element= {
          <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
        
        }/>
         <Route path = '/users' element= {
          <ProtectedRoute>
            <UsersPage/>
          </ProtectedRoute>
        
        }/>

        <Route path = '/contants' element= {
          <ProtectedRoute>
            <KnowledgeCentrePage/>
          </ProtectedRoute>
        }/>
         <Route path = '/login' element= {
          <PublicRoute>
            <Login/>
          </PublicRoute>
        }/>
      </Routes>}
      
    </BrowserRouter>
   </>
  );
}

export default App;
