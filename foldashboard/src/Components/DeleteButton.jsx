import React from 'react';
import './DeleteButton.css';
import DeleteIcon from '../Assets/deleteIcon.svg'; // Path to your trash icon

const DeleteButton = ({ onClick }) => {
    return (
        <button className="deleteButton" onClick={onClick}>
            <img src={DeleteIcon} alt="حذف" className="deleteIcon" />
            <span className="deleteText">حذف</span>
        </button>
    );
};

export default DeleteButton;