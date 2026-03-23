
<script>
    import {
        ArrowRightOutline,
        ArrowUpRightFromSquareOutline,
        CodeBranchOutline,
        CodeForkOutline,
        CodeOutline,
        EyeOutline,
        RefreshOutline,
        StarOutline
    } from "flowbite-svelte-icons";
    import { onMount } from "svelte";
    import {cacheData, fetchFromCache } from "$lib/data_functions.js";

    const global_retrievedProjectDataOverwrites = {
        pycatan: {
            title:
                "A Python GUI implementation of the board game Catan. Continuation of Conquerors of Catan project.",
            link: "/projects/pycatan",
        },
        conquerors_of_catan: {
            title:
                "Third Year Degree Solo Project, using the MiniMax algorithm to play The Settlers of Catan.",
            link: "/projects/conquerors-of-catan",
        },
        hikers_challenge: {
            title:
                "Climb mountains and earn badges! A demo Android App created as part of an MSc Course.",
            image: "https://media.githubusercontent.com/media/hphillingham/Hikers-Challenge/refs/heads/master/assets/icon-circle-border.png"
        },
        portfolio_v3: {
            title:
                "Third version of a Portfolio, aiming for a simple markdown-inspired theme. Built using SvelteKit and Tailwind.",
        },
        portfolio_v2: {
            title:
                "Portfolio v2, built while at University using Svelte. Single page application.",
            image: "svelte-logo.png",
        },
    };

    let global_extractedRepoData = Object.values({});
    let global_extractedActivityData = Object.values({});
    const global_repoDisplayFilterList = [
        "pyCatan",
        "Conquerors-of-Catan",
        "Portfolio-v3",
        "Hikers-Challenge",
        "Portfolio-v2",
    ];

    const global_repoActivityFilterList = [
        "BeReal-Export-Manager",
        ...global_repoDisplayFilterList
    ];



    let global_forceUpdateAll = false;
    let global_currentActivityLength = 10;
    let global_activityLengthLimit = 50;

    global_extractedActivityData = Object.values({});

    function increaseActivityDataLength(){
        global_currentActivityLength = global_currentActivityLength + 10;
        if (global_currentActivityLength >= global_activityLengthLimit) {
            document.getElementById('ID_loadMoreActivityButton').classList.add('hidden')
            document.getElementById('ID_endOfActivityText').classList.remove('hidden')
        }
    }


    async function getPublicGitHubRepos() {
        document.getElementById("arrow_icon_projects").classList.remove("hidden");

        global_extractedRepoData = Object.values({});

        let data = await fetchFromCache("REPO_DATA_CACHE", global_forceUpdateAll);
        if (!data) {
            const response = await fetch('/data/github-repos', { method: "GET" });
            data = await response.json();
            await cacheData("REPO_DATA_CACHE", data, 60);
        }


        global_extractedRepoData = data.repos
            .filter((repo) => global_repoDisplayFilterList.includes(repo.name))
            .map((repo) => {
                const overwriteKey = repo.name.toLowerCase().replace(/-/g, "_");
                const repoOverwriteData = global_retrievedProjectDataOverwrites[overwriteKey];
                return {
                    name: repo.name.replaceAll("-", " "),
                    title:
                        repoOverwriteData?.title || repo.title?.split("[")[0] || "",
                    image:
                        repoOverwriteData?.image ||
                        "https://raw.githubusercontent.com/hphillingham/" +
                            repo.name +
                            "/refs/heads/master/icon.png",
                    link: repoOverwriteData?.link || repo.html_url,
                    last_updated: repo.pushed_at,
                    stars: repo.stargazers_count,
                };
            })
            .sort((a, b) => {
                const indexA = global_repoDisplayFilterList.indexOf(a.name.replaceAll(" ", "-"));
                const indexB = global_repoDisplayFilterList.indexOf(b.name.replaceAll(" ", "-"));
                return indexA - indexB;
            });

        await new Promise((resolve) => {
            setTimeout(resolve, 150);
        });

        document.getElementById("arrow_icon_projects").classList.add("hidden");
    }

    function getDisplayDate(inputDateString, relativeDate = true){

        const currentDateTimeObject = new Date()

        if (relativeDate){

            const daysAgo = Math.floor((Date.parse(currentDateTimeObject) - Date.parse(inputDateString)) / 86400000);

            if (daysAgo === 0) return "Today";
            if (daysAgo === 1) return "Yesterday";
            if (daysAgo >= 2 && daysAgo <= 6) return `${daysAgo} days ago`;
            if (daysAgo >= 7 && daysAgo <= 31) return `${Math.floor(daysAgo/7)} week${Math.floor(daysAgo/7) > 1 ? 's' : ''} ago`;
            if (daysAgo >= 31 && daysAgo <= 365) return `${Math.floor(daysAgo/30.5)} month${Math.floor(daysAgo/30.5) > 1 ? 's' : ''} ago`;
            return "Over a year ago";

        } else {

            const currentMonth = String(currentDateTimeObject.getMonth() + 1).padStart(2, "0");
            const currentDate = String(currentDateTimeObject.getDate()).padStart(2, "0");
            const compareDate = `${currentDateTimeObject.getFullYear()}-${currentMonth}-${currentDate}`

            return (() => {
                // Split at the T to get the date
                if (inputDateString.split('T')[0] === compareDate) {
                    return inputDateString.split('T')[1].replace('Z', '').split(":").slice(0, 2).join(":")
                } else  {
                    return inputDateString.split('T')[0].split('-').reverse().join('/')
                }
            })();

        }


    }

    async function getCommitsForRepos() {
        // NOTE: Stores already formatted data
        let allCommitActivity = [];

        for (const repo of global_repoActivityFilterList) {
            const repoTarget = repo.toLowerCase();
            const repoCommitActivity = [];

            try {
                let existingData = await fetchFromCache(`COMMIT_DATA_${repoTarget}`, global_forceUpdateAll);

                if (!existingData) {
                    const response_branches = await fetch(`/data/repo-branches?repo=${repoTarget}`, { method: "GET" });
                    const branchesObject = await response_branches.json();
                    let repoCommits = [];

                    for (const branchNames of Object.values(branchesObject)) {
                        for (const branchName of branchNames) {
                            const response = await fetch(`/data/github-commits?repo=${repoTarget}&branch=${branchName.name}`, { method: "GET" });
                            const branchCommitsResponse = await response.json();

                            // This currently stores the formatted data rather than the raw data
                            const formattedCommits = branchCommitsResponse.commits.map((commit) => ({
                                event: 'commit',
                                sort_time: commit.commit.committer.date,
                                display_time: getDisplayDate(commit.commit.committer.date),
                                display_proper_time: getDisplayDate(commit.commit.committer.date, false),
                                repository: repoTarget,
                                base_title_text: `Made a commit in `,
                                branch: branchName.name,
                                description: commit.commit.message,
                                icon: 'ArrowRightOutline',
                                verified: commit.commit.verification.verified,
                                html_url: commit.html_url
                            }));

                            repoCommits.push(...formattedCommits);
                        }
                    }

                    existingData = repoCommits;
                    await cacheData(`COMMIT_DATA_${repoTarget}`, repoCommits);
                }

                // Rehydrate the icon
                existingData = existingData.map((commit) => ({
                    ...commit,
                    icon: ArrowRightOutline
                }))

                repoCommitActivity.push(...existingData);
                allCommitActivity = [...allCommitActivity, ...repoCommitActivity];
                global_extractedActivityData = [...global_extractedActivityData, ...repoCommitActivity]
                    .sort((a, b) => new Date(b.sort_time) - new Date(a.sort_time))
            } catch (error) {
                console.error(`Error fetching commits for ${repoTarget}:`, error);
            }
        }

        return allCommitActivity;
    }

    async function getGitHubActivity() {

        document.getElementById("arrow_icon_activity").classList.remove("hidden");

        let data = await fetchFromCache("ACTIVIY_DATA_CACHE", global_forceUpdateAll);
        if (!data) {
            const response = await fetch('/data/github-activity', { method: "GET" });
            data = await response.json();
            await cacheData("ACTIVIY_DATA_CACHE", data, 720);
        }

        global_extractedActivityData = data.repos
            .filter((repo) => repo.type !== 'PushEvent' && repo.type !== 'BranchDeleteEvent' && repo.type !== 'DeleteEvent')
            .map((repo) => {

            const repo_name = repo.repo.name.replace('hphillingham/', '')

            const base_title_text = (() => {
                switch (repo.type) {
                    case 'PushEvent': return `Pushed to `
                    case 'WatchEvent': return `Watched `
                    case 'CreateEvent': return `Created Branch '${repo.payload.ref}' in `
                    case 'PullRequestEvent': return `Created Pull Request #${repo.payload.number} in `
                    case 'ForkEvent': return 'Forked'
                    default: return "An Event Happened"
                }
            })();


            const icon = (() => {
                switch (repo.type) {
                    case 'PushEvent': return ArrowRightOutline;
                    case 'CreateEvent': return CodeBranchOutline;
                    case 'WatchEvent': return EyeOutline
                    case 'PullRequestEvent': return CodeBranchOutline
                    case 'ForkEvent': return CodeForkOutline
                    default: return CodeBranchOutline;
                }

            })();

/*            const html_url = (() => {
                switch (repo.type) {
                    case 'PushEvent': return ArrowRightOutline;
                    case 'CreateEvent': return CodeBranchOutline;
                    case 'WatchEvent': return `https://github.com/${repo.repo.name}`
                    case 'PullRequestEvent': return CodeBranchOutline
                    default: return CodeBranchOutline;
                }

            })();*/

            return {
                event: repo.type.replace('Event', ''),
                sort_time: repo.created_at,
                display_time: getDisplayDate(repo.created_at),
                display_proper_time: getDisplayDate(repo.created_at, false),
                repository: repo_name,
                base_title_text: base_title_text,
                description: null,
                icon,
                verified: false,
                html_url: `https://github.com/${repo.repo.name}`
            };
        })

        await(getCommitsForRepos())

        global_extractedActivityData = global_extractedActivityData.slice(0, global_activityLengthLimit)

        document.getElementById('ID_loadMoreActivityButton').classList.remove('hidden')
        document.getElementById("arrow_icon_activity").classList.add("hidden");
    }

    async function forceUpdateData(){
        global_forceUpdateAll = true;
        global_extractedActivityData = []
        document.getElementById("arrow_icon_projects").classList.remove("hidden");
        document.getElementById("arrow_icon_activity").classList.remove("hidden");
        document.getElementById('ID_loadMoreActivityButton').classList.add('hidden')
        await getPublicGitHubRepos()
        await getGitHubActivity()
        global_forceUpdateAll = false;

    }

    onMount(async () => {
        // Fetch public repo data first, as that is the first to appear on the page
        await getPublicGitHubRepos();

        // If data is cached, load it straight away. Else wait, and then load it.
        let data = await fetchFromCache("ACTIVIY_DATA_CACHE");
        if (!data) {
            setTimeout(async () => {
                await getGitHubActivity();
            }, "500");
        } else {
            await getGitHubActivity();
        }
    });

