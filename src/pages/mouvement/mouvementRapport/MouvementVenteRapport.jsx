import { SearchOutlined, UserOutlined,CalendarOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Popover,Tag, Image, Select, Modal} from 'antd';
import axios from 'axios';
import config from '../../../config';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import DetailPointure from '../../ventes/detailPointureVente/DetailPointure';
const { Option } = Select;

const MouvementVenteRapport = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const scroll = { x: 500 };
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const location = useLocation();
    const period = new URLSearchParams(location.search).get('period');
    const [dateFilter, setDateFilter] = useState(period);
    const [pointure, setPointure] = useState('');
    const [idVariant, setvariant] = useState({});
    const [openPointure, setOpenPointure] = useState('');


      const showModal = (e,p) => {
        setOpenPointure(true);
        setvariant(e)
        setPointure(p)
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
          title: 'Pointure',
          dataIndex: 'taille',
          key: 'taille',
          render: (text, record) => (
            <div>
              <Popover title={`Voir l'historique de pointure ${record.taille}`} trigger="hover">
                <Tag color="blue" onClick={() => showModal(record.id_varianteProduit, record.id_taille)}>
                  {text}
                </Tag>
              </Popover>
            </div>
          ),
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
            title: 'Type mouv',
            dataIndex: 'type_mouvement',
            key: 'type_mouvement',
            render: (text, record) => {
              const color = record.id_type_mouvement === 5 ? 'red' : 'green';
              return <Tag color={color}>{text}</Tag>;
            },
          },
          {
            title: 'Qté',
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
      }
      ];

      const fetchData = useCallback(async (filter) => {
        try {
          const { data } = await axios.get(`${DOMAIN}/api/produit/mouvement_rapportVente`, { params: { filter } });
          setData(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      }, [DOMAIN]);


      const handleDateFilterChange = (value) => {
        setDateFilter(value);
        fetchData(value);
      };

      useEffect(() => {
        fetchData(dateFilter);
      }, [fetchData,dateFilter]);

  
    return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Rapport des ventes</h2>
                        <span></span>
                    </div>
                </div>
                <div className="product-bottom">
                <div className="product-bottom-top">
                          <div className="product-bottom-left">
                            <Input
                                type="search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Recherche..."
                                className="product-search"
                            />
                          </div>
                          <div className="product-bottom-rights">
                            <Select value={dateFilter} onChange={handleDateFilterChange} style={{ width: 200 }}>
                                <Option value="today">Aujourd'hui</Option>
                                <Option value="yesterday">Hier</Option>
                                <Option value="last7days">7 derniers jours</Option>
                                <Option value="last30days">30 derniers jours</Option>
                                <Option value="last1year">1 an</Option>
                            </Select>
                          </div>
                      </div>
                    <div className="rowChart-row-table">
                        <Table columns={columns} dataSource={data} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                    </div>
                    <Modal
                      title=""
                      centered
                      open={openPointure}
                      onCancel={() => setOpenPointure(false)}
                      width={1100}
                      footer={[]}
                    >
                      <DetailPointure idVariant={idVariant} idTaille={pointure}/>
                    </Modal>
                </div>
            </div>
        </div>
    </>
  )
}

export default MouvementVenteRapport