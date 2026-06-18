# PSI-SDI 个人优势配置测试系统

## 📋 项目概述

PSI-SDI（Positive Strengths Index - Strength Deployment Inventory）个人优势配置测试是一个帮助用户识别和评估自身优势的心理测评工具。本项目提供了完整的在线测评解决方案，基于 PSI 量表和 SDI 优势词汇体系，帮助用户快速了解自身的五大优势维度。

## 🎯 项目特性

- **快速测评**: 直观的问卷界面，5 分钟内完成 21 道题的测评
- **维度分组展示**: 按照 5 个核心维度（EA、ER、GS、SC、EM）分类呈现问题
- **默认选项优化**: 所有题目默认选中"有时符合"，降低用户填写阻力
- **即时反馈**: 生成个人优势分析报告与数据可视化结果
- **雷达图展示**: 多维度雷达图清晰展示各维度得分
- **词汇云呈现**: 根据得分强度动态生成优势词汇云
- **响应式设计**: 支持 PC、平板、手机等多设备访问
- **离线可用**: 核心功能支持离线使用

## 📁 项目结构

```
psi-assessment/
├── README.md              # 项目文档（本文件）
├── psi.html              # 主页面（HTML5）
├── script.js             # 核心逻辑脚本（JavaScript）
├── style.css             # 样式定义（CSS3）
```

## 🚀 快速开始

### 使用方式

1. **直接打开文件**
   ```bash
   # 在浏览器中直接打开 psi.html 文件
   open psi.html
   ```

2. **使用本地服务器（推荐）**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js
   npx http-server
   ```
   然后访问 `http://localhost:8000/psi.html`

3. **开始测评**
   - 页面加载后，自动进入测评界面
   - 按维度分组查看 21 道题目
   - 每题有 5 个选项，默认已选中"有时符合"
   - 完成填写后点击"生成优势报告"按钮
   - 查看个性化的优势分析报告

## 📊 测评维度详解

PSI-SDI 量表包含以下 5 个核心维度，共 21 道题目：

| 维度代码 | 维度名称 | 题目数 | 关键含义 |
|---------|---------|-------|---------|
| **EA** | 情绪觉察 | 5 题 | 感知和认知自身情绪的能力，包括情绪识别、情绪察觉、真实自我认知 |
| **ER** | 情绪调节 | 3 题 | 管理和调控自身情绪的能力，包括冷静应对、复原力、压力管理 |
| **GS** | 目标设置 | 4 题 | 制定和实现目标的能力，包括进取精神、坚持力、学习力、成就动力 |
| **SC** | 社交能力 | 6 题 | 社交场景中的适应和表现能力，包括亲和力、沟通力、自信、人际适应 |
| **EM** | 共情能力 | 3 题 | 理解和关怀他人的能力，包括同理心、支持精神、温暖感受 |

### 评分标准

每题采用 5 级 Likert 量表：

| 分值 | 标签 | 含义 |
|------|------|------|
| 1 | 从不符合 | 完全不符合描述 |
| 2 | 很少符合 | 偶尔符合 |
| 3 | 有时符合 | 大约一半符合（**默认选项**） |
| 4 | 经常符合 | 经常符合 |
| 5 | 总是符合 | 完全符合 |

## 💾 核心数据结构

### 题目数据（script.js 中的 QUESTIONS_DATA）

```javascript
const QUESTIONS_DATA = {
    EA: [  // 情绪觉察（5题）
        { id: 1, text: "当我生气时，我能意识到" },
        { id: 2, text: "我能通过身体的反应来察觉我正体验到的情绪" },
        // ... 更多题目
    ],
    ER: [  // 情绪调节（3题）
        { id: 6, text: "当我生气时我可以使自己冷静下来" },
        // ... 更多题目
    ],
    // GS, SC, EM 维度类似
}
```

### 维度配置（script.js 中的 CONFIG）

```javascript
const CONFIG = {
    dimensions: {
        EA: { name: "情绪觉察", color: "#FF6B6B" },
        ER: { name: "情绪调节", color: "#4ECDC4" },
        GS: { name: "目标设置", color: "#FFD166" },
        SC: { name: "社交能力", color: "#06D6A0" },
        EM: { name: "共情能力", color: "#9B59B6" }
    }
}
```

### 优势词汇映射（script.js 中的 VOCABULARY_MAP）

