'use client';

import React, { useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { Pokemon } from '../types/apiType';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';

const fetchPokemons = async ({ pageParam = 1 }) => {
  const response = await axios.get(`/api/pokemons?page=${pageParam}`);
  return response.data;
};

export default function PokemonList() {
  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    data: pokemons,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['pokemonsInfinite'],
    queryFn: fetchPokemons,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const nextPage = lastPageParam + 1;
      return lastPage.length === 20 ? nextPage : undefined;
    },
    select: ({ pages }) => pages.flat(),
    initialPageParam: 1,
  });

  const observeElement = (el: HTMLDivElement) => {
    if (!el || observerRef.current || !hasNextPage || isFetchingNextPage)
      return;

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observerRef.current.observe(el);
  };

  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>fetching Error</div>;

  return (
    <div className="w-[80%] flex flex-col justify-center items-center mx-auto py-5">
      <div className="grid grid-cols-6 gap-4 w-full mx-4 justify-items-center">
        {pokemons.map((pokemon: Pokemon) => (
          <div
            onClick={() => {
              router.push(`/pokemons/${pokemon.id}`);
            }}
            className="w-full flex flex-col items-center border rounded-md border-gray-300 my-2 mx-2 cursor-pointer hover:bg-red-700  hover:border-yellow-500"
            key={pokemon.id}
          >
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={100}
              height={100}
            />
            <h3 className="text-yellow-500 text-2xl mt-2">
              {pokemon.korean_name}
            </h3>
            <p className="text-white text-lg mb-2">도감번호 : {pokemon.id}</p>
          </div>
        ))}
      </div>
      <div className="h-20" ref={observeElement}></div>
    </div>
  );
}
