import data from "../data.json" with {type: "json"};

export function getUrlParams(url) {
    return url.split('/')[1]
}

export function getPesonDetails(position) {    
    if(position === 'favicon.ico') return null
    if (position in data) return data[position]
    else return `Person not found. Existing positions: ${Object.keys(data)}`     
}