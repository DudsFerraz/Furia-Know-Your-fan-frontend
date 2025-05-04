import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

import userService from "../../services/userService"

const COUNTRIES = [
    "Abecásia",
    "Afeganistão",
    "África do Sul",
    "Albânia",
    "Alemanha",
    "Andorra",
    "Angola",
    "Antígua e Barbuda",
    "Arábia Saudita",
    "Argélia",
    "Argentina",
    "Armênia",
    "Austrália",
    "Áustria",
    "Azerbaijão",
    "Bahamas",
    "Bahrein",
    "Bangladesh",
    "Barbados",
    "Bélgica",
    "Belize",
    "Benim",
    "Bielorrússia",
    "Bolívia",
    "Bósnia e Herzegovina",
    "Botswana",
    "Brasil",
    "Brunei",
    "Bulgária",
    "Burkina Faso",
    "Burundi",
    "Butão",
    "Cabo Verde",
    "Camarões",
    "Camboja",
    "Canadá",
    "Catar",
    "Cazaquistão",
    "Chade",
    "Chile",
    "China",
    "Chipre",
    "Cingapura",
    "Colômbia",
    "Comores",
    "Congo",
    "Coreia do Norte",
    "Coreia do Sul",
    "Costa do Marfim",
    "Costa Rica",
    "Croácia",
    "Cuba",
    "Dinamarca",
    "Djibouti",
    "Dominica",
    "Egito",
    "El Salvador",
    "Emirados Árabes Unidos",
    "Equador",
    "Eritreia",
    "Escócia",
    "Eslováquia",
    "Eslovênia",
    "Espanha",
    "Estados Federados da Micronésia",
    "Estados Unidos da América",
    "Estônia",
    "Eswatini",
    "Etiópia",
    "Fiji",
    "Filipinas",
    "Finlândia",
    "França",
    "Gabão",
    "Gâmbia",
    "Gana",
    "Geórgia",
    "Granada",
    "Grécia",
    "Guatemala",
    "Guiana",
    "Guiné",
    "Guiné-Bissau",
    "Guiné Equatorial",
    "Haiti",
    "Holanda",
    "Honduras",
    "Hungria",
    "Iêmen",
    "Índia",
    "Indonésia",
    "Inglaterra",
    "Irã",
    "Iraque",
    "Irlanda do Norte",
    "Irlanda",
    "Islândia",
    "Israel",
    "Itália",
    "Jamaica",
    "Japão",
    "Jordânia",
    "Kiribati",
    "Kosovo",
    "Kuwait",
    "Laos",
    "Lesoto",
    "Letônia",
    "Líbano",
    "Libéria",
    "Líbia",
    "Liechtenstein",
    "Lituânia",
    "Luxemburgo",
    "Macedônia do Norte",
    "Madagascar",
    "Malásia",
    "Malawi",
    "Maldivas",
    "Mali",
    "Malta",
    "Marrocos",
    "Marshall",
    "Maurícia",
    "Mauritânia",
    "México",
    "Mianmar",
    "Micronésia",
    "Moçambique",
    "Moldávia",
    "Mônaco",
    "Mongólia",
    "Montenegro",
    "Namíbia",
    "Nauru",
    "Nepal",
    "Nicarágua",
    "Níger",
    "Nigéria",
    "Noruega",
    "Nova Zelândia",
    "Omã",
    "Ossétia do Sul",
    "País de Gales",
    "Países Baixos",
    "Palau",
    "Palestina",
    "Panamá",
    "Papua-Nova Guiné",
    "Paquistão",
    "Paraguai",
    "Peru",
    "Polônia",
    "Portugal",
    "Qatar",
    "Quênia",
    "Quirguistão",
    "Quiribati",
    "Reino Unido",
    "República Árabe Saaraui Democrática",
    "República Centro-Africana",
    "República Democrática do Congo",
    "República do Congo",
    "República Dominicana",
    "República Tcheca",
    "República Turca de Chipre do Norte",
    "Romênia",
    "Ruanda",
    "Rússia",
    "Salomão",
    "Samoa",
    "San Marino",
    "Santa Lúcia",
    "São Cristóvão e Névis",
    "São Tomé e Príncipe",
    "São Vicente e Granadinas",
    "Senegal",
    "Serra Leoa",
    "Sérvia",
    "Seychelles",
    "Singapura",
    "Síria",
    "Somália",
    "Sri Lanka",
    "Suazilândia",
    "Sudão do Sul",
    "Sudão",
    "Suécia",
    "Suíça",
    "Suriname",
    "Tailândia",
    "Taiwan",
    "Tajiquistão",
    "Tanzânia",
    "Tchéquia",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad e Tobago",
    "Tunísia",
    "Turcomenistão",
    "Turquia",
    "Tuvalu",
    "Ucrânia",
    "Uganda",
    "Uruguai",
    "Uzbequistão",
    "Vanuatu",
    "Vaticano",
    "Venezuela",
    "Vietnã",
    "Zâmbia",
    "Zimbábue"
  ];
const BRAZIL_STATES = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];
const ESPORTS_INTERESTS = [
    'CS2',
    'LOL',
    'RocketLeague',
    'RainbowSix',
    'Valorant',
    'KingsLeague',
    'ApexLegends',
    'PUBG',
    'Xadrez'
  ];

