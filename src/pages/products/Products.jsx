import './products.scss'
import { SearchOutlined, CloseOutlined,SisternodeOutlined,PlusCircleOutlined,CalendarOutlined, DeleteOutlined, EyeOutlined} from '@ant-design/icons';
import ProductSelects from './productSelects/ProductSelects';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Popover,Popconfirm, Modal, Image} from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import { Tag } from 'antd';
import ProductDetail from './productDetail/ProductDetail';
import BarReturn from '../../components/barReturn/BarReturn';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import ProductForm from './form/ProductForm';

const Products = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [getProduit, setGetProduit] = useState();
    const [loading, setLoading] = useState(true);
    const searchInput = useRef(null);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [opens, setOpens] = useState(false);
    const [open, setOpen] = useState(false);
    const [openss, setOpenss] = useState(false);
    const [idProduit, setIdProduit] = useState({});
    const user = useSelector((state) => state.user?.currentUser);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 15,
    });
    const [totalItems, setTotalItems] = useState('');

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

    const handOpen = () => {
      setOpenss(!openss)
    }
    
    const handleTableChange = (pagination) => {
      setCurrentPage(pagination.current);
      setPageSize(pagination.pageSize);
    
      setPagination({
        current: pagination.current,
        pageSize: pagination.pageSize,
      });
    
      fetchData(pagination.current, pagination.pageSize);
    };

    const columnStyles = {
      title: {
        maxWidth: '180px',
        whiteSpace: 'nowrap',
        overflowX: 'scroll', 
        overflowY: 'hidden',
        textOverflow: 'ellipsis',
        scrollbarWidth: 'none',
        '-ms-overflow-style': 'none', 
      },
      hideScroll: {
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
    };


  const columns = [
    { title: '#', 
      dataIndex: 'id', 
      key: 'id', 
      render: (text, record, index) => {
        const pageSize = pagination.pageSize || 15;
        const pageIndex = pagination.current || 1;
        return (pageIndex - 1) * pageSize + index + 1;
      }
    },
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
        title: 'Nom produit',
        dataIndex: 'nom_produit',
        key: 'nom_produit',
        ...getColumnSearchProps('nom_produit'),
        width:'9%',
        render: (text,record) => 
          <Space style={columnStyles.title} className={columnStyles.hideScroll} onClick={()=> showModal(record.id_produit)}>
            <Tag color='cyan'>{text}</Tag>
          </Space>
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
        return <Tag color={color} onClick={()=> handleOk(record.id_produit)} style={{cursor:'pointer'}}>
                {text}
              </Tag>;
      },
    },
    {
      title: "Date d'entrée",
      dataIndex: 'date_entrant',
      key: 'date',
      sorter: (a, b) => moment(a.date_entrant).unix() - moment(b.date_entrant).unix(),
      sortDirections: ['descend', 'ascend'],
      render: (text) => (
        <Tag color={'blue'} icon={<CalendarOutlined />}>
          {moment(text).format('DD-MM-yyyy')}
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
            {user?.role === 'admin' &&
            <Popover title="Supprimer" trigger="hover">
              <Popconfirm
                title="Êtes-vous sûr de vouloir supprimer?"
                onConfirm={() => handleDelete(record.id_produit)}
                okText="Oui"
                cancelText="Non"
              >
                <Button icon={<DeleteOutlined />} style={{ color: 'red' }} />
              </Popconfirm>
            </Popover>}
          </Space>
        ),
    },
  ];

const HandOpen = () =>{
  setOpens(!opens)
}

  const fetchData = async (page = currentPage, size = pageSize) => {
    try {
      const { data } = await axios.get(`${DOMAIN}/api/produit`,{
        params: {
          page: page,
          pageSize: size,
        },
      });
      setGetProduit(data.data);
      setTotalItems(data.total);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
  fetchData(currentPage, pageSize);
}, [currentPage, pageSize]);

const showModal = (e) => {
  setOpen(true);
  setIdProduit(e)
};

const handleOk = async (e) => {
  setSelectedProductId(e);
  setModalVisible(true);
};

const filteredData = getProduit?.filter((item) => 
  item.nom_produit?.toLowerCase().includes(searchValue.toLowerCase()) ||
  item.nom_categorie?.toLowerCase().includes(searchValue.toLowerCase()) ||
  item.nom_marque?.toLowerCase().includes(searchValue.toLocaleLowerCase()) || 
  item.etatProduit?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
  item.nom_famille?.toLowerCase().includes(searchValue.toLocaleLowerCase())
)

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste des produits</h2>
                        <span>Gérer vos produits</span>
                    </div>
                    <div className="product-right" onClick={handOpen}>
                        <PlusCircleOutlined className='product-icon'/>
                        <span className="product-btn">Un nouveau produit</span>
                    </div>
                </div>
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                            {opens ?<CloseOutlined className='product-icon2' onClick={HandOpen} /> : <SisternodeOutlined className='product-icon' onClick={HandOpen} />}
                            <Input.Search
                              type="search"
                              value={searchValue}
                              onChange={(e) => setSearchValue(e.target.value)}
                              placeholder="Recherche..."
                              className="product-search"
                            />
                        </div>
                        <div className="product-bottom-right">
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
                        <Modal
                          title="Etat produit"
                          visible={modalVisible}
                          onCancel={() => setModalVisible(false)}
                          onOk={async () => {
                            try {
                              await axios.put(`${DOMAIN}/api/produit/${selectedProductId}`);
                              setModalVisible(false);

                              Swal.fire({
                                title: 'Success',
                                text: "L'état des produits a été modifié avec succès.",
                                icon: 'success',
                                confirmButtonText: 'OK',
                              });

                              window.location.reload();
                            } catch (err) {
                              Swal.fire({
                                title: 'Error',
                                text: err.message,
                                icon: 'error',
                                confirmButtonText: 'OK',
                              });
                            }
                          }}
                          centered
                          cancelText={<span style={{ color: '#fff' }}>Annuler</span>}
                          okText={<span style={{ color: '#fff' }}>Oui</span>}
                          cancelButtonProps={{ style: { background: 'red' } }}
                          okButtonProps={{ style: { background: 'blue' } }}
                      >
                        <p>Souhaitez-vous réellement désactiver ou réactiver ?</p>
                      </Modal>
                      <Modal
                          title=""
                          centered
                          open={openss}
                          onCancel={() => setOpenss(false)}
                          width={1000}
                          footer={[
                          ]}
                      >
                        <ProductForm fetchData={fetchData} closeOpen={()=> setOpenss(!openss)}/>
                      </Modal>
                    <div className="rowChart-row-table">
                      <Table 
                        columns={columns} 
                        dataSource={filteredData} 
                        loading={loading} 
                        scroll={scroll} 
                        bordered
                        size="middle" 
                        pagination={{
                          current: currentPage,
                          pageSize: pageSize,
                          total: totalItems,
                          pageSizeOptions: ['10', '20', '50', '100', '200', '300', '400', '500','600','800'],
                          onChange: handleTableChange
                        }}
                        onChange={handleTableChange}
                      />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Products