import { PlusOutlined, SearchOutlined, SisternodeOutlined,PlusCircleOutlined, FilePdfOutlined, FileExcelOutlined,EditOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Popover,Popconfirm, Tag, Modal} from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format, isValid } from 'date-fns';
import Swal from 'sweetalert2';
import config from '../../../config';

const ListeDetailCommande = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const searchInput = useRef(null);
    const scroll = { x: 400 };
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]
    const [getVente, setGetVente] = useState({});
    const [open, setOpen] = useState(false);


      const showModal = (id) => {
        setOpen(true);
        navigate(`/ventes/${id}`);
      };
      const handleCancel = () => {
        setOpen(false);
      };
    
      const handleDelete = async (id) => {
      try {
          await axios.put(`${DOMAIN}/api/vente/venteDelete/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };
    
      const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width:"3%"},
        {
            title: 'Commande',
            dataIndex: 'id_commande',
            key: 'id_commande'
          },
        {
          title: 'Produit',
          dataIndex: 'id_varianteProduit',
          key: 'id_produit'
        },
        {
          title: 'Quantité',
          dataIndex: 'quantite',
          key: 'quantite'
        },
        {
          title: 'Prix',
          dataIndex: 'prix',
          key: 'prix'
        },
        {
            title: 'Date demande & heure',
            dataIndex: 'date_demande',
            key: 'date_demande',
            render: (text) => {
              const formattedDate = format(new Date(text), 'dd-MM-yyyy HH:mm:ss');
              return <span>{formattedDate}</span>;
            },
          },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Oui"
                    cancelText="Non"
                  >
                    <Button icon={<DeleteOutlined />} style={{ color: 'red' }} />
                  </Popconfirm>
                </Popover>
              </Space>
            ),
          },
      ];

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/commande/detail-commande`);
            setData(data);
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
            const { data } = await axios.get(`${DOMAIN}/api/vente/venteOne/${id}`);
            setGetVente(data[0]);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [id]);


  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste du detail des commandes</h2>
                        <span>Voir le detail des commandes</span>
                    </div>
                   {/*  <div className="product-right" onClick={() =>navigate('/ventesForm')}>
                        <PlusOutlined />
                        <span className="product-btn">voir les commandes</span>
                    </div> */}
                </div>
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                            <SisternodeOutlined className='product-icon' />
                            <div className="product-row-search">
                                <SearchOutlined className='product-icon-plus'/>
                                <input type="search" name="" id="" placeholder='Recherche...' className='product-search' />
                            </div>
                        </div>
                        <div className="product-bottom-right">
                            <FilePdfOutlined className='product-icon-pdf' />
                            <FileExcelOutlined className='product-icon-excel'/>
                            <PrinterOutlined className='product-icon-printer'/>
                        </div>
                    </div>
                    <div className="rowChart-row-table">
{/*                         <Modal
                          title="Modifier la vente"
                          centered
                          open={open}
                          onOk={handleOk}
                          onCancel={() => setOpen(false)}
                          width={860}
                          okText="Soumettre"
                          cancelText="Annuler"
                        >
                         <FormVenteEdit getVente={getVente} setGetVente={setGetVente} />
                        </Modal> */}
                        <Table columns={columns} dataSource={data} loading={loading} scroll={scroll} pagination={{ pageSize: 5}} />
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default ListeDetailCommande