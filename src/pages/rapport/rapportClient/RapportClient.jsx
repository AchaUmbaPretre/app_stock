import { SearchOutlined, CloseOutlined,SisternodeOutlined,EyeOutlined, FilePdfOutlined,DollarOutlined, FileExcelOutlined,PrinterOutlined} from '@ant-design/icons';
import { Button, Space, Table, Popover,Tag, Input, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import RapportClientAll from './rapportClientAll/RapportClientAll';
/* import RapportVenteSelects from './rapportVenteSelects/RapportVenteSelects'; */

const RapportClient = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [getRapport, setGetRapport] = useState([]);
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
      title: 'Nom client',
      dataIndex: 'nom_client',
      key: 'nom_client',
      render: (categorie) => (
        <Tag color={'blue'}>{categorie}</Tag>
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
        title: 'Montant de total de vente',
        dataIndex: 'total_prix_vente',
        key: 'total_prix_vente',
        sorter: (a, b) => a.total_prix_vente - b.total_prix_vente,
        sortDirections: ['descend', 'ascend'],
        render: (total_prix_vente) => (
          <Tag color="blue" icon={<DollarOutlined />}>
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
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
          
        <Space size="middle">
           <Popover title="Voir les détails" trigger="hover">
            <Link to={`/rapportClientOne?client=${record.id_client}`}>
              <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
            </Link>
          </Popover>
        </Space>
      ),
    },
];

const HandOpen = () =>{
  setOpen(!open)
}

useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${DOMAIN}/api/rapport/rapportClient/venteClient`);
      setGetRapport(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [DOMAIN]);

 const filteredData = getRapport?.filter((item) =>
item.nom_client.toLowerCase().includes(searchValue.toLowerCase())
)

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Rapport des ventes par client</h2>
                        <span>Gérez votre rapport de ventes client</span>
                    </div>
                </div>
                <Tabs>
                  <Tabs.TabPane tab='Vente par client' key={0}>
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
                    {/* {open &&
                      <RapportVenteSelects getProduits={setGetRapport}/> } */}
                      <div className="rowChart-row-table">
                          <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                      </div>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Vente complet' key={1}>
                    <RapportClientAll/>
                  </Tabs.TabPane>
                </Tabs>
            </div>
        </div>

    </>
  )
}

export default RapportClient