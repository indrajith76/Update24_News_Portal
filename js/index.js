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
            <a onclick="" class="text-base font-bold text-gray-500 hover:text-blue-600 hover:bg-blue-300 hover:px-2 hover:py-1 hover:rounded" href="#">${category.category_name}</a>
        `;
        categorySection.appendChild(categoryDiv);
        console.log(category);
    });
}

loadCategory()