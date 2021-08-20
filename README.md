# git-worktree

![npm](https://img.shields.io/npm/v/git-worktree) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/alexweininger/git-worktree/CI) ![David](https://img.shields.io/david/alexweininger/git-worktree) ![GitHub](https://img.shields.io/github/license/alexweininger/git-worktree)

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
