import { SearchOutlined, CloseOutlined,UserOutlined, SisternodeOutlined, CalendarOutlined, FilePdfOutlined,DollarOutlined, FileExcelOutlined,PrinterOutlined } from '@ant-design/icons';
import { Table, Tag, Image } from 'antd';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../../config';
import { format } from 'date-fns';
import RapportCouleurSelect from './RapportCouleurSelect';

const RapportCouleurAll = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getRapport, setGetRapport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const id = useLocation().pathname.split('/')[2];
    const id_marque = useLocation().pathname.split('/')[3];


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
      title: 'Pointure',
      dataIndex: 'taille',
      key: 'taille',
      render: (taille) => (
        <Tag color={'blue'}>{taille}</Tag>
      ),
    },
    {
        title: 'Client',
        dataIndex: 'nom_client',
        key: 'nom_client',
        render: (nom_client) => (
          <Tag color={'blue'} icon={<UserOutlined />}>{nom_client}</Tag>
        ),
    },
    {
      title: 'Livreur',
      dataIndex: 'username',
      key: 'username',
      render: (username) => (
        <Tag color={'blue'} icon={<UserOutlined />}>{username}</Tag>
      ),
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
      title: 'Quantité vendue',
      dataIndex: 'quantite_vendue',
      key: 'quantite_vendue', 
      sorter: (a, b) => a.quantite_vendue - b.quantite_vendue,
      sortDirections: ['descend', 'ascend'],
      render: (quantite_vendue) => (
        <Tag color={quantite_vendue > 0 ? 'green' : 'red'}>{quantite_vendue}</Tag>
      ),
    },
    {
      title: 'Quantité en stock',
      dataIndex: 'quantite_en_stock',
      key: 'quantite_en_stock', 
      sorter: (a, b) => a.quantite_en_stock - b.quantite_en_stock,
      sortDirections: ['descend', 'ascend'],
      render: (quantite_en_stock) => (
        <Tag color={quantite_en_stock > 0 ? 'green' : 'red'}>{quantite_en_stock}</Tag>
      ),
    },
];

const HandOpen = () =>{
  setOpen(!open)
}

useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${DOMAIN}/api/rapport/rapport/venteCouleurAll?id_couleur=${id}&id_marque=${id_marque}`);
      setGetRapport(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [DOMAIN,id,id_marque]);

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
                        <h2 className="product-h2">Rapport des ventes de couleur {getRapport[0]?.description}</h2>
                        <span>Gérez votre rapport des ventes</span>
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
                              <RapportCouleurSelect getProduits={setGetRapport} id={id} id_marque={id_marque}/> }
                      <div className="rowChart-row-table">
                          <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 15}} />
                      </div>
                    </div>
            </div>
        </div>

    </>
  )
}

export default RapportCouleurAll