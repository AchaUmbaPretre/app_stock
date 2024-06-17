import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Checkbox, Modal } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../../../config';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { CircularProgress } from '@mui/material';
import { FadeLoader } from 'react-spinners';

const PageEchange = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [selected, setSelected] = useState([]);
    const [selecteds, setSelecteds] = useState([]);
    const scroll = { x: 400 };
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [getCommande, setGetCommande] = useState([]);
    const [idEchangeDetail, setIdEchangeDetail] = useState([]);
    const [idDetail, setIdDetail] = useState([]);
    const [idVariant, setIdVariant] = useState([]);
    const userId = useSelector((state) => state.user.currentUser.id);
    const { pathname } = useLocation();
    const IdCommande = pathname.split('/')[2];
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSelectionChange = (event, id, id_commande, id_detail_commande, id_detail_livraison, qte_livre, prix, id_taille, id_client) => {
        if (event.target.checked) {
            setSelected([...selected, { id, id_commande, id_detail_commande, id_detail_livraison, qte_livre, prix, id_taille, id_client }]);
        } else {
            setSelected(selected.filter((row) => row.id !== id));
        }
    };

    const handleSelectionChanges = (event, id_vente, id_commande, id_detail_commande, prix_unitaire, id_taille, id_client, id_varianteProduit) => {
        if (event.target.checked) {
            const updatedSelected = [...selecteds, { id_vente, id_commande, id_detail_commande, prix_unitaire, id_taille, id_client, id_varianteProduit }];
            setSelecteds(updatedSelected);
        } else {
            setSelecteds(selected.filter((row) => row.id_detail_commande !== id_detail_commande));
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
                            handleSelectionChange(event, record.id_varianteProduit, record.id_commande, record.id_detail_commande, record.id_detail_livraison, record.qte_livre, record.prix, record.id_taille, record.id_client)
                        }
                    />
                </div>
            ),
        },
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width: "3%" },
        {
            title: 'image',
            dataIndex: 'img',
            key: 'image',
            render: (text, record) => (
                <div className="userList" onClick={() => navigate(`/pageLivreurDetail/${record.id_varianteProduit}`)}>
                    <img src={`${DOMAIN}${record.img}`} alt="" className="userImg" />
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

    const columnsEchange = [
        {
            title: '',
            dataIndex: 'id_detail',
            key: 'selected',
            render: (text, record) => (
                <div>
                    <Checkbox
                        checked={selecteds.some((item) => item.id_detail_commande === record.id_detail_commande)}
                        onChange={(event) =>
                            handleSelectionChanges(event, record.id_vente, record.id_commande, record.id_detail_commande, record.prix_unitaire, record.id_taille, record.id_client, record.id_varianteProduit)
                        }
                    />
                </div>
            ),
        },
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width: "2%" },
        {
            title: 'image',
            dataIndex: 'img',
            key: 'image',
            width: '20px',
            render: (text, record) => (
                <div className="userList" onClick={() => navigate(`/pageLivreurDetail/${record.id_varianteProduit}`)}>
                    <img src={`${DOMAIN}${record.img}`} alt="" className="userImg" />
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${DOMAIN}/api/livraison/livraison-userOne/${userId}`, {
                    params: {
                        id_commande: IdCommande
                    }
                });

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${DOMAIN}/api/produit/echanges/${IdCommande}`);
                setGetCommande(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [DOMAIN, IdCommande]);

    useEffect(() => {
        setIdEchangeDetail(selecteds[0]?.id_detail_commande);
        setIdDetail(selected[0]?.id_detail_commande);
        setIdVariant(selected[0]?.id);
    }, [selecteds[0]?.id_detail_commande, selected[0]?.id_detail_commande, selected[0]?.id_varianteProduit]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        setIsModalVisible(false);
        setIsLoading(true);
        try {
            await axios.put(`${DOMAIN}/api/vente/echange/${idEchangeDetail}/${idDetail}/${idVariant}`);
            Swal.fire({
                title: 'Success',
                text: "L'échange a été fait avec succès !",
                icon: 'success',
                confirmButtonText: 'OK',
            });
            navigate('/pageLivreurVente');
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
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleClick = (e) => {
        e.preventDefault();
        showModal();
    };

    return (
        <>
            <div className="pageLivreurVente">
                {loading ? (
                    <div className="spinner-container">
                        <FadeLoader color={'#36D7B7'} loading={loading} />
                    </div>
                ) : (
                    <div className="pageLivreurVente-container">
                        <div className="page-rows-retour" onClick={() => navigate('/pageRetourCommande')}>
                            <div className="page-retour-row">
                                <CaretLeftOutlined />
                            </div>
                        </div>
                        <div className="rowChart-row-table">
                            <h1>Sélectionnez le produit à échanger</h1>
                            <Table columns={columnsEchange} dataSource={getCommande} loading={loading} scroll={scroll} pagination={{ pageSize: 8 }} />
                        </div>
                        <div className="rowChart-row-table">
                            <Table columns={columns} dataSource={data} loading={loading} scroll={scroll} pagination={{ pageSize: 8 }} />
                        </div>
                        <div className="pageLivreur-form-rows">
                            <button className='pageLivreur-btn' onClick={handleClick} disabled={isLoading}>Envoyer maintenant</button>
                            {isLoading && (
                                <div className="loader-container loader-container-center">
                                    <CircularProgress size={28} />
                                </div>
                            )}
                        </div>
                    </div>)}
            </div>
            <Modal title="Confirmation" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Êtes-vous sûr de vouloir échanger ces produits ?</p>
            </Modal>
        </>
    )
}

export default PageEchange;
