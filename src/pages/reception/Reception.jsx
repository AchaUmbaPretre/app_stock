import { SearchOutlined, CloseOutlined,SisternodeOutlined,CheckCircleOutlined,UserOutlined,EyeOutlined,CalendarOutlined, FilePdfOutlined, FileExcelOutlined,PrinterOutlined } from '@ant-design/icons';
import { Table, Tag, Space, Popover, Button, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { format } from 'date-fns';
import ReceptionSelect from './ReceptionSelect';
import { Link } from 'react-router-dom';
import ReceptionJour from './ReceptionJour';
import Reception7Jour from './Reception7Jour';

const Reception = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getRapport, setGetRapport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);

const columns = [
    { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
    {
      title: 'Date de réception',
      dataIndex: 'date_reception',
      key: 'date_reception',
      sorter: (a, b) => a.date_reception - b.date_reception,
      sortDirections: ['descend', 'ascend'],
      render: (text) => (
        <Tag color="blue" icon={<CalendarOutlined />}>
          {format(new Date(text), 'dd-MM-yyyy')}
        </Tag>
      ),
    },
    {
      title: 'Type de mouvement',
      dataIndex: 'type_mouvement',
      key: 'type_mouvement',
      render: (type_mouvement) => (
        <Tag color={'green'} icon={<CheckCircleOutlined />}>
          {type_mouvement}
        </Tag>
      ),
    },
    {
      title: 'Nombre de paires',
      dataIndex: 'nombre_paires',
      key: 'nombre_paires',
      sorter: (a, b) => a.nombre_paires - b.nombre_paires,
      render: (nombre_paires) => (
        <Tag color={'blue'}>{nombre_paires}</Tag>
      ),
    },
    {
      title: 'Quantité totale',
      dataIndex: 'quantite_totale',
      key: 'quantite_totale',
      sorter: (a, b) => a.quantite_totale - b.quantite_totale,
      render: (quantite_totale) => (
        <Tag color={quantite_totale > 0 ? 'green' : 'red'}>{quantite_totale}</Tag>
      ),
    },
    {
      title: 'Reçu par',
      dataIndex: 'username',
      key: 'username',
      render: (username) => (
        <Tag color={'green'} icon={<UserOutlined />}>
          {username}
        </Tag>
      ),
    },
     {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
           <Popover title="Voir les détails" trigger="hover">
            <Link to={`/receptionOne/${format(new Date(record.date_reception),'yyyy-MM-dd')}`}>
              <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
            </Link>
          </Popover>
        </Space>
      ),
    }
];

const HandOpen = () =>{
  setOpen(!open)
}

useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${DOMAIN}/api/produit/reception`);
      setGetRapport(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [DOMAIN]);

  const filteredData = getRapport?.filter((item) =>
  item.username.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Réception</h2>
                        <span>Gérez vos réceptions</span>
                    </div>
                </div>
                    <Tabs>
                      <Tabs.TabPane tab='Réceptions' key={0}>
                        <div className="product-bottom">
                        <div className="product-bottom-top">
                            <div className="product-bottom-left">
                                {open ?<CloseOutlined className='product-icon2' onClick={HandOpen} /> : <SisternodeOutlined className='product-icon' onClick={HandOpen} />}
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
                        {open &&
                                <ReceptionSelect getProduits={setGetRapport}/> }
                        <div className="rowChart-row-table">
                            <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                        </div>
                        </div>
                      </Tabs.TabPane>
                      <Tabs.TabPane tab='Réceptions du jour' key={1}>
                        <ReceptionJour/>
                      </Tabs.TabPane>
                      <Tabs.TabPane tab='Réceptions des 7 derniers jours' key={2}>
                        <Reception7Jour/>
                      </Tabs.TabPane>
                    </Tabs>
            </div>
        </div>

    </>
  )
}

export default Reception