</script>


<div class="m-auto dark:text-gray-50">
    <div class="flex">
        <h1 class="text-3xl font-bold mt-5 mb-5 dark:text-gray-50">Projects</h1>
        <button type="button" class="mt-auto mb-auto ml-2 translate-y-[2.5px] hover:cursor-pointer" onclick={getPublicGitHubRepos}>
            <RefreshOutline id="arrow_icon_projects" class="w-6 dark:text-gray-50 text-gray-600 hidden animate-spin"></RefreshOutline>
        </button>

    </div>

    <p class="mb-5 ml-0.5 text-gray-900 sm:text-base text-[14px] dark:text-gray-50">Projects and Recent Activity listed here are pulled live from my public <a href="https://github.com/hphillingham" class="underline ">GitHub profile</a> via GitHub's API. Data is cached for up to 60 minutes. Force update it by clicking  <button type="button" onclick="{forceUpdateData}" class="underline cursor-pointer">here</button>. </p>

    <hr class="w-full m-auto dark:text-gray-100 mb-5" />

    <p id='connection_error' class="hidden">Connection Error - Please try again later.</p>

    <!-- Projects Section -->

    <ul class="ml-1">
        {#each global_extractedRepoData as project}
            <li class="sm:mb-7 mb-5">
                <div class="flex gap-4 items-start w-full">
                    {#if project.image === 'git-default'}
                        <div class="h-auto sm:w-20 w-15 ">
                            <CodeOutline class="m-auto h-auto sm:w-17.5 w-10 border-2 border-gray-500 rounded-xl"></CodeOutline>
                        </div>
                    {:else}
                        <img src={project.image} alt={project.name} class="mt-1 h-auto sm:w-20 w-15 object-cover rounded-md">
                    {/if}
                    <div class="flex flex-col w-full">
                        <div class="flex flex-flow justify-between ">
                            {#if project.link.includes('https') }
                                <a href={project.link} class="text-blue-500 hover:underline sm:text-[18px] text-[16px] sm:mb-0 mb-0 sm:mt-0 flex content-center">{project.name} <ArrowUpRightFromSquareOutline class="w-4 h-auto ml-2" /></a>
                            {:else}
                                <a href={project.link} class="underline hover:underline sm:text-[18px] text-[16px] sm:mb-0 mb-0 sm:mt-0 flex content-center">{project.name}</a>
                            {/if}

                            <div class="sm:mr-2 m-1 flex flex-row items-center">
                                <StarOutline class="sm:w-4 w-3.5 dark:text-gray-50 text-gray-600 sm:mr-1 mr-0.5"></StarOutline>
                                <p class="sm:mr-3 mr-2 text-gray-900 sm:text-[15px] text-[13px] dark:text-gray-100 w-1 text-center">{project.stars}</p>
                                <!--<EyeOutline class="w-4 dark:text-gray-50 text-gray-600 sm:mr-1 mr-0.5"></EyeOutline>
                                <p class="text-gray-900 sm:text-base text-[13px] dark:text-gray-100">{project.watchers}</p>-->
                            </div>

                        </div>

                        <p class="text-gray-900 sm:text-base text-[14px] dark:text-gray-100">{project.title}</p>
                    </div>
                </div>
            </li>
        {/each}
    </ul>

    <hr class="w-full m-auto dark:text-gray-100 mb-5" />

    <div class="flex">
        <h1 class="text-3xl font-bold mt-5 mb-7 dark:text-gray-50">Recent Activity</h1>
        <button type="button" class="mt-auto mb-auto ml-2 hover:cursor-pointer" onclick={getGitHubActivity}>
            <RefreshOutline id="arrow_icon_activity" class="w-6 dark:text-gray-50 text-gray-600 hidden animate-spin"></RefreshOutline>
        </button>

    </div>

    <!-- Activity Section -->

    <ul class="ml-1 mb-5 sm:mb-12">
        {#each global_extractedActivityData.slice(0,global_currentActivityLength) as activity}
            <li class="sm:mb-5 mb-4">
                <div class="flex gap-2 items-start w-full">
                    <svelte:component this={activity.icon} class="sm:w-7 w-6 h-auto dark:text-gray-50 text-gray-900 -ml-1.5"/>
                    <div class="flex flex-col w-full">
                        <div class="flex flex-flow justify-between ">
                            <div>
                                <p class="text-gray-900 sm:text-[16px] text-[14px] font-semibold dark:text-gray-100 w-[3/4]">{activity.base_title_text} <a href="{activity.html_url}" target='_blank' class="cursor-pointer hover:underline">{activity.repository}{#if activity.branch}/{activity.branch}{/if}</a></p>
                                <p class="text-gray-900 sm:text-base text-[13px] dark:text-gray-100 w-[3/4]">{activity.description}</p>
                            </div>

                            <p class="sm:mr-3 mr-1 text-gray-900 sm:text-[14px] text-[12px] dark:text-gray-100 sm:mt-0 mt-1">
                                <span class="hidden sm:inline">{activity.display_time}</span>
                                <span class="sm:hidden">{activity.display_time.includes('/') ? activity.display_time.split('/').slice(0, 2).join('/') : activity.display_time}</span>
                            </p>

                        </div>

                    </div>

                </div>

            </li>
        {/each}
    </ul>

    <div class="width-full flex justify-center mt-8 sm:mt-4 sm:mb-16 mb-12">
        <button type="button" id="ID_loadMoreActivityButton" class="underline content-center cursor-pointer hidden sm:text-[16px] text-[14px]" onclick="{increaseActivityDataLength}">Load More</button>
        <p id="ID_endOfActivityText" class=" text-gray-900 sm:text-[16px] text-[14px] font-semibold dark:text-gray-100 hidden">You've reach the end</p>
    </div>


</div>
