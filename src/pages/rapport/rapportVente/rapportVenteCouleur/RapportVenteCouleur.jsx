import { SearchOutlined, CloseOutlined,EyeOutlined,SisternodeOutlined,InfoCircleOutlined, FilePdfOutlined,FileExcelOutlined,PrinterOutlined } from '@ant-design/icons';
import { Button, Popover, Space, Table,Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../../config';
import { Link, useNavigate } from 'react-router-dom';

const RapportVenteCouleur = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const navigate = useNavigate()
    const [getRapport, setGetRapport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [taille, setTaille] = useState([]);

    const showModal = (e) => {
      navigate(`/rapportVenteCouleurTaille?taille=${e}`);
    };

    
const columns = [
    { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
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
        title: 'Categorie',
        dataIndex: 'categorie_plus_vendue',
        key: 'categorie',
        render: (categorie) => (
          <Tag color={'blue'}>{categorie}</Tag>
        ),
      },
      {
        title: 'Pointure',
        dataIndex: 'taille_plus_vendue',
        key: 'pointure',
        sorter: (a, b) => a.taille_plus_vendue - b.taille_plus_vendue,
        sortDirections: ['descend', 'ascend'],
        render: (pointure,record) => (
          <Popover
            content="Cliquez ici pour voir les Informations sur les pointures les plus vendues"
            title="Pointures les plus vendues"
            trigger="hover"
          >
            <Tag color="blue" onClick={()=> showModal(record.taille_plus_vendue)} style={{ cursor: 'pointer' }}>
              {pointure} <InfoCircleOutlined />
            </Tag>
          </Popover>
        ),
      },
      {
        title: 'Nombre vendu',
        dataIndex: 'nombre_vendu',
        key: 'nombre_vendu',
        sorter: (a, b) => a.nombre_vendu - b.nombre_vendu,
        sortDirections: ['descend', 'ascend'],
        render: (nombre_vendu) => (
          <Tag color={nombre_vendu > 0 ? 'green' : 'red'}>{nombre_vendu}</Tag>
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
      title: 'Marque',
      dataIndex: 'marque_plus_vendue',
      key: 'marque',
      render: (marque) => (
        <Tag color={'blue'}>{marque}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
          
        <Space size="middle">
           <Popover title="Voir les détails" trigger="hover">
            <Link to={`/rapportCouleurAll/${record.id_couleur}/${record.id_marque}`}>
              <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
            </Link>
          </Popover>
        </Space>
      ),
    }
];

const HandOpen = () =>{
  setOpen(!open)
}

useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${DOMAIN}/api/rapport/rapport/venteCouleur`);
      setGetRapport(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [DOMAIN]);

 const filteredData = getRapport?.filter((item) =>
  item.description.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <>
        <div className="products">
            <div className="product-container">
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
{/*                     {open &&
                    <RapportVenteSelects getProduits={setGetRapport}/> } */}
                    <div className="rowChart-row-table">
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default RapportVenteCouleur