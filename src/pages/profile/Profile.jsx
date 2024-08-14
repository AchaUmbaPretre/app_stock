import React from 'react'
import { UserOutlined,MenuOutlined } from '@ant-design/icons';
import './profile.scss'
import { Avatar } from 'antd';

const Profile = () => {
  return (
    <>
        <div className="profile">
            <div className="profile-wrapper">
                <div className="profile-left">
                    <ul>
                        <li>Compte</li>
                    </ul>
                </div>
                <div className="profile-right">
                    <div className="profile-title">
                        <h2 className="profile-h2">COMPTE</h2>
                    </div>
                    <div className="profile-img-rows">
                        <h4 className="profile-h4">Avatar</h4>
                        <div className="profile-info-rows">
                            <Avatar icon={<UserOutlined className='icon_ant'/>} className='icon_ant'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile