import { SearchOutlined, CloseOutlined,SisternodeOutlined,CheckCircleOutlined, CalendarOutlined, FilePdfOutlined, FileExcelOutlined,PrinterOutlined } from '@ant-design/icons';
import { Table, Tag, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { format } from 'date-fns';
import ReceptionSelect from './ReceptionSelect';

const Reception = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getRapport, setGetRapport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);

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
        title: 'Famille',
        dataIndex: 'nom',
        key: 'nom',
        render: (text) => (
          <Tag color="blue">
            {text}
          </Tag>
        ),
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
        title: 'Date de réception',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: (a, b) => a.created_at - b.created_at,
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
      title: 'Quantité',
      dataIndex: 'stock',
      key: 'stock', 
      sorter: (a, b) => a.stock - b.stock,
      sortDirections: ['descend', 'ascend'],
      render: (stock) => (
        <Tag color={stock > 0 ? 'green' : 'red'}>{stock}</Tag>
      ),
    },
/*     {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
          
        <Space size="middle">
           <Popover title="Voir les détails" trigger="hover">
            <Link to={`/rapportVenteV/${record.code_variant}`}>
              <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
            </Link>
          </Popover>
        </Space>
      ),
    }, */
];

const HandOpen = () =>{
  setOpen(!open)
}

useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${DOMAIN}/api/produit/reception`);
      setGetRapport(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [DOMAIN]);

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

export default Reception