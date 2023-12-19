import React from 'react'
import logo from './../../assets/logo doe.jpg'
import './login.css'
import { FacebookOutlined, Instagram, LockOutlined, PersonOutline, Twitter, WhatsApp } from '@mui/icons-material'

const Login1 = () => {
  return (
    <>
    <div class="container">
      <div class="forms-container">
        <div class="signin-signup">
          <form action="#" class="sign-in-form">
            <h2 class="title">Se connecter</h2>
            <div class="input-field">
                <PersonOutline className='icon-login'/>
              <input type="text" placeholder="Username" />
            </div>
            <div class="input-field">
                <LockOutlined className='icon-login'/>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Se connecter" class="btn solid" />
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
            <button class="btn transparent" id="sign-up-btn">
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