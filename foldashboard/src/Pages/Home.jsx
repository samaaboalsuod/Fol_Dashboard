import React, { Component } from 'react';
// import { supabase } from "../Supabase";

import './Home.css'
import Nav from '../Components/Nav';

const Home = () => {
    return (<>
    
    
<section class="dashboard-wrapper ">

  <aside> </aside>
  
  <main class="main-content">

    <header>
      <Nav />
    </header>

    <section class="dashboard-body"></section>

  </main>

</section>

    
    </>  );
}
 
export default Home;
