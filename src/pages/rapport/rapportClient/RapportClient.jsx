import { SearchOutlined, CloseOutlined,CalendarOutlined, SisternodeOutlined,EyeOutlined,UserOutlined,DollarOutlined} from '@ant-design/icons';
import { Button, Space, Table, Popover,Tag, Tabs, Modal, Input } from 'antd';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config';
import RapportClientAll from './rapportClientAll/RapportClientAll';
import RapportClientSelect from './RapportClientSelect';
import CountUp from 'react-countup';
import moment from 'moment';
import RapportClientVenteOne from './RapportClientVenteOne';

const RapportClient = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getRapport, setGetRapport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [recent, setRecent] = useState([]);
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [idClient, setIdClient] = useState({});
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date ] = useState('');


    const HandClient = (e) => {
      setOpens(true)
      setIdClient(e)
    }
    
const columns = [
    { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
    {
      title: 'NomDelaClient(e)',
      dataIndex: 'nom_client',
      key: 'nom_client',
      render: (nom_client) => (
        <Tag color={'blue'}><UserOutlined style={{ marginRight: "5px" }} />{nom_client}</Tag>
      ),
    },
    {
      title: 'Qté vendue',
      dataIndex: 'total_varianteproduit',
      key: 'total_varianteproduit',
      sorter: (a, b) => a.total_varianteproduit - b.total_varianteproduit,
      sortDirections: ['descend', 'ascend'],
      render: (total_varianteproduit) => (
        <Tag color={'green'}>{total_varianteproduit}</Tag>
      ),
    },
    {
      title: 'Nbre vente',
      dataIndex: 'nombre_ventes',
      key: 'nombre_ventes',
      sorter: (a, b) => a.nombre_ventes - b.nombre_ventes,
      sortDirections: ['descend', 'ascend'],
      render: (nombre_ventes) => (
        <Tag color={'green'}>{nombre_ventes}</Tag>
      ),
    },
    {
      title: 'Vente moyenne',
      dataIndex: 'vente_moyenne',
      key: 'total_varianteproduit',
      sorter: (a, b) => a.vente_moyenne - b.vente_moyenne,
      sortDirections: ['descend', 'ascend'],
      render: (vente_moyenne) => (
        <Tag color={'green'}>{vente_moyenne}</Tag>
      ),
    },
    {
        title: '# Tot de vente',
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
        title: 'Derniére date',
        dataIndex: 'derniere_date_achat',
        key: 'derniere_date_achat',
        sorter: (a, b) => moment(a.derniere_date_achat) - moment(b.derniere_date_achat),
        sortDirections: ['descend', 'ascend'],
        render: (text) => (
          <Tag icon={<CalendarOutlined />} color="blue">
            {moment(text).format('DD-MM-yyyy')}
          </Tag>
        ),
      },
/*     {
        title: 'Statut',
        dataIndex: 'statut',
        key: 'statut',
        render: (statut) => (
          <Tag color={'blue'}>{statut}</Tag>
        ),
    }, */
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
          
        <Space size="middle">
           <Popover title="Voir les détails" trigger="hover">
            <Link onClick={()=>HandClient(record.id_client)}>
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

useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${DOMAIN}/api/rapport/rapport/venteRecent?start_date=${start_date}&end_date=${end_date}&searchValue=${searchValue}`);
      setRecent(data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [DOMAIN,start_date,end_date,searchValue]);

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
                    <div className="" style={{background: '#fafafa', padding: "10px 15px", borderRadius: '10px', boxShadow: '0px 0px 15px -10px rgba(0,0,0,0.75)'}}>
                      <div style={{ display: 'flex', fontSize: '13px', marginBottom:'8px', fontWeight: 'bold' }}>
                        {/* {`Du ${moment(recent[0]?.date_plus_ancienne).format('DD-MM-YYYY')} à ${moment(recent[0]?.date_plus_recente).format('DD-MM-YYYY')}`} */}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column',gap: '6px', fontSize: '13px' }}>
                        <p style={{display:'flex', gap:'5px', justifyContent: 'space-between'}}>Nbre d'article vendue: <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={recent[0]?.nbre_article_vendue}/></b></p>
                        <p style={{display:'flex', gap:'5px',justifyContent: 'space-between'}}>Nbre de client(e) acheté(e): <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={recent[0]?.nbre_de_vente}/></b></p>
                        <p style={{display:'flex', gap:'5px', justifyContent: 'space-between'}}>Nbre de commande: <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={recent[0]?.nbre_commande}/></b></p>
                      </div>
                    </div>
                </div>
                <Tabs>
                  <Tabs.TabPane tab='Vente par client' key={0}>
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
                      <RapportClientSelect getProduits={setGetRapport}  setStart_date={setStart_date} setEnd_date={setEnd_date} start_date={start_date} end_date={end_date}/> }
                      <div className="rowChart-row-table">
                          <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 15}} />
                      </div>
                      
                      <Modal
                        title=""
                        centered
                        open={opens}
                        onCancel={() => setOpens(false)}
                        width={1200}
                        footer={[]}
                      >
                        <RapportClientVenteOne id={idClient}/>
                      </Modal>
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