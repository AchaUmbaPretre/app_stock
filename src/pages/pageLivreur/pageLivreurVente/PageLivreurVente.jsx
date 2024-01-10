import React, { useEffect, useState } from 'react'
import { Button, Input, Space, Table, Popover,Popconfirm, Tag, Modal,Checkbox} from 'antd';
import axios from 'axios';
import './pageLivreurVente.scss'
import config from '../../../config';
import { useNavigate } from 'react-router-dom';

const PageLivreurVente = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [selected, setSelected] = useState([]);
    const scroll = { x: 400 };
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [getType, setGetType] = useState([]);
    const [data, setData] = useState([]);

    const handleSelectionChange = (event, id) => {
        if (event.target.checked) {
          setSelected([...selected, { id}]);
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
                checked={selected.some((item) => item.id === record.id_varianteProduit)}
                onChange={(event) =>
                  handleSelectionChange(event, record.id_varianteProduit)
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

  return (
    <>
        <div className="pageLivreurVente">
            <div className="pageLivreurVente-container">
                <div className="rowChart-row-table">
                    <Table columns={columns} dataSource={data} loading={loading} scroll={scroll} pagination={{ pageSize: 8}} />
                </div>
                <div className="pageLivreur-form-rows">
                    <div className="pageLivreur-form-row">
                        <label htmlFor="">Type de livraison</label>
                        <select name="" id="" className='page-select'>
                            <option value=""selected>Sélectionnez un type</option>
                            {getType.map((dd)=>(
                                <option value={dd.id_type_mouvement}>{dd.type_mouvement}</option>
                            ))}
                        </select>
                    </div>
                    <button className='pageLivreur-btn'>Livrer maintenant</button>
                </div>
            </div>
        </div>

    </>
  )
}

export default PageLivreurVente