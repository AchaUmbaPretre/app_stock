import React, { useEffect,useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import config from '../../../config';
import { CircularProgress } from '@mui/material';
import { Modal } from 'antd';

const ClientEdit = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState({})
  const navigate = useNavigate();
  const [province, setProvince] = useState([]);
  const [idProvince, setIdProvince] = useState([]);
  const [commune, setCommune] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const id = useLocation().pathname.split('/')[2];
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
  
    let updatedValue = fieldValue;
  
    if (fieldName === "email") {
      updatedValue = fieldValue.toLowerCase();
    } else if (Number.isNaN(Number(fieldValue))) {
      updatedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
    }
  
  setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
  };

  const handleConfirm = () => {
    setShowConfirmModal(true);
  };
  
  const handleCancel = () => {
    setShowConfirmModal(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/client/${id}`);
        setData(data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN]);

  const handleClick = async (e) => {
    e.preventDefault();

    try{
      setIsLoading(true);
      await axios.put(`${DOMAIN}/api/client/client/${id}`, data)
      Swal.fire({
        title: 'Success',
        text: 'Client a été modifier avec succès!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate('/clients')

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
        const { data } = await axios.get(`${DOMAIN}/api/livreur/province`);
        setProvince(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN]);

  useEffect(()=>{
    setIdProvince(data?.id_province)
  },[data?.id_province])

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
            <div className="product-container-top">
              <div className="product-left">
                <h2 className="product-h2">Ajouter un nouveau client</h2>
                <span>Créer un nouveau client</span>
              </div>
            </div>
            <div className="product-wrapper">
              <div className="product-container-bottom">
                <div className="form-controle">
                  <label htmlFor="">Nom</label>
                  <input type="text" name='nom' className="form-input" value={data?.nom} onChange={handleInputChange}  required/>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Raison sociale</label>
                  <select id="" className="form-input" name="raison_sociale" value={data?.raison_sociale} onChange={handleInputChange}>
                    <option value="" disabled selected>Selectionnez une raison sociale</option>
                    <option value="Client VIP">client VIP</option>
                    <option value="Client Normal">client Normal</option>
                  </select>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Email</label>
                  <input type="email" name='email' value={data?.email} className="form-input" onChange={handleInputChange} />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Telephone</label>
                  <input type="tel" name='telephone' value={data?.telephone} className="form-input" onChange={handleInputChange} required />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Ville</label>
                  <select
                    className="form-input"
                    name="id_province"
                    value={data.id_province}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Selectionnez une ville"
                  >
                    <option value="" disabled>
                      Selectionnez une ville
                    </option>
                    {province?.map((item) => (
                      <option key={item.id_province} value={item.id_province}>
                        {item.nom_province}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Avenue</label>
                  <input type="text" name="avenue" value={data?.avenue} className="form-input" onChange={handleInputChange} />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Quartier</label>
                  <input type="text" name="quartier" value={data?.quartier} className="form-input" onChange={handleInputChange} />
                </div>
                <div className="form-controle">
                <label htmlFor="id_commune">Commune</label>
                <select
                  className="form-input"
                  id="id_commune"
                  name="id_commune"
                  value={data?.id_commune}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="" disabled>
                    Sélectionnez une commune
                  </option>
                  {commune?.map((item) => (
                    <option key={item.id_commune} value={item.id_commune}>
                      {item.nom_commune}
                    </option>
                  ))}
                </select>
                </div>
                <div className="form-controle">
                  <label htmlFor="">N°</label>
                  <input type="number" name="num" value={data?.num} className="form-input" onChange={handleInputChange} />
                </div>

              </div>

              <div className="form-submit">
                <button className="btn-submit" onClick={handleConfirm} disabled={isLoading}>Envoyer</button>
                <Modal
                  title="Confirmation"
                  visible={showConfirmModal}
                  onOk={handleClick}
                  onCancel={handleCancel}
                  centered
                  cancelText={<span style={{ color: '#fff' }}>Non</span>}
                  okText={<span style={{ color: '#fff' }}>Oui</span>}
                  cancelButtonProps={{ style: { background: 'red' } }}
                  okButtonProps={{ style: { background: 'blue' } }}
                >
                  <p>Voulez-vous réellement modifier les informations du client ?</p>
                </Modal>
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

export default ClientEdit