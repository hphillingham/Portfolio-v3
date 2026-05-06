
<script>
import { LockOutline, MoonOutline, SunOutline } from "flowbite-svelte-icons";
import { onMount } from "svelte";
import { versionNumber } from "$lib/version_number.js";

import { changeTheme, initialSetTheme } from "./theme_functions";

let footerExtension = "";
let repoURL = "https://github.com/hphillingham/Portfolio-v3";

onMount(() => {
	initialSetTheme();
	if (
		document.location.href.toString().indexOf("pre.harrison.phillingham.com") >
		-1
	) {
		footerExtension = "pre-release ";
		repoURL = "https://github.com/hphillingham/Portfolio-v3/tree/development";
	}
});
</script>

<div class="flex flex-col justify-center items-center content-center align-middle left-0 bottom-1 right-0 p-4 pb-8 pt-15 sm:mb-5 mb-2 align-content-center select-none sm:text-[13px] text-[12px]">
    <div class="flex">
        <a href="{repoURL}" target="_blank" class="flex items-center dark:text-gray-50">
            <img src="https://cdn.simpleicons.org/git" alt="git_logo" class="h-5 w-auto mr-2 m-auto">
            Source ({footerExtension}v{versionNumber})
        </a>
        <button class="hidden sm:flex flex-row" onclick={changeTheme} style="cursor: pointer; ">
            <MoonOutline id="moon_icon" class="h-4 w-auto m-auto ml-2 hidden dark:text-gray-50" />
            <SunOutline id="sun_icon" class="h-4 w-auto m-auto ml-2 hidden dark:text-gray-50" />
        </button>


    </div>
    <div class="flex flex-col justify-center items-center content-center align-middle ">
        <div class="flex items-center mt-2">
            <LockOutline class="h-4 w-auto dark:text-gray-50" />
            <a href="/openpgp" class="ml-1 dark:text-gray-50">Public Key</a>
        </div>
    </div>

</div>
