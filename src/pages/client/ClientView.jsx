import './client.scss'
import { SearchOutlined,EnvironmentOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popconfirm, Popover, Tag, Modal} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '../../config';
import axios from 'axios';
import MouvClientDetail from '../mouvement/mouvementClientDetail/MouvClientDetail';
import { useSelector } from 'react-redux';
import ClientTelephone from './clientTelephone/ClientTelephone';
import ClientAdresse from './clientAdresse/ClientAdresse';

const ClientView = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [adresseOne, setAdresseOne] = useState([]);
    const id_client = useLocation().pathname.split('/')[2]
    const scroll = { x: 400 };
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [openAdresse, setOpenAdresse] = useState(false);
    const [idClient, setIdClient] = useState({});
    const user = useSelector((state) => state.user?.currentUser);


      const showModalAdresse = (e) => {
        setOpenAdresse(true);
        setIdClient(e)
      };
          
      const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
        {
            title: 'Avenue',
            dataIndex: 'avenue',
            key: 'avenue',
            render: (text) => (
              <div>
                <Tag color="blue">
                  <EnvironmentOutlined style={{ marginRight: '5px' }} />
                  {text}
                </Tag>
              </div>
            ),
          },
          {
            title: 'Quartier',
            dataIndex: 'quartier',
            key: 'quartier',
            render: (text) => (
              <div>
                <Tag color="blue">
                  <EnvironmentOutlined style={{ marginRight: '5px' }} />
                  {text}
                </Tag>
              </div>
            ),
          },
          {
            title: 'N°',
            dataIndex: 'num',
            key: 'num',
            render: (text) => (
              <div>
                <Tag color="blue">
                  {text}
                </Tag>
              </div>
            ),
          },
          {
            title: 'Ville',
            dataIndex: 'nom_province',
            key: 'nom_province',
            render: (text) => (
              <div>
                <Tag color="blue">
                  <EnvironmentOutlined style={{ marginRight: '5px' }} />
                  {text}
                </Tag>
              </div>
            ),
          },
        {
            title: 'Commune',
            dataIndex: 'nom_commune',
            key: 'nom_commune',
            render : (text,record)=>(
              <div>
                <Popover content={`Ajouter une nouvelle adresse de Mme ${record.nom} `} placement="top">
                  <Tag color={'blue'} onClick={()=> showModalAdresse(record.id)}><EnvironmentOutlined style={{ marginRight: '5px' }} />{text}</Tag>
                </Popover>
              </div>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                <Popover title="Voir la localisation" trigger="hover">
                  <Button icon={<EnvironmentOutlined />} style={{ color: 'green' }} onClick={()=> navigate(`/clientLocalisation?avenue=${record.avenue}&commune=${record.nom_commune}&num=${record.num}`)} />
                </Popover>
                  {user?.role === 'admin' &&
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Oui"
                    cancelText="Non"
                  >
                    <Button icon={<DeleteOutlined />} style={{ color: 'red' }} />
                  </Popconfirm>
                </Popover>}
              </Space>
            ),
          },
      ];

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/client/clientAdresse/${id_client}`);
            setAdresseOne(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,id_client]);
    
      const handleDelete = async (id) => {
      try {
          await axios.put(`${DOMAIN}/api/client/clientDelete/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        } 
      };

  const filteredData = adresseOne?.filter((item) =>
    item.nom_commune?.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.nom_province?.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.avenue?.toLowerCase().includes(searchValue.toLowerCase())
);

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Information</h2>
                    </div>
                    <div style={{display:'flex', gap: '10px'}}>
                    </div>
                </div>
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                            <div className="product-row-search">
                                <SearchOutlined className='product-icon-plus'/>
                                <input type="search" name="" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}  placeholder='Recherche...' className='product-search' />
                            </div>
                        </div>
                        <div className="product-bottom-right">
                        </div>
                    </div>
                    <div className="rowChart-row-table">
                        <Modal
                          title="Information de client"
                          centered
                          open={open}
                          onCancel={() => setOpen(false)}
                          width={850}
                          footer={[
                            
                          ]}
                        >
                         <MouvClientDetail idClients={idClient}/>
                        </Modal>
                        <Modal
                          title="Ajouter un nouveau numero"
                          centered
                          open={opens}
                          onCancel={() => setOpens(false)}
                          width={600}
                          footer={[
                            
                          ]}
                        >
                         <ClientTelephone idClients={idClient}/>
                        </Modal>
                        <Modal
                          title="Ajouter une nouvelle adresse"
                          centered
                          open={openAdresse}
                          onCancel={() => setOpenAdresse(false)}
                          width={800}
                          footer={[
                            
                          ]}
                        >
                         <ClientAdresse idClients={idClient}/>
                        </Modal>
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 15}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ClientView