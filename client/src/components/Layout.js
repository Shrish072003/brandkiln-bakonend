import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import necessary hooks
import '../styles/LayoutStyles.css';
import { SidebarMenu } from '../Data/data';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/features/userSlice';

const Layout = ({ children }) => {
    const { user } = useSelector(state => state.user);
    const location = useLocation(); // Get current location
    const navigate = useNavigate(); // For navigation after logout
    const dispatch = useDispatch(); // For updating Redux store

    // Logout function
    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('token');
        dispatch(setUser(null)); // Clear user from Redux store
        navigate('/login'); // Redirect to login page
    };

    return (
        <>
            <div className='main'>
                <div className='layout'>
                    <div className='sidebar'>
                        <div className='logo'>
                            <h3>BrandKiln</h3>
                            <hr />
                        </div>
                        <div className='menu'>
                            {SidebarMenu.map((menu, index) => {
                                const isActive = location.pathname === menu.path;
                                return (
                                    <div key={index} className={`menu-item ${isActive ? 'active' : ''}`}>
                                        <Link to={menu.path} className="menu-link">
                                            <i className={menu.icon}></i>
                                            <span>{menu.name}</span>
                                        </Link>
                                        <hr />
                                    </div>
                                );
                            })}
                            <div className='menu-item' onClick={handleLogout}>
                                <div className="menu-link" style={{ cursor: 'pointer' }}>
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                    <span>Logout</span>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                    <div className='content'>
                        <div className='header'>
                            <i className="fa-solid fa-bell"></i>
                            <Link to={'/profile'}>{user?.name}</Link>
                        </div>
                        <div className='body'>{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Layout;
