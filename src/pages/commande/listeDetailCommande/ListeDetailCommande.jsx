import { SearchOutlined, SisternodeOutlined,UserOutlined, FilePdfOutlined,EyeOutlined, FileExcelOutlined,PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popover,Popconfirm, Tag} from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import config from '../../../config';
import { useSelector } from 'react-redux';

const ListeDetailCommande = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const scroll = { x: 400 };
    const user = useSelector((state) => state.user?.currentUser);


    
      const handleDelete = async (id) => {
        try {
            await axios.delete(`${DOMAIN}/api/commande/detail-commande/${id}`);
              window.location.reload();
          } catch (err) {
            console.log(err);
          }
        };
    
      const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width:"3%"},
        {
            title: 'Id commande',
            dataIndex: 'id_commande',
            key: 'id_commande'
          },
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
            key: 'prix',
            sorter: (a, b) => a.prix - b.prix,
            sortDirections: ['descend', 'ascend'],
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
            title: 'Date demande & heure',
            dataIndex: 'date_demande',
            key: 'date_demande',
            render: (text) => {
              const formattedDate = format(new Date(text), 'dd-MM-yyyy HH:mm:ss');
              return <span>{formattedDate}</span>;
            },
          },
          {
            title: 'Créé par',
            dataIndex: 'username',
            key: 'username',
            render: (text) => (
              <Space>
                <UserOutlined />
                <Tag color="blue">{text}</Tag>
              </Space>
            ),
          },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
                <Popover title="Voir la liste de cette commande" trigger="hover">
                  <Link to={`/listeDetailView/${record.id_commande}`}>
                    <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                  </Link>
                </Popover>
                {user?.role === 'admin' &&
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id_detail)}
                    okText="Oui"
                    cancelText="Non"
                  >
                    <Button icon={<DeleteOutlined />} style={{ color: 'red' }} />
                  </Popconfirm>
                </Popover> }
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
      }, [DOMAIN]);


  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste du detail des commandes</h2>
                        <span>Voir le detail des commandes</span>
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
                        <Table columns={columns} dataSource={data} loading={loading} scroll={scroll} pagination={{ pageSize: 8}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ListeDetailCommande