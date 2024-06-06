import React, { useState } from 'react'
import logo from './../../assets/logo doe.jpg'
import { FacebookOutlined, Instagram, LockOutlined, MailLockOutlined, MailOutlined, PersonOutline, Twitter, WhatsApp } from '@mui/icons-material'
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/apiCalls'
import { useNavigate } from 'react-router-dom'
import config from '../../config';
import axios from 'axios';
import { toast } from 'react-toastify';

const PasswordForgot = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const response = await axios.post(`${DOMAIN}/api/user/detail_forgot?email=${email}`);
        const data = response.data;

        if (Array.isArray(data) && data.length > 0) {
            setUser(data[0]);
        } else {
            toast.error('Aucun utilisateur trouvé.');
        }
    } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || 'Une erreur est survenue');
    } finally {
        setIsLoading(false);
    }
};


  return (
    <>
    <div class="container">
      <div class="forms-container">
      {!user ?
        <div class="signin-signup">
          <form action="#" class="sign-in-form">
            <h2 class="title">Trouvez votre compte</h2>
            <div class="input-field">
              <MailLockOutlined className='icon-login'/>
              <input type="text" placeholder="Entrer votre mail.." onChange={(e) => setEmail(e.target.value)} />
            </div>
            <input type="submit" value="Envoyer" class="btn solid" onClick={handleClick} disabled={isFetching} />
            <p class="social-text">Connectez-vous avec les plateformes sociales</p>
            <div class="social-media">
              <a href="#" class="social-icon">
                <FacebookOutlined />
              </a>
              <a href="#" class="social-icon">
                <Twitter />
              </a>
              <a href="#" class="social-icon">
                <WhatsApp />
              </a>
              <a href="#" class="social-icon">
                <Instagram />
              </a>
            </div>
          </form>
        </div>
        : 
        <div class="signin-signup">
          <form action="#" class="sign-in-form">
            <h2 class="title">Compte retrouvé</h2>
            <span className="login_label">Nom : {user.username}</span>
            <span className="login_label">Email : {user.email}</span>
            <div class="input-field">
                <MailOutlined className='icon-login'/>
              <input type="password" placeholder="Entrer votre new password.. " onChange={(e) => setEmail(e.target.value)} />
            </div>
            <input type="submit" value="Envoyer" class="btn solid" onClick={handleClick} disabled={isFetching} />
            <p class="social-text">Connectez-vous avec les plateformes sociales</p>
            <div class="social-media">
              <a href="#" class="social-icon">
                <FacebookOutlined />
              </a>
              <a href="#" class="social-icon">
                <Twitter />
              </a>
              <a href="#" class="social-icon">
                <WhatsApp />
              </a>
              <a href="#" class="social-icon">
                <Instagram />
              </a>
            </div>
          </form>
        </div>
         }
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3></h3>
            <p>
                
            </p>
            {isLoading && (
              <div className="loader-container loader-container-center">
                <CircularProgress size={24} />
              </div>
            )}
          </div>
          <img src={logo} class="image" alt="" />
        </div>
      </div>
    </div>

    </>
  )
}

export default PasswordForgot