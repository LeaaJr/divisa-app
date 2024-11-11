"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [divisas, setDivisas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reemplaza esta URL con la URL correcta de la API de divisas
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then((response) => {
        setDivisas(Object.entries(response.data.rates)); // Convierte las divisas en un array de arrays
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener las divisas:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col pt-[12rem] pb-[12rem] px-6">
      {/* Sección con la imagen y el texto en paralelo */}
      <div className="flex justify-between items-start h-auto max-w-full mb-6">
        {/* Lado derecho con la imagen de "Device Mockups" */}
        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[454px] max-w-[341px] md:h-[682px] md:max-w-[512px]">
          <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
          <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
          <div className="rounded-[2rem] overflow-hidden h-[426px] md:h-[654px] bg-white dark:bg-gray-800">
            <img src="https://flowbite.s3.amazonaws.com/docs/device-mockups/tablet-mockup-image.png" className="dark:hidden h-[426px] md:h-[654px]" alt="" />
            <img src="https://flowbite.s3.amazonaws.com/docs/device-mockups/tablet-mockup-image-dark.png" className="hidden dark:block h-[426px] md:h-[654px]" alt="" />
          </div>
        </div>

        {/* Lado izquierdo con texto (Lorem Ipsum) y scroll */}
        <div className="w-1/2 p-4 bg-gray-transparent text-white h-[454px]">
          <p className="text-lg mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia ex, sapiente natus maiores quo atque sint nihil amet accusamus impedit officiis sed nesciunt velit in! Ipsa perferendis harum asperiores eum.</p>
          <p className="text-lg mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam laudantium ab dolorem veniam reiciendis repudiandae possimus totam dignissimos a magni natus, quia aliquam aliquid distinctio quam eligendi voluptatibus inventore nobis.</p>
          <p className="text-lg mb-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe nihil nulla dolorum inventore aperiam natus praesentium a officia ad perspiciatis, laudantium in aspernatur eos unde? Sed error nam eaque inventore.</p>
        </div>
      </div>

      <div className="py-44 text-center">
      <h1 className="text-5xl font-bold mb-4">Divisas hoy</h1>
      </div>

      {/* Si estamos cargando, mostrar un mensaje de carga */}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        // Aquí viene la tarjeta con las divisas
        <div className="bg-[#1f1f1f3d] p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {divisas.map(([currency, rate]) => (
              <div key={currency} className="bg-transparent p-4 rounded-lg shadow-sm text-center">
                <h4 className="font-semibold">{currency}</h4>
                <p>{rate}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}