import React, { useState, useEffect } from 'react';
import { supabase } from "../Supabase";

import './AddPlant.css';

import Nav from '../Components/Nav';
import SideBar from '../Components/SideBar';
import PageTitle from '../Components/PageTitle';
import MainButton from '../Components/MainButton';
import SecondaryButton from '../Components/SecondaryButton';
import Footer from '../Components/Footer';

import SaveIcon from '../Assets/saveIcon.svg'
import EyeIcon from '../Assets/eyeIcon.svg'
import Titles from '../Components/Titles';
import ShortTextInput from '../Components/ShortTextInput';
import RichText from './../Components/RichText';


const AddPlant = () => {

    const [pageData, setPageData] = useState({ title: '', subTitle: '' });
    const [loading, setLoading] = useState(true);

useEffect(() => {
    // Define the function inside the effect
    const fetchData = async () => {
        try {
            setLoading(true);

            // 1. Fetch Page Header
            const { data: titleData, error: titleError } = await supabase
                .from('PageTitle')
                .select('Title, Description')
                .eq('id', 3) 
                .single();

            if (titleError) console.error('Header Error:', titleError.message);

            if (titleData) {
                setPageData({ 
                    title: titleData.Title, 
                    subTitle: titleData.Description 
                });
            } else {
                setPageData({ title: 'إدارة النباتات', subTitle: 'إحصاء قاعدة بيانات شاملة للنباتات' });
            }

         

            // Add your other fetch logic here (Plants, Stats, etc.)


        } catch (err) {
            console.error('Unexpected Fetch Error:', err);
        } finally {
            setLoading(false); // Ensures loading stops even if there is an error
        }
    }; // Close fetchData function

    fetchData(); // Execute the function
}, []); // Close useEffect

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

                    <div className='titleButtonRow'>

                        <SecondaryButton label="معاينة" src={EyeIcon} />
                        <MainButton label="حفظ" src={SaveIcon} onClick={handleOpenModal} />

                    </div>



                </div>

                <div className='mainSplit'>

                    <div className='wideSec'>

                        <div className='wideCard'>

                                <Titles title='المعلومات الأساسية' />

                                <div className='editoeCol'>
                                    <ShortTextInput title="اسم النبات" placeholder="اكتب اسم النبات" />
                                    <RichText title="وصف النبات " placeholder="اكتب وصف النبات" isRich={true} />
                                    <RichText title="الفوائد والاستخدامات" placeholder="اكتب فوائد واستخدامات النبات" isRich={true} />
                                    <RichText title="تعليمات العناية" placeholder="اكتب تعليمات العناية" isRich={true} />
                                </div>

                        </div>

                        <div className='wideCard'>

                                <Titles title='ضبط محركات البحث  SEO optimization' />

                                <div className='editoeCol'>
                                    <ShortTextInput title="اسم الصفحة  Slug Name  " placeholder="slug" />
                                    <ShortTextInput title="عنوان الصفحة  Title   " placeholder="title" />
                                    <RichText title="Meta Description" placeholder="اكتب تعليمات العناية" isRich={false} />
                                </div>

                        </div>

                    </div>

                    <div className='narrowSec'></div>

                </div>

            </section>

        </main>



    </section>
    
    </> );
}
 
export default AddPlant;