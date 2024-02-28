import { SearchOutlined, CloseOutlined,SisternodeOutlined,UserOutlined, FilePdfOutlined,FileExcelOutlined,PrinterOutlined} from '@ant-design/icons';
import { Table, Tag, Image } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../../config';
import moment from 'moment';

const RapportClientAll = () => {
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
            dataIndex: 'taille',
            key: 'taille',
            render: (pointure) => (
              <Tag color={'blue'}>{pointure}</Tag>
            ),
          },
        {
          title: 'Quantité vendue',
          dataIndex: 'quantite_vendue',
          key: 'quantite_vendue',
          sorter: (a, b) => a.quantite_vendue - b.quantite_vendue,
          sortDirections: ['descend', 'ascend'],
          render: (quantite_vendue) => (
            <Tag color={'green'}>{quantite_vendue}</Tag>
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
        const { data } = await axios.get(`${DOMAIN}/api/rapport/rapportClient/venteClientAll`);
        
        setGetRapport(data);
        setLoading(false)

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN]);

 const filteredData = getRapport?.filter((item) =>
item.nom_marque.toLowerCase().includes(searchValue.toLowerCase())
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

export default RapportClientAll