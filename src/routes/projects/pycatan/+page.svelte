<script>
    const externalLinks = [
        { title: "GitHub", ref: "https://github.com/hphillingham/pyCatan" },
    ];
</script>

<div class="flex flex-row content-center align-middle mt-4">
    <img class="h-auto sm:w-30 w-15 mt-5 mb-5 sm:mr-8 mr-4  object-cover rounded-md" src="https://raw.githubusercontent.com/hphillingham/pyCatan/refs/heads/master/icon.png" alt="Project Icon">
    <div class="sm:mt-5 mt-1 mb-5 ">
        <h1 class="sm:text-3xl text-2xl font-bold mt-5 sm:mb-3 mb-1 dark:text-gray-50">pyCatan</h1>
        <ul class="flex flex-col gap-1 list-disc list-inside dark:text-gray-50">
            {#each externalLinks as link}
                <li><a class="underline text-blue-500 " href={link.ref}>{link.title}</a></li>
            {/each}
        </ul>
    </div>


</div>

<hr class="mb-4 border-gray-500">

<p class="mt-2 ml-0.5 dark:text-gray-50">pyCatan is the continuation of the Conquerors of Catan Project, aimed at integrating a true GUI to the core AI part of the program. The main limitation of Conquerors of Catan was that it only ever had a CLI Interface, which for a complex board game is never ideal. This aims to create a new UI to play with.</p>

<div class="mt-8"></div>

<p class="mt-2 ml-0.5 dark:text-gray-50">Current progress can be viewed at the GitHub link above.</p>
