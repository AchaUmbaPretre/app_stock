import React, { useEffect, useState } from 'react'
import { Button, Input, Space, Table, Popover,Popconfirm, Tag, Modal,Checkbox} from 'antd';
import { StepBackwardOutlined,ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../../../config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const PageCommandeVente = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [selected, setSelected] = useState([]);
    const scroll = { x: 400 };
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [getType, setGetType] = useState([]);
    const [data, setData] = useState([]);
    const [typeLivraison, setTypeLivraison] = useState([]);
    const [Idcommande, setIdcommande] = useState([]);
    const userId = useSelector((state) => state.user.currentUser.id);

    const handleSelectionChange = (event, id,id_commande,id_detail_commande,id_detail_livraison,qte_livre,prix,id_taille) => {
        if (event.target.checked) {
          setSelected([...selected, { id,id_commande,id_detail_commande,id_detail_livraison,qte_livre,prix,id_taille,typeLivraison}]);
        } else {
          setSelected(selected.filter((row) => row.id !== id));
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
                checked={selected.some((item) => item.id_detail_livraison === record.id_detail_livraison)}
                onChange={(event) =>
                  handleSelectionChange(event,record.id_varianteProduit, record.id_commande, record.id_detail_commande, record.id_detail_livraison, record.qte_livre, record.prix,record.id_taille)
                }
              />
            </div>
          ),
        },
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width:"3%"},
          {
            title: 'image',
            dataIndex: 'img',
            key: 'image',
            render: (text, record) => (
              <div className="userList" onClick={()=>navigate(`/pageLivreurDetail/${record.id_varianteProduit}`)}>
                <img src={record.img} alt="" className="userImg"  />
              </div>
            )
        },
        {
          title: 'Qté',
          dataIndex: 'qte_livre',
          key: 'qte_livre',
          render: (text) => (
            <Space>
              <Tag color="green">{text}</Tag>
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
/*         {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                
              <Space size="middle">
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
          }, */
      ];

      
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/typeMouvement`);
            setGetType(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/livraison/livraison-user/${userId}`);
            setData(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [userId]);

      const handleClick = async (e) => {
        e.preventDefault();
        try {
          await Promise.all(
            selected.map(async (dd) => {
              await axios.post(`${DOMAIN}/api/vente`, {
                id_client: '',
                id_livreur: userId,
                quantite: dd.qte_livre,
                id_commande: dd.id_commande,
                id_detail_commande : dd.id_detail_commande,
                prix_unitaire: dd.prix,
                id_varianteProduit: dd.id,
                id_taille : dd.id_taille,
                id_type_mouvement : typeLivraison
              });
            })
          );
      
          Swal.fire({
            title: 'Success',
            text: 'La vente a été créée avec succès!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
      
        } catch (err) {
          const errorResponse = err.response;
          if (errorResponse && errorResponse.status === 400) {
            const errorMessage = errorResponse.data.error;
    
            Swal.fire({
              title: 'Error',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'OK',
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: err,
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        }
      }

      const handleClick2 = async (e) => {
        e.preventDefault();
      
        try {     
              await axios.put(`${DOMAIN}/api/livraison/vuLivreur/${data[0]?.id_commande}`);
      
          Swal.fire({
            title: 'Success',
            text: 'La page a été mise à jour!',
            icon: 'success',
            confirmButtonText: 'OK',
          });

          navigate('/');
          window.location.reload();
      
        } catch (err) {
          Swal.fire({
            title: 'Error',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    

  return (
    <>
        <div className="pageLivreurVente">
            <div className="pageLivreurVente-container">
                <div className="rowChart-row-table">
                    <Table columns={columns} dataSource={data} loading={loading} scroll={scroll} pagination={{ pageSize: 8}} />
                </div>
               <div className="pageLivreur-form-rows">
                    <div className="pageLivreur-form-row">
                      <label htmlFor="">Description</label>
                      <textarea name="description" id="" cols="20" rows="8">
                      </textarea>
                    </div>
                    <button className='pageLivreur-btn' onClick={handleClick}>Livrer maintenant</button>
                    <button className='pageLivreur-btn' onClick={handleClick2}>Terminer le processus</button>
                </div> 
            </div>
        </div>

    </>
  )
}

export default PageCommandeVente