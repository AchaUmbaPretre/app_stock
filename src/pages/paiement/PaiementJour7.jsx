import './../products/products.scss'
import { SearchOutlined, UserOutlined,WhatsAppOutlined, DollarOutlined,CalendarOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popover,Popconfirm, Tag, Modal } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import config from '../../config';
import moment from 'moment';
import FormPaiement from './formPaiement/FormPaiement';
import PaiementSelect from './PaiementSelect';

const PaiementJour7 = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const user = useSelector((state) => state.user?.currentUser);


      const handleDelete = async (id) => {
      try {
          await axios.delete(`${DOMAIN}/api/vente/vente/paiement/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };

      const HandOpen = () => {
        setOpens(!opens);
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

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/vente/vente/paiementJour7`);
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
                              <div className="product-row-search">
                                  <SearchOutlined className='product-icon-plus'/>
                                  <input type="search" name="" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Recherche...' className='product-search' />
                              </div>
                          </div>
                          <div className="product-bottom-right">
                          </div>
                      </div>
                      {opens &&
                      <PaiementSelect getProduits={setData}/> }
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

export default PaiementJour7