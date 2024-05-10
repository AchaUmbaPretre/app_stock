import { PlusOutlined, SearchOutlined,RedoOutlined, EyeOutlined,CalendarOutlined,UserOutlined,CloseOutlined, SisternodeOutlined,PlusCircleOutlined, FilePdfOutlined, FileExcelOutlined,EditOutlined, PrinterOutlined, DeleteOutlined,  ExclamationCircleOutlined, CheckCircleOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button,Space, Table, Popover,Popconfirm, Tag, Modal, Tabs} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import config from '../../../config';
import MouvClientDetail from '../../mouvement/mouvementClientDetail/MouvClientDetail';
import { useSelector } from 'react-redux';
import ListeCommandeSelect from './ListeCommandeSelect';
import ListeCommande7jrs from './ListeCommande7jrs';
import ListeCommandeJour from './ListeCommandeJour';
import CountUp from 'react-countup';
import ListeDetailView from '../listeDetailView/ListeDetailView';

const ListeCommande = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const scroll = { x: 400 };
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [opensCommande, setOpensCommande] = useState(false);
    const [idCommande, setIdCommande] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [idClient, setIdClient] = useState({});
    const user = useSelector((state) => state.user?.currentUser);
    const [rapportMoney, setRapportMoney] = useState([]);
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');
    
      const handleDelete = async (id) => {
      try {
          await axios.delete(`${DOMAIN}/api/commande/commande/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };

      const handleEdit = (id) => {
        navigate(`/Editcommande/${id}`);
    };

    const showModal = (e) => {
      setOpen(true);
      setIdClient(e)
    };
    
    const HandCommande = (e) => {
      setOpensCommande(true)
      setIdCommande(e)
    }
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
            dataIndex: 'nom',
            key: 'id_client',
            render : (text,record)=>(
              <div onClick={()=> showModal(record.id_client)} style={{cursor: 'pointer'}}>
                  <Tag color={'green'}><UserOutlined style={{ marginRight: "5px" }} />{text}</Tag>
              </div>
            )
        },
        {
          title: 'Date commande',
          dataIndex: 'date_commande',
          key: 'date_commande',
          render: (text) => (
            <span>
              {<Tag color={'blue'} icon={<CalendarOutlined />}>{format(new Date(text), 'dd-MM-yyyy')}</Tag>}
            </span>
          ),
        },
        {
            title: 'Status',
            dataIndex: 'nom_statut',
            key: 'nom_statut',
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
          key: 'id_livraison',
          render: (text) => {
            let tagColor = '';
            let textValue = '';
      
            if (text === 0) {
              tagColor = 'red';
              textValue= 'En attente'
            } else if (text === 1) {
              tagColor = 'green';
              textValue = 'En cours';
            }
            else if (text === 2) {
              tagColor = 'green';
              textValue = 'Livré';
            }
      
            return (
              <Tag color={tagColor}>
                 {textValue}
              </Tag>
            );
          },
        },
/*         {
          title: 'Paiement',
          dataIndex: 'id_paiement',
          key: 'id_paiement',
          render: (text) => {
            let tagColor = '';
            let textValue = '';
      
            if (text === 0) {
              tagColor = 'red';
              textValue= 'Non-payé'
            } 
            else if (text === 1) {
              tagColor = 'green';
              textValue = 'Payé';
            }
      
            return (
              <Tag color={tagColor}>
                 {textValue}
              </Tag>
            );
          },
        }, */
        {
            title: 'Shop',
            dataIndex: 'id_shop',
            key: 'id_shop',
            render: (text) => {
              let tagColor = '';
              let textValue = '';
        
              if (text === 1) {
                tagColor = 'blue';
                textValue= 'Shop ngaliema'
              } 
              else if (text === 2) {
                tagColor = 'green';
                textValue = 'Payé';
              }
        
              return (
                <Tag color={tagColor}>
                   {textValue}
                </Tag>
              );
            },
        },
/*         {
            title: 'Paie',
            dataIndex: 'paye',
            key: 'paye',
            render: (text) => {
              let tagColor = '';
              let textValue = '';
        
              if (text === 0) {
                tagColor = 'red';
                textValue= 'Non-payé'
              } 
              else if (text === 1) {
                tagColor = 'green';
                textValue = 'Payé';
              }
        
              return (
                <Tag color={tagColor}>
                   {textValue}
                </Tag>
              );
            },
        }, */
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
                <Popover title="Modifier" trigger="hover">
                  <Button icon={<EditOutlined />} style={{ color: 'green' }}  onClick={()=> handleEdit(record.id_commande)} />
                </Popover>
                <Popover  title="Voir la liste de cette commande" trigger="hover">
                  <Link onClick={()=>HandCommande(record.id_commande)}>
                    <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                  </Link>
                </Popover>
                <Popover title="Voir des produits" trigger="hover">
                    <Link to={`/commandes/${record.id_commande}`}>
                        <Button icon={<PlusCircleOutlined />} style={{ color: 'blue' }} />
                    </Link>
                </Popover>
                {user?.role === 'admin' &&
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id_commande)}
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
            const { data } = await axios.get(`${DOMAIN}/api/commande`);
            setData(data);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      
        const timeoutId = setTimeout(fetchData, 4000);
      
        return () => clearTimeout(timeoutId);
      }, [DOMAIN]);


      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/commande/commandeRapportTopbar?start_date=${start_date}&end_date=${end_date}&searchValue=${searchValue}`);
            setRapportMoney(data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      
        const timeoutId = setTimeout(fetchData, 4000);
      
        return () => clearTimeout(timeoutId);
      }, [DOMAIN,start_date,end_date,searchValue]);


      const HandOpen = () =>{
        setOpens(!opens)
      }

      const Rafraichir = () =>{
        window.location.reload();
      }

  const filteredData = data?.filter((item) =>
  item.nom?.toLowerCase().includes(searchValue.toLowerCase()) ||
  item.nom_statut?.toLowerCase().includes(searchValue.toLowerCase())
)

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste des commandes</h2>
                        <span>Voir vos commandes</span>
                    </div>
                    <div className="" style={{background: '#fafafa', padding: "10px 15px", borderRadius: '10px', boxShadow: '0px 0px 15px -10px rgba(0,0,0,0.75)'}}>
                        <div style={{ display: 'flex', fontSize: '13px', marginBottom:'8px', fontWeight: 'bold' }}>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column',gap: '6px', fontSize: '12px' }}>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nbre de commandes en attente : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={rapportMoney?.commande_Enattente}/></b></p>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nbre de commandes en cours : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={rapportMoney?.commande_Encours}/></b></p>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nbre de commandes livrées. : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={rapportMoney?.commande_livre}/></b></p>
                        </div>
                    </div>
                    <div className="" style={{background: '#fafafa', padding: "10px 15px", borderRadius: '10px', boxShadow: '0px 0px 15px -10px rgba(0,0,0,0.75)'}}>
                        <div style={{ display: 'flex', fontSize: '13px', marginBottom:'8px', fontWeight: 'bold' }}>
                         {/*  {`Du ${moment(recent[0]?.date_plus_ancienne).format('DD-MM-YYYY')} au ${moment(recent[0]?.date_plus_recente).format('DD-MM-YYYY')}`} */}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column',gap: '6px', fontSize: '12px' }}>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nbre de commandes: <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={rapportMoney?.nbre_commande}/></b></p>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nbre d'articles: <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={rapportMoney?.nbre_articles}/></b></p>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Montant total de la commande : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={rapportMoney?.montant_total}/>$</b></p>
                        </div>
                    </div>
                    <div className="product-right" onClick={() =>navigate('/commandeForm')}>
                        <PlusOutlined />
                        <span className="product-btn">Nouvelle commande</span>
                    </div>
                </div>
                <Tabs>
                  <Tabs.TabPane tab='Commandes' key={0}>
                    <div className="product-bottom">
                      <div className="product-bottom-top">
                          <div className="product-bottom-left">
                          {opens ?<CloseOutlined className='product-icon2' onClick={HandOpen} /> : <SisternodeOutlined className='product-icon' onClick={HandOpen} />}
                              <div className="product-row-search">
                                  <SearchOutlined className='product-icon-plus'/>
                                  <input type="search" name="" id="" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Recherche...' className='product-search' />
                              </div>
                          </div>
                          <div className="product-bottom-right">
                            <Popover content={'Actualiser cette page'}>
                              <RedoOutlined className='product-icon-raf' onClick={Rafraichir}/>
                            </Popover>
                          </div>
                      </div>
                      <div className="rowChart-row-table">
                      {opens &&
                      <ListeCommandeSelect getProduits={setData} start_date={setStart_date} end_date={setEnd_date} /> } 
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
                            title=""
                            centered
                            open={opensCommande}
                            onCancel={() => setOpensCommande(false)}
                            width={1200}
                            footer={[
                            ]}
                          >
                            <ListeDetailView id={idCommande}/>
                          </Modal>
                          <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 15}} />
                      </div>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Commandes du jour' key={1}>
                    <ListeCommandeJour/>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Commandes des 7 derniers jours' key={2}>
                    <ListeCommande7jrs/>
                  </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    </>
  )
}

export default ListeCommande