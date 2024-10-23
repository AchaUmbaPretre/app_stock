import { SearchOutlined, UserOutlined,CalendarOutlined,DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Popover,Popconfirm, Tag, Image} from 'antd';
import axios from 'axios';
import config from '../../config';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const MouvementOneRetour = ({id_commande, id_type}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const searchInput = useRef(null);
    const scroll = { x: 500 };
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
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
          title: 'Livreur',
          dataIndex: 'livreur',
          key: 'livreur',
          render : (text,record)=>(
            <Popover content={`Voir toutes les livraisons de ${text}`} placement="top">
              <div style={{cursor: 'pointer'}} onClick={()=> showModalLivreur(record.id_livreur)}>
                <Tag color={'green'}><UserOutlined style={{ marginRight: "5px" }} /> {text}</Tag>
              </div>
            </Popover>
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

      const showModalLivreur = (e) => {
        navigate(`/mouvementOne/${e}`)
      };

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/mouvementOneVente?id_commande=${id_commande}&id_type=${id_type}`);
            setData(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN, id_commande, id_type]);
  
   const filteredData = data?.filter((item) =>
    item.type_mouvement?.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.nom_marque?.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.nom_client?.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.livreur?.toLowerCase().includes(searchValue.toLowerCase())
    )
  
    return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-bottom">
                    <div className="rowChart-row-table">
                        <Table 
                          columns={columns} 
                          dataSource={filteredData} 
                          loading={loading} 
                          scroll={scroll} 
                          pagination={{ pageSize: 10}} 
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default MouvementOneRetour