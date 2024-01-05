import React, { useState } from 'react'
import logo from './../../assets/logo doe.jpg'
import './login.css'
import { FacebookOutlined, Instagram, LockOutlined, PersonOutline, Twitter, WhatsApp } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/apiCalls'
import { useNavigate } from 'react-router-dom'

const Login1 = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
  
    try {
      await login(dispatch, { username, password });
      navigate('/')
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <>
    <div class="container">
      <div class="forms-container">
        <div class="signin-signup">
          <form action="#" class="sign-in-form">
            <h2 class="title">Se connecter</h2>
            <div class="input-field">
              <PersonOutline className='icon-login'/>
              <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div class="input-field">
                <LockOutlined className='icon-login'/>
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <input type="submit" value="Se connecter" class="btn solid" onClick={handleClick} disabled={isFetching} />
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
            <h3>Voulez-vous créer un compte ?</h3>
            <p>
                Nous vous invitons à créer un compte pour profiter de tous les avantages de notre plateforme. En créant un compte, vous pourrez accéder à des fonctionnalités exclusives, bénéficier d'offres spéciales et suivre facilement vos commandes.
            </p>
            <button class="btn transparent" id="sign-up-btn" onClick={()=>navigate('/register')}>
                S'inscrire
            </button>
          </div>
          <img src={logo} class="image" alt="" />
        </div>
      </div>
    </div>

    </>
  )
}

export default Login1