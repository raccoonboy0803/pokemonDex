'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { Pokemon } from '../types/apiType';
import { useRouter } from 'next/navigation';

const fetchPokemons = async () => {
  try {
    const response = await axios.get('/api/pokemons');
    return response.data;
  } catch (error) {}
};

export default function PokemonList() {
  const router = useRouter();

  const { data, isFetched } = useQuery<Pokemon[]>({
    queryKey: ['getPokemon'],
    queryFn: fetchPokemons,
  });

  if (!isFetched) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[80%] flex flex-col justify-center items-center mx-auto py-5">
      <div className="grid grid-cols-6 gap-4 w-full mx-4 justify-items-center">
        {isFetched &&
          data?.map((pokemon) => (
            <div
              onClick={() => {
                router.push(`/pokemons/${pokemon.id}`);
              }}
              className="w-full flex flex-col items-center border rounded-md border-gray-300 my-2 mx-2 cursor-pointer hover:bg-purple-500 "
              key={pokemon.id}
            >
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={100}
                height={100}
                priority
              />
              <h3 className="text-yellow-500 text-2xl mt-2">
                {pokemon.korean_name}
              </h3>
              <p className="text-white text-lg mb-2">도감번호 : {pokemon.id}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
