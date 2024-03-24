'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { generateAllTours } from '@/utils/actions'
import ToursList from './ToursList'

type Props = {}

const Tours = (props: Props) => {
  const { data, isPending } = useQuery({
    queryKey: ['tours'],
    queryFn: () => generateAllTours(),
  })
  return (
    <>
      {isPending ? (
        () => <span className="loading loading-lg">Loading</span>
      ) : (
        <ToursList data={data} />
      )}
    </>
  )
}

export default Tours
