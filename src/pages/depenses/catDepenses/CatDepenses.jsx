import { SearchOutlined, SisternodeOutlined, FilePdfOutlined,CalendarOutline,PlusOutlined, FileExcelOutlined,DollarOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popover,Popconfirm, Tag, Modal} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import { useSelector } from 'react-redux';
import FormCatDepense from './FormCatDepense';

const CatDepenses = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.user?.currentUser);


      const handleDelete = async (id) => {
      try {
          await axios.delete(`${DOMAIN}/api/depenses/catDepenses/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };
    
      const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width:"3%"},
        {
          title: 'Nom de categorie',
          dataIndex: 'nom',
          key: 'nom_categorie',
          render : (text,record)=>(
            <div>
              <Tag color={'blue'}>{text}</Tag>
            </div>
          )
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          render : (text,record)=>(
              <Tag color={'blue'}>{text}</Tag>
          )
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id_catDepense)}
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
            const { data } = await axios.get(`${DOMAIN}/api/depenses/catDepenses`);
            setData(data);
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

  const filteredData = data?.filter((item) =>
  item.nom?.toLowerCase().includes(searchValue.toLowerCase())
);

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste de categorie de dépenses</h2>
                        <span>Gérer vos categorie de dépenses</span>
                    </div>
                    <div className="product-right" onClick={handleOk}>
                        <PlusOutlined className='product-icon'/>
                        <span className="product-btn">Ajouter une catégorie de dépenses</span>
                    </div>
                </div>
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                            <SisternodeOutlined className='product-icon' />
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
                    <div className="rowChart-row-table">
                        <Modal
                          centered
                          title='Ajouter une catégorie de dépenses'
                          open={open}
                          onCancel={() => {
                            setOpen(false)
                          }}
                          width={600}
                          footer={[
                          ]}
                        >
                            <FormCatDepense/>
                        </Modal>
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CatDepenses