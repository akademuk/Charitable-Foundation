$(document).ready(function () {
    initBurgerMenu();
    initCardMenu();
    initDropdownMenu();
});

// Открытие/закрытие бургер-меню
function initBurgerMenu() {
    const burgerMenu = $('#burgerMenu');
    const burgerMenuIcon = $('#burgerMenuIcon');
    const burgerMenuOverlay = $('#burgerMenuOverlay');
    const closeButton = $('.burger-menu__close');
    const menuItems = $('.burger-menu__item');

    // Открытие/закрытие бургер-меню
    burgerMenu.on('click', function () {
        burgerMenuIcon.toggleClass('open');
        burgerMenuOverlay.toggleClass('open');
    });

    // Закрытие бургер-меню при клике на кнопку закрытия
    closeButton.on('click', function () {
        burgerMenuIcon.removeClass('open');
        burgerMenuOverlay.removeClass('open');
    });

    // Закрытие бургер-меню при клике на элемент меню
    menuItems.on('click', function () {
        burgerMenuIcon.removeClass('open');
        burgerMenuOverlay.removeClass('open');
    });

    // Закрытие бургер-меню при клике вне его
    burgerMenuOverlay.on('click', function (e) {
        if ($(e.target).is('#burgerMenuOverlay')) {
            burgerMenuIcon.removeClass('open');
            burgerMenuOverlay.removeClass('open');
        }
    });
}

// Открытие меню карточек при клике на кнопку "допомогти"
function initCardMenu() {
    const donateLink = $('.header__btn');
    const cardMenuOverlay = $('#cardMenuOverlay');
    const subMenuOverlays = $('.sub-menu__overlay');
    const body = $('body');

    const subMenus = {
        card1: $('#becomeOurPartner'),
        card2: $('#makeDonation'),
        card3: $('#needHelp'),
    };

    let isSubMenuOpen = false;

    // Открытие меню карточек при клике на кнопку "допомогти"
    donateLink.on('click', function (e) {
        e.stopPropagation();
        cardMenuOverlay.addClass('open');
        body.addClass('active');
    });

    // Закрытие меню карточек при нажатии на крестик
    cardMenuOverlay.find('.close-btn').on('click', function (e) {
        e.stopPropagation();
        cardMenuOverlay.removeClass('open');
        if (!isSubMenuOpen) {
            body.removeClass('active');
        }
    });

    // Закрытие подменю при нажатии на крестик
    subMenuOverlays.find('.close-btn').on('click', function (e) {
        e.stopPropagation();
        $(this).closest('.sub-menu__overlay').removeClass('open');
        isSubMenuOpen = false;
        if (!cardMenuOverlay.hasClass('open')) {
            body.removeClass('active');
        }
    });

    // Открытие подменю при клике на карточку
    cardMenuOverlay.on('click', '.menu__overlay--card', function (e) {
        e.stopPropagation();
        const cardId = $(this).data('card');
        subMenus[cardId].addClass('open');
        isSubMenuOpen = true;
        body.addClass('active');
    });

    // Закрытие подменю при клике вне его области
    $(document).on('click', function (e) {
        const isClickOutsideSubMenu = !$(e.target).closest('.sub-menu__overlay').length;
        const isClickOutsideMainMenu = !$(e.target).closest('#cardMenuOverlay, .header__btn').length;

        if (isSubMenuOpen && isClickOutsideSubMenu) {
            $('.sub-menu__overlay.open').removeClass('open');
            isSubMenuOpen = false;
            if (!cardMenuOverlay.hasClass('open')) {
                body.removeClass('active');
            }
        }
    });

    // Закрытие основного меню при клике вне его области
    $(document).on('click', function (e) {
        const isClickOutsideMainMenu = !$(e.target).closest('#cardMenuOverlay, .header__btn').length;
        if (!isSubMenuOpen && cardMenuOverlay.hasClass('open') && isClickOutsideMainMenu) {
            cardMenuOverlay.removeClass('open');
            body.removeClass('active');
        }
    });

    // Закрытие меню или подменю при нажатии на Esc
    $(window).on('keydown', function (event) {
        if (event.key === 'Escape') {
            if (isSubMenuOpen) {
                $('.sub-menu__overlay.open').removeClass('open');
                isSubMenuOpen = false;
                if (!cardMenuOverlay.hasClass('open')) {
                    body.removeClass('active');
                }
            } else if (cardMenuOverlay.hasClass('open')) {
                cardMenuOverlay.removeClass('open');
                body.removeClass('active');
            }
        }
    });
}

