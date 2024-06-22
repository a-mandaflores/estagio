import React from 'react'

interface CardCadastroProps {
    paragrafo: string;
}

const CardCadastro: React.FC<CardCadastroProps> = ({paragrafo}) => {
  return (
    <section className='flex justify-center bg-opacity-25 items-center w-screen h-screen bg-gray-600'>
    <div className='bg-white p-4 z-50 shadow'>{paragrafo}</div>
    </section>
  )
}

export default CardCadastro