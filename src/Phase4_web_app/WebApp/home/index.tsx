import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';
import RandomScatterPlot from './products';

export default function Home() {
    return (
        <div className="container-fluid bg-dark text-light py-3 d-flex flex-column" style={{ minHeight: '100vh' }}>
            {/* Row 1: Welcome Section & Scatter Plot */}
            <div className="row align-items-center">
                {/* Welcome Message (30% width) */}
                <div id="welcome" className="col-lg-4 col-md-12 text-start d-flex flex-column justify-content-start">
                    <h2>Welcome to the Amazon Bestsellers Dashboard</h2>
                    <hr />
                    <p>
                        Discover the most recent best-selling products across 36 categories from Amazon. Analyze trends and make informed decisions with our interactive visualizations.
                    </p>
                </div>

                {/* Scatter Plot (70% width, flex-grow) */}
                <div id="plot" className="col-lg-8 col-md-12 d-flex justify-content-center align-items-center flex-grow-1">
                    <RandomScatterPlot />
                </div>
            </div>

            {/* Row 2: Project Team & Navigation Buttons */}
            <div className="row align-items-center mt-2">
                {/* Project Team (30% width) */}
                <div id="team" className="col-lg-4 col-md-12 d-flex flex-column align-items-start justify-content-center">
                    <h2>Project Team</h2>
                    <div className="team-members d-flex flex-row gap-3 mt-2">
                        <div className="member-card bg-secondary p-3 rounded d-flex flex-column justify-content-center align-items-center">
                            <h5>Runying Chen</h5>
                            <p>Team Leader</p>
                        </div>
                        <div className="member-card bg-secondary p-3 rounded d-flex flex-column justify-content-center align-items-center">
                            <h5>Bohan Cao</h5>
                            <p>Team Member</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons (70% width) */}
                <div id="navigation" className="col-lg-8 col-md-12 d-flex justify-content-center align-items-center mt-2">
                    <div className="button-group">
                        <NavLink to="/graph" className="btn btn-primary me-3">Explore Graphs</NavLink>
                        <NavLink to="/wordcloud" className="btn btn-success me-3">View Wordcloud</NavLink>
                        <NavLink to="/table" className="btn btn-info">Data Table</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
