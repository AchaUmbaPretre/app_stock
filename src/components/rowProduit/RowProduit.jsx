import './rowProduit.scss'
import { SearchOutlined,MoreOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Popover } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import config from '../../config';

const RowProduit = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [produit, setProduit] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchInput = useRef(null);
  const navigate = useNavigate();
  const scroll = { x: 400 };

  const content = (
    <div className='popOverSous' style={{display: 'flex', flexDirection: "column", gap: "10px"}}>
      <Link to={'/products'}>Liste des produits</Link>
      <Link to="/productForm" >Ajouter un produit</Link>
    </div>
  )

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
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
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
        <div className="userList" onClick={()=> navigate(`/productView/${record.produit_id}`)}>
          <img src={record.img} alt="" className="userImg"  />
        </div>
      )
    },
    {
      title: 'Produits',
      dataIndex: 'nom_produit',
      key: 'nom_produit',
      ...getColumnSearchProps('nom_produit'),
    },
    {
      title: 'Prix',
      dataIndex: 'prix',
      key: 'prix',
      sorter: (a, b) => a.prix.length - b.prix.length,
      sortDirections: ['descendre', 'monter'],
      render: (text) => (
        <span>
          {parseFloat(text).toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'USD',
          })}
        </span>
      ),
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/produit/produitRecement`);
        setProduit(data);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
        <div className="rowProduit">
            <div className="rowProduit-wrapper">
                <div className="rowChart-title">
                    <h3>Produits récemment ajoutés</h3>
                    <div className="rowChart-right">
                      <Popover content={content}>
                        <MoreOutlined  style={{color: 'rgb(1, 35, 138)', cursor: 'pointer' }}/>
                      </Popover>
                    </div>
                </div>
                <div className="rowChart-row-table">
                  <Table columns={columns} dataSource={produit} loading={loading} scroll={scroll} pagination={{ pageSize: 3}} />
                </div>
            </div>
        </div>
    </>
  )
}

export default RowProduit