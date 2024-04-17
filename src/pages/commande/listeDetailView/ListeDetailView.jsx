import { SearchOutlined, SisternodeOutlined,UserOutlined, FilePdfOutlined,ClockCircleOutlined,FileExcelOutlined, PrinterOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, Space, Table, Popover,Popconfirm, Tag, Checkbox, Image} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import config from '../../../config';
import { useSelector } from 'react-redux';
import { FadeLoader } from 'react-spinners';

const ListeDetailView = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const scroll = { x: 400 };
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]
    const [selected, setSelected] = useState([]);
    const [getLivreur, setGetLivreur] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [livreur, setLivreur] = useState([]);
    const [totalPrice, setTotalPrice] = useState([])
    const userId = useSelector((state) => state.user.currentUser.id);
    const [remise, setRemise] = useState(0);
    const [totalAvecRemise, setTotalAvecRemise] = useState(totalPrice);
    const [getCommande, setGetCommande] = useState([]);
    const user = useSelector((state) => state.user?.currentUser);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleSelectionChange = (event, id, prix, quantite, id_detail) => {
      if (event.target.checked) {
        const updatedSelected = [...selected, { id, prix, quantite, id_detail }];
        setSelected(updatedSelected);
        const totalPrice = updatedSelected.reduce((acc, item) => acc + item.prix, 0);
        setTotalPrice(totalPrice);
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [id_detail]: quantite,
        }));
      } else {
        const updatedSelected = selected.filter((row) => row.id_detail !== id_detail);
        setSelected(updatedSelected);
        const totalPrice = updatedSelected.reduce((acc, item) => acc + item.prix, 0);
        setTotalPrice(totalPrice);
        setQuantities((prevQuantities) => {
          const { [id_detail]: removedQuantity, ...restQuantities } = prevQuantities;
          return restQuantities;
        });
      }
    };

    const handleConfirm = () => {
      setShowConfirmModal(true);
    };
    
    const handleCancel = () => {
      setShowConfirmModal(false);
    }


    useEffect(() => {
      if (remise !== 0) {
        const totalAvecRemiseValue = totalPrice - remise;
        setTotalAvecRemise(totalAvecRemiseValue);
      } else {
        setTotalAvecRemise(totalPrice);
      }
    }, [remise, totalPrice, selected]);
    
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
                checked={selected.some((item) => item.id_detail === record.id_detail)}
                onChange={(event) =>
                  handleSelectionChange(event, record.id_varianteProduit,record.prix, record.quantite, record.id_detail)
                }
              />
              {selected.some((item) => item.id_detail === record.id_detail) && (
                <div  style={{display: 'flex',flexDirection: "column", gap: "8px"}}>
                <label htmlFor="" style={{color: '#555'}}>Qté à livrer</label>
                <Input
                  value={quantities[record.id_detail]}
                  onChange={(event) =>
                    setQuantities((prevQuantities) => ({
                      ...prevQuantities,
                      [record.id_detail]: event.target.value,
                    }))
                  }
                  style={{ width: '65px' }} 
                />
                </div>
              )}
            </div>
          ),
        },
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
              return (
                <Tag color="green">
                  <ClockCircleOutlined style={{ marginRight: '5px' }} />
                  <span>{formattedDate}</span>
                </Tag>
              );
            },
          },
          {
            title: 'Créé par',
            dataIndex: 'username',
            key: 'username',
            render: (text) => (
                <Tag color="blue"><UserOutlined style={{ marginRight: "5px" }} />{text}</Tag>
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
                {user?.role === 'admin' &&
                <Popover title="Supprimer" trigger="hover">
                  <Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer?"
                    onConfirm={() => handleDelete(record.id_detail)}
                    okText="Oui"
                    cancelText="Non"
                  >
                    <Button icon={<DeleteOutlined />} style={{ color: 'red' }} />
                  </Popconfirm>
                </Popover> }
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
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,id]);

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
      }, [DOMAIN]);