// Открытие меню контактов при клике на кнопку "Горячая линия"
function initDropdownMenu() {
    const dropdownToggle = $('.header__dropdown--toggle');
    const dropdownMenu = $('.header__dropdown--menu');
    const dropdownItems = $('.header__dropdown--item');
    let isAnimating = false;
    let closeTimeout;

    dropdownToggle.on('click', function () {
        if (isAnimating) return;

        isAnimating = true;
        const duration = 100;

        if (dropdownMenu.hasClass('show')) {
            hideDropdownItems(dropdownItems, duration, function () {
                dropdownMenu.removeClass('show');
                dropdownToggle.removeClass('active');
                isAnimating = false;
            });
        } else {
            dropdownMenu.addClass('show');
            dropdownToggle.addClass('active');
            showDropdownItems(dropdownItems, duration, function () {
                isAnimating = false;
            });
        }
    });

    // Закрытие меню при клике вне его области
    $(window).on('click', function (e) {
        if (!$(e.target).closest('.header__dropdown--toggle, .header__dropdown--menu').length) {
            if (dropdownMenu.hasClass('show') && !isAnimating) {
                isAnimating = true;
                const duration = 100;

                hideDropdownItems(dropdownItems, duration, function () {
                    dropdownMenu.removeClass('show');
                    dropdownToggle.removeClass('active');
                    isAnimating = false;
                });
            }
        }
    });

    // Закрытие меню при нажатии на Esc
    $(window).on('keydown', function (e) {
        if (e.key === 'Escape' && dropdownMenu.hasClass('show') && !isAnimating) {
            isAnimating = true;
            const duration = 100;

            hideDropdownItems(dropdownItems, duration, function () {
                dropdownMenu.removeClass('show');
                dropdownToggle.removeClass('active');
                isAnimating = false;
            });
        }
    });

    // Закрытие меню при убирании курсора
    dropdownMenu.on('mouseleave', function () {
        if (dropdownMenu.hasClass('show') && !isAnimating) {
            closeTimeout = setTimeout(function () {
                isAnimating = true;
                const duration = 100;

                hideDropdownItems(dropdownItems, duration, function () {
                    dropdownMenu.removeClass('show');
                    dropdownToggle.removeClass('active');
                    isAnimating = false;
                });
            }, 300); // задержка для закрытия меню
        }
    });

    dropdownMenu.on('mouseenter', function () {
        clearTimeout(closeTimeout); // отменяем закрытие меню, если курсор снова наведён на меню
    });

    function showDropdownItems($items, duration, callback) {
        $items.each(function (index) {
            $(this).delay(index * duration).queue(function (next) {
                $(this).addClass('visible');
                next();
            });
        });
        setTimeout(callback, $items.length * duration);
    }

    function hideDropdownItems($items, duration, callback) {
        $items.each(function (index) {
            $(this).delay((($items.length - index - 1) * duration)).queue(function (next) {
                $(this).removeClass('visible');
                next();
            });
        });
        setTimeout(callback, $items.length * duration);
    }
}

// Swiper slider в блоке Стати нашим партнером
document.addEventListener('DOMContentLoaded', function () {
    var swiperElement = document.querySelector(".sub-menu__slider");
    
    if (swiperElement) {
        var swiper = new Swiper(swiperElement, {
            spaceBetween: 9,
            slidesPerView: "auto",
            loop: true,
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
            },
        });
    }
});

