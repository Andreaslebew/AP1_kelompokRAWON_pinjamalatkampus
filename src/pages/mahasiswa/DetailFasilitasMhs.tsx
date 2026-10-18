import React from 'react';
import { useParams } from 'react-router-dom';

export const DetailFasilitasMhs: React.FC = () => {
  const { id } = useParams();
  return (
    <section className="mx-auto w-full max-w-md px-4 py-6 md:max-w-5xl">
      <h1 className="text-xl font-semibold">Detail Fasilitas</h1>
      <p className="mt-2 text-sm">ID fasilitas: {id}</p>
    </section>
  );
};