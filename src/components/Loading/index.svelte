<div class="loading-wrapper">
    <div class="spanner-box">
        <span class="spanner" />
        <span class="spanner" />
        <span class="spanner" />
        <span class="spanner" />
        <span class="spanner" />
        <span class="spanner" />
        <span class="spanner" />
        <span class="spanner" />
        <span class="spanner" />
        <span class="spanner" />
        <span class="spanner" />
        <span class="spanner" />
    </div>
</div>

<style>
    .loading-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .loading-wrapper .spanner-box {
        width: 1.6rem;
        height: 1.6rem;
        position: relative;
        -webkit-animation: myspanner 0.8s linear infinite;
        animation: myspanner 0.8s linear infinite;
        animation-timing-function: steps(12);
    }

    .loading-wrapper .spanner {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        color: rgb(25, 137, 250);
    }

    .loading-wrapper .spanner::before {
        content: "";
        position: absolute;
        width: 2px;
        height: 22%;
        background-color: currentColor;
        border-radius: 40%;
        left: 0;
        right: 0;
        margin: auto;
    }

    .loading-wrapper .spanner-box .spanner:nth-of-type(1) {
        transform: rotate(30deg);
        opacity: 1;
    }

    .loading-wrapper .spanner-box .spanner:nth-of-type(2) {
        transform: rotate(60deg);
        opacity: 0.9375;
    }

    .loading-wrapper .spanner-box .spanner:nth-of-type(3) {
        transform: rotate(90deg);
        opacity: 0.875;
    }

    .loading-wrapper .spanner-box .spanner:nth-of-type(4) {
        transform: rotate(120deg);
        opacity: 0.8125;
    }

    .loading-wrapper .spanner-box .spanner:nth-of-type(5) {
        transform: rotate(150deg);
        opacity: 0.75;
    }

    .loading-wrapper .spanner-box .spanner:nth-of-type(6) {
        transform: rotate(180deg);
        opacity: 0.6875;
    }

    .loading-wrapper .spanner-box .spanner:nth-of-type(7) {
        transform: rotate(210deg);
        opacity: 0.625;
    }

    .loading-wrapper .spanner-box .spanner:nth-of-type(8) {
        transform: rotate(240deg);
        opacity: 0.5625;
    }

    .loading-wrapper .spanner-box .spanner:nth-of-type(9) {
        transform: rotate(270deg);
        opacity: 0.5;
    }

    .loading-wrapper .spanner-box .spanner:nth-of-type(10) {
        transform: rotate(300deg);
        opacity: 0.4375;
    }

    .loading-wrapper .spanner-box .spanner:nth-of-type(11) {
        transform: rotate(330deg);
        opacity: 0.375;
    }

    .loading-wrapperF .spanner-box .spanner:nth-of-type(12) {
        transform: rotate(360deg);
        opacity: 0.3125;
    }

    @keyframes myspanner {
        to {
            transform: rotate(360deg);
        }
    }
</style>
