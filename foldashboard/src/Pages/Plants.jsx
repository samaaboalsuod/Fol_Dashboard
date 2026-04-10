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





const Plants = () => {


    const [pageData, setPageData] = useState({ title: '', subTitle: '' });
    const [loading, setLoading] = useState(true);
    const [plants, setPlants] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);

            // 1. Fetch Page Header (Title and Description)
            const { data: titleData, error: titleError } = await supabase
                .from('PageTitle')
                .select('Title, Description')
                .eq('id', 2) 
                .single();

            if (titleError) console.error('Header Error:', titleError.message);

            // 2. Fetch All Plants (Including the new care columns)
            // We select '*' to get NameAR, NameEN, Cover_Photo, Category, Difficulty, etc.
            const { data: plantsData, error: plantsError } = await supabase
                .from('Plant')
                .select('*')
                .order('id', { ascending: true }); // Keeps them in order 1-12

            if (plantsError) {
                console.error('Plants Fetch Error:', plantsError.message);
            }

            // 3. Update States
            if (titleData) {
                setPageData({ 
                    title: titleData.Title, 
                    subTitle: titleData.Description 
                });
            } else {
                setPageData({ title: 'إدارة النباتات', subTitle: 'إحصاء قاعدة بيانات شاملة للنباتات' });
            }

            if (plantsData) {
                setPlants(plantsData); // This fills your grid with the 12 cards
            }

        } catch (err) {
            console.error('Unexpected Fetch Error:', err);
        } finally {
            setLoading(false); // Stop loading once both queries finish
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





            </section>

        </main>

    </section>
    
    </> );
}
 
export default Plants;