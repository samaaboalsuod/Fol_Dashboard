import React, { Component } from 'react';
import './StepCard.css'
import '../Pages/AddPlant.css'

import Titles from './Titles';
import DeleteButton from './DeleteButton';
import ShortTextInput from './ShortTextInput';
import RichText from './RichText';

import UploadIcon from '../Assets/uploadIcon.svg'
import SecondaryButton from './SecondaryButton';


const StepCard = ({ steps, ...props }) => {

        const handleDelete = () => {
        console.log(`Deleting plant: ${steps.NameAR}`);
        // You can add your Supabase delete logic here later
    };
    return ( 
        <div className='stepCard'>

            <div className='inputRow'>
               <Titles title={props.title} />
               <DeleteButton onClick={handleDelete} />
            </div>

            <ShortTextInput title="اسم الخطوة" placeholder="اسم الخطوة" />
            <RichText title="التعليمات" placeholder="اكتب تعليمات الخطوة..." isRich={true} />

            <div className='textButtonRow'>

                <div className='textButtonRow'>
                  <ShortTextInput title="صورة توضيحية" placeholder="رابط الصورة" />
                  <SecondaryButton label="رفع" src={UploadIcon} />
                </div>

                <div className='textButtonRow'>
                  <ShortTextInput title="فيديو تعليمي" placeholder="رابط الفيديو" />
                  <SecondaryButton label="رفع" src={UploadIcon} />
                </div>

            </div>




        </div>
     );
}
 
export default StepCard;