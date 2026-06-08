import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
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
import UsersIcon from '../Assets/usersIcon.svg'
import SettiingIcon from '../Assets/settingIcon.svg'



const SideBar = ({ activeTitle }) => {
    return ( 
        <section className='sideBarCont'>

            <img src={Logo} alt="logo" className='logo' />

            <div className='sideItemsCont'>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                    <SideBarItem 
                        src={DashIcon} 
                        title="لوحة التحكم" 
                        isActive={activeTitle === "لوحة التحكم"} 
                    />
                </Link>

                {/* Link to Plants.jsx - Note the capital 'P' to match your routing */}
                <Link to="/Plants" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                    <SideBarItem 
                        src={PlantIcon} 
                        title="النباتات" 
                        isActive={activeTitle === "النباتات"} 
                    />
                </Link>
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
                <SideBarItem src={SettiingIcon} title="الإعدادات" isActive={activeTitle === "الإعدادات"}/>
                <SideBarItem src={UsersIcon} title="المستخدمون" isActive={activeTitle === "المستخدمون"}/>
            </div>

        </section>
     );
}
 
export default SideBar;