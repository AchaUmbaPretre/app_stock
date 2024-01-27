import { SearchOutlined, SisternodeOutlined,EyeOutlined, FilePdfOutlined, FileExcelOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popover,Popconfirm, Tag, Modal} from 'antd';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

const VenteView = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const scroll = { x: 400 };
    const {pathname} = useLocation();
    const id = pathname.split('/')[2];
    const [getVente, setGetVente] = useState({});
    const [open, setOpen] = useState(false);

      const handleDelete = async (id) => {
      try {
          await axios.put(`${DOMAIN}/api/vente/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };
    
      const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width:"3%"},
        {
          title: 'image',
          dataIndex: 'img',
          key: 'image',
          render: (text, record) => (
            <div className="userList">
              <img src={record.img} alt="" className="userImg"  />
            </div>
          )
        },
        {
            title: 'Marque',
            dataIndex: 'nom_marque',
            key: 'nom_marque'
          },
        {
          title: 'Client',
          dataIndex: 'nom_client',
          key: 'nom_client',
          render: (text) => (
            <Tag color={'green'}>{text}</Tag>
          ),
        },
        {
          title: 'Livreur',
          dataIndex: 'username',
          key: 'username',
          render: (text) => (
            <Tag color={'blue'}>{text}</Tag>
          ),
        },
        {
          title: 'Pointure',
          dataIndex: 'pointure',
          key: 'pointure',
          render: (text) => (
            <Tag color={'#87d068'}>{text}</Tag>
          ),
        },
        {
          title: 'Prix unitaire',
          dataIndex: 'prix_unitaire',
          key: 'prix',
          sorter: (a, b) => a.prix_unitaire.length - b.prix_unitaire.length,
          sortDirections: ['descendre', 'monter'],
          render: (text) => (
            <span>
            <Tag color={'green'}>
            {parseFloat(text).toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'USD',
              })}
            </Tag>
          </span>
          ),
        },
        {
          title: 'Quantité',
          dataIndex: 'quantite',
          key: 'quantite',
          sorter: (a, b) => a.quantite - b.quantite,
          sortDirections: ['descend', 'ascend'],
          render: (quantite) => (
            <Tag color={quantite > 0 ? 'green' : 'red'}>{quantite}</Tag>
          ),
        },
        {
            title: 'Date',
            dataIndex: 'date_vente',
            key: 'date',
            sorter: (a, b) => a.date_vente - b.date_vente,
            sortDirections: ['descend', 'ascend'],
            render: (text) => (
              <span>
                {format(new Date(text), 'dd-MM-yyyy')}
              </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
                <Popover title="Voir la liste de vante de cette commande" trigger="hover">
                    <Link to={`/venteView/${record.id_commande}`}>
                      <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                    </Link>
                </Popover>
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id_vente)}
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
            const { data } = await axios.get(`${DOMAIN}/api/vente/${id}`);
            setLoading(false)
            setData(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,id]);

      const handleOk = async (e) => {
        try{
          await axios.put(`${DOMAIN}/api/vente/vente/${id}`,getVente)
  
          Swal.fire({
            title: 'Success',
            text: "La vente a été modifiée avec succès!",
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
      };

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste de ventes de commande N° {id}</h2>
                        <span>Gérer vos ventes</span>
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
                        <Modal
                          title="Modifier la vente"
                          centered
                          open={open}
                          onOk={handleOk}
                          onCancel={() => setOpen(false)}
                          width={860}
                          okText="Soumettre"
                          cancelText="Annuler"
                        >
{/*                          <FormVenteEdit getVente={getVente} setGetVente={setGetVente} /> */}
                        </Modal>
                        <Table columns={columns} dataSource={data} loading={loading} scroll={scroll} pagination={{ pageSize: 5}} />
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default VenteView