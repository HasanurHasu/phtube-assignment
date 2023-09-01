const loadVideo = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const getData = await response.json();
    const data = getData.data;
    
    const tapContainer = document.getElementById('tap-container');
    tapContainer.classList = `flex justify-center gap-4`;

    data.forEach(category => {
        console.log(category);
        const tapDiv = document.createElement('a');
        tapDiv.innerHTML = `<button onclick="handleVideos('${category.category_id}')"
        class="btn text-[#171717B2] bg-[#25252526] text-[#252525] rounded-md hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>`
        tapContainer.appendChild(tapDiv)
    });


};

const handleVideos =async (categoryId) =>{

console.log(categoryId);
const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
const data =await response.json();
const videosInfo = data.data;

const videoContainer = document.getElementById('video-container');
videoContainer.innerHTML = "";

videosInfo.forEach(video => {
    console.log(video);
    const videoDiv = document.createElement('div');
    videoDiv.innerHTML = `
    <div class="hero w-76 rounded-lg  h-44 flex justify-end items-end" style="background-image: url(${video.thumbnail}); background-size: cover;">
    <div class="mb-3 mr-2">
        <span class="text-white text-xs px-2 py-[7px]  rounded-md bg-[#171717]">3hrs 5 min ago</span>
    </div>
</div>
<div class="flex justify-start items-start gap-3 mt-3">
    <div class="avatar">
        <div class="w-12 rounded-full">
            <img src=${video.authors[0].profile_picture} />
        </div>
    </div>
    <div class="space-y-1">
        <h1 class="text-base font-bold">${video.title}</h1>
        <div class="flex justify-start gap-2 ">
            <h3 class="text-sm font-normal">${video.authors[0].profile_name}</h3><span></span>
        </div>
        <p class="text-sm font-normal">${video.others.views}</p>
    </div>
</div>
    `
videoContainer.appendChild(videoDiv);
});



}

// const displayData = (data) => {

//     console.log(data);


// }

loadVideo();