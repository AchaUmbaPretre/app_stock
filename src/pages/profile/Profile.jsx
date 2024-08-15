import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import './profile.scss';
import { Avatar, Modal } from 'antd'; // Importez le composant Modal
import inconAth from '../../assets/homme-tient-document-concept-contrat-removebg-preview.png';
import config from '../../config';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false); // État pour contrôler la visibilité du modal
    const navigate = useNavigate();
    const { username, email, password } = data;
    const userId = useSelector((state) => state.user?.currentUser.id);
    const user = useSelector((state) => state.user.currentUser.username);

    const handleInputChange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        let updatedValue = fieldValue;

        if (fieldName === "contact_email") {
            updatedValue = fieldValue.toLowerCase();
        } else if (Number.isNaN(Number(fieldValue))) {
            updatedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
        }

        setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${DOMAIN}/api/user/getUserOne/${userId}`);
                setData(data[0]);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [userId]);

    const showConfirm = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        setIsModalVisible(false);
        try {
            await axios.put(`${DOMAIN}/api/user/getUser/${userId}`, data);
            Modal.success({
                title: 'Succès',
                content: 'Utilisateur a été modifié avec succès!',
            });
            navigate('/utilisateurs');
            window.location.reload();
        } catch (err) {
            Modal.error({
                title: 'Erreur',
                content: err.message,
            });
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <div className="profile">
                <div className="profile-wrapper">
                    <div className="profile-left">
                        <h2 className="profile2">Mettre à Jour Vos Informations</h2>
                        <img src={inconAth} alt="" className="profile-img" />
                    </div>
                    <div className="profile-right">
                        <div className="profile-title">
                            <h2 className="profile-h2">COMPTE</h2>
                        </div>
                        <div className="profile-img-rows">
                            <h4 className="profile-h4">{user}</h4>
                            <div className="profile-info-rows">
                                <Avatar icon={<UserOutlined className='icon_ant' />} className='icon_ant' />
                            </div>
                        </div>
                        <div className="profile-bottom">
                            <div className="product-container-bottom">
                                <div className="form-controle">
                                    <label htmlFor="">Nom <span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" value={username} className="form-input" name='username' onChange={handleInputChange} required />
                                </div>
                                <div className="form-controle">
                                    <label htmlFor="">Email <span style={{ color: 'red' }}>*</span></label>
                                    <input type="email" value={email} className="form-input" name='email' onChange={handleInputChange} required />
                                </div>
                                <div className="form-controle">
                                    <label htmlFor="">Mot de passe <span style={{ color: 'red' }}>*</span></label>
                                    <input type="password" value={password} className="form-input" name='password' onChange={handleInputChange} required />
                                </div>
                                <div className="form-submit">
                                    <button className="btn-submit" onClick={showConfirm}>Modifier</button>
                                    <button className="btn-submit btn-annuler" onClick={() => window.location.reload()}>Annuler</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                title="Confirmation"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Confirmer"
                cancelText="Annuler"
            >
                <p>Êtes-vous sûr de vouloir modifier ces informations ?</p>
            </Modal>
        </>
    );
}

export default Profile;
