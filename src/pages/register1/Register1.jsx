import React, { useState } from 'react'
import '../login1/login.css'
import logo from './../../assets/logo doe.jpg'
import { CircularProgress } from '@mui/material';
import { FacebookOutlined, Instagram, LockOutlined, MailOutlined, PersonOutline, Twitter, WhatsApp } from '@mui/icons-material'
import { register } from '../../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Register1 = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
  
    try {
      setIsLoading(true);
  
      const response = await register(dispatch, { username, email, password });
  
      if (response.status === 409) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: response.data.error,
        });
      } else {
        // Code à exécuter en cas de succès
        navigate('/register');
      }
    } catch (error) {
      console.log('Erreur:', error);
  
      if (error.response && error.response.data && error.response.data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: error.response.data.error,
        });
      } else {
        const results = []; // Define and initialize the 'results' variable
  
        if (results.length > 0) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'L\'utilisateur existe déjà.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Ce mail existe déjà.',
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
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
            <button class="btn transparent" id="sign-up-btn" onClick={()=>navigate('/login')}>
                Se connecter
            </button>
            {isLoading && (
                <div className="loader-container loader-container-center">
                  <CircularProgress size={28} />
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

export default Register1