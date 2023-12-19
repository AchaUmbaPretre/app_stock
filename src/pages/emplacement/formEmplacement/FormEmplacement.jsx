import axios from 'axios';
import React from 'react'
import Swal from 'sweetalert2';
import config from '../../../config';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const FormEmplacement = ({getUpdataOne,OnchangePut}) => {
    const navigate = useNavigate();

  return (
    <>
        <div className="formCategorie">
            <div className="formCategorie-wrapper">
                <div className="categorie-container-left">
                    <input type="text" name='nom' value={getUpdataOne?.nom} onChange={OnchangePut} placeholder='Entrer un emplacement...' className="categorie-input" />
                    <input type="text" name='capacite' value={getUpdataOne?.capacite} onChange={OnchangePut} placeholder="Entrer la capacité de l'emplacement..." className="categorie-input" />
                </div>
            </div>
        </div>

    </>
  )
}

export default FormEmplacement;