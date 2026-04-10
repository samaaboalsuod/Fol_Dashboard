import React, { useState, useEffect } from 'react';
import { supabase } from "../Supabase";

import './Plants.css';

import Nav from '../Components/Nav';
import SideBar from '../Components/SideBar';
import PageTitle from '../Components/PageTitle';
import MainButton from '../Components/MainButton';
import SearchBar from '../Components/SearchBar';
import SecondaryButton from '../Components/SecondaryButton';

import AddIcon from '../Assets/addIcon.svg'
import FilterIcon from '../Assets/filterIcon.svg'
import PlantCard from '../Components/PlantCard';
import StatCard from '../Components/StatCard';
import Footer from '../Components/Footer';





const Plants = () => {


    const [pageData, setPageData] = useState({ title: '', subTitle: '' });
    const [loading, setLoading] = useState(true);
    const [plants, setPlants] = useState([]);
    const [stats, setStats] = useState({
      total: 0,
      published: 0,
      rare: 0,
      petSafe: 0,
      indoor: 0,
      airPurifying: 0
    });

useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);

            // 1. Fetch Page Header
            const { data: titleData, error: titleError } = await supabase
                .from('PageTitle')
                .select('Title, Description')
                .eq('id', 2) 
                .single();

            if (titleError) console.error('Header Error:', titleError.message);

            // 2. Fetch All Plants
            const { data: plantsData, error: plantsError } = await supabase
                .from('Plant')
                .select('*')
                .order('id', { ascending: true });

            if (plantsError) console.error('Plants Fetch Error:', plantsError.message);

            // 3. Process Page Title Data
            if (titleData) {
                setPageData({ 
                    title: titleData.Title, 
                    subTitle: titleData.Description 
                });
            } else {
                setPageData({ title: 'إدارة النباتات', subTitle: 'إحصاء قاعدة بيانات شاملة للنباتات' });
            }

            // 4. Calculate Stats and Set Plants
            if (plantsData) {
                setPlants(plantsData);

                // This logic calculates the numbers for your StatCards
                setStats({
                  total: plantsData.length,
                  published: plantsData.filter(p => p.Status === 'منشور').length,
                  rare: plantsData.filter(p => p.IsRare === true).length,
                  petSafe: plantsData.filter(p => p.PetSafe === true).length,
                  indoor: plantsData.filter(p => p.Category === 'نباتات داخلية' || p.Category === 'صباريات').length,
                  airPurifying: plantsData.filter(p => p.AirPurifying === true).length
                });
            }

        } catch (err) {
            console.error('Unexpected Fetch Error:', err);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
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

                <div className='searchFilter'>
                    <SearchBar placeholder="البحث بالاسم العربي، الإنجليزي، أو الاسم العلمي..." />
                    <SecondaryButton label="فلاتر متقدمة" src={FilterIcon} />
                </div>

                <div className='plantsGrid'>
                    {plants.map((plant) => (
                       <PlantCard key={plant.id} plant={plant} />
                     ))}
                </div>

                <div className="stats-container">
                  <StatCard value={stats.total} label="إجمالي النباتات" />
                  <StatCard value={stats.published} label="منشورة" />
                  <StatCard value={stats.rare} label="النباتات النادرة" />
                  <StatCard value={stats.petSafe} label="آمنة للحيوانات" />
                  <StatCard value={stats.indoor} label="نباتات داخلية" />
                  <StatCard value={stats.airPurifying} label="منقية للهواء" />
                </div>

                <Footer />


            </section>

        </main>

    </section>
    
    </> );
}
 
export default Plants;