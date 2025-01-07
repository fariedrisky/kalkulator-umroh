// services/hotelService.ts

import { API_CONFIG, API_ENDPOINTS } from '@/config/api';

interface RequiredSearchParams {
    dest_id: string;
    search_type: string;
    arrival_date: string;
    departure_date: string;
}

interface OptionalSearchParams {
    adults?: number;
    children_age?: string;
    room_qty?: number;
    page_number?: number;
    units?: string;
    temperature_unit?: string;
    languagecode?: string;
    currency_code?: string;
}

// Default parameters for optional fields
const DEFAULT_PARAMS: OptionalSearchParams = {
    adults: 1,
    children_age: '0,17',
    room_qty: 1,
    page_number: 1,
    units: 'metric',
    temperature_unit: 'c',
    languagecode: 'en-us',
    currency_code: 'IDR'
};

class HotelService {
    private formatQueryParams(params: RequiredSearchParams & OptionalSearchParams): string {
        return Object.entries(params)
            .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
            .join('&');
    }

    async searchHotels(
        required: RequiredSearchParams,
        optional?: Partial<OptionalSearchParams>
    ) {
        try {
            // Combine required params with default optional params and any custom optional params
            const searchParams = {
                ...required,
                ...DEFAULT_PARAMS,
                ...optional
            };

            const queryString = this.formatQueryParams(searchParams);

            console.log('Request URL:', `${API_CONFIG.BASE_URL}${API_ENDPOINTS.SEARCH_HOTELS}?${queryString}`);

            const response = await fetch(
                `${API_CONFIG.BASE_URL}${API_ENDPOINTS.SEARCH_HOTELS}?${queryString}`,
                {
                    method: 'GET',
                    headers: API_CONFIG.HEADERS,
                    next: {
                        revalidate: 3600 // Cache for 1 hour
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Error fetching hotels: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch hotels: ${error.message}`);
            }
            throw new Error('An unknown error occurred while fetching hotels');
        }
    }
}

export const hotelService = new HotelService();

// Example usage:
/*
const hotels = await hotelService.searchHotels({
  dest_id: '21157',
  search_type: 'landmark',
  arrival_date: '2025-01-04',
  departure_date: '2025-01-05'
});

// With custom optional parameters
const hotelsCustom = await hotelService.searchHotels(
  {
    dest_id: '21157',
    search_type: 'landmark',
    arrival_date: '2025-01-04',
    departure_date: '2025-01-05'
  },
  {
    adults: 2,
    room_qty: 2,
    currency_code: 'USD'
  }
);
*/
