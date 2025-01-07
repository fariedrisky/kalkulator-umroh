export interface FormDataType {
    departureDate: Date | undefined;
    returnDate: Date | undefined;
    originAirport: string;
    destinationAirport: string;
    excludeFlight: boolean;
    hasVisa: string;
    hotelMadinahStatus: string;
    selectedMadinahHotel: string;
    hotelMakkahStatus: string;
    selectedMekahHotel: string;
    airportTransportStatus: string;
    selectedTransport: string;
    muthoifStatus: string;
    handlingStatus: string;
    additionalItems: {
        ihram: string;
        tas: string;
        koper: string;
        tasJinjing: string;
    };
}

export interface CostEstimationType {
    makkahHotel: number;
    madinahHotel?: number;
    transport?: number;
    visa?: number;
    muthoif?: number;
    handling?: number;
}
