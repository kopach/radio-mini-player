import { apiResponseSchema, type Station } from '../models/station';

const API_URL =
  'https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com/stations.json';

export const fetchStations = async (): Promise<Station[]> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const rawData = await response.json();
    const validatedData = apiResponseSchema.parse(rawData);

    return validatedData.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch stations: ${error.message}`);
    }
    throw new Error('Failed to fetch stations: Unknown error');
  }
};
