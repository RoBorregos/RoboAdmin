import { useState } from "react";
import ImageDrop from "../imgDrop";
import ImagePreview from "../imgPreview";
import { api } from "rbrgs/utils/api";
interface Props {
    id: number;
}
const AddImage: React.FC<Props> = ({ id }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const addImg = api.githubApi.addFileToBranch.useMutation();

    const handleFileSelect = (file: File) => {
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleCroppedImage = (image: string) => {
        if (image) {
            setCroppedImage(image);
            // console.log(image)

            addImg.mutate({
                owner: "RoBorregos",
                repo: "roborregos-web",
                branch: "update/members",
                filePath: `src/images/members`,
                fileContent: image,
                commitMessage: "Upload image",
                token: "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"
            })

            alert("Image uploaded");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-10">
            <ImageDrop handleFileSelect={handleFileSelect} />
            {selectedFile && (
                <div>
                    <ImagePreview image={URL.createObjectURL(selectedFile)} desiredHeight={456} desiredWidth={600} onFinishedCropping={handleCroppedImage} />
                </div>
            )}
            {croppedImage && <img src={croppedImage} alt="" />}
        </div>
    )
}

export default AddImage;