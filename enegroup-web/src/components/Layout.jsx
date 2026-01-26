import React from 'react';
import Header from './Header';
import Partners from './Partners';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="app-layout">
            <Header />
            <main>
                <Outlet />
            </main>

            {/* Partners right above footer */}
            <Partners />

            <footer style={{
                textAlign: 'center',
                padding: '2rem',
                borderTop: '1px solid #eee',
                backgroundColor: '#fff',
                color: 'var(--color-text-sub)',
                fontSize: '0.875rem'
            }}>
                <div className="container">
                    <p>© 2026 ENE Petro Services. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
