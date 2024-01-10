import React from 'react'
import { BellOutlined, PoweroffOutlined, MailOutlined,ExclamationOutlined } from '@ant-design/icons'
import './pageLivreurNavbar.scss'
import { Badge } from 'antd';
import logoIcon from './../../../assets/logo doe.jpg'
import { useSelector } from 'react-redux';

const PageLivreurNavbar = () => {
    const userId = useSelector((state) => state.user.currentUser.id);
  return (
    <>
        <div className="pageLivreurNavbar">
            <div className="pageLivreurNavbar-container">
                <nav>
                    <div className="navbar-wrapper">
                        <div className="nav-logo">
                            <img src={logoIcon} alt="" className="nav-img" />
                        </div>
                        <div className="navbar-right">
                            <Badge count={5}>
                                <MailOutlined className='navbar-icon' />
                            </Badge>
                            <Badge count={3}>
                                <BellOutlined className='navbar-icon'/>
                            </Badge>
                            <PoweroffOutlined className='navbar-icon'/>
                            <span className="navbar_username">Elie</span>
                        </div>
                    </div>
                </nav>
            </div>
        </div>

    </>
  )
}

export default PageLivreurNavbar