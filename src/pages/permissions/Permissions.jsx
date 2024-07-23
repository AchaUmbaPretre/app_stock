import './../products/products.scss'
import { SearchOutlined, SisternodeOutlined,EyeOutlined,CheckOutlined, CloseOutlined,UnorderedListOutlined ,EditOutlined,FilePdfOutlined,UserOutlined,FileExcelOutlined,PrinterOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Input, Popover, Space, Table, Tag } from 'antd';
import axios from 'axios';
import config from '../../config';
import { Link } from 'react-router-dom';
;

const Permissions = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [opens, setOpens] = useState(false);


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
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
                <Popover title={`Voir les permissions`} trigger="hover">
                  <Link to={`/permissionOne?userId=${record.id}`}>
                    <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                  </Link>
                </Popover>
              </Space>
            ),
          },
      ];

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
                        <Input
                            type="search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Recherche..."
                            className="product-search"
                        />
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