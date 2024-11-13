"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import GraphCard from '../../components/GraphCard';
import Footer from '../../components/Footer';


export default function Home() {
  const [divisas, setDivisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historicalData, setHistoricalData] = useState({});

  useEffect(() => {
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then((response) => {
        setDivisas(Object.entries(response.data.rates));

        // Simular datos históricos
        const simulatedHistoricalData = {};
        Object.entries(response.data.rates).forEach(([currency]) => {
          simulatedHistoricalData[currency] = Array.from({ length: 10 }, () => 
            (Math.random() * 10 + response.data.rates[currency]).toFixed(2) // Valores simulados cercanos al actual
          );
        });

        setHistoricalData(simulatedHistoricalData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener las divisas:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col pt-[12rem] pb-[12rem] px-6">
      {/* Contenido principal con imagen y texto */}
      <div className="flex justify-between items-start h-auto max-w-full mb-6">
        {/* Imagen */}
        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[454px] max-w-[341px] md:h-[682px] md:max-w-[512px]">
          <div className="rounded-[2rem] overflow-hidden h-[426px] md:h-[654px] bg-white dark:bg-gray-800">
            <img src="https://flowbite.s3.amazonaws.com/docs/device-mockups/tablet-mockup-image.png" className="dark:hidden h-[426px] md:h-[654px]" alt="" />
            <img src="https://flowbite.s3.amazonaws.com/docs/device-mockups/tablet-mockup-image-dark.png" className="hidden dark:block h-[426px] md:h-[654px]" alt="" />
          </div>
        </div>

        {/* Texto */}
        <div className="w-1/2 p-4 bg-gray-transparent text-white h-[454px] overflow-y-scroll">
          <p className="text-lg mb-4">Lorem ipsum...</p>
          <p className="text-lg mb-4">Lorem ipsum...</p>
          <p className="text-lg mb-4">Lorem ipsum...</p>
        </div>
      </div>

      <div className="py-44 text-center">
        <h1 className="text-5xl font-bold mb-4">Divisas hoy</h1>
      </div>

      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="bg-[#1f1f1f3d] p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {divisas.map(([currency, rate]) => (
              <div key={currency} className="bg-transparent p-4 rounded-lg shadow-sm text-center">
                <h4 className="font-semibold">{currency}</h4>
                <p>{rate}</p>
                {historicalData[currency] && (
                  <div style={{width:"90px", height:"30px"}}>
                  <Sparklines data={historicalData[currency]} limit={10} width={100} height={40}>
                    
                  <SparklinesLine
                    color={parseFloat(historicalData[currency].slice(-1)) < parseFloat(historicalData[currency][0]) ? 'red' : 'green'}
                    style={{ strokeWidth: 3, fill: 'none' }}
                  />
                </Sparklines>
                </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <GraphCard />

      <Footer />
    </div>
  );
}
