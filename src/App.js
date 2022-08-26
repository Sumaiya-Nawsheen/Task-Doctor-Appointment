import Home from './components/pages/Home'
import { Route, Routes } from 'react-router-dom'
import DoctorDetails from './components/pages/DoctorDetails';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className='row d-flex justify-content-center align-items-center'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doclist/:id" element={<DoctorDetails />} />
        </Routes>

      </div>

    </div>
  );
}

export default App;
