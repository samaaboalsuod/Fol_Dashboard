import React, { useState } from 'react';
import SideBar from './SideBar';
import Nav from './Nav';
import './DashboardLayout.css';

const DashboardLayout = ({ children, activeTitle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <section className="dashboard-wrapper">
            <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}></div>
            
            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <SideBar activeTitle={activeTitle} />
            </aside>

            <main className="main-content">
                <header className="dashboard-header">
                    <Nav toggleSidebar={toggleSidebar} />
                </header>
                <section className="dashboardBody">
                    {children}
                </section>
            </main>
        </section>
    );
};

export default DashboardLayout;
