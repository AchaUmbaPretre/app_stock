import './client.scss'
import { PlusOutlined, SearchOutlined, SisternodeOutlined,WhatsAppOutlined,PhoneOutlined,EnvironmentOutlined,EyeOutlined,UserOutlined, FilePdfOutlined, FileExcelOutlined,EditOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Popconfirm, Popover, Tag, Modal} from 'antd';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import axios from 'axios';
import MouvClientDetail from '../mouvement/mouvementClientDetail/MouvClientDetail';
import { useSelector } from 'react-redux';
import ClientTelephone from './clientTelephone/ClientTelephone';
import ClientAdresse from './clientAdresse/ClientAdresse';
import ClientView from './ClientView';
import ClientForm from './clientForm/ClientForm';

const Client = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [getClient, setGetClient] = useState();
    const [loading, setLoading] = useState(true);
    const searchInput = useRef(null);
    const scroll = { x: 400 };
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [openss, setOpenss] = useState(false);
    const [openAdresse, setOpenAdresse] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [openDetailAdresse, setOpenDetailAdresse] = useState(false);
    const [idClient, setIdClient] = useState({});
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

      const showModal = (e) => {
        setOpen(true);
        setIdClient(e)
      };

      const showModalPhone = (e) => {
        setOpens(true);
        setIdClient(e)
      };

      const showModalAdresse = (e) => {
        setOpenAdresse(true);
        setIdClient(e)
      };

      const showModalDetailAdresse = (e) => {
        setOpenDetailAdresse(true);
        setIdClient(e)
      };

      const handleClick = () => {
        setOpenss(!openss)
      }
          
      const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
        {
            title: 'Nom',
            dataIndex: 'nom',
            key: 'nom',
            ...getColumnSearchProps('nom'),
            render : (text,record)=>(
              <div>
                 <Tag color={'green'} onClick={()=> showModal(record.id)} style={{cursor: "pointer"}}><UserOutlined style={{ marginRight: "5px" }} />{text}</Tag>
              </div>
            )
        },
        {
            title: 'Raison sociale',
            dataIndex: 'raison_sociale',
            key: 'raison_sociale',
            ...getColumnSearchProps('raison_sociale'),
            render: (text)=> {
              return <Tag color={'green'}>{text}</Tag>;
            }
        },
          {
            title: 'Telephone',
            dataIndex: 'telephone',
            key: 'telephone',
            render: (text) => (
              <Popover content="Discutez avec lui sur WhatsApp" placement="top">
              <Tag
                onClick={() => window.open(`https://wa.me/${text}`, '_blank')}
                color="green"
                style={{ cursor: 'pointer' }}
              >
                <WhatsAppOutlined style={{ color: 'green', marginRight: '5px' }} />
                {text}
              </Tag>
            </Popover>
            ),
          },
          {
            title: 'Ville',
            dataIndex: 'nom_province',
            key: 'nom_province',
            ...getColumnSearchProps('nom_province'),
            render: (text) => (
              <div>
                <Tag color="blue">
                  <EnvironmentOutlined style={{ marginRight: '5px' }} />
                  {text}
                </Tag>
              </div>
            ),
          },
        {
            title: 'Commune',
            dataIndex: 'nom_commune',
            key: 'nom_commune',
            render : (text,record)=>(
              <div>
                <Popover content={`Ajouter une nouvelle adresse de Mme ${record.nom} `} placement="top">
                  <Tag color={'blue'} onClick={()=> showModalAdresse(record.id)}><EnvironmentOutlined style={{ marginRight: '5px' }} />{text}</Tag>
                </Popover>
              </div>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
                <Popover title={`Ajouter un nouveau numero de Mme ${record.nom}`} trigger="hover">
                  <Button icon={<PhoneOutlined />} style={{ color: 'green' }} onClick={()=> showModalPhone(record.id)} />
                </Popover>
                <Popover title="Modifier" trigger="hover">
                  <Button icon={<EditOutlined />} style={{ color: 'green' }} onClick={()=> handleEdit(record.id)} />
                </Popover>
                <Popover title="Afficher les détails des adresses." trigger="hover">
                  <Button icon={<EyeOutlined />} style={{ color: 'blue', cursor: 'pointer' }} onClick={()=> showModalDetailAdresse(record.id)}/>
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
                </Popover>}
              </Space>
            ),
          },
      ];

        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/client`);
            setGetClient(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
      
      useEffect(() => {
        fetchData();
      }, [DOMAIN]);

      const handleEdit = (id) => {
        navigate(`/clientEdit/${id}`);
      };
    
      const handleDelete = async (id) => {
      try {
          await axios.put(`${DOMAIN}/api/client/clientDelete/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        } 
      };

  const filteredData = getClient?.filter((item) =>
    item.nom?.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.nom_province?.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.nom_commune?.toLowerCase().includes(searchValue.toLowerCase())||
    item.telephone?.toLowerCase().includes(searchValue.toLowerCase())
);

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste de clients</h2>
                        <span>Gérer vos clients</span>
                    </div>
                    <div style={{display:'flex', gap: '10px'}}>
                      <div className="product-right" onClick={handleClick}>
                          <PlusOutlined />
                          <span className="product-btn">Ajouter un nouveau client</span>
                      </div>
                    </div>
                </div>
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                            <SisternodeOutlined className='product-icon' />
                            <div className="product-row-search">
                                <SearchOutlined className='product-icon-plus'/>
                                <input type="search" name="" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}  placeholder='Recherche...' className='product-search' />
                            </div>
                        </div>
                        <div className="product-bottom-right">
                            <FilePdfOutlined className='product-icon-pdf' />
                            <FileExcelOutlined className='product-icon-excel'/>
                            <PrinterOutlined className='product-icon-printer'/>
                        </div>
                    </div>
                    <div className="rowChart-row-table">
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
                          title="Ajouter un nouveau numero"
                          centered
                          open={opens}
                          onCancel={() => setOpens(false)}
                          width={600}
                          footer={[
                            
                          ]}
                        >
                         <ClientTelephone idClients={idClient}/>
                        </Modal>
                        <Modal
                          title="Ajouter une nouvelle adresse"
                          centered
                          open={openAdresse}
                          onCancel={() => setOpenAdresse(false)}
                          width={800}
                          footer={[
                            
                          ]}
                        >
                         <ClientAdresse idClients={idClient}/>
                        </Modal>

                        <Modal
                          title=""
                          centered
                          open={openDetailAdresse}
                          onCancel={() => setOpenDetailAdresse(false)}
                          width={1200}
                          footer={[
                            
                          ]}
                        >
                         <ClientView id_client={idClient}/>
                        </Modal>
                        <Modal
                          title=""
                          centered
                          open={openss}
                          onCancel={() => setOpenss(false)}
                          width={900}
                          footer={[
                            
                          ]}
                        >
                         <ClientForm fetchData={fetchData} closeModal={()=> setOpenss(!openss)} />
                        </Modal>
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 15}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Client