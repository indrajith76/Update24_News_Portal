const loadCategory = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategory(data.data.news_category);
    }
    catch(error) {
        console.log(error);
    }
    
}

const displayCategory = categories => {
    const categorySection = document.getElementById('category-section');
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <a onclick="loadCategoryNews('${category.category_id}')" class="text-base font-bold text-gray-500 hover:text-blue-600 hover:bg-blue-300 hover:px-2 hover:py-1 hover:rounded" href="#">${category.category_name}</a>
        `;
        categorySection.appendChild(categoryDiv);
    });
}

const loadCategoryNews = async categoryId => {
    //start loader
    spinner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsInfo(data.data);
    }
    catch(error){
        console.log(error);
    }
}

const displayNewsInfo = allNewsInfo => {
    const newsCounter = document.getElementById('counter');
    if(allNewsInfo.length !== 0) {
        newsCounter.innerText = allNewsInfo.length;
    }
    else {
        newsCounter.innerText = 'NO';
    }

    const newsCardContainer = document.getElementById('news-card-container');
    newsCardContainer.innerHTML = ``;
    allNewsInfo.forEach(allInfo => {
        const newsCardsDiv = document.createElement('div');
        newsCardsDiv.classList.add('news-card')
        newsCardsDiv.innerHTML = `
            <div onclick="loadModal('${allInfo._id}')" class="card-item flex gap-5 shadow-lg p-2 rounded-lg border">
                <div class="w-3/12">
                    <img class="h-full" src='${allInfo.image_url}'>
                </div>
                <div class="w-3/4">
                    <h3 class="text-xl font-semibold mb-2">${allInfo.title}</h3>
                    <p class="mb-3">${allInfo.details.slice(0, 300)}...</p>
                    
                    <div class="flex justify-between">
                        <div class="flex gap-3">
                            <img class="rounded-full h-12" src="${allInfo.author.img}">
                            <div>
                                <h5 class="text-lg font-semibold">${allInfo.author.name ? allInfo.author.name : "Not Available."}</h5>
                                <p class="font-medium text-slate-500">${allInfo.author.published_date ? allInfo.author.published_date.slice(0, 10):'not available.'}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="fa-regular fa-eye"></i>
                            <h5>${allInfo.total_view ? allInfo.total_view : "Not available."}</h5>
                        </div>
                        <div class="flex items-center gap-1">
                            <i class="fa-regular fa-star-half-stroke"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="flex items-center mr-5">
                            <i class="fa-solid fa-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
        newsCardContainer.appendChild(newsCardsDiv);
    });
    spinner(false);
}


const loadModal = async newsId => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayModalData(data.data[0]);
    }
    catch(error) {
        console.log(error);
    }
}


const modalOverlay = document.getElementById('modal-overlay');
const displayModalData = data => {
    modalOverlay.classList.remove('hidden');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h1>${data.title}</h1>
        <div class="flex gap-3">
            <img class="w-11 rounded-full" src="${data.author.img}">
            <div>
                <h4>${data.author.name}</h4>
                <p>${data.author.published_date}</p>
            </div>
        </div>
        <img src="${data.image_url}">
        <p>${data.details}</p>
        <i onclick="modalOff()" class="absolute top-1 right-1 cursor-pointer fa-solid fa-xmark"></i>
    `;
}

const modalOff = () => {
    modalOverlay.classList.add('hidden');
}

const spinner = data => {
    const spinnerDiv = document.getElementById('spinner');
    if(data === true){
        spinnerDiv.classList.remove('hidden');
        spinnerDiv.classList.add('flex');
    }
    else {
        spinnerDiv.classList.remove('flex');
        spinnerDiv.classList.add('hidden');
    }
}


loadCategoryNews('01')

loadCategory()
// spinner(true)