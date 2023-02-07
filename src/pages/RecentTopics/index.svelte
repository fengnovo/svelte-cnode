<script>
    export let replies = [];
</script>

<ul id="replie-img">
    {#each replies as item}
        <li>
            <a href={`#/detail/${item.id}`}>
                <div class="list-item">
                    <p>{item.title}</p>
                    <h5>
                        {new Date(item.last_reply_at).toLocaleTimeString()}
                    </h5>
                </div>
            </a>
        </li>
    {/each}
</ul>

<style>
    #replie-img li:last-child {
        border-bottom: none;
    }
</style>