/*       const handleClick = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (livreur.length === 0 || selected.length === 0) {
          Swal.fire({
            title: 'Error',
            text: 'Veuillez remplir le champ requis',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return;
        }
      
        Promise.all(
          selected.map((dd, index) =>
            axios.post(`${DOMAIN}/api/livraison/livraisonDetail`, {
              id_commande: id,
              quantite_prix : totalAvecRemise,
              id_varianteProduit: dd.id,
              qte_livre: Object.values(quantities)[index],
              qte_commande: dd.quantite,
              prix: dd.prix,
              id_livreur: livreur,
              id_detail_commande: dd.id_detail,
              user_cr: userId,
              quantite : dd.quantite,
              id_user_cr : userId,
              id_type_mouvement: 12
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
            setIsLoading(false);
            navigate('/listeCommande');

            window.location.reload();
          })
          .catch((err) => {
            Swal.fire({
              title: 'Error',
              text: err.response.data.error,
              icon: 'error',
              confirmButtonText: 'OK',
            });
          });
      }; */

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/commande/commandeOne/${id}`);
            setGetCommande(data[0]);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,id]);


      const handleClick = (e) => {
        e.preventDefault();
        setIsLoading(true);
      
        if (livreur.length === 0 || selected.length === 0) {
          Swal.fire({
            title: 'Error',
            text: 'Veuillez remplir le champ requis',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          setIsLoading(false); // Réinitialisez isLoading à false ici
          return;
        }
      
        let isSending = false; // Variable de contrôle pour éviter les doublons
      
        Promise.all(
          selected.map((dd, index) =>
            axios.post(`${DOMAIN}/api/livraison/livraisonDetail`, {
              id_commande: id,
              quantite_prix: totalAvecRemise,
              id_varianteProduit: dd.id,
              qte_livre: Object.values(quantities)[index],
              qte_commande: dd.quantite,
              prix: dd.prix,
              id_livreur: livreur,
              id_detail_commande: dd.id_detail,
              user_cr: userId,
              quantite: dd.quantite,
              id_user_cr: userId,
              id_type_mouvement: 12
            })
          )
        )
          .then(() => {
            if (!isSending) {
              isSending = true; // Définissez la variable de contrôle sur true pour éviter les doublons
              Swal.fire({
                title: 'Success',
                text: 'Livraison créée avec succès!',
                icon: 'success',
                confirmButtonText: 'OK',
              });
              setIsLoading(false);
              navigate('/listeCommande');
              window.location.reload();
            }
          })
          .catch((err) => {
            Swal.fire({
              title: 'Error',
              text: err.response.data.error,
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
                        <h2 className="product-h2">Liste de commande N° {id}</h2>
                        <span>de Mme {getCommande?.nom} de la commune {getCommande?.nom_commune} Av/ {getCommande?.avenue} Q/ {getCommande?.quartier} N° {getCommande?.num}</span>
                    </div>
                    <div className="varianteProduit-right" style={{display:'flex', flexDirection:'column'}}>
                      <h2 style={{fontSize:'1rem', color:'rgb(1, 35, 138)'}}>Contact de Mn {getCommande?.nom}</h2>
                      <span className="variant-name" style={{fontSize:'.8rem', color:'#6d6c6c'}}>{getCommande?.telephone}</span>
                    </div>
                </div>
                <div className="product-bottom">
                  { loading ? (
                  <div className="spinner-container">
                    <FadeLoader color={'#36D7B7'} loading={loading} />
                  </div>
                  ) : ( <>
                    <div className="product-bottom-top">
                        <div className="product-bottom-left">
                            <SisternodeOutlined className='product-icon' />
                            <div className="product-row-search">
                                <SearchOutlined className='product-icon-plus'/>
                                <input type="search" name="" id="" placeholder='Recherche...' className='product-search' />
                            </div>
                        </div>
                        <div className="product-bottom-right">
                        </div>
                    </div>
                    <div className="rowChart-row-table">
                        <Table columns={columns} dataSource={data} loading={loading} scroll={scroll} pagination={{ pageSize: 10}} />
                    </div>
                    <div className="liste_bottom">
                      <div className="liste_rows">
                        <div className="liste-row">
                          <label htmlFor="">Livreur</label>
                          <select name="" id="" className='list_select' onChange={(e)=>setLivreur(e.target.value)}>
                            <option value="">Sélectionnez un livreur</option>
                            {getLivreur.map((dd)=>(
                              <option value={dd.id}>{`${dd.username}`}</option>
                            ))}
                          </select>
                        </div>
                        <div className="liste-row">
                          <label htmlFor="">Prix total</label>
                          <h3>{isFinite(totalAvecRemise) ? totalAvecRemise : ''} $</h3>
                        </div>
                        <div className="liste-row">
                        <label htmlFor="">La remise</label>
                        <input
                          type="number"
                          className='list_select'
                          value={remise}
                          onChange={(e) => {
                            const remiseValue = parseInt(e.target.value);
                            setRemise(e.target.value);

                            if (!isNaN(remiseValue) && remiseValue !== 0) {
                              const totalAvecRemiseValue = totalPrice - remiseValue;
                              setTotalAvecRemise(totalAvecRemiseValue);
                            } else {
                              setTotalAvecRemise(totalPrice);
                            }
                          }}
                        />
                        </div>
                        <div className="rows-btn">
                          <button className="list_btn" onClick={handleConfirm} disabled={isLoading}>Envoyer</button>
                          <Modal
                            title="Confirmation"
                            visible={showConfirmModal}
                            onOk={handleClick}
                            onCancel={handleCancel}
                            centered
                            cancelText={<span style={{ color: '#fff' }}>Non</span>}
                            okText={<span style={{ color: '#fff' }}>Oui</span>}
                            cancelButtonProps={{ style: { background: 'red' } }}
                            okButtonProps={{ style: { background: 'blue' }}}
                          >
                            <p>Voulez-vous vraiment effectuer cette action ?</p>
                          </Modal>
                          {isLoading && (
                            <div className="loader-container loader-container-center">
                              <CircularProgress size={28} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div> </>)}
                </div>
            </div>
        </div>
    </>
  )
}

export default ListeDetailView