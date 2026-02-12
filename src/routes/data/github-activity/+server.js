import { json } from "@sveltejs/kit";
import { Octokit } from "octokit";
import { GITHUB_API_TOKEN } from "$env/static/private";

export async function GET() {
	const octokit = new Octokit({
		auth: GITHUB_API_TOKEN,
	});

	const response = await octokit.request(
		"GET /users/{username}/events/public",
		{
			username: "hphillingham",
			per_page: 50,
			headers: {
				"X-GitHub-Api-Version": "2022-11-28",
				Accept: "application/vnd.github+json",
			},
		},
	);

	return json({
		repos: response.data,
	});
}
