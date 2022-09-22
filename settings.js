const taskName = "111111"
const latestComponentsVersion = "74"
const targetFile = "build.gradle.kts";
const sourceBranch = `feature/${taskName}`;
const targetBranch = "development";
const pullRequestTitle = "Update comments-api release version";

const sourcePattern =
    RegExp(`implementation("com.dteknoloji:zubizulf-components:0.0.[^${latestComponentsVersion}]-RELEASE")`);
const replacedText = `implementation(\"com.dteknoloji:zubizulf-components:0.0.${latestComponentsVersion}-RELEASE\")`;

export { targetFile, sourceBranch, targetBranch, pullRequestTitle, sourcePattern, replacedText }