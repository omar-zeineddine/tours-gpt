import React from 'react'
import TourCard from './TourCard'

const ToursList = ({ data }: any) => {
  if (data?.length === 0) return <div>No tours found</div>

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {data?.map((tour: any) => {
        return <TourCard key={tour.id} tour={tour} />
      })}
    </div>
  )
}

export default ToursList
