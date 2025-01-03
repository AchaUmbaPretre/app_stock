import './../products/products.scss'
import { EyeOutlined, SisternodeOutlined,RedoOutlined,CalendarOutlined,WhatsAppOutlined,UserOutlined,CloseOutlined,ArrowDownOutlined, ArrowUpOutlined,CloseCircleOutlined, CheckCircleOutlined, DollarOutlined,DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popover,Popconfirm, Tag, Tabs, Input, Modal } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../../config';
import { useSelector } from 'react-redux';
import DetteSelect from './DetteSelect';
import { format } from 'date-fns';
import CountUp from 'react-countup';
import moment from 'moment';
import DetteJour from './DetteJour';
import DetteJour7 from './DetteJour7';
import DetteJours30 from './DetteJours30';
import DetteOne from './DetteOne';

const Dette = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 450 };
    const [open, setOpen] = useState(false);
    const [recent, setRecent] = useState([]);
    const [recentPaiement, setRecentPaiement] = useState([]);
    const [opens, setOpens] = useState(false);
    const [idClient, setIdClient] = useState({});
    const user = useSelector((state) => state.user?.currentUser);


      const handleDelete = async (id) => {
        try {
          await axios.delete(`${DOMAIN}/api/vente/vente/dette`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };

      const HandOpen = () => {
        setOpens(!opens);
      };

      const Rafraichir = () =>{
        window.location.reload();
      }
    
      const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1},
        {
          title: 'Code',
          dataIndex: 'id_commande',
          key: 'id_commande',
          render: (text, record) => (
            <Tag color="blue">{`${new Date().getFullYear().toString().substring(2)}${record.id_shop.toString().padStart(2, '0')}${record.id_commande.toString().padStart(4, '0')}`}</Tag>
          ),
        },
        {
          title: 'NomDelaClient',
          dataIndex: 'nom',
          key: 'nom',
          render : (text,record)=>(
            <div onClick={()=> handleOk(record.id_client)} style={{cursor: 'pointer'}}>
            <Popover title={`Voir les détails de ${text}`} trigger="hover">
              <Tag color={'blue'}>
                <UserOutlined style={{ marginRight: "5px" }} />
                {text}
              </Tag>
            </Popover>
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
            title: 'Montant facture',
            dataIndex: 'montant_convenuV',
            key: 'montant_convenu',
            sorter: (a, b) => a.montant_convenuV - b.montant_convenuV,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => (
              <Tag color="blue" icon={<DollarOutlined />}>
                {record.montant_convenuV.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Tag>
            ),
          },
        {
          title: 'Montant payé',
          dataIndex: 'montant_payeV',
          key: 'montant_payeV',
          sorter: (a, b) => a.montant_payeV - b.montant_payeV,
          sortDirections: ['descend', 'ascend'],
          render: (text, record) => (
            <Tag color="blue" icon={<DollarOutlined />}>
              {record.montant_payeV.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </Tag>
          ),
        },
        {
          title: 'Nbre dette',
          dataIndex: 'nbre_dette',
          key: 'nbre_dette',
          sorter: (a, b) => a.nbre_dette - b.nbre_dette,
          sortDirections: ['descend', 'ascend'],
          render: (nbre_dette) => (
            <Tag color={nbre_dette > 0 ? 'green' : 'red'} icon={<DollarOutlined />}>
              {nbre_dette}
            </Tag>
          ),
        },
          {
            title: 'Montant restant',
            dataIndex: 'montant_restant',
            key: 'montant_restant',
            sorter: (a, b) => a.montant_restant - b.montant_restant,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => {
              let icon;
          
              if (record.montant_restant > 0) {
                icon = <ArrowUpOutlined />;
              } else if (record.montant_restant < 0) {
                icon = <ArrowDownOutlined />;
              } else {
                icon = null;
              }
          
              return (
                <Tag color={record.montant_restant === 0 ? 'green' : 'red'} icon={icon}>
                  {record.montant_restant.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </Tag>
              );
            },
          },
          {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => {
              const formattedDate = format(new Date(text), 'dd-MM-yyyy');
              return <Tag color={'blue'} icon={<CalendarOutlined />}>
                      {formattedDate}
                     </Tag>;
            },
        },
          {
            title: 'Statut',
            dataIndex: 'statut',
            key: 'statut',
            render: (text) => (
              <Tag color={text === 'Validé' ? 'green' : 'red'}>
                {text === 'Validé' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                &nbsp; {text }
              </Tag>
            ),
          },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
                <Popover title={`Voir les ventes à crédit de Mme ${record.nom}`} trigger="hover">
                    <Link onClick={()=> handleOk(record.id_client)}>
                      <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                    </Link>
                  </Popover>
                {user?.role === 'admin' &&
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id_dette)}
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
            const { data } = await axios.get(`${DOMAIN}/api/vente/vente/dette`);
            setData(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/vente/vente/dettePaiement`);
            setRecentPaiement(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/vente/vente/detteRapport`);
            setRecent(data);
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

  const filteredData = data?.filter((item) =>
    item.nom?.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
        <div className="products">
            <div className="product-container">
                <Tabs>
                  <Tabs.TabPane tab='Dettes' key={0}>
                    <div className="product-container-top">
                      <div className="product-left">
                          <h2 className="product-h2">Liste des ventes à crédit</h2>
                          <span>Gérer vos ventes à crédit</span>
                      </div>
                      <div className="" style={{background: '#fafafa', padding: "10px 15px", borderRadius: '10px', boxShadow: '0px 0px 15px -10px rgba(0,0,0,0.75)'}}>
                        <div style={{ display: 'flex', fontSize: '13px', marginBottom:'8px', fontWeight: 'bold' }}>
                          Paiement du jour
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column',gap: '6px', fontSize: '12px' }}>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Montant payé : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={recentPaiement[0]?.montant}/> $</b></p>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nombre de clients ayant effectué un paiement. : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={recentPaiement[0]?.nombre_clients}/></b></p>
                        </div>
                      </div>
                      <div className="" style={{background: '#fafafa', padding: "10px 15px", borderRadius: '10px', boxShadow: '0px 0px 15px -10px rgba(0,0,0,0.75)'}}>
                        <div style={{ display: 'flex', fontSize: '13px', marginBottom:'8px', fontWeight: 'bold' }}>
                        Du {moment(recent[0]?.date_derniere_dette).format('DD-MM-YYYY')} au {moment(recent[0]?.date_plus_recente).format('DD-MM-YYYY')}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column',gap: '6px', fontSize: '12px' }}>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Montant dû : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={recent[0]?.montant_total_restant}/> $</b></p>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'spacre-between'}}>Nbre de débiteurs enregistrés. : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={recent[0]?.nombre_total_clients_dette}/></b></p>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Crédit en cours : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={recent[0]?.nombre_dettes_encours}/></b></p>
                        </div>
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
                      <DetteSelect getProduits={setData}/> }
                      <div className="rowChart-row-table">
                          <Table 
                            columns={columns} 
                            dataSource={filteredData} 
                            loading={loading} 
                            scroll={scroll} 
                            pagination={{ pageSize: 10}} 
                            bordered 
                            size="middle"
                          />
                      </div>

                        <Modal
                            title=""
                            centered
                            open={open}
                            onCancel={() => setOpen(false)}
                            width={1150}
                            footer={[]}
                          >
                            <DetteOne idClients={idClient}/>
                          </Modal>
                    </div> 
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Dettes du jour' key={1}>
                    <DetteJour/>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Dettes des 7 derniers jours' key={2}>
                    <DetteJour7/>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Dettes des 30 derniers jours' key={3}>
                    <DetteJours30/>
                  </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    </>
  )
}

export default Dette