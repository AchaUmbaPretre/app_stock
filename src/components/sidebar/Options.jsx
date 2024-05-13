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

const Options = () => {
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState('');
  const [options, setOptions] = useState([]);
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
      {options.map((dd)=>(
        <Item key="/" icon={<HomeOutlined style={{ fontSize: '22px', color: '#fafafa' }} />}  onClick={handleLinkClick}>
            <Link to="/" className="sidebarH3" style={{fontSize: "14px", color: '#fafafa'}}>
                {dd.nom_options}
            </Link>
        </Item>
      ))}
      
      <Item key="logout" icon={<LogoutOutlined style={{ fontSize: '19px', color: '#fafafa'}}/>} onClick={Logout}>
        <Link className="sidebarH3" style={{ color: '#fafafa'}}>
          Déconnexion
        </Link>
      </Item>
    </Menu>
  );
};

export default Options;