import { SearchOutlined, SisternodeOutlined,RedoOutlined, UserOutlined,CarOutlined, FilePdfOutlined,MailOutlined, FileExcelOutlined,PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect,useState } from 'react';
import { Button,Space, Table, Popover,Popconfirm, Tag} from 'antd';
import axios from 'axios';
import config from '../../config';

const Livreur = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getLivreur, setGetLivreur] = useState([]);
    const [loading, setLoading] = useState(true);
    const scroll = { x: 400 };
    const [searchValue, setSearchValue] = useState('');
    
      const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1 },
        {
            title: 'Nom',
            dataIndex: 'username',
            key: 'username',
            render: (text) => (
              <Tag color={'blue'}><UserOutlined style={{ marginRight: "5px" }} />{text}</Tag>
            ),
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          render: (text) => (
            <Popover content="Cliquez pour ouvrir Gmail" trigger="hover">
              <Tag color="yellow">
                <a href={`mailto:${text}`} target="_blank" rel="noopener noreferrer">
                  <MailOutlined style={{ marginRight: '5px' }} />
                  {text}
                </a>
              </Tag>
            </Popover>
          ),
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
          render: (text) => (
            <Tag color="green">
              <CarOutlined style={{ marginRight: '5px' }} />
              {text}
            </Tag>
          ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
               {/*  <Popover title="Modifier" trigger="hover">
                  <Button icon={<EditOutlined />} style={{ color: 'green' }} onClick={()=> handleEdit(record.id)} />
                </Popover> */}
{/*                 <Popover title="Voir le detail" trigger="hover">
                  <Link to={`/presenceListView/${record.emp1_id}`}>
                    <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                  </Link>
                </Popover> */}
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Oui"
                    cancelText="Non"
                  >
                    <Button icon={<DeleteOutlined />} style={{ color: 'red' }} />
                  </Popconfirm>
                </Popover>
              </Space>
            ),
          },
      ];

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/livreur`);
            setGetLivreur(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

      const handleDelete = async (id) => {
        try {
           await axios.put(`${DOMAIN}/api/livreur/${id}`);
             window.location.reload();
         } catch (err) {
           console.log(err);
         }
       };

       const Rafraichir = () =>{
        window.location.reload();
      }

       const filteredData = getLivreur?.filter((item) =>
        item.username?.toLowerCase().includes(searchValue.toLowerCase())
      )

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste de livreurs</h2>
                        <span>Gérer vos livreurs</span>
                    </div>
{/*                     <div className="product-right" onClick={() =>navigate('/livreurForm')}>
                        <PlusOutlined />
                        <span className="product-btn">Ajouter un nouveau livreur</span>
                    </div> */}
                </div>
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                            <SisternodeOutlined className='product-icon' />
                            <div className="product-row-search">
                                <SearchOutlined className='product-icon-plus'/>
                                <input type="search" name="" id="" placeholder='Recherche...' className='product-search' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                            </div>
                        </div>
                        <div className="product-bottom-right">
                            <Popover content={'Actualiser cette page'}>
                              <RedoOutlined className='product-icon-raf' onClick={Rafraichir}/>
                            </Popover>
                        </div>
                    </div>
                    <div className="rowChart-row-table">
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default Livreur