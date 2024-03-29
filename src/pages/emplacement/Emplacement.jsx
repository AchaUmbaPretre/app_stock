import { useLocation, useNavigate } from 'react-router-dom';
import {  EditOutlined,DeleteOutlined} from '@ant-design/icons';
import { Button, Space, Table, Popconfirm,Modal} from 'antd';
import React, { useEffect, useState } from 'react';
import './emplacement.scss'
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import config from '../../config';
import Swal from 'sweetalert2';
import FormEmplacement from './formEmplacement/FormEmplacement';

const Emplacement = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [getdata, setGetData] = useState([]);
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [putEmplacement, setPutEmplacement] = useState({});
    const {pathname} = useLocation();
    const [searchValue, setSearchValue] = useState('');
    const id = pathname.split('/')[2]
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const showModal = (id) => {
      setOpen(true);
      navigate(`/emplacement/${id}`);
    };
    const handleCancel = () => {
      setOpen(false);
    };

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
    setPutEmplacement((prev) => ({ ...prev, [fieldName]: updatedValue }))
    };

    const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
        {
            title: 'Shop',
            dataIndex: 'shop',
            key: 'shop',
            
        },
        {
          title: 'Adresse',
          dataIndex: 'adresse',
          key: 'adresse',
          
      },
        {
            title: 'Capacité disponible',
            dataIndex: 'capacite',
            key: 'capacite',
            
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (text, record) => (
                
              <Space size="middle">
                  <Button icon={<EditOutlined />} style={{ color: 'green' }}  onClick={()=>showModal(record.id)} />
                <Popconfirm
                  title="Êtes-vous sûr de vouloir supprimer?"
                  onConfirm={() => handleDelete(record.id_emplacement)}
                  okText="Oui"
                  cancelText="Non"
                >
                  <Button icon={<DeleteOutlined />} style={{ color: 'red' }} />
                </Popconfirm>
              </Space>
            ),
          },
    ];
    
    const handleDelete = async (id) => {
     try {
        await axios.delete(`${DOMAIN}/api/produit/emplacement/${id}`);
          window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`${DOMAIN}/api/produit/emplacement`);
          setGetData(data);
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
          const { data } = await axios.get(`${DOMAIN}/api/produit/emplacementOne/${id}`);
          setPutEmplacement(data[0]);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [])

    const handleClick = async (e) => {
      e.preventDefault();

      try {
        setIsLoading(true);
        await axios.post(`${DOMAIN}/api/produit/emplacement`,data)
          Swal.fire({
            title: 'Success',
            text: 'Emplacement créé avec succès!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          window.location.reload();
        
      } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
      }
      finally {
        setIsLoading(false);
      }
    }

    const handleOk = async (e) => {
      try{
        await axios.put(`${DOMAIN}/api/produit/emplacementPut/${id}`,putEmplacement)

        Swal.fire({
          title: 'Success',
          text: "L'emplacement a été modifié avec succès!",
          icon: 'success',
          confirmButtonText: 'OK',
        });
    
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
    }, 2000);
        window.location.reload();

      }catch(err) {
        Swal.fire({
          title: 'Error',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
  };
  

  return (
    <>
        <div className="emplacements">
            <div className="categories-wrapper">
                <div className="categorie-container-top">
                    <div className="categorie-left">
                        <h2 className="categorie-h2">Emplacement</h2>
                        <span>Liste des emplacements</span>
                    </div>
                </div>
                <div className="categorie-container-bottom">
                    <div className="categorie-container-left">
                        <h2 className="categorie-title">Ajouter emplacement</h2>
                        <div className="categorie-form">
                            <label htmlFor="">Shop</label>
                            <input type="text" className="input-form" name='shop' placeholder='Entrer le nom du shop' onChange={handleInputChange} />
                        </div>
                        <div className="categorie-form">
                            <label htmlFor="">Adresse</label>
                            <input type="text" className="input-form" name='adresse' placeholder="Entrez l'adresse.." onChange={handleInputChange} />
                        </div>
                        <div className="categorie-form">
                            <label htmlFor="">Capacité maximale</label>
                            <input type="number" className="input-form" name='capacite' placeholder='ex: 10' onChange={handleInputChange} />
                        </div>
                        <button className="categorie-btn" onClick={handleClick} disabled={isLoading} >Envoyer</button>
                        {isLoading && (
                            <div className="loader-container loader-container-center">
                              <CircularProgress size={28} />
                            </div>
                        )}
                    </div>
                    <div className="categorie-container-right">
                        <div className="categorie-right-top">
                            <div className="categorie-right">
                                <input type="search"  value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Recherche...' className='categorie-search' />
                            </div>
                        </div>
                        <div className="categorie-right-bottom">
                            <Modal
                              title="Modifier la categorie"
                              open={open}
                              onOk={handleOk}
                              confirmLoading={confirmLoading}
                              onCancel={handleCancel}
                              okText="Confirmer"
                              cancelText="Annuler"
                            >
                              <FormEmplacement  setUpdata={setPutEmplacement} getUpdataOne={putEmplacement} OnchangePut={handleInputChange} />
                            </Modal>
                            <Table columns={columns} dataSource={getdata} loading={loading} scroll={scroll} pagination={{ pageSize: 5}} />
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </>
  )
}

export default Emplacement