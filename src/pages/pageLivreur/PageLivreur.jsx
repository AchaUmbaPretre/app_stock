import React from 'react'
import './pageLivreur.scss'
import { BellOutlined, PoweroffOutlined, MailOutlined,ExclamationOutlined } from '@ant-design/icons'
import { Badge } from 'antd';
import logoIcon from './../../assets/logo doe.jpg'
import { useActionData, useNavigate } from 'react-router-dom';

const PageLivreur = () => {
    const navigate = useNavigate();
  return (
    <>
        <div className="pageLivreur">
            <div className="pageLivreur-container">
{/*                 <nav>
                    <div className="navbar-wrapper">
                        <div className="nav-logo">
                            <img src={logoIcon} alt="" className="nav-img" />
                        </div>
                        <div className="navbar-right">
                            <Badge count={5}>
                                <MailOutlined className='navbar-icon' />
                            </Badge>
                            <Badge count={3}>
                                <BellOutlined className='navbar-icon'/>
                            </Badge>
                            <PoweroffOutlined className='navbar-icon'/>
                            <span className="navbar_username">Elie</span>
                        </div>
                    </div>
                </nav> */}
                <div className="pageLivreur-wrapper">
                    <div className="pageLivreur-message" onClick={()=>navigate('/pageLivreurVente')}>
                        Il ya une livraison, cliquez ici pour voir les details
                        <ExclamationOutlined />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default PageLivreur