import { SearchOutlined, SisternodeOutlined, FilePdfOutlined,EyeOutlined,CalendarOutlined,UserOutlined,WhatsAppOutlined, FileExcelOutlined,PrinterOutlined, DeleteOutlined, CloseOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popover,Popconfirm, Tag, Modal} from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import config from '../../../config';
import LivraisonClientDetail from './livraisonClientDetail/LivraisonClientDetail';
import { useSelector } from 'react-redux';
import Livraison_detailSelect from './Livraison_detailSelect';

const Livraison_detail = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [idClient, setIdClient] = useState({});
    const user = useSelector((state) => state.user?.currentUser);
    
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
        setIdClient(e)
      };

      const HandOpen = () => {
        setOpens(!opens);
      };

      const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width:"3%"},
        {
          title: 'Commande N°',
          dataIndex: 'id_commande',
          key: 'id_commande',
          render: (text) => 
          <Tag color={'blue'}>
            {text}
          </Tag>
        },
        {
          title: 'Client',
          dataIndex: 'nom_client',
          key: 'nom_client',
          render : (text, record)=>(
            <div onClick={()=> showModal(record.id_client)} style={{cursor: 'pointer'}}>
               <Tag color={'green'}><UserOutlined style={{ marginRight: "5px" }} />{text}</Tag>
            </div>
          )
        },
        {
          title: 'Telephone',
          dataIndex: 'telephone',
          key: 'telephone',
          render: (text) => (
            <Popover content="Discutez avec lui sur WhatsApp" placement="top">
              <Tag to={`https://wa.me/${text}`} color="green" style={{ cursor: 'pointer' }}>
                <WhatsAppOutlined style={{ color: 'green', marginRight: '5px' }} />
                {text}
              </Tag>
            </Popover>
          ),
        },
        {
            title: 'Date création',
            dataIndex: 'date_creation',
            key: 'date_creation',
            render: (text) => {
              const formattedDate = format(new Date(text), 'dd-MM-yyyy');
              return <Tag color={'green'} icon={<CalendarOutlined />}>
                      {formattedDate}
                     </Tag>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
                <Popover title="Voir la liste de cette commande" trigger="hover">
                  <Link to={`/livraisonView/${record.id_commande}`}>
                    <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                  </Link>
                </Popover>
                {user?.role === 'admin' &&
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id_detail_livraison)}
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
            const { data } = await axios.get(`${DOMAIN}/api/livraison/livraisonDetail`);
            setData(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);

      const filteredData = data?.filter((item) =>
      item.nom_client?.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste des détails des livraisons</h2>
                        <span>Voir le détail des livraisons</span>
                    </div>
                </div>
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                        {opens ?<CloseOutlined className='product-icon2' onClick={HandOpen} /> : <SisternodeOutlined className='product-icon' onClick={HandOpen} />}
                            <div className="product-row-search">
                                <SearchOutlined className='product-icon-plus'/>
                                <input type="search" name="" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Recherche...' className='product-search' />
                            </div>
                        </div>
                        <div className="product-bottom-right">
                            <FilePdfOutlined className='product-icon-pdf' />
                            <FileExcelOutlined className='product-icon-excel'/>
                            <PrinterOutlined className='product-icon-printer'/>
                        </div>
                    </div>
                    {opens &&
                    <Livraison_detailSelect getProduits={setData}/> }
                    <div className="rowChart-row-table">
                        <Modal
                          title="Information du client"
                          centered
                          open={open}
                          onCancel={() => setOpen(false)}
                          width={850}
                          footer={[
                            <Button key="annuler" onClick={() => setOpen(false)}>
                              Annuler
                            </Button>
                          ]}
                        >
                         <LivraisonClientDetail idClients={idClient}/>
                        </Modal>
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Livraison_detail