import './../products/products.scss'
import { SearchOutlined,EnvironmentOutlined, SisternodeOutlined,RedoOutlined, EyeOutlined,ArrowDownOutlined,ShoppingCartOutlined ,ArrowUpOutlined, FilePdfOutlined,WhatsAppOutlined,UserOutlined, CloseOutlined, FileExcelOutlined,PrinterOutlined, DeleteOutlined, CalendarOutlined,SwapOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popover,Popconfirm, Tag, Modal, Tabs} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import MouvClientDetail from './mouvementClientDetail/MouvClientDetail';
import { useSelector } from 'react-redux';
import moment from 'moment';
import MouvementSelect from './MouvementSelect';
import MouvementDepart from './MouvementDepart';
import MouvementAll from './MouvementAll';
import MouvementRetour from './MouvementRetour';
import MouvementOneVente from './MouvementOneVente';
import MouvementOneRetour from './MouvementOneRetour';
import MouvementEchange from './MouvementEchange';
import MouvementView from './mouvementView/MouvementView';

const Mouvement = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const scroll = { x: 400 };
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [openLivraison, setOpenLivraison] = useState(false);
    const [openVente, setOpenVente] = useState(false);
    const [openRetour, setOpenRetour] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [idClient, setIdClient] = useState({});
    const [idTypeEnLivraison, setIdTypeEnLivraison] = useState({});
    const [idTypeVente, setIdTypeVente] = useState({});
    const [idTypeRetour, setIdTypeRetour] = useState({});
    const [idTypeVenteCommande, setIdTypeVenteCommande] = useState([]);
    const user = useSelector((state) => state.user?.currentUser);

      const showModal = (e) => {
        setOpen(true);
        setIdClient(e)
      };

      const showModalEnLivraison = (e,id_commande) => {
        setOpenLivraison(true);
        setIdTypeEnLivraison(e)
        setIdTypeVenteCommande(id_commande)
      };

      const showModalOneVente = (e,id_commande) => {
        setOpenVente(true);
        setIdTypeVente(e)
        setIdTypeVenteCommande(id_commande)
      };

      const showModalOneRetour = (e,id_commande) => {
        setOpenRetour(true);
        setIdTypeRetour(e)
        setIdTypeVenteCommande(id_commande)
      };

      const qModal = (e) => {
        navigate(`/mouvement/${e}`);
      };

      const showModalLivreur = (e) => {
        navigate(`/mouvementOne/${e}`)
      };

      const HandOpen = () =>{
        setOpens(!opens)
      };
   
      const handleDelete = async (id) => {
      try {
          await axios.delete(`${DOMAIN}/api/produit/mouvementDelete/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
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
          render : (text,record)=>(
            <div onClick={()=> showModal(record.id_client1)} style={{cursor: 'pointer'}}>
                <Tag color={'green'}><UserOutlined style={{ marginRight: "5px" }} /> {text}</Tag>
            </div>
          )
        },
        {
          title: 'Commune',
          dataIndex: 'nom_commune',
          key: 'nom_commune',
          render : (text,record)=>(
            <div>
                <Tag color={'green'}><EnvironmentOutlined style={{ marginRight: "5px" }} /> {text}</Tag>
            </div>
          )
        },
        {
          title: 'Livreur',
          dataIndex: 'livreur',
          key: 'livreur',
          render : (text,record)=>(
            <Popover content={`Voir toutes les livraisons de ${text}`} placement="top">
              <div style={{cursor: 'pointer'}} onClick={()=> showModalLivreur(record.id_livreur)}>
                <Tag color={'green'}><UserOutlined style={{ marginRight: "5px" }} /> {text}</Tag>
              </div>
            </Popover>
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
          title: 'Détail',
          dataIndex: 'total_varianteproduit',
          key: 'total_varianteproduit',
          sorter: (a, b) => a.total_varianteproduit - b.total_varianteproduit,
          sortDirections: ['descend', 'ascend'],
          render: (text, record) => (
            <Popover
              content="Voir les détails" placement="top"
            >
              <Tag color="blue" icon={<ArrowUpOutlined />} style={{ cursor: 'pointer' }} onClick={()=>showModalEnLivraison(record.id_commande)}>
                {record.total_varianteproduit}
              </Tag>
            </Popover>
          )
        },
        {
          title: 'Nbre vendu',
          dataIndex: 'total_vendu',
          key: 'total_vendu',
          sorter: (a, b) => (a.total_vendu ?? 0) - (b.total_vendu ?? 0),
          sortDirections: ['descend', 'ascend'],
          render: (text, record) => (
            <Popover
              content="Voir le nombre des articles vendus" placement="top"
            >
              <Tag color="green" icon={<ShoppingCartOutlined style={{paddingRight: "5px"}} />} style={{cursor: "pointer"}} onClick={()=> showModalOneVente(record.id_vente, record.id_commande)}>
              {record.total_vendu ?? 0}
              </Tag>
            </Popover>
          )
        },
        {
          title: 'Nbre retourné',
          dataIndex: 'total_retours',
          key: 'total_retours',
          sorter: (a, b) => (a.total_retours ?? 0) - (b.total_retours ?? 0),
          sortDirections: ['descend', 'ascend'],
          render : (text,record)=>(
          <Popover
            content="Voir le nombre des articles retournés" placement="top"
          >
            <Tag color={'red'} icon={<ArrowDownOutlined style={{paddingRight: "8px"}}/>} style={{cursor: "pointer"}} onClick={()=> showModalOneRetour(record.id_retours, record.id_commande)}>{record.total_retours ?? 0}</Tag>
          </Popover>
          )
        },
        {
          title: "Nbre d'échange",
          dataIndex: 'total_echange',
          key: 'total_echange',
          sorter: (a, b) => (a.total_echange ?? 0) - (b.total_echange ?? 0),
          sortDirections: ['descend', 'ascend'],
          render : (text,record)=>(
          <Popover
            content="Afficher le nombre d'articles échangés" placement="top"
          >
            <Tag color={'blue'} icon={<SwapOutlined style={{paddingRight: "8px"}}/>} style={{cursor: "pointer"}}>{record.total_echange ?? 0}</Tag>
          </Popover>
          )
        },
        {
          title: 'Date & Heure',
          dataIndex: 'date_mouvement',
          key: 'date_mouvement',
          sorter: (a, b) => a.date_mouvement - b.date_mouvement,
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
                  <Popover title="Voir la liste de mouvement de cette commande" trigger="hover">
                    <Link to={`/mouvement/${record.id_commande}`}>
                      <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                    </Link>
                  </Popover>
                  {user?.role === 'admin' &&
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id_mouvement)}
                    okText="Oui"
                    cancelText="Non"
                  >
                    <Button icon={<DeleteOutlined />} style={{ color: 'red' }} />
                  </Popconfirm> }
              </Space>
            ),
          },
      ];

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/mouvement`);
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
    item.type_mouvement?.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.nom_client?.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.nom_marque?.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.nom_commune?.toLowerCase().includes(searchValue.toLowerCase()) || 
    item.livreur?.toLowerCase().includes(searchValue.toLowerCase())
    )
  
    return (
    <>
        <div className="products">
            <div className="product-container">
                <Tabs>
                  <Tabs.TabPane tab='Vendus' key={0}>
                     <MouvementDepart/>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Commandes' key={1}>
                    <div className="product-container-top">
                      <div className="product-left">
                          <h2 className="product-h2">Mouvement de stock</h2>
                          <span>Gérer vos mouvements</span>
                      </div>
                    </div>
                    <div className="product-bottom">
                      <div className="product-bottom-top">
                          <div className="product-bottom-left">
                          {opens ?<CloseOutlined className='product-icon2' onClick={HandOpen} /> : <SisternodeOutlined className='product-icon' onClick={HandOpen} />}
                              <div className="product-row-search">
                                  <SearchOutlined className='product-icon-plus'/>
                                  <input type="search" name="" onChange={(e) => setSearchValue(e.target.value)} placeholder='Recherche...' className='product-search' />
                              </div>
                          </div>
                          <div className="product-bottom-right">
                            <Popover content={'Actualiser cette page'}>
                              <RedoOutlined className='product-icon-raf' onClick={Rafraichir}/>
                            </Popover>
                          </div>
                      </div>
                      {opens &&
                      <MouvementSelect getProduits={setData}/> }
                      <div className="rowChart-row-table">
                          <Modal
                            title="Information de client"
                            centered
                            open={open}
                            onCancel={() => setOpen(false)}
                            width={850}
                            footer={[]}
                          >
                            <MouvClientDetail idClients={idClient}/>
                          </Modal>

                          <Modal
                            title=""
                            centered
                            open={openLivraison}
                            onCancel={() => setOpenLivraison(false)}
                            width={1200}
                            footer={[]}
                          >
                            <MouvementView id={idTypeEnLivraison}/>
                          </Modal>

                          <Modal
                            title="Les articles vendus"
                            centered
                            open={openVente}
                            onCancel={() => setOpenVente(false)}
                            width={1200}
                            footer={[]}
                          >
                            <MouvementOneVente id_commande={idTypeVenteCommande} id_type={idTypeVente}/>
                          </Modal>

                          <Modal
                            title="Les articles retournés"
                            centered
                            open={openRetour}
                            onCancel={() => setOpenRetour(false)}
                            width={1200}
                            footer={[]}
                          >
                            <MouvementOneRetour id_commande={idTypeVenteCommande} id_type={idTypeRetour}/>
                          </Modal>
                          <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                      </div>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Tous' key={2}>
                     <MouvementAll/>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Retournés' key={3}>
                     <MouvementRetour/>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Echanges' key={4}>
                    <MouvementEchange/>
                  </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    </>
  )
}

export default Mouvement