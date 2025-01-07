// types/api.ts

export interface HotelSearchParams {
    dest_id: string;
    search_type: 'landmark';
    arrival_date: string;
    departure_date: string;
    adults: number;
    children_age?: string;
    room_qty: number;
    page_number: number;
    units: 'metric';
    temperature_unit: 'c';
    languagecode: string;
    currency_code: string;
}

export interface HotelResponse {
    hotels: Hotel[];
    total_count: number;
    page_number: number;
    // Add more fields based on actual API response
}

export interface Hotel {
    hotel_id: string;
    name: string;
    location: {
        address: string;
        city: string;
        country: string;
    };
    price: {
        currency: string;
        amount: number;
    };
    rating: number;
    // Add more fields based on actual API response
}

export interface ApiError {
    message: string;
    statusCode: number;
}