// Меняем валюту вместе с суммой на выбор в блоке Зробити донат до фонду       
document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('value');
    const currencySelector = document.getElementById('currency');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const donationAmounts = document.querySelectorAll('.make-donation__btn');

    amountButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            amountInput.value = button.getAttribute('data-amount');
        });
    });

    const handleCurrencyChange = () => {
        const currency = currencySelector.value.toLowerCase();

        donationAmounts.forEach(amountDiv => {
            amountDiv.classList.remove('active');
        });

        const selectedDiv = document.querySelector(`.make-donation__${currency}`);
        if (selectedDiv) {
            selectedDiv.classList.add('active');
        }
        amountInput.value = '';
    };

    currencySelector.addEventListener('change', handleCurrencyChange);

    const initialCurrency = currencySelector.value.toLowerCase();
    const initialDiv = document.querySelector(`.make-donation__${initialCurrency}`);
    if (initialDiv) {
        initialDiv.classList.add('active');
    }
});

// Swiper slider в блоке Галерея под Hero
document.addEventListener('DOMContentLoaded', function () {
    const swiperElements = document.querySelectorAll('.gallery-slider');
    
    swiperElements.forEach(function(swiperElement) {
        new Swiper(swiperElement, {
            slidesPerView: 1,
            spaceBetween: 10,
            effect: "fade",
            pagination: {
                el: swiperElement.querySelector('.gallery-pagination'),
                clickable: true,
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: swiperElement.querySelector('.gallery-next'),
                prevEl: swiperElement.querySelector('.gallery-prev'),
            },
            loop: true,
        });
    });
});

// Swiper slider в блоке Напрямки
document.addEventListener('DOMContentLoaded', function () {
    const swiperElements = document.querySelectorAll('.accordion__content--slider1');

    swiperElements.forEach((swiperElement) => {
        if (swiperElement) {
            const swiper = new Swiper(swiperElement, {
                slidesPerView: 'auto',
                spaceBetween: 16,
                pagination: {
                    el: swiperElement.querySelector('.accordion-pagination'),
                    clickable: true,
                },
                navigation: {
                    nextEl: swiperElement.querySelector('.accordion-next'),
                    prevEl: swiperElement.querySelector('.accordion-prev'),
                },
                breakpoints: {
                    1280: {
                        spaceBetween: 22,
                    },
                }
            });
        }
    });
});

// Swiper slider в блоке Партнеры
document.addEventListener('DOMContentLoaded', function () {
    const swiperElement = document.querySelector('.partner__slider');
    
    if (swiperElement) {
        const swiper3 = new Swiper(swiperElement, {
            slidesPerView: 'auto',
            spaceBetween: 8,
            pagination: {
                el: '.partner__pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.partner__next',
                prevEl: '.partner__prev',
            },
            breakpoints: {
                1280: {
                    spaceBetween: 24,
                },
            }
        });
    }
});

// Swiper slider в блоке Напрямки
document.addEventListener('DOMContentLoaded', function () {
    const swiperElements = document.querySelectorAll('.accordion__content--slider2');

    swiperElements.forEach((swiperElement) => {
        if (swiperElement) {
            const swiper2 = new Swiper(swiperElement, {
                slidesPerView: 'auto',
                spaceBetween: 16,
                pagination: {
                    el: swiperElement.querySelector('.accordion-pagination'),
                    clickable: true,
                },
                navigation: {
                    nextEl: swiperElement.querySelector('.accordion-next'),
                    prevEl: swiperElement.querySelector('.accordion-prev'),
                },
                breakpoints: {
                    1280: {
                        spaceBetween: 22,
                    },
                }
            });
        }
    });
});

// Swiper slider в блоке Новости на мобильном
document.addEventListener('DOMContentLoaded', function () {
    const newsElement = document.querySelector('.news__slider');

    if (newsElement) {
        const news = new Swiper(newsElement, {
            slidesPerView: 'auto',
            spaceBetween: 16,
            pagination: {
                el: '.news__slider--pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.news__slider--next',
                prevEl: '.news__slider--prev',
            },
            breakpoints: {
                1280: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    pagination: false,
                    navigation: false,
                    simulateTouch: false,
                },
            },
        });

        function checkSlider() {
            if (window.innerWidth > 1280) {
                if (news.initialized) {
                    news.destroy(true, true);
                }
            } else {
                if (!news.initialized) {
                    news.init();
                }
            }
        }

        window.addEventListener('resize', checkSlider);

        checkSlider();
    }
});

