const loadVideo = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const getData = await response.json();
    const data = getData.data;
    displayData(data);
};

const displayData = (data) => {

    console.log(data);

    const tapContainer = document.getElementById('tap-container');
    tapContainer.classList = `flex justify-center gap-4`;

    data.forEach(category => {
        const tapDiv = document.createElement('a');
        tapDiv.innerHTML = `<button
        class="btn text-[#171717B2] bg-[#25252526] text-[#252525] rounded-md hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>`
        tapContainer.appendChild(tapDiv)
    });

}

loadVideo();