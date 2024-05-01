import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  UsergroupAddOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  LogoutOutlined,
  DollarCircleOutlined,
  AppstoreOutlined,
  CreditCardOutlined,
  CarOutlined,
  SwapOutlined
} from '@ant-design/icons';
import { FireTruckOutlined, HomeOutlined } from '@mui/icons-material';
import './sidebar.css'
import axios from 'axios';
import config from '../../config';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../redux/userRedux';

const { SubMenu, Item } = Menu;

const Sidebar = () => {
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState('');
  const [optons, setOptions] = useState([]);
  const user = useSelector((state) => state.user?.currentUser);
  const isSidebarOpen = useSelector((state) => state.user?.isSidebarOpen);

  const Logout = async () => {
    try {
      await axios.post(`${DOMAIN}/api/auth/logout`);
      setCurrentUser(null);
      localStorage.setItem('persist:root', JSON.stringify(currentUser));
      Swal.fire('Déconnexion réussie !', '', 'success');
      navigate('/login')
      window.location.reload();
    } catch (error) {
      Swal.fire('Erreur lors de la déconnexion.', '', 'error');
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/vente/options/side`);
        setOptions(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN]);

  const handleLinkClick = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Menu mode="vertical" theme="dark" ref={sidebarRef}  className={`sidebar ${isSidebarOpen ? 'visible' : ''}`}>
      <div className="sidebarWrapper">
        
      </div>
      <Item key="/" icon={<HomeOutlined style={{ fontSize: '22px', color: '#fafafa' }} />}  onClick={handleLinkClick}>
        <Link to="/" className="sidebarH3" style={{fontSize: "14px", color: '#fafafa'}}>
          Accueil
        </Link>
      </Item>
      <SubMenu key="products" title={<span className="sidebarH3">Produits</span>} icon={<AppstoreOutlined  style={{ fontSize: '19px', color: '#fafafa' }} />}>
        <Item key="allProducts"  onClick={handleLinkClick}>
          <Link to="/products" className="sidebarLink">
            Liste des produits
          </Link>
        </Item>
        <Item key="productForm"  onClick={handleLinkClick}>
          <Link to="/productForm" className="sidebarLink">
            Créer un nouveau produit
          </Link>
        </Item>
        <Item key="varianteProduit"  onClick={handleLinkClick}>
          <Link to="/varianteProduit" className="sidebarLink">
            Catalogue
          </Link>
        </Item>
        <Item key="categories"  onClick={handleLinkClick}>
          <Link to="/categories" className="sidebarLink">
            Categories
          </Link>
        </Item>
        <Item key="emplacement"  onClick={handleLinkClick}>
          <Link to="/emplacement" className="sidebarLink">
            Emplacements
          </Link>
        </Item>
        <Item key="matiere" onClick={handleLinkClick}>
          <Link to="/matiere" className="sidebarLink">
            Matières
          </Link>
        </Item>
        <Item key="marques" onClick={handleLinkClick}>
          <Link to="/marque" className="sidebarLink">
            Marques
          </Link>
        </Item>
        <Item key="couleur" onClick={handleLinkClick}>
          <Link to="/couleur" className="sidebarLink">
            Couleur
          </Link>
        </Item>
        <Item key="typeMouvement" onClick={handleLinkClick}>
          <Link to="/typeMouvement" className="sidebarLink">
            Type des mouvements
          </Link>
        </Item>
      </SubMenu>
      <SubMenu key="reception" title={<span className="sidebarH3">Réceptions</span>} icon={<FireTruckOutlined style={{ fontSize: '19px', color: '#fafafa' }} />}>
        <Item key="entreeStock" onClick={handleLinkClick}>
          <Link to="/entreeStock" className="sidebarLink">
            Entrée de stock
          </Link>
        </Item>
        <Item key="reception" onClick={handleLinkClick}>
          <Link to="/reception" className="sidebarLink">
            Liste des Réceptions
          </Link>
        </Item>
      </SubMenu>
      <SubMenu key="commande" title={<span className="sidebarH3">Commandes</span>} icon={<ShoppingCartOutlined  style={{ fontSize: '19px', color: '#fafafa' }} />}>
        <Item key="commandeForm" onClick={handleLinkClick}>
          <Link to="/commandeForm" className="sidebarLink">
            Nouvelle commande
          </Link>
        </Item>
        <Item key="listeCommande" onClick={handleLinkClick}>
          <Link to="/listeCommande" className="sidebarLink">
            Liste des commandes
          </Link>
        </Item>
      </SubMenu>
      <SubMenu key="ventes" title={<span className="sidebarH3">Ventes</span>} icon={<DollarCircleOutlined  style={{ fontSize: '19px', color: '#fafafa' }} />}>
        <Item key="ventes" onClick={handleLinkClick}>
          <Link to="/ventes" className="sidebarLink">
            Liste des ventes
          </Link>
        </Item>
        <Item key="mouvement" onClick={handleLinkClick}>
          <Link to="/mouvement" className="sidebarLink">
            Mouvements
          </Link>
        </Item>
        <Item key="dette" onClick={handleLinkClick}>
          <Link to="/dette" className="sidebarLink">
            Vente à crédit
          </Link>
        </Item>
        <Item key="paiement" onClick={handleLinkClick}>
          <Link to="/paiement" className="sidebarLink">
            Paiement
          </Link>
        </Item>
      </SubMenu>
      <SubMenu key="Livraison" title={<span className="sidebarH3">Livraisons</span>} icon={<CarOutlined style={{ fontSize: '19px', color: '#fafafa'}}/>}>
{/*         <Item key="livraison">
          <Link to="/livraison" className="sidebarLink">
            Livraison
          </Link>
        </Item> */}
        <Item key="livraison_detail" onClick={handleLinkClick}>
          <Link to="/livraison_detail" className="sidebarLink">
            Détail livraison
          </Link>
        </Item>
      </SubMenu>
      { user?.role === 'admin' && 
      <Item key="/echangeForm" icon={<SwapOutlined style={{ fontSize: '22px', color: '#fafafa' }} />}  onClick={handleLinkClick}>
        <Link to="/echangeForm" className="sidebarH3" style={{fontSize: "14px", color: '#fafafa'}}>
          Echanges
        </Link>
      </Item>  }
      <SubMenu key="clients" title={<span className="sidebarH3">Membres</span>} icon={<UsergroupAddOutlined style={{ fontSize: '19px', color: '#fafafa'}}/>}>
        <Item key="clients" onClick={handleLinkClick}>
          <Link to="/clients" className="sidebarLink">
            Clients
          </Link>
        </Item>
        <Item key="livreur" onClick={handleLinkClick}>
          <Link to="/livreur" className="sidebarLink">
            Livreurs
          </Link>
        </Item>
        { user?.role === 'admin' && 
        <Item key="utilisateurs" onClick={handleLinkClick}>
          <Link to="/utilisateurs" className="sidebarLink">
            Utilisateurs
          </Link>
        </Item> }
        { user?.role === 'admin' && 
        <Item key="permission" onClick={handleLinkClick}>
          <Link to="/permission" className="sidebarLink">
            Permissions
          </Link>
        </Item> }
        
      </SubMenu>
      <SubMenu key="depenses" title={<span className="sidebarH3">Dépenses</span>} icon={<CreditCardOutlined style={{ fontSize: '19px', color: '#fafafa'}}/>}>
        <Item key="depenses" onClick={handleLinkClick}>
          <Link to="/depenses" className="sidebarLink">
            Dépenses
          </Link>
        </Item>
        <Item key="catDepenses" onClick={handleLinkClick}>
          <Link to="/catDepenses" className="sidebarLink">
            Categorie de dépenses
          </Link>
        </Item>
      </SubMenu>
      { user?.role === 'admin' &&
      <SubMenu key="reports" title={<span className="sidebarH3">Rapports</span>} icon={<FileTextOutlined style={{ fontSize: '19px', color: '#fafafa' }}/>}>
        <Item key="rapportVente"  onClick={handleLinkClick}>
          <Link to="/rapportVente" className="sidebarLink">
            Ventes
          </Link>
        </Item>
        <Item key="rapportVenteMarque" onClick={handleLinkClick}>
          <Link to="/rapportVenteMarque" className="sidebarLink">
            Marques
          </Link>
        </Item>
        <Item key="rapportClient"  onClick={handleLinkClick}>
          <Link to="/rapportClient" className="sidebarLink">
            Clients
          </Link>
        </Item>
          <Item key="rapportRevenu" onClick={handleLinkClick}>
          <Link to="/rapportRevenu" className="sidebarLink">
            Revenus
          </Link>
        </Item>
        <Item key="listeVariante" onClick={handleLinkClick}>
          <Link to="/listeVariante" className="sidebarLink">
            Stock
          </Link>
        </Item>
        <Item key="rapportdAchats" onClick={handleLinkClick}>
          <Link to="/rapportDachats" className="sidebarLink">
            Achats
          </Link>
        </Item>
      </SubMenu>
      }
      <Item key="logout" icon={<LogoutOutlined style={{ fontSize: '19px', color: '#fafafa'}}/>} onClick={Logout}>
        <Link className="sidebarH3" style={{ color: '#fafafa'}}>
          Déconnexion
        </Link>
      </Item>
    </Menu>
  );
};

export default Sidebar;