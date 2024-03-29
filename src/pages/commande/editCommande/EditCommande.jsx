import React, { useEffect,useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import config from '../../../config';

const EditCommande = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState({})
  const navigate = useNavigate();
  const [getClient, setGetClient] = useState([]);
  const {pathname} = useLocation();
  const id = pathname.split('/')[2]
  const {id_client} = data;

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

  const handleClick = async (e) => {
    e.preventDefault();

    try{
      await axios.put(`${DOMAIN}/api/commande/commandePut/${id}`, data)
      Swal.fire({
        title: 'Success',
        text: 'Commande créée avec succès!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate('/listeCommande')
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/client`);
        setGetClient(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/commande/commandeOne/${id}`);
        setData(data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN,id]);


  return (
    <>
        <div className="clientForm">
          <div className="product-container">
            <div className="product-container-top">
              <div className="product-left">
                <h2 className="product-h2">Modifier la commande</h2>
                <span></span>
              </div>
            </div>
            <div className="product-wrapper">
              <div className="product-container-bottom">
                <div className="form-controle">
                  <label htmlFor="">Client</label>
                  <select name="id_client" id="id_client" value={id_client} className="form-input" onChange={handleInputChange}  required>
                    <option>Sélectionnez un client</option>
                        { getClient.map((dd)=>(
                    <option value={dd.id}>{dd.nom}</option>
                        ))}
                </select>
                </div>
{/*                 <div className="form-controle">
                  <label htmlFor="">Statut</label>
                  <select id="" className="form-input" value={statut} name="statut" onChange={handleInputChange} required>
                    <option value="" disabled selected>Selectionnez un statut</option>
                    {
                        getStatut.map((dd)=>(
                            <option value={dd.id_statut}>{dd.nom_statut}</option>
                        ))
                    }
                  </select>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Livraison</label>
                  <input type="email" name='id_livraison' value={id_livraison} className="form-input" onChange={handleInputChange} />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Paiement</label>
                  <input type="tel" name='id_paiement' value={id_paiement} className="form-input" onChange={handleInputChange} required />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Shop</label>
                  <select id="" className="form-input" value={id_shop} name="statut" onChange={handleInputChange} required>
                    <option value="" disabled selected>Selectionnez un shop</option>
                    <option value="Client VIP">Validé</option>
                    <option value="Client Normal">Non-validé</option> 
                  </select>
                </div> */}
{/*                 <div className="form-controle">
                  <label htmlFor="">Paye</label>
                  <input type="text" name="paye" value={paye} className="form-input" onChange={handleInputChange} />
                </div> */}
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

export default EditCommande