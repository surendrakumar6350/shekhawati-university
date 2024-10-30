import { recentSearches, recentSignup, heroImages } from '@/apiCalls/allApiCalls'

export interface FetchDataResponse {
    recentSearchess: any[];
    recentSignupp: any[];
    heroImg: any[];
}

async function fetchData(): Promise<FetchDataResponse | null> {
    try {
        // Make both API calls in parallel
        const [searchesResponse, signupResponse, heroImgResponse] = await Promise.all([
            recentSearches(),
            recentSignup(),
            heroImages(),
        ]);

        // Directly construct the data object
        return {
            recentSearchess: searchesResponse.heroImages, // Assuming this is an array of strings
            recentSignupp: signupResponse.data, // Adjust this based on the actual structure
            heroImg: heroImgResponse.heroImages, // Assuming this is also an array of strings
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; // Return null in case of an error
    }
}

export { fetchData }
