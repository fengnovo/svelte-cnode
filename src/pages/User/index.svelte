<script lang="ts">
    import { onMount } from "svelte";
    import { push, pop, replace } from "svelte-spa-router";
    import RecentTopics from "../RecentTopics/index.svelte";
    import Loading from "../../components/Loading/index.svelte";
    import exitPng from "../../assets/exit.png";
    import writePng from "../../assets/write.png";
    import backPng from "../../assets/back.png";
    import { useFetchUser } from "../../services/api";
    export let params = {};

    let loadingOpt: any = { r: 52, z: 4, c: "#65bbce" };
    let id: string = "";
    let user: any = {};
    let loginname: string = "";
    let title: string = "人物";
    let avatar_url: string = "";
    let githubUsername: string = "";
    let create_at: any = "";
    let score: number = 0;
    let recent_topics: any[] = [];
    let recent_replies: any[] = [];

    onMount(async () => {
        user =
            JSON.parse(localStorage.getItem("fengnovo.cnode.user"))?.data || {};
        id = (params as any).id;
        await init();
    });
    function handleBack(): void {
        window.history.back();
    }

    function handlePublish(): void {
        if (user.loginname) {
            push("#/publish");
        } else {
            push("#/login");
        }
    }

    function handleExit(): void {
        localStorage.removeItem("fengnovo.cnode.user");
        user = {};
    }

    async function init() {
        const { data } = await useFetchUser(id);
        let d = data.data;
        title = d.title;
        loginname = d.loginname;
        avatar_url = d.avatar_url;
        githubUsername = d.githubUsername;
        create_at = d.create_at;
        score = d.score;
        recent_topics = d.recent_topics;
        recent_replies = d.recent_replies;
    }
</script>

<div>
    <nav class="nav">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img class="btn-back" src={backPng} on:click={handleBack} alt="back" />
        <div class="nav-text">{loginname}</div>
        {#if user.loginname === loginname}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img
                class="nav-img"
                src={exitPng}
                on:click={handleExit}
                alt="exit"
            />
        {:else}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img
                class="nav-img"
                src={writePng}
                on:click={handlePublish}
                alt="write"
            />
        {/if}
    </nav>
    {#if create_at}
        <div id="user">
            <li>
                <div>
                    <img src={avatar_url} alt="avatar" />
                    {#if user.loginname === loginname}
                        <button class="login-btn" on:click={handlePublish}
                            >发表</button
                        >
                    {/if}
                </div>
                <div class="list-item">
                    <p>{loginname}</p>
                    <h5>
                        作者：{loginname} 时间：{new Date(
                            create_at
                        ).toLocaleTimeString()}
                    </h5>
                    <h5>分数：{score}</h5>
                </div>
            </li>
            <h3 class="user-topic-list">最近创建的话题</h3>
            <RecentTopics replies={recent_topics} />
            <h3 class="user-topic-list">最近参与的话题</h3>
            <RecentTopics replies={recent_replies} />
        </div>
    {:else}
        <div class="content-center">
            <Loading />
        </div>
    {/if}
</div>

<style>
    #user {
        margin-top: 3.3rem;
        margin-bottom: 3rem;
    }

    #user li {
        padding: 0.5rem;
        border-bottom: 1px solid #ccc;
        word-wrap: break-word;
    }

    #user li img {
        width: 10rem;
        height: 8rem;
    }

    #user .list-item {
        padding: 0.5rem;
        min-height: 4.4rem;
    }
    #user .list-item p {
        margin: 0;
        margin-bottom: 0.5rem;
        padding: 0;
        font-size: 1.1rem;
        font-weight: normal;
        word-wrap: break-word;
        word-break: break-all;
    }

    #user .list-item h5 {
        margin: 0;
        padding: 0;
        font-size: 0.8rem;
        font-weight: normal;
    }

    #user .user-topic-list {
        border-bottom: 1px solid #ccc;
        color: #65bbce;
        /*text-shadow: 4px 2px 4px #480b0b;*/
    }

    #user .login-btn {
        display: inline-block;
        margin: 1rem 1rem 0;
        background: #65bbce;
        color: #fff;
        font-size: 1.2rem;
        text-align: center;
        line-height: 2.6rem;
        width: 7rem;
        height: 2.6rem;
        border-radius: 0.5rem;
        border: none;
        vertical-align: top;
    }
</style>
