import './rapportVente.scss'
import { PlusOutlined, SearchOutlined, CloseOutlined,SisternodeOutlined,EyeOutlined, FilePdfOutlined,CheckCircleOutlined, FileExcelOutlined,EditOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import {  CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Popover,Popconfirm} from 'antd';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import { Tag, Popconfir } from 'antd';

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
      dataIndex: 'image',
      key: 'img',
        render: (text, record) => (
          <div className="userList">
            <img src={record.image} alt="" className="userImg"  />
          </div>
          )
    },
/*     {
        title: 'Nom produit',
        dataIndex: 'nom_produit',
        key: 'nom_produit',
        ...getColumnSearchProps('nom_produit'),
    }, */
    {
      title: 'Categorie',
      dataIndex: 'nom_categorie',
      key: 'categorie',
    },
    {
      title: 'Marque',
      dataIndex: 'nom_marque',
      key: 'nom_marque',
    },
    {
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
    },
    {
      title: 'Taille',
      dataIndex: 'pointure',
      key: 'pointure',
    },
/*     {
      title: 'Quantité vendue',
      dataIndex: 'quantite_vendue',
      key: 'quantite_vendue',
      sorter: (a, b) => a.quantite_vendue - b.quantite_vendue,
      sortDirections: ['descend', 'ascend'],
      render: (quantite_vendue) => (
        <Tag color={quantite_vendue > 0 ? 'green' : 'red'}>{quantite_vendue}</Tag>
      ),
    }, */
    {
        title: 'Qté en stock',
        dataIndex: 'stock',
        key: 'stock',
        sorter: (a, b) => a.stock - b.stock,
        sortDirections: ['descend', 'ascend'],
        width: "18%",
        render: (stock) => (
          <Tag color={stock > 0 ? 'green' : 'red'}>{stock}</Tag>
        ),
      }
];

const HandOpen = () =>{
  setOpen(!open)
}

useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${DOMAIN}/api/inventaire`);
      setGetRapport(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, []);

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
{/*                    {open &&
                    <ProductSelects getProduits={setGetProduit}/> }  */}
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