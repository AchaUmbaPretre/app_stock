import { SearchOutlined, CloseOutlined,SisternodeOutlined,EyeOutlined,UserOutlined, FilePdfOutlined,DollarOutlined, FileExcelOutlined,PrinterOutlined} from '@ant-design/icons';
import { Button, Space, Table, Popover,Tag, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config';
import RapportClientAll from './rapportClientAll/RapportClientAll';
import RapportClientSelect from './RapportClientSelect';

const RapportClient = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getRapport, setGetRapport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    
const columns = [
    { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
    {
      title: 'Nom client',
      dataIndex: 'nom_client',
      key: 'nom_client',
      render: (nom_client) => (
        <Tag color={'blue'}><UserOutlined style={{ marginRight: "5px" }} />{nom_client}</Tag>
      ),
    },
    {
      title: 'Quantité vendue',
      dataIndex: 'total_varianteproduit',
      key: 'total_varianteproduit',
      sorter: (a, b) => a.total_varianteproduit - b.total_varianteproduit,
      sortDirections: ['descend', 'ascend'],
      render: (total_varianteproduit) => (
        <Tag color={'green'}>{total_varianteproduit}</Tag>
      ),
    },
    {
      title: 'vente moyenne',
      dataIndex: 'vente_moyenne',
      key: 'total_varianteproduit',
      sorter: (a, b) => a.vente_moyenne - b.vente_moyenne,
      sortDirections: ['descend', 'ascend'],
      render: (vente_moyenne) => (
        <Tag color={'green'}>{vente_moyenne}</Tag>
      ),
    },
    {
        title: 'Montant de total de vente',
        dataIndex: 'total_prix_vente',
        key: 'total_prix_vente',
        sorter: (a, b) => a.total_prix_vente - b.total_prix_vente,
        sortDirections: ['descend', 'ascend'],
        render: (total_prix_vente) => (
          <Tag color="blue" icon={<DollarOutlined />}>
            {total_prix_vente.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </Tag>
        ),
      },
    {
        title: 'Statut',
        dataIndex: 'statut',
        key: 'statut',
        render: (statut) => (
          <Tag color={'blue'}>{statut}</Tag>
        ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
          
        <Space size="middle">
           <Popover title="Voir les détails" trigger="hover">
            <Link to={`/rapportClientOne?client=${record.id_client}`}>
              <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
            </Link>
          </Popover>
        </Space>
      ),
    },
];

const HandOpen = () =>{
  setOpen(!open)
}

useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${DOMAIN}/api/rapport/rapportClient/venteClient`);
      setGetRapport(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [DOMAIN]);

 const filteredData = getRapport?.filter((item) =>
  item.nom_client.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Rapport des ventes par client</h2>
                        <span>Gérez votre rapport de ventes client</span>
                    </div>
                </div>
                <Tabs>
                  <Tabs.TabPane tab='Vente par client' key={0}>
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
                      <RapportClientSelect getProduits={setGetRapport}/> }
                      <div className="rowChart-row-table">
                          <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                      </div>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Vente complet' key={1}>
                    <RapportClientAll/>
                  </Tabs.TabPane>
                </Tabs>
            </div>
        </div>

    </>
  )
}

export default RapportClient