import { SearchOutlined, CloseOutlined,SisternodeOutlined,CheckCircleOutlined,CalendarOutlined, FilePdfOutlined, FileExcelOutlined,PrinterOutlined } from '@ant-design/icons';
import { Table, Tag, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { format } from 'date-fns';
import ReceptionSelect from './ReceptionSelect';
import { useLocation } from 'react-router-dom';

const ReceptionOne = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getRapport, setGetRapport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const {pathname} = useLocation();
    const dateId = pathname.split('/')[2];




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
            tagColor = 'red';
          } else if (color === 'Noir') {
            tagColor = 'black';
          } else if (color === 'Orange') {
            tagColor = 'orange';
          } else if (color === 'Bleu') {
            tagColor = 'skyblue';
          } else if (color === 'Chocolat') {
            tagColor = 'chocolate';
          } else if (color === 'Vert fluo') {
            tagColor = 'lime';
          } else if (color === 'Rose fuchsia') {
            tagColor = 'hotpink';
          } else if (color === 'Beige saumon') {
            tagColor = 'burlywood';
          }
      
          return (
            <Tag color={tagColor}>{color}</Tag>
          );
        },
      },
      {
        title: 'Taille',
        dataIndex: 'taille',
        key: 'taille',
        sorter: (a, b) => a.taille - b.taille,
        sortDirections: ['descend', 'ascend'],
        render: (taille) => (
          <Tag color={'blue'}>{taille}</Tag>
        ),
    },
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
        title: 'Qté reçue',
        dataIndex: 'Qte_recu',
        key: 'Qte_recu',
        sorter: (a, b) => a.Qte_recu - b.Qte_recu,
        render: (Qte_recu) => (
          <Tag color={Qte_recu > 0 ? 'green' : 'red'}>{Qte_recu}</Tag>
        ),
      },
      {
        title: 'Qté en stock',
        dataIndex: 'quantite_stock',
        key: 'quantite_stock',
        sorter: (a, b) => a.quantite_stock - b.quantite_stock,
        render: (quantite_stock) => (
          <Tag color={quantite_stock > 0 ? 'green' : 'red'}>{quantite_stock}</Tag>
        ),
      }
];

const HandOpen = () =>{
  setOpen(!open)
}

useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${DOMAIN}/api/produit/receptionOne?dateId=${dateId}`);
      setGetRapport(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [DOMAIN,dateId]);

/*  const filteredData = getRapport?.filter((item) =>
item.nom_marque.toLowerCase().includes(searchValue.toLowerCase()) ||
item.nom_categorie.toLowerCase().includes(searchValue.toLowerCase())
) */

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Réception</h2>
                        <span>Gérez vos nouveaux produits</span>
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
                              <ReceptionSelect getProduits={setGetRapport}/> }
                      <div className="rowChart-row-table">
                          <Table columns={columns} dataSource={getRapport} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                      </div>
                    </div>
            </div>
        </div>

    </>
  )
}

export default ReceptionOne