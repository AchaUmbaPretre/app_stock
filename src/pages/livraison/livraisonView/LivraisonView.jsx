import { SearchOutlined, SisternodeOutlined, FilePdfOutlined,FileExcelOutlined,PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popover,Popconfirm, Tag, Modal} from 'antd';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import config from '../../../config';
import LivraisonViewPrix from './LivraisonViewPrix';

const LivraisonView = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const scroll = { x: 400 };
    const {pathname} = useLocation();
    const id = pathname.split('/')[2];
    const [open, setOpen] = useState(false);
    const [idClient, setIdClient] = useState({});
    const [prix, setPrix] = useState({});
    const [searchValue, setSearchValue] = useState('');

    
      const handleDelete = async (id) => {
      try {
          await axios.delete(`${DOMAIN}/api/livraison/livraisonDeleteDetail/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };

      const showModal = (e) => {
        setOpen(true);
        setIdClient(e);
      };
    
      const columns = [
          { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width:"3%"},
          {
            title: 'Image',
            dataIndex: 'img',
            key: 'image',
            render: (text, record) => (
              <div className="userList">
                <img src={record.img} alt="" className="userImg"  />
              </div>
            )
        },
        {
          title: 'Marque',
          dataIndex: 'nom_marque',
          key: 'nom_marque',
          render: (text) => (
            <Tag color={"green"}>
              {text}
            </Tag>
          )
        },
        {
          title: 'Pointure',
          dataIndex: 'pointure',
          key: 'pointure',
          render: (text) => (
            <Tag color={"#87d068"}>
              {text}
            </Tag>
          )
        },
        {
          title: 'Client',
          dataIndex: 'nom_client',
          key: 'nom_client',
          render: (text) => (
            <Tag color={"green"}>
              {text}
            </Tag>
          )
        },
        {
          title: 'Livreur',
          dataIndex: 'nom_livreur',
          key: 'nom_livreur',
          render: (text) => (
            <Tag color={"blue"}>
              {text}
            </Tag>
          )
        },
        {
          title: 'Qté livrée',
          dataIndex: 'qte_livre',
          key: 'qte_livre',
          sorter: (a, b) => a.qte_livre - b.qte_livre,
          sortDirections: ['descend', 'ascend'],
          render: (text) => (
            <Tag color={"#108ee9"}>
              {text}
            </Tag>
          )
        },
        {
            title: 'Qté commandée',
            dataIndex: 'qte_commande',
            key: 'qte_commande',
            sorter: (a, b) => a.qte_commande - b.qte_commande,
            sortDirections: ['descend', 'ascend'],
            render: (text) => (
              <Tag color={"#87d068"}>
                {text}
              </Tag>
            )
        },
        {
            title: 'Prix',
            dataIndex: 'prix',
            key: 'prix',
            sorter: (a, b) => a.prix - b.prix,
            sortDirections: ['descend', 'ascend'],
            render: (text,record) => (
              <span>
              <Tag color={'green'} onClick={()=> showModal(record.id_detail_livraison)}>
                {parseFloat(text).toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Tag>
              
              </span>
            ),
        },
        {
            title: 'Date création',
            dataIndex: 'date_creation',
            key: 'date_creation',
            render: (text) => {
              const formattedDate = format(new Date(text), 'dd-MM-yyyy');
              return <span>
              <Tag color={"blue"}>
                {formattedDate}
              </Tag>
              </span>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
{/*                 <Popover title="Voir la liste de cette commande" trigger="hover">
                  <Link to={`/livraisonView/${record.id_commande}`}>
                    <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                  </Link>
                </Popover> */}
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id_detail_livraison)}
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
            const { data } = await axios.get(`${DOMAIN}/api/livraison/livraisonDetailOne/${id}`);
            setData(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,id]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/livraison/livraisonPrix/${idClient}`);
            setPrix(data[0].prix);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,idClient]);

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
                        <h2 className="product-h2">Liste de détail des livraisons de commande N° {id}</h2>
                        <span>Voir le détail des livraisons</span>
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
                          title="Modifier le prix"
                          centered
                          open={open}
                          onCancel={() => setOpen(false)}
                          width={400}
                          footer={[
                            
                          ]}
                        >
                         <LivraisonViewPrix prixTotal={prix} idDetail={idClient}/> 
                        </Modal>
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 8}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default LivraisonView