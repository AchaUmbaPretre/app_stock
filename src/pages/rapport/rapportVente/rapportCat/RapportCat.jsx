import { SisternodeOutlined,EyeOutlined, DollarOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Space, Table, Popover,Tag, Modal, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../../config';
import RapportCatDetail from './rapportCatDetail/RapportCatDetail';
import RapportCatSelect from './RapportCatSelect';
const { Option } = Select;

const RapportCat = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getRapport, setGetRapport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [idCat, setIdCat] = useState({});
    const [dateFilter, setDateFilter] = useState('');
    
const columns = [
    { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
    {
      title: 'Categorie',
      dataIndex: 'nom_categorie',
      key: 'nom_marque',
      render: (nom_marque) => (
        <Tag color={'blue'}>{nom_marque}</Tag>
      ),
    },
    {
      title: 'Montant vendu',
      dataIndex: 'montant_vendu',
      key: 'quantite_vendue',
      sorter: (a, b) => a.montant_vendu - b.montant_vendu,
      sortDirections: ['descend', 'ascend'],
      render: (montant_vendu) => (
        <Tag color={montant_vendu > 0 ? 'green' : 'red'} icon={<DollarOutlined />}>
          {montant_vendu.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </Tag>
      ),
    },
    {
      title: 'Nbre de vente',
      dataIndex: 'nombre_vendu',
      key: 'nombre_vendu',
      sorter: (a, b) => a.nombre_vendu - b.nombre_vendu,
      sortDirections: ['descend', 'ascend'],
      render: (nombre_vendu) => (
        <Tag color={nombre_vendu > 0 ? 'green' : 'red'}>{nombre_vendu}</Tag>
      ),
    },
     {
      title: 'Qté vendue',
      dataIndex: 'quantite_vendue',
      key: 'quantite_vendue',
      sorter: (a, b) => a.quantite_vendue - b.quantite_vendue,
      sortDirections: ['descend', 'ascend'],
      render: (quantite_vendue) => (
        <Tag color={quantite_vendue > 0 ? 'green' : 'red'}>{quantite_vendue}</Tag>
      ),
    },
    {
      title: '# Chaussures en stock',
      dataIndex: 'total_chaussures_en_stock',
      key: 'total_chaussures_en_stock',
      sorter: (a, b) => a.total_chaussures_en_stock - b.total_chaussures_en_stock,
      sortDirections: ['descend', 'ascend'],
      render: (total_chaussures_en_stock) => (
        <Tag color={total_chaussures_en_stock > 0 ? 'green' : 'red'}>{total_chaussures_en_stock}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
          
        <Space size="middle">
           <Popover title="Voir les détails" trigger="hover">
            <Link onClick={()=> showModal(record.id_categorie)}>
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

const showModal = (e) => {
  setOpens(true);
  setIdCat(e)
};

  const fetchData = useCallback (async (filter) => {
    try {
      const { data } = await axios.get(`${DOMAIN}/api/rapport/rapport/venteCat`, { params: { filter } });
      setGetRapport(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }, [DOMAIN]);

const handleDateFilterChange = (value) => {
  setDateFilter(value);
  fetchData(value);
};

useEffect(() => {
  fetchData(dateFilter);
}, [fetchData,dateFilter]);

const filteredData = getRapport?.filter((item) =>
  item.nom_categorie.toLowerCase().includes(searchValue.toLowerCase())
)

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Rapport des ventes par catégorie</h2>
                        <span>Gérez vos rapports de ventes</span>
                    </div>
                </div>
                  <div className="product-bottom">
                            <div className="product-bottom-top">
                                <div className="product-bottom-left">
                                    {open ?<CloseOutlined className='product-icon2' onClick={HandOpen} /> : <SisternodeOutlined className='product-icon' onClick={HandOpen} />}
                                    <Input.Search
                                      type="search"
                                      value={searchValue}
                                      onChange={(e) => setSearchValue(e.target.value)}
                                      placeholder="Recherche..."
                                      className="product-search"
                                    />
                                </div>
                                <div className="product-bottom-rights">
                                  <Select value={dateFilter || undefined} onChange={handleDateFilterChange} style={{ width: 200 }}  placeholder="Sélectionner une période">
                                    <Option value="today">Aujourd'hui</Option>
                                    <Option value="yesterday">Hier</Option>
                                    <Option value="last7days">7 derniers jours</Option>
                                    <Option value="last30days">30 derniers jours</Option>
                                    <Option value="last1year">1 an</Option>
                                  </Select>
                                </div>
                            </div>
                          {open &&
                            <RapportCatSelect getProduits={setGetRapport}/> }
                            <div className="rowChart-row-table">
                                <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                            </div>
                  </div>
                  <Modal
                    title=""
                    centered
                    open={opens}
                    onCancel={() => setOpens(false)}
                    width={1200}
                    footer={[]}
                  >
                    <RapportCatDetail id={idCat}/>
                </Modal>
            </div>
        </div>
    </>
  )
}

export default RapportCat