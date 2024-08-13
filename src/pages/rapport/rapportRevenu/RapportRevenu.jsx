import { SearchOutlined, CloseOutlined,SisternodeOutlined, ArrowUpOutlined, ArrowDownOutlined,DollarOutlined } from '@ant-design/icons';
import { Input, Modal, Popover, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config';
import RapportRevenuSelect from './RapportRevenuSelect';
import CountUp from 'react-countup';
import RapportRevenuDays from './RapportRevenuDays';

const RapportRevenu = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getRapport, setGetRapport] = useState([]);
    const [getRap, setGetRap] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [month, setMonth] = useState('');
    const [nameMonth, setNameMonth] = useState('');

    // Fonction pour convertir le mois en numéro
const monthToNumber = (month) => {
  const months = {
    'Janvier': '01',
    'Février': '02',
    'Mars': '03',
    'Avril': '04',
    'Mai': '05',
    'Juin': '06',
    'Juillet': '07',
    'Août': '08',
    'Septembre': '09',
    'Octobre': '10',
    'Novembre': '11',
    'Décembre': '12',
  };
  return months[month] || '01';
};

const HandOpen = (mois, annee) => {
  // Convertir le mois en numéro
  const moisNumero = monthToNumber(mois);
  const formattedDate = `${annee}-${moisNumero}`;
  setMonth(formattedDate);
  setOpen(!open);
  setNameMonth(mois)
};

const HandOpens = () => {
  setOpens(!opens);
};

    
    
const columns = [
    { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
    {
      title: 'Mois',
      dataIndex: 'mois',
      key: 'mois',
      render: (text, record) => (
        <Popover title={`Voir le detail de ${text}`} trigger="hover">
          <Tag color={'blue'} onClick={()=>HandOpen(text, record.annee) }>{text}</Tag>
        </Popover>      
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
                            {opens ?<CloseOutlined className='product-icon2' onClick={HandOpens} /> : <SisternodeOutlined className='product-icon' onClick={HandOpens} />}
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
                    {opens &&
                    <RapportRevenuSelect getProduits={setGetRapport}/> }
                    <div className="rowChart-row-table">
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 12}} />
                    </div>
                    <Modal
                      title={`Rapport pour le mois de ${nameMonth}`}
                      centered
                      open={open}
                      onCancel={() => setOpen(false)}
                      width={1150}
                      footer={[]}
                    >
                      <RapportRevenuDays month={month}/>
                    </Modal>
                </div>
            </div>
        </div>

    </>
  )
}

export default RapportRevenu