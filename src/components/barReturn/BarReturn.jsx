import './barReturn.scss'
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const BarReturn = () => {
  return (
    <>
        <div className="barReturn">
            <Breadcrumb
                items={[
                {
                    href: '/',
                    title: (
                    <>
                    <HomeOutlined />
                    <span>Accueil</span>
                    </>
                    ),
                },
                ]}
            />
        </div>
    </>
  )
}

export default BarReturn