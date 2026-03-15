(function () {
    'use strict';

    // ----- 1. KVトグルボタン押したとき -----
    const meganeButton = document.querySelector('.kv-cta');
    if (meganeButton) {
        meganeButton.addEventListener('click', () => {
            const kvInner = document.querySelector('.kv__inner');
            // 'active'クラスを付け外しして表示・非表示を切り替える
            if (kvInner) kvInner.classList.toggle('active');
        });
    }

    const swiperCheck = document.querySelector('.mySwiper');
    if (swiperCheck) {
        const swiper = new Swiper(".mySwiper", {
            slidesPerView: "auto",
            spaceBetween: 30,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }

    // ----- 2. メガネ一覧ページのカードを押した時、詳細ページへ遷移 -----
    const student_cards = document.querySelectorAll('.student-card');
    student_cards.forEach(card => {
        card.addEventListener('click', () => {
            const targetUrl = card.dataset.url;
            // datasetからURLを取得し, ページを移動する
            if (targetUrl) location.href = targetUrl;
        });
    });

    // ----- 3. フィルターボタンの選択状態管理 -----
    const filter_buttons = document.querySelectorAll('.custom-filter');

    filter_buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // クリックされたボタンが属するカテゴリ内（.filter-options）だけで'active'を付け替える
            const parent = btn.closest('.filter-options'); //他のカテゴリの選択状態に影響を与えないための処理
            parent.querySelector('.active').classList.remove('active');
            btn.classList.add('active');
        });
    });

    // ----- 4．絞り込みボタン実行時のフィルタリング処理 -----
    const search_button = document.querySelector('#search-btn');
    const noResultMsg = document.querySelector('.no-result-text');

    search_button.addEventListener('click', () => {
        // 1) 現在選択されているフィルター(active)の値を集計（'all'以外）
        const activeFilters = Array.from(document.querySelectorAll('.custom-filter.active'))
            .map(btn => btn.dataset.name)
            .filter(name => name !== 'all');

        // 2) 各カードが表示条件に合致するか判定
        student_cards.forEach((card) => {
            const cardData = card.dataset.name;
            // 選択されたすべての条件が含まれているのかを確認（AND検索)
            const isMatch = activeFilters.every(filter => cardData.includes(filter));

            if (isMatch) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });

        // --- 見えるカードの数を数える ---
        const visibleCardsCount = document.querySelectorAll('.student-card:not(.hide)').length;

        if (visibleCardsCount === 0) {
            //見えるカードの数が０の場合、メッセージを見せる
            noResultMsg.classList.remove('hide');
            setTimeout(() => noResultMsg.classList.add('show'), 10);
        } else {
            //見えるカードの数が０じゃない場合、メッセージを隠す
            noResultMsg.classList.remove('show');
            noResultMsg.classList.add('hide');
        }
    });




    document.addEventListener('DOMContentLoaded', () => {
        const interviewItems = document.querySelectorAll('.interview-content__inner > div');

        const observerOptions = {
            root: null,
            threshold: 0.2,
            rootMargine: "0px, 0px, -100px, 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, observerOptions);

        interviewItems.forEach(item => observer.observe(item));
    });
})();