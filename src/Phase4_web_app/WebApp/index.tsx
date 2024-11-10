import { Route, Routes, Navigate } from 'react-router-dom';
import TOC from './TOC';
import Graph from './graph';
import Table from './table';
import Wordcloud from './wordcloud';
import Home from './home';

export default function WebApp() {
    return (
        <div className="container-fluid p-0">
            {/* Header and TOC Section */}
            <div className="d-flex flex-column bg-black text-white">
                {/* Header Row */}
                <div className="d-flex align-items-center justify-content-between">
                    {/* Title */}
                    <h1 className="m-4">Amazon Best Seller</h1>
                    {/* Logo */}
                    <img src="images/NEU.png" width="90px" alt="NEU Logo" />
                </div>

                {/* TOC Navigation */}
                <TOC />
            </div>

            {/* Content Section */}
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/graph" element={<Graph />} />
                    <Route path="/wordcloud" element={<Wordcloud />} />
                    <Route path="/table" element={<Table />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
}
