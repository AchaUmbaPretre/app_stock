import { PlusOutlined, SearchOutlined, SisternodeOutlined,PlusCircleOutlined, FilePdfOutlined,EyeOutlined, FileExcelOutlined,EditOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Popover,Popconfirm, Tag, Modal} from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format, isValid } from 'date-fns';
import Swal from 'sweetalert2';
import config from '../../../config';

const LivraisonView = () => {
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
            title: 'Image',
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
          title: 'Pointure',
          dataIndex: 'pointure',
          key: 'pointure',
          render: (text) => (
            <Tag color={"#87d068"}>
              {text}
            </Tag>
          )
        },
        {
          title: 'Client',
          dataIndex: 'nom_client',
          key: 'nom_client'
        },
        {
          title: 'Livreur',
          dataIndex: 'nom_livreur',
          key: 'nom_livreur'
        },
        {
          title: 'Qté livrée',
          dataIndex: 'qte_livre',
          key: 'qte_livre',
          render: (text) => (
            <Tag color={"#108ee9"}>
              {text}
            </Tag>
          )
        },
        {
            title: 'Qté commandée',
            dataIndex: 'qte_commande',
            key: 'qte_commande',
            render: (text) => (
              <Tag color={"#87d068"}>
                {text}
              </Tag>
            )
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
            title: 'Date création',
            dataIndex: 'date_creation',
            key: 'date_creation',
            render: (text) => {
              const formattedDate = format(new Date(text), 'dd-MM-yyyy');
              return <span>{formattedDate}</span>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
{/*                 <Popover title="Voir la liste de cette commande" trigger="hover">
                  <Link to={`/livraisonView/${record.id_commande}`}>
                    <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                  </Link>
                </Popover> */}
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id_detail_livraison)}
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
            const { data } = await axios.get(`${DOMAIN}/api/livraison/livraisonDetailOne/${id}`);
            setData(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);


  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste de détail des livraisons de commande N° {id}</h2>
                        <span>Voir le détail des livraisons</span>
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

export default LivraisonView