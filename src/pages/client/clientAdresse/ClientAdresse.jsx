import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Select from 'react-select';
import config from '../../../config';
import { CircularProgress } from '@mui/material';

const ClientAdresse = ({idClients}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState({})
  const navigate = useNavigate();
  const [province, setProvince] = useState([]);
  const [idProvince, setIdProvince] = useState([]);
  const [commune, setCommune] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [getClient, setGetClient] = useState([]);

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
  
    let updatedValue = fieldValue;
  
    if (fieldName === "email") {
      updatedValue = fieldValue.toLowerCase();
    } else if (fieldValue && Number.isNaN(Number(fieldValue))) {
      updatedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
    }
  
    setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
     if (!data) {
      Swal.fire({
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs requis',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    } 

    try{
      setIsLoading(true);
      await axios.post(`${DOMAIN}/api/client/clientAdresse`, {
        ...data,
        id_client : idClients
      })
      Swal.fire({
        title: 'Success',
        text: 'Client crée avec succès!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate('/clients')
      window.location.reload();

    }catch(err) {
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
    finally {
      setIsLoading(false);
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
  }, [DOMAIN])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/livreur/province`);
        setProvince(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN]);

  console.log(data)

  useEffect(()=>{
    setIdProvince(data?.id_ville)
  },[data?.id_ville])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/livreur/commune/${idProvince}`);
        setCommune(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN,idProvince]);
  
  return (
    <>
        <div className="clientForm">
          <div className="product-container">
            <div className="product-wrapper">
              <div className="product-container-bottom">
                <div className="form-controle">
                  <label htmlFor="">Ville <span style={{color:'red'}}>*</span></label>
                  <Select
                    name="id_ville"
                    options={province?.map(item => ({ value: item.id_province, label: item.nom_province }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'id_ville', value: selectedOption.value } })}
                  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Commune <span style={{color:'red'}}>*</span></label>
                  <Select
                    name="id_commune"
                    options={commune?.map(item => ({ value: item.id_commune, label: item.nom_commune }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'id_commune', value: selectedOption.value } })}
                    placeholder = 'Sélectionnez une commune'
                  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Avenue <span style={{color:'red'}}>*</span></label>
                  <input type="text" name="avenue" className="form-input" onChange={handleInputChange} />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Quartier <span style={{color:'red'}}>*</span></label>
                  <input type="text" name="quartier" className="form-input" onChange={handleInputChange} />
                </div>
                <div className="form-controle">
                  <label htmlFor="">N° <span style={{color:'red'}}>*</span></label>
                  <input type="number" name="num" min={0} className="form-input" onChange={handleInputChange} />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Ref <span style={{color:'red'}}>*</span></label>
                  <input type="text" name="ref" placeholder='Entrer une refèrence...' className="form-input" onChange={handleInputChange} />
                </div>

              </div>

              <div className="form-submit">
                <button className="btn-submit" onClick={handleClick} disabled={isLoading}>Envoyer</button>
                {isLoading && (
                <div className="loader-container loader-container-center">
                  <CircularProgress size={28} />
                </div>
            )}
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default ClientAdresse