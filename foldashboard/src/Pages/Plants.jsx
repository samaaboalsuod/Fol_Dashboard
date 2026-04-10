import React, { useState, useEffect } from 'react';
import { supabase } from "../Supabase";

import './Plants.css';


import Nav from '../Components/Nav';
import SideBar from '../Components/SideBar';
import PageTitle from '../Components/PageTitle';






const Plants = () => {

    const [pageData, setPageData] = useState({ title: '', subTitle: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPageHeader = async () => {
            try {
                // Change the .eq('id', 2) to whatever ID corresponds to the "Plants" page in your DB
                const { data: titleData } = await supabase
                    .from('PageTitle')
                    .select('Title, Description')
                    .eq('id', 2) 
                    .single();

                if (titleData) {
                    setPageData({ 
                        title: titleData.Title, 
                        subTitle: titleData.Description 
                    });
                }
            } catch (error) {
                console.error('Error fetching page header:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPageHeader();
    }, []);

    if (loading) return <div className="loading-screen">جاري التحميل...</div>;

    
    return ( <>
    
    <section className="dashboard-wrapper">

        <aside>
            <SideBar activeTitle="النباتات" />
        </aside>

        <main className="main-content">

            <header>
                <Nav />
            </header>

            <section className="dashboardBody">

                <div className='topSec'>

                    <PageTitle title={pageData.title} subTitle={pageData.subTitle} />

                </div>





            </section>

        </main>

    </section>
    
    </> );
}
 
export default Plants;