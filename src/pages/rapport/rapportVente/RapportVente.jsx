import './rapportVente.scss'
import { SearchOutlined, CloseOutlined,SisternodeOutlined,EyeOutlined, FilePdfOutlined,DollarOutlined, FileExcelOutlined,EditOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import {  CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Space, Table, Popover,Popconfirm, Tag, Input } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import RapportVenteSelects from './rapportVenteSelects/RapportVenteSelects';

const RapportVente = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [getRapport, setGetRapport] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchInput = useRef(null);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const navigate = useNavigate();
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
            <img src={`${DOMAIN}${record.img}`} alt="" className="userImg"  />
          </div>
          )
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
      render: (taille) => (
        <Tag color={'blue'}>{taille}</Tag>
      ),
    },
/*     {
      title: 'Couleur',
      dataIndex: 'description',
      key: 'description',
      render: (color) => {
        let icon;
        let iconColor;
  
        if (color === 'Rouge') {
          icon = <CheckCircleOutlined />;
          iconColor = 'red';
        } else if (color === 'Noir') {
          icon = <CheckCircleOutlined />;
          iconColor = 'black';
        } else if (color === 'Orange') {
          icon = <CheckCircleOutlined />;
          iconColor = 'orange';
        } else if (color === 'Bleu') {
          icon = <CheckCircleOutlined />;
          iconColor = 'skyblue';
        } else if (color === 'Chocolat') {
          icon = <CheckCircleOutlined />;
          iconColor = 'chocolate';
        }
  
        return (
          <span style={{ color: iconColor, display: 'flex', gap:'5px'}}>
            {icon}
            {color}
          </span>
        );
      },
    }, */
/*     {
      title: 'Taille',
      dataIndex: 'pointure',
      key: 'pointure',
    }, */
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
        title: 'Qté en stock',
        dataIndex: 'quantite_en_stock',
        key: 'quantite_en_stock',
        sorter: (a, b) => a.quantite_en_stock - b.quantite_en_stock,
        sortDirections: ['descend', 'ascend'],
        width: "18%",
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
            <Link to={`/rapportVenteAll/${record.id_marque}`}>
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
      const { data } = await axios.get(`${DOMAIN}/api/rapport/rapport/vente`);
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
                        <h2 className="product-h2">Rapport de ventes</h2>
                        <span>Gérez votre rapport de ventes</span>
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
                    <RapportVenteSelects getProduits={setGetRapport}/> }
                    <div className="rowChart-row-table">
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 5}} />
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default RapportVente