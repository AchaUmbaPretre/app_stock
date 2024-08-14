import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import Select from 'react-select';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { Modal, Button, notification } from 'antd';
import { ToastContainer } from 'react-toastify';

const FormDepenses = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false); // Track submission state
  const [data, setData] = useState({});
  const [catDepenses, setCatDepenses] = useState([]);
  const [livreur, setLivreur] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const userId = useSelector((state) => state.user?.currentUser.id);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

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
    if (submitting) return; // Prevent multiple submissions

    try {
      setSubmitting(true); // Set submitting to true
      setLoading(true);
      await axios.post(`${DOMAIN}/api/depenses`, {
        ...data,
        date_depense: date,
        user_cr: userId
      });
      notification.success({
        message: 'Success',
        description: 'La catégorie de dépenses a été enregistrée avec succès!',
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
      setSubmitting(false); // Reset submitting state
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) {
      setConfirmVisible(true);
    }
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/depenses/catDepenses`);
        setCatDepenses(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/user/getUser`);
        setLivreur(data);
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
              <label htmlFor="">Personnels</label>
              <Select
                name="id_livreur"
                options={livreur?.map((item) => ({
                  value: item.id,
                  label: item.username,
                }))}
                onChange={(selectedOption) =>
                  handleInputChange({
                    target: { name: 'id_livreur', value: selectedOption.value },
                  })
                }
                placeholder="Sélectionnez un agent..."
              />
            </div>
            <div className="form-controle-desc">
              <label htmlFor="">Catégorie de dépenses</label>
              <Select
                name="id_catDepense"
                options={catDepenses?.map((item) => ({
                  value: item.id_catDepense,
                  label: item.nom,
                }))}
                onChange={(selectedOption) =>
                  handleInputChange({
                    target: { name: 'id_catDepense', value: selectedOption.value },
                  })
                }
                placeholder="Sélectionnez une catégorie..."
              />
            </div>
            <div className="form-controle-desc">
              <label htmlFor="">Date</label>
              <input
                type="date"
                name="date_depense"
                value={date}
                style={{
                  padding: '8px 10px',
                  border: '1px solid #c5c5c5',
                  outline: 'none',
                  borderRadius: '5px',
                }}
                onChange={handleDateChange}
              />
            </div>
            <div className="form-controle-desc">
              <label htmlFor="">Montant en USD</label>
              <input
                type="number"
                name="montant"
                style={{
                  padding: '8px 10px',
                  border: '1px solid #c5c5c5',
                  outline: 'none',
                  borderRadius: '5px',
                }}
                min={0}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-controle-desc">
              <label htmlFor="">Montant en francs</label>
              <input
                type="number"
                name="montant_franc"
                style={{
                  padding: '8px 10px',
                  border: '1px solid #c5c5c5',
                  outline: 'none',
                  borderRadius: '5px',
                }}
                min={0}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-controle-desc">
              <label htmlFor="">Description</label>
              <textarea
                name="description"
                placeholder="Description....."
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-submit">
              <button
                className="btn-submit"
                onClick={handleSubmit}
                disabled={loading} // Disable button when loading
              >
                {loading ? <CircularProgress size={24} /> : 'Envoyer'}
              </button>
              <button
                className="btn-submit btn-annuler"
                onClick={() => window.location.reload()}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Confirmer la commande"
        visible={confirmVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="Confirmer"
        cancelText="Annuler"
        className="confirmation-modal"
        okButtonProps={{ 
          disabled: submitting, // Disable confirm button while submitting
          children: submitting ? <CircularProgress size={24} /> : 'Confirmer' // Show CircularProgress if submitting
        }}
      >
        <p className="modal-text">Êtes-vous sûr de vouloir soumettre cette commande avec les informations suivantes ?</p>
        <ul className="modal-data">
          <li>Personnels: {livreur.find(item => item.id === data.id_livreur)?.username || 'N/A'}</li>
          <li>Catégorie de dépenses: {catDepenses.find(item => item.id_catDepense === data.id_catDepense)?.nom || 'N/A'}</li>
          <li>Date: {date}</li>
          <li>Montant en USD: {data.montant || 'N/A'}</li>
          <li>Montant en francs: {data.montant_franc || 'N/A'}</li>
          <li>Description: {data.description || 'N/A'}</li>
        </ul>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default FormDepenses;
