document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    const brandSelect = document.getElementById('brand');
    const modelSelect = document.getElementById('model');
    const yearSelect = document.getElementById('year');
    const searchForm = document.getElementById('searchForm');

    const carQueryAPI = 'https://www.carqueryapi.com/api/0.3/';

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 3000);

    // Fetch brands using JSONP
    $.getJSON(carQueryAPI + '?callback=?&cmd=getMakes', function (data) {
        const makes = data.Makes;
        makes.forEach(make => {
            const option = document.createElement('option');
            option.value = make.make_id;
            option.textContent = make.make_display;
            brandSelect.appendChild(option);
        });
    });

    // Fetch models based on selected brand
    brandSelect.addEventListener('change', function () {
        const selectedBrand = brandSelect.value;
        modelSelect.innerHTML = '<option value="">Model Seçin</option>';
        yearSelect.innerHTML = '<option value="">Yıl Seçin</option>';

        if (selectedBrand) {
            $.getJSON(carQueryAPI + `?callback=?&cmd=getModels&make=${selectedBrand}`, function (data) {
                const models = data.Models;
                models.forEach(model => {
                    const option = document.createElement('option');
                    option.value = model.model_name;
                    option.textContent = model.model_name;
                    modelSelect.appendChild(option);
                });
            });
        }
    });

    // Fetch years based on selected model
    modelSelect.addEventListener('change', function () {
        const selectedModel = modelSelect.value;
        yearSelect.innerHTML = '<option value="">Yıl Seçin</option>';

        if (selectedModel) {
            $.getJSON(carQueryAPI + `?callback=?&cmd=getTrims&make=${brandSelect.value}&model=${selectedModel}`, function (data) {
                const trims = data.Trims;
                let years = new Set();
                trims.forEach(trim => years.add(trim.model_year));

                years = Array.from(years).sort((a, b) => b - a);

                years.forEach(year => {
                    const option = document.createElement('option');
                    option.value = year;
                    option.textContent = year;
                    yearSelect.appendChild(option);
                });
            });
        }
    });

    // Form submit işlemi
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const selectedBrand = brandSelect.value;
        const selectedModel = modelSelect.value;
        const selectedYear = yearSelect.value;

        if (!selectedBrand || !selectedModel) {
            alert('Lütfen bir marka ve model seçin.');
        } else {
            // results.html sayfasına yönlendirme ve parametreleri ekleme
            let queryParams = `?brand=${encodeURIComponent(selectedBrand)}&model=${encodeURIComponent(selectedModel)}`;
            if (selectedYear) {
                queryParams += `&year=${encodeURIComponent(selectedYear)}`;
            }
            window.location.href = 'results.html' + queryParams;
        }
    });
});

function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("open");
}
