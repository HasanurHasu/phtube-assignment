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

const handleVideos = async (categoryId) => {

    console.log(categoryId);
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const videosInfo = data.data;

    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = "";

    if (videosInfo.length == 0) {
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML = `
    <div class="flex flex-col items-center justify-center mt-20">
    <img src="./images/Icon.png" alt="">
    <h1 class="text-black text-3xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h1>
</div
    `;
    }
    const videoData = videosInfo;
    console.log(videoData);
    const shortData = dataShort(videoData);
    console.log(shortData);

    videoData.forEach(video => {
        // console.log(video);
        
        videoContainer.classList.add('grid')
        const videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
    <div class="hero w-76 rounded-lg  h-44 flex justify-end items-end" style="background-image: url(${video.thumbnail}); background-size: cover;">
    <div id="poste-date" class="mb-3 mr-2 ">
        <span class="text-white text-xs py-2 px-2 rounded-md bg-[#171717]">${video.others.posted_date? secondsToHoursMinute(video.others.posted_date): ""}</span>
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
            <h3 class="text-sm font-normal">${video.authors[0].profile_name}</h3><span>${video.authors[0].verified ? '<img src="./images/verified.svg" alt=""></img>' : ""}</span>
        </div>
        <p class="text-sm font-normal">${video.others.views}</p>
    </div>
</div>
    `
        videoContainer.appendChild(videoDiv);
    })

    
}


const secondsToHoursMinute = (seconds) =>{
    
    seconds = Number(seconds);
    var h = Math.floor(seconds / 3600);
    var m = Math.floor(seconds % 3600 / 60);

    var hoursDisplay =  h + " hrs ";
    var minuteDisplay = m + " min ago";

    return hoursDisplay + minuteDisplay;
    
}

const dataShort = (array) =>{
    array.sort((a, b) => a.others.posted_date - b.others.posted_date);
}


console.log(secondsToHoursMinute("13885"));
loadVideo();

