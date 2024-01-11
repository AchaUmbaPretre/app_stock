import { FieldBinaryOutlined, SearchOutlined, SisternodeOutlined,UserOutlined, FilePdfOutlined,PlusCircleOutlined, FileExcelOutlined,EditOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Space, Table, Popover,Popconfirm, Tag, Modal,Checkbox} from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format, isValid } from 'date-fns';
import Swal from 'sweetalert2';
import config from '../../../config';
import { useSelector } from 'react-redux';

const ListeDetailView = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const scroll = { x: 400 };
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]
    const [title, setTitle] = useState('');
    const [selected, setSelected] = useState([]);
    const [getLivreur, setGetLivreur] = useState([]);
    const [quantities, setQuantities] = useState({});
    const userId = useSelector((state) => state.user.currentUser.id);

    const handleSelectionChange = (event, id, quantite,id_detail) => {
      if (event.target.checked) {
        setSelected([...selected, { id, quantite,id_detail }]);
      } else {
        setSelected(selected.filter((row) => row.id !== id));
      }
    };
    
    console.log(selected)
      const handleDelete = async (id) => {
      try {
          await axios.delete(`${DOMAIN}/api/commande/detail-commande/${id}`);
            window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };
    
      const columns = [
        {
          title: '',
          dataIndex: 'id_detail',
          key: 'selected',
          render: (text, record) => (
            <div>
              <Checkbox
                checked={selected.some((item) => item.id === record.id_varianteProduit)}
                onChange={(event) =>
                  handleSelectionChange(event, record.id_varianteProduit, record.quantite, record.id_detail)
                }
              />
              {selected.some((item) => item.id === record.id_varianteProduit) && (
                <Input
                  value={quantities[record.id_varianteProduit] || ''}
                  onChange={(event) =>
                    setQuantities((prevQuantities) => ({
                      ...prevQuantities,
                      [record.id_varianteProduit]: event.target.value,
                    }))
                  }
                />
              )}
            </div>
          ),
        },
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width:"3%"},
          {
            title: 'image',
            dataIndex: 'img',
            key: 'image',
            render: (text, record) => (
              <div className="userList">
                <img src={record.img} alt="" className="userImg"  />
              </div>
            )
        },
        {
          title: 'Quantité',
          dataIndex: 'quantite',
          key: 'quantite',
          render: (text) => (
            <Space>
              <Tag color="green">{text}</Tag>
            </Space>
          ),
        },
        {
          title: 'Pointure',
          dataIndex: 'taille',
          key: 'id_taille',
          render: (text) => (
            <Space>
              <Tag color="orange">{text}</Tag>
            </Space>
          ),
        },
        {
            title: 'Prix',
            dataIndex: 'prix',
            key: 'prix',
            sorter: (a, b) => a.prix - b.prix,
            sortDirections: ['descend', 'ascend'],
            render: (text) => (
              <span>
              <Tag color={'green'}>
                {parseFloat(text).toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Tag>
              
              </span>
            ),
          },
        {
          title: 'Date demande & heure',
          dataIndex: 'date_demande',
          key: 'date_demande',
            render: (text) => {
              const formattedDate = format(new Date(text), 'dd-MM-yyyy HH:mm:ss');
              return <span>{formattedDate}</span>;
            },
          },
          {
            title: 'Créé par',
            dataIndex: 'username',
            key: 'username',
            render: (text) => (
              <Space>
                <UserOutlined />
                <Tag color="blue">{text}</Tag>
              </Space>
            ),
          },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
{/*                 <Popover title="Voir la liste de cette commande" trigger="hover">
                  <Link to={`/venteView/${record.id}`}>
                    <Button icon={<EyeOutlined />} style={{ color: 'blue' }} />
                  </Link>
                </Popover> */}
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id_detail)}
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
            const { data } = await axios.get(`${DOMAIN}/api/commande/detail-commande/${id}`);
            setData(data);
            setLoading(false)
            const getTitle = data.map((dd)=>(dd.id_commande))

            setTitle(getTitle[0])
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

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

      console.log(selected)

      const handleClick = (e) => {
        e.preventDefault();
      
        Promise.all(
          selected.map((dd, index) =>
            axios.post(`${DOMAIN}/api/livraison/livraisonDetail`, {
              id_commande: id,
              id_varianteProduit: dd.id,
              qte_livre: Object.values(quantities)[index],
              qte_commande: dd.quantite,
              prix: 100,
              id_livreur: 1,
              id_detail_commande: dd.id_detail,
              user_cr: userId,
            })
          )
        )
          .then(() => {
            Swal.fire({
              title: 'Success',
              text: 'Livraison créée avec succès!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            navigate('/listeCommande');
            window.location.reload();
          })
          .catch((err) => {
            Swal.fire({
              title: 'Error',
              text: err.message,
              icon: 'error',
              confirmButtonText: 'OK',
            });
          });
      };


  return (
    <>
        <div className="products">
            <div className="product-container">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Liste de commande N° {title}</h2>
                        <span>Voir le detail de commande {title}</span>
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
                        <Table columns={columns} dataSource={data} loading={loading} scroll={scroll} pagination={{ pageSize: 8}} />
                    </div>
                    <div className="liste_bottom">
                      <div className="liste_rows">
                        <div className="liste-row">
                          <label htmlFor="">Livreur</label>
                          <select name="" id="" className='list_select'>
                            <option value="">Sélectionnez un livreur</option>
                            {getLivreur.map((dd)=>(
                              <option value={dd.id_livreur}>{`${dd.nom} - ${dd.prenom}`}</option>
                            ))}
                          </select>
                        </div>
                        <div className="rows-btn">
                          <button className="list_btn" onClick={handleClick}>Soumettre</button>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ListeDetailView