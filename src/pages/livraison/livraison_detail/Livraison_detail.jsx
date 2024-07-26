import { SearchOutlined, SisternodeOutlined,EnvironmentOutlined,RedoOutlined,ArrowUpOutlined, FilePdfOutlined,EyeOutlined,CalendarOutlined,UserOutlined,WhatsAppOutlined, FileExcelOutlined,PrinterOutlined, DeleteOutlined, CloseOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popover,Popconfirm, Tag, Modal, Tabs, Input} from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import LivraisonClientDetail from './livraisonClientDetail/LivraisonClientDetail';
import { useSelector } from 'react-redux';
import Livraison_detailSelect from './Livraison_detailSelect';
import LivraisonJour from '../LivraisonJour';
import moment from 'moment';
import LivraisonView from '../livraisonView/LivraisonView';

const Livraison_detail = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [idClient, setIdClient] = useState({});
    const [id_commande, setId_commande] = useState('');
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
          title: 'Code',
          dataIndex: 'id_commande',
          key: 'id_commande',
          render: (text, record) => (
            <Tag color="blue">{`${new Date().getFullYear().toString().substring(2)}${record.id_shop.toString().padStart(2, '0')}${record.id_commande.toString().padStart(4, '0')}`}</Tag>
          ),
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
          title: 'Commune',
          dataIndex: 'nom_commune',
          key: 'nom_commune',
          render : (text, record)=>(
            <div>
               <Tag color={'green'}><EnvironmentOutlined style={{ marginRight: "5px" }} />{text}</Tag>
            </div>
          )
        },
        {
          title: 'Telephone',
          dataIndex: 'telephone',
          key: 'email',
          render: (text) => (
            <Popover content="Discutez avec lui sur WhatsApp" placement="top">
            <Tag
              onClick={() => window.open(`https://wa.me/${text}`, '_blank')}
              color="green"
              style={{ cursor: 'pointer' }}
            >
              <WhatsAppOutlined style={{ color: 'green', marginRight: '5px' }} />
              {text}
            </Tag>
          </Popover>
          ),
        },
        {
          title: 'Livreur',
          dataIndex: 'nom_livreur',
          key: 'nom_livreur',
          render : (text, record)=>(
            <div>
               <Tag color={'green'}><UserOutlined />{text}</Tag>
            </div>
          )
        },{
          title: 'Quantité',
          dataIndex: 'quant',
          key: 'quant',
          sorter: (a, b) => a.quant - b.quant,
          sortDirections: ['descend', 'ascend'],
          render: (text, record) => (
            <Popover
              content="Voir les détails" placement="top"
            >
              <Tag color="blue" icon={<ArrowUpOutlined />} style={{ cursor: 'pointer' }}  onClick={()=>handInfo(record.id_commande) }>
                {record.quant}
              </Tag>
            </Popover>
          )
        },
        {
          title: 'Date & Heure',
          dataIndex: 'date_creation',
          key: 'date_creation',
          sorter: (a, b) => a.date_creation - b.date_creation,
          sortDirections: ['descend', 'ascend'],
          render: (text) => (
            <Tag color={'blue'} icon={<CalendarOutlined />}>
              {moment(text).format('DD-MM-yyyy HH:mm')}
            </Tag>
          ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
                <Popover title="Voir la liste de cette commande" trigger="hover">
                  <Link onClick={()=>handInfo(record.id_commande) }>
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

      const handInfo = (e) =>{
        setId_commande(e)
        setOpenInfo(true)
      }

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

      const Rafraichir = () =>{
        window.location.reload();
      }

    const filteredData = data?.filter((item) =>
      item.nom_client?.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.nom_commune?.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.nom_livreur?.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste des détails de livraison</h2>
                        <span>Voir les détail de livraison</span>
                    </div>
                </div>
                <Tabs>
                  <Tabs.TabPane tab='Livraisons' key={0}>
                    <div className="product-bottom">
                      <div className="product-bottom-top">
                          <div className="product-bottom-left">
                            {opens ?<CloseOutlined className='product-icon2' onClick={HandOpen} /> : <SisternodeOutlined className='product-icon' onClick={HandOpen} />}
                            <Input
                              type="search"
                              value={searchValue}
                              onChange={(e) => setSearchValue(e.target.value)}
                              placeholder="Recherche..."
                              className="product-search"
                            />
                          </div>
                          <div className="product-bottom-right">
                            <Popover content={'Actualiser cette page'}>
                              <RedoOutlined className='product-icon-raf' onClick={Rafraichir}/>
                            </Popover>
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
                            width={1150}
                            footer={[
                              <Button key="annuler" onClick={() => setOpen(false)}>
                                Annuler
                              </Button>
                            ]}
                          >
                            <LivraisonClientDetail idClients={idClient}/>
                          </Modal>
                          <Modal
                            title=""
                            centered
                            open={openInfo}
                            onCancel={() => setOpenInfo(false)}
                            width={1200}
                            footer={[]}
                          >
                             <LivraisonView id={id_commande}/>
                          </Modal>
                          <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                      </div>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Livraisons du jour' key={1}>
                    <LivraisonJour/>
                  </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    </>
  )
}

export default Livraison_detail