const loadVideo = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const getData = await response.json();
    const data = getData.data;

    const tapContainer = document.getElementById('tap-container');
    tapContainer.classList = `flex justify-center gap-4`;

    data.forEach(category => {
        console.log(category);
        const tapDiv = document.createElement('div');
        tapDiv.innerHTML = `<button onclick="handleVideos('${category.category_id}')"
        class="btn text-[#171717B2] bg-[#25252526] text-[#252525] rounded-md hover:bg-[#FF1F3D] hover:text-white focus:bg-[#FF1F3D] focus:text-[white]">${category.category}</button>`
        tapContainer.appendChild(tapDiv)
    });


};

const handleVideos = async (categoryId) => {

    console.log(categoryId);
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const videosInfo = data.data;

    const renderData = (sortedData) => {
        const videoContainer = document.getElementById('video-container');
        videoContainer.innerHTML = "";

        if (sortedData.length == 0) {
            videoContainer.classList.remove('grid')
            videoContainer.innerHTML = `
        <div class="flex flex-col items-center col-span-4 justify-center mt-20">
       <div class="flex flex-col justify-center items-center space-y-6">
       <img src="./images/Icon.png" alt="">
       <h1 class="text-black text-3xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h1>
       </div>
        </div
        `;
        }
        const posteDate = document.getElementById('poste-date')
        sortedData.forEach(video => {
            // console.log(video);

            videoContainer.classList.add('grid')
            const videoDiv = document.createElement('div');
            videoDiv.innerHTML = `
            <div class="card">
            <div class=" rounded-lg w-96 h-52 md:w-60 md:h-36 lg:w-72 lg:h-44 flex justify-end items-end" style="background-image: url(${video.thumbnail}); background-size: cover;">
            <div  class="mb-3 mr-2 ">
                <p id="poste-date" class="text-white text-xs py-2  rounded-md bg-[#171717]">${video.others.posted_date ? secondsToHoursMinute(video.others.posted_date) : ""}</p>
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
            </div>
        `
            videoContainer.appendChild(videoDiv);
        })
    }


    const secondsToHoursMinute = (seconds) => {

        seconds = Number(seconds);
        var h = Math.floor(seconds / 3600);
        var m = Math.floor(seconds % 3600 / 60);

        var hoursDisplay = h + " hrs ";
        var minuteDisplay = m + " min ago ";

        return hoursDisplay + minuteDisplay;

    }

    function sortByViewsDescending() {
        const sortedData = [...videosInfo]; // Create a copy of the original data
        sortedData.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views));
        renderData(sortedData);
    }

    const sortButton = document.getElementById("sort-by-views");
    sortButton.addEventListener("click", sortByViewsDescending);

    renderData(videosInfo)

}
handleVideos(1000)
loadVideo();

const blogBtn = document.getElementById('blog-btn');
blogBtn.addEventListener('click', function () {
    window.location.href = './blog.html'
});

