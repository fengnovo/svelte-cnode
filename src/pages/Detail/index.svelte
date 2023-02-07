<script lang="ts">
    import { onMount } from "svelte";
    import Loading from "../../components/Loading/index.svelte";
    import Replies from "../Replies/index.svelte";
    import { useFetchTopicDetail } from "../../services/api";
    import backPng from "../../assets/back.png";
    export let params = {};

    let loadingOpt: any = { r: 52, z: 4, c: "#65bbce" };
    let id: string = null;
    let content: string = "";
    let title: string = "详情";
    let replies = [];
    let author: any = {};
    let author_id: string = "";
    let reply_count: number = 0;
    let visit_count: number = 0;
    let create_at: any = null;
    let tab: string = "";

    onMount(async () => {
        id = (<any>params).id;
        await init();
    });
    async function init() {
        const { data } = await useFetchTopicDetail(id);
        let d = data.data;
        content = d.content;
        title = d.title;
        replies = d.replies;
        author = d.author;
        author_id = d.author_id;
        reply_count = d.reply_count;
        visit_count = d.visit_count;
        create_at = d.create_at;
        tab = d.tab;
    }
    function handleBack() {
        window.history.back();
    }
</script>

<div>
    <nav class="nav">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img class="btn-back" src={backPng} on:click={handleBack} alt="back" />
        <div class="nav-text">{title}</div>
    </nav>
    {#if content === ""}
        <div class="content-center">
            <Loading />
        </div>
    {:else}
        <div id="detail">
            <li>
                <a href={`#/user/${author.loginname}`}>
                    <img src={`${author.avatar_url}`} alt="avatar" />
                </a>
                <div class="list-item">
                    <p>{title}</p>
                    <h5>
                        作者：{author.loginname} 时间：{new Date(
                            create_at
                        ).toLocaleTimeString()}
                    </h5>
                    <h5>回复数：{reply_count} 浏览量：{visit_count}</h5>
                </div>
            </li>
            {@html content}
            <Replies {replies} />
        </div>
    {/if}
</div>

<style>
</style>
