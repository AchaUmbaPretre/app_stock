import { SearchOutlined, CloseOutlined,SisternodeOutlined, ArrowUpOutlined, ArrowDownOutlined,FilePdfOutlined,DollarOutlined, FileExcelOutlined,PrinterOutlined} from '@ant-design/icons';
import { Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config';
import RapportRevenuSelect from './RapportRevenuSelect';
import CountUp from 'react-countup';

const RapportRevenu = () => {
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
      title: 'Nombre de vente',
      dataIndex: 'nombre_vente',
      key: 'nombre_vente',
      sorter: (a, b) => a.nombre_vente - b.nombre_vente,
        sortDirections: ['descend', 'ascend'],
      render: (nombre_vente) => (
        <Tag color={'blue'}>{nombre_vente}</Tag>
      ),
    },
    {
      title: 'Quantité vendue',
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
      const { data } = await axios.get(`${DOMAIN}/api/rapport/rapportRevenu/revenu`);
      setGetRapport(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [DOMAIN]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${DOMAIN}/api/rapport/rapportRevenu/revenuRapDuMois`);
      setGetRap(data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [DOMAIN]);

const filteredData = getRapport?.filter((item) =>
item.mois.toLowerCase().includes(searchValue.toLowerCase())
)

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Rapport des revenus</h2>
                        <span>Gérez votre revenus</span>
                    </div>
                    <div className="" style={{background: '#fafafa', padding: "10px 15px", borderRadius: '10px', boxShadow: '0px 0px 15px -10px rgba(0,0,0,0.75)'}}>
                      <div style={{ display: 'flex', fontSize: '12px', marginBottom:'8px', fontWeight: 'bold' }}>
                        {`Mois : ${getRap[0]?.mois}`}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column',gap: '6px', fontSize: '13px' }}>
                        <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nbre d'article vendue: <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={getRap[0]?.quantite_vendue}/></b></p>
                        <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nbre de commande: <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={getRap[0]?.nombre_vente}/></b></p>
                        <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Revenu total: <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={getRap[0]?.revenu_total}/></b></p>
                      </div>
                    </div>
                </div>
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
                    <RapportRevenuSelect getProduits={setGetRapport}/> }
                    <div className="rowChart-row-table">
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 5}} />
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default RapportRevenu