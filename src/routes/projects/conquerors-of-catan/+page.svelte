<script>
    import {onMount} from "svelte";

    const externalLinks = [
        { title: "GitHub", ref: "https://github.com/hphillingham/conquerors-of-catan" },
    ];

    async function getEmail(){
        const response = await fetch("/data/email", { method: "GET" });
        return await response.json()
    }

    let personalEmailAddress = '';

    onMount(async () => {
        const data = await getEmail();
        personalEmailAddress = `mailto:${data.email}`;

    })

</script>

<div class="flex flex-row content-center align-middle mt-4">
    <img class="h-auto sm:w-30 w-15 mt-5 mb-5 sm:mr-8 mr-4  object-cover rounded-md" src="https://raw.githubusercontent.com/hphillingham/Conquerors-of-Catan/refs/heads/master/icon.png" alt="Project Icon">
    <div class="sm:mt-5 mt-1 mb-5 ">
        <h1 class="sm:text-3xl text-2xl font-bold mt-5 sm:mb-3 mb-1 dark:text-gray-50">Conquerors of Catan</h1>
        <ul class="flex flex-col gap-1 list-disc list-inside dark:text-gray-50">
            {#each externalLinks as link}
                <li><a class="underline text-blue-500 " href={link.ref}>{link.title}</a></li>
            {/each}
        </ul>
    </div>


</div>


<hr class="mb-4 border-gray-500">

<p class="mt-2 ml-0.5 dark:text-gray-50">Conquerors of Catan was a degree 'capstone' project, aimed at creating an AI player for the classic euro-style board game The Settlers of Catan (aka Catan). The challenge comes from Catan having imperfect information (private cards), random chance (dice roles and card draws), and player interaction (trading).</p>
<p class="mt-2 ml-0.5 dark:text-gray-50">Conquerors of Catan comes up with innovative methods to deal with these challenge, resulting in a strong Human-competitive player.</p>

<div class="mt-8"></div>

<p class="mt-2 ml-0.5 dark:text-gray-50">In time, the project summary will be written here, however if you wish to read the final paper, you can request it via <a class="underline " href="{personalEmailAddress}"> email</a>. The code is also available at GitHub as above.</p>
