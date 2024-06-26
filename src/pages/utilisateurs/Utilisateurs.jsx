import { PlusOutlined, SearchOutlined, SisternodeOutlined,MailOutlined,RedoOutlined,FilePdfOutlined,UserOutlined,CheckOutlined,LockOutlined,FileExcelOutlined,EditOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Popover,Popconfirm, Tag} from 'antd';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Utilisateurs = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const searchInput = useRef(null);
    const scroll = { x: 400 };
    const navigate = useNavigate();
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

      const handleEdit = (id) => {
        navigate(`/utilisateurEdit/${id}`);
      };
    
    const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
        {
            title: 'Nom',
            dataIndex: 'username',
            key: 'nom',
            width: '15%',
            ...getColumnSearchProps('username'),
            render: (text) => (
              <Tag color={'blue'}><UserOutlined style={{ marginRight: "5px" }} />{text}</Tag>
            ),
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          render: (text) => (
            <Popover content="Cliquez pour ouvrir Gmail" trigger="hover">
              <Tag color="yellow">
                <a href={`mailto:${text}`} target="_blank" rel="noopener noreferrer">
                  <MailOutlined style={{ marginRight: '5px' }} />
                  {text}
                </a>
              </Tag>
            </Popover>
          ),
        },
        {
          title: 'Mot de passe',
          dataIndex: 'password',
          key: 'password',
          render: (text) => (
            <Tag icon={<LockOutlined />} color="default">
              {text}
            </Tag>
          ),
        },
        {
          title: 'Permission',
          dataIndex: 'role',
          key: 'role',
          render: (role) => (
            <Tag color="green" icon={<CheckOutlined />}>
              {role}
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
                  <Button icon={<EditOutlined />} style={{ color: 'green' }} onClick={()=> handleEdit(record.id)} />
                </Popover> 
                {user?.role === 'admin' &&
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id)}
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
          const { data } = await axios.get(`${DOMAIN}/api/user/getUser`);
          setData(data);
          setLoading(false)
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [DOMAIN]);

    const handleDelete = async (id) => {
      try {
         await axios.delete(`${DOMAIN}/api/user/getUser/${id}`);
           window.location.reload();
       } catch (err) {
         console.log(err);
       }
     };

     const Rafraichir = () =>{
      window.location.reload();
    }

     const filteredData = data?.filter((item) =>
      item.username?.toLowerCase().includes(searchValue.toLowerCase()) || 
     item.role?.toLowerCase().includes(searchValue.toLowerCase())
    )

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste des utilisateurs</h2>
                        <span>Gérer vos utilisateurs</span>
                    </div>
                    <div className="product-right" onClick={() =>navigate('/utilisateurForm')}>
                        <PlusOutlined />
                        <span className="product-btn">Ajouter un nouveau utilisateur</span>
                    </div>
                </div>
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                            <SisternodeOutlined className='product-icon' />
                            <div className="product-row-search">
                                <SearchOutlined className='product-icon-plus'/>
                                <input type="search" name="" id="" placeholder='Recherche...' className='product-search' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                            </div>
                        </div>
                        <div className="product-bottom-right">
                          <Popover content={'Actualiser cette page'}>
                            <RedoOutlined className='product-icon-raf' onClick={Rafraichir}/>
                          </Popover>
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

export default Utilisateurs