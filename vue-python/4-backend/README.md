# 采购需求工作台后端

## 技术栈

|组件|版本|用途|
|---|---:|---|
|Python|3.11.13|当前项目运行时基线|
|FastAPI|0.115.12|异步 REST API、OpenAPI 文档与依赖注入|
|Uvicorn|0.34.2|ASGI 开发服务器|
|SQLAlchemy|2.0.41|关系模型与事务|
|SQLite|Python 内置驱动，内存模式|开发期关系数据库；重启服务即重置数据|
|Casbin|1.41.0|RBAC 权限策略：`user -> role -> resource/action`|
|PyJWT + pwdlib|2.10.1 / 0.2.1|登录令牌与 Argon2 密码哈希|
|OpenAI Python SDK|1.82.1|通过兼容接口调用智谱 GLM-4.7-Flash|

选择 FastAPI 是因为其与 Python 3.11 兼容、异步能力适合 AI/附件任务，并可自动生成接口契约。RBAC 不信任前端角色：每个受保护路由通过 `require_permission(resource, action)` 在服务端执行 Casbin 鉴权。默认内存 SQLite 配合 SQLAlchemy `StaticPool`，使单进程开发服务器内的连接共享同一数据库。

## 启动

前置条件：Python **3.11.x**。在本目录执行：

```bash
python3.11 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -e ".[dev]"
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

打开 `http://localhost:8000/docs` 查看 Swagger UI，健康检查为 `GET /api/v1/health`。首次启动会建立内存表、角色、权限和三个演示用户：

|用户名|密码|角色|
|---|---|---|
|buyer|Buyer123!|采购专员|
|manager|Manager123!|采购主管|
|admin|Admin123!|系统管理员|

## 配置与 AI

复制 `.env.example` 为 `.env` 后填入 `ZHIPUAI_API_KEY`。默认 `ZHIPUAI_MODEL=glm-4.7-flash`；`app/services/ai.py` 使用智谱的 OpenAI 兼容地址。未配置密钥时，接口返回明确的 `AI_NOT_CONFIGURED` 错误，绝不伪造 AI 输出或覆盖草稿事实。

`DATABASE_URL` 默认是内存 SQLite，仅适合脚手架和本地开发。生产环境应改为受管控的 PostgreSQL，迁移到 Alembic 并将附件存入对象存储。

## 工程结构

```text
app/
  api/        # 路由：认证、草稿、AI、主数据
  core/       # 配置、数据库、RBAC、认证
  models/     # SQLAlchemy 关系模型
  schemas/    # Pydantic 请求/响应模型
  services/   # GLM 等外部能力封装
```

当前脚手架实现了登录、令牌认证、RBAC 依赖、数据库初始化、健康检查和 AI 调用边界；采购草稿、附件和提交业务按已产出的接口文档继续落在 `api/` 与 `services/` 中。
