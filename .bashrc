NPM_PACKAGES="${HOME}/.npm-packages"
NODE_PATH="$NPM_PACKAGES/lib/node_modules:$NODE_PATH"
PATH="$NPM_PACKAGES/bin:$PATH"

# Unset manpath so we can inherit from /etc/manpath via the `manpath` command
unset MANPATH # delete if you already modified MANPATH elsewhere in your config
export MANPATH="$NPM_PACKAGES/share/man:$(manpath)"
export BLUEBIRD_LONG_STACK_TRACES=1 BLUEBIRD_WARNINGS=1

PATH=$PATH:/Applications/Postgres.app/Contents/Versions/latest/bin
PATH=$PATH:/usr/local/Cellar/node/7.0.0/bin

export GOPATH=$HOME/Documents/dev/go
export REACT_EDITOR=ws

export NVM_DIR="/Users/abbasq6v/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

export NODE_ENV=test