interface RegisterProps {
  setIsAuthenticated: (value: boolean) => void;
}

export default function Register({ setIsAuthenticated }: RegisterProps){

    const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
    const [formData, setFormData] = useState({
        name: '',
        nickname: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        cpf: '',
        country: 'Brasil',
        state: 'SP',
        city: '',
        zipCode: '',
        interests: [] as string[],
    });
    const [error, setError] = useState<{ message: string, type: 'login' | 'register' } | null>(null);

    const handleAuthSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        localStorage.removeItem("jwt");

        if (authMode === 'register') {
        if (formData.password !== formData.passwordConfirmation) {
            alert("As senhas não coincidem!");
            return;
        }
        
        if (formData.password.length < 5) {
            alert("A senha deve ter pelo menos 5 caracteres!");
            return;
        }
        }

      const authOperation = authMode === 'login' 
        ? userService.login({
            email: formData.email,
            password: formData.password
          })
        : userService.register({
            name: formData.name,
            nickname: formData.nickname,
            email: formData.email,
            password: formData.password,
            cpf: formData.cpf,
            pais: formData.country,
            estado: formData.state,
            cidade: formData.city,
            cep: formData.zipCode,
            interests: formData.interests,
          });

      authOperation
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("jwt", token);
          if(authMode === 'register'){
            alert("Usuário criado com sucesso!");
            setAuthMode("login");
          }else{
            setIsAuthenticated(true);      
          }
        })
        .catch((err: any) => {
          console.error(err);
          const message = err.response?.data?.message || 
                         err.message || 
                         "Erro na operação";
          setError({
            message: message,
            type: authMode
          });
        });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setError(prev => {
      if (!prev) return null;
      const isRelevantError = (
        (name === 'email' && prev.message.includes('Usuário')) ||
        (name === 'password' && prev.message.includes('Senha'))
      );
      return isRelevantError ? null : prev;
    });

    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'country' && { state: '', city: '', zipCode: ''})
    }));
  };

  const handleInterestChange = (game: string) => {
    setFormData(prev => {
      const newInterests = prev.interests.includes(game)
        ? prev.interests.filter(item => item !== game)
        : [...prev.interests, game];
      
      return { ...prev, interests: newInterests };
    });
  };


    return(
        <Card className="max-w-md mx-auto">
            <CardContent className="space-y-4 p-4">
              <h2 className="text-2xl font-bold text-center">
                {authMode === 'login' ? 'Login' : 'Cadastro'}
              </h2>

              {authMode === 'register' && (
                <>
                  <Input 
                    name="name"
                    placeholder="Nome Completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <Input 
                    name="nickname"
                    placeholder="Apelido (como gostaria de ser conhecido)"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    name="cpf"
                    placeholder="CPF"
                    value={formData.cpf}
                    onChange={handleChange}
                    required
                  />
                </>
              )}

              <Input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {authMode === 'login' && error?.type === 'login' && error.message.includes('Usuário') && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}

              <Input
                type="password"
                name="password"
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={5}
              />
              {authMode === 'login' && error?.type === 'login' && error.message.includes('Senha') && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}

              {authMode === 'register' && (
                <>
                  <Input
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Confirme sua Senha"
                    value={formData.passwordConfirmation}
                    onChange={handleChange}
                    required
                    minLength={5}
                  />
                  
                  {formData.password !== formData.passwordConfirmation && (
                    <p className="text-red-500 text-sm">As senhas não coincidem</p>
                  )}
                </>
              )}

              {authMode === 'register' && (
                <div className="space-y-4 border p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-4">Endereço</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <select 
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="p-2 border rounded bg-white"
                    >
                      <option value="" disabled>Selecione o País</option>
                      {COUNTRIES.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>

                    {formData.country === 'Brasil' ? (
                      <>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="p-2 border rounded bg-white"
                        >
                          <option value="" disabled>Selecione o Estado</option>
                          {BRAZIL_STATES.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                        <Input
                          name="city"
                          placeholder="Cidade"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </>
                    ) : (
                      <>
                        <Input
                          name="state"
                          placeholder="Estado/Província"
                          value={formData.state}
                          onChange={handleChange}
                        />
                        <Input
                          name="city"
                          placeholder="Cidade"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </>
                    )}

                    <Input
                      name="zipCode"
                      placeholder={formData.country === 'Brasil' ? "CEP" : "Código Postal"}
                      value={formData.zipCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {authMode === 'register' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Interesses em e-sports</label>
                  <div className="grid grid-cols-2 gap-2">
                    {ESPORTS_INTERESTS.map(game => (
                      <label 
                        key={game}
                        className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(game)}
                          onChange={() => handleInterestChange(game)}
                          className="h-4 w-4"
                        />
                        <span>{game}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {error && error.type === authMode && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md mb-4">
                  {error.message}
                </div>
              )}

              <Button onClick={handleAuthSubmit} className="w-full">
                {authMode === 'login' ? 'Entrar' : 'Cadastrar'}
              </Button>

              <div className="text-center text-sm">
                {authMode === 'login' ? (
                  <button 
                    onClick={() => {
                      setAuthMode('register');
                      setError(null);  
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    Criar nova conta
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setAuthMode('login');
                      setError(null);
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    Já tenho uma conta
                  </button>
              )}
              </div>
            </CardContent>
        </Card>
    )
}