// Аккардион в блоке Напрямки
document.addEventListener('DOMContentLoaded', function () {
    // Инициализация аккордеона
    const headers = document.querySelectorAll('.accordion__header');

    if (headers.length > 0) {
        headers.forEach(header => {
            header.addEventListener('click', function () {
                const activeContent = document.querySelector('.accordion__content--active');
                const activeHeader = document.querySelector('.accordion__header.active');

                // Закрываем текущий активный аккордеон, если он не тот же, что был нажат
                if (activeContent && activeContent !== this.nextElementSibling) {
                    activeContent.classList.remove('accordion__content--active');
                }
                if (activeHeader && activeHeader !== this) {
                    activeHeader.classList.remove('active');
                }

                // Переключаем класс active на нажатом аккордеоне
                const content = this.nextElementSibling;
                content.classList.toggle('accordion__content--active');
                this.classList.toggle('active', content.classList.contains('accordion__content--active'));
            });
        });
    }

    // Инициализация кликабельных карточек галереи
    const galleryCards = document.querySelectorAll('.gallery__box--left-bottom-card, .gallery__box--left-bottom-card2');

    if (galleryCards.length > 0) {
        galleryCards.forEach(card => {
            card.addEventListener('click', function () {
                const targetId = this.getAttribute('data-target');
                const targetAccordionItem = document.getElementById(targetId);

                if (targetAccordionItem) {
                    // Закрываем все открытые аккордеоны и удаляем класс active с заголовков
                    const activeContents = document.querySelectorAll('.accordion__content--active');
                    const activeHeaders = document.querySelectorAll('.accordion__header.active');
                    activeContents.forEach(content => content.classList.remove('accordion__content--active'));
                    activeHeaders.forEach(header => header.classList.remove('active'));

                    // Прокручиваем к нужному блоку
                    targetAccordionItem.scrollIntoView({ behavior: 'smooth' });

                    // Раскрываем нужный блок аккордеона и добавляем класс active заголовку
                    const header = targetAccordionItem.querySelector('.accordion__header');
                    const content = targetAccordionItem.querySelector('.accordion__content');
                    content.classList.add('accordion__content--active');
                    header.classList.add('active');
                }
            });
        });
    }
});

// Открытие подменю карточки Стати нашим партнером в слайдере который в аккардионе 1
document.addEventListener('DOMContentLoaded', function () {
    const swiperSlides = document.querySelectorAll('.swiper-slide--open');
    const subMenuOverlay = document.getElementById('becomeOurPartner');
    const body = document.body;

    if (swiperSlides.length && subMenuOverlay) {
        swiperSlides.forEach(swiperSlide => {
            swiperSlide.addEventListener('click', function () {
                subMenuOverlay.classList.toggle('open');
                body.classList.toggle('active');
            });
        });

        // Закрытие при нажатии клавиши ESC
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' || event.key === 'Esc') {
                subMenuOverlay.classList.remove('open');
                body.classList.remove('active');
            }
        });

        // Закрытие при клике вне области блока
        document.addEventListener('click', function (event) {
            if (!subMenuOverlay.contains(event.target) && !Array.from(swiperSlides).some(slide => slide.contains(event.target))) {
                subMenuOverlay.classList.remove('open');
                body.classList.remove('active');
            }
        });
    }
});

// Открытие подменю карточки Підтримайте фонд зараз!
document.addEventListener('DOMContentLoaded', function () {
    const donate = document.querySelectorAll('.donate');
    const makeDonation = document.getElementById('makeDonation');
    const body = document.body;

    if (donate.length && makeDonation) {
        donate.forEach(donateButton => {
            donateButton.addEventListener('click', function (event) {
                event.stopPropagation(); // Остановить всплытие события
                makeDonation.classList.toggle('open');
                body.classList.toggle('active');
            });
        });

        // Закрытие при нажатии клавиши ESC
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' || event.key === 'Esc') {
                makeDonation.classList.remove('open');
                body.classList.remove('active');
            }
        });

        // Закрытие при клике вне области блока
        document.addEventListener('click', function (event) {
            if (!makeDonation.contains(event.target) && !Array.from(donate).some(button => button.contains(event.target))) {
                makeDonation.classList.remove('open');
                body.classList.remove('active');
            }
        });

        // Остановить всплытие клика внутри makeDonation
        makeDonation.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    }
});

