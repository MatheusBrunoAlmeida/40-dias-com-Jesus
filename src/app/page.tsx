"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  
  return (
    <div className="w-screen p-4 flex justify-center items-center h-screen">
      <Card className="bg-gray-50">
        <CardHeader>
          <img src="/logo.png" />
        </CardHeader>

        <CardContent>
          <div className="mt-10 flex flex-col w-full justify-center items-center">
            <h1 className="text-2xl font-bold">Login</h1>
          </div>

          <form className="mt-4 flex flex-col gap-2">
            <Input
              placeholder="Email"
            />
            <Input
              placeholder="Senha"
            />

            <Button className="bg-[#5472b7] mt-4">
              Entrar
            </Button>

            <div className="flex justify-center text-center">
              <Button onClick={()=> router.push('./create-account')} variant="link" className="text-[#5472b7] font-bold">
                Cadastrar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
