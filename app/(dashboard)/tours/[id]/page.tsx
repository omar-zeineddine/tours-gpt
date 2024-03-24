import TourInfo from '@/components/TourInfo'
import { getTourById } from '@/utils/actions'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

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

  return (
    <div>
      <Link href="/tours" className="btn btn-secondary mb-12">
        back to tours
      </Link>
      <TourInfo tour={tour} />
    </div>
  )
}
