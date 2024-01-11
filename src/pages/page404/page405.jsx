import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Page405 = () => {
  const navigate = useNavigate();

  return (
    <Result
    status="403"
    title="403"
    subTitle="Attend l'autorisation de l'administrateur pour accéder dans votre compte!"
    extra={<Button type="primary" onClick={() => navigate('/login')} >Retour</Button>}
  />
  );
};

export default Page405;