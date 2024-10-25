import './../products/products.scss'
import { SisternodeOutlined,DollarOutlined, PlusOutlined,UserOutlined, CalendarOutlined, DeleteOutlined, EyeOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import CountUp from 'react-countup';
import { Button, Space, Table, Popover,Popconfirm, Tag, Modal, Input} from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import FormDepenses from './FormDepenses';
import config from '../../config';
import moment from 'moment';
import Depenses from './Depenses';

const DepensesAll = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [dateData, setDateData] = useState('');
    const user = useSelector((state) => state.user?.currentUser);
    const [recent, setRecent] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 15,
    });
    const [totalItems, setTotalItems] = useState('');

      const handleDelete = async (id) => {
      try {
          await axios.delete(`${DOMAIN}/api/depenses/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
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
            title: 'Jour',
            dataIndex: 'jour',
            key: 'jour',
            sorter: (a, b) => a.jour - b.jour,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => (
              <Tag color="blue" icon={<CalendarOutlined />}>
                {record.jour}
              </Tag>
            ),
          },
          {
            title: 'Date',
            dataIndex: 'date_depense',
            key: 'date',
            sorter: (a, b) => moment(a.date_depense) - moment(b.date_depense),
            sortDirections: ['descend', 'ascend'],
            render: (text) => (
              <Tag icon={<CalendarOutlined />} color="blue">
                {moment(text).format('DD-MM-yyyy')}
              </Tag>
            ),
          },
           {
            title: '# Dollars',
            dataIndex: 'montant_total_dollars',
            key: 'montant_total_dollars',
            sorter: (a, b) => a.montant_total_dollars - b.montant_total_dollars,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => (
              <Tag color={record.montant_total_dollars !== null ? 'green' : 'red'} icon={<DollarOutlined />}>
                {record.montant_total_dollars ? record.montant_total_dollars + ' $' : '0' + ' $'}
              </Tag>
            ),
          },
           {
            title: '# Francs',
            dataIndex: 'montant_total_francs',
            key: 'montant_total_francs',
            sorter: (a, b) => a.montant_total_francs - b.montant_total_francs,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => (
              <Tag color={record.montant_total_francs !== null ? 'green' : 'red'}>
                {record.montant_total_francs !== null ? record.montant_total_francs + ' fc' : '0' + ' fc'}
              </Tag>
            ),
          },
          {
            title: '# Total',
            dataIndex: 'montant_total_combine',
            key: 'montant_total_combine',
            sorter: (a, b) => a.montant_total_combine - b.montant_total_combine,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => (
              <Tag color={record.montant_total_combine !== null ? 'green' : 'red'} icon={<DollarOutlined />}>
                {record.montant_total_combine ? record.montant_total_combine + ' $' : '0' + ' $'}
              </Tag>
            ),
          },
          {
            title: 'Crée par',
            dataIndex: 'createur',
            key: 'createur',
            render: (text) => (
              <Tag color="blue" icon={<UserOutlined />}>
                {text}
              </Tag>
            ),
          },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
                <>
                    <Popover title="Voir les détails" trigger="hover">
{/*                         <Link to={`/depenses?date=${format(new Date(record?.date_depense),'yyyy-MM-dd')}`}> */}
                        <Link onClick={() => handleOkDetail(record.date_depense)}>
                            <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                        </Link>
                    </Popover> 
                    {user?.role === 'admin' &&
                    <Popover title="Supprimer" trigger="hover">
                    <Popconfirm
                        title="Êtes-vous sûr de vouloir supprimer?"
                        onConfirm={() => handleDelete(record.id_depense)}
                        okText="Oui"
                        cancelText="Non"
                    >
                        <Button icon={<DeleteOutlined />} style={{ color: 'red' }} />
                    </Popconfirm>
                    </Popover>  }
                </>
              </Space>
            ),
          },
      ];

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/depenses`);
            setData(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/depenses/depenseRapportChiffre`);
            setRecent(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);


    const handleOk = async (e) => {
      setOpen(true)
    };

    const handleOkDetail = async (e) => {
      setOpenDetail(true)
      setDateData(e)
    };

  const filteredData = data?.filter((item) =>
  item.jour?.toLowerCase().includes(searchValue.toLowerCase())
);

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste des dépenses</h2>
                        <span>Gérer vos dépenses</span>
                    </div>
                    <div className="" style={{background: '#fafafa', padding: "10px 15px", borderRadius: '10px', boxShadow: '0px 0px 15px -10px rgba(0,0,0,0.75)'}}>
                        <div style={{ display: 'flex', fontSize: '13px', marginBottom:'8px', fontWeight: 'bold' }}>
                          {recent[0]?.date_plus_ancienne && (
                            <span>{`Du ${moment(recent[0]?.date_plus_ancienne).format('DD-MM-YYYY')} au ${moment(recent[0]?.date_plus_recente).format('DD-MM-YYYY')}`}</span>
                          )}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column',gap: '6px', fontSize: '12px' }}>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Montant total : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={recent[0]?.total_depense}/> $</b></p>
                        </div>
                      </div>
                    <div className="product-right" onClick={handleOk}>
                        <PlusOutlined className='product-icon'/>
                        <span className="product-btn">Nouvelle dépense</span>
                    </div>
                </div>
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                            <SisternodeOutlined className='product-icon' />
                            <Input
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
                    <div className="rowChart-row-table">
                    <Modal
                          centered
                          title='Ajouter une dépense'
                          open={open}
                          onCancel={() => {
                            setOpen(false)
                          }}
                          width={650}
                          footer={[
                          ]}
                        >
                            <FormDepenses/>
                        </Modal>

                        <Modal
                          centered
                          title=''
                          open={openDetail}
                          onCancel={() => {
                            setOpenDetail(false)
                          }}
                          width={1000}
                          footer={[
                          ]}
                        >
                          <Depenses dateId = {dateData}/>
                        </Modal>

                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DepensesAll