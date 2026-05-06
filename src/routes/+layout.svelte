<script>
import "../app.css";
import { onMount } from "svelte";
import Footer from "$lib/footer.svelte";
import Navbar from "$lib/navbar.svelte";

let { children } = $props();

onMount(() => {
	document.body.style.transition =
		"background-color 0.8s ease, color 0.8s ease";
});
</script>


<div class="max-w-[90vw] min-h-[75vh] sm:min-h-[85vh] mt-3 sm:mt-0 sm:max-w-[60vw] md:max-w-[60vw] lg:max-w-[50vw] xl:max-w-[40vw]  mx-auto mb-5">

    <Navbar/>

    <main class="flex-1">
        {@render children()}
    </main>

</div>


<Footer/>


<style>
    :global(body) {
        background-color: #eae4d8;
        overflow-x: hidden;
    }

    :global(.dark body) {
        background-color: #000000;
    }

    @media screen and (min-width: 480px){
        :global(.dark body) {
            background-color: #151519;
        }
    }

</style>
