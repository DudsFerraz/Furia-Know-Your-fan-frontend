import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function TwitterCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const success = params.get("success");
    if (success === "true") {
      alert("Twitter conectado com sucesso!");
    } else {
      alert("Erro ao conectar Twitter: " + params.get("error"));
    }

    navigate("/"); // redireciona para home ou dashboard
  }, [navigate,params]);

  return <div>Conectando Twitter...</div>;
}
