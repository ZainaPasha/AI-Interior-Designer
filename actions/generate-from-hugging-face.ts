import axios from "axios";

export const generateFromHuggingFaceModel = async({
    imageUrl, prompt,
}:{
    imageUrl:string;
    prompt:string;
}) =>{
    try {
        const response = await axios.post("/api/generate",{imageUrl, prompt})
        return response.data.image
    } catch (error) {
        console.error("Generation error:", error);
        throw new Error("Failed to generate Image");
    }
}