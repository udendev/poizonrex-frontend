// Debug Log
console.log('main.js Connected');

// Tabs

const tabs = document.querySelectorAll('.tab-btn');
const allContent = document.querySelectorAll('.content');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        tabs.forEach((tab) => {
            tab.classList.remove('active');
        });
        tab.classList.add('active');

        allContent.forEach((content) => {
            content.classList.remove('active');
        });
        allContent[index].classList.add('active');
    });
});

// Sort list

function createProducts(container, products) {
    container.textContent = '';
    products.forEach((product) => {
        container.insertAdjacentHTML('beforeEnd', getProductTemplate(product));
    });
}

function getProductTemplate({ id, title, price, images }) {
    return `
    <li class="product-item">
                                <div class="product-open" data-id="${id}"></div>
                                <img
                                    src="${images[0]}"
                                    alt="adidas originals Samba rose"
                                    class="product-img"
                                />
                                <div class="product-container">
                                    <div class="product-info">
                                        <span class="product-price">${price} ₽</span>
                                        <span class="product-name"
                                            >${title}</span
                                        >
                                    </div>
                                    <button class="product-like">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="23"
                                            viewBox="0 0 24 23"
                                            fill="none"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M11.7269 21.5L7.22692 16.8814L2.76232 12.2629C0.346926 9.71037 0.346926 5.71534 2.76232 3.16281C3.94504 2.02613 5.54698 1.43213 7.18485 1.52293C8.82272 1.61373 10.3492 2.38115 11.399 3.6416L11.7269 3.96336L12.0518 3.62775C13.1016 2.3673 14.6281 1.59987 16.2659 1.50907C17.9038 1.41827 19.5057 2.01227 20.6885 3.14896C23.1039 5.70149 23.1039 9.69651 20.6885 12.249L16.2239 16.8676L11.7269 21.5Z"
                                                stroke="url(#paint0_linear_438_531)"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <defs>
                                                <linearGradient
                                                    id="paint0_linear_438_531"
                                                    x1="0.950775"
                                                    y1="11.5"
                                                    x2="22.5"
                                                    y2="11.5"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop stop-color="#EA1A8A" />
                                                    <stop offset="1" stop-color="#B20000" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </button>
                                </div>
                            </li>`;
}

function addHandlersCategory() {
    const categoryBtns = document.querySelectorAll('.scrollable-tabs-btn');

    categoryBtns.forEach((category, index) => {
        category.addEventListener('click', (e) => {
            categoryBtns.forEach((category) => {
                category.classList.remove('active');
            });
            category.classList.add('active');

            const categoryId = e.target.getAttribute('data-id');
            let url = 'https://poizonrex.ru/api/product?categoryId=' + categoryId;

            if (categoryId == 'all') {
                url = 'https://poizonrex.ru/api/product/';
            }

            fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((data) => data.json())
                .then((products) => {
                    const productsContainer = document.getElementById('products');

                    createProducts(productsContainer, products);
                    const productBtns = document.getElementsByClassName('product-open');
                    [...productBtns].forEach((btn) => {
                        btn.addEventListener('click', function (e) {
                            // console.log('Card Click!');
                            const productId = e.target.getAttribute('data-id');
                            window.location = 'product-card.html?id=' + productId;
                        });
                    });
                });
        });
    });
}

fetch('https://poizonrex.ru/api/product/', {
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then((data) => data.json())
    .then((products) => {
        const productsContainer = document.getElementById('products');

        createProducts(productsContainer, products);
        const productBtns = document.getElementsByClassName('product-open');
        [...productBtns].forEach((btn) => {
            btn.addEventListener('click', function (e) {
                // console.log('Card Click!');
                const productId = e.target.getAttribute('data-id');
                window.location = 'product-card.html?id=' + productId;
            });
        });
    });
// About Product

// const aboutFullBtn = document.querySelector('.about-full-btn');
// const aboutFullInfo = document.querySelector('.about-more');
// const aboutFullBtnText = document.querySelector('.about-full-btn-text');
// const aboutFullBtnIcon = document.querySelector('.about-full-btn svg');
// aboutFullBtn.addEventListener('click', () => {
//     var x = document.getElementById('aboutMore');
//     if (x.className === 'about-more') {
//         x.className += ' active';
//         window.location = '#aboutMore';
//         aboutFullBtnText.innerHTML = 'Меньше';
//         aboutFullBtnIcon.style.transform = 'rotate(-180deg)';
//     } else {
//         x.className = 'about-more';
//         aboutFullBtnText.innerHTML = 'Смотреть все';
//         aboutFullBtnIcon.style.transform = 'rotate(0deg)';
//     }
// });

// Accordion

var accordions = document.getElementsByClassName('accordion');
for (var i = 0; i < accordions.length; i++) {
    accordions[i].onclick = function () {
        this.classList.toggle('is-open');
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            // accordion is currently open, so close it
            content.style.maxHeight = null;
        } else {
            // accordion is currently closed, so open it
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    };
}
