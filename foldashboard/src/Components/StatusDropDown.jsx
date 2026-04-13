import React from 'react';
import './StatusDropDown.css'; // We will use the same styling as your other inputs
import Titles from './Titles';

const StatusDropDown = ({ value, onChange }) => {
    // Fixed options for the Status
    const statusOptions = [
        { id: 'published', label: 'منشور' },
        { id: 'draft', label: 'مسودة' },
        { id: 'archived', label: 'مؤرشف' }
    ];

    return (
        <div className="status-container">
            {/* <h5 className="status-title">الحالة والنشر</h5> */}
            <Titles title='الحالة والنشر' />
            
            <div className="status-wrapper">
                <select 
                    className="status-select" 
                    value={value} 
                    onChange={(e) => onChange(e.target.value)}
                >
                    {statusOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {/* Your custom arrow icon (SVG or font) */}
                <span className="dropdown-arrow"></span> 
            </div>
        </div>
    );
};

export default StatusDropDown;