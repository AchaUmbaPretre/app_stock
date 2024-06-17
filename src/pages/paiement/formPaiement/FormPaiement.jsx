import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import Select from 'react-select';
import { CircularProgress } from '@mui/material';
import { Modal, notification } from 'antd';

const FormPaiement = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [getClient, setGetClient] = useState([]);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    let fieldValue = e.target.value;

    let updatedValue = fieldValue;

    if (fieldName === "contact_email") {
      updatedValue = fieldValue.toLowerCase();
    } else if (Number.isNaN(Number(fieldValue))) {
      if (fieldValue) {
        updatedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
      }
    }

    setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/vente/vente/paiement`, data);
      notification.success({
        message: 'Success',
        description: 'Le paiement a été enregistré avec succès!',
      });
      setConfirmVisible(false);
      window.location.reload();
    } catch (err) {
      notification.error({
        message: 'Error',
        description: `Erreur: ${err.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmVisible(true);
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/commande`);
        setGetClient(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [DOMAIN]);

  return (
    <>
      <div className="formCatDepense">
        <div className="product-container">
          <div className="product-wrapper">
            <div className="form-controle-desc">
              <label htmlFor="">Client(e)</label>
              <Select
                name="id_commande"
                options={getClient?.map(item => ({ value: item.id_commande, label: `${item.nom}/ commande N°${item.id_commande}`}))}
                onChange={selectedOption => {
                  const selectedIdCommande = selectedOption.value;
                  const selectedIdClient = getClient.find(item => item.id_commande === selectedIdCommande)?.id_client;
                  handleInputChange({ target: { name: 'id_commande', value: selectedIdCommande } });
                  handleInputChange({ target: { name: 'id_client', value: selectedIdClient } });
                }}
              />
            </div>
            <div className="form-controle-desc">
              <label htmlFor="">Montant</label>
              <input type="number" name='montant' style={{padding:'8px 10px', border:'1px solid #c5c5c5', outline:'none', borderRadius:'5px'}} min={0} onChange={handleInputChange} />
            </div>
            <div className="form-submit">
              <button className="btn-submit" onClick={handleSubmit}>Envoyer</button>
              <button className="btn-submit btn-annuler" onClick={()=> window.location.reload()}>Annuler</button>
              {loading && (
                <div className="loader-container loader-container-center">
                  <CircularProgress size={30} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Confirmer le paiement"
        visible={confirmVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="Confirmer"
        cancelText="Annuler"
        className="confirmation-modal"
      >
        <p className="modal-text">Êtes-vous sûr de vouloir soumettre ce paiement avec les informations suivantes ?</p>
        <ul className="modal-data">
          <li>Client: {getClient.find(item => item.id_commande === data.id_commande)?.nom || 'N/A'}</li>
          <li>Commande N°: {data.id_commande || 'N/A'}</li>
          <li>Montant: {`${data.montant} $` || 'N/A'}</li>
        </ul>
      </Modal>
    </>
  );
};

export default FormPaiement;
