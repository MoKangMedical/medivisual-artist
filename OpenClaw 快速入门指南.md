# OpenClaw 快速入门指南

## 🚀 5 分钟快速开始

### 第一步：获取项目访问权限
1. 登录 Manus 平台
2. 访问 "medical_visual_translator" 项目
3. 获取项目管理权限

### 第二步：本地开发环境设置
```bash
# 克隆或访问项目代码
cd /home/ubuntu/medical_visual_translator

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 访问 http://localhost:3000
```

### 第三步：理解项目结构
```
client/          → React 前端应用
server/          → Express 后端 + tRPC
drizzle/         → 数据库 schema
shared/          → 共享代码和数据
```

---

## 📖 核心概念速览

### tRPC 工作流
```typescript
// 1. 在 server/routers.ts 定义 API
export const appRouter = router({
  generate: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {
      // 实现逻辑
    }),
});

// 2. 在前端调用
const { mutate } = trpc.generate.useMutation();
mutate({ prompt: "..." });
```

### 数据库操作
```typescript
// 1. 在 drizzle/schema.ts 定义表
export const images = mysqlTable('images', {
  id: int().primaryKey().autoincrement(),
  url: text().notNull(),
});

// 2. 在 server/db.ts 创建查询
export async function getImages(userId: number) {
  return db.select().from(images).where(eq(images.userId, userId));
}

// 3. 在 routers.ts 使用
const images = await getImages(ctx.user.id);
```

### 国际化
```typescript
// 使用 i18next
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('common.title')}</h1>;
}
```

---

## 🎯 常见任务

### 添加新的 API 端点
```typescript
// 1. 在 server/routers.ts 中添加
myNewFeature: publicProcedure
  .input(z.object({ id: z.number() }))
  .query(async ({ input }) => {
    return await db.query.myTable.findFirst({
      where: eq(myTable.id, input.id),
    });
  }),

// 2. 在前端使用
const { data } = trpc.myNewFeature.useQuery({ id: 1 });
```

### 修改数据库 schema
```typescript
// 1. 编辑 drizzle/schema.ts
export const myTable = mysqlTable('my_table', {
  id: int().primaryKey().autoincrement(),
  newField: text(),
});

// 2. 生成迁移
pnpm db:generate

// 3. 应用迁移
pnpm db:push
```

### 创建新页面
```typescript
// 1. 创建 client/src/pages/MyPage.tsx
export default function MyPage() {
  return <div>My Page</div>;
}

// 2. 在 client/src/App.tsx 添加路由
<Route path="/mypage" component={MyPage} />

// 3. 在导航中添加链接
<Link href="/mypage">My Page</Link>
```

### 添加国际化文本
```typescript
// 1. 编辑 client/src/i18n/zh.json
{
  "myFeature": {
    "title": "我的功能"
  }
}

// 2. 编辑 client/src/i18n/en.json
{
  "myFeature": {
    "title": "My Feature"
  }
}

// 3. 在组件中使用
const { t } = useTranslation();
<h1>{t('myFeature.title')}</h1>
```

---

## 🧪 测试

### 运行测试
```bash
# 运行所有测试
pnpm test

# 监视模式
pnpm test:watch

# 覆盖率报告
pnpm test:coverage
```

### 编写测试
```typescript
// server/myFeature.test.ts
import { describe, it, expect } from 'vitest';

describe('myFeature', () => {
  it('should do something', () => {
    expect(1 + 1).toBe(2);
  });
});
```

---

## 🔧 常见问题

### Q: 如何修改环境变量？
**A**: 在 Manus Management UI → Settings → Secrets 中修改

### Q: 如何部署更新？
**A**: 
1. 修改代码
2. 运行 `pnpm test` 确保测试通过
3. 在 Manus UI 中创建 checkpoint
4. 点击 Publish 按钮

### Q: 如何查看数据库？
**A**: 运行 `pnpm db:studio` 打开数据库管理界面

### Q: 如何添加新的 npm 包？
**A**: 
```bash
pnpm add package-name
pnpm install  # 更新 lock 文件
```

### Q: 如何调试生产问题？
**A**: 
1. 检查 Manus 日志
2. 查看浏览器控制台错误
3. 检查数据库数据
4. 查看 API 响应

---

## 📊 项目统计

| 指标 | 数值 |
|------|------|
| 总代码行数 | ~5000+ |
| 页面数量 | 10+ |
| API 端点 | 30+ |
| 数据库表 | 12+ |
| 测试用例 | 64+ |
| 支持语言 | 2 (中文/英文) |

---

## 🎓 学习资源

### 必读文档
1. `README.md` - 项目基础信息
2. `todo.md` - 功能追踪
3. `/home/ubuntu/project_handover_plan.md` - 完整交接方案

### 技术文档
- [tRPC 官方文档](https://trpc.io)
- [Drizzle ORM 文档](https://orm.drizzle.team)
- [React 官方文档](https://react.dev)
- [Tailwind CSS 文档](https://tailwindcss.com)

### 代码示例
- `client/src/pages/Generate.tsx` - 主要功能页面
- `server/routers.ts` - API 定义示例
- `server/imageGeneration.ts` - 复杂业务逻辑示例

---

## 💬 沟通和支持

### 项目所有者
- **名称**: 小林
- **角色**: 科研工作者
- **邮件**: medivisual@mokangmedical.cn
- **专业背景**: 医生、药物研发、医疗大数据

### 技术联系
- **问题反馈**: 通过 Manus 平台
- **紧急情况**: 直接联系项目所有者
- **功能建议**: 记录在 todo.md 中

---

## ✅ 第一周任务清单

- [ ] 完整阅读项目交接方案
- [ ] 本地环境搭建和测试
- [ ] 运行所有测试确保环境正确
- [ ] 浏览所有页面，理解功能流程
- [ ] 查看 todo.md，了解待完成功能
- [ ] 选择一个小功能进行修改和部署
- [ ] 与项目所有者进行技术讨论

---

## 🎉 准备好了吗？

现在您已经有了快速入门指南。下一步：

1. **立即开始** → 按照上面的 5 分钟快速开始
2. **深入学习** → 阅读完整的项目交接方案
3. **动手实践** → 修改一个小功能并部署
4. **规划路线** → 与项目所有者讨论优先级

**祝您开发愉快！** 🚀
