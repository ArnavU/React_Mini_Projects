import imageData from "../data.json";

const useGetImages = () => {
    const uniqueIndexArray = imageData.map((obj, ind) =>  {
        return {image_url: obj.image_url, image_id: ind};
    });


    return uniqueIndexArray;
}

export default useGetImages