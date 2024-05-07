import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { CircularProgress } from '@mui/material';

const FormDepenses = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [catDepenses, setCatDepenses] = useState([]);
  const [livreur, setLivreur] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

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

    // Convertir le montant en dollars
    if (fieldName === "montant") {
      const tauxDeChange = 0.00036364; // Remplacez par le taux de change franc-dollar actuel
      const montantEnDollars = fieldValue * tauxDeChange;
      updatedValue = montantEnDollars.toFixed(2); // Arrondir à deux décimales en dollars
    }

    setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/depenses`, {
        ...data,
        date_depense: date,
      });
      Swal.fire({
        title: 'Success',
        text: 'La categorie de dépenses a été enregistrée avec succès.!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      window.location.reload();
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
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

  console.log(data)
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
              <label htmlFor="">Montant</label>
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
              <label htmlFor="">Montant en dollars</label>
              <input
                type="number"
                name="device"
                style={{
                  padding: '8px 10px',
                  border: '1px solid #c5c5c5',
                  outline: 'none',
                  borderRadius: '5px',
                }}
                min={0}
                value={data.montant}
                disabled
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
              <button className="btn-submit" onClick={handleClick}>
                Envoyer
              </button>
              <button
                className="btn-submit btn-annuler"
                onClick={() => window.location.reload()}
              >
                Annuler
              </button>
              {loading && (
                <div className="loader-container loader-container-center">
                  <CircularProgress size={30} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormDepenses;