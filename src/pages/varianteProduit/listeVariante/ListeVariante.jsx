import { SearchOutlined, SisternodeOutlined, FilePdfOutlined,FileExcelOutlined,PrinterOutlined,CalendarOutlined, CloseOutlined, DeleteOutlined,EyeOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popover,Popconfirm, Tag, Image } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import { useSelector } from 'react-redux';
import VarianteSelect from '../varianteSelect/VarianteSelect';
import moment from 'moment';
import CountUp from 'react-countup';

const ListeVariante = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const scroll = { x: 400 };
    const [searchValue, setSearchValue] = useState('');
    const [produit, setProduit] = useState([]);
    const [opens, setOpens] = useState(false);
    const user = useSelector((state) => state.user?.currentUser);
    const [produitTotalAchats, setProduitTotalAchats] = useState([]);
    
      const handleDelete = async (id) => {
      try {
          await axios.delete(`${DOMAIN}/api/livraison/livraisonDeleteDetail/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };

      const HandOpen = () =>{
        setOpens(!opens)
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
            title: 'Description',
            dataIndex: 'nom_produit',
            width: "5%",
            key: 'nom_nom_produit',
            render: (text) => (
              <Tag color={"blue"}>
                {text}
              </Tag>
            )
        },
        {
            title: 'Categorie',
            dataIndex: 'nom_categorie',
            key: 'nom_categorie',
            render: (text) => (
              <Tag color={"green"}>
                {text}
              </Tag>
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
          dataIndex: 'taille',
          key: 'taille',
          render: (text) => (
            <Tag color={"blue"}>
              {text}
            </Tag>
          )
        },
        {
          title: "Date d'entrée",
          dataIndex: 'created_at',
          key: 'created_at',
          sorter: (a, b) => a.created_at - b.created_at,
          sortDirections: ['descend', 'ascend'],
            render: (text) => (
              <span>
                <Tag color={'blue'} icon={<CalendarOutlined />}>
                  {moment(text).format('DD-MM-yyyy')}
                </Tag>
              </span>
            ),
        },
        {
          title: 'Code variante',
          dataIndex: 'code_variant',
          key: 'code_variant',
          render: (text) => (
            <Tag color={"green"}>
              {text}
            </Tag>
          )
        },
        {
          title: 'Montant total',
          dataIndex: 'total',
          key: 'total',
          render: (text) => (
            <Tag color={"blue"}>
              {`${text} $`}
            </Tag>
          )
        },
        {
          title: 'Quantité en stock',
          dataIndex: 'total_stock',
          key: 'total_stock', 
          sorter: (a, b) => a.total_stock - b.total_stock,
          sortDirections: ['descend', 'ascend'],
          render: (total_stock) => (
            <Tag color={total_stock > 0 ? 'green' : 'red'}>{total_stock}</Tag>
          ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
                 <Popover title="Voir les détails" trigger="hover">
                  <Link to={`/pageDetail/${record.id_varianteProduit}`}>
                    <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                  </Link>
                </Popover>
                {user?.role === 'admin' &&
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id_detail_livraison)}
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

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/listeVarianteProduit`);
            setData(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);



      useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`${DOMAIN}/api/produit/produitCount`);
                setProduit(res.data)
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
     }, [DOMAIN])

     useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`${DOMAIN}/api/rapport/achatsTotal/total`);
          setProduitTotalAchats(data[0]?.montant_total_achats);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [DOMAIN]);

/*       const groupedData = Object.values(
        data.reduce((acc, item) => {
          const { code_variant, ...rest } = item;
          if (acc[code_variant]) {
            Object.assign(acc[code_variant], { data: [...acc[code_variant].data, rest] });
          } else {
            acc[code_variant] = { code_variant, data: [rest] };
          }
          return acc;
        }, {})
      );
      const firstDataArray = groupedData.map(obj => obj.data[0]); */


    const filteredData = data?.filter((item) =>
      item.nom_categorie?.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.nom_marque?.toLowerCase().includes(searchValue.toLowerCase())
    );


  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                      <h2 className="product-h2">Stock des chaussures</h2>
                      <span>Gérer vos chaussures</span>
                    </div>
                    <div className="" style={{background: '#fafafa', padding: "10px 15px", borderRadius: '10px', boxShadow: '0px 0px 15px -10px rgba(0,0,0,0.75)'}}>
                      <div style={{ display: 'flex', flexDirection: 'column',gap: '6px', fontSize: '14px' }}>
                        <p style={{display:'flex',gap:'8px', justifyContent: 'space-between'}}>Total d'articles en stock : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={produit[0]?.total}/></b></p>
                        <p style={{display:'flex',gap:'8px', justifyContent: 'space-between'}}>Montant total : <b style={{color:'#fff', background:'rgba(1, 35, 138, 0.952)', padding: "5px", borderRadius: '10px', fontSize: '12px'}}><CountUp end={produitTotalAchats}/>$</b></p>
                      </div>
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
                    {opens &&
                    <VarianteSelect getProduits={setData}/> } 
                        <Table columns={columns} dataSource={data} loading={loading} scroll={scroll} pagination={{ pageSize: 15}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ListeVariante