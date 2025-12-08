# Rebasing

https://git-scm.com/book/en/v2/Git-Branching-Rebasing

https://help.github.com/articles/about-git-rebase/

https://help.github.com/articles/using-git-rebase-on-the-command-line/

https://stackoverflow.com/questions/6934752/combining-multiple-commits-before-pushing-in-git

```sh
git log --oneline

634bc6b commit-C
8054b34 commit-B
15b36f6 commit-A
31a6004 older-commits
...
```

Fix an issue in commit-A, Then:

```sh
git commit --fixup 15b36f6
```

### squash/fixup commit-B and commit-C into commit-A
```sh
git rebase --interactive HEAD~3
```

Change all the pick to `squash` (or `s`) except the first one. `squash` allows you to change commit messages. To Keep the message as `commit-A` for all commits, use `fixup` (or `f`)  

```sh
pick 15b36f6 commit-A
fixup 8054b34 commit-B
fixup 634bc6b commit-C
```

Let's log out the messages:
 
```sh
git log --oneline

afdc4e9 commit-A
31a6004 older-commits
...
```

### git remove a file from a commit

https://stackoverflow.com/questions/12481639/remove-files-from-git-commit

### rebase --autosquash 

http://fle.github.io/git-tip-keep-your-branch-clean-with-fixup-and-autosquash.html

```sh
git rebase -i --autosquash 15b36f6
```

### rebase

```sh
git checkout branch-1
```

make and commit changes on branch-1

```sh
git checkout master
```

make and commit changes on master, then

```sh
git checkout branch-1

git rebase master
```

if any conflict, resolve them, then 

```sh
git add .

git rebase --continue
```

After all changes on branch

```sh
git checkout master

git merge branch-1
```

## rebase squash
https://stackoverflow.com/questions/6934752/combining-multiple-commits-before-pushing-in-git

Run this command specifying which branch you want to rebase against
```sh
git rebase -i master
```

```sh
pick 16b5fcc Code in, tests not passing
pick c964dea Getting closer
pick 06cf8ee Something changed
pick 396b4a3 Tests pass
pick 9be7fdb Better comments
pick 7dba9cb All done
```

Change all the pick to squash (or s) except the first one:

```sh
pick 16b5fcc Code in, tests not passing
squash c964dea Getting closer
squash 06cf8ee Something changed
squash 396b4a3 Tests pass
squash 9be7fdb Better comments
squash 7dba9cb All done
```

	
Use fixup instead of squash to skip the step of creating a new commit message. The last commit message("All done") will be used automatically for the final commit created by rebase

```sh
pick 16b5fcc Code in, tests not passing
fixup c964dea Getting closer
fixup 06cf8ee Something changed
fixup 396b4a3 Tests pass
fixup 9be7fdb Better comments
fixup 7dba9cb All done
```


```sh

```


```sh

```

## rebase --interactive
https://help.github.com/articles/using-git-rebase-on-the-command-line/

```sh
git rebase --interactive HEAD~7
```

```sh
pick 1fc6c95 Patch A
pick 6b2481b Patch B
pick dd1475d something I want to split
pick c619268 A fix for Patch B
pick fa39187 something to add to patch A
pick 4ca2acc i cant' typ goods
pick 7b36971 something to move before patch B
```

```sh
pick 1fc6c95 Patch A
squash fa39187 something to add to patch A
pick 7b36971 something to move before patch B
pick 6b2481b Patch B
fixup c619268 A fix for Patch B
edit dd1475d something I want to split
reword 4ca2acc i cant' typ goods
```

```sh
git push origin master --force
```


```sh

```


```sh

```


```sh

```


```sh

```


```sh

```


```sh

```
