import React from 'react';
import "./Home.css";
import Topbar from '../../components/Topbar/Topbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import TimeLine from '../../components/TimeLine/TimeLine';
import Rightbar from '../../components/Rightbar/Rightbar';


export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar/>
        <TimeLine/>
        <Rightbar />
      </div>
    </>
  );
}
