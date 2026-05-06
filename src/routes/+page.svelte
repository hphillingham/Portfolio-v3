<script>
import { onMount } from "svelte";
import { cacheData, fetchFromCache } from "$lib/data_functions.js";

let quickLinks = [
	{ name: "About", href: "/about" },
	{ name: "Homelab", href: "/about#homelab" },
];

let projectLinks = [
	{
		name: "Conquerors of Catan",
		href: "/projects/conquerors-of-catan",
		title: "",
	},
	{ name: "pyCatan", href: "/projects/pycatan", title: "" },
];

async function prefetchData() {
	// Try and grab data if it exists / isn't expired
	let data = await fetchFromCache("REPO_DATA_CACHE");
	if (!data) {
		// Fetch raw data if needed
		const response = await fetch("/data/github-repos", { method: "GET" });
		data = await response.json();
		await cacheData("REPO_DATA_CACHE", data);
	}
}

onMount(async () => {
	// firstPageVisit bypasses cache functions
	const firstPageVisit = localStorage.getItem("ALREADY_VISITED");

	if (!firstPageVisit) {
		quickLinks[0].title = "<-- Start Here!";
		localStorage.setItem("ALREADY_VISITED", true);
	}

	await prefetchData();
});
</script>

<div class="flex justify-center">
    <img src="header-image-original.webp" alt="header" class="sm:mt-8 mt-10 h-auto w-full object-cover">
</div>

<div class="sm:flex sm:justify-between text-gray-700"><p class=" dark:text-gray-100 mt-3">📍Beddgelert, Wales - August 2022</p> <p class=" sm:mt-3 mt-1 dark:text-gray-100">📷 Canon EOS RP 24-105mm</p> </div>

<div class="flex sm:flex-row flex-col">
    <div class="sm:w-[50%] w-full">
        <h3 class="text-2xl font-bold mt-8 sm:mt-12 mb-4 dark:text-gray-50">Quick Links</h3>
        <ul class="grid grid-cols-2 sm:flex sm:flex-col gap-1 list-disc list-inside dark:text-gray-100">
            {#each quickLinks as link}
                <li><a class="underline " href={link.href}>{link.name}</a>{#if link.title} &nbsp; {link.title}{/if}</li>
            {/each}
        </ul>

    </div>

    <div class="sm:w-[50%] w-full">

        <h3 class="text-2xl font-bold mt-8 sm:mt-12 mb-4 dark:text-gray-50">Project Pages</h3>

        <ul class="grid grid-cols-2 sm:flex sm:flex-col gap-1 list-disc list-inside dark:text-gray-100">
            {#each projectLinks as link}
                <li><a class="underline  " href={link.href}>{link.name} </a>{#if link.title} &nbsp; {link.title}{/if}</li>
            {/each}
        </ul>
    </div>
</div>
