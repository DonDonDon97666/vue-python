import casbin
from fastapi import Depends, HTTPException, status
from app.core.security import get_current_user
from app.models.user import User

model = casbin.Model()
model.load_model_from_text("""
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = r.sub == p.sub && r.obj == p.obj && r.act == p.act
""")
enforcer = casbin.Enforcer(model)
for role, resource, action in [
    ("buyer", "draft", "read"), ("buyer", "draft", "write"), ("buyer", "application", "submit"),
    ("manager", "application", "read"), ("manager", "application", "review"),
    ("admin", "master_data", "read"), ("admin", "master_data", "write"), ("admin", "audit", "read"),
]:
    enforcer.add_policy(role, resource, action)


def require_permission(resource: str, action: str):
    def check(user: User = Depends(get_current_user)) -> User:
        if not enforcer.enforce(user.role, resource, action):
            raise HTTPException(status.HTTP_403_FORBIDDEN, "当前角色无此操作权限")
        return user
    return check
