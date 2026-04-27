# MediVisual Artist 项目交接方案

## 📋 项目概览

**项目名称**: MediVisual Artist (医学视觉艺术家)  
**项目类型**: 医学插图 AI 生成平台  
**技术栈**: React 19 + Tailwind 4 + Express 4 + tRPC 11 + MySQL  
**当前版本**: f7ee72dd  
**部署平台**: Manus  

---

## 🎯 核心功能现状

### ✅ 已完成功能
1. **文本处理**
   - 医学摘要输入和解析
   - AI 驱动的生物元素提取（8 个元素）
   - 自动 Prompt 生成和优化

2. **图像生成**
   - 多模型支持：Google Gemini、ChatGPT/DALL-E、Stable Diffusion、StepFun
   - 实时图像生成和显示
   - 图像下载功能

3. **用户系统**
   - Manus OAuth 认证
   - 用户资料管理
   - 订阅系统（三个价格层级）

4. **商业功能**
   - Stripe 支付集成（测试模式）
   - 定价页面
   - 服务页面和联系方式

5. **社区功能**
   - 社区发帖和评论
   - 用户互动系统
   - 全球医院信任案例展示

6. **国际化**
   - 中文/英文双语支持
   - 完整的翻译系统

7. **混合工作流**
   - 图像类型自动检测
   - 后期处理工具推荐（10 个工具）
   - 工具推荐面板

---

## 📊 项目结构

```
medical_visual_translator/
├── client/                    # 前端应用
│   ├── src/
│   │   ├── pages/            # 页面组件
│   │   ├── components/       # 可复用组件
│   │   ├── contexts/         # React 上下文
│   │   ├── hooks/            # 自定义 hooks
│   │   ├── lib/              # 工具库
│   │   └── App.tsx           # 主应用
│   └── public/               # 静态资源
├── server/                    # 后端应用
│   ├── routers.ts            # tRPC 路由定义
│   ├── db.ts                 # 数据库查询
│   ├── imageGeneration.ts    # 图像生成逻辑
│   ├── postProcessingTools.test.ts  # 测试文件
│   └── _core/                # 核心框架代码
├── drizzle/                   # 数据库 schema
│   └── schema.ts             # 数据库表定义
├── shared/                    # 共享代码
│   └── postProcessingTools.ts # 工具推荐数据
└── package.json              # 依赖管理
```

---

## 🔑 关键文件和模块

### 核心业务逻辑
| 文件 | 功能 | 优先级 |
|------|------|--------|
| `server/routers.ts` | tRPC 路由定义 | 🔴 高 |
| `server/imageGeneration.ts` | 图像生成实现 | 🔴 高 |
| `client/src/pages/Generate.tsx` | 生成页面 | 🔴 高 |
| `client/src/components/ImageGenerationModal.tsx` | 生成模态框 | 🔴 高 |
| `drizzle/schema.ts` | 数据库 schema | 🔴 高 |
| `shared/postProcessingTools.ts` | 工具推荐数据 | 🟡 中 |

### 页面组件
| 页面 | 路由 | 功能 |
|------|------|------|
| Home | `/` | 首页、功能展示 |
| Generate | `/generate` | 核心生成功能 |
| Templates | `/templates` | 预设模板库 |
| Guide | `/guide` | 使用指南 |
| JournalSpecs | `/journal-specs` | 期刊规范 |
| Pricing | `/pricing` | 定价页面 |
| Services | `/services` | 服务页面 |
| Community | `/community` | 社区功能 |
| Points | `/points` | 积分系统（规划中） |

---

## 🚀 待完成功能

### 高优先级
- [ ] **Scopus API 集成** - 直接搜索和导入论文摘要
- [ ] **积分系统** - 用户积分管理和兑换
- [ ] **Jimeng AI 集成** - 高级图像生成能力
- [ ] **推荐面板 UI** - 混合工作流的可视化界面

### 中优先级
- [ ] **高级 Prompt 编辑** - 用户自定义 prompt
- [ ] **批量生成优化** - 提高批量处理效率
- [ ] **图像版本管理** - 保存多个版本对比
- [ ] **协作功能增强** - 团队共享和评论

### 低优先级
- [ ] **AI 客服机器人** - 自动客户服务
- [ ] **视频教程** - 使用指南视频
- [ ] **邮件营销** - 用户通知系统
- [ ] **高级分析** - 使用数据分析

---

## 🔐 环境配置和密钥

### 必需的环境变量
```
# 数据库
DATABASE_URL=mysql://...

# OAuth
VITE_APP_ID=...
OAUTH_SERVER_URL=...
VITE_OAUTH_PORTAL_URL=...
JWT_SECRET=...

# AI 模型 API
GOOGLE_GEMINI_API_KEY=...
OPENAI_API_KEY=...
REPLICATE_API_TOKEN=...
STEPFUN_API_KEY=...

# 支付
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
VITE_STRIPE_PUBLISHABLE_KEY=...

# 存储和通知
BUILT_IN_FORGE_API_URL=...
BUILT_IN_FORGE_API_KEY=...
VITE_FRONTEND_FORGE_API_KEY=...
VITE_FRONTEND_FORGE_API_URL=...

# 其他
OWNER_NAME=...
OWNER_OPEN_ID=...
VITE_APP_TITLE=...
VITE_APP_LOGO=...
```

### 配置位置
- **开发环境**: Manus Management UI → Settings → Secrets
- **生产环境**: 同上（需要更新为生产密钥）

