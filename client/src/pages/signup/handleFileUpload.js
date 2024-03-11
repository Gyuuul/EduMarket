import { URL } from "../../lib/apis/constant/path";
import { DEFAULT_IMAGE } from '../../lib/apis/constant/path';

export default async function handleFileUpload(e, image) {
    const formData = new FormData();
    const profileImage = e.target.files[0];

    const uploadPath = `${URL}/image/uploadfile`;

    if (!profileImage) {
        image.src = DEFAULT_IMAGE;
        return false;
    }

    formData.append('image', profileImage);

    try {
        const response = await fetch(uploadPath, {
            method: 'POST',
            body: formData,
        });

        const json = await response.json();
        const profileImageSrc = `${URL}/${json.filename}`;

        return profileImageSrc;
    } catch (e) {
        console.error(e);
    }
}