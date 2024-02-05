import React, { useEffect, useState } from 'react'
import { Button, Input, Space, Table,Tag,Checkbox} from 'antd';
import axios from 'axios';
import config from '../../../config';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { FadeLoader } from 'react-spinners';

const PageLivraisonRetour = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [selected, setSelected] = useState([]);
    const scroll = { x: 400 };
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [desc, setDesc] = useState(null);
    const userId = useSelector((state) => state.user.currentUser.id);
    const {pathname} = useLocation();
    const IdCommande = pathname.split('/')[2];

    const handleSelectionChange = (event, id,id_commande,id_detail_commande,id_detail_livraison,qte_livre,prix,id_taille,id_client) => {
        if (event.target.checked) {
          setSelected([...selected, { id,id_commande,id_detail_commande,id_detail_livraison,qte_livre,prix,id_taille,id_client}]);
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
                  handleSelectionChange(event,record.id_varianteProduit, record.id_commande, record.id_detail_commande, record.id_detail_livraison, record.qte_livre, record.prix,record.id_taille,record.id_client)
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
          }
      ];

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/livraison/livraison-userOne/${userId}`, {
              params: {
                id_commande: IdCommande
              }
            });
      
            // Utiliser un ensemble (Set) pour éliminer les doublons
            const uniqueData = Array.from(new Set(data.map(item => item.id_varianteProduit))).map(id => {
              return data.find(item => item.id_varianteProduit === id);
            });
      
            setData(uniqueData);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData();
      }, [DOMAIN, userId, IdCommande]);

      const handleClick = async (e) => {
        e.preventDefault();
        try {
          await Promise.all(
            selected.map(async (dd) => {
              await axios.post(`${DOMAIN}/api/vente/retour`, {
                id_client: dd.id_client,
                id_livreur: userId,
                quantite: dd.qte_livre,
                id_commande: dd.id_commande,
                id_detail_commande : dd.id_detail_commande,
                prix_unitaire: dd.prix,
                id_varianteProduit: dd.id,
                id_taille : dd.id_taille,
                id_type_mouvement : 5,
                description : desc
              });
            })
          );
            
          Swal.fire({
            title: 'Success',
            text: 'Le produit est retourné avec succès!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          navigate('/pageLivreurVente')
          window.location.reload();
      
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

  return (
    <>
        <div className="pageLivreurVente">
        { loading ? (
          <div className="spinner-container">
            <FadeLoader color={'#36D7B7'} loading={loading} />
          </div>
          ) : (
            <div className="pageLivreurVente-container">
              <div className="page-rows-retour" onClick={()=>navigate('/pageRetourCommande')}>
                  <div className="page-retour-row">
                    retour
                  </div>
              </div>
            <h1>Retourne les produits restants</h1>
                <div className="rowChart-row-table">
                    <Table columns={columns} dataSource={data} loading={loading} scroll={scroll} pagination={{ pageSize: 8}} />
                </div>
               <div className="pageLivreur-form-rows">
                    <div className="pageLivreur-form-row">
                      <label htmlFor="">Description</label>
                      <textarea name="description" id="" cols="20" rows="8" onChange={(e)=>setDesc(e.target.value)}>
                      </textarea>
                    </div>
                    <button className='pageLivreur-btn' onClick={handleClick}>Envoyer maintenant</button>
                </div> 
            </div>)}
        </div>
    </>
  )
}

export default PageLivraisonRetour