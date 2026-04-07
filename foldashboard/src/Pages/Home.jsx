import React, { Component, useState, useEffect } from 'react';
import { supabase } from "../Supabase";

import './Home.css'
import Nav from '../Components/Nav';
import SideBar from '../Components/SideBar';
import PageTitle from '../Components/PageTitle';
import TimeFilter from '../Components/TimeFilter';

const Home = () => {

    const [pageData, setPageData] = useState({ title: '', subTitle: '' });
    const [loading, setLoading] = useState(true);

    const [activeTime, setActiveTime] = useState('week');

    useEffect(() => {
        const fetchPageTitle = async () => {
            const { data, error } = await supabase
                .from('PageTitle')
                .select('Title, Description')
                .eq('id', 1) // Fetching the Dashboard row
                .single();

            if (error) {
                console.error('Error fetching data:', error);
            } else if (data) {
                setPageData({
                    title: data.Title,
                    subTitle: data.Description
                });
            }
            setLoading(false);
        };

        fetchPageTitle();
    }, []);

    if (loading) return <div>Loading...</div>;


    return (<>
    
    
<section class="dashboard-wrapper ">

  <aside> 
    <SideBar activeTitle="لوحة التحكم" />
  </aside>
  
  <main class="main-content">

    <header>
      <Nav />
    </header>

    <section class="dashboardBody">

      <div className='topSec'>

        <PageTitle title={pageData.title} subTitle={pageData.subTitle} />

        <div className='filterCont'>
          <TimeFilter 
            activeFilter={activeTime} 
            onFilterChange={setActiveTime} 
          />
        </div>

      </div>

    </section>

  </main>

</section>

    
    </>  );
}
 
export default Home;
