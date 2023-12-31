import { PlusOutlined, SearchOutlined, EyeOutlined, SisternodeOutlined,PlusCircleOutlined, FilePdfOutlined, FileExcelOutlined,EditOutlined, PrinterOutlined, DeleteOutlined,  ExclamationCircleOutlined, CheckCircleOutlined} from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Popover,Popconfirm, Tag, Modal} from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import config from '../../../config';

const ListeCommande = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
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
          await axios.put(`${DOMAIN}/api/commande/commande/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };

      const handleEdit = (id) => {
        navigate(`/Editcommande/${id}`);
    };
    
      const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width:"3%"},
        {
          title: 'id_commande',
          dataIndex: 'id_commande',
          key: 'id_commande'
        },
        {
            title: 'Client',
            dataIndex: 'nom',
            key: 'id_client'
        },
        {
          title: 'Date commande',
          dataIndex: 'date_commande',
          key: 'date_commande',
          render: (text) => (
            <span>
              {format(new Date(text), 'dd-MM-yyyy')}
            </span>
          ),
        },
        {
            title: 'Status',
            dataIndex: 'nom_statut',
            key: 'prenom',
            render: (text) => {
              let tagColor = '';
              let icon = null;
        
              if (text === 'Non-validé') {
                tagColor = 'red';
                icon = <ExclamationCircleOutlined />;
              } else if (text === 'Validé') {
                tagColor = 'green';
                icon = <CheckCircleOutlined />;
              }
        
              return (
                <Tag color={tagColor}>
                  {icon} {text}
                </Tag>
              );
            },
          },
        {
          title: 'Livraison',
          dataIndex: 'id_livraison',
          key: 'id_livraison'
        },
        {
          title: 'Paiement',
          dataIndex: 'id_paiement',
          key: 'id_paiement'
        },
        {
            title: 'Shop',
            dataIndex: 'id_shop',
            key: 'id_shop',
        },
        {
            title: 'Paye',
            dataIndex: 'paye',
            key: 'paye',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
                <Popover title="Modifier" trigger="hover">
                  <Button icon={<EditOutlined />} style={{ color: 'green' }} onClick={()=> handleEdit(record.id_commande)} />
                </Popover>
                <Popover title="Voir la liste de cette commande" trigger="hover">
                  <Link to={`/listeDetailView/${record.id_commande}`}>
                    <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                  </Link>
                </Popover>
                <Popover title="Voir des produits" trigger="hover">
                    <Link to={`/commandes/${record.id_commande}`}>
                        <Button icon={<PlusCircleOutlined />} style={{ color: 'blue' }} />
                    </Link>
                </Popover>
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id_commande)}
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
            const { data } = await axios.get(`${DOMAIN}/api/commande`);
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
                        <h2 className="product-h2">Liste des commandes</h2>
                        <span>Voir les commandes</span>
                    </div>
                    <div className="product-right" onClick={() =>navigate('/commandeForm')}>
                        <PlusOutlined />
                        <span className="product-btn">Créez une commande</span>
                    </div>
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

export default ListeCommande