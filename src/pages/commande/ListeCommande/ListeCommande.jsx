import { PlusOutlined, SearchOutlined,RedoOutlined, EyeOutlined,CalendarOutlined,UserOutlined,CloseOutlined, SisternodeOutlined,PlusCircleOutlined,DeleteOutlined,  ExclamationCircleOutlined, CheckCircleOutlined} from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { Button,Space,Input, Table, Popover,Popconfirm, Tag, Modal, Tabs} from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import { format } from 'date-fns';
import config from '../../../config';
import MouvClientDetail from '../../mouvement/mouvementClientDetail/MouvClientDetail';
import { useSelector } from 'react-redux';
import ListeCommandeSelect from './ListeCommandeSelect';
import ListeCommande7jrs from './ListeCommande7jrs';
import ListeCommandeJour from './ListeCommandeJour';
import CountUp from 'react-countup';
import LivraisonView from '../../livraison/livraisonView/LivraisonView';

const ListeCommande = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const searchInput = useRef(null);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState([]);
    const scroll = { x: 400 };
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const startDate = queryParams.get('start_date');
    const endDate = queryParams.get('end_date');
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [idClient, setIdClient] = useState({});
    const user = useSelector((state) => state.user?.currentUser);
    const [rapportMoney, setRapportMoney] = useState([]);
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');
    const [id_commande, setId_commande] = useState('');
    const [openInfo, setOpenInfo] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 15,
    });
    const [totalItems, setTotalItems] = useState('');

    const content = (e) => (
      <div className='popOverSous' style={{display: 'flex', flexDirection: "column", gap: "10px"}}>
        <Link>{e} vente(s)</Link>
      </div>
    )

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
          await axios.delete(`${DOMAIN}/api/commande/commande/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };

    const showModal = (e) => {
      setOpen(true);
      setIdClient(e)
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
          title: 'Code',
          dataIndex: 'id_commande',
          key: 'id_commande',
          render: (text, record) => (
            <Tag color="blue">{`${new Date().getFullYear().toString().substring(2)}${record.id_shop.toString().padStart(2, '0')}${record.id_commande.toString().padStart(4, '0')}`}</Tag>
          ),
        },
        {
            title: 'Client',
            dataIndex: 'nom',
            key: 'id_client',
            ...getColumnSearchProps('nom'),
            render : (text,record)=>(
              <div onClick={()=> showModal(record.id_client)} style={{cursor: 'pointer'}}>
                  <Tag color={'green'}><UserOutlined style={{ marginRight: "5px" }} />{text}</Tag>
              </div>
            )
        },
        {
          title: 'Date commande',
          dataIndex: 'date_commande',
          key: 'date_commande',
          ...getColumnSearchProps('date_commande'),
          render: (text) => (
            <span>
              {<Tag color={'blue'} icon={<CalendarOutlined />}>{format(new Date(text), 'dd-MM-yyyy')}</Tag>}
            </span>
          ),
        },
        {
            title: 'Status',
            dataIndex: 'nom_statut',
            key: 'nom_statut',
            ...getColumnSearchProps('nom_statut'),
            render: (text, record) => {
              let tagColor = '';
              let icon = null;
        
              if (text === 'Non-validé') {
                tagColor = 'red';
                icon = <ExclamationCircleOutlined />;
              } else if (text === 'Validé') {
                tagColor = 'green';
                icon = <CheckCircleOutlined />;
              }
        
              return (
                <Popover content={content(record.nbre_vente)}>
                  <Tag color={tagColor}>
                    {icon} {text}
                  </Tag>
                </Popover>
              );
            },
          },
        {
          title: 'Livraison',
          dataIndex: 'id_livraison',
          key: 'id_livraison',
          ...getColumnSearchProps('id_livraison'),
          render: (text, record) => {
            let tagColor = '';
            let textValue = '';
      
            if (text === 0) {
              tagColor = 'red';
              textValue= 'En attente'
            } else if (text === 1) {
              tagColor = 'green';
              textValue = 'En cours';
            }
            else if (text === 2) {
              tagColor = 'green';
              textValue = 'Livré';
            }
      
            return (
              <Popover title="Voir les details de cette livraison" trigger="hover">
                <Tag color={tagColor} onClick={()=>handInfo(record.id_commande) }>
                  {textValue}
                </Tag>
              </Popover>
            );
          },
        },
        {
            title: 'Shop',
            dataIndex: 'id_shop',
            key: 'id_shop',
            render: (text) => {
              let tagColor = '';
              let textValue = '';
        
              if (text === 1) {
                tagColor = 'orange';
                textValue= 'Shop ngaliema'
              } 
              else if (text === 2) {
                tagColor = 'green';
                textValue = 'Payé';
              }
        
              return (
                <Tag color={tagColor}>
                   {textValue}
                </Tag>
              );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                <Popover  title="Voir la liste de cette commande" trigger="hover">
                  <Link to={`/listeDetailView/${record.id_commande}`}>
                    <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                  </Link>
                </Popover>
                <Popover title="Voir des produits" trigger="hover">
                    <Link to={`/commandes/${record.id_commande}`}>
                        <Button icon={<PlusCircleOutlined />} style={{ color: 'green' }} />
                    </Link>
                </Popover>
                {user?.role === 'admin' &&
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id_commande)}
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

    const handInfo = (e) =>{
      setId_commande(e)
      setOpenInfo(true)
    }
        const fetchData = async (page = currentPage, size = pageSize) => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/commande?date_start=${startDate}&date_end=${endDate}&page=${page}&pageSize=${size}`);
            setData(data.data);
            setTotalItems(data.totalItems);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
    
        useEffect(() => {
        fetchData(currentPage, pageSize);
      
        const timeoutId = setTimeout(fetchData, 4000);
      
        return () => clearTimeout(timeoutId);
      }, [currentPage, pageSize]);

      const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
      
        setPagination({
          current: pagination.current,
          pageSize: pagination.pageSize,
        });
        fetchData(pagination.current, pagination.pageSize);
      };


      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/commande/commandeRapportTopbar?start_date=${start_date}&end_date=${end_date}&searchValue=${searchValue}`);
            setRapportMoney(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
        const timeoutId = setTimeout(fetchData, 4000);
      
        return () => clearTimeout(timeoutId);
      }, [DOMAIN,start_date,end_date,searchValue]);


      const HandOpen = () =>{
        setOpens(!opens)
      }

      const Rafraichir = () =>{
        window.location.reload();
      }

  const filteredData = data?.filter((item) =>
    item.nom?.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.nom_statut?.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste des commandes</h2>
                        <span>Voir vos commandes</span>
                    </div>
                    <div className="" style={{ padding: "10px 15px", borderRadius: '10px', boxShadow: '0px 0px 15px -10px rgba(0,0,0,0.75)'}}>
                        <div style={{ display: 'flex', fontSize: '13px', marginBottom:'8px', fontWeight: 'bold' }}>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column',gap: '6px', fontSize: '12px' }}>
                          <p style={{ display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nbre de commandes en attente : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={rapportMoney?.commande_Enattente}/></b></p>
                          <p style={{ display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nbre de commandes en cours : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={rapportMoney?.commande_Encours}/></b></p>
                          <p style={{ display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nbre de commandes livrées. : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={rapportMoney?.commande_livre}/></b></p>
                        </div>
                    </div>
                    <div className="" style={{  padding: "10px 15px", borderRadius: '10px', boxShadow: '0px 0px 15px -10px rgba(0,0,0,0.75)'}}>
                        <div style={{ display: 'flex', fontSize: '13px', marginBottom:'8px', fontWeight: 'bold' }}>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column',gap: '6px', fontSize: '12px' }}>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nbre de commandes: <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={rapportMoney?.nbre_commande}/></b></p>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nbre d'articles: <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={rapportMoney?.nbre_articles}/></b></p>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Montant total de la commande : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={rapportMoney?.montant_total}/>$</b></p>
                        </div>
                    </div>
                    <Popover title="Ajoutez une commande" trigger="hover">
                      <div className="product-right" onClick={() =>navigate('/commandeForm')}>
                        <PlusOutlined />
                      </div>
                    </Popover>
                </div>
                <Tabs>
                  <Tabs.TabPane tab='Commandes' key={0}>
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
                            <Popover content={'Actualiser cette page'}>
                              <RedoOutlined className='product-icon-raf' onClick={Rafraichir}/>
                            </Popover>
                          </div>
                      </div>
                      <div className="rowChart-row-table">
                      {opens &&
                      <ListeCommandeSelect getProduits={setData} start_date={setStart_date} end_date={setEnd_date} /> } 
                          <Modal
                            title="Information de client"
                            centered
                            open={open}
                            onCancel={() => setOpen(false)}
                            width={850}
                            footer={[
                            ]}
                          >
                            <MouvClientDetail idClients={idClient}/>
                          </Modal>

                          <Modal
                            title=""
                            centered
                            open={openInfo}
                            onCancel={() => setOpenInfo(false)}
                            width={1000}
                            footer={[
                            ]}
                          >
                            <LivraisonView id={id_commande}/>
                          </Modal>
                          <Table 
                            columns={columns} 
                            dataSource={filteredData} 
                            bordered
                            loading={loading} 
                            scroll={scroll} 
                            size="middle"
                            pagination={{
                              current: currentPage,
                              pageSize: pageSize,
                              total: totalItems,
                              onChange: handleTableChange,
                            }}
                            onChange={handleTableChange}
                          />
                      </div>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Commandes du jour' key={1}>
                    <ListeCommandeJour/>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab='Commandes des 7 derniers jours' key={2}>
                    <ListeCommande7jrs/>
                  </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    </>
  )
}

export default ListeCommande