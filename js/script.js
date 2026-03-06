(function () {
    const menuList = document.querySelector('#gnav');
    const btnMenu = document.querySelector('#btn-menu');

    //btnMenu にイベントリスナーを設定
    btnMenu.addEventListener('click', e => {
        //btnMenuクリック人処理
        btnMenu.classList.toggle('active'); //btnMenu　のclass="active"をトグル
        menuList.classList.toggle('active');//menuList のclass="active"をトグル
    });

    //画面サイズに応じて（例：スマホ・タブレット・PC）、自動で 最適な画像に切り替える
    function setResponsiveBackground() {
        const bgElement = document.querySelector(".keyVisual__bg");
        const screenWidth = window.innerWidth;
        let imageUrl = "";

        if (screenWidth < 768) {
            imageUrl = "imgs/keyvisual_glasses__mobile.png";
        } else if (screenWidth < 1024) {
            imageUrl = "imgs/keyvisual_glasses__tablet.png";
        } else {
            imageUrl = "imgs/keyvisual_glasses__desktop.png";
        }

        // 背景画像を設定
        bgElement.style.backgroundImage = `url(${imageUrl})`;
    }

    // 初回読み込み時とリサイズ時に実行
    window.addEventListener("DOMContentLoaded", setResponsiveBackground);
    window.addEventListener("resize", setResponsiveBackground);

    document.addEventListener("DOMContentLoaded", function () {
        const wrap = document.querySelector(".scroll-infinity__wrap");

        // 任意の速度（ピクセル/秒）
        const SPEED = 150; // ←ここを変えれば速さ調整可能

        function updateAnimationDuration() {
            const wrapWidth = wrap.scrollWidth;
            const duration = wrapWidth / SPEED;
            wrap.style.animationDuration = `${duration}s`;
        }

        updateAnimationDuration();

        // ウィンドウリサイズにも対応
        window.addEventListener("resize", updateAnimationDuration);
    });

    document.addEventListener('DOMContentLoaded', function () {
        const buttons = document.querySelectorAll('.icon_move_site');

        buttons.forEach(function (button) {
            button.addEventListener('click', function () {
                const parent = button.closest('.moreInfo');

                if (parent && parent.id === 'admission_requirements') {
                    window.location.href = 'https://www.jec.ac.jp/entrance/guideline/';
                } else if (parent && parent.id === 'applying_to_school') {
                    window.location.href = 'https://www.jec.ac.jp/entrance/application/';
                } else if (parent && parent.id === 'tuition_fee') {
                    window.location.href = 'https://www.jec.ac.jp/entrance/support/';
                }
            });
        });
    });

})();