import { SearchOutlined, SisternodeOutlined,CalendarOutlined, FilePdfOutlined, FileExcelOutlined,PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Popover,Popconfirm, Tag, Image} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import { useSelector } from 'react-redux';
import moment from 'moment';

const MouvementView = ({id}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const searchInput = useRef(null);
    const scroll = { x: 400 };
    const navigate = useNavigate();
/*     const {pathname} = useLocation();
    const id = pathname.split('/')[2] */
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [getCommande, setGetCommande] = useState([]);
    const user = useSelector((state) => state.user?.currentUser);

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
        navigate(`/ventes/${id}`);
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
          render: (text, record) => {
            return <Tag color={"blue"}>{text}</Tag>;
          },
        },
        {
          title: 'Client',
          dataIndex: 'nom_client',
          key: 'nom_client',
          render: (text, record) => {
            return <Tag color={"green"}>{text}</Tag>;
          },
        },
        {
            title: 'Date',
            dataIndex: 'date_mouvement',
            key: 'date_mouvement',
            sorter: (a, b) => a.date_mouvement - b.date_mouvement,
            sortDirections: ['descend', 'ascend'],
              render: (text) => (
                <span>
                  <Tag color={'blue'} icon={<CalendarOutlined />}>
                    {moment(text).format('DD-MM-yyyy')}
                  </Tag>
                </span>
              ),
          },
          {
            title: 'Type mouvement',
            dataIndex: 'type_mouvement',
            key: 'type_mouvement',
            ...getColumnSearchProps('type_mouvement'),
            render: (text, record) => {
              const color = record.id_type_mouvement === 5 ? 'red' : 'green';
              return <Tag color={color}>{text}</Tag>;
            },
          },
          {
            title: 'Pointure',
            dataIndex: 'taille',
            key: 'taille',
            render: (text, record) => {
              return <Tag color={"green"}>{text}</Tag>;
            },
          },
          {
            title: 'Quantité',
            dataIndex: 'quantite',
            key: 'quantite',
            sorter: (a, b) => a.quantite - b.quantite,
            sortDirections: ['descend', 'ascend'],
            render: (quantite) => (
              <Tag color={quantite > 0 ? 'green' : 'red'}>{quantite}</Tag>
            ),
        },
        {
          title: 'Qté stock',
          dataIndex: 'stock',
          key: 'stock',
          sorter: (a, b) => a.stock - b.stock,
          sortDirections: ['descend', 'ascend'],
          render: (stock) => (
            <Tag color={stock > 0 ? 'green' : 'red'}>{stock}</Tag>
          ),
      },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
              {user?.role === 'admin' &&
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id_mouvement)}
                    okText="Oui"
                    cancelText="Non"
                  >
                    <Button icon={<DeleteOutlined />} style={{ color: 'red' }} />
                  </Popconfirm>
                </Popover> }
              </Space>
            ),
          },
      ];

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/mouvement/${id}`);
            setData(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,id]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/commande/commandeOne/${id}`);
            setGetCommande(data[0]);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,id]);

/*       const handleOk = async (e) => {
        try{
          await axios.put(`${DOMAIN}/api/vente/vente/${id}`,getVente)
  
          Swal.fire({
            title: 'Success',
            text: "La vente a été modifiée avec succès!",
            icon: 'success',
            confirmButtonText: 'OK',
          });
      
          setModalText('The modal will be closed after two seconds');
          setConfirmLoading(true);
          setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
      }, 2000);
          window.location.reload();
  
        }catch(err) {
          Swal.fire({
            title: 'Error',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
    };
 */
  
   const filteredData = data?.filter((item) =>
    item.type_mouvement.toLowerCase().includes(searchValue.toLowerCase())
    )
  
    return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste de detail de mouvement de commande n° {id}</h2>
                        <span>de {getCommande?.nom} de la commune {getCommande?.nom_commune} Av/ {getCommande?.avenue} Q/ {getCommande?.quartier} N° {getCommande?.num}</span>
                    </div>
                    <div className="varianteProduit-right" style={{display:'flex', flexDirection:'column'}}>
                      <h2 style={{fontSize:'1rem', color:'rgb(1, 35, 138)'}}>Contact de {getCommande?.nom}</h2>
                      <span className="variant-name" style={{fontSize:'.8rem', color:'#6d6c6c'}}>{getCommande?.telephone}</span>
                    </div>
                </div>
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                            <SisternodeOutlined className='product-icon' />
                            <div className="product-row-search">
                                <SearchOutlined className='product-icon-plus'/>
                                <input type="search" name="" onChange={(e) => setSearchValue(e.target.value)} placeholder='Recherche...' className='product-search' />
                            </div>
                        </div>
                        <div className="product-bottom-right">
                            <FilePdfOutlined className='product-icon-pdf' />
                            <FileExcelOutlined className='product-icon-excel'/>
                            <PrinterOutlined className='product-icon-printer'/>
                        </div>
                    </div>
                    <div className="rowChart-row-table">
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default MouvementView