import React from 'react'
import Tours from '@/components/Tours'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { generateAllTours } from '@/utils/actions'

export default async function ToursPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['tours', ''],
    queryFn: () => generateAllTours(),
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Tours />
    </HydrationBoundary>
  )
}
