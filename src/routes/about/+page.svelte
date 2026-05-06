<script>
import { onMount } from "svelte";

const bodyChapterHeadings = {
	Work: "work",
	Homelab: "homelab",
	"Tools/Setup": "tools",
	Links: "links",
};

const externalLinks = {
	LinkedIn: "https://www.linkedin.com/in/harrison-phillingham/",
	GitHub: "https://github.com/hphillingham",
	"OpenPGP Key": "https://keys.openpgp.org/search?q=harrison%40phillingham.com",
};

async function getEmail() {
	const response = await fetch("/data/email", { method: "GET" });
	return await response.json();
}

let personalEmailAddress = "";

onMount(async () => {
	const data = await getEmail();
	personalEmailAddress = data.email;
});
</script>

<div class="m-auto dark:text-gray-50">
    <h1 class="text-3xl font-bold mt-5 mb-4 dark:text-gray-50">About</h1>

    <p class="ml-0.5">Hey! My name's Harrison and I'm a Software Security Engineer at <a class="underline text-blue-500" target="_blank" href="https://auroraer.com">Aurora Energy Research</a>.</p>

    <p class="mt-2 ml-0.5">I'm a lover of self-hosting, open-source, board games, and hiking.</p>

    <p class="mt-2 ml-0.5">Wanna chat about anything? Drop me an <a class="underline " target="_blank" href="mailto:{personalEmailAddress}?subject=Hey!">email</a>.</p>

    <hr class="w-[60%] sm:w-[50%] mt-5 mb-4 border-gray-500">

    <ul class="flex flex-col gap-1 list-disc list-inside">
        {#each Object.entries(bodyChapterHeadings) as [heading, id]}
            <li><a class="underline " href={`#${id}`}>{heading}</a></li>
        {/each}
    </ul>

    <hr class="w-[60%] sm:w-[50%] mt-5 mb-4 border-gray-500">

    <h3 id="work" class="text-2xl font-bold mt-8 mb-4">Work</h3>

    <p class="mt-2 ml-0.5">I currently work for Aurora Energy Research as a Software Security Engineer. I have previously worked for Thames Valley Police within their Digital Forensics Department, and I have a Masters in Computer Science.</p>

    <p class="mt-2 ml-0.5">Outside of working for Aurora, I also work part-time for Daylight CPT, providing Microsoft 365 support, device management, and various other technical services.</p>

    <p class="mt-2 ml-0.5">When not working, I'm usually programming (see my projects <a class="underline " href="/projects">here</a>) or tinkering with something (see below!).</p>

    <h3 id="homelab" class="text-2xl font-bold mt-8 mb-4">Homelab</h3>

    <p class="mt-2 ml-0.5">I'm a big believer in the power of open-source, self-hosting, and decreasing reliance on the cloud. I run a multi-site Homelab, which provides a lot of the services I use everyday. The underlying foundation of this is 2x Proxmox-VE servers, with a virtualised TrueNAS system, and Tailscale to join everything together.</p>

    <h3 id="tools" class="text-2xl font-bold mt-8 mb-4">Tools/Setup</h3>

    <p class="mt-2 ml-0.5">I love to play around with different tools, all in the over-optimistic aim to get the perfect/most efficient setup. As of writing I have settled on the following:</p>

    <ul class="list-disc sm:list-inside sm:ml-5 ml-4 mt-4">
        <li><strong>MacOS / Fedora Linux</strong>. One for productivity + stability, one for games + tinkering.</li>
        <li><strong>Firefox / Thunderbird</strong> - Browser/Email Clients. Great open source tools that don't harvest data.</li>
        <li><strong>Obsidian</strong> - Note taking. Big believer in the power of Markdown and keeping things simple, hence Obsidian is a great choice.</li>
    </ul>

    <h3 id="links" class="text-2xl font-bold mt-8 mb-4">Links</h3>

    <ul class="flex flex-col gap-1 list-disc list-inside ml-1">
        {#each Object.entries(externalLinks) as [heading, id]}
            <li><a class="underline text-blue-500 " href={id} target="_blank">{heading}</a></li>
        {/each}
    </ul>



</div>
