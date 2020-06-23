import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
  try {
    const githubToken = core.getInput('github-token');
    const sourceBranchName = core.getInput('source');
    const destBranchName = core.getInput('dest');

    const octokit = github.getOctokit(githubToken);
    const sourceBranchTip = await octokit.git.getRef({
      ...github.context.repo,
      ref: `heads/${sourceBranchName}`,
    });

    if (sourceBranchTip.data.object.type !== "commit") {
      throw new Error(`Expected branch ${sourceBranchName} to resolve to a commit. Got a ${sourceBranchTip.data.object.type}.`);
    }

    const sourceBranchSha = sourceBranchTip.data.object.sha;

    console.log(`Pushing ${sourceBranchName} (${sourceBranchSha}) to ${destBranchName}.`);

    const result = await octokit.git.updateRef({
      ...github.context.repo,
      ref: `heads/${destBranchName}`,
      sha: sourceBranchSha,
    })

    console.log(`Set ${result.data.ref} to ${result.data.object.sha}.`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
