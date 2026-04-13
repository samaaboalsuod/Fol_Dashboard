import React, { Component } from 'react';
import './UploadCard.css'

import UploadIcon from '../Assets/uploadIcon.svg'


const UploadCard = () => {
    return ( 
        <div className='uploadCard'>
            <img src={UploadIcon} alt="" />
            <h3>انقر أو اسحب الصور هنا</h3>
            <p>PNG, JPG حتى 10MB</p>
        </div>
     );
}
 
export default UploadCard;