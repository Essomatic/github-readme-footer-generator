import { config } from "dotenv";
import { getOrganizationRepositories } from "./utils/github-organization-utils";
import { displaySelectedRepositories, updateReadmeAndAutoMergeRepositories as updateRepositoriesReadmesAndPullMerge } from "./utils/github-utils";
import { footer } from "./custom-footer";
import { isValidRepositories, logRed } from "./utils/utils";
import { Repository } from "./types/types";
import { promptAndLoadFailedRepositories } from "./utils/repository-error-file-utils";

config();
const TOKEN: string | undefined = process.env.GITHUB_TOKEN;
const organization: string | undefined = process.env.ORG;
const updateBranchName: string | undefined = process.env.UPDATE_BRANCH_NAME;
const overideRepositoriesJSON = process.env.OVERRIDE_REPOS;

/**
 * Main function that coordinates the script to update README files, create pull requests, and auto-merge them.
 * The function checks for required environment variables, handles override repositories if provided, loads repositories from file
 * or fetches all public repositories of the specified organization.
 * 
 */
async function main(): Promise<void> {
  try {
    checkEnvironmentVariables();

    let repositoriesOBJ: Repository[];
    let loadedFromFile;

    // Can be used to set repositories manually or for testing. OVERRIDE_REPOS env should be JSON object as string: '[{"owner":"value1","repository":"value2"},...]'
    // Either uses overrideRepositories if set, loads from file if found and user accepts, or fetches organization's public repositories
    if (overideRepositoriesJSON) {
      const overrideRepositoriesOBJ = JSON.parse(overideRepositoriesJSON);
      repositoriesOBJ = overrideRepositoriesOBJ;
    } else if ((loadedFromFile = promptAndLoadFailedRepositories())) {
      repositoriesOBJ = loadedFromFile;
    } else {
      repositoriesOBJ = await getOrganizationRepositories(organization!);
    }

    if (!isValidRepositories(repositoriesOBJ)) {
      console.log(logRed("Empty or invalid array of repositories. Aborting..."));
      return;
    }

    displaySelectedRepositories(repositoriesOBJ);
    await updateRepositoriesReadmesAndPullMerge(repositoriesOBJ, footer);

  } catch (error) {
    console.error("Error in main function:", error);
  }
}

/**
 * Checks the required environment variables and throws errors if any are missing.
 * 
 * @throws Throws an error if any required environment variable is missing.
 */
function checkEnvironmentVariables(): void {
  if (!TOKEN) {
    throw new Error(logRed("GitHub token is not defined. Please set the GITHUB_TOKEN environment variable."));
  }
  if (!organization) {
    throw new Error(logRed("Organization name is not defined. Please set the ORG environment variable."));
  }
  if (!updateBranchName) {
    throw new Error(logRed("Name for Updater branch that is used to make pull request from is not defined. Please set the updateBranchName environment variable."));
  }
  if (overideRepositoriesJSON) {
    console.log(logRed("Override repositories are set in the env and they will be used.\n"));
  }
}

// Entry point
main();
