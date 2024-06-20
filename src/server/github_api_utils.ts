import { App } from "octokit";
import { env } from "rbrgs/env.mjs";

const privateKey = () => Buffer.from(env.GITHUB_APP_PRIVATE_KEY, 'base64').toString('ascii');

async function getInstallationId(owner: string, repo: string) {
  console.log(env.GITHUB_APP_ID, privateKey());

  const app = new App({
    appId: env.GITHUB_APP_ID,
    privateKey: privateKey(),
  });

  const installationResponse = await app.octokit.request(
    "GET /repos/{owner}/{repo}/installation",
    {
      owner,
      repo,
    },
  );

  const installationId = installationResponse.data.id;
  console.log(installationId);

  return installationId;
}

async function createBranch(
  owner: string,
  repo: string,
  baseBranch: string,
  newBranch: string,
) {
  const app = new App({
    appId: env.GITHUB_APP_ID,
    privateKey: privateKey(),
  });

  const octokit = await app.getInstallationOctokit(
    Number(env.GITHUB_APP_INSTALLATION_ID),
  );

  const { data: baseRef } = await octokit.request(
    "GET /repos/{owner}/{repo}/git/ref/{ref}",
    {
      owner,
      repo,
      ref: `heads/${baseBranch}`,
    },
  );

  if (!baseRef.object) {
    throw new Error("base ref not found");
  }

  const res = await octokit.request("POST /repos/{owner}/{repo}/git/refs", {
    owner,
    repo,
    ref: `refs/heads/${newBranch}`,
    sha: baseRef.object.sha,
  });

  console.log(res);
  return res;
}

async function addFileToBranch(
  owner: string,
  repo: string,
  branch: string,
  path: string,
  content: string,
  message: string,
) {
  const app = new App({
    appId: env.GITHUB_APP_ID,
    privateKey: privateKey(),
  });

  const octokit = await app.getInstallationOctokit(
    Number(env.GITHUB_APP_INSTALLATION_ID),
  );

  try {
    await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner,
      repo,
      path,
      ref: branch,
    });

    console.log("file already exists");
  } catch (error: unknown) {
    // console.log("found error", error);
    if ((error as { status: number }).status !== 404) {
      throw error;
    }

    const { data: result } = await octokit.request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path,
        message,
        content: Buffer.from(content).toString("base64"),
        branch,
      },
    );

    return result;
  }
}

async function updateFileFromBranch(
  owner: string,
  repo: string,
  branch: string,
  path: string,
  content: string,
  message: string,
) {
  const app = new App({
    appId: env.GITHUB_APP_ID,
    privateKey: privateKey(),
  });

  const octokit = await app.getInstallationOctokit(
    Number(env.GITHUB_APP_INSTALLATION_ID),
  );

  const { data, status } = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner,
      repo,
      path,
      ref: branch,
    },
  );

  if (status !== 200) {
    throw new Error("file not found");
  }
  if (Array.isArray(data)) {
    throw new Error("unexpected data type");
  }

  const { data: result } = await octokit.request(
    "PUT /repos/{owner}/{repo}/contents/{path}",
    {
      owner,
      repo,
      path,
      message,
      content: Buffer.from(content).toString("base64"),
      branch,
      sha: data.sha,
    },
  );

  return result;
}

async function createPullRequest(
  owner: string,
  repo: string,
  baseBranch: string,
  newBranch: string,
  title: string,
  body: string,
) {
  const app = new App({
    appId: env.GITHUB_APP_ID,
    privateKey: privateKey(),
  });

  const octokit = await app.getInstallationOctokit(
    Number(env.GITHUB_APP_INSTALLATION_ID),
  );

  const { data: pullRequest } = await octokit.request(
    "POST /repos/{owner}/{repo}/pulls",
    {
      owner,
      repo,
      head: newBranch,
      base: baseBranch,
      title,
      body,
    },
  );

  console.log(pullRequest);
  return pullRequest;
}

export {
  getInstallationId,
  createBranch,
  addFileToBranch,
  updateFileFromBranch,
  createPullRequest,
};
