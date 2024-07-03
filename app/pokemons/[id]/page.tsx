import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import axios from 'axios';
import { Pokemon } from '../../../types/apiType';

const getDetailData = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/pokemons/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function DetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const pokemonData: Pokemon = await getDetailData(id);

  return (
    <div className="w-[60%] flex flex-col items-center mx-auto bg-neutral-200 rounded-xl font-dohyeon my-10">
      <div className="w-full flex flex-col p-4 items-center justify-center bg-yellow-500 rounded-xl">
        <h1 className="text-5xl text-black">{pokemonData.korean_name}</h1>
        <p className="text-2xl text-black">No. {pokemonData.id}</p>
      </div>
      <div className="flex flex-row items-center mt-4">
        <Image
          src={pokemonData.sprites.front_default}
          alt={pokemonData.korean_name}
          width={300}
          height={300}
          priority
        />
        <div className="text-xl m-4 space-y-4 text-black">
          <p>이름: {pokemonData.korean_name}</p>
          <p>키: {pokemonData.height}</p>
          <p>몸무게: {pokemonData.weight}</p>
          <div className="flex flex-row gap-12">
            <div className="flex flex-col">
              <h2>타입: </h2>
              <ul className="flex flex-row space-x-2">
                {pokemonData.types.map((type, index) => (
                  <li
                    className="px-1 bg-green-500 text-white rounded"
                    key={index}
                  >
                    {type.type.korean_name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>특성: </h2>
              <ul className="flex gap-2">
                {pokemonData.abilities.map((ability, index) => (
                  <li
                    className="px-1 bg-orange-500 text-white rounded"
                    key={index}
                  >
                    {ability.ability.korean_name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center mb-6 ">
        <h2 className="text-red-500 text-3xl"> 핵심기술 </h2>
      </div>
      <div className="text-gray-500 text-xl mb-8 grid grid-cols-6 gap-3">
        {pokemonData.moves.map((move, index) => (
          <p key={index}>{move.move.korean_name}</p>
        ))}
      </div>
      <Link
        href="/"
        className="text-white text-3xl bg-red-400 rounded-lg p-2 mb-6 transition-all duration-100 hover:bg-red-500 "
      >
        뒤로가기
      </Link>
    </div>
  );
}
