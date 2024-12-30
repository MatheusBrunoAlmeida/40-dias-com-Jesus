'use client'

import { useState, useEffect } from 'react'

interface Leitura {
    day: number;
    readers: string[];
}

export default function QuemLeuPage() {
    const [leituras, setLeituras] = useState<Leitura[]>([]);

    useEffect(() => {
        const fetchLeituras = async () => {
            try {
                const response = await fetch('/api/readdays');
                const data = await response.json();

                // Sort by day number
                const sortedData = data.sort((a: Leitura, b: Leitura) => a.day - b.day);
                setLeituras(sortedData);
            } catch (error) {
                console.error('Erro ao buscar leituras:', error);
            }
        };

        fetchLeituras();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Quem Leu</h1>

            {leituras.map((leitura) => (
                <div key={leitura.day} className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        Dia {leitura.day} - leram {leitura.readers.length} pessoas
                    </h2>
                    <div>
                        <span>
                            {leitura.readers.map((leitor, index) => (
                                index === leitura.readers.length - 1 
                                    ? leitor 
                                    : `${leitor}, `
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
