import './../products/products.scss'
import { PlusOutlined, SearchOutlined, SisternodeOutlined,EyeOutlined, FilePdfOutlined, FileExcelOutlined,EditOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Popover,Popconfirm, Tag, Modal} from 'antd';
import photoIcon from './../../assets/logo doe.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import { format } from 'date-fns';
import MouvClientDetail from './mouvementClientDetail/MouvClientDetail';

const Mouvement = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const searchInput = useRef(null);
    const scroll = { x: 400 };
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]
    const [getVente, setGetVente] = useState({});
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [searchValue, setSearchValue] = useState('');
    

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

      const showModal = (id) => {
        setOpen(true);
      };
      const handleCancel = () => {
        setOpen(false);
      };
    
      const handleDelete = async (id) => {
      try {
          await axios.delete(`${DOMAIN}/api/produit/mouvementDelete/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };
    
      const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width:"3%"},
        {
          title: 'Commande N°',
          dataIndex: 'id_commande',
          key: 'id_commande'
        },
        {
          title: 'Marque',
          dataIndex: 'nom_marque',
          key: 'nom_marque'
        },
        {
          title: 'Client',
          dataIndex: 'nom_client',
          key: 'nom_client',
          render : (text)=>(
            <div onClick={showModal} style={{cursor: 'pointer'}}>
              {text}
            </div>
          )
        },
        {
            title: 'Date',
            dataIndex: 'date_mouvement',
            key: 'date_mouvement',
            sorter: (a, b) => a.date_mouvement - b.date_mouvement,
            sortDirections: ['descend', 'ascend'],
              render: (text) => (
                <span>
                  {format(new Date(text), 'dd-MM-yyyy')}
                </span>
              ),
          },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
                  <Popover title="Voir la liste de mouvement de cette chaussure" trigger="hover">
                    <Link to={`/mouvement/${record.id_commande}`}>
                      <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                    </Link>
                  </Popover>
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id_mouvement)}
                    okText="Oui"
                    cancelText="Non"
                  >
                    <Button icon={<DeleteOutlined />} style={{ color: 'red' }} />
                  </Popconfirm>
              </Space>
            ),
          },
      ];

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/mouvement`);
            setData(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

   const filteredData = data?.filter((item) =>
    item.type_mouvement.toLowerCase().includes(searchValue.toLowerCase())
    )
  
    return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste des mouvements</h2>
                        <span>Gérer vos mouvements</span>
                    </div>
                </div>
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                            <SisternodeOutlined className='product-icon' />
                            <div className="product-row-search">
                                <SearchOutlined className='product-icon-plus'/>
                                <input type="search" name="" id="" placeholder='Recherche...' className='product-search' />
                            </div>
                        </div>
                        <div className="product-bottom-right">
                            <FilePdfOutlined className='product-icon-pdf' />
                            <FileExcelOutlined className='product-icon-excel'/>
                            <PrinterOutlined className='product-icon-printer'/>
                        </div>
                    </div>
                    <div className="rowChart-row-table">
                        <Modal
                          title="Information du client"
                          centered
                          open={open}
                          onCancel={() => setOpen(false)}
                          width={750}
                          footer={[
                            <Button key="annuler" onClick={() => setOpen(false)}>
                              Annuler
                            </Button>
                          ]}
                        >
                         <MouvClientDetail/>
                        </Modal>
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 5}} />
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default Mouvement