"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function CreateAccount() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  });

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

  return (
    <div className="w-screen h-screen flex justify-center items-center p-4 mt-10">
      <Card className='bg-gray-50 w-full'>
        <CardHeader>
          <h1 className="text-2xl font-bold text-center mb-8">Criar Conta</h1>
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
            <AlertDialogCancel>Editar</AlertDialogCancel>
            <AlertDialogAction className='bg-[#5472b7]'>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
