import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Select from 'react-select';
import config from '../../../config';
import { useSelector } from 'react-redux';

const LivraisonForm = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState({})
  const navigate = useNavigate();
  const [province, setProvince] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getClient, setGetClient] = useState([]);
  const [getStatut, setGetStatut] = useState([]);
  const userId = useSelector((state) => state.user.currentUser.id)

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
      await axios.post(`${DOMAIN}/api/livraison`, {...data, user_cr: userId})
      Swal.fire({
        title: 'Success',
        text: 'Livraison créée avec succès!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate('/livraison')
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
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
;


  return (
    <>
        <div className="clientForm">
          <div className="product-container">
            <div className="product-container-top">
              <div className="product-left">
                <h2 className="product-h2">Creer une livraison</h2>
                <span>Livraison</span>
              </div>
            </div>
            <div className="product-wrapper">
              <div className="product-container-bottom">
                         
                <div className="form-controle">
                  <label htmlFor="">Date de livraison</label>
                  <input type="date" name='date_livre' className="form-input" onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-submit">
                <button className="btn-submit" onClick={handleClick}>Soumetre</button>
                <button className="btn-submit btn-annuler">Annuler</button>
              </div>
            </div>
          </div>
        </div>

    </>
  )
}

export default LivraisonForm