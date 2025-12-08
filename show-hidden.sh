display dialog "Would you like to show hidden files? " buttons {"Show Hidden Files", "Hide Files"}
set result to button returned of result
if result is equal to " Show Hidden Files " then
do shell script "defaults write com.apple.finder AppleShowAllFiles -bool true"
else
do shell script " defaults write com.apple.finder AppleShowAllFiles -bool false "
end if
do shell script "killall Finder"