import { EyeOutlined,CalendarOutlined,UserOutlined,PlusCircleOutlined,EditOutlined, ExclamationCircleOutlined, CheckCircleOutlined} from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Button,Space, Table, Popover, Tag, Modal, Select, Input} from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import config from '../../../config';
import MouvClientDetail from '../../mouvement/mouvementClientDetail/MouvClientDetail';
import LivraisonView from '../../livraison/livraisonView/LivraisonView';
const { Option } = Select;


const CommandeRapport = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const scroll = { x: 400 };
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [idClient, setIdClient] = useState({});
    const location = useLocation();
    const period = new URLSearchParams(location.search).get('period');
    const [dateFilter, setDateFilter] = useState(period);
    const [id_commande, setId_commande] = useState('');
    const [openInfo, setOpenInfo] = useState(false);

    
    const fetchData = useCallback(async (filter) => {
        try {
          const { data } = await axios.get(`${DOMAIN}/api/commande/commande_rapport`, { params: { filter } });
          setData(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      }, [DOMAIN]);


    const handleDateFilterChange = (value) => {
        setDateFilter(value);
        fetchData(value);
      };

      useEffect(() => {
        fetchData(dateFilter);
      }, [fetchData,dateFilter]);
      

      const handleEdit = (id) => {
        navigate(`/Editcommande/${id}`);
    };

    const showModal = (e) => {
      setOpen(true);
      setIdClient(e)
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
          render: (text, record) => {
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
              <Popover title="Voir les details de cette livraison" trigger="hover">
                <Tag color={tagColor} onClick={()=>handInfo(record.id_commande) }>
                  {textValue}
                </Tag>
              </Popover>
            );
          },
        },
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
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
                <Popover title="Modifier" trigger="hover">
                  <Button icon={<EditOutlined />} style={{ color: 'green' }} onClick={()=> handleEdit(record.id_commande)} />
                </Popover>
                <Popover title="Voir la liste de cette commande" trigger="hover">
                  <Link to={`/listeDetailView/${record.id_commande}`}>
                    <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                  </Link>
                </Popover>
                <Popover title="Voir des produits" trigger="hover">
                    <Link to={`/commandes/${record.id_commande}`}>
                        <Button icon={<PlusCircleOutlined />} style={{ color: 'blue' }} />
                    </Link>
                </Popover>
              </Space>
            ),
          },
      ];

      const handInfo = (e) =>{
        setId_commande(e)
        setOpenInfo(true)
      }

  const filteredData = data?.filter((item) =>
  item.nom?.toLowerCase().includes(searchValue.toLowerCase()) ||
  item.nom_statut?.toLowerCase().includes(searchValue.toLowerCase())
)

  return (
    <>
        <div className="products">
            <div className="product-container">
                  <div className="product-bottom">
                  <h1 style={{fontSize:"15px", padding:"10px 0", color:'rgb(1, 35, 138)'}}>Rapport de commande</h1>
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                       {/*  {opens ?<CloseOutlined className='product-icon2' onClick={HandOpen} /> : <SisternodeOutlined className='product-icon' onClick={HandOpen} />} */}
                            <Input
                                type="search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Recherche..."
                                className="product-search"
                            />
                        </div>
                        <div className="product-bottom-rights">
                            <Select value={dateFilter} onChange={handleDateFilterChange} style={{ width: 200 }}>
                                <Option value="today">Aujourd'hui</Option>
                                <Option value="yesterday">Hier</Option>
                                <Option value="last7days">7 derniers jours</Option>
                                <Option value="last30days">30 derniers jours</Option>
                                <Option value="last1year">1 an</Option>
                            </Select>
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
                          title="Information de client"
                          centered
                          open={openInfo}
                          onCancel={() => setOpenInfo(false)}
                          width={900}
                          footer={[
                          ]}
                        >
                         <LivraisonView id={id_commande}/>
                        </Modal>

                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 15}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CommandeRapport