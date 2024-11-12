require("dotenv").config();
const cloudinary=require("cloudinary").v2;

async function uploadToCloudinary(file,folder,quality)
{
    const options={folder};
    options.resource_type="auto";
    if(quality)
    {
        options.quality=quality
    }
    return await cloudinary.uploader.upload(file.tempFilePath,options)
}
exports.imageUpload=async(file)=>{
    try{
        console.log(file);
        const supportedTypes=["jpg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        if(!supportedTypes.includes(fileType))
        {
            res.status(400).json({
                success:false,
                data:"File not supported"
            })
        }
       const response=await uploadToCloudinary(file,"backend");
       console.log(response)
       return response.secure_url
    }catch(err){
        console.error(err);
        console.log(err);
    }
}