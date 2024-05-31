$(document).ready(function () {
    initBurgerMenu();
    initCardMenu();
    initDropdownMenu();
});

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

function initDropdownMenu() {
    const dropdownToggle = $('.header__dropdown--toggle');
    const dropdownMenu = $('.header__dropdown--menu');
    const dropdownItems = $('.header__dropdown--item');
    let isAnimating = false;

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

document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper(".sub-menu__slider", {
        spaceBetween: 9,
        slidesPerView: "auto",
        loop: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
    });
});


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


document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.gallery-slider', {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: '.gallery-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.gallery-next',
            prevEl: '.gallery-prev',
        },
        loop: true,
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const swiper2 = new Swiper('.accordion__content--slider1', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
            el: '.accordion-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.accordion-next',
            prevEl: '.accordion-prev',
        },
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const swiper3 = new Swiper('.partner__slider', {
        slidesPerView: 'auto',
        spaceBetween: 8 ,
        pagination: {
            el: '.partner__pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.partner__next',
            prevEl: '.partner__prev',
        },
        breakpoints: {
            // when window width is >= 320px
            1280: {
                spaceBetween: 24,
            },
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const swiper2 = new Swiper('.accordion__content--slider2', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
            el: '.accordion-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.accordion-next',
            prevEl: '.accordion-prev',
        },
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const headers = document.querySelectorAll('.accordion__header');

    headers.forEach(header => {
        header.addEventListener('click', function () {
            const activeContent = document.querySelector('.accordion__content--active');
            const activeHeader = document.querySelector('.accordion__header.active');

            if (activeContent && activeContent !== this.nextElementSibling) {
                activeContent.classList.remove('accordion__content--active');
            }

            if (activeHeader && activeHeader !== this) {
                activeHeader.classList.remove('active');
            }

            const content = this.nextElementSibling;
            content.classList.toggle('accordion__content--active');
            if (content.classList.contains('accordion__content--active')) {
                this.classList.add('active');
            } else {
                this.classList.remove('active');
            }
        });
    });

    const galleryCards = document.querySelectorAll('.gallery__box--left-bottom-card, .gallery__box--left-bottom-card2');

    galleryCards.forEach(card => {
        card.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const targetAccordionItem = document.getElementById(targetId);

            if (targetAccordionItem) {
                // Закрываем все открытые аккордеоны и удаляем класс active с заголовков
                const activeContents = document.querySelectorAll('.accordion__content--active');
                const activeHeaders = document.querySelectorAll('.accordion__header.active');
                activeContents.forEach(content => {
                    content.classList.remove('accordion__content--active');
                });
                activeHeaders.forEach(header => {
                    header.classList.remove('active');
                });

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
});

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
        makeDonation.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
});

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

        becomeOurPartner.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
});

