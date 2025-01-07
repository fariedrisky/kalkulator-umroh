// config/api.ts

export const API_CONFIG = {
    BASE_URL: 'https://booking-com15.p.rapidapi.com/api/v1',
    HEADERS: {
        'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST || 'booking-com15.p.rapidapi.com',
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
    },
} as const;

export const API_ENDPOINTS = {
    SEARCH_HOTELS: '/hotels/searchHotels',
} as const;
