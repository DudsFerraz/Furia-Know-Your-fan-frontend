import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import twitterService from "../../services/twitterService"

interface socialsProps{
    id: number
    twitter: string
    twitterFollowsFuria: boolean
    twitterInteractions: number
    twitterConnected: boolean
}

export default function Socials(
    {id,twitter,twitterFollowsFuria,twitterInteractions,twitterConnected} : socialsProps){

    const handleTwitter = () => {
        twitterService.connect(id);
    }

    return(
        <Card>
            <CardContent className="space-y-4 p-4">
                <div className="space-y-4">
                    <Button 
                        onClick={handleTwitter} 
                        className="w-full"
                    >
                        {twitterConnected ? 'Twitter Conectado' : 'Conectar Twitter'}
                    </Button>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-blue-100 p-4 rounded-lg flex items-center justify-between">
                            <span>Segue a FURIA:</span>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">
                                    {twitterFollowsFuria ? 'Sim' : 'Não'}
                                </span>
                                {twitterFollowsFuria && (
                                    <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                                        +1000XP
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        <div className="bg-blue-100 p-4 rounded-lg flex items-center justify-between">
                            <span>Interações:</span>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">{twitterInteractions}</span>
                                <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                                    +{twitterInteractions * 10}XP
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {twitterConnected  && (
                  <div className="pt-4 text-sm text-gray-600 italic">
                      <p>
                          OBS: os valores acima são ilustrativos. Infelizmente recursos da API do Twitter 
                          (como quem o usuário segue e número de interações) que um dia já foram gratuitos 
                          hoje custam uma assinatura de mais de 100 dólares. O código do backend está 
                          plenamente preparado para buscar as informações reais, porém tem o acesso 
                          bloqueado pela limitação do plano gratuito. Portanto, os valores true para 
                          &quot;followsFuria&quot; e 82 para &quot;interactions&quot; são setados como padrão.
                      </p>
                  </div>
                )}

                <div className="space-y-2">
                    <Button 
                        onClick={() => {}} 
                        disabled
                        className="w-full bg-pink-500 hover:bg-pink-600"
                    >
                        Conectar Instagram
                        <p className="text-sm text-black text-center">(Função indisponível no momento)</p>
                    </Button>
                </div>

                <div className="space-y-2">
                    <Button 
                        onClick={() => {}} 
                        disabled
                        className="w-full bg-purple-500 hover:bg-purple-600"
                    >
                        Conectar Twitch
                        <p className="text-sm text-black text-center">(Função indisponível no momento)</p>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}