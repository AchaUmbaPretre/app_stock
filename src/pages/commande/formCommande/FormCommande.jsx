import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Select from 'react-select';
import config from '../../../config';

const FormCommande = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState({})
  const navigate = useNavigate();
  const [province, setProvince] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getClient, setGetClient] = useState([]);
  const [getStatut, setGetStatut] = useState([]);
  const [checkeds, setCheckeds] = useState(false);
  const [idProvince, setIdProvince] = useState([]);
  const [commune, setCommune] = useState([]);

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
      await axios.post(`${DOMAIN}/api/commande/commandePost`, data)
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

  const handleClick2 = async (e) => {
    e.preventDefault();

    try{
      await axios.post(`${DOMAIN}/api/client/client`, data)
      Swal.fire({
        title: 'Success',
        text: 'Client crée avec succès!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      setCheckeds(false)
      navigate('/commandeForm')
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/commande/statut`);
        setGetStatut(data);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/client/province`);
        setProvince(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleCheck = (e) => {
    if(e.target.checked){
      setCheckeds(true)
    } else{
      setCheckeds(false)
    }
  }

  useEffect(()=>{
    setIdProvince(data?.id_province)
  },[data?.id_province])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/client/commune/${idProvince}`);
        setCommune(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [idProvince]);


  return (
    <>
        <div className="clientForm">
          <div className="product-container">
            <div className="product-container-top">
              <div className="product-left">
                <h2 className="product-h2">Creer une nouvelle commande</h2>
                <span>nouvelle commande</span>
              </div>
            </div>
            <div className="product-wrapper">
              <div className="product-container-bottom">
                <div className="form-controle">
                  <label htmlFor="">Client</label>
{/*                   <select name="id_client" id="id_client" className="form-input" onChange={handleInputChange}  required>
                    <option>Sélectionnez un client</option>
                        { getClient.map((dd)=>(
                    <option value={dd.id}>{dd.nom}</option>
                        ))}
                </select> */}
                <Select
                  name="id_client"
                  options={getClient?.map(item => ({ value: item.id, label: item.nom }))}
                  onChange={selectedOption => handleInputChange({ target: { name: 'id_client', value: selectedOption.value } })}
                />
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <label htmlFor="" style={{fontSize: '12px'}}>cliquez ici pour ajouter un client  </label>
                <input type="checkbox" onChange={handleCheck} />
                </div>
                { checkeds &&
                <div className="rows-client">
                  <div className="product-container-bottom">
                    <div className="form-controle">
                      <label htmlFor="">Nom</label>
                      <input type="text" name='nom' className="form-input" onChange={handleInputChange}  required/>
                    </div>
                    <div className="form-controle">
                      <label htmlFor="">Raison sociale</label>
                      <select id="" className="form-input" name="raison_sociale" onChange={handleInputChange} required>
                        <option value="" disabled selected>Selectionnez une raison sociale</option>
                        <option value="Client VIP">client VIP</option>
                        <option value="Client Normal">client Normal</option>
                      </select>
                    </div>
                    <div className="form-controle">
                      <label htmlFor="">Email</label>
                      <input type="email" name='email' className="form-input" onChange={handleInputChange} />
                    </div>
                    <div className="form-controle">
                      <label htmlFor="">Telephone</label>
                      <input type="tel" name='telephone' className="form-input" onChange={handleInputChange} required />
                    </div>
                    <div className="form-controle">
                      <label htmlFor="">Ville</label>
                      <Select
                        name="id_province"
                        options={province?.map(item => ({ value: item.id_province, label: item.nom_province }))}
                        onChange={selectedOption => handleInputChange({ target: { name: 'id_province', value: selectedOption.value } })}
                      />
                    </div>
                    <div className="form-controle">
                      <label htmlFor="">Commune</label>
                      <Select
                        name="id_commune"
                        options={commune?.map(item => ({ value: item.id_commune, label: item.nom_commune }))}
                        onChange={selectedOption => handleInputChange({ target: { name: 'commune', value: selectedOption.value } })}
                      />
                    </div>
                    <div className="form-controle">
                      <label htmlFor="">Avenue</label>
                      <input type="text" name="avenue" className="form-input" onChange={handleInputChange} />
                    </div>
                    <div className="form-controle">
                      <label htmlFor="">Quartier</label>
                      <input type="text" name="quartier" className="form-input" onChange={handleInputChange} />
                    </div>
                    <div className="form-controle">
                      <label htmlFor="">N°</label>
                      <input type="number" name="num" className="form-input" onChange={handleInputChange} />
                    </div>
                    <button className="btn-submit" onClick={handleClick2} style={{border: 'none', height: "50px", marginTop: '35px', background:'rgb(1, 35, 138)',color:'#fff', borderRadius: '5px',cursor:'pointer'}}>Envoyer</button>
                  </div>
                </div> }
                </div>
                <div className="form-controle">
                  <label htmlFor="">Shop</label>
                  <input type="text" name='id_shop' className="form-input" onChange={handleInputChange}/>
                </div>
              </div>
              <div className="form-submit">
                <button className="btn-submit" onClick={handleClick}>Envoyer</button>
                <button className="btn-submit btn-annuler" onClick={()=> window.location.reload()}>Annuler</button>
              </div>
            </div>
          </div>
        </div>

    </>
  )
}

export default FormCommande