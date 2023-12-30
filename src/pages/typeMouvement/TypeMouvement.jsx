import { Link, useLocation, useNavigate } from 'react-router-dom';
import {  FilePdfOutlined, FileExcelOutlined,EditOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import { Button, Input, Space, Table, Popover,Popconfirm,Modal} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import Swal from 'sweetalert2';
import { getDate } from 'date-fns';

const TypeMouvement = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [getdata, setGetData] = useState([]);
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [putEmplacement, setPutEmplacement] = useState({});
    const [getType, setGetType] = useState([]);
    const {pathname} = useLocation();
    const [searchValue, setSearchValue] = useState('');
    const id = pathname.split('/')[2]

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

    console.log(data)

    const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
        {
          title: 'Type du mouvement',
          dataIndex: 'type_mouvement',
          key: 'type_mouvement',
          
        },
        {
            title: 'Categorie du mouvement',
            dataIndex: 'nom_categorie',
            key: 'nom_categorie',
            
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (text, record) => (
                
              <Space size="middle">
                  <Button icon={<EditOutlined />} style={{ color: 'green' }}  onClick={()=>showModal(record.id_type_mouvement)} />
                <Popconfirm
                  title="Êtes-vous sûr de vouloir supprimer?"
                  onConfirm={() => handleDelete(record.id_type_mouvement)}
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
          const { data } = await axios.get(`${DOMAIN}/api/produit/typeCat`);
          setGetType(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`${DOMAIN}/api/produit/typeMouvement`);
          setGetData(data);
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
        await axios.post(`${DOMAIN}/api/produit/typeMouvement`,data)
          Swal.fire({
            title: 'Success',
            text: 'Type du mouvement créé avec succès!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          window.location.reload();
        
      } catch (error) {
        
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
/*   const filteredData = getdata?.filter((item) =>
  item.type_mouvement.toLowerCase().includes(searchValue.toLowerCase())
); */

  return (
    <>
        <div className="emplacements">
            <div className="categories-wrapper">
                <div className="categorie-container-top">
                    <div className="categorie-left">
                        <h2 className="categorie-h2">Type des mouvements</h2>
                        <span>Liste des types de mouvements</span>
                    </div>
                </div>
                <div className="categorie-container-bottom">
                    <div className="categorie-container-left">
                        <h2 className="categorie-title">Ajouter les types des mouvements</h2>
                        <div className="categorie-form">
                            <label htmlFor="">Ajoutez un type du mouvement</label>
                            <input type="text" className="input-form" name='type_mouvement' placeholder='Entrer le type des mouvements..' onChange={handleInputChange} />
                        </div>
                        <div className="categorie-form">
                            <label htmlFor="">Ajoutez une categorie du mouvement</label>
                            <select name="categorie_mouvement" className="input-form" onChange={handleInputChange}>
                              <option value="" selected>Sélectionnez une categorie</option>
                              {getType?.map((dd)=>(
                                <option value={dd.id_cat_mouvement}>{dd.nom_categorie}</option>
                              ))}
                            </select>
                        </div>
                        <button className="categorie-btn" onClick={handleClick} >Envoyer</button>
                    </div>
                    <div className="categorie-container-right">
                        <div className="categorie-right-top">
                            <div className="categorie-left">
                                <FilePdfOutlined className='product-icon-pdf' />
                                <FileExcelOutlined className='product-icon-excel'/>
                                <PrinterOutlined className='product-icon-printer'/>
                            </div>
                            <div className="categorie-right">
                                <input type="search"  value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Recherche...' className='categorie-search' />
                            </div>
                        </div>
                        <div className="categorie-right-bottom">
                            <Table columns={columns} dataSource={getdata} scroll={scroll} pagination={{ pageSize: 8}} />
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </>
  )
}

export default TypeMouvement