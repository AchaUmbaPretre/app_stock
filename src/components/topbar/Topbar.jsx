import { Language, MailOutline, NotificationsNone, Settings, ShoppingCartOutlined, WbSunnyOutlined, shop } from '@mui/icons-material'
import { Avatar, Space } from 'antd';
import React from 'react'
import './topbar.css'
import logo from './../../assets/logo_doe-removebg-preview.png'
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const Topbar = () => {
  const quantite = useSelector(state => state.cart.quantite);

  console.log(quantite)

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <img src={logo} alt="" className="topbar-img" />
          <span className="logo">Ndoé Boutique</span>  
        </div>
        <div className="topbar-right">
        { quantite > 0 &&
          <div className="topbar-icons">
            <ShoppingCartOutlined/>
            <span className="topbar-not">{quantite}</span>
          </div>}
          <div className="topbar-icons">
            <NotificationsNone/>
            <span className="topbar-not">2</span>
          </div>
          <div className="topbar-icons">
            <MailOutline/>
            <span className="topbar-not">2</span>
          </div>
          <div className="topbar-icons">
            {/* <img src={logo} alt="" className="topbar-imgUser"/> */}
            <Avatar icon={<UserOutlined />} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Topbar