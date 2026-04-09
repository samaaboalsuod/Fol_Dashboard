import React, { Component, useState, useEffect } from 'react';
import { supabase } from "../Supabase";

import './Home.css'
import Nav from '../Components/Nav';
import SideBar from '../Components/SideBar';
import PageTitle from '../Components/PageTitle';
import TimeFilter from '../Components/TimeFilter';
import StatisticsBigCard from '../Components/StatisticsBigCard';

// import AppIcon from '../Assets/appIcon.svg'
// import KiosIcon from '../Assets/kioskIcon.svg'
// import UsersIcon from '../Assets/usersIcon.svg'
// import UpIcon from '../Assets/trend-upIcon.svg'

const Home = () => {

const [pageData, setPageData] = useState({ title: '', subTitle: '' });
const [cards, setCards] = useState([]); 
const [loading, setLoading] = useState(true);
const [activeTime, setActiveTime] = useState('week');

useEffect(() => {
    const fetchDashboardData = async () => {
        try {
            // 1. Fetch Page Title
            const { data: titleData } = await supabase
                .from('PageTitle')
                .select('Title, Description')
                .eq('id', 1)
                .single();

            if (titleData) {
                setPageData({
                    title: titleData.Title,
                    subTitle: titleData.Description
                });
            }

            // 2. Fetch the 4 Statistics Cards
            // Since you have URLs in the 'icon' column, we just fetch the text directly
            const { data: cardData } = await supabase
                .from('DashCards')
                .select('*')
                .order('id', { ascending: true })
                .limit(4);

            if (cardData) {
                setCards(cardData);
            }
        } catch (error) {
            console.error('Dashboard Load Error:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchDashboardData();
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

<div className='bigCardsRow' style={{ display: 'flex', gap: '1vw', direction: 'rtl' }}>
    {cards.map((card) => (
        <StatisticsBigCard 
            key={card.id}
            title={card.Title}     // Matches your Supabase "Title" column
            value={card.Value}     // Matches your Supabase "Value" column
            subTitle={card.SubTitle} // Matches your Supabase "SubTitle" column
            src={card.icon} // Uses the string in the "icon" column to pick the SVG
            alt={card.alt}         // Matches your Supabase "alt" column
        />
    ))}
</div>

      <div className='bigCardsRow'></div>

    </section>

  </main>

</section>

    
    </>  );
}
 
export default Home;