---

## 📈 数据库架构

### 主要表
| 表名 | 用途 | 关键字段 |
|------|------|--------|
| `users` | 用户账户 | id, email, name, role, subscription_tier |
| `prompts` | 生成的 prompt | id, user_id, content, elements, created_at |
| `images` | 生成的图像 | id, user_id, prompt_id, url, model_used |
| `templates` | 预设模板 | id, name, category, content, language |
| `community_posts` | 社区发帖 | id, user_id, title, content, likes |
| `testimonials` | 用户评价 | id, user_id, content, rating, institution |
| `subscriptions` | 订阅信息 | id, user_id, tier, status, stripe_id |
| `notifications` | 用户通知 | id, user_id, title, content, read |

---

## 🧪 测试覆盖

### 当前测试状态
- **总测试数**: 64+ 个
- **覆盖范围**: 
  - ✅ 图像生成逻辑
  - ✅ 工具推荐系统
  - ✅ 国际化功能
  - ✅ 支付集成
  - ⚠️ 社区功能（部分）
  - ❌ Scopus 集成（待实现）

### 测试命令
```bash
pnpm test              # 运行所有测试
pnpm test:watch       # 监视模式
pnpm test:coverage    # 覆盖率报告
```

---

## 🛠️ 开发工作流

### 本地开发
```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 运行测试
pnpm test

# 编译检查
pnpm build
```

### 数据库操作
```bash
# 生成迁移
pnpm db:generate

# 执行迁移
pnpm db:push

# 查看数据库
pnpm db:studio
```

### 部署
1. 在 Manus Management UI 中创建 checkpoint
2. 点击 Publish 按钮发布
3. 配置自定义域名（Settings → Domains）

---

## 📝 代码规范和最佳实践

### 前端
- 使用 shadcn/ui 组件库
- Tailwind CSS 用于样式
- React hooks 和自定义 hooks
- tRPC 用于 API 调用
- i18next 用于国际化

### 后端
- tRPC procedures 定义 API
- Drizzle ORM 用于数据库操作
- 完整的错误处理和日志
- 单元测试覆盖核心逻辑

### 通用
- TypeScript 严格模式
- ESLint 代码检查
- 提交前运行测试
- 清晰的代码注释

---

## 🐛 已知问题和限制

### 当前问题
1. **Gemini API 404 错误** - 已修复，使用 `gemini-2.0-flash-001` 模型
2. **Stable Diffusion 3.5 不可用** - 改用 FLUX 2 Klein 模型
3. **某些 TypeScript 类型错误** - 26 个编译警告（不影响功能）

### 系统限制
- 图像生成最大 prompt 长度：2000 字符
- 单次批量处理最多 100 个摘要
- API 调用速率限制（取决于各服务商）

---

## 📚 文档和资源

### 内部文档
- `README.md` - 项目基础信息
- `todo.md` - 功能追踪和更新历史
- 代码注释 - 关键函数和模块

### 外部资源
- [tRPC 文档](https://trpc.io)
- [Drizzle ORM 文档](https://orm.drizzle.team)
- [Tailwind CSS 文档](https://tailwindcss.com)
- [React 官方文档](https://react.dev)

---

## 🎓 交接清单

### 技术交接
- [ ] 代码库访问权限
- [ ] 数据库访问权限
- [ ] API 密钥和环境变量
- [ ] Manus 账户管理权限
- [ ] GitHub 仓库权限（如有）

### 文档交接
- [ ] 项目架构文档
- [ ] API 文档
- [ ] 数据库 schema 文档
- [ ] 部署指南
- [ ] 故障排除指南

### 知识转移
- [ ] 代码库导览
- [ ] 开发工作流讲解
- [ ] 常见问题和解决方案
- [ ] 性能优化建议
- [ ] 安全最佳实践

### 业务交接
- [ ] 用户反馈渠道
- [ ] 支付和订阅管理
- [ ] 客户服务流程
- [ ] 营销和推广策略
- [ ] 数据分析和报告

---

## 💡 建议和注意事项

### 优先级建议
1. **第一阶段** - 稳定现有功能，修复已知问题
2. **第二阶段** - 实现高优先级功能（Scopus、积分系统）
3. **第三阶段** - 优化用户体验和性能
4. **第四阶段** - 扩展功能和集成

### 开发建议
- 保持代码风格一致性
- 为新功能添加完整的单元测试
- 定期更新依赖包
- 监控 API 配额和成本
- 收集用户反馈并迭代

### 安全建议
- 定期审计 API 密钥使用
- 实施速率限制防止滥用
- 加强用户数据保护
- 定期备份数据库
- 监控异常活动

---

## 📞 支持和联系

### 技术支持
- **项目所有者**: 小林（科研工作者）
- **联系方式**: medivisual@mokangmedical.cn
- **技术栈问题**: 参考官方文档或 Stack Overflow

### 紧急情况
- 服务器宕机：检查 Manus 控制面板
- 数据库问题：查看数据库日志
- API 错误：检查各服务商的状态页面

---

## 🎉 总结

MediVisual Artist 是一个功能完整、架构清晰的医学插图生成平台。项目已经具备核心功能和商业能力，现在需要进一步完善和扩展。OpenClaw 团队可以基于现有基础继续开发，按照优先级逐步实现新功能。

**关键成功因素**：
- 保持代码质量和测试覆盖
- 及时收集和响应用户反馈
- 定期监控系统性能和成本
- 持续优化用户体验
