'use client';

import { useEffect, useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Register from '@/components/pages/register';
import DocumentUpload from '@/components/pages/documentUpload';
import Socials from '@/components/pages/socials';
import Profile from '@/components/pages/profile';
import Ranking from '@/components/pages/ranking';
import Loja from '@/components/pages/loja';
import InfoXp from '@/components/pages/infoXp';

import userService from '@/services/userService';

interface userInfo{
    id: number
    name: string
    nickname: string
    cpf: string
    email: string
    pais: string
    estado: string
    cidade: string
    cep: string
    interests: string[]
    xp: number
    level: string
    cash: number
    createdAt: Date
    verifiedCpf: boolean
    twitter: string
    twitterFollowsFuria: boolean
    twitterInteractions: number
    instagram: string
    twitch: string
    events: string
    purchases: string
    outsideActivities: string
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [info, setInfo] = useState<userInfo | null>(null);
  const [cpfVerified, setCpfVerified] = useState(false);
  const [twitterConnected, setTwitterConnected] = useState(false);
  const [cash, setCash] = useState(0);
  const [events, setEvents] = useState("");
  const [purchases, setPurchases] = useState("");
  const [outsideActivities, setOutsideActivities] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("jwt");
    const tab = params.get("tab");
  
    if (token) {
      localStorage.setItem("jwt", token);
      setIsAuthenticated(true);
    }
  
    if (tab) {
      setActiveTab(tab);
    }
  }, []);

  const fetchInfo = useCallback(async () => {
    try{
      const token = localStorage.getItem('jwt')

      if (!token) {
        throw new Error('Usuário não autenticado')
      }

      const payload = JSON.parse(atob(token.split('.')[1]))
      
      if (!payload.userId) {
        throw new Error('ID do usuário não encontrado no token')
      }

      const response = await userService.getInfo(payload.userId);
      setInfo(response.data);
      setCpfVerified(response.data.verifiedCpf);
      setCash(response.data.cash);
      if(response.data.events!==null) setEvents(response.data.events);
      if(response.data.purchases!==null) setPurchases(response.data.purchases);
      if(response.data.outsideActivities!==null) setOutsideActivities(response.data.outsideActivities);
      if(response.data.twitter!="") setTwitterConnected(true)
    } catch (err) {
      console.error('Erro ao carregar informações:', err);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchInfo();
    }
  }, [isAuthenticated, fetchInfo]);

  return (
    <main className="p-8">
      {!isAuthenticated ? (
        <Register setIsAuthenticated={setIsAuthenticated}/>
      ) : (
        <Tabs defaultValue={activeTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile">Meu Perfil</TabsTrigger>
            <TabsTrigger value="upload">Upload Documento</TabsTrigger>
            <TabsTrigger value="socials">Redes Sociais</TabsTrigger>
            <TabsTrigger value="infoXp">+Info +XP</TabsTrigger>
            <TabsTrigger value="ranking">Ranking</TabsTrigger>
            <TabsTrigger value="loja">Loja</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <DocumentUpload  cpfVerified={cpfVerified} setCpfVerified={setCpfVerified} />
          </TabsContent>

          <TabsContent value="socials">
            {info ? (
              <Socials
                  id={info.id}
                  twitter={info.twitter}
                  twitterFollowsFuria={info.twitterFollowsFuria}
                  twitterInteractions={info.twitterInteractions} 
                  twitterConnected={twitterConnected}
              />
            ) : (
              <div>Carregando...</div>
            )}
          </TabsContent>

          <TabsContent value="profile">
            {info ? (
              <Profile id={info.id}/>
            ) : (
              <div>Carregando perfil...</div>
            )}
          </TabsContent>

          <TabsContent value="ranking">
            <Ranking/>
          </TabsContent>

          <TabsContent value="infoXp">
            {info? (
              <InfoXp
                  id={info.id}
                  events={events}
                  setEvents={setEvents} 
                  purchases={purchases}
                  setPurchases={setPurchases}
                  outsideActivities={outsideActivities}
                  setOutsideActivities={setOutsideActivities}
              />
            ) : (
              <div>Carregando...</div>
            )}
          </TabsContent>

          <TabsContent value="loja">
          {info? (
              <Loja id={info.id} cash={cash} setCash={setCash} fetchInfo={fetchInfo} />
            ) : (
              <div>Carregando...</div>
            )}
          </TabsContent>

        </Tabs>
      )}
    </main>
  );
}
