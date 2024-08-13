import { CalendarOutlined, ArrowUpOutlined, ArrowDownOutlined,DollarOutlined } from '@ant-design/icons';
import { Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config';
import RapportRevenuSelect from './RapportRevenuSelect';

const RapportRevenuDays = ({month}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getRapport, setGetRapport] = useState([]);
    const [loading, setLoading] = useState(true);
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    
const columns = [
    { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
    {
      title: 'Date vente',
      dataIndex: 'date_vente',
      key: 'date_vente',
      render: (text) => (
        <Tag color={'blue'} icon={<CalendarOutlined />}>{text}</Tag>
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
        render: (revenu_moyen_par_vente) => {
          const roundedRevenu = revenu_moyen_par_vente.toFixed(2);
          return (
            <Tag color={revenu_moyen_par_vente > 0 ? 'green' : 'red'} icon={revenu_moyen_par_vente > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}>
              {`$${roundedRevenu}`}
            </Tag>
          );
        },
      }   
];


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


  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                        </div>
                        <div className="product-bottom-right">
                            
                        </div>
                    </div>
                    {open &&
                    <RapportRevenuSelect getProduits={setGetRapport}/> }
                    <div className="rowChart-row-table">
                        <Table columns={columns} dataSource={getRapport} loading={loading} scroll={scroll} pagination={{ pageSize: 12}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default RapportRevenuDays