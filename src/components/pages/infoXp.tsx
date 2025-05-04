'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import userService from '@/services/userService';

interface InfoXpProps {
  id: number;
  events: string;
  setEvents: (value: string) => void;
  purchases: string;
  setPurchases: (value: string) => void;
  outsideActivities: string;
  setOutsideActivities: (value: string) => void;
}

export default function InfoXp({
  id,
  events,
  setEvents,
  purchases,
  setPurchases,
  outsideActivities,
  setOutsideActivities
}: InfoXpProps) {
  const [localEvents, setLocalEvents] = useState(events);
  const [localPurchases, setLocalPurchases] = useState(purchases);
  const [localOutsideActivities, setLocalOutsideActivities] = useState(outsideActivities);
  const [submittedFields, setSubmittedFields] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLocalEvents(events);
    setLocalPurchases(purchases);
    setLocalOutsideActivities(outsideActivities);
  }, [events, purchases, outsideActivities]);

  useEffect(() => {
    const alreadySubmitted = [];
    if (events) alreadySubmitted.push('events');
    if (purchases) alreadySubmitted.push('purchases');
    if (outsideActivities) alreadySubmitted.push('outsideActivities');
    setSubmittedFields(alreadySubmitted);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (
    field: string,
    value: string,
    service: any,
    setter: (value: string) => void
  ) => {
    if (submittedFields.includes(field) || !value.trim()) {
      setError(submittedFields.includes(field) 
        ? 'Este campo já foi enviado' 
        : 'Por favor preencha o campo');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      await service(id, value.trim());
      setter(value.trim());
      setSubmittedFields(prev => [...prev, field]);
      
    } catch (err) {
      setError('Erro ao enviar informações. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isPreFilled = (field: string) => {
    return submittedFields.includes(field);
  };

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-8">
          {/* Seção de Eventos */}
          <div className="space-y-2">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-700">Eventos Esportivos</h3>
              <p className="text-sm text-gray-500">
                Quais eventos relacionados a esportes você frequentou nos últimos anos? 
                (forneça o máximo de detalhes que puder)
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Input
                value={localEvents}
                onChange={(e) => setLocalEvents(e.target.value)}
                placeholder="Ex: Jogos da King League, Campeonato Brasileiro de CS2..."
                disabled={isPreFilled('events')}
              />
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleSubmit('events', localEvents, userService.postEvents, setEvents)}
                  disabled={isPreFilled('events') || isLoading}
                  size="sm"
                >
                  Enviar
                </Button>
                {isPreFilled('events') && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-600">✓ Obrigado!</span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      +500xp
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Seção de Compras */}
          <div className="space-y-2">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-700">Compras Relacionadas</h3>
              <p className="text-sm text-gray-500">
                Você realizou alguma compra relacionada a esportes ou à FURIA nos últimos anos? 
                (camisas, periféricos, produtos oficiais...)
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Input
                value={localPurchases}
                onChange={(e) => setLocalPurchases(e.target.value)}
                placeholder="Ex: Camisa oficial da FURIA, Mouse da marca 'X'..."
                disabled={isPreFilled('purchases')}
              />
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleSubmit('purchases', localPurchases, userService.postPurchases, setPurchases)}
                  disabled={isPreFilled('purchases') || isLoading}
                  size="sm"
                >
                  Enviar
                </Button>
                {isPreFilled('purchases') && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-600">✓ Obrigado!</span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      +500xp
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Seção de Atividades Externas */}
          <div className="space-y-2">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-700">Atividades Paralelas</h3>
              <p className="text-sm text-gray-500">
                Pratica algum esporte onde a FURIA não está presente? Em qual dessas atividades 
                você gostaria de ver a FURIA? (eSports em que não temos time, basquete...)
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Input
                value={localOutsideActivities}
                onChange={(e) => setLocalOutsideActivities(e.target.value)}
                placeholder="Ex: jogos singlePlayer, Prática de skate..."
                disabled={isPreFilled('outsideActivities')}
              />
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleSubmit('outsideActivities', localOutsideActivities, userService.postOutsideActivities, setOutsideActivities)}
                  disabled={isPreFilled('outsideActivities') || isLoading}
                  size="sm"
                >
                  Enviar
                </Button>
                {isPreFilled('outsideActivities') && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-600">✓ Obrigado!</span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      +500xp
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}