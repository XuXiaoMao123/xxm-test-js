#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

# 初始化 git
git init
git add .
git commit -m 'deploy'

# 推送到 GitHub 的 gh-pages 分支
git push -f git@github.com:XuXiaoMao123/xxm-test-js.git main:gh-pages

# 返回到项目根目录
cd ../../