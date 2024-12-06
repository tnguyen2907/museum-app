import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Results from './pages/Results';
import Details from './pages/Details';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />             
        <Route path="/results" element={<Results />} />   
        <Route path="/details/" element={<Details />} /> 
      </Routes>
    </Router>
  );
}

export default App
