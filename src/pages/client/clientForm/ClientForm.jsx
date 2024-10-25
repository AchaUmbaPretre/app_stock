import React, { useEffect, useState } from 'react';
import './clientForm.scss';
import './../../../modalStyle.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Select from 'react-select';
import config from '../../../config';
import { CircularProgress } from '@mui/material';
import { Modal, Row, Col } from 'antd';

const ClientForm = ({fetchData, closeModal}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState({});
  const [province, setProvince] = useState([]);
  const [idProvince, setIdProvince] = useState([]);
  const [commune, setCommune] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const resetForm = () => {
    setData({
      nom: '',
      raison_sociale: '',
      email: '',
      telephone: '',
      avenue: '',
      quartier: '',
      id_province: '',
      id_commune: '',
      num: '',
    });
  };


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

  const handleOk = async () => {
    setIsModalVisible(false);
    try {
      setIsLoading(true);
      await axios.post(`${DOMAIN}/api/client/client`, {
        ...data,
        id_commune: data.commune,
      });
      Swal.fire({
        title: 'Success',
        text: 'Client crée avec succès!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      fetchData();
      closeModal();
      resetForm(); // Réinitialiser le formulaire après la soumission

    } catch (err) {
      if (err.response && err.response.status === 400 && err.response.data && err.response.data.message) {
        const errorMessage = `Le client ${data.nom} existe déjà avec ce numéro de téléphone`;
        Swal.fire({
          title: 'Erreur',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Erreur',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'OK',
        }); 
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = (e) => {
    e.preventDefault();
    if (!data.nom || !data.telephone || !data.id_province) {
      Swal.fire({
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs requis',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    setIsModalVisible(true);
  };

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

  useEffect(() => {
    setIdProvince(data?.id_province);
  }, [data?.id_province]);

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
  }, [DOMAIN, idProvince]);

  return (
    <>
      <div className="clientForm">
        <div className="product-container">
          <div className="product-container-top">
            <div className="product-left">
              <h2 className="product-h2">Un nouveau client</h2>
              <span>Créer un nouveau client</span>
            </div>
          </div>
          <div className="product-wrapper">
            <div className="product-container-bottom">
              <div className="form-controle">
                <label htmlFor="">Nom <span style={{ color: 'red' }}>*</span></label>
                <input type="text" value={data.nom || ''} name="nom" className="form-input" onChange={handleInputChange} required />
              </div>
              <div className="form-controle">
                <label htmlFor="">Raison sociale <span style={{ color: 'red' }}>*</span></label>
                <select id="" className="form-input" name="raison_sociale" onChange={handleInputChange} value={data.raison_sociale || ''}>
                  <option value="" disabled selected>Selectionnez une raison sociale</option>
                  <option value="Client VIP">client VIP</option>
                  <option value="Client Normal">client Normal</option>
                </select>
              </div>
              <div className="form-controle">
                <label htmlFor="">Email <span style={{ color: 'red' }}>*</span></label>
                <input type="email" value={data.email || ''} name="email" className="form-input" onChange={handleInputChange} />
              </div>
              <div className="form-controle">
                <label htmlFor="">Telephone <span style={{ color: 'red' }}>*</span></label>
                <input type="tel" value={data.telephone || ''} name="telephone" className="form-input" onChange={handleInputChange} required />
              </div>
              <div className="form-controle">
                <label htmlFor="">Ville <span style={{ color: 'red' }}>*</span></label>
                <Select
                  name="id_province"
                  options={province?.map(item => ({ value: item.id_province, label: item.nom_province }))}
                  onChange={selectedOption => handleInputChange({ target: { name: 'id_province', value: selectedOption.value } })}
                />
              </div>
              <div className="form-controle">
                <label htmlFor="">Avenue <span style={{ color: 'red' }}>*</span></label>
                <input type="text" name="avenue" value={data.avenue || ''} className="form-input" onChange={handleInputChange} />
              </div>
              <div className="form-controle">
                <label htmlFor="">Quartier <span style={{ color: 'red' }}>*</span></label>
                <input type="text" value={data.quartier || ''} name="quartier" className="form-input" onChange={handleInputChange} />
              </div>
              <div className="form-controle">
                <label htmlFor="">Commune <span style={{ color: 'red' }}>*</span></label>
                <Select
                  name="id_commune"
                  options={commune?.map(item => ({ value: item.id_commune, label: item.nom_commune }))}
                  onChange={selectedOption => handleInputChange({ target: { name: 'commune', value: selectedOption.value } })}
                />
              </div>
              <div className="form-controle">
                <label htmlFor="">N° <span style={{ color: 'red' }}>*</span></label>
                <input type="text" value={data.num || ''} name="num" className="form-input" onChange={handleInputChange} />
              </div>
            </div>

            <div className="form-submit">
              <button className="btn-submit" onClick={showModal} disabled={isLoading}>Envoyer</button>
              {isLoading && (
                <div className="loader-container loader-container-center">
                  <CircularProgress size={28} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Confirmation"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirmer"
        cancelText="Annuler"
        className="confirmation-modal"
      >
        <p className="modal-text">Êtes-vous sûr de vouloir enregistrer ces informations ?</p>
        <div className="modal-data">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <p><strong>Nom:</strong> {data.nom}</p>
            </Col>
            <Col span={12}>
              <p><strong>Raison sociale:</strong> {data.raison_sociale}</p>
            </Col>
            <Col span={12}>
              <p><strong>Email:</strong> {data.email}</p>
            </Col>
            <Col span={12}>
              <p><strong>Téléphone:</strong> {data.telephone}</p>
            </Col>
            <Col span={12}>
              <p><strong>Ville:</strong> {province.find(item => item.id_province === data.id_province)?.nom_province}</p>
            </Col>
            <Col span={12}>
              <p><strong>Avenue:</strong> {data.avenue}</p>
            </Col>
            <Col span={12}>
              <p><strong>Quartier:</strong> {data.quartier}</p>
            </Col>
            <Col span={12}>
              <p><strong>Commune:</strong> {commune.find(item => item.id_commune === data.commune)?.nom_commune}</p>
            </Col>
            <Col span={12}>
              <p><strong>N°:</strong> {data.num}</p>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
}

export default ClientForm;
