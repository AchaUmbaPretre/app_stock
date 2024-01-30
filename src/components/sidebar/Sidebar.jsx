import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  UsergroupAddOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  LogoutOutlined,
  DollarCircleOutlined,
  AppstoreOutlined 
} from '@ant-design/icons';
import { HomeOutlined} from '@mui/icons-material';
import './sidebar.css'
import axios from 'axios';
import config from '../../config';
import { useState } from 'react';
import Swal from 'sweetalert2';

const { SubMenu, Item } = Menu;

const Sidebar = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const navigate = useNavigate();
  const [errorMessage,setErrorMessage] = useState('')
  const [currentUser, setCurrentUser] = useState('')

  const Logout = async () => {
    try {
      await axios.post(`${DOMAIN}/api/auth/logout`);
      setCurrentUser(null);
      localStorage.setItem('persist:root', JSON.stringify(currentUser));
      Swal.fire('Déconnexion réussie !', '', 'success');
      navigate('/login')
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.response.data);
      Swal.fire('Erreur lors de la déconnexion.', '', 'error');
    }
  };

  return (
    <Menu mode="vertical" theme="dark" className="sidebar">
      <div className="sidebarWrapper">
        
      </div>
      <Item key="/" icon={<HomeOutlined style={{ fontSize: '22px', color: '#fafafa' }} />}>
        <Link to="/" className="sidebarH3" style={{fontSize: "14px", color: '#fafafa'}}>
          Accueil
        </Link>
      </Item>
      <SubMenu key="products" title={<span className="sidebarH3">Produits</span>} icon={<AppstoreOutlined  style={{ fontSize: '19px', color: '#fafafa' }} />}>
        <Item key="allProducts">
          <Link to="/products" className="sidebarLink">
            Produits
          </Link>
        </Item>
        <Item key="productForm">
          <Link to="/productForm" className="sidebarLink">
            Créer un nouveau produit
          </Link>
        </Item>
        <Item key="varianteProduit">
          <Link to="/varianteProduit" className="sidebarLink">
            Editer taille produit
          </Link>
        </Item>
        <Item key="categories">
          <Link to="/categories" className="sidebarLink">
            Categories
          </Link>
        </Item>
        <Item key="emplacement">
          <Link to="/emplacement" className="sidebarLink">
            Emplacements
          </Link>
        </Item>
        <Item key="matiere">
          <Link to="/matiere" className="sidebarLink">
            Matières
          </Link>
        </Item>
        <Item key="marques">
          <Link to="/marque" className="sidebarLink">
            Marques
          </Link>
        </Item>
        <Item key="couleur">
          <Link to="/couleur" className="sidebarLink">
            Couleur
          </Link>
        </Item>
        <Item key="typeMouvement">
          <Link to="/typeMouvement" className="sidebarLink">
            Type des mouvements
          </Link>
        </Item>
      </SubMenu>
      <SubMenu key="commande" title={<span className="sidebarH3">Commande</span>} icon={<ShoppingCartOutlined  style={{ fontSize: '19px', color: '#fafafa' }} />}>
        <Item key="commandeForm">
          <Link to="/commandeForm" className="sidebarLink">
            Créer une commande
          </Link>
        </Item>
        <Item key="listeCommande">
          <Link to="/listeCommande" className="sidebarLink">
            Liste des commandes
          </Link>
        </Item>
{/*         <Item key="listeDetailCommande">
          <Link to="/listeDetailCommande" className="sidebarLink">
          Liste des détails des commandes
          </Link>
        </Item> */}
{/*         <Item key="retour">
          <Link to="/retour" className="sidebarLink">
            Retour
          </Link>
        </Item>
        <Item key="echange">
          <Link to="/echange" className="sidebarLink">
            Echange
          </Link>
        </Item> */}
      </SubMenu>
      <SubMenu key="ventes" title={<span className="sidebarH3">Ventes</span>} icon={<DollarCircleOutlined  style={{ fontSize: '19px', color: '#fafafa' }} />}>
        <Item key="ventes">
          <Link to="/ventes" className="sidebarLink">
            Ventes
          </Link>
        </Item>
        <Item key="mouvement">
          <Link to="/mouvement" className="sidebarLink">
            Mouvement
          </Link>
        </Item>
        {/* <Item key="retour">
          <Link to="/retour" className="sidebarLink">
            Retour
          </Link>
        </Item>
        <Item key="echange">
          <Link to="/echange" className="sidebarLink">
            Echange
          </Link>
        </Item> */}
      </SubMenu>
      <SubMenu key="Livraison" title={<span className="sidebarH3">Livraison</span>} icon={<ShoppingCartOutlined style={{ fontSize: '19px', color: '#fafafa'}}/>}>
        <Item key="livraison">
          <Link to="/livraison" className="sidebarLink">
            Livraison
          </Link>
        </Item>
        <Item key="livraison_detail">
          <Link to="/livraison_detail" className="sidebarLink">
            Détail livraison
          </Link>
        </Item>
      </SubMenu>
      <SubMenu key="clients" title={<span className="sidebarH3">Membres</span>} icon={<UsergroupAddOutlined style={{ fontSize: '19px', color: '#fafafa'}}/>}>
        <Item key="clients">
          <Link to="/clients" className="sidebarLink">
            Clients
          </Link>
        </Item>
        <Item key="livreur">
          <Link to="/livreur" className="sidebarLink">
            Livreurs
          </Link>
        </Item>
        <Item key="utilisateurs">
          <Link to="/utilisateurs" className="sidebarLink">
            Utilisateurs
          </Link>
        </Item>
      </SubMenu>

      <SubMenu key="reports" title={<span className="sidebarH3">Rapports</span>} icon={<FileTextOutlined style={{ fontSize: '19px', color: '#fafafa' }}/>}>
        <Item key="rapportVente">
          <Link to="/rapportVente" className="sidebarLink">
            Rapport d'inventaire
          </Link>
        </Item>
        <Item key="rapportdAchats">
          <Link to="/rapportDachats" className="sidebarLink">
            Rapport d'achats
          </Link>
        </Item>
      </SubMenu>
      <Item key="logout" icon={<LogoutOutlined style={{ fontSize: '19px', color: '#fafafa'}}/>} onClick={Logout}>
        <Link className="sidebarH3" style={{ color: '#fafafa'}}>
          Déconnexion
        </Link>
      </Item>
    </Menu>
  );
};

export default Sidebar;