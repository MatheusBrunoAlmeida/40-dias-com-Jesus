"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCookie, setCookie } from "cookies-next";

export default function Home() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [error, setError] = useState('');

  useEffect(()=> {
    handleVerifyIfHaveUser()
  },[])

  const handleVerifyIfHaveUser = async () => {
    const username = await getCookie("user_name")
    const userId = await getCookie('user_id')

    if(username && userId){
      router.push('/leitura')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      console.log(data)

      setCookie('user_id', data.id)
      setCookie('user_name', data.name)
      localStorage.setItem('user_id', data.id)
      localStorage.setItem('user_name', data.name)
      router.push('/leitura')
    } catch (error) {
      toast.error("Email ou senha incorretos")
    }
  };
  
  return (
    <div className="w-screen p-4 flex justify-center items-center h-screen">
      <Card className="bg-gray-50 lg:w-1/3">
        <CardHeader className="flex flex-col items-center gap-2">
          <img src="/logo.png" alt="Logo" />
          <img src="/logodkm.png" className="w-20"/>
        </CardHeader>

        <CardContent>
          <div className="mt-10 flex flex-col w-full justify-center items-center">
            <h1 className="text-2xl font-bold">Login</h1>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
            <Input
              placeholder="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Input
              placeholder="Senha"
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleInputChange}
              required
            />

            <Button type="submit" className="bg-[#5472b7] mt-4">
              Entrar
            </Button>

            <div className="flex justify-center text-center">
              <Button 
                onClick={() => router.push('./create-account')} 
                variant="link" 
                className="text-[#5472b7] font-bold"
              >
                Cadastrar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
