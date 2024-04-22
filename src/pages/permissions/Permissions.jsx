import './../products/products.scss'
import { SearchOutlined, SisternodeOutlined,EyeOutlined,CheckOutlined, CloseOutlined,UnorderedListOutlined ,EditOutlined,FilePdfOutlined,UserOutlined,FileExcelOutlined,PrinterOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import axios from 'axios';
import config from '../../config';
import { DeleteOutlineOutlined } from '@mui/icons-material';
;

const Permissions = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [idClient, setIdClient] = useState({});


      const handleDelete = async (id) => {
        try {
          await axios.delete(`${DOMAIN}/api/vente/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };

      const HandOpen = () => {
        setOpens(!opens);
      };

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/user/getUser`);
            setData(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);
    
      const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width:"3%"},
        {
          title: 'Utilisateurs',
          dataIndex: 'username',
          key: 'username',
          render : (text,record)=>(
            <div style={{cursor: 'pointer'}}>
              <Tag color={'blue'}><UserOutlined style={{ marginRight: "5px" }} />{text}</Tag>
            </div>
          )
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render : (text,record)=>(
              <div style={{cursor: 'pointer'}}>
                <Tag color="green" icon={<CheckOutlined />}>
                {text}
                </Tag>
              </div>
            )
          },
        {
            title: <EyeOutlined style={{ marginRight: '5px',display: 'flex', alignItems:'center', justifyContent:'center', fontSize:'19px', color: 'rgb(1, 35, 138)'}} />,
            dataIndex: 'edit',
            key: 'edit',
            width: '5%',
            render : (text,record)=>(
              <div style={{cursor: 'pointer'}}>
                    <input type="checkbox" />
              </div>
            )
          },
        {
            title: <UnorderedListOutlined style={{ marginRight: '5px',display: 'flex', alignItems:'center', justifyContent:'center', fontSize:'19px',color: 'rgb(1, 35, 138)' }} />,
            dataIndex: 'lire',
            key: 'lire',
            width: '5%',
            render : (text,record)=>(
                <div>
                    <input type="checkbox" />
                </div>
            )
          },
        {
          title: <EditOutlined style={{ marginRight: '5px',display: 'flex', alignItems:'center', justifyContent:'center', fontSize:'19px', color: 'rgb(1, 35, 138)' }}/>,
          dataIndex: 'edit',
          key: 'edit',
          width: '5%',
          render: (text) => (
            <div>
                <input type="checkbox" />
            </div>
          ),
        },
        {
            title: <DeleteOutlineOutlined style={{ marginRight: '5px',display: 'flex', alignItems:'center', justifyContent:'center', fontSize:'19px',color: 'rgb(1, 35, 138)' }}/>,
            dataIndex: 'edit',
            key: 'edit',
            width: '5%',
            render: (text) => (
                <div>
                    <input type="checkbox" />
                </div>
            ),
          }

      ];

    const handleOk = async (e) => {
      setOpen(true)
      setIdClient(e)
    };

  const filteredData = data?.filter((item) =>
  item.username?.toLowerCase().includes(searchValue.toLowerCase())
);

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Permission des roles</h2>
                        <span>Gérer les permissions des utilisateurs</span>
                    </div>
                </div>
                <div className="product-bottom">
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                        {opens ?<CloseOutlined className='product-icon2' onClick={HandOpen} /> : <SisternodeOutlined className='product-icon' onClick={HandOpen} />}
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
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Permissions