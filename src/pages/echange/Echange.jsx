import { PlusOutlined, SearchOutlined, SisternodeOutlined, FilePdfOutlined, FileExcelOutlined,EditOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Popconfirm, Popover, Tag, Modal} from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import config from '../../config';
import axios from 'axios';
import EchangeEdit from './echangeEdit/EchangeEdit';
import Swal from 'sweetalert2';
import { format, parseISO } from 'date-fns';

const Echange = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [loading, setLoading] = useState(true);
    const [echange, setEchange] = useState([]);
    const [getEchange, setGetEchange] = useState([]);
    const searchInput = useRef(null);
    const scroll = { x: 400 };
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

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

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`${DOMAIN}/api/vente/echange`);
          setEchange(data);
          setLoading(false)
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`${DOMAIN}/api/vente/echangeOne/${id}`);
          setGetEchange(data[0]);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [id]);
    
    const handleDelete = async (id) => {
     try {
        await axios.put(`${DOMAIN}/api/vente/echangeDelete/${id}`);
          window.location.reload();
      } catch (err) {
        console.log(err);
      } 
    };

    const showModal = (id) => {
      setOpen(true);
      navigate(`/echange/${id}`);
    };
    
      const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width: '5%' },
        {
            title: 'Client',
            dataIndex: 'nom',
            key: 'nom',
            ...getColumnSearchProps('nom'),
        },
        {
            title: 'Produit',
            dataIndex: 'img',
            key: 'img',
              render: (text, record) => (
                <div className="userList">
                  <img src={record.img} alt="" className="userImg"  />
                  <span>{record.nom_produit}</span>
                </div>
            )
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
            title: "Produit d'échange",
            dataIndex: 'nom_produit_echange',
            key: 'nom_produit_echange',
        },
        {
          title: "Date d'échange",
          dataIndex: 'date_echange',
          key: 'date',
          sorter: (a, b) => a.date_vente - b.date_vente,
          sortDirections: ['descend', 'ascend'],
          render: (text) => ( 
          <Tag color={'#7AA6E5'}>
            <span>
              {format(parseISO(text), 'dd-MM-yyyy')}
            </span>
          </Tag>
          ),
        },
        {
            title: 'Action',
            key: 'action',
            width: '15%',
            render: (text, record) => (
                
              <Space size="middle">
                <Popover title="Modifier" trigger="hover">
                  <Button icon={<EditOutlined />} style={{ color: 'green' }} onClick={()=>showModal(record.id)} />
                </Popover>
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id)}
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

      const handleOk = async (e) => {
        e.preventDefault();

        try{
          await axios.put(`${DOMAIN}/api/vente/echange/${id}`,getEchange)
  
          Swal.fire({
            title: 'Success',
            text: "L'echange a été modifié avec succès!",
            icon: 'success',
            confirmButtonText: 'OK',
          });
    
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

    console.log(getEchange)

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste des échanges</h2>
                        <span>Gérer vos échanges</span>
                    </div>
                    <div className="product-right" onClick={() =>navigate('/echangeForm')}>
                        <PlusOutlined />
                        <span className="product-btn">Ajouter un nouveau échange</span>
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
                          title="Modifier l'échange"
                          centered
                          open={open}
                          onOk={handleOk}
                          onCancel={() => setOpen(false)}
                          width={860}
                          okText="Soumettre"
                          cancelText="Annuler"
                        >
                          <EchangeEdit getEchange={getEchange} setGetEchange={setGetEchange} />
                        </Modal>
                        <Table columns={columns} dataSource={echange} loading={loading} scroll={scroll} pagination={{ pageSize: 5}} />
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default Echange