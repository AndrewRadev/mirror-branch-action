This is a fork that fixes the node.js engine used from node12 to node16.

---

# mirror-branch action

A Github Action to mirror one branch to another within the same repository

For example, if you've renamed your `master` branch to `main`, but a lot of
links out on the web hard-code the old name, you could mirror the `main` branch
back to `master` so those links keep working.

To use this Action, create a file called `.github/workflows/mirror.yml` with the
following contents:

```yaml
on:
  push:
    branches:
      - 'SOURCE_BRANCH_NAME'

jobs:
  mirror_job:
    runs-on: ubuntu-latest
    name: Mirror SOURCE_BRANCH_NAME branch to DESTINATION_BRANCH_NAME branch
    steps:
    - name: Mirror action step
      id: mirror
      uses: AndrewRadev/mirror-branch-action@main
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        source: 'SOURCE_BRANCH_NAME'
        dest: 'DESTINATION_BRANCH_NAME'

```

With `SOURCE_BRANCH_NAME` and `DESTINATION_BRANCH_NAME` replaced as appropriate.

-----

This is not an officially supported Google product.
