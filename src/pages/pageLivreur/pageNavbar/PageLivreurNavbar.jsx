import React, { useState } from 'react'
import { BellOutlined, PoweroffOutlined, MailOutlined,ExclamationOutlined } from '@ant-design/icons'
import './pageLivreurNavbar.scss'
import { Badge } from 'antd';
import logoIcon from './../../../assets/logo doe.jpg'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../../../config';
import { useNavigate } from 'react-router-dom';

const PageLivreurNavbar = () => {
    const navigate = useNavigate();
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [errorMessage,setErrorMessage] = useState('')
    const [currentUser, setCurrentUser] = useState('')
    const user = useSelector((state) => state.user.currentUser.username);
    const userId = useSelector((state) => state.user.currentUser.id);

    const Logout = async () => {
      try {
        await axios.post(`${DOMAIN}/api/auth/logout`);
        setCurrentUser(null);
        localStorage.setItem('persist:root', JSON.stringify(currentUser));
        Swal.fire('Déconnexion réussie !', '', 'success');
        navigate('/login')
        window.location.reload();
      } catch (error) {
        setErrorMessage(error.response.data);
        Swal.fire('Erreur lors de la déconnexion.', '', 'error');
      }
    };
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
                            <PoweroffOutlined className='navbar-icon' onClick={Logout}/>
                            <span className="navbar_username">{user}</span>
                        </div>
                    </div>
                </nav>
            </div>
        </div>

    </>
  )
}

export default PageLivreurNavbar