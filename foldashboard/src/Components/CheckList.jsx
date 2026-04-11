import React, { useState, useEffect } from 'react';
import { supabase } from "../Supabase";
import './CheckList.css';

const CheckList = ({ title, parentId, onChange }) => {
    const [options, setOptions] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            const { data } = await supabase
                .from('Categories')
                .select('id, NameAR')
                .eq('Parent_id', parentId);
            if (data) setOptions(data);
        };
        fetchOptions();
    }, [parentId]);

    const handleCheck = (id) => {
        const updated = selectedIds.includes(id)
            ? selectedIds.filter(itemId => itemId !== id)
            : [...selectedIds, id];
        
        setSelectedIds(updated);
        onChange(updated); 
    };

    return (
        <div className="checklist-container">
            <h5 className="checklist-title">{title}</h5>
            <div className="checklist-wrapper">
                {options.map((opt) => (
                    <label key={opt.id} className="checklist-item">
                        {/* We put the text first, then the checkbox for RTL */}
                        <span className="checklist-text">{opt.NameAR}</span>
                        <input 
                            type="checkbox" 
                            className="custom-checkbox"
                            checked={selectedIds.includes(opt.id)}
                            onChange={() => handleCheck(opt.id)}
                        />
                    </label>
                ))}
            </div>
        </div>
    );
}

export default CheckList;