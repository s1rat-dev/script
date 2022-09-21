
const { targetFiles } = require("./files");
const findInFiles = require("find-in-files");
const replaceInFiles = require("replace-in-files")
const fs = require("fs")
const { createPr } = require("./azure");
const {targetFile, replacedText, sourcePattern, sourceBranch, pullRequestTitle, targetBranch} = require("./settings");
const exec = require("child_process").exec


targetFiles.forEach((x => {
    fs.promises.opendir(`./${x}`).then(async function () {
        exec("git pull origin");
        const result = await findInFiles.find(sourcePattern, targetFile, "?");
        if (result.count > 0) {
            exec(`git checkout -b ${sourceBranch}`);
            const options = {
                files: targetFile,
                from: sourcePattern,
                to: replacedText,
            };
            replaceInFiles(options)
                .then(exec(`git add ${targetFile}`))
                .then(exec("git commit"))
                .then(createPr(pullRequestTitle,sourceBranch,targetBranch,x))

        }
    });
}))
