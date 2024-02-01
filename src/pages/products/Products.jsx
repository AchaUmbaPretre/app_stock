import './products.scss'
import { PlusOutlined, SearchOutlined, CloseOutlined,SisternodeOutlined,PlusCircleOutlined, FilePdfOutlined, FileExcelOutlined,PrinterOutlined, DeleteOutlined, EyeOutlined} from '@ant-design/icons';
import ProductSelects from './productSelects/ProductSelects';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Popover,Popconfirm, Modal} from 'antd';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import { Tag } from 'antd';
import ProductDetail from './productDetail/ProductDetail';
import BarReturn from '../../components/barReturn/BarReturn';

const Products = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [getProduit, setGetProduit] = useState();
    const [loading, setLoading] = useState(true);
    const searchInput = useRef(null);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const navigate = useNavigate();
    const [opens, setOpens] = useState(false);
    const [open, setOpen] = useState(false);
    const [idProduit, setIdProduit] = useState({});


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
    
    const handleDelete = async (id) => {
      try {
        await axios.put(`${DOMAIN}/api/produit/produitDelete/${id}`);
          window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };
    
  const columns = [
    { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
    {
        title: 'Nom produit',
        dataIndex: 'nom_produit',
        key: 'nom_produit',
        ...getColumnSearchProps('nom_produit'),
        render: (text,record) => 
          <Tag color={'green'} style={{cursor:'pointer'}} onClick={()=> showModal(record.id_produit)}>
            {text}
          </Tag>
    },
    {
      title: 'Categorie',
      dataIndex: 'nom_categorie',
      key: 'nom_categorie',
      render: (text) => 
          <Tag color={'orange'}>
            {text}
          </Tag>
    },
    {
      title: 'Marque',
      dataIndex: 'nom_marque',
      key: 'nom_marque',
      render: (text) => 
          <Tag color={'blue'}>
            {text}
          </Tag>
    },
    {
      title: 'Matière',
      dataIndex: 'nom_matiere',
      key: 'nom_matiere',
      render: (text) => 
          <Tag color={'rgb(128, 128, 231)'}>
            {text}
          </Tag>
    },
    {
      title: 'Famille',
      dataIndex: 'nom_famille',
      key: 'nom_famille',
      render: (text) => 
          <Tag color={'blue'}>
            {text}
          </Tag>
    },
    {
      title: 'Etat produit',
      dataIndex: 'etatProduit',
      key: 'etatProduit',
      ...getColumnSearchProps('etatProduit'),
      render: (text, record) => {
        const color = record.etatProduit === 'Actif' ? 'green' : 'red';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Date d'entrée",
      dataIndex: 'date_entrant',
      key: 'date',
        sorter: (a, b) => a.date_entrant - b.date_entrant,
      sortDirections: ['descend', 'ascend'],
        render: (text) => (
          <Tag color={'blue'}>
            {format(new Date(text), 'dd-MM-yyyy')}
          </Tag>
        ),
    }, 
    {
      title: 'Action',
      key: 'action',
        render: (text, record) => (
                
          <Space size="middle">
             <Popover title="Voir les details" trigger="hover">
              <Button icon={<EyeOutlined />} style={{ color: 'green' }} onClick={()=> showModal(record.id_produit)} />
            </Popover>
            <Popover title="Ajoutez des produits" trigger="hover">
              <Link to={`/productView/${record.id_produit}`}>
                <Button icon={<PlusCircleOutlined />} style={{ color: 'blue' }} />
              </Link>
            </Popover>
            <Popover title="Supprimer" trigger="hover">
              <Popconfirm
                title="Êtes-vous sûr de vouloir supprimer?"
                onConfirm={() => handleDelete(record.id_produit)}
                okText="Oui"
                cancelText="Non"
              >
                <Button icon={<DeleteOutlined />} style={{ color: 'red' }} />
              </Popconfirm>
            </Popover>
          </Space>
        ),
    },
  ];

const HandOpen = () =>{
  setOpens(!opens)
}

useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${DOMAIN}/api/produit`);
      setGetProduit(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [DOMAIN]);

const showModal = (e) => {
  setOpen(true);
  setIdProduit(e)
};

const filteredData = getProduit?.filter((item) => 
  item.nom_produit?.toLowerCase().includes(searchValue.toLowerCase()) ||
  item.nom_categorie?.toLowerCase().includes(searchValue.toLowerCase()) ||
  item.nom_marque?.toLowerCase().includes(searchValue.toLocaleLowerCase())

);

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste des produits</h2>
                        <span>Gérer vos produits</span>
                    </div>
                    <div className="product-right" onClick={() =>navigate('/productForm')}>
                        <PlusOutlined className='product-icon'/>
                        <span className="product-btn">Ajouter un nouveau produit</span>
                    </div>
                </div>
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                            {opens ?<CloseOutlined className='product-icon2' onClick={HandOpen} /> : <SisternodeOutlined className='product-icon' onClick={HandOpen} />}
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
                    <BarReturn/>
                   {opens &&
                    <ProductSelects getProduits={setGetProduit}/> } 
                        <Modal
                          title="Information du produit"
                          centered
                          open={open}
                          onCancel={() => setOpen(false)}
                          width={850}
                          footer={[
                            <Button key="annuler" onClick={() => setOpen(false)}>
                              Annuler
                            </Button>
                          ]}
                        >
                        <ProductDetail idProduit={idProduit}/>
                        </Modal>
                    <div className="rowChart-row-table">
                      <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 12}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Products