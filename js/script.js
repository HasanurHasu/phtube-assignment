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
const videoInfo = data.data;
console.log(videoInfo);

}

// const displayData = (data) => {

//     console.log(data);


// }

loadVideo();