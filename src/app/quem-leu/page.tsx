'use client'

import { Input } from '@/components/ui/input';
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
        <div className="p-8">
            <div className='flex justify-center'>
                <h1 className="text-2xl font-bold mb-6 text-cyan-700">Quem Leu</h1>
            </div>

            <span className=''>Selecione um dia para rolar a tela:</span>
            <div className="flex mt-5 flex-wrap gap-2 mb-6">
                {Array.from({ length: 40 }, (_, i) => i + 1).map((number) => (
                    <button
                        key={number}
                        onClick={() => scrollToDay(number)}
                        className="px-3 py-1 border rounded hover:bg-gray-100"
                    >
                        {number}
                    </button>
                ))}
            </div>

            <div className='flex items-center gap-8 justify-start'>
                <div className='space-y-2'>
                    <span className='font-semibold'>Pesquisar por localidade:</span>
                    <Input
                        placeholder='Pesquisar por localidade'
                        className='mb-5'
                        onChange={(e) => filterLieutras(e.target.value)}
                    />
                </div>

                <div className='space-y-2'>
                    <span className='font-semibold' >Pesquisar por nome</span>
                    <Input
                        placeholder='Pesquisar por nome'
                        className='mb-5'
                        onChange={(e) => filtredByName(e.target.value)}
                    />
                </div>
            </div>

            {filtredLeitura?.map((leitura) => (
                <div key={leitura.day} id={`day-${leitura.day}`} className="mb-6 mt-8">
                    <h2 className="text-xl font-semibold mb-2">
                        Dia {leitura.day} - leram {leitura.readers.length} pessoas
                    </h2>
                    <div>
                        <span>
                            {/* @ts-ignore */}
                            {leitura.readers.slice(0, 30).map((leitor, index) => (
                                index === Math.min(29, leitura.readers.length - 1)
                                    ? `${leitor.name}${leitura.readers.length > 30 ? '...' : ''}`
                                    : `${leitor.name}, `
                            ))}
                        </span>
                    </div>
                    <ul className="list-disc pl-6">

                    </ul>
                </div>
            ))}
        </div>
    )
}
