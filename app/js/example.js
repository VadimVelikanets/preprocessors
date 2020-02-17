$(function() {

    /* Анимация гамбургера */
    $('.my_hamburger').click(function(){
        //Появление
        if(!$(this).hasClass('is-active')){
            $(this).addClass('is-active');
        } else {
            //Скрытие
            $(this).removeClass('is-active');
        }
    });
    /* Конец */

    /* Аккардион */
    if($('div').hasClass('acc__container')){
        document.querySelector('.acc__container').addEventListener('click', function (event) {
            var block = event.target.closest('.acc__elem');
            if (block) {
                var elem = block.querySelector('.acc__hidden');

                if (block.classList.contains('animate')) {
                    elem.style.height = getComputedStyle(elem).height;
                    block.classList.remove('animate');
                    getComputedStyle(elem).height; // reflow
                    elem.style.height = '';
                } else {
                    block.classList.add('animate');
                    var h = getComputedStyle(elem).height;
                    elem.style.height = '0';
                    getComputedStyle(elem).height; // reflow
                    elem.style.height = h;
                    setTimeout(function () { elem.style.height = '' }, 1000); // Когда закончится анимация
                }
            }
        })
    }
    /* Конец */

    /* Анимация выплывающих блоков */
    $(window).scroll(function () {
        var animateScrollStart = 200;
        var animateScrollBottom = $(window).scrollTop() + $(window).height();
        var animateScrollBottomStart = animateScrollBottom - animateScrollStart;

        $('.fade-up').each(function () {
            var offSetTopAnimateBlock = $(this).offset().top;
            if(animateScrollBottomStart > offSetTopAnimateBlock){
                $(this).addClass('animate');
            } else {
                $(this).removeClass('animate');
            }
        })
    });
    /* Конец */

    /* Функция адаптива блок-слайдеров Slick-slider */
    sliderTransform();
    $(window).resize(function(){
        sliderTransform();
    });

    function sliderTransform(){
        var slider_obj_1 = $('#volat .volat_icon');//Запоминаем блок

        if ($(window).width() <= 992) {
            //запуск конкретного слайдера и выбор его внешнего вида
            initializSlider(slider_obj_1); //выбираем функцию для внешнего вида
        } else {
            //отключение конкретного слайдера
            stopSlider(slider_obj_1);
        }
    }

    /* Функции отключения слайдера */
    function stopSlider(slider) {
        slider.slick('unslick');
    }

    /* Функции запуска слайдера */
    function initializSlider(slider){//слайдер с точками, без стрелок
        slider.slick({
            infinite: true,
            dots: true,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
        })
    }
    /* Конец */

    /* Конец */
    /* Конец */

    /* Конец */
    /* Конец */

    /* Конец */
    /* Конец */

})