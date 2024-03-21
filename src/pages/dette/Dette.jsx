import './../products/products.scss'
import { SearchOutlined, SisternodeOutlined,CloseOutlined,FilePdfOutlined,CloseCircleOutlined, CheckCircleOutlined, FileExcelOutlined,DollarOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popover,Popconfirm, Tag } from 'antd';
import axios from 'axios';
import config from '../../config';
import { useSelector } from 'react-redux';
import DetteSelect from './DetteSelect';

const Dette = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [idClient, setIdClient] = useState({});
    const user = useSelector((state) => state.user?.currentUser);


      const handleDelete = async (id) => {
        try {
          await axios.delete(`${DOMAIN}/api/vente/vente/dette/${id}`);
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
          title: 'N° de commande',
          dataIndex: 'id_commande',
          width: '40px',
          key: 'id_commande',
          render: (text) => (
            <Tag color={'blue'}>
              {text}
            </Tag>
          )
        },
        {
          title: 'Client',
          dataIndex: 'nom',
          key: 'nom',
          render : (text,record)=>(
            <div onClick={()=> handleOk(record.id_client)} style={{cursor: 'pointer'}}>
              <Tag color={'green'}>{text}</Tag>
            </div>
          )
        },
        {
          title: 'Telephone',
          dataIndex: 'telephone',
          key: 'telephone',
          render : (text,record)=>(
              <Tag color={'blue'}>{record.telephone}</Tag>
          )
        },
        {
          title: 'Montant payé',
          dataIndex: 'montant_paye',
          key: 'montant_paye',
          sorter: (a, b) => a.montant_paye - b.montant_paye,
          sortDirections: ['descend', 'ascend'],
          render: (text, record) => (
            <Tag color="green" icon={<DollarOutlined />}>
              {record.montant_paye.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </Tag>
          ),
        },
        {
            title: 'Montant convenu',
            dataIndex: 'montant_convenu',
            key: 'montant_convenu',
            sorter: (a, b) => a.montant_convenu - b.montant_convenu,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => (
              <Tag color="green" icon={<DollarOutlined />}>
                {record.montant_convenu.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Tag>
            ),
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
            const { data } = await axios.get(`${DOMAIN}/api/vente/vente/dette`);
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
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste des dettes</h2>
                        <span>Gérer vos dettes</span>
                    </div>
                </div>
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

export default Dette