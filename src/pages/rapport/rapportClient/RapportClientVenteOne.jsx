import { SearchOutlined, CloseOutlined,SisternodeOutlined,EyeOutlined,UserOutlined, FilePdfOutlined,FileExcelOutlined,PrinterOutlined} from '@ant-design/icons';
import { Button, Space, Table, Popover, Tag, Input, Image } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import moment from 'moment';
/* import RapportVenteAllSelects from './RapportVenteAllSelects'; */
/* import RapportVenteSelects from './rapportVenteSelects/RapportVenteSelects'; */

const RapportClientVenteOne = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [getRapport, setGetRapport] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchInput = useRef(null);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('client');
    const [open, setOpen] = useState(false);
    const [marqueName,setMarqueName] = useState('');
    


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
            render: (nom_marque) => (
              <Tag color={'blue'}>{nom_marque}</Tag>
            ),
          },
          {
            title: 'Livreur',
            dataIndex: 'username',
            key: 'username',
            render: (username) => (
              <Tag color="green" icon={<UserOutlined />}>
                {username}
              </Tag>
            ),
          },
        {
            title: 'Date',
            dataIndex: 'date_vente',
            key: 'date',
            sorter: (a, b) => moment(a.date_vente) - moment(b.date_vente),
            sortDirections: ['descend', 'ascend'],
            render: (text) => (
              <Tag icon={<CalendarOutlined />} color="blue">
                {moment(text).format('DD-MM-yyyy')}
              </Tag>
            ),
          },
          {
            title: 'Pointure',
            dataIndex: 'pointure',
            key: 'pointure',
            render: (pointure) => (
              <Tag color={'blue'}>{pointure}</Tag>
            ),
          },
        {
          title: 'Quantité',
          dataIndex: 'total_varianteproduit',
          key: 'total_varianteproduit',
          sorter: (a, b) => a.total_varianteproduit - b.total_varianteproduit,
          sortDirections: ['descend', 'ascend'],
          render: (total_varianteproduit) => (
            <Tag color={'green'}>{total_varianteproduit}</Tag>
          ),
        },
        {
            title: 'Montant de vente',
            dataIndex: 'total_prix_vente',
            key: 'total_prix_vente',
            sorter: (a, b) => a.total_prix_vente - b.total_prix_vente,
            sortDirections: ['descend', 'ascend'],
            render: (total_prix_vente) => (
              <Tag color="blue">
                {total_prix_vente.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </Tag>
            ),
          },
        {
            title: 'Statut',
            dataIndex: 'statut',
            key: 'statut',
            render: (statut) => (
              <Tag color={'blue'}>{statut}</Tag>
            ),
        }
    ];

const HandOpen = () =>{
  setOpen(!open)
}

useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/rapport/rapportClient/${id}`);
        
        setGetRapport(data);
        setMarqueName(data[0]?.nom_client)
        setLoading(false)

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN,id]);

 const filteredData = getRapport?.filter((item) =>
item.nom_marque.toLowerCase().includes(searchValue.toLowerCase())
)

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Rapport de ventes de Mmn {marqueName}</h2>
                        <span>Gérez votre rapport de ventes de Mm {marqueName}</span>
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
{/*                     {open &&
                    <RapportVenteAllSelects getProduits={setGetRapport} id={id}/> } */}
                    <div className="rowChart-row-table">
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 5}} />
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default RapportClientVenteOne