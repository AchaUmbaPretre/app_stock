import { MailOutline, NotificationsNone, ShoppingCartOutlined,CloseOutlined } from '@mui/icons-material'
import { Avatar } from 'antd';
import React from 'react'
import './topbar.css'
import logo from './../../assets/logo_doe-removebg-preview.png'
import rdc from './../../assets/stock-vector.jpg'
import { UserOutlined,MenuOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../../redux/userRedux';

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quantite = useSelector(state => state.cart.quantite);
  const user = useSelector((state) => state.user.currentUser.username);
  const isSidebarOpen = useSelector((state) => state.user.isSidebarOpen);

  const handleClick = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-left" onClick={()=>navigate('/')}>
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
{/*             <span className="topbar-not">2</span> */}
          </div>
          <div className="topbar-icons" style={{border: "1px solid #c2c2c2bb", background:'#f2f2f2'}}>
            <img src={rdc} alt="" className="topbar-imgUser"/> 
          </div>
          <div className="icons-user">
            {/* <img src={logo} alt="" className="topbar-imgUser"/> */}
            <Avatar icon={<UserOutlined />} />
            <span className='username'>{user}</span>
          </div>
          <div className={`topbar-icon ${isSidebarOpen ? 'colorRed' : ''}`} onClick={handleClick}>
            {isSidebarOpen ? <CloseOutlined style={{color:'red'}} className='close-icon'/> : <MenuOutlined /> }
          </div>
        </div>
      </div>
    </>
  )
}

export default Topbar