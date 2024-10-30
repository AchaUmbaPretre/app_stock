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
  SwapOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { FireTruckOutlined, HomeOutlined } from '@mui/icons-material';
import './sidebar.css'
import axios from 'axios';
import config from '../../config';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../redux/userRedux';

const { SubMenu, Item } = Menu;

const Options = ({data}) => {
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState('');
  const [options, setOptions] = useState([]);
  const userId = useSelector((state) => state.user?.currentUser.id);
  const isSidebarOpen = useSelector((state) => state.user?.isSidebarOpen);

  const Logout = async () => {
    try {
      await axios.post(`${DOMAIN}/api/auth/logout`);
      setCurrentUser(null);
      localStorage.setItem('persist:root', JSON.stringify(currentUser));
      Swal.fire('Déconnexion réussie !', '', 'success');
      navigate('/login');
      window.location.reload();
    } catch (error) {
      Swal.fire('Erreur lors de la déconnexion.', '', 'error');
    }
  };

  const getMenuIcon = (icon) => {
    switch (icon) {
      case 'FireTruckOutlined':
        return <FireTruckOutlined className="sidebarLink" style={{ fontSize: '30px', color: '#fafafa' }} />;
      case 'ShoppingCartOutlined':
        return <ShoppingCartOutlined className="sidebarLink" style={{ fontSize: '19px', color: '#fafafa' }} />;
      case 'CarOutlined':
        return <CarOutlined className="sidebarLink" style={{ fontSize: '19px', color: '#fafafa' }} />;
      case 'FileTextOutlined':
        return <FileTextOutlined className="sidebarLink" style={{ fontSize: '19px', color: '#fafafa' }} />;
      case 'UsergroupAddOutlined':
        return <UsergroupAddOutlined className="sidebarLink" style={{ fontSize: '19px', color: '#fafafa' }} />;
      case 'DollarCircleOutlined':
        return <DollarCircleOutlined className="sidebarLink" style={{ fontSize: '19px', color: '#fafafa' }} />;
      case 'AppstoreOutlined':
        return <AppstoreOutlined className="sidebarLink" style={{ fontSize: '19px', color: '#fafafa' }} />;
      case 'HomeOutlined':
        return <HomeOutlined className="sidebarLink" style={{ fontSize: '19px', color: '#fafafa' }}/>;
      case 'SwapOutlined':
        return <SwapOutlined className="sidebarLink" style={{ fontSize: '19px', color: '#fafafa' }}/>;
      case 'CreditCardOutlined':
        return <CreditCardOutlined className="sidebarLink" style={{ fontSize: '19px', color: '#fafafa' }}/>;
      case 'SettingOutlined':
          return <SettingOutlined className="sidebarLink" style={{ fontSize: '19px', color: '#fafafa' }}/>;
      default:
        return null;
    }
  };

  const handleLinkClick = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Menu mode="vertical" theme="dark" ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'visible' : ''}`}>
      <div className="sidebarWrapper">
      </div>
      <Item key="/" icon={<HomeOutlined style={{ fontSize: '22px', color: '#fafafa' }} />} onClick={handleLinkClick}>
        <Link to="/" className="sidebarH3" style={{ fontSize: "14px", color: '#fafafa' }}>
          Accueil
        </Link>
      </Item>
      {data.map(menuItem => (
        <SubMenu
          key={menuItem.menu_id}
          icon={getMenuIcon(menuItem.menu_icon)}
          title={<span className="sidebarH3">{menuItem.menu_title}</span>}
        >
          {menuItem.subMenus && menuItem.subMenus.map(subMenu => (
            <Item key={subMenu.submenu_id}>
              <Link to={subMenu.submenu_url} className="sidebarLink" onClick={handleLinkClick}>
                {subMenu.submenu_title}
              </Link>
            </Item>
          ))}
        </SubMenu>
      ))}
      <Item key="logout" icon={<LogoutOutlined style={{ fontSize: '19px', color: '#fafafa' }} />} onClick={Logout}>
        <Link className="sidebarH3" style={{ color: '#fafafa' }}>
          Déconnexion
        </Link>
      </Item>
    </Menu>
  );
};

export default Options;
