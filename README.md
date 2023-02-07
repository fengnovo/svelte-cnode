# Svelte + Vite
cnode 

### Svelte 学习地址
https://component-party.dev/#webapp-features  
https://www.bilibili.com/video/BV12t4y1K7Kt  
https://www.sveltejs.cn/docs#bind_element_property  

### 部署github
1. settings-Secrets and variables-actions-ACCESS_TOKEN    
2. settings-pages
3. vite.config.js base: '/svelte-cnode/', 
4. .github/workflows/deploy.yaml  
  
```bash
name: GitHub Actions Build and Deploy Demo
on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2.3.1
        with:
          persist-credentials: false
      - name: Install and Build
        run: |
          npm install
          npm run build
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.1
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          BRANCH: gh-pages
          folder: dist
```