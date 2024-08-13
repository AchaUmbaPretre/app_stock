import { SearchOutlined, CloseOutlined,SisternodeOutlined, ArrowUpOutlined, ArrowDownOutlined,DollarOutlined } from '@ant-design/icons';
import { Input, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config';
import RapportRevenuSelect from './RapportRevenuSelect';

const RapportRevenuDays = ({month}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getRapport, setGetRapport] = useState([]);
    const [getRap, setGetRap] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    
const columns = [
    { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
    {
      title: 'Mois',
      dataIndex: 'mois',
      key: 'mois',
      render: (mois) => (
        <Tag color={'blue'}>{mois}</Tag>
      ),
    },
    {
      title: 'Année',
      dataIndex: 'annee',
      key: 'annee',
      render: (annee) => (
        <Tag color={'green'}>{annee}</Tag>
      ),
    },
    {
      title: 'Nbre vente',
      dataIndex: 'nombre_vente',
      key: 'nombre_vente',
      sorter: (a, b) => a.nombre_vente - b.nombre_vente,
        sortDirections: ['descend', 'ascend'],
      render: (nombre_vente) => (
        <Tag color={'blue'}>{nombre_vente}</Tag>
      ),
    },
    {
      title: 'Qté vendue',
      dataIndex: 'quantite_vendue',
      key: 'quantite_vendue',
      sorter: (a, b) => a.quantite_vendue - b.quantite_vendue,
        sortDirections: ['descend', 'ascend'],
      render: (quantite_vendue) => (
        <Tag color={'blue'}>{quantite_vendue}</Tag>
      ),
    },
    {
        title: 'Revenu total',
        dataIndex: 'revenu_total',
        key: 'revenu_total',
        sorter: (a, b) => a.revenu_total - b.revenu_total,
        sortDirections: ['descend', 'ascend'],
        render: (revenu_total) => (
          <Tag color={revenu_total > 0 ? 'green' : 'red'} icon={<DollarOutlined />}>
            {`$${revenu_total}`}
          </Tag>
        ),
      },
{
  title: 'Revenu moyen',
  dataIndex: 'revenu_moyen_par_vente',
  key: 'revenu_moyen_par_vente',
  sorter: (a, b) => a.revenu_moyen_par_vente - b.revenu_moyen_par_vente,
  sortDirections: ['descend', 'ascend'],
  render: (revenu_moyen_par_vente) => (
    <Tag color={revenu_moyen_par_vente > 0 ? 'green' : 'red'} icon={revenu_moyen_par_vente > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}>
      {`$${revenu_moyen_par_vente}`}
    </Tag>
  ),
}
];

const HandOpen = () =>{
  setOpen(!open)
}

useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${DOMAIN}/api/rapport/rapportRevenu/revenuAllDay?months=${month}`);
      setGetRapport(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [DOMAIN,month]);

const filteredData = getRapport?.filter((item) =>
item.mois.toLowerCase().includes(searchValue.toLowerCase())
)

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                            {open ?<CloseOutlined className='product-icon2' onClick={HandOpen} /> : <SisternodeOutlined className='product-icon' onClick={HandOpen} />}
                            <Input.Search
                              type="search"
                              value={searchValue}
                              onChange={(e) => setSearchValue(e.target.value)}
                              placeholder="Recherche..."
                              className="product-search"
                            />
                        </div>
                        <div className="product-bottom-right">
                            
                        </div>
                    </div>
                    {open &&
                    <RapportRevenuSelect getProduits={setGetRapport}/> }
                    <div className="rowChart-row-table">
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 12}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default RapportRevenuDays