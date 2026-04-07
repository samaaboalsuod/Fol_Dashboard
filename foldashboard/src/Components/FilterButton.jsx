import React from 'react';
import './FilterButton.css';

const FilterButton = ({ label, isActive, onClick }) => {
  return (
    <button className={`filter-btn ${isActive ? 'active' : ''}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default FilterButton;