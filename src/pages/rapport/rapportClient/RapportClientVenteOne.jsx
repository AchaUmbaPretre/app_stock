import { SearchOutlined, CloseOutlined,SisternodeOutlined,UserOutlined, FilePdfOutlined,FileExcelOutlined,PrinterOutlined} from '@ant-design/icons';
import { Table, Tag, Image } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config';
import moment from 'moment';

const RapportClientVenteOne = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getRapport, setGetRapport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('client');
    const [open, setOpen] = useState(false);
    const [marqueName,setMarqueName] = useState('');
    
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
            title: 'Livreur',
            dataIndex: 'username',
            key: 'username',
            render: (username) => (
              <Tag color="green" icon={<UserOutlined />}>
                {username}
              </Tag>
            ),
          },
        {
            title: 'Date',
            dataIndex: 'date_vente',
            key: 'date',
            sorter: (a, b) => moment(a.date_vente) - moment(b.date_vente),
            sortDirections: ['descend', 'ascend'],
            render: (text) => (
              <Tag icon={<CalendarOutlined />} color="blue">
                {moment(text).format('DD-MM-yyyy')}
              </Tag>
            ),
          },
          {
            title: 'Pointure',
            dataIndex: 'pointure',
            key: 'pointure',
            render: (pointure) => (
              <Tag color={'blue'}>{pointure}</Tag>
            ),
          },
        {
          title: 'Quantité',
          dataIndex: 'total_varianteproduit',
          key: 'total_varianteproduit',
          sorter: (a, b) => a.total_varianteproduit - b.total_varianteproduit,
          sortDirections: ['descend', 'ascend'],
          render: (total_varianteproduit) => (
            <Tag color={'green'}>{total_varianteproduit}</Tag>
          ),
        },
        {
            title: 'Montant de vente',
            dataIndex: 'total_prix_vente',
            key: 'total_prix_vente',
            sorter: (a, b) => a.total_prix_vente - b.total_prix_vente,
            sortDirections: ['descend', 'ascend'],
            render: (total_prix_vente) => (
              <Tag color="blue">
                {total_prix_vente.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </Tag>
            ),
          },
        {
            title: 'Statut',
            dataIndex: 'statut',
            key: 'statut',
            render: (statut) => (
              <Tag color={'blue'}>{statut}</Tag>
            ),
        }
    ];

const HandOpen = () =>{
  setOpen(!open)
}

useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/rapport/rapportClient/${id}`);
        
        setGetRapport(data);
        setMarqueName(data[0]?.nom_client)
        setLoading(false)

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN,id]);

 const filteredData = getRapport?.filter((item) =>
item.nom_marque.toLowerCase().includes(searchValue.toLowerCase())
)

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                      <h2 className="product-h2">Rapport de ventes de {marqueName}</h2>
                      <span>Gérez votre rapport de ventes de {marqueName}</span>
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
{/*                     {open &&
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

export default RapportClientVenteOne