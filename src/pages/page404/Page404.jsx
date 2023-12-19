import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Désolé, la page que vous avez visitée n'existe pas."
      extra={<Button type="primary" onClick={() => navigate('/')}>Retour à l'accueil</Button>}
    />
  );
};

export default Page404;