# sg-cli

> 原名 `sg-cli`，因 npm 包名已被占用，无奈改名为 `"""{{packageName}}"""`

## 介绍

1. 快速创建项目 `sg create <project-name>` 具体项目模板请查看 `sg template`
2. 添加 eslint prettier 配置 `sg lint`

## 安装

```bash
npm install -g """{{packageName}}"""
```

> 注意 必须在管理员权限下运行

## 使用

```bash
sg
```

## 命令

```bash
sg test # 测试是否可以正常使用
sg add # 添加一些配置文件 eslint prettier editorconfig 等
sg template # 查看模板列表 （模板会随时更新）
sg create <project-name> # 创建项目
sg lint # 添加 eslint prettier editorconfig 配置
sg commit|cz # 交互式生成commit message
sg help # 查看帮助
```
