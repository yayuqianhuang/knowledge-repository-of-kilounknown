# PSI 个人优势量表测评系统

## 📋 项目概述

PSI（Positive Strengths Index）个人优势量表是一个帮助用户识别和评估自身优势的心理测评工具。本项目提供了一个完整的在线测评解决方案，从Web应用到小程序再到后台服务的完整架构。

## 🎯 项目特性

- **快速测评**: 直观的问卷界面，5-10分钟完成测评
- **即时反馈**: 实时生成个人优势分析报告
- **数据可视化**: 清晰的图表展示测评结果
- **响应式设计**: 支持PC、平板、手机等多设备
- **离线可用**: 核心功能支持离线使用（Web版）

## 📁 项目结构

```
psi-assessment/
├── README.md                 # 项目文档
├── psi.html                  # 主页面（HTML）
├── script.js                 # 逻辑处理（JavaScript）
├── style.css                 # 样式定义（CSS）
├── data/
│   └── questions.json        # 测评问卷数据
├── images/
│   └── logo.png             # 项目logo
├── docs/
│   ├── ROADMAP.md           # 项目路线图
│   └── API.md               # API文档（后续）
└── package.json             # 项目配置文件
```

## 🚀 快速开始

### Web版本使用

1. **克隆项目**
```bash
git clone https://github.com/yayuqianhuang/knowledge-repository-of-kilounknown.git
cd knowledge-repository-of-kilounknown/psi-assessment
```

2. **打开应用**
   - 直接在浏览器中打开 `psi.html` 文件
   - 或使用本地服务器：
   ```bash
   python -m http.server 8000
   # 访问 http://localhost:8000/psi.html
   ```

3. **开始测评**
   - 填写基本信息
   - 按照提示回答测评问卷
   - 查看个性化的优势分析报告

## 📊 测评维度

PSI量表包含以下主要维度：

| 维度 | 说明 | 关键指标 |
|------|------|---------|
| **创新思维** | 创意能力和创新精神 | 新颖性、独特性 |
| **领导力** | 团队管理和组织能力 | 决策力、影响力 |
| **沟通能力** | 表达和人际交往能力 | 表达清晰度、说服力 |
| **执行力** | 任务完成和目标达成能力 | 行动力、坚持度 |
| **学习能力** | 知识获取和能力提升 | 学习速度、适应性 |
| **抗压能力** | 压力处理和心理韧性 | 情绪管理、恢复力 |
| **协作精神** | 团队合作和共赢意识 | 配合度、奉献精神 |
| **分析能力** | 逻辑思维和问题分析 | 深度思考、系统性 |

## 💾 数据说明

### 问卷数据格式（questions.json）

```json
{
  "questions": [
    {
      "id": 1,
      "dimension": "创新思维",
      "text": "我经常能想到新颖独特的解决方案",
      "options": [
        {"value": 1, "label": "非常不符合"},
        {"value": 2, "label": "比较不符合"},
        {"value": 3, "label": "一般"},
        {"value": 4, "label": "比较符合"},
        {"value": 5, "label": "非常符合"}
      ]
    }
  ]
}
```

### 测评结果数据格式

```json
{
  "userId": "user_id",
  "timestamp": "2026-06-18T10:30:00Z",
  "results": {
    "创新思维": 4.2,
    "领导力": 3.8,
    "沟通能力": 4.5,
    ...
  },
  "report": {
    "totalScore": 35.2,
    "topStrengths": ["沟通能力", "创新思维"],
    "developmentAreas": ["抗压能力", "分析能力"]
  }
}
```

## 🛠️ 技术栈

### 当前版本（Web）
- **前端框架**: 原生 HTML5 + CSS3 + JavaScript
- **数据存储**: LocalStorage（浏览器本地存储）
- **数据可视化**: Chart.js
- **UI框架**: Bootstrap 5（可选）

### 计划集成
- **小程序**: 微信小程序、支付宝小程序
- **后端**: Node.js/Express 或 Python/Flask
- **数据库**: MongoDB/PostgreSQL
- **部署**: Docker + Kubernetes
- **API**: RESTful API

## 📱 后续规划

### 阶段一：Web应用完善（当前）
- [ ] 完成核心问卷功能
- [ ] 实现结果可视化展示
- [ ] 优化用户体验
- [ ] 添加报告导出功能

### 阶段二：小程序开发（Q3 2026）
- [ ] 微信小程序版本
- [ ] 支付宝小程序版本
- [ ] 原生应用适配
- [ ] 离线测评功能

### 阶段三：后端服务（Q4 2026）
- [ ] RESTful API 开发
- [ ] 用户认证系统
- [ ] 数据存储与管理
- [ ] 结果统计分析

### 阶段四：数据持久化（2027 Q1）
- [ ] 用户注册与登录
- [ ] 测评历史记录
- [ ] 进度追踪功能
- [ ] 数据备份与恢复

## 🔄 工作流程

```
用户填写基本信息
        ↓
进行PSI问卷测评
        ↓
实时计算测评结果
        ↓
生成个性化报告
        ↓
展示优势分析
        ↓
导出/分享结果（规划中）
```

## 📈 核心功能

### 1. 问卷测评
```javascript
// 获取用户答题
const getResponses() => {}

// 计算维度得分
const calculateDimensions() => {}

// 生成综合评分
const generateReport() => {}
```

### 2. 结果展示
- 雷达图展示多维度结果
- 柱状图对比各维度分数
- 文字解读和建议

### 3. 报告生成
- PDF导出（规划中）
- 分享链接（规划中）
- 历史记录对比（规划中）

## 🔐 隐私与安全

- **数据安全**: 所有用户数据均采用加密存储
- **隐私保护**: 不收集不必要的个人信息
- **本地存储**: Web版本默认存储在浏览器本地
- **服务器**: 后续服务器版本遵守相关数据保护法规

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

```bash
# 提交bug
git issue create --type bug

# 提交新功能
git pull-request create --type feature
```

## 📞 联系方式

- **项目维护**: @yayuqianhuang
- **邮箱**: 1513229874@qq.com
- **问题反馈**: GitHub Issues

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 🙏 致谢

感谢所有贡献者和测试用户的支持！

---

**最后更新**: 2026年6月18日  
**版本**: 1.0.0-alpha  
**维护状态**: 🟢 积极维护中
