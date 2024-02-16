import React from 'react'
import { useState } from 'react';
import './formCatDepenses.scss'
import { useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

const FormCatDepense = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState({})
  const {pathname} = useLocation();
  const id = pathname.split('/')[2]
  const navigate = useNavigate();


  const handleInputChange = async (e) => {
    const fieldName = e.target.name;
    let fieldValue = e.target.value;

    fieldValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
  
    setData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };


  const handleClick = async (e) => {
    e.preventDefault();

    try{
      await axios.post(`${DOMAIN}/api/depenses/catDepenses`, data)
      Swal.fire({
        title: 'Success',
        text: 'La categorie de dépenses a été enregistrée avec succès.!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
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
  

  return (
    <>
        <div className="formCatDepense">
          <div className="product-container">
            <div className="product-wrapper">
                <div className="form-controle-desc">
                  <label htmlFor="">Nom de la dépense</label>
                  <input type="text" name='nom' style={{padding:'8px 10px', border:'1px solid #c5c5c5', outline:'none', borderRadius:'5px'}} placeholder='Entrer le nom...' onChange={handleInputChange} />
                </div>
              <div className="form-controle-desc">
                <label htmlFor="">Description</label>
                <textarea name="description"  placeholder='Description.....' onChange={handleInputChange}></textarea>
              </div>
              <div className="form-submit">
                <button className="btn-submit" onClick={handleClick}>Modifier</button>
                <button className="btn-submit btn-annuler" onClick={()=> window.location.reload()}>Annuler</button>
              </div>
            </div>
          </div>
        </div>

    </>
  )
}

export default FormCatDepense