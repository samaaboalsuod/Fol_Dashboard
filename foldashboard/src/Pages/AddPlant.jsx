import React, { useState, useEffect } from 'react';
import { supabase } from "../Supabase";

import './AddPlant.css';

import DashboardLayout from '../Components/DashboardLayout';
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
import StatusDropDown from './../Components/StatusDropDown';
import DeleteButton from '../Components/DeleteButton';




const AddPlant = ({ plant }) => {

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
        alert("سيتم فتح النافذة قريباً!"); 
    };

    const handleSave = async () => {
        console.log("Plant Data ready to be saved:", plantData);

        try {
            setLoading(true);

            // 1. Fetch the maximum ID currently in the table to fix the sequence issue
            const { data: maxIdData, error: idError } = await supabase
                .from('Plant')
                .select('id')
                .order('id', { ascending: false })
                .limit(1);

            let nextId = 1;
            if (maxIdData && maxIdData.length > 0) {
                nextId = maxIdData[0].id + 1;
            }

            // Prepare data matching ONLY the Supabase columns
            const insertData = {
                id: nextId, // Explicitly pass the ID
                NameAR: plantData.NameAR || null,
                NameEN: plantData.NameEN || null,
                DescriptionAR: plantData.DescriptionAR || null,
                DescriptionEN: plantData.DescriptionEN || null,
                Cover_Photo: plantData.Cover_Photo || null,
                alt: plantData.alt || null,
                Price: plantData.Price === '' ? null : Number(plantData.Price),
                Category: plantData.Category || null,
                Difficulty: plantData.Difficulty || null,
                Lighting: plantData.Lighting || null,
                Watering: plantData.Watering || null,
                Height: plantData.Height || null,
                Status: plantData.Status || 'مسودة',
                '3DModel': plantData['3DModel'] || null,
                Common_Names: plantData.Common_Names || null,
                Care_Clean_Details: plantData.Care_Clean_Details || null,
                
                // Safe defaults for other known columns
                TotalSales: 0, 
                IsRare: false,
                PetSafe: false,
                AirPurifying: false
            };

            const { data, error } = await supabase
                .from('Plant')
                .insert([insertData]);

            if (error) {
                console.error("Error inserting plant:", error);
                alert("حدث خطأ أثناء إضافة النبات: " + error.message);
            } else {
                alert("تم إضافة النبات بنجاح إلى جدول Plant!");
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            alert("حدث خطأ غير متوقع!");
        } finally {
            setLoading(false);
        }
    };

    const [plantData, setPlantData] = useState({
        NameAR: '',
        NameEN: '',
        DescriptionAR: '',
        DescriptionEN: '',
        Cover_Photo: '',
        alt: '',
        Price: '',
        Category: '',
        Difficulty: '',
        Lighting: '',
        Watering: '',
        Height: '',
        Status: 'مسودة',
        '3DModel': '',
        Common_Names: '',
        Care_Clean_Details: '',
        purposeIds: [],
        roomIds: []
    });

    const handlePurposeChange = (selectedIds) => {
        setPlantData({ ...plantData, purposeIds: selectedIds });
        console.log("Current selected purposes:", selectedIds);
    };

    const handleDelete = () => {
        console.log(`Deleting plant: ${plant.NameAR}`);
        // You can add your Supabase delete logic here later
    };


    return (
        <DashboardLayout activeTitle="النباتات">
            <div className='topSec'>

                    <PageTitle title={pageData.title} subTitle={pageData.subTitle} />

                    <div className='titleButtonRow'>

                        <SecondaryButton label="معاينة" src={EyeIcon} />
                        <MainButton label="حفظ" src={SaveIcon} onClick={handleSave} disabled={loading} />

                    </div>



                </div>

                <div className='mainSplit'>

                    <div className='wideSec'>

                        <div className='wideCard'>

                                <Titles title='المعلومات الأساسية' />

                                <div className='editoeCol'>
                                    <ShortTextInput title="اسم النبات" placeholder="اكتب اسم النبات" value={plantData.NameAR} onChange={(e) => setPlantData({ ...plantData, NameAR: e.target.value })} />
                                    <RichText title="وصف النبات " placeholder="اكتب وصف النبات" isRich={true} value={plantData.DescriptionAR} onChange={(val) => setPlantData({ ...plantData, DescriptionAR: val })} />
                                    <RichText title="الفوائد والاستخدامات" placeholder="اكتب فوائد واستخدامات النبات" isRich={true} />
                                    <RichText title="تعليمات العناية" placeholder="اكتب تعليمات العناية" isRich={true} />
                                </div>

                        </div>

                        <div className='wideCard'>

                                <Titles title='ضبط محركات البحث  SEO optimization' />

                                <div className='editoeCol'>
                                    <ShortTextInput title="اسم الصفحة  Slug Name  " placeholder="slug" value={plantData.NameEN} onChange={(e) => setPlantData({ ...plantData, NameEN: e.target.value })} />
                                    <ShortTextInput title="عنوان الصفحة  Title   " placeholder="title" />
                                    <RichText title="Meta Description" placeholder="اكتب تعليمات العناية" isRich={false} value={plantData.DescriptionEN} onChange={(e) => setPlantData({ ...plantData, DescriptionEN: e.target.value })} />
                                </div>

                        </div>
                       
                        <div className='wideCard'>

                                <Titles title='المواصفات والخصائص' />

                                <div className='editoeCol'>

                                    <div className='inputRow'>
                                      <ShortTextInput title="الاسم العلمي" placeholder="الاسم العلمي" value={plantData.Common_Names} onChange={(e) => setPlantData({ ...plantData, Common_Names: e.target.value })} />
                                      <ShortTextInput title="السعر (جنيه مصري)" placeholder="السعر (جنيه مصري)" value={plantData.Price} onChange={(e) => setPlantData({ ...plantData, Price: e.target.value })} />
                                    </div>

                                    <div className='inputRow'>
                                      <DropDown title="الفئة"  parentId={15} value={plantData.Category} onChange={(val, text) => setPlantData({ ...plantData, Category: text })} />
                                      <DropDown  title="مستوى الصعوبة"  parentId={5} value={plantData.Difficulty} onChange={(val, text) => setPlantData({ ...plantData, Difficulty: text })} />
                                    </div>

                                    <div className='inputRow'>
                                      <DropDown title="المساحة"  parentId={9}  onChange={(val) => console.log("Selected Care:", val)} />
                                      <DropDown title="البيئة"  parentId={12}  onChange={(val) => console.log("Selected Care:", val)} />
                                    </div>

                                    <div className='inputRow'>
                                      <ShortTextInput title="الارتفاع" placeholder="مثال: 30 - 120 سم" value={plantData.Height} onChange={(e) => setPlantData({ ...plantData, Height: e.target.value })} />
                                    </div>

                                      <CheckList title="الهدف من النبتة" parentId={11} onChange={(val) => console.log("Goals selected:", val)} />
                                      <CheckList  title="أفضل مكان للموضع"  parentId={13}  onChange={(selectedRooms) => setPlantData({ ...plantData, roomIds: selectedRooms })} />




                                </div>

                        </div>

                        <div className='wideCard'>

                                <Titles title='متطلبات الإضاءة' />
                                
                                <div className='editoeCol'>

                                    <div className='inputRow'>
                                      <DropDown title="نوع الإضاءة"  parentId={49} value={plantData.Lighting} onChange={(val, text) => setPlantData({ ...plantData, Lighting: text })} />
                                      <DropDown title="شدة الإضاءة"  parentId={4}  onChange={(val) => console.log("Selected Care:", val)} />
                                      <ShortTextInput title="ساعات الإضاءة يوميًا" placeholder="اكتب عدد الساعات" />
                                      
                                    </div>

                                </div>
                        </div>

                        <div className='wideCard'>

                                <Titles title='السقي والتسميد' />
                                
                                <div className='editoeCol'>

                                    <div className='inputRow'>
                                      <DropDown title="معدل السقي"  parentId={52} value={plantData.Watering} onChange={(val, text) => setPlantData({ ...plantData, Watering: text })} />
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
                                      <RichText title="طريقة التنظيف" placeholder="اكتب طريقة التنظيف " isRich={true} value={plantData.Care_Clean_Details} onChange={(val) => setPlantData({ ...plantData, Care_Clean_Details: val })} />

                                </div>
                        </div>

                        <div className='wideCard'>

                                <Titles title='النموذج ثلاثي الأبعاد والواقع المعزز' />
                                
                                <div className='editoeCol'>

                                    <div className='textButtonRow'>
                                       <ShortTextInput title="رابط النموذج ثلاثي الأبعاد (.glb أو .gltf)" placeholder="3D model link" value={plantData['3DModel']} onChange={(e) => setPlantData({ ...plantData, '3DModel': e.target.value })} />
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

                    <div className='narrowSec'>
                        <StatusDropDown value={plantData.Status}  onChange={(newStatus) => setPlantData({ ...plantData, Status: newStatus })} />
                        <DeleteButton onClick={handleDelete} />

                    </div>

                </div>

            <Footer />
        </DashboardLayout>
    );
}
 
export default AddPlant;