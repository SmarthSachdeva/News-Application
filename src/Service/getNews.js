import axios from "axios";

export function getNews(category) {
    const API_Key = 'e50bf17a57a14e82a8edb159bb3461f5';
    const API_Endpoint = `https://newsapi.org/v2/top-headlines?country=us&category=${category}`;

    return axios.get(`${API_Endpoint}&apiKey=${API_Key}`)
    
}
