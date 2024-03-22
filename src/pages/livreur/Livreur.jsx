import { PlusOutlined, SearchOutlined, SisternodeOutlined,UserOutlined,CarOutlined, FilePdfOutlined,MailOutlined, FileExcelOutlined,PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect,useState } from 'react';
import { Button,Space, Table, Popover,Popconfirm, Tag} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

const Livreur = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getLivreur, setGetLivreur] = useState([]);
    const [loading, setLoading] = useState(true);
    const scroll = { x: 400 };
    const navigate = useNavigate();
    
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
            <Tag color="yellow">
              <MailOutlined style={{ marginRight: '5px' }} />
              {text}
            </Tag>
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

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste de livreurs</h2>
                        <span>Gérer vos livreurs</span>
                    </div>
                    <div className="product-right" onClick={() =>navigate('/livreurForm')}>
                        <PlusOutlined />
                        <span className="product-btn">Ajouter un nouveau livreur</span>
                    </div>
                </div>
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                            <SisternodeOutlined className='product-icon' />
                            <div className="product-row-search">
                                <SearchOutlined className='product-icon-plus'/>
                                <input type="search" name="" id="" placeholder='Recherche...' className='product-search' />
                            </div>
                        </div>
                        <div className="product-bottom-right">
                            <FilePdfOutlined className='product-icon-pdf' />
                            <FileExcelOutlined className='product-icon-excel'/>
                            <PrinterOutlined className='product-icon-printer'/>
                        </div>
                    </div>
                    <div className="rowChart-row-table">
                        <Table columns={columns} dataSource={getLivreur} loading={loading} scroll={scroll} pagination={{ pageSize: 5}} />
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default Livreur