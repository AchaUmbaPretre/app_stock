import { CalendarOutlined,WhatsAppOutlined,UserOutlined,ArrowDownOutlined, ArrowUpOutlined,CloseCircleOutlined, CheckCircleOutlined,DollarOutlined,DeleteOutlined} from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Space, Table, Popover,Popconfirm, Tag, Select, Input } from 'antd';
import axios from 'axios';
import config from './../../../config';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
const { Option } = Select;

const DetteRapport = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 450 };
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [idClient, setIdClient] = useState({});
    const user = useSelector((state) => state.user?.currentUser);
    const [dateFilter, setDateFilter] = useState('today');

      const handleDelete = async (id) => {
        try {
          await axios.delete(`${DOMAIN}/api/vente/vente/dette`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };

      const fetchData = useCallback(async (filter) => {
        try {
          const { data } = await axios.get(`${DOMAIN}/api/vente/vente/dette_rapport`, { params: { filter } });
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
            dataIndex: 'montant_convenu',
            key: 'montant_convenu',
            sorter: (a, b) => a.montant_convenu - b.montant_convenu,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => (
              <Tag color="blue" icon={<DollarOutlined />}>
                {record.montant_convenu.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Tag>
            ),
          },
        {
          title: 'Montant payé',
          dataIndex: 'montant_paye',
          key: 'montant_paye',
          sorter: (a, b) => a.montant_paye - b.montant_paye,
          sortDirections: ['descend', 'ascend'],
          render: (text, record) => (
            <Tag color="blue" icon={<DollarOutlined />}>
              {record.montant_paye.toLocaleString('en-US', {
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
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2" style={{fontSize: '22px'}}>Rapport des ventes à crédit</h2>
                        <span></span>
                    </div>
                    <div className="" style={{background: '#fafafa', padding: "10px 15px", borderRadius: '10px', boxShadow: '0px 0px 15px -10px rgba(0,0,0,0.75)'}}>
                      
                    </div>
                </div>
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
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
                      <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DetteRapport