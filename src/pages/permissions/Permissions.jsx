import './../products/products.scss'
import { SearchOutlined, SisternodeOutlined,EyeOutlined,CloseOutlined,UnorderedListOutlined ,EditOutlined,FilePdfOutlined,WhatsAppOutlined,UserOutlined,CalendarOutlined, FileExcelOutlined,DollarOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Table, Popover, Tag } from 'antd';
import axios from 'axios';
import config from '../../config';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';;

const Permissions = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const [idClient, setIdClient] = useState({});
    const user = useSelector((state) => state.user?.currentUser);


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
    
      const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width:"3%"},
        {
          title: 'Utilisateur',
          dataIndex: 'username',
          key: 'username',
          render : (text,record)=>(
            <div onClick={()=> handleOk(record.id_client)} style={{cursor: 'pointer'}}>
              <Tag color={'green'}><UserOutlined style={{ marginRight: "5px" }} />{text}</Tag>
            </div>
          )
        },
        {
            title: <UnorderedListOutlined  />,
            dataIndex: 'lire',
            key: 'lire',
            width: '5%',
            render : (text,record)=>(
                <Tag color={'green'}>{record.total_varianteproduit}</Tag>
            )
          },
        {
          title: <EyeOutlined style={{ marginRight: '5px',display: 'flex', alignItems:'center', justifyContent:'center', fontSize:'20px' }} />,
          dataIndex: 'edit',
          key: 'edit',
          width: '5%',
          render : (text,record)=>(
            <div style={{cursor: 'pointer'}}>
              <Tag color={'green'}>{text}</Tag>
            </div>
          )
        },
        {
          title: <EditOutlined style={{ marginRight: '5px',display: 'flex', alignItems:'center', justifyContent:'center', fontSize:'20px' }}/>,
          dataIndex: 'phone',
          key: 'phone',
          width: '5%',
          render: (text) => (
              <Tag color="green" style={{ cursor: 'pointer' }}>
                {text}
              </Tag>
          ),
        }
      ];

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/vente`);
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
      setIdClient(e)
    };

  const filteredData = data?.filter((item) =>
  item.nom_client?.toLowerCase().includes(searchValue.toLowerCase()) ||
  item.nom_marque?.toLowerCase().includes(searchValue.toLowerCase())
);

  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Permission des roles</h2>
                        <span>Gérer les permissions</span>
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