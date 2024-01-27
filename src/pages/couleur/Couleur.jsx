import { useLocation, useNavigate } from 'react-router-dom';
import {  FilePdfOutlined, FileExcelOutlined,EditOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import { Button, Space, Table, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import Swal from 'sweetalert2';

const Couleur = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [getdata, setGetData] = useState([]);
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [putEmplacement, setPutEmplacement] = useState({});
    const {pathname} = useLocation();
    const [searchValue, setSearchValue] = useState('');
    const id = pathname.split('/')[2]
    const [loading, setLoading] = useState(true);

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
    };

    const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
        {
            title: 'Nom couleur',
            dataIndex: 'description',
            key: 'description',
            
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (text, record) => (
                
              <Space size="middle">
                 {/*  <Button icon={<EditOutlined />} style={{ color: 'green' }}  onClick={()=>showModal(record.id)} /> */}
                <Popconfirm
                  title="Êtes-vous sûr de vouloir supprimer?"
                  onConfirm={() => handleDelete(record.id_delete)}
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
        await axios.delete(`${DOMAIN}/api/produit/couleur/${id}`);
          window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`${DOMAIN}/api/produit/couleur`);
          setGetData(data);
          setLoading(false)
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [DOMAIN]);

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
    }, [DOMAIN,id])

    const handleClick = async (e) => {
      e.preventDefault();

      if (!data.description) {
        Swal.fire({
          title: 'Error',
          text: 'Veuillez remplir le champ couleur',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        return;
      }
      try {
        await axios.post(`${DOMAIN}/api/produit/couleur`,data)
          Swal.fire({
            title: 'Success',
            text: 'La couleur créée avec succès!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          window.location.reload();
        
      } catch (error) {
        
      }
    }

    const filteredData = getdata?.filter((item) =>
    item.description.toLowerCase().includes(searchValue.toLowerCase())
    )

  return (
    <>
        <div className="emplacements">
            <div className="categories-wrapper">
                <div className="categorie-container-top">
                    <div className="categorie-left">
                        <h2 className="categorie-h2">Couleur</h2>
                        <span>Liste des couleurs</span>
                    </div>
                </div>
                <div className="categorie-container-bottom">
                    <div className="categorie-container-left">
                        <h2 className="categorie-title">Ajouter une couleur</h2>
                        <div className="categorie-form">
                            <label htmlFor="">Nom</label>
                            <input type="text" className="input-form" name='description' placeholder='Entrer le nom de couleur...' onChange={handleInputChange} />
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
                            <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 5}} />
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </>
  )
}

export default Couleur