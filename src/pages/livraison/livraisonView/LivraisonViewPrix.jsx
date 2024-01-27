import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import config from '../../../config';
import axios from 'axios';

const LivraisonViewPrix = ({prixTotal,idDetail}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const navigate  = useNavigate();
    const [getPrix,setGetPrix] = useState('');

    useEffect(()=>{
        setGetPrix(prixTotal)
    },[prixTotal])

    const handleClick = async (e) => {
        e.preventDefault();
    
        try{
          await axios.put(`${DOMAIN}/api/livraison/livraisonPrix/${idDetail}`, {prix: getPrix})
          Swal.fire({
            title: 'Success',
            text: 'Livraison modifiée avec succès!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          navigate('/livraison_detail')
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
        <div className="livraisonViewPrix">
            <div className="livraisonviewPrix-wrapper" style={{display: 'flex', flexDirection:'column',gap:"10px"}}>
                <label htmlFor="">Prix</label>
                <input type="text" value={getPrix} onChange={(e)=>setGetPrix(e.target.value)} style={{width:"100%", padding:"10px", border: '1px solid #c7c7c7', borderRadius:'5px', outline:'none'}}/>
                <button style={{padding: '10px 15px', border:'none', color:'#fff', background:'rgb(1, 35, 138)', borderRadius:'5px',cursor:'pointer'}} onClick={handleClick} >Envoyer</button>
            </div>
        </div>

    </>
  )
}

export default LivraisonViewPrix