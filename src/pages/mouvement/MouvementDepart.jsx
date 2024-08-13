import { SearchOutlined, UserOutlined,RedoOutlined, EnvironmentOutlined,CalendarOutlined,SisternodeOutlined,CloseOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Popover,Popconfirm, Tag, Image, Modal} from 'antd';
import axios from 'axios';
import config from '../../config';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import MouvementDepartSelect from './MouvementDepartSelect';
import CountUp from 'react-countup';
import PageDetails from '../PageDetails/PageDetails';
import DetailPointure from '../ventes/detailPointureVente/DetailPointure';

const MouvementDepart = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [loading, setLoading] = useState(true);
    const [opens, setOpens] = useState(false);
    const [idVariant, setvariant] = useState({});
    const [openVariant, setOpenVariant] = useState('');
    const [openPointure, setOpenPointure] = useState('');
    const [data, setData] = useState([]);
    const searchInput = useRef(null);
    const scroll = { x: 500 };
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const user = useSelector((state) => state.user?.currentUser);
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');
    const [pointure, setPointure] = useState('');
    const [rapport, setRapport] = useState([]);


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

      const HandOpen = () =>{
        setOpens(!opens)
      };

      const showModalPhone = (e) => {
        setOpenVariant(true);
        setvariant(e)
      };

      const showModal = (e,p) => {
        setOpenPointure(true);
        setvariant(e)
        setPointure(p)
      };
             
      const Rafraichir = () =>{
        window.location.reload();
      }
    
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
          render: (text, record) => (
            <div>
              <Popover title={`Voir la fiche de ce produit`} trigger="hover">
                <Tag color="blue" onClick={() => showModalPhone(record.id_varianteProduit)}>
                  {text}
                </Tag>
              </Popover>
            </div>
          ),
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
          title: 'Prix',
          dataIndex: 'prix',
          key: 'prix',
          render: (text, record) => {
            return <Tag color={"blue"}>{`${text} $`}</Tag>;
          },
        },
        {
          title: 'Client(e)',
          dataIndex: 'nom_client',
          key: 'nom_client',
          render: (text, record) => {
            return <Tag color={"blue"}>{text}</Tag>;
          },
        },
        {
          title: 'Commune',
          dataIndex: 'nom_commune',
          key: 'nom_commune',
          render : (text,record)=>(
            <div>
                <Tag color={'green'}><EnvironmentOutlined style={{ marginRight: "5px" }} /> {text}</Tag>
            </div>
          )
        },
        {
          title: 'Livreur',
          dataIndex: 'livreur',
          key: 'livreur',
          render : (text,record)=>(
            <Popover content={`Voir toutes les livraisons de ${text}`} placement="top">
              <div style={{cursor: 'pointer'}} onClick={()=> showModalLivreur(record.id_livreur)}>
                <Tag color={'blue'}><UserOutlined style={{ marginRight: "5px" }} /> {text}</Tag>
              </div>
            </Popover>
          )
        },
        {
          title: 'Date & Heure',
          dataIndex: 'date_mouvement',
          key: 'date_mouvement',
          sorter: (a, b) => a.date_mouvement - b.date_mouvement,
          sortDirections: ['descend', 'ascend'],
          render: (text) => (
            <Tag color={'blue'} icon={<CalendarOutlined />}>
              {moment(text).format('DD-MM-yyyy HH:mm')}
            </Tag>
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
            const { data } = await axios.get(`${DOMAIN}/api/produit/mouvementDepart`);
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
            const { data } = await axios.get(`${DOMAIN}/api/produit/mouvementDepartRapport?start_date=${start_date}&end_date=${end_date}&searchValue=${searchValue}`);
            setRapport(data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      
        const timeoutId = setTimeout(fetchData, 4000);
      
        return () => clearTimeout(timeoutId);
      }, [DOMAIN,start_date,end_date,searchValue]);
  
      const filteredData = data?.filter((item) =>
          item.type_mouvement?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.nom_marque?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.nom_commune?.toLowerCase().includes(searchValue.toLowerCase()) || 
          item.nom_client?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.livreur?.toLowerCase().includes(searchValue.toLowerCase())
        )
  
    return (
    <>
        <div className="products">
            <div className="product-container">
                <div div className="product-container-top">
                      <div className="product-left">
                          <h2 className="product-h2">Mouvement de stock</h2>
                          <span>Gérer vos mouvements</span>
                      </div>
                      <div className="" style={{background: '#fafafa', padding: "10px 15px", borderRadius: '10px', boxShadow: '0px 0px 15px -10px rgba(0,0,0,0.75)'}}>
                        <div style={{ display: 'flex', fontSize: '13px', marginBottom:'8px', fontWeight: 'bold' }}>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column',gap: '6px', fontSize: '12px' }}>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Nbre de ventes : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={rapport[0]?.nbre_vente}/></b></p>
                          <p style={{display:'flex',gap:'5px', justifyContent: 'space-between'}}>Montant total : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={rapport[0]?.prix}/> $</b></p>
                        </div>
                    </div>
                    </div>
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                        {opens ?<CloseOutlined className='product-icon2' onClick={HandOpen} /> : <SisternodeOutlined className='product-icon' onClick={HandOpen} />}
                        <Input
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
                    {opens &&
                              <MouvementDepartSelect getProduits={setData}/> }
                    <div className="rowChart-row-table">
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 15}} />
                    </div>
                    <Modal
                      title=""
                      centered
                      open={openVariant}
                      onCancel={() => setOpenVariant(false)}
                      width={1000}
                      footer={[]}
                    >
                      <PageDetails id={idVariant}/>
                    </Modal>

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

export default MouvementDepart