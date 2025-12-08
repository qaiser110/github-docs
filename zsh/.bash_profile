alias i='npm install'
alias un='npm un'
alias id='npm install --save-dev'
alias ig='npm install --global'
alias t='npm test'
alias r='npm run'
alias aw='aada login -n'
alias aw2='aws-azure-login --mode gui'
alias s3ls='aws s3 ls ss-wcms-iapi-primary-bucket-preview-develop'
alias mx='mobx-devtools'
alias jm='open /usr/local/bin/jmeter'

eval 'keychain --eval --agents ssh --inherit any id_rsa'

export WEBIDE_PROPERTIES=~/.idea_cache

export PATH="/usr/local/opt/python/libexec/bin:$PATH"

export PATH="/usr/local/opt/openssl/bin:$PATH"
export LDFLAGS="-L/usr/local/opt/openssl/lib"
export CPPFLAGS="-I/usr/local/opt/openssl/include"
export PKG_CONFIG_PATH="/usr/local/opt/openssl/lib/pkgconfig"

alias m5='openssl md5 -binary $(pbpaste) | base64'

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# The next line updates PATH for the Google Cloud SDK.
if [ -f '/Users/abbasq6v/Downloads/google-cloud-sdk/path.bash.inc' ]; then . '/Users/abbasq6v/Downloads/google-cloud-sdk/path.bash.inc'; fi

# The next line enables shell command completion for gcloud.
if [ -f '/Users/abbasq6v/Downloads/google-cloud-sdk/completion.bash.inc' ]; then . '/Users/abbasq6v/Downloads/google-cloud-sdk/completion.bash.inc'; fi
