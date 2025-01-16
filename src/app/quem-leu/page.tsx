'use client'

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react'

// interface Leitura {
//     day: number;
//     readers: string[];
//     localidade: any
// }

export default function QuemLeuPage() {
    const [leituras, setLeituras] = useState<any[]>([]);
    const [filtredLeitura, setFiltredLeitura] = useState<any[]>([]);

    useEffect(() => {
        const fetchLeituras = async () => {
            try {
                const response = await fetch('/api/readdays');
                const data = await response.json();

                console.log(data)

                // Sort by day number
                const sortedData = data.sort((a: any, b: any) => a.day - b.day);
                setLeituras(sortedData);
                setFiltredLeitura(sortedData)
            } catch (error) {
                console.error('Erro ao buscar leituras:', error);
            }
        };

        fetchLeituras();
    }, []);

    // Função auxiliar para remover acentos
    const removeAcentos = (texto: string) => {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    const filterLieutras = (localidadeName: string) => {
        if (!localidadeName) {
            setFiltredLeitura(leituras);
            return;
        }

        const leituraFiltred = leituras.map(dia => ({
            ...dia,
            readers: dia.readers.filter((reader: any) =>
                removeAcentos(reader.local.toLowerCase())
                    .includes(removeAcentos(localidadeName.toLowerCase()))
            )
        }));

        setFiltredLeitura(leituraFiltred);
    }

    const filtredByName = (name: string) => {
        if (!name) {
            setFiltredLeitura(leituras);
            return;
        }

        const leituraFiltred = leituras.map(dia => ({
            ...dia,
            readers: dia.readers.filter((reader: any) =>
                removeAcentos(reader.name.toLowerCase())
                    .includes(removeAcentos(name.toLowerCase()))
            )
        }));

        setFiltredLeitura(leituraFiltred);
    }

    const scrollToDay = (day: number) => {
        const element = document.getElementById(`day-${day}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (

        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Quem Leu</h1>
                <p className="mt-2 text-gray-600">Selecione um dia para rolar a tela</p>
            </div>
            <div className="p-8">
                <div className="grid grid-cols-5 gap-2 md:grid-cols-8 lg:grid-cols-10">
                    {Array.from({ length: 40 }, (_, i) => i + 1).map((number) => (
                        <button
                            key={number}
                            onClick={() => scrollToDay(number)}
                            className="flex h-12 items-center justify-center rounded-lg border bg-white p-2 hover:border-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            {number}
                        </button>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2 mt-9">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        {/* <span className='font-semibold'>Pesquisar por localidade:</span> */}
                        <Input
                            placeholder='Pesquisar por localidade'
                            className="pl-9"
                            onChange={(e) => filterLieutras(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <Input
                            placeholder='Pesquisar por nome'
                            className="pl-9"
                            onChange={(e) => filtredByName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-6">

                    {filtredLeitura?.map((leitura) => (
                        <Card key={leitura.day} id={`day-${leitura.day}`} className="mb-6 mt-8">
                            <CardHeader className="flex flex-row items-center justify-start space-y-0 pb-2">
                                <CardTitle className="text-xl font-bold">Dia {leitura.day} -</CardTitle>
                                <span className='ml-2'> Leram: </span>
                                <Badge variant="default" className="ml-2 bg-green-600">
                                    {leitura.readers.length} pessoas
                                </Badge>
                            </CardHeader>
                            {/* <h2 className="text-xl font-semibold mb-2">
                                Dia {leitura.day} - leram {leitura.readers.length} pessoas
                            </h2> */}
                            <CardContent>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {/* @ts-ignore */}
                                    {leitura.readers.slice(0, 30).map((leitor, index) => (
                                        index === Math.min(29, leitura.readers.length - 1)
                                            ? `${leitor.name}${leitura.readers.length > 30 ? '...' : ''}`
                                            : `${leitor.name}, `
                                    ))}
                                </p>
                            </CardContent>
                            <ul className="list-disc pl-6">

                            </ul>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
