import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FilePdfOutlined, FileExcelOutlined,EditOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import { Button, Input, Space, Table, Popover,Popconfirm,Modal} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../../config';
import FormMarque from './formMarque/FormMarque';

const Marque = () => {
    const navigate = useNavigate();
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [nomMarque, setNomMarque] = useState();
    const [getMarque, setGetMarque] = useState();
    const [putMarque, setPutMarque] = useState();
    const [open, setOpen] = useState(false);
    const scroll = { x: 400 };
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [searchValue, setSearchValue] = useState('');
  
      const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width: '8%' },
        {
          title: 'Marque',
          dataIndex: 'nom',
          key: 'nom', 
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
                  <Button icon={<DeleteOutlined />} style={{ color: 'red' }} />
                </Popconfirm>
              </Space>
            ),
          },
      ];

      const showModal = (id) => {
        setOpen(true);
        navigate(`/marque/${id}`);
      };
      const handleCancel = () => {
        setOpen(false);
      };

      const handleInputChange = (e) => {
        const value = e.target.value;
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        setNomMarque(capitalizedValue);
        setPutMarque(capitalizedValue);
      };

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/marqueOne/${id}`);
            setPutMarque(data[0]);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [id])
      const handleOk = async (e) => {
        try{
          await axios.put(`${DOMAIN}/api/produit/marque/${id}`,{nom : putMarque})
  
          Swal.fire({
            title: 'Success',
            text: "La marque a été modifiée avec succès!",
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
      const handleClick = async (e) => {
        e.preventDefault();

        try{
          await axios.post(`${DOMAIN}/api/produit/marque`, {nom : nomMarque})
          Swal.fire({
            title: 'Success',
            text: 'Marque créé avec succès!',
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
            const { data } = await axios.get(`${DOMAIN}/api/produit/marque`);
            setGetMarque(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);
    
    const handleDelete = async (id) => {
     try {
        await axios.delete(`${DOMAIN}/api/produit/marque/${id}`);
          window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };

    const filteredData = getMarque?.filter((item) =>
    item.nom.toLowerCase().includes(searchValue.toLowerCase())
    )

  return (
    <>
        <div className="categories">
            <div className="categories-wrapper">
                <div className="categorie-container-top">
                    <div className="categorie-left">
                        <h2 className="categorie-h2">Marque</h2>
                        <span>Liste des marques</span>
                    </div>
                </div>
                <div className="categorie-container-bottom">
                    <div className="categorie-container-left">
                        <h2 className="categorie-title">Ajouter une marque</h2>
                        <input type="text" name='nom' onChange={handleInputChange} value={nomMarque} placeholder='Entrer une marque...' className="categorie-input" />
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
                              <input type="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Recherche...' className='categorie-search' />
                            </div>
                        </div>
                        <div className="categorie-right-bottom">
                            <Modal
                              title="Modifier une marque"
                              open={open}
                              onOk={handleOk}
                              confirmLoading={confirmLoading}
                              onCancel={handleCancel}
                              okText="Confirmer"
                              cancelText="Annuler"
                            >
                              <FormMarque  setUpdata={setPutMarque} getUpdataOne={putMarque} OnchangePut={handleInputChange} />
                            </Modal>
                            <Table columns={columns} dataSource={filteredData} scroll={scroll} pagination={{ pageSize: 5}} />
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </>
  )
}

export default Marque