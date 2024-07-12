import React, { useEffect, useState } from 'react';
import { BellOutlined, PoweroffOutlined, MailOutlined } from '@ant-design/icons';
import './pageLivreurNavbar.scss';
import { Badge } from 'antd';
import logoIcon from './../../../assets/logo doe.jpg';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../../../config';
import { useNavigate } from 'react-router-dom';

const PageLivreurNavbar = () => {
    const navigate = useNavigate();
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const [newNotification, setNewNotification] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const user = useSelector((state) => state.user.currentUser.username);
    const userId = useSelector((state) => state.user.currentUser.id);

    const playNotificationSound = () => {
        const audio = new Audio('/Sonnerie.mp3');
        audio.play();
    };

    const vibrateDevice = () => {
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }
    };

    const handleUserInteraction = () => {
        if (newNotification) {
            playNotificationSound();
            setNewNotification(false);
        }
    };

    const Logout = async () => {
        try {
            await axios.post(`${DOMAIN}/api/auth/logout`);
            setCurrentUser(null);
            localStorage.setItem('persist:root', JSON.stringify(currentUser));
            Swal.fire('Déconnexion réussie !', '', 'success');
            navigate('/login');
            window.location.reload();
        } catch (error) {
            Swal.fire('Erreur lors de la déconnexion.', '', 'error');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${DOMAIN}/api/livraison/livraison-user/${userId}`);
                if (data.length > 0) {
                    setData(data);
                    setNewNotification(true);
                    vibrateDevice();
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 4000);

        return () => clearInterval(intervalId);
    }, [DOMAIN, userId]);

    useEffect(() => {
        document.addEventListener('click', handleUserInteraction);

        return () => {
            document.removeEventListener('click', handleUserInteraction);
        };
    }, [newNotification]);

    return (
        <>
            <div className="pageLivreurNavbar">
                <div className="pageLivreurNavbar-container">
                    <nav>
                        <div className="navbar-wrapper">
                            <div className="nav-logo">
                                <img src={logoIcon} alt="" className="nav-img" onClick={() => navigate('/')} />
                            </div>
                            <div className="navbar-right">
                                <Badge count={''}>
                                    <MailOutlined className='navbar-icon' />
                                </Badge>
                                <Badge count={data.length} onClick={() => navigate("/pageCommandeLivraison")}>
                                    <BellOutlined className='navbar-icon' />
                                </Badge>
                                <PoweroffOutlined className='navbar-icon' onClick={Logout} />
                                <span className="navbar_username">{user}</span>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default PageLivreurNavbar;
