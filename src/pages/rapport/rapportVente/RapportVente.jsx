import './rapportVente.scss'
import { SearchOutlined, CloseOutlined,SisternodeOutlined,EyeOutlined,RedoOutlined, CalendarOutlined, FilePdfOutlined,DollarOutlined, FileExcelOutlined,PrinterOutlined } from '@ant-design/icons';
import { Button, Space, Table, Popover, Tag, Image, Tabs, Modal } from 'antd';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config';
import RapportVenteSelects from './rapportVenteSelects/RapportVenteSelects';
import { format } from 'date-fns';
import RapportVenteCouleur from './rapportVenteCouleur/RapportVenteCouleur';
import RapportAjour from './rapportAjour/RapportAjour';
import Rapport7jours from './rapport7jour/Rapport7jours';
import Rapport30jours from './rapport30jours/Rapport30jours';
import moment from 'moment';
import CountUp from 'react-countup';
import RapportVenteCode from './rapportVenteCodeVariante/RapportVenteCode';

const RapportVente = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getRapport, setGetRapport] = useState([]);
    const [recent, setRecent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');
    const [codeVariant, setCodeVariant] = useState('');

const columns = [
    { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
    {
      title: 'image',
      dataIndex: 'img',
      key: 'img',
      render: (text, record) => (
        <div className="userList">
          <Image
            className="userImg"
            src="error"
            fallback={`${DOMAIN}${record.img}`}
          />
        </div>
      ),
    },
    {
      title: 'Marque',
      dataIndex: 'nom_marque',
      key: 'nom_marque',
      render: (nom_marque) => (
        <Tag color={'blue'}>{nom_marque}</Tag>
      ),
    },
    {
      title: 'Categorie',
      dataIndex: 'nom_categorie',
      key: 'categorie',
      render: (categorie) => (
        <Tag color={'blue'}>{categorie}</Tag>
      ),
    },
    {
      title: 'Couleur',
      dataIndex: 'description',
      key: 'description',
      render: (color) => {
        let tagColor;
      
        if (color === 'Rouge') {
          tagColor = '#FF0000';
        } else if (color === 'Noir') {
          tagColor = 'black';
        } else if (color === 'Noir brillant'){
          tagColor = '#000';
        } else if (color === 'Orange') {
          tagColor = 'orange';
        } else if (color === 'Bleu') {
          tagColor = 'skyblue';
        } else if (color === 'Bleu ciel'){
          tagColor = '#87CEEB';
        } else if (color === 'Chocolat') {
          tagColor = 'chocolate';
        } else if (color === 'Vert fluo') {
          tagColor = 'lime';
        } else if (color === 'Vert') {
          tagColor = ' #008000';
        }else if (color === 'Vert clair'){
          tagColor = '#90EE90';
        } else if (color === 'Rose fuschia') {
          tagColor = '#FF00FF';
        }else if (color === 'Rose'){
          tagColor = '#FFC0CB';
        } else if (color === 'Beige saumon') {
          tagColor = 'burlywood';
        } else if (color === 'Jaune') {
          tagColor = 'yellow';
        } else if (color === 'Gris') {
          tagColor = 'gray';
        } else if (color === 'Violet') {
          tagColor = 'purple';
        } else if (color === 'Mauve') {
          tagColor = '#D473D4';
        } else if (color === 'Argente'){
          tagColor = '#C0C0C0';
        } else if (color === 'Dorée'){
          tagColor = '#C0C0C0';
        }else if (color === 'Rouge Bordeau'){
          tagColor = '#6D071A';
        }else if (color === 'Beige'){
          tagColor = '#F5F5DC';
        }else if (color === 'Marron fonce'){
          tagColor = '#800000';
        }else if (color === 'Marron'){
          tagColor = '#A52A2A';
        }else if (color === 'Blanc'){
          tagColor = 'white';
        } else {
          // Couleur par défaut si aucune correspondance n'est trouvée
          tagColor = 'default';
        }
      
        return (
          <Tag color={tagColor}>{color}</Tag>
        );
      },
    },
      {
        title: 'Date',
        dataIndex: 'date_vente',
        key: 'date',
        sorter: (a, b) => a.date_vente - b.date_vente,
        sortDirections: ['descend', 'ascend'],
        render: (text) => (
          <Tag color="blue" icon={<CalendarOutlined />}>
            {format(new Date(text), 'dd-MM-yyyy')}
          </Tag>
        ),
      },
      {
        title: 'Montant vendu',
        dataIndex: 'montant_vendu',
        key: 'quantite_vendue',
        sorter: (a, b) => a.montant_vendu - b.montant_vendu,
        sortDirections: ['descend', 'ascend'],
        render: (montant_vendu) => (
          <Tag color={montant_vendu > 0 ? 'green' : 'red'} icon={<DollarOutlined />}>
            {montant_vendu.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </Tag>
        ),
      },
     {
      title: 'Qté vendue',
      dataIndex: 'quantite_vendue',
      key: 'quantite_vendue', 
      sorter: (a, b) => a.quantite_vendue - b.quantite_vendue,
      sortDirections: ['descend', 'ascend'],
      render: (quantite_vendue) => (
        <Tag color={quantite_vendue > 0 ? 'green' : 'red'}>{quantite_vendue}</Tag>
      ),
    },
    {
      title: 'Nbre vendu',
      dataIndex: 'nombre_vendu',
      key: 'nombre_vendu', 
      sorter: (a, b) => a.nombre_vendu - b.nombre_vendu,
      sortDirections: ['descend', 'ascend'],
      render: (nombre_vendu) => (
        <Tag color={nombre_vendu > 0 ? 'green' : 'red'}>{nombre_vendu}</Tag>
      ),
    },
    {
      title: 'Qté en stock',
      dataIndex: 'quantite_en_stock',
      key: 'quantite_en_stock', 
      sorter: (a, b) => a.quantite_en_stock - b.quantite_en_stock,
      sortDirections: ['descend', 'ascend'],
      render: (quantite_en_stock) => (
        <Tag color={quantite_en_stock > 0 ? 'green' : 'red'}>{quantite_en_stock}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
          
        <Space size="middle">
           <Popover title="Voir les détails" trigger="hover">
            <Link onClick={()=>HandRapportOpen(record.code_variant)}>
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

const HandRapportOpen = (e) =>{
  setOpens(!opens)
  setCodeVariant(e)
}

const Rafraichir = () =>{
  window.location.reload();
}

useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${DOMAIN}/api/rapport/rapport/venteV`);
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
  item.nom_marque.toLowerCase().includes(searchValue.toLowerCase()) ||
  item.nom_categorie.toLowerCase().includes(searchValue.toLowerCase()) ||
  item.description.toLowerCase().includes(searchValue.toLowerCase())
)

  return (
    <>
        <div className="products">
            <div className="product-container">
                <Tabs>
                  <Tabs.TabPane tab='Rapport des ventes' key={0}>
                    <div className="product-container-top">
                      <div className="product-left">
                          <h2 className="product-h2" style={{fontSize:'25px'}}>Rapport des ventes</h2>
                          <span>Gérez vos rapports des ventes</span>
                      </div>
                      <div className="" style={{background: '#fafafa', padding: "10px 15px", borderRadius: '10px', boxShadow: '0px 0px 15px -10px rgba(0,0,0,0.75)'}}>
                        <div style={{ display: 'flex', fontSize: '13px', marginBottom:'8px', fontWeight: 'bold' }}>
                          {`Du ${moment(recent[0]?.date_plus_ancienne).format('DD-MM-YYYY')} au ${moment(recent[0]?.date_plus_recente).format('DD-MM-YYYY')}`}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column',gap: '6px', fontSize: '12px' }}>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nbre d'article vendue : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={recent[0]?.nbre_article_vendue}/></b></p>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nbre de client(e) acheté(e) : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={recent[0]?.nbre_de_vente}/></b></p>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nbre de commande : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={recent[0]?.nbre_commande}/></b></p>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Montant total : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={recent[0]?.montant_total}/> $</b></p>
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
                          <div>
                            
                          </div>
                          <div className="product-bottom-right">
                            <Popover content={'Actualiser cette page'}>
                              <RedoOutlined className='product-icon-raf' onClick={Rafraichir}/>
                            </Popover>
                          </div>
                      </div>
                      {open &&
                              <RapportVenteSelects getProduits={setGetRapport} setStart_date={setStart_date} setEnd_date={setEnd_date} start_date={start_date} end_date={end_date} /> }
                      <div className="rowChart-row-table">
                          <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 15}} />
                      </div>
                    </div>

                    <Modal
                      title=""
                      centered
                      open={opens}
                      onCancel={() => setOpens(false)}
                      width={1200}
                      footer={[]}
                    >
                      <RapportVenteCode id={codeVariant}/>
                    </Modal>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Vente du jour' key={1}>
                    <RapportAjour/>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Ventes des 7 derniers jours' key={2}>
                    <Rapport7jours/>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Ventes des 30 derniers jours' key={3}>
                    <Rapport30jours/>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Rapport sur les couleurs, marques et pointures les plus vendues' key={4}>
                    <RapportVenteCouleur/>
                  </Tabs.TabPane>
                </Tabs>
            </div>
        </div>

    </>
  )
}

export default RapportVente