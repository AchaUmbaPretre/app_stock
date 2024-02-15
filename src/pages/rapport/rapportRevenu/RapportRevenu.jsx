import { SearchOutlined, CloseOutlined,SisternodeOutlined,EyeOutlined, ArrowUpOutlined, ArrowDownOutlined,FilePdfOutlined,DollarOutlined, FileExcelOutlined,PrinterOutlined} from '@ant-design/icons';
import { Button, Space, Table, Popover,Tag, Input } from 'antd';
import { Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
/* import RapportVenteSelects from './rapportVenteSelects/RapportVenteSelects'; */

const RapportRevenu = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [getRapport, setGetRapport] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchInput = useRef(null);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
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
      title: 'Mois',
      dataIndex: 'mois',
      key: 'mois',
      render: (mois) => (
        <Tag color={'blue'}>{mois}</Tag>
      ),
    },
    {
      title: 'Année',
      dataIndex: 'annee',
      key: 'annee',
      render: (annee) => (
        <Tag color={'green'}>{annee}</Tag>
      ),
    },
    {
      title: 'Nombre de vente',
      dataIndex: 'nombre_ventes',
      key: 'nombre_ventes',
      render: (nombre_ventes) => (
        <Tag color={'blue'}>{nombre_ventes}</Tag>
      ),
    },
    {
        title: 'Revenu total',
        dataIndex: 'revenu_total',
        key: 'revenu_total',
        sorter: (a, b) => a.revenu_total - b.revenu_total,
        sortDirections: ['descend', 'ascend'],
        render: (revenu_total) => (
          <Tag color={revenu_total > 0 ? 'green' : 'red'} icon={<DollarOutlined />}>
            {`$${revenu_total}`}
          </Tag>
        ),
      },
{
  title: 'Revenu moyen',
  dataIndex: 'revenu_moyen_par_vente',
  key: 'revenu_moyen_par_vente',
  sorter: (a, b) => a.revenu_moyen_par_vente - b.revenu_moyen_par_vente,
  sortDirections: ['descend', 'ascend'],
  render: (revenu_moyen_par_vente) => (
    <Tag color={revenu_moyen_par_vente > 0 ? 'green' : 'red'} icon={revenu_moyen_par_vente > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}>
      {`$${revenu_moyen_par_vente}`}
    </Tag>
  ),
},
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
          
        <Space size="middle">
           <Popover title="Voir les détails" trigger="hover">
            <Link to={`/rapportVenteAll/${record.id_marque}`}>
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
      const { data } = await axios.get(`${DOMAIN}/api/vente/rapportRevenu/revenu`);
      setGetRapport(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [DOMAIN]);

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Rapport des revenus</h2>
                        <span>Gérez votre revenus</span>
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
{/*                    {open &&
                    <RapportVenteSelects getProduits={setGetRapport}/> } */}
                    <div className="rowChart-row-table">
                        <Table columns={columns} dataSource={getRapport} loading={loading} scroll={scroll} pagination={{ pageSize: 5}} />
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default RapportRevenu