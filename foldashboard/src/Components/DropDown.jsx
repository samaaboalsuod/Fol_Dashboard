import React, { useState, useEffect } from 'react';
import { supabase } from "../Supabase";
import './DropDown.css';

const DropDown = ({ title, parentId, onChange }) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getOptions = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('Categories')
                .select('id, NameAR')
                .eq('Parent_id', parentId)
                .eq('CategoryType', 'Option');

            if (!error && data) {
                setOptions(data);
            }
            setLoading(false);
        };

        getOptions();
    }, [parentId]);

    return (
        <div className='dropDoenCont'>
            <h5>{title}</h5>
            <select 
                className="fol-select-input"
                onChange={(e) => onChange(e.target.value)}
                disabled={loading}
            >
                <option value="">{loading ? 'جاري التحميل...' : 'اختر من القائمة'}</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.NameAR}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DropDown;