import * as azure from "azure-devops-node-api";
import { AZURE_DEVOPS } from "./credentials.js";
import { GitVersionType } from "azure-devops-node-api/interfaces/GitInterfaces";

const orgUrl = "https://dtalm.visualstudio.com/";

const authHandler = azure.getPersonalAccessTokenHandler(AZURE_DEVOPS.token);
const connection = new azure.WebApi(orgUrl, authHandler);
const gitApi = await connection.getGitApi();

async function getDiff(repository, sourceBranchName, targetBranchName) {
    const sourceBranch = {
        version: sourceBranchName,
        versionType: GitVersionType.Branch,
    };
    const targetBranch = {
        version: targetBranchName,
        versionType: GitVersionType.Branch,
    };

    return await gitApi.getCommitDiffs(
        repository,
        "ZubizuLF",
        false,
        0,
        null,
        sourceBranch,
        targetBranch
    );
}

async function createPr(title,sourceBranch,targetBranch,targetRepository) {
    return await gitApi.createPullRequest(
        {
            title: title,
            sourceRefName: sourceBranch,
            targetRefName: targetBranch,
            repository: targetRepository,
        },
        targetRepository,
        "ZubizuLF"
    );
}


export { getDiff, createPr};