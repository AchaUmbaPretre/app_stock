import axios from 'axios';
import React from 'react'
import Swal from 'sweetalert2';
import config from '../../../config';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './formCategorie.scss'

const FormCategorie = ({getUpdata,getUpdataOne}) => {
    const navigate = useNavigate();
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]

  return (
    <>
        <div className="formCategorie">
            <div className="formCategorie-wrapper">
                <div className="categorie-container-left">
                    <input type="text" name='nom_categorie' value={getUpdataOne?.nom_categorie} onChange={(e)=> getUpdata(e.target.value)} placeholder='Entrer une categorie...' className="categorie-input" />
                </div>
            </div>
        </div>

    </>
  )
}

export default FormCategorie