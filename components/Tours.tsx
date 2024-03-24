'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { generateAllTours } from '@/utils/actions'
import ToursList from './ToursList'

type Props = {}

const Tours = (props: Props) => {
  const [searchQuery, setSearchQuery] = React.useState('')
  const { data, isPending } = useQuery({
    queryKey: ['tours', searchQuery],
    queryFn: () => generateAllTours(searchQuery),
  })
  return (
    <>
      <form className="max-w-lg mb-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="enter city or country here.."
            className="input input-bordered join-item w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          <button
            className="btn btn-primary join-item"
            type="button"
            disabled={isPending}
            onClick={() => {
              setSearchQuery('')
            }}
          >
            {isPending ? 'please wait...' : 'reset'}
          </button>
        </div>
      </form>
      {isPending ? (
        () => <span className="loading loading-lg">Loading</span>
      ) : (
        <ToursList data={data} />
      )}
    </>
  )
}

export default Tours
