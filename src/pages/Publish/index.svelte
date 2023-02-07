<script lang="ts">
    import { createEditor, createToolbar } from "@wangeditor/editor";
    import { push, pop, replace } from "svelte-spa-router";
    import { onMount } from "svelte";
    import { useFetchPost } from "../../services/api";
    import type { User } from "../../types/user";
    let user: User | {} = {};
    onMount(() => {
        user =
            JSON.parse(localStorage.getItem("fengnovo.cnode.user")).data || {};
        const editorConfig = {
            placeholder: "Type here...",
            onChange(editor) {
                const html = editor.getHtml();
                console.log("editor content", html);
                // 也可以同步到 <textarea>
            },
        };

        const editor = createEditor({
            selector: "#editor-container",
            html: "<p><br></p>",
            config: editorConfig,
            mode: "default", // or 'simple'
        });

        const toolbarConfig = {};

        const toolbar = createToolbar({
            editor,
            selector: "#toolbar-container",
            config: toolbarConfig,
            mode: "simple", // or 'simple'
        });
    });

    function publishTopic(topicTitle: string) {
        let topicContent = editor.clickHandle();

        topicTitle = topicTitle
            .replace(/^(\s|\u00A0)+/, "")
            .replace(/(\s|\u00A0)+$/, "");
        topicContent = topicContent
            .replace(/^(\s|\u00A0)+/, "")
            .replace(/(\s|\u00A0)+$/, "");
        // if (topicTitle == "") {
        //     toastIt("请输入标题！", 2000, { fontSize: "18px" });
        //     return;
        // }
        // if (!topicContent) {
        //     toastIt("请输入内容！", 2000, { fontSize: "18px" });
        //     return;
        // }
        postTopic(topicTitle, topicContent);
    }

    async function postTopic(title: string, content: string) {
        let accesstoken = (user as User).accesstoken;
        console.log({
            accesstoken,
            title,
            tab: "dev",
            content,
        });

        const { data: json } = await useFetchPost({
            accesstoken, // String 用户的 accessToken
            title, // String 标题
            tab: "dev",
            content, // String 主体内容
        });
        console.log(json);
        if (json.success) {
            // toastIt("成功", 2000, { fontSize: "18px" });
            setTimeout(() => {
                push(`/detail/${json.topic_id}`);
            }, 2000);
        } else {
            // toastIt(json.error_msg, 2000, { fontSize: "18px" });
        }
    }

    function handleExit(): void {
        localStorage.removeItem("fengnovo.cnode.user");
        user = {};
    }

    function handleBack(): void {
        window.history.back();
    }

    function PostData(event): void {
        console.log(event);
    }
</script>

<div id="editor—wrapper">
    <div id="toolbar-container"><!-- 工具栏 --></div>
    <div id="editor-container"><!-- 编辑器 --></div>
</div>

<style>
    @import url(@wangeditor/editor/dist/css/style.css);
    #editor—wrapper {
        border: 1px solid #ccc;
        z-index: 100; /* 按需定义 */
    }
    #toolbar-container {
        border-bottom: 1px solid #ccc;
    }
    #editor-container {
        height: 500px;
    }
</style>
