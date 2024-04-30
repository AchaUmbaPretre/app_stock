import React from 'react'
import { useState } from 'react';
import Select from 'react-select';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Space, Table, Tag } from 'antd';
import config from '../../../config';

const EchangeForm = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState({})
  const scroll = { x: 450 };
  const [commande, setCommande] = useState([]);
  const [getCommande, setGetCommande] = useState([]);
  const [value, setValue] = useState(null);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
  
    let updatedValue = fieldValue;
  
    setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
  };

  const handleSelectionChange = (event,id_vente, id_commande,id_detail_commande,prix_unitaire,id_taille,id_client, id_varianteProduit) => {
    if (event.target.checked) {
      const updatedSelected = [...selected, { id_vente,id_commande,id_detail_commande,prix_unitaire,id_taille,id_client,id_varianteProduit}]
      setSelected(updatedSelected);
    } else {
      setSelected(selected.filter((row) => row.id_detail_commande !== id_detail_commande));
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
            checked={selected.some((item) => item.id_detail_commande === record.id_detail_commande)}
            onChange={(event) =>
              handleSelectionChange(event,record.id_vente,record.id_commande, record.id_detail_commande, record.prix_unitaire,record.id_taille,record.id_client,record.id_varianteProduit)
            }
          />
        </div>
      ),
    },
    { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width:"2%"},
      {
        title: 'image',
        dataIndex: 'img',
        key: 'image',
        width: '20px',
        render: (text, record) => (
          <div className="userList" onClick={()=>navigate(`/pageLivreurDetail/${record.id_varianteProduit}`)}>
            <img src={`${DOMAIN}${record.img}`} alt="" className="userImg"  />
          </div>
        )
    },
    {
      title: 'Pointure',
      dataIndex: 'pointure',
      key: 'pointure',
      render: (text) => (
        <Space>
          <Tag color="blue">{text}</Tag>
        </Space>
      ),
    },
    {
      title: 'Prix',
      dataIndex: 'prix_unitaire',
      key: 'prix_unitaire',
      sorter: (a, b) => a.prix_unitaire - b.prix_unitaire,
      sortDirections: ['descend', 'ascend'],
      render: (text) => (
        <span>
        <Tag color={'blue'}>
          {parseFloat(text).toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'USD',
          })}
        </Tag>   
        </span>
      ),
    },
    {
      title: 'Couleur',
      dataIndex: 'description',
      key: 'description',
      render: (color) => {
        let tagColor;
      
        if (color === 'Rouge') {
          tagColor = '#FF0000';
        } else if (color === 'Noir') {
          tagColor = 'black';
        } else if (color === 'Noir brillant'){
          tagColor = '#000';
        } else if (color === 'Orange') {
          tagColor = 'orange';
        } else if (color === 'Bleu') {
          tagColor = 'skyblue';
        } else if (color === 'Bleu ciel'){
          tagColor = '#87CEEB';
        } else if (color === 'Chocolat') {
          tagColor = 'chocolate';
        } else if (color === 'Vert fluo') {
          tagColor = 'lime';
        } else if (color === 'Vert') {
          tagColor = ' #008000';
        }else if (color === 'Vert clair'){
          tagColor = '#90EE90';
        } else if (color === 'Rose fuschia') {
          tagColor = '#FF00FF';
        }else if (color === 'Rose'){
          tagColor = '#FFC0CB';
        } else if (color === 'Beige saumon') {
          tagColor = 'burlywood';
        } else if (color === 'Jaune') {
          tagColor = 'yellow';
        } else if (color === 'Gris') {
          tagColor = 'gray';
        } else if (color === 'Violet') {
          tagColor = 'purple';
        } else if (color === 'Mauve') {
          tagColor = '#D473D4';
        } else if (color === 'Argente'){
          tagColor = '#C0C0C0';
        } else if (color === 'Dorée'){
          tagColor = '#C0C0C0';
        }else if (color === 'Rouge Bordeau'){
          tagColor = '#6D071A';
        }else if (color === 'Beige'){
          tagColor = '#F5F5DC';
        }else if (color === 'Marron fonce'){
          tagColor = '#800000';
        }else if (color === 'Marron'){
          tagColor = '#A52A2A';
        }else if (color === 'Blanc'){
          tagColor = 'white';
        } else {
          // Couleur par défaut si aucune correspondance n'est trouvée
          tagColor = 'default';
        }
      
        return (
          <Tag color={tagColor}>{color}</Tag>
        );
      },
    },
    {
      title: 'Qté',
      dataIndex: 'quantite',
      key: 'quantite',
      render: (text) => (
        <Space>
          <Tag color="blue">{text}</Tag>
        </Space>
      ),
    }
  ];

  useEffect(()=> {
    setValue(data?.id_commande)
  }, [data?.id_commande])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/commande/commandeEchange`);
        setCommande(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  
    const timeoutId = setTimeout(fetchData, 4000);
  
    return () => clearTimeout(timeoutId);
  }, [DOMAIN]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/produit/echanges/${value}`);
        setGetCommande(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN,value]);

  return (
    <>
        <div className="retourForm">
          <div className="product-container">
            <div className="product-container-top">
              <div className="product-left">
                <h2 className="product-h2">Ajouter un échange</h2>
                <span>Créer un nouveau échange</span>
              </div>
            </div>
            <div className="product-wrapper">
              <div className="product-container-bottom">
                <div className="form-controle">
                  <label htmlFor="">Sélectionnez une commande <span style={{color:'red'}}>*</span></label>
                  <Select
                    name="id_commande"
                    options={commande?.map(item => ({ value: item.id_commande, label: item.nom + " Commande N° "+item.id_commande }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'id_commande', value: selectedOption.value } })}
                  />
                </div>
              </div>
            </div>
          </div>
          {
            getCommande.length !== 0 && <>
          <div className="rowChart-row-table">
            <Table columns={columns} dataSource={getCommande} scroll={scroll} pagination={{ pageSize: 10}} />
          </div>
          <div className="form-submit">
          { selected.map((dd)=>(
            <button className="btn-submit" style={{padding:'10px 15px', background:'rgba(1, 35, 138, 0.952)', color:'#fff', border:'none'}} onClick={()=>navigate(`/echange/${value}?id_detail=${dd.id_detail_commande}`)}>Echange</button>
          ))}
          </div>
          </>
          }
        </div>
    </>
  )
}

export default EchangeForm