import { SisternodeOutlined,CloseOutlined,EnvironmentOutlined, UserOutlined,CalendarOutlined,DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Input, Space, Table, Popover,Popconfirm, Tag, Image, Modal} from 'antd';
import axios from 'axios';
import config from '../../config';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import MouvementAllSelect from './MouvementAllSelect';
import PageDetails from '../PageDetails/PageDetails';
import DetailPointure from '../ventes/detailPointureVente/DetailPointure';

const MouvementAll = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [idVariant, setvariant] = useState({});
    const [openVariant, setOpenVariant] = useState('');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [opens, setOpens] = useState(false);
    const scroll = { x: 500 };
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const user = useSelector((state) => state.user?.currentUser);
    const [openPointure, setOpenPointure] = useState('');
    const [pointure, setPointure] = useState('');
    

      const showModalPhone = (e) => {
        setOpenVariant(true);
        setvariant(e)
      };

      const showModal = (e,p) => {
        setOpenPointure(true);
        setvariant(e)
        setPointure(p)
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
          render: (text, record) => {
            return <Tag color={"blue"} onClick={()=>showModalPhone(record.id_varianteProduit)}>{text}</Tag>;
          },
        },
        {
          title: 'Pointure',
          dataIndex: 'taille',
          key: 'taille',
          render: (text, record) => (
            <div>
              <Popover title={`Voir l'historique de pointure ${record.taille}`} trigger="hover">
                <Tag color="blue" onClick={() => showModal(record.id_varianteProduit, record.id_taille)}>
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
          render: (text, record) => {
            return <Tag color={"green"}>{text}</Tag>;
          },
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
            title: 'Type mouv',
            dataIndex: 'type_mouvement',
            key: 'type_mouvement',
            render: (text, record) => {
              const color = record.id_type_mouvement === 5 ? 'red' : 'green';
              return <Tag color={color}>{text}</Tag>;
            },
          },
          {
            title: 'Quantité',
            dataIndex: 'quantite',
            key: 'quantite',
            sorter: (a, b) => a.quantite - b.quantite,
            sortDirections: ['descend', 'ascend'],
            render: (quantite) => (
              <Tag color={quantite > 0 ? 'green' : 'red'}>{quantite}</Tag>
            ),
        },
        {
          title: 'Qté stock',
          dataIndex: 'stock',
          key: 'stock',
          sorter: (a, b) => a.stock - b.stock,
          sortDirections: ['descend', 'ascend'],
          render: (stock) => (
            <Tag color={stock > 0 ? 'green' : 'red'}>{stock}</Tag>
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
                    onConfirm={() => handleDelete(record.id_mouvement)}
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

      const HandOpen = () =>{
        setOpens(!opens)
      };

      const showModalLivreur = (e) => {
        navigate(`/mouvementOne/${e}`)
      };

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/mouvementALL`);
            setData(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);
  
   const filteredData = data?.filter((item) =>
    item.nom_marque?.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.nom_commune?.toLowerCase().includes(searchValue.toLowerCase()) || 
    item.nom_client?.toLowerCase().includes(searchValue.toLowerCase()) || 
    item.livreur?.toLowerCase().includes(searchValue.toLowerCase())
  )
  
    return (
    <>
        <div className="products">
            <div className="product-container">
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
                    </div>
                    {opens &&
                      <MouvementAllSelect getProduits={setData}/> }
                    <div className="rowChart-row-table">
                      <Table 
                        columns={columns} 
                        dataSource={filteredData} 
                        loading={loading} 
                        scroll={scroll} 
                        bordered
                        size="middle"
                      />
                    </div>
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
                </div>
            </div>
        </div>
    </>
  )
}

export default MouvementAll