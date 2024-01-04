import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  UsergroupAddOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { AttachMoney, HomeOutlined} from '@mui/icons-material';
import './sidebar.css'

const { SubMenu, Item } = Menu;

const Sidebar = () => {
  return (
    <Menu mode="vertical" theme="dark" className="sidebar">
      <div className="sidebarWrapper">
        
      </div>
      <Item key="/" icon={<HomeOutlined style={{ fontSize: '22px', color: '#fafafa' }} />}>
        <Link to="/" className="sidebarH3" style={{fontSize: "14px", color: '#fafafa'}}>
          Accueil
        </Link>
      </Item>
      <SubMenu key="products" title={<span className="sidebarH3">Produits</span>} icon={<ShoppingCartOutlined style={{ fontSize: '19px', color: '#fafafa' }} />}>
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
            variante produit
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
        <Item key="typeMouvement">
          <Link to="/typeMouvement" className="sidebarLink">
            Type des mouvements
          </Link>
        </Item>
      </SubMenu>
      <SubMenu key="commande" title={<span className="sidebarH3">Commande</span>} icon={<ShoppingCartOutlined  style={{ fontSize: '19px', color: '#fafafa' }} />}>
        <Item key="commande">
          <Link to="/commande" className="sidebarLink">
            Commande
          </Link>
        </Item>
        <Item key="commandeForm">
          <Link to="/commandeForm" className="sidebarLink">
            Ajouter une commande
          </Link>
        </Item>
        <Item key="listeCommande">
          <Link to="/listeCommande" className="sidebarLink">
            Liste des commandes
          </Link>
        </Item>
        <Item key="retour">
          <Link to="/retour" className="sidebarLink">
            Retour
          </Link>
        </Item>
        <Item key="echange">
          <Link to="/echange" className="sidebarLink">
            Echange
          </Link>
        </Item>
      </SubMenu>
      <SubMenu key="mouvement" title={<span className="sidebarH3">Ventes</span>} icon={<ShoppingCartOutlined  style={{ fontSize: '19px', color: '#fafafa' }} />}>
        <Item key="mouvement">
          <Link to="/mouvement" className="sidebarLink">
            Mouvement
          </Link>
        </Item>
        <Item key="ventes">
          <Link to="/ventes" className="sidebarLink">
            Ventes
          </Link>
        </Item>
        <Item key="retour">
          <Link to="/retour" className="sidebarLink">
            Retour
          </Link>
        </Item>
        <Item key="echange">
          <Link to="/echange" className="sidebarLink">
            Echange
          </Link>
        </Item>
      </SubMenu>
      <SubMenu key="clients" title={<span className="sidebarH3">Peuples</span>} icon={<UsergroupAddOutlined style={{ fontSize: '19px', color: '#fafafa'}}/>}>
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
{/* 
      <SubMenu key="settings" title={<span className="sidebarH3">Paramètres</span>} icon={<SettingOutlined style={{ fontSize: '20px', color: 'rgb(1, 35, 138)' }}/>}>
        <Item key="generalSettings">
          <Link to="/parametresGeneraux" className="sidebarLink">
            Paramètres généraux
          </Link>
        </Item>
        <Item key="userSettings">
          <Link to="/parametresUtilisateur" className="sidebarLink">
            Paramètres utilisateur
          </Link>
        </Item>
      </SubMenu> */}

      <Item key="logout" icon={<LogoutOutlined style={{ fontSize: '19px', color: '#fafafa'}}/>}>
        <Link to="/logout" className="sidebarH3" style={{ color: '#fafafa'}}>
          Déconnexion
        </Link>
      </Item>
    </Menu>
  );
};

export default Sidebar;