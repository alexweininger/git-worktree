# git-worktree

![npm](https://img.shields.io/npm/v/git-worktree)

> Simple Node.js wrapper for git-worktree

## Install

```
$ npm install git-worktree
```

## Usage

```js
import { WorktreeClient } from 'git-worktree';

const client = new WorktreeClient(process.cwd());

client.list();
```