```javascript
const VOCABULARY_MAP = {
    EA: ["敏锐", "感知", "觉知", "情绪雷达", "真实"],
    ER: ["冷静", "复原力", "压力管理", "平和", "控制"],
    GS: ["进取", "坚持", "学习力", "目标感", "成就"],
    SC: ["亲和力", "适应力", "沟通", "自信", "受欢迎"],
    EM: ["关怀", "同情心", "理解", "温暖", "支持"]
};
```

## 🛠️ 技术栈

### 当前版本（Web）
- **前端框架**: 原生 HTML5 + CSS3 + JavaScript（无框架依赖）
- **数据可视化**: Chart.js（CDN 引入）
  - 地址：`https://cdn.jsdelivr.net/npm/chart.js`
  - 用途：绘制多维度雷达图
- **UI 设计**: 纯 CSS3（使用 CSS 变量、Grid、Flex 等现代特性）
- **存储**: LocalStorage（浏览器本地存储）

### 关键技术特性
- CSS 自定义属性（变量）用于主题管理
- Flexbox + Grid 响应式布局
- DOM 动态渲染与事件委托
- 模块化 JavaScript（分离关注点）

## 📱 项目模块说明

### psi.html 主页面结构

```html
<body>
  <header>          <!-- 头部：标题和副标题 -->
  <div id="test-section" class="card">    <!-- 测试区域 -->
    <form id="psi-form"></form>           <!-- 题目动态注入处 -->
  </div>
  <div id="results-section" class="card"> <!-- 结果展示区（默认隐藏） -->
    <canvas id="radarChart"></canvas>     <!-- 雷达图 -->
    <div id="score-grid"></div>           <!-- 分数网格 -->
    <div id="word-cloud"></div>           <!-- 词汇云容器 -->
  </div>
</body>
```

### script.js 模块设计

#### 1. **数据配置模块** (CONFIG)
- 维度配置（名称、颜色）
- 评分选项标签映射
- 默认选中分值设置

#### 2. **题目数据模块** (QUESTIONS_DATA)
- 按维度分组的题目列表
- 题目 ID、文本描述
- 可扩展的数据结构

#### 3. **词汇映射模块** (VOCABULARY_MAP)
- 各维度对应的优势词汇
- 用于词汇云生成

#### 4. **渲染模块** (RenderModule)
- `renderQuestionItem()` - 单题渲染
- `renderDimensionGroup()` - 维度分组渲染
- `renderForm()` - 完整表单渲染

#### 5. **交互模块** (InteractionModule)
- `forceSelect()` - 强制选中单选项并更新样式

#### 6. **结果展示模块**
- `calculateResults()` - 计算得分（主函数）
- `renderChart()` - 绘制雷达图
- `renderWordCloud()` - 生成词汇云
- `renderScoreGrid()` - 展示分数网格

### style.css 样式结构

```css
:root { /* CSS 变量定义 */ }
body, .container { /* 基础布局 */ }
header, h1, .subtitle { /* 头部样式 */ }
.card { /* 卡片容器 */ }

.dimension-group { /* 维度分组容器 */ }
.dimension-title { /* 维度标题 */ }

.question-item { /* 题目容器 */ }
.q-text { /* 题目文本 */ }
.options { /* 选项容器 */ }
.option-label { /* 单选项样式 */ }
.option-label.selected { /* 选中状态 */ }

.btn { /* 按钮基础样式 */ }
#results-section { /* 结果区域 */ }

.chart-container { /* 图表容器 */ }
.cloud-container { /* 词汇云容器 */ }
.tag { /* 词汇标签 */ }
.tag-high, .tag-mid, .tag-low { /* 词汇强度分类 */ }

.score-grid { /* 分数网格 */ }
.score-box { /* 单个分数框 */ }
```

## 📈 使用流程图

```
┌─────────────────┐
│  加载 psi.html  │
└────────┬────────┘
         │
    ┌────▼─────────┐
    │ 渲染表单      │ (RenderModule.renderForm)
    │ 5个维度分组   │
    │ 21道题目     │
    └────┬─────────┘
         │
    ┌────▼──────────────────┐
    │ 用户答题               │
    │ 每题默认选"有时符合"  │
    └────┬──────────────────┘
         │
    ┌────▼──────────────────┐
    │ 点击"生成优势报告"    │
    │ calculateResults()    │
    └────┬──────────────────┘
         │
    ┌────▼──────────────────┐
    │ 验证完整性             │
    │ 计算各维度得分         │
    │ 标准化得分(0-100)     │
    └────┬──────────────────┘
         │
    ┌────▼──────────────────┐
    │ 渲染结果展示           │
    │ ├─ 雷达图              │
    │ ├─ 词汇云              │
    │ └─ 分数网格            │
    └────┬──────────────────┘
         │
    ┌────▼──────────────────┐
    │ 用户查看结果           │
    │ 可选择"重新测试"      │
    └────────────────────────┘
```

