<script>
import { onMount } from "svelte";

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
<div class="text-[14px] dark:text-gray-50 pt-4 pb-8 ">

    <h3 class="text-2xl font-bold mt-5 mb-5 dark:text-gray-50">OpenPGP Public Key</h3>

    <p class="mb-4">
        <strong>Fingerprint:</strong> <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">1C82 0DE2 FF63 8563 3DF6 A850 4829 BBBA 3419 7BFC</code>
    </p>

    <p class="mb-4">
        <strong>Email:</strong> {personalEmailAddress}
    </p>

    <div class="mb-6">
        <p class="font-semibold mb-2">Download or verify:</p>
        <ul class="list-disc list-inside space-y-1">
            <li><a href="Harrison Phillingham (34197BFC) – Public.asc" class="underline text-blue-600 dark:text-blue-400">Download public key (.asc)</a></li>
            <li><a href="https://keys.openpgp.org/search?q=harrison%40phillingham.com" class="underline text-blue-600 dark:text-blue-400">keys.openpgp.org</a></li>
        </ul>
    </div>



    <div class="mb-6" >
        <p class="font-semibold mb-2">What is this?</p>
        <p class="mb-2">
            OpenPGP is an open standard for encryption and digital signatures. GnuPG (GPG) is the most popular open-source implementation, and is the tool I use.
        </p>
        <p class="mb-2">
            When I send an email, or create a commit, I 'sign' it with my private key (which only I have). The recipient or verifier can then check it using my paired public key, to verify that it came from me and hasn't been modified.
        </p>
        <p>
            OpenPGP can also be used to encrypt sensitive messages so only the intended recipient can read them. For this, both people need their own OpenPGP keys.
        </p>

    </div>

    <details class="mt-6">
        <summary class="cursor-pointer font-semibold">View full key</summary>
        <pre class="mt-4 p-4dark:bg-gray-800 rounded overflow-x-auto text-xs">
-----BEGIN PGP PUBLIC KEY BLOCK-----

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
dGSKosfGXGStMT8KlNdDeJE8dW+Wmak=
=G+bA

-----END PGP PUBLIC KEY BLOCK-----

        </pre>
    </details>

</div>
