import { SearchOutlined, SisternodeOutlined, FilePdfOutlined,FileExcelOutlined,PrinterOutlined,CloseOutlined, DeleteOutlined,EyeOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popover,Popconfirm, Tag } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import { useSelector } from 'react-redux';
import VarianteSelect from '../varianteSelect/VarianteSelect';

const ListeVariante = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const scroll = { x: 400 };
    const {pathname} = useLocation();
    const id = pathname.split('/')[2];
    const [open, setOpen] = useState(false);
    const [idClient, setIdClient] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [opens, setOpens] = useState(false);
    const user = useSelector((state) => state.user?.currentUser);

    
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

      const HandOpen = () =>{
        setOpens(!opens)
      }
    
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
          title: 'Couleur',
          dataIndex: 'description',
          key: 'description',
          render: (text) => {
            let tagColor;
        
            switch (text) {
              case 'Jaune':
                tagColor = 'yellow';
                break;
              case 'Rouge':
                tagColor = 'red';
                break;
              case 'Noir':
                tagColor = 'black';
                break;
              case 'Vert fluo':
              case 'Vert':
                tagColor = 'green';
                break;
              case 'Bleu':
              case 'Bleu pic':
                tagColor = 'blue';
                break;
              case 'Marron':
              case 'Marron caramel':
                tagColor = 'brown';
                break;
              case 'Orange':
                tagColor = 'orangered';
                break;
              case 'Rose':
              case 'Rose fuchsia':
                tagColor = 'deeppink';
                break;
              case 'Beige':
                tagColor = 'beige';
                break;
              case 'Gris':
                tagColor = 'gray';
                break;
              default:
                tagColor = 'default-color'; // Définir une couleur par défaut si aucun cas ne correspond
            }
        
            return <Tag color={tagColor}>{text}</Tag>;
          },
        },
        {
            title: 'Prix',
            dataIndex: 'prix',
            key: 'prix',
            sorter: (a, b) => a.prix - b.prix,
            sortDirections: ['descend', 'ascend'],
            render: (text,record) => (
              <span>
              <Tag color={'blue'} onClick={()=> showModal(record.id_detail_livraison)}>
                {parseFloat(text).toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Tag>
              
              </span>
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
                        <h2 className="product-h2">Liste des variantes</h2>
                        <span>Gérer vos variantes</span>
                    </div>
                    <div className="varianteProduit-right" style={{display:'flex', flexDirection:'column'}}>
                      <h2 style={{fontSize:'1rem', color:'rgb(1, 35, 138)'}}></h2>
                      <span className="variant-name" style={{fontSize:'.8rem', color:'#6d6c6c'}}></span>
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
                        <Table columns={columns} dataSource={filteredData} loading={loading} scroll={scroll} pagination={{ pageSize: 5}} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ListeVariante