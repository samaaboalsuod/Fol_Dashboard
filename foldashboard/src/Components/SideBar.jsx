import React, { Component } from 'react';
import './SideBar.css'

import SideBarItem from './SideBarItem';

import Logo from '../Assets/logo.svg'
import DashIcon from '../Assets/dashIcon.svg'
import PagesIcon from '../Assets/pagesIcon.svg'
import PlantIcon from '../Assets/plantIcon.svg'
import ServiceIcon from '../Assets/serviceIcon.svg'
import LessonsIcon from '../Assets/lessonsIcon.svg'
import AskIcon from '../Assets/askIcon.svg'
import ProductIcon from '../Assets/productIcon.svg'
import OrderIcon from '../Assets/ordersIcon.svg'
import AppIcon from '../Assets/appIcon.svg'
import KiosIcon from '../Assets/kioskIcon.svg'
import UsersIcon from '../Assets/usersIcon.svg'
import SettiingIcon from '../Assets/settingIcon.svg'



const SideBar = ({ activeTitle }) => {
    return ( 
        <section className='sideBarCont'>

            <img src={Logo} alt="logo" className='logo' />

            <div className='sideItemsCont'>
                <SideBarItem 
                    src={DashIcon} 
                    title="لوحة التحكم" 
                    isActive={activeTitle === "لوحة التحكم"} 
                />
                <SideBarItem 
                    src={PlantIcon} 
                    title="النباتات" 
                    isActive={activeTitle === "النباتات"} 
                />
                <SideBarItem 
                    src={PagesIcon} 
                    title="الصفحات" 
                    isActive={activeTitle === "الصفحات"} 
                />
                <SideBarItem 
                    src={AskIcon} 
                    title="الأسئلة" 
                    isActive={activeTitle === "الأسئلة"}
                />
                <SideBarItem src={ServiceIcon} title="الخدمات" isActive={activeTitle === "الخدمات"}/>
                <SideBarItem src={LessonsIcon} title="الدروس" isActive={activeTitle === "الدروس"}/>
                <SideBarItem src={ProductIcon} title="المنتجات" isActive={activeTitle === "المنتجات"}/>
                <SideBarItem src={OrderIcon} title="الطلبات" isActive={activeTitle === "الطلبات"}/>
                <SideBarItem src={AppIcon} title="تجربة التطبيق" isActive={activeTitle === "تجربة التطبيق"}/>
                <SideBarItem src={KiosIcon} title="تجربة الكشك" isActive={activeTitle === "تجربة الكشك"}/>
                <SideBarItem src={SettiingIcon} title="الإعدادات" isActive={activeTitle === "الإعدادات"}/>
                <SideBarItem src={UsersIcon} title="المستخدمون" isActive={activeTitle === "المستخدمون"}/>
            </div>

        </section>
     );
}
 
export default SideBar;