import { UserOutlined,CalendarOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popover,Popconfirm, Tag, Modal, Image, Input} from 'antd';
import axios from 'axios';
import { format } from 'date-fns';
import config from '../../../config';
import LivraisonViewPrix from './LivraisonViewPrix';
import { useSelector } from 'react-redux';
import DetailPointure from '../../ventes/detailPointureVente/DetailPointure';
import PageDetails from '../../PageDetails/PageDetails';

const LivraisonView = ({id}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [idClient, setIdClient] = useState({});
    const [prix, setPrix] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [getCommande, setGetCommande] = useState([]);
    const user = useSelector((state) => state.user?.currentUser);
    const [pointure, setPointure] = useState('');
    const [idVariant, setvariant] = useState({});
    const [openVariant, setOpenVariant] = useState('');
    const [openPointure, setOpenPointure] = useState('');
    
      const handleDelete = async (id) => {
      try {
          await axios.delete(`${DOMAIN}/api/livraison/livraisonDeleteDetail/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };

      const showModals = (e,p) => {
        setOpenPointure(true);
        setvariant(e)
        setPointure(p)
      };

      const showModalPhone = (e) => {
        setOpenVariant(true);
        setvariant(e)
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
          render: (text, record) => (
            <div>
              <Popover title={`Voir la fiche de ce produit`} trigger="hover">
                <Tag color="blue" onClick={() => showModalPhone(record.id_varianteProduit)}>
                  {text}
                </Tag>
              </Popover>
            </div>
          ),
        },
        {
          title: 'Pointure',
          dataIndex: 'pointure',
          key: 'pointure',
          sorter: (a, b) => a.pointure.length - b.pointure.length,
          render: (text, record) => (
            <div>
              <Popover title={`Voir l'historique de pointure ${record.taille}`} trigger="hover">
                <Tag color="blue" onClick={() => showModals(record.id_varianteProduit, record.id_taille)}>
                  {text}
                </Tag>
              </Popover>
            </div>
          ),
        },
        {
          title: 'Client',
          dataIndex: 'nom_client',
          key: 'nom_client',
          render: (text) => (
            <Tag color={"green"}>
              <UserOutlined style={{ marginRight: "5px" }} />
              {text}
            </Tag>
          )
        },
        {
          title: 'Livreur',
          dataIndex: 'nom_livreur',
          key: 'nom_livreur',
          render: (text) => (
            <Tag color={"blue"}>
              <UserOutlined style={{ marginRight: "5px" }} />
              {text}
            </Tag>
          )
        },
        {
          title: 'Qté livrée',
          dataIndex: 'qte_livre',
          key: 'qte_livre',
          sorter: (a, b) => a.qte_livre - b.qte_livre,
          sortDirections: ['descend', 'ascend'],
          render: (text) => (
            <Tag color={"blue"}>
              {text}
            </Tag>
          )
        },
        {
            title: 'Qté en livraison',
            dataIndex: 'qte_commande',
            key: 'qte_commande',
            sorter: (a, b) => a.qte_commande - b.qte_commande,
            sortDirections: ['descend', 'ascend'],
            render: (text) => (
              <Tag color={"green"}>
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
            render: (text,record) => (
              <span>
              <Tag color={'green'} onClick={()=> showModal(record.id_detail_livraison)}>
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
              return <span>
              {<Tag color={'blue'} icon={<CalendarOutlined />}>{format(new Date(text), 'dd-MM-yyyy')}</Tag>}
              </span>;
            },
        },
        {
          title: 'Modifié par',
          dataIndex: 'modifier',
          key: 'modifier',
          render: (text) => (
            <Tag color={text === null ? 'green' : 'blue'}>
              {text !== null ? <UserOutlined style={{ marginRight: '5px' }} /> : null}
              {text !== null ? text : 'Non modifié'}
            </Tag>
          ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
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
                </Popover>}
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
      }, [DOMAIN,id]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/livraison/livraisonPrix/${idClient}`);
            setPrix(data[0].prix);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,idClient]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/commande/commandeOne/${id}`);
            setGetCommande(data[0]);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,id]);

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
                        <h2 className="product-h2">Détail de la livraison N° {id}</h2>
                        <span>de {getCommande?.nom} de la commune {getCommande?.nom_commune} Av/ {getCommande?.avenue} Q/ {getCommande?.quartier} N° {getCommande?.num}</span>
                    </div>
                    <div className="varianteProduit-right" style={{display:'flex', flexDirection:'column'}}>
                      <h2 style={{fontSize:'1rem', color:'rgb(1, 35, 138)'}}>Contact de {getCommande?.nom}</h2>
                      <span className="variant-name" style={{fontSize:'.8rem', color:'#6d6c6c'}}>{getCommande?.telephone}</span>
                    </div>
                </div>
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
{/*                             <SisternodeOutlined className='product-icon' /> */}
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
                        <Modal
                          title="Modifier le prix"
                          centered
                          open={open}
                          onCancel={() => setOpen(false)}
                          width={400}
                          footer={[
                            
                          ]}
                        >
                         <LivraisonViewPrix prixTotal={prix} idDetail={idClient} userUpdate={user.id} idLivraison={id} /> 
                        </Modal>

                        <Modal
                          title=""
                          centered
                          open={openVariant}
                          onCancel={() => setOpenVariant(false)}
                          width={1000}
                          footer={[]}
                        >
                          <PageDetails id={idVariant}/>
                        </Modal>
                        
                        <Modal
                          title=""
                          centered
                          open={openPointure}
                          onCancel={() => setOpenPointure(false)}
                          width={1100}
                          footer={[]}
                        >
                          <DetailPointure idVariant={idVariant} idTaille={pointure}/>
                        </Modal>
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default LivraisonView