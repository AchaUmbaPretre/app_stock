import './../products/products.scss'
import { SearchOutlined, SisternodeOutlined,EyeOutlined,RedoOutlined, ReconciliationOutlined,CloseOutlined,WhatsAppOutlined,UserOutlined,CalendarOutlined,DollarOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popover,Popconfirm, Tag, Modal, Tabs, Input} from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import { format } from 'date-fns';
import VenteClientDetail from './venteClientDetail/VenteClientDetail';
import { useSelector } from 'react-redux';
import VenteSelect from './VentesSelect';
import Ticket from './ticket/Ticket';
import VentesJour from './VentesJour';
import VenteView from './venteView/VenteView';

const Ventes = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [openVente, setOpenVente] = useState(false);
    const [iDcommande, setIdCommande] = useState('');
    const [idClient, setIdClient] = useState({});
    const [ticket, setTicket] = useState(false);
    const [idTicket, setIdTicket] = useState(false);
    const user = useSelector((state) => state.user?.currentUser);


      const handleDelete = async (id) => {
        try {
          await axios.delete(`${DOMAIN}/api/vente/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };

      const HandOpen = () => {
        setOpens(!opens);
      };

      const HandVenteOpen = (e) => {
        setOpenVente(!openVente);
        setIdCommande(e)
      };

      const Rafraichir = () =>{
        window.location.reload();
      }
    
      const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width:"3%"},
        {
          title: 'Client',
          dataIndex: 'nom_client',
          key: 'nom_client',
          render : (text,record)=>(
            <div onClick={()=> handleOk(record.id_client)} style={{cursor: 'pointer'}}>
              <Tag color={'green'}><UserOutlined style={{ marginRight: "5px" }} />{text}</Tag>
            </div>
          )
        },
        {
          title: 'Livreur',
          dataIndex: 'username',
          key: 'username',
          render : (text,record)=>(
            <div style={{cursor: 'pointer'}}>
              <Tag color={'green'}><UserOutlined style={{ marginRight: "5px" }} />{text}</Tag>
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
          title: 'Quantité vendue',
          dataIndex: 'total_varianteproduit',
          key: 'total_varianteproduit',
          sorter: (a, b) => a.total_varianteproduit - b.total_varianteproduit,
          sortDirections: ['descend', 'ascend'],
          render : (text,record)=>(
              <Tag color={'green'}>{record.total_varianteproduit}</Tag>
          )
        },
        {
          title: 'Nbre vendu',
          dataIndex: 'nombre_vendu',
          key: 'nombre_vendu',
          sorter: (a, b) => a.nombre_vendu - b.nombre_vendu,
          sortDirections: ['descend', 'ascend'],
          render : (text,record)=>(
              <Tag color={'green'}>{record.nombre_vendu}</Tag>
          )
        },
        {
          title: 'Total prix',
          dataIndex: 'total_prix_vente',
          key: 'total_prix_vente',
          sorter: (a, b) => a.total_prix_vente - b.total_prix_vente,
          sortDirections: ['descend', 'ascend'],
          render: (text, record) => (
            <Tag color="green" icon={<DollarOutlined />}>
              {record.total_prix_vente.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </Tag>
          ),
        },
        {
          title: 'Date',
          dataIndex: 'date_vente',
          key: 'date',
          sorter: (a, b) => a.date_vente - b.date_vente,
          sortDirections: ['descend', 'ascend'],
          render: (text) => (
            <Tag color="blue" icon={<CalendarOutlined />}>
              {format(new Date(text), 'dd-MM-yyyy')}
            </Tag>
          ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
                <Popover title="Voir la liste de vente de cette commande" trigger="hover">
                    <Link onClick={()=> HandVenteOpen(record.id_commande)}>
                      <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                    </Link>
                </Popover>
                <Popover title="Ticket" trigger="hover">
                    <Link onClick={()=> handleTicket(record.id_commande)}>
                      <Button icon={<ReconciliationOutlined />} style={{ color: 'blue' }} />
                    </Link>
                </Popover>
                {user?.role === 'admin' &&
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id_vente)}
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
            const { data } = await axios.get(`${DOMAIN}/api/vente`);
            setData(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);

    const handleOk = async (e) => {
      setOpen(true)
      setIdClient(e)
    };

    const handleTicket = async (e) => {
      setTicket(true)
      setIdTicket(e)
    };

  const filteredData = data?.filter((item) =>
  item.nom_client?.toLowerCase().includes(searchValue.toLowerCase()) ||
  item.nom_marque?.toLowerCase().includes(searchValue.toLowerCase()) ||
  item.username?.toLowerCase().includes(searchValue.toLowerCase())
);

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste de ventes</h2>
                        <span>Gérer vos ventes</span>
                    </div>
                </div>
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
                    <VenteSelect getProduits={setData}/> }
                </div>
                <Tabs>
                      <Tabs.TabPane tab='Ventes' key={1}>
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
                         <VenteClientDetail idClients={idClient}/>
                        </Modal>

                        <Modal
                          title="Ticket"
                          centered
                          open={ticket}
                          onCancel={() => setTicket(false)}
                          width={550}
                          footer={[]}
                        >
                         <Ticket idTicket={idTicket}/>
                        </Modal>

                        <Modal
                          title=""
                          centered
                          open={openVente}
                          onCancel={() => setOpenVente(false)}
                          width={1150}
                          footer={[]}
                        >
                         <VenteView id={iDcommande}/>
                        </Modal>
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                    </div>
                      </Tabs.TabPane>  
                      <Tabs.TabPane tab='Ventes du jour' key={2}>
                        <VentesJour/>
                      </Tabs.TabPane>        
                    </Tabs>
            </div>
        </div>
    </>
  )
}

export default Ventes