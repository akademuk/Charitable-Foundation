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
        const duration = 200;

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
                const duration = 200;

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
            const duration = 200;

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
