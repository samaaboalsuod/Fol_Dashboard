import React, { useState, useEffect } from 'react'; // Removed unused 'Component'
import { supabase } from "../Supabase";
import { formatDistanceToNow, isValid } from 'date-fns'; // Added isValid check
import { ar } from 'date-fns/locale';

import './Home.css';
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
import TotalRatio from '../Components/TotalRatio';
import GrowthRow from '../Components/GrowthRow';
import RecentCard from '../Components/RecentCard';

import MoneyIcon from '../Assets/moneyIcon.svg';
import QuestionIcon from '../Assets/questionIcon.svg';
import FolIcon from '../Assets/folIcon.svg';
import ChattIcon from '../Assets/chatIcon.svg';
import ClockIcon from '../Assets/clockIcon.svg';

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
    const [recentActivity, setRecentActivity] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // 1. Fetch Page Title
                const { data: titleData } = await supabase
                    .from('PageTitle').select('Title, Description').eq('id', 1).single();

                if (titleData) {
                    setPageData({ title: titleData.Title, subTitle: titleData.Description });
                }

                // 2. Fetch All Dashboard Data in Parallel
                // Note: Ensure table names in quotes match your exact Supabase casing
                const [plantsRes, productsRes, totalRes, pendingRes, ratingRes, growthRes, activityRes] = await Promise.all([
                    supabase.from('Plant').select('NameAR, Price, TotalSales'),
                    supabase.from('Products').select('NameAR, Price, TotalSales'),
                    supabase.from('Expert_Requests').select('*', { count: 'exact', head: true }),
                    supabase.from('Expert_Requests').select('*', { count: 'exact', head: true }).eq('StatusAR', 'قيد الانتظار'),
                    supabase.from('Expert_Requests').select('Rating').not('Rating', 'is', null),
                    supabase.from('Weekly_Growth').select('*').order('id', { ascending: true }),
                    supabase.from('Recent_Activity').select('*').order('created_at', { ascending: false }).limit(3)
                ]);

                // 3. Process DashCards (Make sure this exists in your DB or state)
                const { data: cardData } = await supabase.from('DashCards').select('*').order('id', { ascending: true });
                if (cardData) {
                    setCards(cardData.slice(0, 4));
                    setSmallCards(cardData.slice(4, 10));
                    setNoFillCards(cardData.slice(10, 14));
                }

                // Process Best Sellers
                const allItems = [
                    ...(plantsRes.data || []).map(item => ({ title: item.NameAR, price: item.Price, pieces: item.TotalSales })),
                    ...(productsRes.data || []).map(item => ({ title: item.NameAR, price: item.Price, pieces: item.TotalSales }))
                ];
                setBestSellers(allItems.filter(i => i.pieces !== null).sort((a, b) => b.pieces - a.pieces).slice(0, 3));

                // Process Stats
                const avgRating = ratingRes.data?.length ? (ratingRes.data.reduce((acc, curr) => acc + curr.Rating, 0) / ratingRes.data.length) : 0;
                setStats({
                    totalQuestions: totalRes.count || 0,
                    pendingRequests: pendingRes.count || 0,
                    satisfactionRate: Math.round((avgRating / 5) * 100),
                    aiQueries: 156
                });

                // Set Growth & Activity Data
                if (growthRes.data) setWeeklyData(growthRes.data);
                if (activityRes.data) setRecentActivity(activityRes.data);

            } catch (error) {
                console.error('Dashboard Load Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Date formatter helper to prevent crashes
    const getRelativeTime = (dateString) => {
        const date = new Date(dateString);
        if (!dateString || !isValid(date)) return 'غير متوفر';
        return formatDistanceToNow(date, { addSuffix: true, locale: ar });
    };

    if (loading) return <div className="loading-screen">جاري التحميل...</div>;

    return (
        <>
            <section className="dashboard-wrapper">
                <aside>
                    <SideBar activeTitle="لوحة التحكم" />
                </aside>

                <main className="main-content">
                    <header>
                        <Nav />
                    </header>

                    <section className="dashboardBody">
                        <div className='topSec'>
                            <PageTitle title={pageData.title} subTitle={pageData.subTitle} />
                            <div className='filterCont'>
                                <TimeFilter 
                                    activeFilter={activeTime} 
                                    onFilterChange={setActiveTime} 
                                />
                            </div>
                        </div>

                        {/* BIG CARDS */}
                        <div className='bigCardsRow'>
                            {cards && cards.map((card) => (
                                <StatisticsBigCard 
                                    key={card.id}
                                    title={card.Title}
                                    value={card.Value}
                                    subTitle={card.SubTitle}
                                    src={card.icon}
                                    alt={card.alt}
                                />
                            ))}
                        </div>

                        {/* SMALL CARDS */}
                        <div className='bigCardsRow'>
                            {smallCards && smallCards.map((card) => (
                                <SmallIconCard
                                    key={card.id}
                                    title={card.Title}
                                    value={card.Value}
                                    subTitle={card.SubTitle}
                                    src={card.icon}
                                    alt={card.alt}
                                />
                            ))}
                        </div>

                        <div className='part3'>
                            {/* SALES SECTION */}
                            <div className='bestCardCont'>
                                <Titles src={MoneyIcon} title='نظرة عامة على المبيعات' />
                                <div className='numbContRow'>
                                    {noFillCards && noFillCards.map((card) => (
                                        <NumbersNofill 
                                            key={card.id}
                                            title={card.Title}
                                            value={card.Value} 
                                        />
                                    ))}
                                </div>
                                <h4>أفضل المنتجات مبيعًا</h4>
                                <div className='bestCont'>
                                    {bestSellers && bestSellers.map((item, index) => (
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

                            {/* QUESTIONS SECTION */}
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
                                    <TotalRatio title="إجمالي الأسئلة" value={stats.totalQuestions.toLocaleString()} />
                                    <TotalRatio title="متوسط وقت الرد" value="2.4s" />
                                    <TotalRatio 
                                        title="نسبة الرضا" 
                                        value={`${stats.satisfactionRate}%`} 
                                        className="success-value"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* WEEKLY GROWTH SECTION */}
                        <div className='weeklyCont'>
                            <Titles title='النمو الأسبوعي' />
                            {weeklyData && weeklyData.length > 0 ? weeklyData.map((item) => (
                                <GrowthRow
                                    key={item.id}
                                    day={item.DayAR}
                                    users={item.UsersCount}
                                    usersPct={item.UsersPct}
                                    orders={item.OrdersCount}
                                    ordersPct={item.OrdersPct}
                                    interact={item.InteractCount}
                                    interactPct={item.InteractPct}
                                />
                            )) : <p>لا توجد بيانات نمو</p>}
                        </div>

                        {/* RECENT ACTIVITY SECTION */}
                        <div className='part4'>
                            <div className='recentCont'>
                                <Titles src={ClockIcon} title='النشاط الأخير' />
                                {recentActivity && recentActivity.length > 0 ? recentActivity.map((item) => (
                                    <RecentCard 
                                        key={item.id}
                                        title={item.target_name} 
                                        action={item.action_type}
                                        employee={item.performed_by}
                                        when={getRelativeTime(item.created_at)}
                                    />
                                )) : <p>لا يوجد نشاط أخير</p>}
                            </div>
                        </div>
                    </section>
                </main>
            </section>
        </>
    );
}

export default Home;