import axios from "axios";


    export async function getImagesByQuery(query, page = 1, per_page = 15) {
        const response =  await axios.get('https://pixabay.com/api/', {
            params: {
                key: '55065193-391623a3c41ad24a1105f24d8',
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: "true",
                page: page,
                per_page: per_page,
            },
        });
       return response.data;
    }
    