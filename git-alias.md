# alias

git config --global alias.st 'status --short --branch'
git config --global alias.aa 'add --all'


### Change git editor

https://stackoverflow.com/questions/2596805/how-do-i-make-git-use-the-editor-of-my-choice-for-commits

`git config --global core.editor "vim"`


### shell commands

https://stackoverflow.com/a/43286209/699091

For those looking to execute **shell commands** in a git alias, for example, `git pof` to push force the current branch to my origin repo, effectively, `git push origin -f <current-branch>`:

```sh
[alias]
    pof = !git push origin -f $(git branch | grep \\* | cut -d ' ' -f2)
```
Where the `$(git branch | grep \\* | cut -d ' ' -f2)` command returns the current branch.

### More

https://stackoverflow.com/questions/4298960/git-add-and-commit-in-one-command

### Sample Aliases

```sh
[user]
    name = my name
    email = me@example.com
[core]  
    editor = vi 
[alias]
    aa = add --all
    bv = branch -vv
    ba = branch -ra
    bd = branch -d
    ca = commit --amend
    cb = checkout -b
    cm = commit -a --amend -C HEAD
    ci = commit -a -v
    co = checkout
    di = diff
    ll = log --pretty=format:"%C(yellow)%h%Cred%d\\ %Creset%s%Cblue\\ [%cn]" --decorate --numstat
    ld = log --pretty=format:"%C(yellow)%h\\ %C(green)%ad%Cred%d\\ %Creset%s%Cblue\\ [%cn]" --decorate --date=short --graph
    ls = log --pretty=format:"%C(green)%h\\ %C(yellow)[%ad]%Cred%d\\ %Creset%s%Cblue\\ [%cn]" --decorate --date=relative
    mm = merge --no-ff
    st = status --short --branch
    tg = tag -a 
    pu = push --tags
    un = reset --hard HEAD  
    uh = reset --hard HEAD^
   [color]  
    diff = auto  
    status = auto  
    branch = auto 
   [branch]  
    autosetuprebase = always
```
