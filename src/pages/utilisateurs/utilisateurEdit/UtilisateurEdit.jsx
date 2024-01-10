import React, { useEffect } from 'react'
import config from '../../../config';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const UtilisateurEdit = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN
  const [data, setData] = useState({})
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const id = pathname.split('/')[2];
  const [loading, setLoading] = useState(true);
  const {username,email,password,role} = data;

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
  
    let updatedValue = fieldValue;
  
    if (fieldName === "contact_email") {
      updatedValue = fieldValue.toLowerCase();
    } else if (Number.isNaN(Number(fieldValue))) {
      updatedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
    }
  
  setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
  };

  console.log(data)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/user/getUserOne/${id}`);
        setData(data[0]);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    try{
      await axios.post(`${DOMAIN}/api/auth/register`, data)
      Swal.fire({
        title: 'Success',
        text: 'Utilisateur a été crée avec succès!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate('/utilisateurs')
      window.location.reload();

    }catch(err) {
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
  
  const taps = [
    {
      label : "Admin",
      id : "admin"
    },
    {
      label : "Secretaire",
      id : "secretaire"
    },
    {
      label : "Livreur",
      id : "livreur"
    },
    {
      label : "Client",
      id : "client"
    },
  ]
  return (
    <>
        <div className="clientForm">
          <div className="product-container">
            <div className="product-container-top">
              <div className="product-left">
                <h2 className="product-h2">Modification</h2>
                <span>Modifier les informations d'utilisateur</span>
              </div>
            </div>
            <div className="product-wrapper">
              <div className="product-container-bottom">
                <div className="form-controle">
                  <label htmlFor="">Nom</label>
                  <input type="text" value={username} className="form-input" name='username' onChange={handleInputChange} required/>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Email</label>
                  <input type="email" value={email} className="form-input" name='email' onChange={handleInputChange}  required/>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Mot de passe</label>
                  <input type="password" value={password} className="form-input" name='password' onChange={handleInputChange}  required/>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Permission</label>
                  <select className="form-input" value={role} name='role' onChange={handleInputChange}>
                    <option value="" disabled>Selectionnez une permission</option>
                    {taps.map((dd)=>(
                      <option value={dd.id}>{dd.label}</option>
                    ))}
                  </select>
      <p>La valeur sélectionnée est : {role !== '' ? role : 'Aucune permission sélectionnée'}</p>
                </div>

              <div className="form-submit">
                <button className="btn-submit" onClick={handleClick}>Modifier</button>
                <button className="btn-submit btn-annuler">Annuler</button>
              </div>
            </div>
          </div>
        </div>
        </div>

    </>
  )
}

export default UtilisateurEdit