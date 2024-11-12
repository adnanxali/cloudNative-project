import './App.css'
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import RegistrationForm from './pages/LoginPage';
import SigninForm from './pages/SigninPage';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import HomePage from './pages/Home';
function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/register' element={<RegistrationForm/>}/>
          <Route path='/login' element={<SigninForm/>}/>
          <Route path='/admin/login' element={<AdminLogin/>}/>
          <Route path='/employee/dashboard/:id' element={<EmployeeDashboard/>}/>
          <Route path='/admin/dashboard/:id' element={<AdminDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
