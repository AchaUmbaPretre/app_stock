import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, InputNumber, Button, Image, Typography, Spin, notification } from 'antd';
import { LoadingOutlined, CheckOutlined } from '@ant-design/icons';
import config from '../../../config';

const { Title, Text } = Typography;

const VarianteEdit = ({ id }) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [stock, setStock] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${DOMAIN}/api/produit/varianteDetail/${id}`);
                setData(data[0]);
                setStock(data[0].stock);
                setLoading(false);
            } catch (error) {
                notification.error({
                    message: "Erreur de Chargement",
                    description: "Impossible de charger les données du produit.",
                });
                setLoading(false);
            }
        };
        fetchData();
    }, [id, DOMAIN]);

    const handleStockChange = (value) => {
        setStock(value);
    };

    const handleSaveStock = async () => {
        try {
            await axios.put(`${DOMAIN}/api/produit/varianteDetail/${id}`, { stock });
            notification.success({
                message: "Stock mis à jour",
                description: "La valeur du stock a été mise à jour avec succès.",
                icon: <CheckOutlined style={{ color: "#52c41a" }} />,
            });
        } catch (error) {
            notification.error({
                message: "Erreur de Mise à Jour",
                description: "Impossible de mettre à jour le stock.",
            });
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            </div>
        );
    }

    return (
        <Card
            title={<Title level={3}>{data.nom_produit}</Title>}
            bordered={false}
            style={{ maxWidth: 500, margin: '0 auto', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
        >
            <Image
                src={`${DOMAIN}${data.img}`}
                alt={data.nom_produit}
                style={{ borderRadius: 8 }}
                width={200}
                height={200}
                preview={false}
            />
            <div style={{ padding: '20px 0' }}>
                <Text strong>Marque :</Text> <Text>{data.nom_marque}</Text>
                <br />
                <Text strong>Pointure :</Text> <Text>{data.pointure}</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
                <Text strong>Stock :</Text>
                <InputNumber
                    min={0}
                    value={stock}
                    onChange={handleStockChange}
                    style={{ flex: 1 }}
                />
            </div>
            <Button
                type="primary"
                onClick={handleSaveStock}
                style={{ width: '100%', marginTop: '20px', borderRadius: 5 }}
            >
                Mettre à jour le Stock
            </Button>
        </Card>
    );
};

export default VarianteEdit;
