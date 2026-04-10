import React, { Component } from 'react';
import './PlantCard.css';

import DetailRow from './DetailRow';
import MainButton from './MainButton';
import DeleteButton from '../Components/DeleteButton';

import EditIcon from '../Assets/editIcon.svg'

const PlantCard = ({ plant }) => {
    if (!plant) return null;

    const handleOpenModal = () => {
        console.log("Opening Add Plant Modal...");
        // Later, you will add logic here to show your pop-up form
        alert("سيتم فتح نافذة إضافة نبات جديد قريباً!"); 
    };

    const handleDelete = () => {
        console.log(`Deleting plant: ${plant.NameAR}`);
        // You can add your Supabase delete logic here later
    };

    return ( <>
    
    <div className='plantCard'>

    <div className="cardImageContainer">

        <img src={plant.Cover_Photo} alt={plant.alt} />
        
        <span className="statusBadge">{plant.Status}</span>

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