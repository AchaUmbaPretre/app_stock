import './../products/products.scss'
import { PlusOutlined,UserOutlined,WhatsAppOutlined,DollarOutlined,CalendarOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popover,Popconfirm, Tag, Modal } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import config from '../../config';
import moment from 'moment';
import FormPaiement from './formPaiement/FormPaiement';
const { Option } = Select;

const PaiementRapport = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.user?.currentUser);
    const [dateFilter, setDateFilter] = useState('today');


      const handleDelete = async (id) => {
      try {
          await axios.delete(`${DOMAIN}/api/vente/vente/paiement/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };
    
      const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width:"3%"},
        {
            title: 'Client',
            dataIndex: 'nom',
            key: 'nom',
            render: (text, record) => (
              <div>
                <Tag color="green">
                  <Space>
                    <UserOutlined />
                    {text}
                  </Space>
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
            title: 'Date de paiement',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: (a, b) => moment(a.created_at) - moment(b.created_at),
            sortDirections: ['descend', 'ascend'],
            render: (text) => (
              <Tag icon={<CalendarOutlined />} color="blue">
                {moment(text).format('DD-MM-yyyy')}
              </Tag>
            ),
          },
          {
            title: 'Montant payé',
            dataIndex: 'montant',
            key: 'montant',
            sorter: (a, b) => a.montant - b.montant,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => (
              <Tag color="green" icon={<DollarOutlined />}>
                {record.montant.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
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
                    onConfirm={() => handleDelete(record.id_paiement)}
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


      const fetchData = useCallback(async (filter) => {
        try {
          const { data } = await axios.get(`${DOMAIN}/api/vente/vente/paiement_rapport`, { params: { filter } });
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


    const handleOk = async (e) => {
      setOpen(true)
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
                        <h2 className="product-h2">Liste des paiements</h2>
                        <span>Gérer vos paiements</span>
                    </div>
                    <div className="product-right" onClick={handleOk}>
                        <PlusOutlined className='product-icon'/>
                        <span className="product-btn">Ajouter un paiement</span>
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
                            <Modal
                            centered
                            title='Ajouter une dépense'
                            open={open}
                            onCancel={() => {
                              setOpen(false)
                            }}
                            width={650}
                            footer={[
                            ]}
                          >
                              <FormPaiement/>
                          </Modal>
                          <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                      </div>
                    </div>
            </div>
        </div>
    </>
  )
}

export default PaiementRapport