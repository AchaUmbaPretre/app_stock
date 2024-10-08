import { SisternodeOutlined, CalendarOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popover, Popconfirm, Tag, Image, Modal, Input } from 'antd';
import axios from 'axios';
import config from '../../../config';
import { useSelector } from 'react-redux';
import moment from 'moment';
import VenteViewSelect from './VenteViewSelect';
import DetailPointure from '../detailPointureVente/DetailPointure';
import PageDetails from '../../PageDetails/PageDetails';

const VenteView = ({ id }) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const scroll = { x: 400 };
    const [getCommande, setGetCommande] = useState([]);
    const user = useSelector((state) => state.user?.currentUser);
    const [opens, setOpens] = useState(false);
    const [idVariant, setVariant] = useState({});
    const [pointure, setPointure] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [activeModal, setActiveModal] = useState('');

    const handleDelete = async (id) => {
        try {
            await axios.put(`${DOMAIN}/api/vente/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const showModal = (e, p) => {
      setActiveModal('pointure');
      setVariant(e);
      setPointure(p);
  };

    const showModalPhone = (e) => {
        setActiveModal('variant');
        setVariant(e);
    };


    const HandOpen = () => {
        setOpens(!opens);
    };

    const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (text, record, index) => index + 1, width: "3%" },
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
            title: 'Marque',
            dataIndex: 'nom_marque',
            key: 'nom_marque',
            render: (text, record) => (
                <div>
                    <Popover title={`Voir la fiche de ce produit`} trigger="hover">
                        <Tag color="blue" onClick={() => showModalPhone(record.id_varianteProduit)}>
                            {text}
                        </Tag>
                    </Popover>
                </div>
            ),
        },
        {
            title: 'Client',
            dataIndex: 'nom_client',
            key: 'nom_client',
            render: (text) => (
                <Tag color={'green'}>{text}</Tag>
            ),
        },
        {
            title: 'Livreur',
            dataIndex: 'username',
            key: 'username',
            render: (text) => (
                <Tag color={'blue'}>{text}</Tag>
            ),
        },
        {
            title: 'Pointure',
            dataIndex: 'pointure',
            key: 'pointure',
            sorter: (a, b) => a.pointure.length - b.pointure.length,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => (
                <div>
                    <Popover title={`Voir l'historique de pointure ${record.pointure}`} trigger="hover">
                        <Tag color="blue" onClick={() => showModal(record.id_varianteProduit, record.id_taille)}>
                            {text}
                        </Tag>
                    </Popover>
                </div>
            ),
        },
        {
            title: 'Prix unitaire',
            dataIndex: 'prix_unitaire',
            key: 'prix',
            sorter: (a, b) => a.prix_unitaire.length - b.prix_unitaire.length,
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
            title: 'Quantité',
            dataIndex: 'quantite',
            key: 'quantite',
            sorter: (a, b) => a.quantite - b.quantite,
            sortDirections: ['descend', 'ascend'],
            render: (quantite) => (
                <Tag color={quantite > 0 ? 'green' : 'red'}>{quantite}</Tag>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'date_vente',
            key: 'date',
            sorter: (a, b) => a.date_vente - b.date_vente,
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
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {user?.role === 'admin' &&
                        <Popover title="Supprimer" trigger="hover">
                            <Popconfirm
                                title="Êtes-vous sûr de vouloir supprimer?"
                                onConfirm={() => handleDelete(record.id_vente)}
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
                const { data } = await axios.get(`${DOMAIN}/api/vente/${id}`);
                setLoading(false);
                setData(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [DOMAIN, id]);

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
    }, [DOMAIN, id]);

    console.log(idVariant)

    return (
        <>
            <div className="products">
                <div className="product-container">
                    <div className="product-container-top">
                        <div className="product-left">
                            <h2 className="product-h2">Liste des ventes de la commande N° {id}</h2>
                            <span>de {getCommande?.nom} de la commune {getCommande?.nom_commune} Av/ {getCommande?.avenue} Q/ {getCommande?.quartier} N° {getCommande?.num}</span>
                        </div>
                        <div className="varianteProduit-right" style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ fontSize: '1rem', color: 'rgb(1, 35, 138)' }}>Contact de Mme {getCommande?.nom}</h2>
                            <span className="variant-name" style={{ fontSize: '.8rem', color: '#6d6c6c' }}>{getCommande?.telephone}</span>
                        </div>
                    </div>
                    <div className="product-bottom">
                        <div className="product-bottom-top">
                            <div className="product-bottom-left">
                                {opens ? <CloseOutlined className='product-icon2' onClick={HandOpen} /> : <SisternodeOutlined className='product-icon' onClick={HandOpen} />}
                                <Input.Search
                                    type="search"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    placeholder="Recherche..."
                                    className="product-search"
                                />
                            </div>
                            <div className="product-bottom-right">

                            </div>
                        </div>
                        {opens &&
                            <VenteViewSelect getProduits={setData} getId={id} />}
                        <div className="rowChart-row-table">
                            <Table columns={columns} dataSource={data} loading={loading} scroll={scroll} pagination={{ pageSize: 10 }} />
                        </div>

                        <Modal
                            title=""
                            centered
                            open={activeModal === 'variant'}
                            onCancel={() => setActiveModal('')}
                            width={1000}
                            footer={[]}
                        >
                            <PageDetails id={idVariant} />
                        </Modal>

                        <Modal
                            title=""
                            centered
                            open={activeModal === 'pointure'}
                            onCancel={() => setActiveModal('')}
                            width={1000}
                            footer={[]}
                        >
                            <DetailPointure idVariant={idVariant} idTaille={pointure} />
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VenteView;
