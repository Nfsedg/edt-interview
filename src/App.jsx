import Root from './routes/root';
import Restaurants from './routes/restaurants';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "./App.css";

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/edt-interview"  element={<Root/>} />
      <Route path="/edt-interview/restaurant/:restId" element={<Restaurants/>} />
    </Routes>
  </Router>
  );
}

export default App;
