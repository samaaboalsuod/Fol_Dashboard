import React, { Component } from 'react';
import { supabase } from '../Supabase';
import './PlantCard.css';

import DetailRow from './DetailRow';
import MainButton from './MainButton';
import DeleteButton from '../Components/DeleteButton';

import EditIcon from '../Assets/editIcon.svg'

const PlantCard = ({ plant, onDelete }) => {
    if (!plant) return null;

    const handleOpenModal = () => {
        console.log("Opening Add Plant Modal...");
        // Later, you will add logic here to show your pop-up form
        alert("سيتم فتح نافذة إضافة نبات جديد قريباً!"); 
    };

    const handleDelete = async () => {
        if (window.confirm(`هل أنت متأكد أنك تريد حذف ${plant.NameAR}؟`)) {
            try {
                const { error } = await supabase
                    .from('Plant')
                    .delete()
                    .eq('id', plant.id);

                if (error) {
                    alert("حدث خطأ أثناء الحذف: " + error.message);
                } else {
                    if (onDelete) onDelete(plant.id);
                }
            } catch (err) {
                console.error("Unexpected delete error:", err);
                alert("حدث خطأ غير متوقع!");
            }
        }
    };

    const getStatusStyles = (status) => {
    if (status === 'منشور') return 'green-text2 bg-green';
    if (status === 'مسودة') return 'orange-text2 bg-orange';
    return 'red-text2 bg-red';
};

    return ( <>
    
    <div className='plantCard'>

    <div className="cardImageContainer">

        <span className={`statusBadge ${getStatusStyles(plant.Status)}`}>
                    {plant.Status}
        </span>

        <img src={plant.Cover_Photo} alt={plant.alt} />
        

    </div>

    <div className='plantDataCol'>

        <div className='plantNaming'>
            <h4> {plant.NameAR} </h4>
            <p> {plant.NameEN} </p>
        </div>

        <div className='plantNaming'>
            <DetailRow label="الفئة" value={plant.Category} />
                <DetailRow 
                    label="الصعوبة" 
                    value={plant.Difficulty} 
                    colorClass={
                        plant.Difficulty === 'سهل' ? 'green-text' : 
                        plant.Difficulty === 'صعب' ? 'red-text' : 'orange-text'
                    } 
                />
                <DetailRow label="الإضاءة" value={plant.Lighting} />
                <DetailRow label="السقي" value={plant.Watering} />
                <DetailRow label="الارتفاع" value={plant.Height} />
                <DetailRow label="السعر" value={`${plant.Price} جنيه`} />
        </div>

        <div className='buttonRow'>

            <MainButton label="تعديل" src={EditIcon} onClick={handleOpenModal} />

            <DeleteButton onClick={handleDelete} />

        </div>


    </div>

    </div>
    
       
    
    </> );
}
 
export default PlantCard;