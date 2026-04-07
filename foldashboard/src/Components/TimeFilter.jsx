import React from 'react';
import FilterButton from './FilterButton';

const TimeFilter = ({ activeFilter, onFilterChange }) => { // Props from Parent
    return ( 
        <div className="filter-group" style={{ display: 'flex', gap: '10px', direction: 'rtl' }}>
          <FilterButton 
            label="اليوم" 
            isActive={activeFilter === 'day'} 
            onClick={() => onFilterChange('day')} 
          />
          <FilterButton 
            label="هذا الأسبوع" 
            isActive={activeFilter === 'week'} 
            onClick={() => onFilterChange('week')} 
          />
          <FilterButton 
            label="هذا الشهر" 
            isActive={activeFilter === 'month'} 
            onClick={() => onFilterChange('month')} 
          />
        </div>
    );
}

export default TimeFilter;