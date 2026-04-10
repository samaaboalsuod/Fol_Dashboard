import React, { useState, useEffect } from 'react';
import { supabase } from "../Supabase";

import './Plants.css';


import Nav from '../Components/Nav';
import SideBar from '../Components/SideBar';
import PageTitle from '../Components/PageTitle';
import MainButton from '../Components/MainButton';

import AddIcon from '../Assets/addIcon.svg'






const Plants = () => {

    const [pageData, setPageData] = useState({ title: '', subTitle: '' });
    const [loading, setLoading] = useState(true);

useEffect(() => {
        const fetchPageHeader = async () => {
            try {
                setLoading(true); // Ensure it starts loading
                const { data: titleData, error } = await supabase
                    .from('PageTitle')
                    .select('Title, Description')
                    .eq('id', 2) // Double check if Plants is ID 2 in your DB!
                    .single();

                if (error) {
                    console.error('Supabase Error:', error.message);
                }

                if (titleData) {
                    setPageData({ 
                        title: titleData.Title, 
                        subTitle: titleData.Description 
                    });
                } else {
                    // Fallback title so the page isn't blank if DB fails
                    setPageData({ title: 'النباتات', subTitle: 'إدارة مخزون النباتات' });
                }
            } catch (err) {
                console.error('Fetch Error:', err);
            } finally {
                setLoading(false); // This MUST run to stop the "loading forever"
            }
        };

        fetchPageHeader();
    }, []);

    const handleOpenModal = () => {
        console.log("Opening Add Plant Modal...");
        // Later, you will add logic here to show your pop-up form
        alert("سيتم فتح نافذة إضافة نبات جديد قريباً!"); 
    };

    
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

                    <MainButton label="إضافة نبات جديد" src={AddIcon} onClick={handleOpenModal} disabled={loading} />


                </div>





            </section>

        </main>

    </section>
    
    </> );
}
 
export default Plants;