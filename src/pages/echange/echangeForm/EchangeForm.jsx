import React from 'react'
import { useState } from 'react';
import Select from 'react-select';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Space, Table, Tag } from 'antd';
import config from '../../../config';

const EchangeForm = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState({})
  const scroll = { x: 450 };
  const [commande, setCommande] = useState([]);
  const [getCommande, setGetCommande] = useState([]);
  const [loading, setLoading] = useState([]);
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
          <Tag color="green">{text}</Tag>
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
      title: 'Couleur',
      dataIndex: 'description',
      key: 'description',
      render: (description) => (
        <Space>
          <Tag color="green">{description}</Tag>
        </Space>
      ),
    },
    {
      title: 'Qté',
      dataIndex: 'quantite',
      key: 'quantite',
      render: (text) => (
        <Space>
          <Tag color="green">{text}</Tag>
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
        const { data } = await axios.get(`${DOMAIN}/api/commande`);
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
            <button className="btn-submit" onClick={()=>navigate(`/echange/${value}?id_detail=${dd.id_detail_commande}`)}>Echange</button>
          ))}
          </div>
          </>
          }
        </div>
    </>
  )
}

export default EchangeForm