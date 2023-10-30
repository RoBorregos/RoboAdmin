import { Octokit } from "@octokit/rest";

async function createBranch(
  owner: string,
  repo: string,
  baseBranch: string,
  newBranch: string,
  token: string,
) {
  const octokit = new Octokit({ auth: token });

  const baseRef = `heads/${baseBranch}`;
  const { data: baseRefData } = await octokit.rest.git.getRef({
    owner,
    repo,
    ref: baseRef,
  });

  const newRef = `refs/heads/${newBranch}`;
  await octokit.rest.git.createRef({
    owner,
    repo,
    ref: newRef,
    sha: baseRefData.object.sha,
  });
}

async function addFileToBranch(
  owner: string,
  repo: string,
  branch: string,
  filePath: string,
  fileContent: Buffer,
  commitMessage: string,
  token: string,
) {
  const octokit = new Octokit({ auth: token });

  const { data: fileData } =
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: commitMessage,
      content: Buffer.from(fileContent).toString("base64"),
      branch,
    });

  return fileData;
}

async function updateFileFromBranch(
  owner: string,
  repo: string,
  branch: string,
  filePath: string,
  fileContent: Buffer,
  commitMessage: string,
  token: string,
) {
  const octokit = new Octokit({ auth: token });

  const { data: existingFileData } = await octokit.rest.repos.getContent({
    owner,
    repo,
    path: filePath,
    ref: branch,
  });

  if (!Array.isArray(existingFileData)) {
    const { data: fileData } =
      await octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: filePath,
        message: commitMessage,
        content: fileContent.toString("base64"),
        sha: existingFileData.sha,
        branch,
      });

    return fileData;
  }
}

async function deleteFileFromBranch(
  owner: string,
  repo: string,
  branch: string,
  filePath: string,
  commitMessage: string,
  token: string,
) {
  const octokit = new Octokit({ auth: token });

  const { data: existingFileData } = await octokit.rest.repos.getContent({
    owner,
    repo,
    path: filePath,
    ref: branch,
  });

  if (!Array.isArray(existingFileData)) {
    const { data: fileData } = await octokit.rest.repos.deleteFile({
      owner,
      repo,
      path: filePath,
      message: commitMessage,
      sha: existingFileData.sha,
      branch,
    });

    return fileData;
  }
}

async function mergeBranch(
  owner: string,
  repo: string,
  baseBranch: string,
  headBranch: string,
  token: string,
) {
  const octokit = new Octokit({ auth: token });

  const { data: mergeData } = await octokit.rest.repos.merge({
    owner,
    repo,
    base: baseBranch,
    head: headBranch,
  });

  return mergeData;
}

async function createPullRequest(
  owner: string,
  repo: string,
  baseBranch: string,
  headBranch: string,
  title: string,
  body: string,
  token: string,
) {
  const octokit = new Octokit({ auth: token });

  const { data: pullRequestData } = await octokit.rest.pulls.create({
    owner,
    repo,
    head: headBranch,
    base: baseBranch,
    title,
    body,
  });

  return pullRequestData;
}

export {
  createBranch,
  addFileToBranch,
  updateFileFromBranch,
  deleteFileFromBranch,
  mergeBranch,
  createPullRequest,
};
