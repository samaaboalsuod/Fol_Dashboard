import React, { Component } from 'react';
import './Nav.css'
import SearchBar from './SearchBar';

import NotificationIcon from '../Assets/notiIcon.svg'
import UserIcon from '../Assets/userIcon.svg'
import CircleIcon from './CircleIcon';

const Nav = ({ toggleSidebar }) => {
    return ( 
        <nav>
            <button className="hamburger-btn" onClick={toggleSidebar}>
                &#9776;
            </button>
            <SearchBar placeholder="بحث" />

            <div className='navleftContainer'>

                <img src={NotificationIcon} alt="" />

                <div className='seperator'></div>

                <div className='UserDataContainer'>

                    <CircleIcon src={UserIcon} />
                    <div className='userNameCont'>
                        <h3>أحمد محمد</h3>
                        <p>مشرف</p>
                    </div>

                </div>

            </div>

        </nav>
     );
}
 
export default Nav;