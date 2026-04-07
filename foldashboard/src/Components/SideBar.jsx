import React, { Component } from 'react';
import './SideBar.css'

import SideBarItem from './SideBarItem';

import Logo from '../Assets/logo.svg'
import DashIcon from '../Assets/dashIcon.svg'

const SideBar = () => {
    return ( 
        <section className='sideBarCont'>

            <img src={Logo} alt="logo" className='logo' />

            <div className='sideItemsCont'>
                <SideBarItem src={DashIcon} title="لوحة التحكم" />
            </div>

        </section>
     );
}
 
export default SideBar;