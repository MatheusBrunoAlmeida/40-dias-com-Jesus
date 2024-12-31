"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function CreateAccount() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    localidade: ''
  });
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome) {
      alert('Por favor, não esqueça de preencher seu nome e sobrenome para que possamos identificá-lo corretamente!');
      return;
    }

    setIsOpen(true)

    // Aqui você pode adicionar a lógica para enviar os dados para seu backend
    console.log('Dados do formulário:', formData);
  };

  const handleCreateAccount = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast('Conta criada com sucesso!')
      router.push('/')
    } catch (error) {
      // Tratar erro
      console.error('Erro ao criar conta:', error);
      toast.error('Problemas ao criar conta, se já tiver conta, tente logar')
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center p-4 mt-10">
      <Card className='bg-gray-50 w-full lg:w-1/3'>
        <CardHeader className='flex flex-col items-center'>
          <div className='mb-10 flex flex-col items-center'>
            <img src="/logo.png" alt="Logo" className='' />
            <img src="/logodkm.png" className="w-20 mt-5" />
          </div>
          <h1 className="text-2xl font-outfit font-bold text-center mb-8">Criar Conta</h1>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700"
              >
                Nome e sobre nome
              </label>
              <Input
                type="text"
                id="nome"
                name="nome"
                placeholder='Digite seu nome e sobre nome'
                value={formData.nome}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-mail
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder='Digite seu email'
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="localidade"
                className="block text-sm font-medium text-gray-700"
              >
                Localidade
              </label>
              <Input
                id="localidade"
                name="localidade"
                placeholder='Digite sua localidade'
                value={formData.localidade}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="senha"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <Input
                type="password"
                id="senha"
                name="senha"
                placeholder='Tenha certeza de digitar uma senha que lembre depois'
                value={formData.senha}
                onChange={handleInputChange}
                required
              />
            </div>

            <Button
              type="submit"
              className='bg-[#5472b7] w-full'
            >
              Cadastrar
            </Button>
            <Button className='text-[#5472b7]' variant="link" onClick={() => router.push('/')}>Voltar</Button>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={isOpen}>
        <AlertDialogContent className='p-8 rounded gap-8'>
          <AlertDialogHeader>
            <AlertDialogTitle>Digitou seu nome e sobre nome?</AlertDialogTitle>
            <AlertDialogDescription>
              Por favor, tenha certeza de ter digitado seu nome e sobre nome para que
              possamos identificar quem é você
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>Editar</AlertDialogCancel>
            <AlertDialogAction className='bg-[#5472b7]' onClick={() => handleCreateAccount()}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
