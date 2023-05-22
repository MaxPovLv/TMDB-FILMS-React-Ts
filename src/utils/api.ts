import axios from 'axios';
import {ISearch} from '../pages/searchResults/SearchResult';

const BASE_URL = "https://api.themoviedb.org/3";


const headers = {
    Authorization: "bearer " + 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmZmODhiOTBkOWFkMzAwZmYzMjgyZWFkYjBhN2QzMCIsInN1YiI6IjYyOTViODg5ZjhlOTgyMDA5YWNjMjI4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U5FhImEu6xb2V0rpAG4FeatusNYHBYveAkaQUXZ7Eq0'
}


export const fetchDataFromApi = async (url: string, params?: object): Promise<ISearch> => {
    try {
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params,
        })
        return data
    } catch (err: any) {
        console.log(err)
        return err;
    }
}