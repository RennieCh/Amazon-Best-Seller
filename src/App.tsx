import './App.css';
import WebApp from './Phase4_web_app/WebApp';
import { HashRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/*" element={<WebApp />} />
      </Routes>
    </HashRouter>
  );
}
