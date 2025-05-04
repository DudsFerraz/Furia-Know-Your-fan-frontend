'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import userService from '@/services/userService';

interface Product {
  id: number;
  name: string;
  price: number;
  type: 'shirt' | 'coupon';
  code?: string;
}

interface lojaProps {
  id: number;
  cash: number;
  setCash: (value: number) => void;
  fetchInfo: () => Promise<void>;
}

export default function Loja({ id, cash, setCash, fetchInfo }: lojaProps) {
  const [purchasedProducts, setPurchasedProducts] = useState<number[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchInfo();
      } catch (err) {
        console.error('Erro ao atualizar dados:', err);
      }
    };
    loadData();
  }, [fetchInfo]);

  const products: Product[] = [
    {
      id: 1,
      name: 'Camiseta da Furia',
      price: 100,
      type: 'shirt',
    },
    {
      id: 2,
      name: 'Cupom de 50% de desconto',
      price: 40,
      type: 'coupon',
      code: 'FURIA50',
    },
    {
      id: 3,
      name: 'Cupom de 25% de desconto',
      price: 25,
      type: 'coupon',
      code: 'FURIA25',
    },
  ];

  const handleBuy = async (productId: number, price: number) => {
    if (!id) {
      setError('Usuário não autenticado');
      return;
    }

    if (cash < price) {
      setError('Saldo insuficiente para esta compra');
      return;
    }

    const previousCash = cash;
    const previousPurchased = [...purchasedProducts];

    try {
      setCash(cash - price);
      setPurchasedProducts(prev => [...prev, productId]);
      setError('');

        console.log(id)
        console.log(price)

      await userService.buy(id, price);
      
      const updatedUser = await userService.getInfo(id);
      setCash(updatedUser.data.cash);
    } catch (err) {
      setCash(previousCash);
      setPurchasedProducts(previousPurchased);
      setError('Erro ao processar a compra');
      console.error(err);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Loja FURIA</h2>
          <div className="mt-2 text-lg font-semibold text-primary">
          FURIA CASH:  {
            new Intl.NumberFormat('pt-BR', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
             }).format(cash)
            }
</div>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">
                    {product.name} 
                    <a 
                      href='https://www.furia.gg/'
                      target='_blank'
                      className="ml-2 text-purple-500 hover:text-purple-700 underline hover:no-underline transition-colors duration-200 font-medium"
                    >
                      furia.gg
                    </a>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Preço: {product.price} cash
                  </p>
                  
                  {product.type === 'coupon' && 
                    purchasedProducts.includes(product.id) && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-green-600">
                          Cupom: {product.code}
                        </p>
                      </div>
                    )}
                </div>

                <Button
                  onClick={() => handleBuy(product.id, product.price)}
                  disabled={cash < product.price || purchasedProducts.includes(product.id)}
                  variant="default"
                  size="sm"
                >
                  {purchasedProducts.includes(product.id) ? 'Comprado' : 'Comprar'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}