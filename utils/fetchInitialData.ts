import { recentSearches,  heroImages } from '@/apiCalls/allApiCalls'

export interface FetchDataResponse {
    recentSearchess: any[];
    heroImg: any[];
}

async function fetchData(): Promise<FetchDataResponse | null> {
        // Make both API calls in parallel
        const [searchesResponse, heroImgResponse] = await Promise.all([
            recentSearches(),
            heroImages(),
        ]);

        // Directly construct the data object
        return {
            recentSearchess: searchesResponse?.heroImages, // Assuming this is an array of strings
            heroImg: heroImgResponse?.heroImages // Assuming this is also an array of strings
        };
}

export { fetchData }
