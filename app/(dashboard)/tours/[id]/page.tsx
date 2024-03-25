import React from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import TourInfo from '@/components/TourInfo'
import { generateTourImage, getTourById } from '@/utils/actions'
import axios from 'axios'
const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`

export default async function SingleTourPage({
  params,
}: {
  params: {
    id: string
  }
}) {
  const tour = await getTourById(params.id)

  if (!tour) {
    redirect('/tours')
  }

  const { data } = await axios(`${url}${tour.city}`)
  const tourImage = data?.results[0]?.urls?.regular

  // const tourImage = await generateTourImage({
  //   city: tour.city,
  //   country: tour.country,
  // })

  return (
    <div>
      <Link href="/tours" className="btn btn-secondary mb-12">
        back to tours
      </Link>
      {tourImage ? (
        <div>
          <Image
            src={tourImage}
            width={300}
            height={300}
            className="rounded-xl shadow-xl mb-16 h-96 w-96 object-cover"
            alt="Tour image"
          />
        </div>
      ) : null}
      <TourInfo tour={tour} />
    </div>
  )
}
