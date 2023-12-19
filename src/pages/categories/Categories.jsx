import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PlusOutlined, SearchOutlined, SisternodeOutlined,EyeOutlined, FilePdfOutlined, FileExcelOutlined,EditOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import { Button, Input, Space, Table, Popover,Popconfirm,Modal} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import './categories.scss'
import config from '../../config';
import Swal from 'sweetalert2';
import axios from 'axios';
import FormCategorie from './formCategorie/FormCategorie';

const Categories = () => {
    const navigate = useNavigate();
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [nomCategorie, setNomCategorie] = useState();
    const [getCategorie, setGetCategorie] = useState();
    const [putCategorie, setPutCategorie] = useState()
    const searchInput = useRef(null);
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const {pathname} = useLocation();
    const [initialData, setInitialData] = useState({});
    const id = pathname.split('/')[2]
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    

    const showModal = (id) => {
      setOpen(true);
      navigate(`/categories/${id}`);
    };

    const handleOk  = async (e) => {
      e.preventDefault();
  
      Swal.fire({
        title: 'Confirmation',
        text: 'Voulez-vous vraiment modifier ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non',
      }).then((result) => {
        if (result.isConfirmed) {
          const hasChanged = hasDataChanged();
          if (hasChanged) {
            handleClick2();
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Aucune modification',
              text: 'Vous aviez rien modifié.',
            });
            setOpen(false);
          }
        }
      });
    };
  
    const hasDataChanged = () => {
      return putCategorie.nom_categorie !== initialData.nom_categorie;
    };
  
    const handleClick2 = async (e) => {
        try{
          await axios.put(`${DOMAIN}/api/produit/categoriePut/${id}`,{nom_categorie : putCategorie})
      
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
    const handleCancel = () => {
      setOpen(false);
    };
  

      const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width: '8%' },
        {
            title: 'Categorie',
            dataIndex: 'nom_categorie',
            key: 'categorie',
        },
        {
            title: 'Action',
            key: 'action',
            width: '20%',
            render: (text, record) => (
                
              <Space size="middle">
                  <Button icon={<EditOutlined />} style={{ color: 'green' }} onClick={()=>showModal(record.id)} />
                <Popconfirm
                  title="Êtes-vous sûr de vouloir supprimer?"
                  onConfirm={() => handleDelete(record.id)}
                  okText="Oui"
                  cancelText="Non"
                >
                  <Button icon={<DeleteOutlined />} style={{ color: 'red' }}  />
                </Popconfirm>
              </Space>
            ),
          },
      ];

      const handleClick = async (e) => {
        e.preventDefault();

        try{
          await axios.post(`${DOMAIN}/api/produit/categorie`, {nom_categorie : nomCategorie})
          Swal.fire({
            title: 'Success',
            text: 'Categorie créé avec succès!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
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
            const { data } = await axios.get(`${DOMAIN}/api/produit/categorie`);
            setGetCategorie(data);
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
            const { data } = await axios.get(`${DOMAIN}/api/produit/categorieOne/${id}`);
            setPutCategorie(data[0]);
            setInitialData(data[0]);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [])
    
    const handleDelete = async (id) => {
     try {
        await axios.delete(`${DOMAIN}/api/produit/categorie/${id}`);
          window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };

    const filteredData = getCategorie?.filter((item) =>
    item.nom_categorie.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <>
        <div className="categories">
            <div className="categories-wrapper">
                <div className="categorie-container-top">
                    <div className="categorie-left">
                        <h2 className="categorie-h2">Categorie</h2>
                        <span>Liste des categories</span>
                    </div>
                </div>
                <div className="categorie-container-bottom">
                    <div className="categorie-container-left">
                        <h2 className="categorie-title">Ajouter une categorie</h2>
                        <input type="text" name='nom_categorie' onChange={(e)=> setNomCategorie(e.target.value)} placeholder='Entrer une categorie...' className="categorie-input" />
                        <button className="categorie-btn" onClick={handleClick}>Envoyer</button>
                    </div>
                    <div className="categorie-container-right">
                        <div className="categorie-right-top">
                            <div className="categorie-left">
                                <FilePdfOutlined className='product-icon-pdf' />
                                <FileExcelOutlined className='product-icon-excel'/>
                                <PrinterOutlined className='product-icon-printer'/>
                            </div>
                            <div className="categorie-right">
                                <input type="search" name="" id="" placeholder='Recherche...' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className='categorie-search' />
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
                            <FormCategorie getUpdata={setPutCategorie} getUpdataOne={putCategorie} />
                          </Modal>
                          <Table columns={columns} loading={loading} dataSource={filteredData} scroll={scroll} pagination={{ pageSize: 5}} />
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </>
  )
}

export default Categories