// Открытие подменю карточки Підтримайте фонд зараз!
document.addEventListener('DOMContentLoaded', function () {
    const partnerBtn = document.querySelectorAll('.partner-btn');
    const becomeOurPartner = document.getElementById('becomeOurPartner');
    const body = document.body;

    if (partnerBtn.length && becomeOurPartner) {
        partnerBtn.forEach(donateButton => {
            donateButton.addEventListener('click', function (event) {
                event.stopPropagation();
                becomeOurPartner.classList.toggle('open');
                body.classList.toggle('active');
            });
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' || event.key === 'Esc') {
                becomeOurPartner.classList.remove('open');
                body.classList.remove('active');
            }
        });

        document.addEventListener('click', function (event) {
            if (!becomeOurPartner.contains(event.target) && !Array.from(partnerBtn).some(button => button.contains(event.target))) {
                becomeOurPartner.classList.remove('open');
                body.classList.remove('active');
            }
        });

        becomeOurPartner.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    }
});

// Открытие подменю карточки в футере
document.addEventListener('DOMContentLoaded', function () {
    const help = document.querySelectorAll('.help-me');
    const needHelp = document.getElementById('needHelp');
    const body = document.body;

    if (help.length && needHelp) {
        help.forEach(donateButton => {
            donateButton.addEventListener('click', function (event) {
                event.stopPropagation(); // Остановить всплытие события
                needHelp.classList.toggle('open');
                body.classList.toggle('active');
            });
        });

        // Закрытие при нажатии клавиши ESC
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' || event.key === 'Esc') {
                needHelp.classList.remove('open');
                body.classList.remove('active');
            }
        });

        // Закрытие при клике вне области блока
        document.addEventListener('click', function (event) {
            if (!needHelp.contains(event.target) && !Array.from(help).some(button => button.contains(event.target))) {
                needHelp.classList.remove('open');
                body.classList.remove('active');
            }
        });

        // Остановить всплытие клика внутри makeDonation
        needHelp.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    }
});

// Количество карточек при адаптиве в блоке Новости
document.addEventListener('DOMContentLoaded', function () {
    const newsSliderWrapper = document.querySelector('.news__slider--wrapper');
    const newsSliderItems = document.querySelectorAll('.news__slider--item');

    function checkAndRemoveItems() {
        if (window.innerWidth >= 1280) {
            let totalWidth = 0;
            newsSliderItems.forEach(item => {
                item.style.display = ''; // Сбросить видимость элементов
                totalWidth += item.offsetWidth;
                if (totalWidth > newsSliderWrapper.offsetWidth) {
                    item.style.display = 'none'; // Скрыть элемент, если он не помещается
                }
            });
        } else {
            newsSliderItems.forEach(item => {
                item.style.display = ''; // Показать все элементы на меньших экранах
            });
        }
    }

    // Проверка на изменение размера окна
    window.addEventListener('resize', checkAndRemoveItems);

    // Первоначальная проверка
    checkAndRemoveItems();
});

// Loader
document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('no-scroll');

    setTimeout(function () {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.display = 'none';
        }
        document.body.classList.remove('no-scroll');
    }, 3000);
});

// Плавный скрол к якорю
jQuery(document).ready(function ($) {
	// Плавный переход к якорю для ссылок на той же странице
	$('a[href^="#"]').on('click', function (event) {
		event.preventDefault();
		var target = $(this.hash);
		if (target.length) {
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 800);
		}
	});

	// Плавный переход к якорю для ссылок на других страницах
	$('a[href*="index.html#"]').on('click', function (event) {
		event.preventDefault();
		var href = $(this).attr('href');
		var targetId = href.substring(href.indexOf('#'));
		var target = $(targetId);

		if (target.length) {
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 800);
		} else {
			window.location.href = href;
		}
	});
});
