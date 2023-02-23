const baseUrl = process.env.BASE_URL
const apiKey = process.env.NEXT_PUBLIC_API_KEY

const mergePath = (params: string) =>{
    return `${baseUrl}${params}?api_key=${apiKey}&language=en-US&append_to_response=videos`
}
const utilPath = {
    mergePath
}
export default utilPath