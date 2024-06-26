import { SearchOutlined, EyeOutlined,CalendarOutlined,UserOutlined,CloseOutlined, SisternodeOutlined,PlusCircleOutlined, FilePdfOutlined, FileExcelOutlined,EditOutlined, PrinterOutlined, DeleteOutlined,  ExclamationCircleOutlined, CheckCircleOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button,Space, Table, Popover,Popconfirm, Tag, Modal, Tabs} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import config from '../../../config';
import MouvClientDetail from '../../mouvement/mouvementClientDetail/MouvClientDetail';
import { useSelector } from 'react-redux';

const ListeCommandeJour = () => {
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
            const { data } = await axios.get(`${DOMAIN}/api/commande/commandeJour`);
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

      const HandOpen = () =>{
        setOpens(!opens)
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
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                        {opens ?<CloseOutlined className='product-icon2' onClick={HandOpen} /> : <SisternodeOutlined className='product-icon' onClick={HandOpen} />}
                            <div className="product-row-search">
                                <SearchOutlined className='product-icon-plus'/>
                                <input type="search" name="" id="" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Recherche...' className='product-search' />
                            </div>
                        </div>
                        <div className="product-bottom-right">
                            <FilePdfOutlined className='product-icon-pdf' />
                            <FileExcelOutlined className='product-icon-excel'/>
                            <PrinterOutlined className='product-icon-printer'/>
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
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 15}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ListeCommandeJour