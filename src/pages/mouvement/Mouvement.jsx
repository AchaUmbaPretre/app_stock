import './../products/products.scss'
import { SearchOutlined, SisternodeOutlined,EyeOutlined,ShoppingCartOutlined,ArrowLeftOutlined,ArrowUpOutlined, FilePdfOutlined,WhatsAppOutlined,UserOutlined, CloseOutlined, FileExcelOutlined,PrinterOutlined, DeleteOutlined, CalendarOutlined} from '@ant-design/icons';
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

const Mouvement = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const scroll = { x: 400 };
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [idClient, setIdClient] = useState({});
    const user = useSelector((state) => state.user?.currentUser);


      const showModal = (e) => {
        setOpen(true);
        setIdClient(e)
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
              <Tag to={`https://wa.me/${text}`} color="green" style={{ cursor: 'pointer' }}>
                <WhatsAppOutlined style={{ color: 'green', marginRight: '5px' }} />
                {text}
              </Tag>
            </Popover>
          ),
        },
        {
          title: 'Quantité',
          dataIndex: 'total_varianteproduit',
          key: 'total_varianteproduit',
          sorter: (a, b) => a.total_varianteproduit - b.total_varianteproduit,
          sortDirections: ['descend', 'ascend'],
          render : (text,record)=>(
              <Tag color={'blue'} icon={<ShoppingCartOutlined />}>{record.total_varianteproduit}</Tag>
          )
        },
        {
          title: 'Nbre vendu',
          dataIndex: 'total_vendu',
          key: 'total_vendu',
          sorter: (a, b) => (a.total_vendu ?? 0) - (b.total_vendu ?? 0),
          sortDirections: ['descend', 'ascend'],
          render: (text, record) => (
            <Tag color="green" icon={<ArrowUpOutlined style={{paddingRight: "5px"}} />}>
              {record.total_vendu ?? 0}
            </Tag>
          )
        },
        {
          title: 'Nbre retourné',
          dataIndex: 'total_retours',
          key: 'total_retours',
          sorter: (a, b) => (a.total_retours ?? 0) - (b.total_retours ?? 0),
          sortDirections: ['descend', 'ascend'],
          render : (text,record)=>(
              <Tag color={'red'} icon={<ArrowLeftOutlined style={{paddingRight: "8px"}}/>}>{record.total_retours ?? 0}</Tag>
          )
        },
        {
            title: 'Date',
            dataIndex: 'date_mouvement',
            key: 'date_mouvement',
            sorter: (a, b) => a.date_mouvement - b.date_mouvement,
            sortDirections: ['descend', 'ascend'],
              render: (text) => (
                <Tag color={'blue'} icon={<CalendarOutlined />}>
                  {moment(text).format('DD-MM-yyyy')}
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

   const filteredData = data?.filter((item) =>
    item.nom_client.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.nom_marque.toLowerCase().includes(searchValue.toLowerCase())
    )
  
    return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Mouvement de stock</h2>
                        <span>Gérer vos mouvements</span>
                    </div>
                </div>
                <Tabs>
                  <Tabs.TabPane tab='Mouvement par client' key={0}>
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
                              <FilePdfOutlined className='product-icon-pdf' />
                              <FileExcelOutlined className='product-icon-excel'/>
                              <PrinterOutlined className='product-icon-printer'/>
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
                          <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                      </div>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Mouvement complet' key={1}>
                     <MouvementAll/>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Mouvement vendu' key={2}>
                     <MouvementDepart/>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Mouvement retourné' key={3}>
                     <MouvementRetour/>
                  </Tabs.TabPane>
                </Tabs>
            </div>
        </div>

    </>
  )
}

export default Mouvement