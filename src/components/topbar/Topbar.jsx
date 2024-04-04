import { MailOutline, NotificationsNone, ShoppingCartOutlined } from '@mui/icons-material'
import { Avatar } from 'antd';
import React from 'react'
import './topbar.css'
import logo from './../../assets/logo_doe-removebg-preview.png'
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();
  const quantite = useSelector(state => state.cart.quantite);
  const user = useSelector((state) => state.user.currentUser.username);


  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <img src={logo} alt="" className="topbar-img" />
          <span className="logo">Ndoé Boutique</span>  
        </div>
        <div className="topbar-right">
        { quantite > 0 &&
          <div className="topbar-icons" onClick={()=>navigate('/cart')}>
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
          <div className="topbar-icons icons-user">
            {/* <img src={logo} alt="" className="topbar-imgUser"/> */}
            <Avatar icon={<UserOutlined />} />
            <span>{user}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Topbar