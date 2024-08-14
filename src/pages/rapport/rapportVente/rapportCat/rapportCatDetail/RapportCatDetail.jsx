import { SearchOutlined, CloseOutlined,SisternodeOutlined, CalendarOutlined} from '@ant-design/icons';
import { Table, Tag, Image, Input } from 'antd';
import React, { useEffect,useState } from 'react';
import axios from 'axios';
import config from '../../../../../config';
import moment from 'moment';
import CountUp from 'react-countup';

const RapportCatDetail = ({id}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getRapport, setGetRapport] = useState([]);
    const [getRap, setGetRap] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [catName,setcatName] = useState('');
    
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
      title: 'Categorie',
      dataIndex: 'nom_categorie',
      key: 'categorie',
      render: (categorie) => (
        <Tag color={'blue'}>{categorie}</Tag>
      ),
    },
    {
      title: 'Marque',
      dataIndex: 'nom_marque',
      key: 'nom_marque',
      render: (nom_marque) => (
        <Tag color={'green'}>{nom_marque}</Tag>
      ),
    },
    {
      title: 'Pointure',
      dataIndex: 'taille',
      key: 'taille',
      sorter: (a, b) => a.taille - b.taille,
      sortDirections: ['descend', 'ascend'],
      render: (taille) => (
        <Tag color={'blue'}>{taille}</Tag>
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
        } else if (color === 'Blanc'){
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
          <Tag color={'blue'} icon={<CalendarOutlined />}>
            {moment(text).format('DD-MM-yyyy')}
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
      title: 'Montant vendu',
      dataIndex: 'montant_vendu',
      key: 'quantite_vendue',
      sorter: (a, b) => a.montant_vendu - b.montant_vendu,
      sortDirections: ['descend', 'ascend'],
      render: (montant_vendu) => (
        <Tag color={montant_vendu > 0 ? 'green' : 'red'}>{montant_vendu}</Tag>
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
    }
];

const HandOpen = () =>{
  setOpen(!open)
}

useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/rapport/rapport/venteAllCat?id_cat=${id}`);
        
        setGetRapport(data);
        setcatName(data[0]?.nom_categorie)
        setLoading(false)

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN,id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/rapport/rapport/venteAllRapCat?id_cat=${id}`);
        setGetRap(data);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN,id]);

const filteredData = getRapport?.filter((item) =>
  item.nom_marque.toLowerCase().includes(searchValue.toLowerCase()) ||
  item.nom_categorie.toLowerCase().includes(searchValue.toLowerCase())
)

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Rapport de ventes de {catName}</h2>
                        <span>Gérez votre rapport de ventes de {catName}</span>
                    </div>
                    <div className="" style={{background: '#fafafa', padding: "10px 15px", borderRadius: '10px', boxShadow: '0px 0px 15px -10px rgba(0,0,0,0.75)'}}>
                      <div style={{ display: 'flex', fontSize: '13px', marginBottom:'8px', fontWeight: 'bold' }}>
                        {`Du ${moment(getRap[0]?.date_plus_ancienne).format('DD-MM-YYYY')} au ${moment(getRap[0]?.date_plus_recente).format('DD-MM-YYYY')}`}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column',gap: '6px', fontSize: '13px' }}>
                        <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nbre d'article {catName} vendue: <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={getRap[0]?.nbre_article_vendue}/></b></p>
                        <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nbre de client(e) acheté(e): <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={getRap[0]?.nbre_de_vente}/></b></p>
                        <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nbre de commande: <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={getRap[0]?.nbre_commande}/></b></p>
                      </div>
                    </div>
                </div>
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
                    {/* {open &&
                    <RapportVenteAllSelects getProduits={setGetRapport} id={id}/> } */}
                    <div className="rowChart-row-table">
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default RapportCatDetail