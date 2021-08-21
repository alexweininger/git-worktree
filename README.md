# git-worktree

![npm](https://img.shields.io/npm/v/git-worktree) ![npm bundle size](https://img.shields.io/bundlephobia/min/git-worktree) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/alexweininger/git-worktree/CI)

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
