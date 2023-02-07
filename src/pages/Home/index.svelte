<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import Loading from "../../components/Loading/index.svelte";
    import type { Topic } from "../../types/topic";
    import { useFetchTopics } from "../../services/api";
    import accountPng from "../../assets/account.png";
    import cnodejs from "../../assets/cnodejs_light.svg";
    import toast from "../../components/Toast";

    let list: any[] = [];
    let tab: string = "all";
    let scrollTop: number = 0;
    let activeClass: string = "all";
    let page: number = 1;
    let user: any = {};
    let loaded: boolean = false;

    let loadingOpt: any = { r: 52, z: 4, c: "#65bbce" };

    onMount(async () => {
        user =
            JSON.parse(localStorage.getItem("fengnovo.cnode.user"))?.data || {};
        await init();
    });

    async function init() {
        loaded = false;
        try {
            const { data } = await useFetchTopics(page, "all");
            const result = data as unknown as {
                data: Topic[];
                success: boolean;
            };
            list = result.data.map((i) => ({
                ...i,
                create_at: new Date(i.create_at).toLocaleTimeString(),
            }));

            scollHandle();
            page = ++page;
        } catch (error) {
            toast(error, 2000, { fontSize: "18px" });
        }
        loaded = true;
    }

    onDestroy(() => {
        if (window.onscroll) window.onscroll = null;
    });

    async function handleTab(tabId: string) {
        tab = tabId;
        activeClass = tabId;
        list = [];
        page = 1;
        loaded = false;
        try {
            const { data } = await useFetchTopics(page, tab);
            const result = data as unknown as {
                data: Topic[];
                success: boolean;
            };
            page++;

            list = result.data.map((i) => ({
                ...i,
                create_at: new Date(i.create_at).toLocaleTimeString(),
            }));
            window.scrollTo(0, scrollTop);
        } catch (error) {
            toast(error, 2000, { fontSize: "18px" });
        }

        loaded = true;
    }

    function scollHandle() {
        window.onscroll = async () => {
            const { bottom } = document
                .getElementById("list")
                .getBoundingClientRect();
            if (loaded && bottom < 615) {
                try {
                    const { data } = await useFetchTopics(page, tab);
                    const result = data as unknown as {
                        data: Topic[];
                        success: boolean;
                    };
                    page++;
                    list = list.concat(
                        list,
                        result.data.map((i) => ({
                            ...i,
                            create_at: new Date(
                                i.create_at
                            ).toLocaleTimeString(),
                        }))
                    );
                } catch (error) {
                    toast(error, 2000, { fontSize: "18px" });
                }
            }
        };
    }
</script>

<div id="content">
    <nav class="nav">
        <img class="homepage-left-img" src={cnodejs} alt="nav" />
        {#if user.loginname}
            <a href={`#/user/${user.loginname}`}>
                <img class="homepage-right-img" src={accountPng} alt="login" />
            </a>
        {:else}
            <a href="#/">
                <img class="homepage-right-img" src={accountPng} alt="login" />
            </a>
        {/if}
    </nav>
    <ul id="list">
        {#each list as item}
            <li>
                <a href={`#/user/${item.author.loginname}`}>
                    <img src={item.author.avatar_url} alt="login" />
                </a>
                <a href={`#/detail/${item.id}`}>
                    <div class="list-item">
                        <p>{item.title}</p>
                        <h5>{item.create_at}</h5>
                    </div>
                </a>
            </li>
        {/each}
    </ul>
    <div class="more-center">
        <Loading />
    </div>
    <footer class="footer">
        <ul id="footer-list">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li
                on:click={() => handleTab("all")}
                class:active={activeClass === "all"}
            >
                全部
            </li>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li
                on:click={() => handleTab("good")}
                class:active={activeClass === "good"}
            >
                精华
            </li>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li
                on:click={() => handleTab("share")}
                class:active={activeClass === "share"}
            >
                分享
            </li>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li
                on:click={() => handleTab("ask")}
                class:active={activeClass === "ask"}
            >
                问答
            </li>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li
                on:click={() => handleTab("job")}
                class:active={activeClass === "job"}
            >
                招聘
            </li>
        </ul>
    </footer>
</div>

<style>
    .footer {
        width: 100%;
        height: 3rem;
        position: fixed;
        bottom: 0;
        background: -webkit-linear-gradient(top, #65bbce, #50b1c8);
    }

    #footer-list {
        font-size: 0;
    }

    #footer-list li {
        text-align: center;
        width: 20%;
        height: 3rem;
        line-height: 3rem;
        font-size: 1rem;
        display: inline-block;
        color: #fff;
    }
    #footer-list li.active {
        text-shadow: 4px 2px 4px #480b0b;
    }
</style>