## 🔑 核心算法说明

### 得分计算逻辑

```javascript
// 1. 逐题收集用户答案
// 2. 按维度累加得分
scores[dimensionKey] += parseInt(selected.value)

// 3. 标准化得分（转换到 0-100 分）
normalized[k] = Math.round((scores[k] / maxPossible) * 100)
// 其中 maxPossible = 题数 × 5

// 4. 示例：
// EA 维度有 5 题，用户全选"5"
// 原始分：5 × 5 = 25 分
// 标准分：(25 / 25) × 100 = 100 分
```

### 词汇云强度分类

```javascript
if (score >= 80)     // 高分 (≥80%)
    span.classList.add('tag-high')    // 大号、主色、白字
else if (score >= 50) // 中分 (50-80%)
    span.classList.add('tag-mid')     // 中号、浅蓝背景
else                  // 低分 (<50%)
    span.classList.add('tag-low')     // 小号、浅灰背景
```

## 🔄 版本更新说明

### v1.1.0 (2026-06-18)

**新增功能：**
1. ✅ **按维度分组显示** - 21 道题目按 5 个 PSI 维度分类展现
2. ✅ **默认选项优化** - 所有题目默认选中"有时符合"（分值 3）
3. ✅ **DOM 渲染优化** - 重构页面初始化流程，先数据重组再 DOM 生成

**改进内容：**
- 修复 CSS 选择器不匹配问题（`.option-label` vs `.optionNewLabel`）
- 优化 JavaScript 模块化结构（CONFIG、RenderModule、InteractionModule）
- 完善错误提示与验证机制

## 🎨 自定义配置

### 修改主题色

编辑 `style.css` 中的 CSS 变量：

```css
:root {
    --primary-color: #cfcde5;      /* 主色 */
    --primary-hover: #b5b2ec;      /* 悬停色 */
    --selected-color: #08dcc7;     /* 选中色 */
    --bg-color: #f9fafb;           /* 背景色 */
    --text-main: #1f2937;          /* 主文字色 */
}
```

### 修改题目或维度

编辑 `script.js` 中的 `QUESTIONS_DATA` 对象，添加或修改题目。

### 修改优势词汇

编辑 `script.js` 中的 `VOCABULARY_MAP` 对象，更新词汇列表。

## 📱 浏览器兼容性

- ✅ Chrome/Edge (最新版)
- ✅ Firefox (最新版)
- ✅ Safari (最新版)
- ✅ 移动浏览器 (iOS Safari, Android Chrome)
- ❌ IE 11 (不支持 CSS 变量、Chart.js 等现代特性)

## 🔐 隐私与安全

- **本地存储**: 所有测评数据存储在用户浏览器的 LocalStorage 中
- **无服务器**: 当前版本不涉及服务器通信，完全离线运行
- **数据隐私**: 用户数据不被上传或共享
- **开源透明**: 所有代码开源可见，安全可靠

## 📝 后续规划

### 阶段二：功能扩展（计划中）
- [ ] PDF 报告导出
- [ ] 测评历史记录（使用 IndexedDB）
- [ ] 多语言支持（国际化 i18n）
- [ ] 深色主题支持

### 阶段三：后端服务（计划中）
- [ ] Node.js/Express 后端
- [ ] 用户认证系统
- [ ] 数据库存储与分析
- [ ] RESTful API 接口
- [ ] 小程序版本适配

## 📚 相关资源

- **PSI 量表** - Positive Strengths Index
- **SDI 优势词汇体系** - Strength Deployment Inventory
- **Chart.js** - https://www.chartjs.org/

## 🤝 贡献指南

欢迎提交 Issue 或 Pull Request！

## 📞 联系方式

- **项目维护**: @yayuqianhuang
- **邮箱**: 1513229874@qq.com
- **问题反馈**: GitHub Issues

## 📄 许可证

MIT License - 详见 LICENSE 文件

---

**最后更新**: 2026年6月18日  
**当前版本**: 1.1.0  
**维护状态**: 🟢 积极开发中
