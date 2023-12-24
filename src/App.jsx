import Root from './routes/root';
import Restaurants from './routes/restaurants';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import "./App.css";

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/"  element={<Root />} />
      <Route path="/restaurant/:restId" element={<Restaurants/>} />
    </Routes>
  </Router>
  );
}

export default App;
