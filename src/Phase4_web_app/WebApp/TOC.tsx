import { NavLink } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { GrTableAdd } from 'react-icons/gr';
import { FaGithub } from 'react-icons/fa6';
import { BsBodyText } from "react-icons/bs";


export default function TOC() {
    return (
        <div className="container-fluid bg-black py-2">
            <ul className="nav nav-pills d-flex m-0">
                {/* Home Page Link */}
                <li className="nav-item">
                    <NavLink
                        to="/"
                        end
                        className="nav-link d-flex align-items-center"
                        style={({ isActive }) => ({
                            backgroundColor: 'black',
                            color: isActive ? 'red' : 'white',
                            borderColor: 'transparent',
                        })}
                    >
                        <FaHome style={{ color: 'red', marginRight: '8px' }} />
                        Home Page
                    </NavLink>
                </li>

                {/* Word Cloud Link */}
                <li className="nav-item ms-3">
                    <NavLink
                        to="/wordcloud"
                        className="nav-link d-flex align-items-center"
                        style={({ isActive }) => ({
                            backgroundColor: 'black',
                            color: isActive ? 'red' : 'white',
                            borderColor: 'transparent',
                        })}
                    >
                        <BsBodyText style={{ color: 'red', marginRight: '8px' }} />
                        Wordcloud
                    </NavLink>
                </li>

                {/* Data Table Link */}
                <li className="nav-item ms-3">
                    <NavLink
                        to="/table"
                        className="nav-link d-flex align-items-center"
                        style={({ isActive }) => ({
                            backgroundColor: 'black',
                            color: isActive ? 'red' : 'white',
                            borderColor: 'transparent',
                        })}
                    >
                        <GrTableAdd style={{ color: 'red', marginRight: '8px' }} />
                        Data Table
                    </NavLink>
                </li>

                {/* GitHub Link */}
                <li className="nav-item ms-3">
                    <a
                        href="https://github.com/RennieCh/Amazon-Best-Seller"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-link d-flex align-items-center"
                        style={{
                            backgroundColor: 'black',
                            color: 'white',
                            borderColor: 'transparent',
                        }}
                    >
                        <FaGithub style={{ color: 'red', marginRight: '8px' }} />
                        GitHub
                    </a>
                </li>
            </ul>
        </div>
    );
}
