# 采购需求工作台前端

## 技术栈

|组件|版本|用途|
|---|---:|---|
|Vue|3.5.x|前端应用框架，Composition API|
|Vite|6.0.x|开发服务器和构建工具|
|TypeScript|5.7.x|类型安全|
|Vue Router|4.5.x|路由与权限导航守卫|
|Pinia|2.2.x|认证、用户和角色状态|
|Element Plus|2.9.x|Vue 3 组件库：表单、表格、上传、对话框、菜单|
|Axios|1.7.x|与 FastAPI 通信、自动注入令牌|

RBAC 前端实现由 `auth` store 保存登录用户角色，路由的 `meta.permissions` 声明查看权限，导航守卫拒绝无权限访问；菜单也按权限过滤。它只改善体验，最终权限裁决始终由后端 Casbin 完成。

## 启动

前置条件：Node.js **18.0+**（Vite 6 要求）。当前终端默认的 Node 12.14.0 低于该要求，需先切换或升级 Node 后再运行：

```bash
cp .env.example .env
npm install
npm run dev
```

默认地址为 `http://localhost:5173`，并请求 `http://localhost:8000/api/v1`。启动后使用后端提供的演示用户登录，例如 `buyer / Buyer123!`。

## 结构与业务对接

```text
src/
  api/        # Axios 实例与 FastAPI 契约
  router/     # 路由及 RBAC 导航守卫
  stores/     # Pinia 认证/角色状态
  views/      # 登录、草稿工作台、申请、主数据
```

脚手架已建立与后端一致的认证、角色、菜单和 API 客户端边界。后续将需求页面拆为草稿编辑、AI 对话、附件、候选选择、校验提交、申请详情/复核以及管理员主数据页面；接口以 `2-开发任务/02-后端接口文档.md` 为准。
