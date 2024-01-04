import React, { useState } from 'react'
import '../login1/login.css'
import logo from './../../assets/logo doe.jpg'
import { FacebookOutlined, Instagram, LockOutlined, MailOutlined, PersonOutline, Twitter, WhatsApp } from '@mui/icons-material'
import { register } from '../../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Register1 = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, { username,email, password });
    navigate('/login')
  };

  return (
    <>
      <div class="container">
      <div class="forms-container">
        <div class="signin-signup">
          <form action="#" class="sign-in-form">
            <h2 class="title">S'inscrire</h2>
            <div class="input-field">
                <PersonOutline className='icon-login'/>
              <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div class="input-field">
                <MailOutlined className='icon-login'/>
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div class="input-field">
                <LockOutlined className='icon-login'/>
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <input type="submit" class="btn" value="S'inscrire" onClick={handleClick} disabled={isFetching}/>
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
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>Voulez-vous retouner à la page Login ?</h3>
            <button class="btn transparent" id="sign-up-btn">
                Se connecter
            </button>
          </div>
          <img src={logo} class="image" alt="" />
        </div>
      </div>
    </div>

    </>
  )
}

export default Register1