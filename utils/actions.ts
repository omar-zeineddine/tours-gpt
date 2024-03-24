'use server'

import OpenAI from 'openai'
import prisma from './db'

const openai = new OpenAI()

export const generateChatResponse = async (chatMessages: any) => {
  try {
    // console.log(chatMessage);
    const response = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'you are a helpful assistant' },
        ...chatMessages,
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.1,
    })
    // console.log(response.choices[0].message);
    // console.log(response);
    return response.choices[0].message
  } catch (error) {
    return null
  }
}

export const generateTourResponse = async ({
  city,
  country,
}: {
  city: string
  country: string
}) => {
  const query = `Find a exact ${city} in this exact ${country}.
If ${city} and ${country} exist, create a list of things families can do in this ${city},${country}. 
Once you have a list, create a one-day tour. Response should be  in the following JSON format: 
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "short description of the city and tour",
    "stops": ["short paragraph one tour 1", "short paragraph on tour 2", "short paragraph on tour 3"]
  }
}
"stops" property should include only three stops.
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country},   return { "tour": null }, with no additional characters.`
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'you are a tour guide' },
        {
          role: 'user',
          content: query,
        },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0,
    })
    if (response.choices[0].message.content) {
      const tourData = JSON.parse(response.choices[0].message.content as string) // Type assertion to string
      if (!tourData.tour) {
        return null
      }
      // Check if response.usage is not undefined before accessing total_tokens
      const tokens = response.usage ? response.usage.total_tokens : 0 // Provide a default value if undefined
      return { tour: tourData.tour, tokens }
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const createNewTour = async (tour: any) => {
  const existingTour = await prisma.tour.findUnique({
    where: {
      city_country: {
        city: tour.tour.city,
        country: tour.tour.country,
      },
    },
  })
  if (existingTour) {
    return existingTour
  } else {
    return prisma.tour.create({
      data: tour.tour,
    })
  }
}

export const getExistingTour = async ({
  city,
  country,
}: {
  city: string
  country: string
}) => {
  return prisma.tour.findUnique({
    where: {
      city_country: {
        city,
        country,
      },
    },
  })
}

export const generateAllTours = async (searchQuery: string) => {
  if (!searchQuery) {
    const tours = await prisma.tour.findMany({
      orderBy: {
        city: 'asc',
      },
    })
    return tours
  }
  const tours = await prisma.tour.findMany({
    where: {
      OR: [
        {
          city: {
            contains: searchQuery,
          },
          country: {
            contains: searchQuery,
          },
        },
      ],
    },
    orderBy: {
      city: 'asc',
    },
  })
}
