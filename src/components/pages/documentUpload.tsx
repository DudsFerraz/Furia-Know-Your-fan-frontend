'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import documentService from "../../services/documentService"

interface documentUploadProps{
  cpfVerified: boolean
  setCpfVerified: (value: boolean) => void
}

export default function DocumentUpload({cpfVerified, setCpfVerified} : documentUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [ocrText, setOcrText] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setStatus('');
      setOcrText('');
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsLoading(true);
      const res = await documentService.upload(formData)

      console.log(res.data.status)
      setStatus(res.data.status);
      setOcrText(res.data.extractedText);
      if(res.data.status==="VALID"){
        setCpfVerified(true);
      }
    } catch (err: any) {
      if (err.response?.data?.status === 'INVALID') {
        setStatus('INVALID');
        setOcrText(err.response.data.extractedText);
      } else {
        setError('Erro ao enviar documento.');
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        {!cpfVerified && (
          <>
            <Input type="file" onChange={handleFileChange} />
            <Button onClick={handleUpload} disabled={!file || isLoading}>
              {isLoading ? 'Enviando...' : 'Enviar Documento'}
            </Button>
          </>
        )}

        {status === '' && !cpfVerified &&(
          <div className="mt-4 p-3 rounded bg-gray-100 text-gray-800 font-semibold">
            Envie uma foto de seu documento para validação.
          </div>
        )}

        {(status === 'VALID' || cpfVerified) && (
          <div className="mt-4 p-3 rounded bg-green-100 text-green-800 font-semibold">
            ✅ Documento validado com sucesso!
          </div>
        )}

        {status !== 'VALID' && status !== '' && (
          <div className="mt-4 p-3 rounded bg-red-100 text-red-800 font-semibold">
            ❌ Documento inválido. {status}
          </div>
        )}

        {ocrText && (
          <div className="mt-2 p-2 border rounded bg-gray-50">
            <h4 className="font-semibold mb-1 text-sm">Texto extraído:</h4>
            <pre className="whitespace-pre-wrap text-xs">{ocrText}</pre>
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </CardContent>
    </Card>
  );
}
