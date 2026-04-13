import React, { useState, useEffect } from 'react';
import { supabase } from "../Supabase";

import './AddPlant.css';

import Nav from '../Components/Nav';
import SideBar from '../Components/SideBar';
import PageTitle from '../Components/PageTitle';
import MainButton from '../Components/MainButton';
import SecondaryButton from '../Components/SecondaryButton';
import Titles from '../Components/Titles';
import ShortTextInput from '../Components/ShortTextInput';
import RichText from './../Components/RichText';
import DropDown from './../Components/DropDown';
import CheckList from './../Components/CheckList';
import Footer from '../Components/Footer';

import SaveIcon from '../Assets/saveIcon.svg'
import EyeIcon from '../Assets/eyeIcon.svg'
import UploadIcon from '../Assets/uploadIcon.svg'
import QrCodeIcon from '../Assets/qrCodeIcon.svg'
import AddIcon from '../Assets/addIcon.svg'
import StepCard from './../Components/StepCard';
import UploadCard from '../Components/UploadCard';




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

    const [plantData, setPlantData] = useState({
        name: '',
        lightingId: null,
        purposeIds: [], // This will store the array of IDs from the checklist
    });

    const handlePurposeChange = (selectedIds) => {
        setPlantData({ ...plantData, purposeIds: selectedIds });
        console.log("Current selected purposes:", selectedIds);
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
                       
                        <div className='wideCard'>

                                <Titles title='المواصفات والخصائص' />

                                <div className='editoeCol'>

                                    <div className='inputRow'>
                                      <ShortTextInput title="الاسم العلمي" placeholder="الاسم العلمي" />
                                      <ShortTextInput title="السعر (جنيه مصري)" placeholder="السعر (جنيه مصري)" />
                                    </div>

                                    <div className='inputRow'>
                                      <DropDown title="الفئة"  parentId={15}  onChange={(val) => console.log("Selected Care:", val)} />
                                      <DropDown  title="مستوى الصعوبة"  parentId={5}  onChange={(val) => console.log("Selected Lighting:", val)} />
                                    </div>

                                    <div className='inputRow'>
                                      <DropDown title="المساحة"  parentId={9}  onChange={(val) => console.log("Selected Care:", val)} />
                                      <DropDown title="البيئة"  parentId={12}  onChange={(val) => console.log("Selected Care:", val)} />
                                    </div>

                                    <div className='inputRow'>
                                      <ShortTextInput title="الارتفاع الأدنى" placeholder="الارتفاع الأدنى" />
                                      <ShortTextInput title="الارتفاع الأقصى" placeholder="الارتفاع الأقصى" />
                                    </div>

                                      <CheckList title="الهدف من النبتة" parentId={11} onChange={(val) => console.log("Goals selected:", val)} />
                                      <CheckList  title="أفضل مكان للموضع"  parentId={13}  onChange={(selectedRooms) => setPlantData({ ...plantData, roomIds: selectedRooms })} />




                                </div>

                        </div>

                        <div className='wideCard'>

                                <Titles title='متطلبات الإضاءة' />
                                
                                <div className='editoeCol'>

                                    <div className='inputRow'>
                                      <DropDown title="نوع الإضاءة"  parentId={49}  onChange={(val) => console.log("Selected Care:", val)} />
                                      <DropDown title="شدة الإضاءة"  parentId={4}  onChange={(val) => console.log("Selected Care:", val)} />
                                      <ShortTextInput title="ساعات الإضاءة يوميًا" placeholder="اكتب عدد الساعات" />
                                      
                                    </div>

                                </div>
                        </div>

                        <div className='wideCard'>

                                <Titles title='السقي والتسميد' />
                                
                                <div className='editoeCol'>

                                    <div className='inputRow'>
                                      <DropDown title="معدل السقي"  parentId={52}  onChange={(val) => console.log("Selected Care:", val)} />
                                      <DropDown title="نوع السماد"  parentId={56}  onChange={(val) => console.log("Selected Care:", val)} />                                      
                                    </div>

                                    <div className='inputRow'>
                                      <DropDown title="معدل التسميد"  parentId={52}  onChange={(val) => console.log("Selected Care:", val)} />
                                      <DropDown title="موسم التسميد"  parentId={63}  onChange={(val) => console.log("Selected Care:", val)} />                                      
                                    </div>

                                </div>
                        </div>

                        <div className='wideCard'>

                                <Titles title='التنظيف' />
                                
                                <div className='editoeCol'>

                                      <DropDown title="معدل التنظيف"  parentId={52}  onChange={(val) => console.log("Selected Care:", val)} />
                                      <RichText title="طريقة التنظيف" placeholder="اكتب طريقة التنظيف " isRich={true} />

                                </div>
                        </div>

                        <div className='wideCard'>

                                <Titles title='النموذج ثلاثي الأبعاد والواقع المعزز' />
                                
                                <div className='editoeCol'>

                                    <div className='textButtonRow'>
                                       <ShortTextInput title="رابط النموذج ثلاثي الأبعاد (.glb أو .gltf)" placeholder="3D model link" />
                                       <SecondaryButton label="رفع" src={UploadIcon} />
                                    </div>

                                    <div className='textButtonRow'>
                                       <ShortTextInput title="رمز QR للواقع المعزز" placeholder="AR link" />
                                       <SecondaryButton label="توليد QR" src={QrCodeIcon} />
                                    </div>

                                </div>

                        </div>

                        <div className='wideCard'>

                                <div className='buttonTitleRow'>
                                   <Titles title='خطوات الزراعة' />

                                    <MainButton label="إضافة خطوة " src={AddIcon} onClick={handleOpenModal} disabled={loading} />
                                </div>
                                
                                <div className='editoeCol'>
                                    <StepCard title="خطوة 1" />
                                    <StepCard title="خطوة 2" />
                                    <StepCard title="خطوة 3" />
                                </div>
                        </div>

                        <div className='wideCard'>
                                <Titles title='صور النبات' />
                                
                                <div className='editoeCol'>
                                    <UploadCard />
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