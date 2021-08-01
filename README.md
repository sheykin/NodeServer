# Node Server

[![GitHub](https://img.shields.io/github/license/sheykin/NodeServer?label=license&style=flat-square)](LICENSE.md)
[![David](https://img.shields.io/david/sheykin/NodeServer?style=flat-square)](https://david-dm.org/sheykin/NodeServer)


`Node Server` is REST API server implementation built on top `Node.js` and `Express.js` with `MySQL`

## Running project

## Manual

You need to have [Node.js](https://nodejs.org) and [MySQL](https://www.mysql.com/) installed.

### Node setup on macOS

```sh
# Update Homebrew before installing all dependencies
brew update

# Install Node (+npm) with Homebrew
brew install node

# Install npm dependencies in project folder
npm install
```

### MySQL setup on macOS

```sh
# Install MySQL with Homebrew
brew install mysql

#run MySQL server
mysql.server start
```

### Run server

```sh
npm run serve
# alias for
node ./server.js
```

