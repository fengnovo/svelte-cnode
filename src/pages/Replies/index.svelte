<script lang="ts">
    import commenPng from "../../assets/commen.png";
    export let replies = [];
</script>

<div id="replies">
    <img class="comment-icon" src={commenPng} alt="commen" />
    <span class="comment-text">以下是精彩评论</span>
    <ul id="replie-img">
        {#each replies as item}
            <li>
                <div class="left-avatar">
                    <a href={`#/user/${item.author.loginname}`}>
                        <img src={item.author.avatar_url} alt="author" />
                    </a>
                    <span class="loginname-avatar">{item.author.loginname}</span
                    >
                </div>
                <div class="list-item">
                    {@html item.content}
                    <h5>{new Date(item.create_at).toLocaleTimeString()}</h5>
                </div>
            </li>
        {/each}
    </ul>
</div>

<style>
    #replies {
        margin: 0;
        padding: 0.5rem;
        margin-top: 3.3rem;
        word-wrap: break-word;
        word-break: break-all;
    }
    /* #replies pre {
        font-size: 14px;
        border-radius: 0;
        padding: 0 15px;
        border: none;
        border-width: 1px 0;
        background: #f7f7f7;
        -o-tab-size: 4;
        -moz-tab-size: 4;
        tab-size: 4;
        word-break: break-all;
        word-wrap: break-word;
        white-space: pre-wrap;
    } */

    #replies img {
        max-width: 100%;
    }

    #replies .comment-icon {
        width: 2rem;
        height: 2rem;
        vertical-align: top;
        margin-right: 0.5rem;
    }

    #replies .comment-text {
        color: #65bbce;
        font-size: 1.2rem;
        vertical-align: top;
        text-decoration: underline;
    }

    #replies li {
        padding: 0.5rem;
        border-bottom: 1px solid #ccc;
        word-wrap: break-word;
    }

    #replies li img {
        float: left;
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
    }

    #replie-img .left-avatar {
        float: left;
        width: 3.5rem;
    }

    #replie-img .loginname-avatar {
        font-size: 0.8rem;
    }
    #replie-img li:last-child {
        border-bottom: none;
    }

    #replies .list-item {
        padding: 0.5rem;
        margin-left: 3.5rem;
        min-height: 4.4rem;
    }
    /* #replies .list-item p {
        margin: 0;
        margin-bottom: 0.5rem;
        padding: 0;
        font-size: 1.1rem;
        font-weight: normal;
        word-wrap: break-word;
        word-break: break-all;
    } */

    #replies .list-item h5 {
        margin: 0;
        padding: 0;
        font-size: 0.8rem;
        font-weight: normal;
    }
</style>
