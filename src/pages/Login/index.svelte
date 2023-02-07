<script lang="ts">
    import { onMount } from "svelte";
    import { push, pop, replace } from "svelte-spa-router";
    import { useFetchAccesstoken } from "../../services/api";
    import backPng from "../../assets/back.png";

    let title: string = "登录";
    let token: string = "";

    function handleBack(): void {
        window.history.back();
    }

    async function fetchData(val: string) {
        let accesstoken: string = val
            .replace(/^(\s|\u00A0)+/, "")
            .replace(/(\s|\u00A0)+$/, "");
        if (token === "") {
            // toastIt("请输入accesstoken！", 2000, { fontSize: "18px" });
            console.log("请输入accesstoken！", 2000, { fontSize: "18px" });

            return;
        }

        const data = await useFetchAccesstoken(token);
        if (data.data.success) {
            localStorage.setItem(
                "fengnovo.cnode.user",
                JSON.stringify({ data: { ...data.data, accesstoken: token } })
            );
            push(`/user/${data.data.loginname}`);
        } else {
            // toastIt(`登录失败！${data.error_msg}`, 2000, {
            //     fontSize: "18px",
            // });
        }
    }
</script>

<div id="login">
    <nav class="nav">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img class="btn-back" src={backPng} on:click={handleBack} alt="back" />
        <div class="nav-text">{title}</div>
    </nav>
    <form class="login-from">
        <input
            type="text"
            class="login-text"
            bind:value={token}
            placeholder="请输入Access Token"
        />
        <button
            class="login-btn"
            on:click={() => {
                // fetchData(token.value);
                fetchData("");
            }}>登录</button
        >
    </form>
</div>

<style>
    #login .login-from {
        display: block;
        margin-top: 3.3rem;
        width: 100%;
        height: 100%;
    }

    #login .login-text {
        display: block;
        margin: 10rem auto 0;
        width: 90%;
        height: 2.6rem;
        font-size: 1.2rem;
        border-radius: 0.5rem;
        border: 1px solid #ccc;
    }

    #login .login-btn {
        display: block;
        margin: 2rem auto 0;
        background: #65bbce;
        color: #fff;
        font-size: 1.2rem;
        width: 5rem;
        height: 2.6rem;
        border-radius: 0.5rem;
        border: none;
    }
</style>
