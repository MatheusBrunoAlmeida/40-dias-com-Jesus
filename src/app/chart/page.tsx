'use client'
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const data = [
    { location: "Setor Aeroporto, Morrinhos - GO", value: 100 },
    { location: "Setor sul, Formosa - GO", value: 100 },
    { location: "Dona constância Turvelandia - Goiás", value: 100 },
    { location: "Anápolis, Goiás, Tesouro", value: 100 },
    { location: "Bairro da vitória", value: 75 },
    { location: "Jardim das morangas, Serranópolis-Goiás", value: 66.7 },
    { location: "Residencial Alice Barbosa/ Goiânia - Go", value: 57 },
    { location: "Eloy chaves/ Jundiai - SP", value: 53.3 },
    { location: "Jataí - Go", value: 50 },
    { location: "Anicuns - Goiás", value: 50 },
    { location: "Anicuns - Goiás", value: 50 },
    { location: "Selvíria MS, centro", value: 50 }
  ].sort((a, b) => b.value - a.value);

  return (
    <div className="w-full max-w-4xl h-full mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Percentuais por Localidade</h1>
      <div className="h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 60,
              bottom: 120
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="location" 
              angle={-45} 
              textAnchor="end" 
              height={100}
              interval={0}
              fontSize={12}
              tick={{ dx: -8 }}
            />
            <YAxis 
              label={{ 
                value: 'Percentual (%)', 
                angle: -90, 
                position: 'insideLeft',
                offset: -40
              }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip formatter={(value) => `${value}%`} />
            <Bar dataKey="value" fill="#4F46E5" name="Percentual" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;