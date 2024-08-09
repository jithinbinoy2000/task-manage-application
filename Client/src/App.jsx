import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Task from './Pages/Task';

function App() {
  return (
   
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/task/:projectId' element={<Task />} />
        <Route path='/*' element={<Login />} />
      </Routes>
    
  );
}

export default App;
