import './rapportVente.scss'
import { SearchOutlined, CloseOutlined,SisternodeOutlined,EyeOutlined, CalendarOutlined, FilePdfOutlined,DollarOutlined, FileExcelOutlined,PrinterOutlined } from '@ant-design/icons';
import {  CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Space, Table, Popover, Tag, Input, Image, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import config from '../../../config';
import RapportVenteSelects from './rapportVenteSelects/RapportVenteSelects';
import moment from 'moment';
import { format } from 'date-fns';
import RapportVenteCouleur from './rapportVenteCouleur/RapportVenteCouleur';

const RapportVente = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [getRapport, setGetRapport] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchInput = useRef(null);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
      const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
      };
    
      const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div
            style={{
              padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Recherche
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Supprimer
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({
                    closeDropdown: false,
                  });
                  setSearchText(selectedKeys[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                close
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1677ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{
                backgroundColor: '#ffc069',
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    
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
    },
];

const HandOpen = () =>{
  setOpen(!open)
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
                        <h2 className="product-h2">Rapport des ventes</h2>
                        <span>Gérez votre rapport des ventes</span>
                    </div>
                </div>
                <Tabs>
                  <Tabs.TabPane tab='Rapport des ventes' key={0}>
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
                              <RapportVenteSelects getProduits={setGetRapport}/> }
                      <div className="rowChart-row-table">
                          <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                      </div>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Rapport de vente par couleur vendue' key={1}>
                    <RapportVenteCouleur/>
                  </Tabs.TabPane>

                </Tabs>
            </div>
        </div>

    </>
  )
}

export default RapportVente