import React, { Component, useState, useEffect } from 'react';
import { supabase } from "../Supabase";

import './Home.css'

import Nav from '../Components/Nav';
import SideBar from '../Components/SideBar';
import PageTitle from '../Components/PageTitle';
import TimeFilter from '../Components/TimeFilter';
import StatisticsBigCard from '../Components/StatisticsBigCard';
import SmallIconCard from '../Components/SmallIconCard';
import Titles from '../Components/Titles';
import NumbersNofill from '../Components/NumbersNofill';
import BestSeller from '../Components/BestSeller';
import AskTotalCard from '../Components/AskTotalCard';

import MoneyIcon from '../Assets/moneyIcon.svg'
import QuestionIcon from '../Assets/questionIcon.svg'
import FolIcon from '../Assets/folIcon.svg'
import ChattIcon from '../Assets/chatIcon.svg'
import TotalRatio from '../Components/TotalRatio';
import GrowthRow from '../Components/GrowthRow';



const Home = () => {

const [pageData, setPageData] = useState({ title: '', subTitle: '' });
const [cards, setCards] = useState([]); 
const [loading, setLoading] = useState(true);
const [activeTime, setActiveTime] = useState('week');
const [smallCards, setSmallCards] = useState([]);
const [noFillCards, setNoFillCards] = useState([]);
const [bestSellers, setBestSellers] = useState([]);
const [stats, setStats] = useState({
        totalQuestions: 0,
        pendingRequests: 0,
        satisfactionRate: 0,
        aiQueries: 156 
    });
const [weeklyData, setWeeklyData] = useState([]);

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

            // 2. Fetch DashCards (Statistics)
            const { data: cardData } = await supabase
                .from('DashCards')
                .select('*')
                .order('id', { ascending: true });

            if (cardData) {
                setCards(cardData.slice(0, 4));
                setSmallCards(cardData.slice(4, 10));
                setNoFillCards(cardData.slice(10, 14));
            }

            // 3. Fetch Best Sellers, Expert Stats, and Weekly Growth in Parallel
            const [plantsRes, productsRes, totalRes, pendingRes, ratingRes, growthRes] = await Promise.all([
                supabase.from('Plant').select('NameAR, Price, TotalSales'),
                supabase.from('Products').select('NameAR, Price, TotalSales'),
                supabase.from('Expert_Requests').select('*', { count: 'exact', head: true }),
                supabase.from('Expert_Requests').select('*', { count: 'exact', head: true }).eq('StatusAR', 'قيد الانتظار'),
                supabase.from('Expert_Requests').select('Rating').not('Rating', 'is', null),
                supabase.from('Weekly_Growth').select('*').order('id', { ascending: true }) // New Fetch
            ]);

            console.log("Supabase Growth Response:", growthRes);

if (growthRes.error) {
    console.error("Supabase Table Error:", growthRes.error.message);
}

if (growthRes.data) {
    console.log("Weekly Data Rows:", growthRes.data); // This shows the actual 7 days
    setWeeklyData(growthRes.data);
}

            // --- Process Best Sellers ---
            const allItems = [
                ...(plantsRes.data || []).map(item => ({
                    title: item.NameAR,
                    price: item.Price,
                    pieces: item.TotalSales
                })),
                ...(productsRes.data || []).map(item => ({
                    title: item.NameAR,
                    price: item.Price,
                    pieces: item.TotalSales
                }))
            ];

            const top3 = allItems
                .filter(item => item.pieces !== null)
                .sort((a, b) => b.pieces - a.pieces)
                .slice(0, 3);

            setBestSellers(top3);

            // --- Process Expert Request Stats ---
            const avgRating = ratingRes.data?.length 
                ? (ratingRes.data.reduce((acc, curr) => acc + curr.Rating, 0) / ratingRes.data.length)
                : 0;
            const satisfactionPercent = Math.round((avgRating / 5) * 100);

            setStats({
                totalQuestions: totalRes.count || 0,
                pendingRequests: pendingRes.count || 0,
                satisfactionRate: satisfactionPercent || 0,
                aiQueries: 156 
            });

            // --- Process Weekly Growth ---
            if (growthRes.data) {
                setWeeklyData(growthRes.data);
            }

        } catch (error) {
            console.error('Dashboard Load Error:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchDashboardData();
}, []);
    


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

<div className='bigCardsRow' >
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

      <div className='bigCardsRow'>
        {smallCards.map((card) => (
        <SmallIconCard
            key={card.id}
            title={card.Title}
            value={card.Value}
            subTitle={card.SubTitle}
            src={card.icon} // Uses the same URL logic as the big cards
            alt={card.alt}
        />
       ))}
      </div>

      <div className='part3'>

        <div className='bestCardCont'>

          <Titles src={MoneyIcon} title='نظرة عامة على المبيعات' />

          <div className='numbContRow'>

            {noFillCards.map((card) => (
              <NumbersNofill 
                key={card.id}
                title={card.Title}
                value={card.Value} 
              />
            ))}

          </div>

          <h4>أفضل المنتجات مبيعًا</h4>

          <div className='bestCont'>
            {bestSellers.map((item, index) => (
        <BestSeller 
            key={index}
            rank={index + 1}
            title={item.title}
            pieces={item.pieces}
            value={`$${(item.price * item.pieces).toLocaleString()}`} 
        />
    ))}
          </div>

        </div>

        <div className='questionsTotalCont'>

          <Titles src={QuestionIcon} title='الأسئلة القادمة' />

          <AskTotalCard 
                src={FolIcon}
                title="استفسارات AI اليوم"
                value={stats.aiQueries}
                theme="pink-theme"
          />

          <AskTotalCard 
                src={ChattIcon}
                title="طلبات الخبراء المعلقة"
                value={stats.pendingRequests}
                subTitle="عرض الطلبات المعلقة ←"
                theme="green-theme"
          />

          <div className='bottom-stats-container'>

            <TotalRatio 
              title="إجمالي الأسئلة" 
              value={stats.totalQuestions.toLocaleString()} 
            />

            <TotalRatio 
              title="متوسط وقت الرد" 
              value="2.4s" 
            />

            <TotalRatio 
              title="نسبة الرضا" 
              value={`${stats.satisfactionRate}%`} 
              className="success-value"
            />
          </div>

          
        </div>


      </div>

      <div className='weeklyCont'>
        
          <Titles title='النمو الأسبوعي' />

          {weeklyData.map((item) => (
    <GrowthRow
        key={item.id}
        day={item.DayAR} // Check if this is "DayAR" or "dayar"
        users={item.UsersCount}
        usersPct={item.UsersPct}
        orders={item.OrdersCount}
        ordersPct={item.OrdersPct}
        interact={item.InteractCount}
        interactPct={item.InteractPct}
    />
          ))}

      </div>















    </section>

  </main>

</section>

    
    </>  );
}
 
export default Home;
