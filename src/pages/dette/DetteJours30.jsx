import './../products/products.scss'
import { SearchOutlined,EyeOutlined, SisternodeOutlined,CalendarOutlined,WhatsAppOutlined,UserOutlined,CloseOutlined,ArrowDownOutlined, ArrowUpOutlined,FilePdfOutlined,CloseCircleOutlined, CheckCircleOutlined, FileExcelOutlined,DollarOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popover,Popconfirm, Tag } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../../config';
import { useSelector } from 'react-redux';
import DetteSelect from './DetteSelect';
import { format } from 'date-fns';
import CountUp from 'react-countup';
import moment from 'moment';

const DetteJours30 = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 450 };
    const [open, setOpen] = useState(false);
    const [recent, setRecent] = useState([]);
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
          title: 'Client',
          dataIndex: 'nom',
          key: 'nom',
          render : (text,record)=>(
            <div onClick={()=> handleOk(record.id_client)} style={{cursor: 'pointer'}}>
              <Tag color={'blue'}>
              <UserOutlined style={{ marginRight: "5px" }} />
              {text}
              </Tag>
            </div>
          )
        },
        {
            title: 'Telephone',
            dataIndex: 'telephone',
            key: 'telephone',
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
                icon = null; // Ne pas afficher d'icône si le montant restant est égal à zéro
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
            const { data } = await axios.get(`${DOMAIN}/api/vente/vente/detteJour30`);
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

  const filteredData = data?.filter((item) =>
  item.nom?.toLowerCase().includes(searchValue.toLowerCase())
);

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
                                <input type="search" name="" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Recherche...' className='product-search' />
                            </div>
                        </div>
                        <div className="product-bottom-right">
                            <FilePdfOutlined className='product-icon-pdf' />
                            <FileExcelOutlined className='product-icon-excel'/>
                            <PrinterOutlined className='product-icon-printer'/>
                        </div>
                    </div>
                    {opens &&
                    <DetteSelect getProduits={setData}/> }
                    <div className="rowChart-row-table">
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DetteJours30