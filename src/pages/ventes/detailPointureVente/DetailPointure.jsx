import { UserOutlined,CalendarOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popover,Popconfirm, Tag, Modal, Image, Input} from 'antd';
import axios from 'axios';
import { format } from 'date-fns';
import config from '../../../config';
import { useSelector } from 'react-redux';
import moment from 'moment';

const DetailPointure = ({idVariant}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [idClient, setIdClient] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const user = useSelector((state) => state.user?.currentUser);
    const [pointure, setPointure] = useState('')
    
      const handleDelete = async (id) => {
      try {
          await axios.delete(`${DOMAIN}/api/livraison/livraisonDeleteDetail/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };

      const showModal = (e) => {
        setOpen(true);
        setIdClient(e);
      };
    
      const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width:"3%"},
        {
          title: 'image',
          dataIndex: 'img',
          key: 'img',
          render: (text, record) => (
            <div className="userList">
              <Image
                className="userImg"
                src="error"
                fallback={`${DOMAIN}${record.img}`}
              />
            </div>
          ),
        },
        {
            title: 'Marque',
            dataIndex: 'nom_marque',
            key: 'nom_marque',
            render: (text) => (
                <Tag color={'green'}>{text}</Tag>
              ),
          },
        {
          title: 'NomDelaCliente',
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
          sorter: (a, b) => a.pointure.length - b.pointure.length,
          sortDirections: ['descend', 'ascend'],
          render: (text) => (
            <Tag color={'#87d068'}>{text}</Tag>
          ),
        },
        {
          title: 'Prix',
          dataIndex: 'total_prix_vente',
          key: 'total_prix_vente',
          sorter: (a, b) => a.prix_unitaire.length - b.prix_unitaire.length,
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
          title: 'Qté',
          dataIndex: 'nombre_vendu',
          key: 'nombre_vendu',
          sorter: (a, b) => a.nombre_vendu - b.nombre_vendu,
          sortDirections: ['descend', 'ascend'],
          render: (nombre_vendu) => (
            <Tag color={nombre_vendu > 0 ? 'green' : 'red'}>{nombre_vendu}</Tag>
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
                <Tag color={'blue'} icon={<CalendarOutlined />}>
                  {moment(text).format('DD-MM-yyyy')}
                </Tag>
              </span>
            ),
        }
      ];

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/vente/ventePointure/vente?id_variant=${idVariant}`);
            setData(data);
            setPointure(data[0]?.pointure)
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,idVariant]);


      const filteredData = data?.filter((item) =>
      item.nom_client?.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.nom_marque?.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.nom_livreur?.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.pointure?.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Historique de pointure {pointure}</h2>
                        <span></span>
                    </div>
                    <div className="varianteProduit-right" style={{display:'flex', flexDirection:'column'}}>
                      <h2 style={{fontSize:'1rem', color:'rgb(1, 35, 138)'}}></h2>
                      <span className="variant-name" style={{fontSize:'.8rem', color:'#6d6c6c'}}></span>
                    </div>
                </div>
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                        <Input
                            type="search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Recherche..."
                            className="product-search"
                        /> 
                        </div>
                        <div className="product-bottom-right">
                            
                        </div>
                    </div>
                    <div className="rowChart-row-table">
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DetailPointure