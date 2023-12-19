import { PlusOutlined, SearchOutlined, CloseOutlined,SisternodeOutlined,EyeOutlined, FilePdfOutlined,CheckCircleOutlined, FileExcelOutlined,EditOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Popover,Popconfirm} from 'antd';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import { Tag } from 'antd';

const RapportDachats = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [getRapportDachat, setGetRapportDachat] = useState([]);
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
            <img src={record.img} alt="" className="userImg"  />
          </div>
          )
    },
    {
        title: 'Nom produit',
        dataIndex: 'nom_produit',
        key: 'nom_produit',
        ...getColumnSearchProps('nom_produit'),
    },
    {
      title: "Montant total d'achats",
      dataIndex: 'montant_total_achat',
      key: 'montant_total_achat',
      sorter: (a, b) => a.montant_total_achat - b.montant_total_achat,
      sortDirections: ['descend', 'ascend'],
      render: (montant_total_achat) => (
        <span>
        <Tag color={'green'}>
          {parseFloat(montant_total_achat).toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'USD',
          })}
        </Tag>
        
        </span>
      ),
    },
    {
      title: 'Quantité achetée',
      dataIndex: 'quantite_totale_achetee',
      key: 'quantite_totale_achetee',
      sorter: (a, b) => a.quantite_totale_achetee - b.quantite_totale_achetee,
      sortDirections: ['descend', 'ascend'],
      render: (quantite_totale_achetee) => (
        <Tag color={quantite_totale_achetee > 0 ? 'green' : 'red'}>{quantite_totale_achetee}</Tag>
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
      const { data } = await axios.get(`${DOMAIN}/api/rapport/rapportDachats`);
      setGetRapportDachat(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, []);

 const filteredData = getRapportDachat?.filter((item) =>
item.nom_produit.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Rapport d'achats</h2>
                        <span>Gérez votre rapport d'achats</span>
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

export default RapportDachats