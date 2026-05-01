[---
name: aminer-data-search
description: >
  使用 AMiner 开放平台 API 进行学术数据查询与分析。当用户需要查询学者信息、论文详情、机构数据、期刊内容或专利信息时使用此 skill。
  触发场景：提到 AMiner、学术数据查询、查论文/学者/机构/期刊/专利、学术问答搜索、引用分析、科研机构分析、学者画像、论文引用链、期刊投稿分析等。
  支持 6 大组合工作流（学者全景分析、论文深度挖掘、机构研究力分析、期刊论文监控、学术智能问答、专利链分析）以及 28 个独立 API 的直接调用。
  即使用户只说"帮我查一下 XXX 学者"或"找找关于 XXX 的论文"，也应主动使用此 skill。
---

# AMiner 开放平台学术数据查询

AMiner 是全球领先的学术数据平台，提供学者、论文、机构、期刊、专利等全维度学术数据。
本 skill 涵盖全部 28 个开放 API，并将它们组合成 6 大实用工作流。

- **API 文档**：https://open.aminer.cn/open/doc
- **控制台（生成 Token）**：https://open.aminer.cn/open/board?tab=control

---

## 第一步：获取 Token

所有 API 调用需要在请求头中携带 `Authorization: <your_token>`。

**获取方式：**
1. 前往 [AMiner 控制台](https://open.aminer.cn/open/board?tab=control) 登录并生成 API Token
2. 若不了解如何操作，请参阅 [开放平台文档](https://open.aminer.cn/open/doc)

> Token 请前往 [控制台](https://open.aminer.cn/open/board?tab=control) 登录后生成，有效期内可重复使用。

---

## 快速使用（Python 脚本）

所有工作流均可通过 `scripts/aminer_client.py` 驱动：

```bash
# 学者全景分析
python scripts/aminer_client.py --token <TOKEN> --action scholar_profile --name "Andrew Ng"

# 论文深度挖掘（含引用链）
python scripts/aminer_client.py --token <TOKEN> --action paper_deep_dive --title "Attention is all you need"

# 机构研究力分析
python scripts/aminer_client.py --token <TOKEN> --action org_analysis --org "清华大学"

# 期刊论文监控（指定年份）
python scripts/aminer_client.py --token <TOKEN> --action venue_papers --venue "Nature" --year 2024

# 学术智能问答（自然语言提问）
python scripts/aminer_client.py --token <TOKEN> --action paper_qa --query "transformer架构最新进展"

# 专利搜索与详情
python scripts/aminer_client.py --token <TOKEN> --action patent_search --query "量子计算"
```

也可以直接调用单个 API：
```bash
python scripts/aminer_client.py --token <TOKEN> --action raw \
  --api paper_search --params '{"title": "BERT", "page": 0, "size": 5}'
```

---

## 稳定性与失败处理策略（必读）

客户端 `scripts/aminer_client.py` 内置了请求重试与降级策略，用于减少网络抖动和短暂服务异常对结果的影响。

- **超时与重试**
  - 默认请求超时：`30s`
  - 最大重试次数：`3`
  - 退避策略：指数退避（`1s -> 2s -> 4s`）+ 随机抖动
- **可重试状态码**
  - `408 / 429 / 500 / 502 / 503 / 504`
- **不可重试场景**
  - 常见 `4xx`（如参数错误、鉴权问题）默认不重试，直接返回错误结构
- **工作流降级**
  - `paper_deep_dive`：`paper_search` 无结果时自动降级到 `paper_search_pro`
  - `paper_qa`：`query` 模式无结果时，自动降级到 `paper_search_pro`
- **可追踪调用链**
  - 组合工作流输出中包含 `source_api_chain`，用于标记结果由哪些 API 组合得到

---

## 论文搜索接口选型指南

当用户说“查论文”时，先判断目标是“找 ID”、“做筛选”、“做问答”还是“做分析报表”，再选 API：

| API | 侧重点 | 适用场景 | 成本 |
|---|---|---|---|
| `paper_search` | 标题检索、快速拿 `paper_id` | 已知论文标题，先定位目标论文 | 免费 |
| `paper_search_pro` | 多条件检索与排序（作者/机构/期刊/关键词） | 主题检索、按引用量或年份排序 | ¥0.01/次 |
| `paper_qa_search` | 自然语言问答/主题词检索 | 用户用自然语言描述需求，先走语义检索 | ¥0.05/次 |
| `paper_list_by_search_venue` | 返回更完整论文信息（适合分析） | 需要更丰富字段做分析/报告 | ¥0.30/次 |
| `paper_list_by_keywords` | 多关键词批量检索 | 批量专题拉取（如 AlphaFold + protein folding） | ¥0.10/次 |
| `paper_detail_by_condition` | 年份+期刊维度拉详情 | 期刊年度监控、选刊分析 | ¥0.20/次 |

推荐路由（默认）：

1. **已知标题**：`paper_search -> paper_detail -> paper_relation`
2. **条件筛选**：`paper_search_pro -> paper_detail`
3. **自然语言问答**：`paper_qa_search`（若无结果降级 `paper_search_pro`）
4. **期刊年度分析**：`venue_search -> venue_paper_relation -> paper_detail_by_condition`

---

## 6 大组合工作流

### 工作流 1：学者全景分析（Scholar Profile）

**适用场景**：了解某位学者的完整学术画像，包括简介、研究方向、发表论文、专利、科研项目。

**调用链：**
```
学者搜索（name → person_id）
    ↓
并行调用：
  ├── 学者详情（bio/教育背景/荣誉）
  ├── 学者画像（研究方向/兴趣/工作经历）
  ├── 学者论文（论文列表）
  ├── 学者专利（专利列表）
  └── 学者项目（科研项目/资助信息）
```

**命令：**
```bash
python scripts/aminer_client.py --token <TOKEN> --action scholar_profile --name "Yann LeCun"
```

**输出示例字段：**
- 基本信息：姓名、机构、职称、性别
- 个人简介（中英文）
- 研究兴趣与领域
- 教育背景（结构化）
- 工作经历（结构化）
- 论文列表（ID + 标题）
- 专利列表（ID + 标题）
- 科研项目（标题/资助金额/时间）

---

### 工作流 2：论文深度挖掘（Paper Deep Dive）

**适用场景**：根据论文标题或关键词，获取论文完整信息及引用relationship。

**调用链：**
```
论文搜索 / 论文搜索pro（title/keyword → paper_id）
    ↓
论文详情（摘要/作者/DOI/期刊/年份/关键词）
    ↓
论文引用（该论文引用了哪些论文 → cited_ids）
    ↓
（可选）对被引论文批量获取论文信息
```

**命令：**
```bash
# 按标题搜索
python scripts/aminer_client.py --token <TOKEN> --action paper_deep_dive --title "BERT"

# 按关键词搜索（使用 pro 接口）
python scripts/aminer_client.py --token <TOKEN> --action paper_deep_dive \
  --keyword "large language model" --author "Hinton" --order n_citation
```

---

### 工作流 3：机构研究力分析（Org Analysis）

**适用场景**：分析某机构的学者规模、论文产出、专利数量，适合竞品研究或合作评估。

**调用链：**
```
机构消歧pro（原始字符串 → org_id，处理别名/全称差异）
    ↓
并行调用：
  ├── 机构详情（简介/类型/成立时间）
  ├── 机构学者（学者列表）
  ├── 机构论文（论文列表）
  └── 机构专利（专利ID列表，支持分页，最多10000条）
```

> 若有多个同名机构，机构搜索会返回候选列表，可结合机构消歧 pro 精确匹配。

**命令：**
```bash
python scripts/aminer_client.py --token <TOKEN> --action org_analysis --org "MIT"
# 指定原始字符串（含缩写/别名）
python scripts/aminer_client.py --token <TOKEN> --action org_analysis --org "Massachusetts Institute of Technology, CSAIL"
```

---

### 工作流 4：期刊论文监控（Venue Papers）

**适用场景**：追踪某期刊特定年份的论文，用于投稿调研或研究热点分析。

**调用链：**
```
期刊搜索（name → venue_id）
    ↓
期刊详情（ISSN/类型/简称）
    ↓
期刊论文（venue_id + year → paper_id 列表）
    ↓
（可选）论文详情批量查询
```

**命令：**
```bash
python scripts/aminer_client.py --token <TOKEN> --action venue_papers --venue "NeurIPS" --year 2023
```

---

### 工作流 5：学术智能问答（Paper QA Search）

**适用场景**：用自然语言或结构化关键词智能搜索论文，支持 SCI 过滤、引用量排序、作者/机构限定。

**核心 API**：`论文问答搜索`（¥0.05/次），支持：
- `query`：自然语言提问，系统自动拆解为关键词
- `topic_high/middle/low`：精细控制关键词权重（嵌套数组 OR/AND 逻辑）
- `sci_flag`：只看 SCI 论文
- `force_citation_sort`：按引用量排序
- `author_terms / org_terms`：限定作者或机构

**命令：**
```bash
# 自然语言问答
python scripts/aminer_client.py --token <TOKEN> --action paper_qa \
  --query "用于蛋白质结构predict的深度学习方法"

# 精细关键词搜索（必须同时含 A 和 B，加分含 C）
python scripts/aminer_client.py --token <TOKEN> --action paper_qa \
  --topic_high '[["transformer","self-attention"],["protein folding"]]' \
  --topic_middle '[["AlphaFold"]]' \
  --sci_flag --sort_citation
```

---

### 工作流 6：专利链分析（Patent Analysis）

**适用场景**：搜索特定技术领域的专利，或获取某学者/机构的专利组合。

**调用链（独立搜索）：**
```
专利搜索（query → patent_id）
    ↓
专利详情（摘要/申请日/申请号/受让人/发明人）
```

**调用链（经由学者/机构）：**
```
学者搜索 → 学者专利（patent_id 列表）
机构消歧 → 机构专利（patent_id 列表）
    ↓
专利信息 / 专利详情
```

**命令：**
```bash
python scripts/aminer_client.py --token <TOKEN> --action patent_search --query "量子计算芯片"
python scripts/aminer_client.py --token <TOKEN> --action scholar_patents --name "张首晟"
```

---

## 单独 API 速查表

> 完整参数说明请阅读 `references/api-catalog.md`

| # | 标题 | 方法 | 价格 | 接口路径（基础域名：datacenter.aminer.cn/gateway/open_platform） |
|---|------|------|------|------|
| 1 | 论文问答搜索 | POST | ¥0.05 | `/api/paper/qa/search` |
| 2 | 学者搜索 | POST | 免费 | `/api/person/search` |
| 3 | 论文搜索 | GET | 免费 | `/api/paper/search` |
| 4 | 论文搜索pro | GET | ¥0.01 | `/api/paper/search/pro` |
| 5 | 专利搜索 | POST | 免费 | `/api/patent/search` |
| 6 | 机构搜索 | POST | 免费 | `/api/organization/search` |
| 7 | 期刊搜索 | POST | 免费 | `/api/venue/search` |
| 8 | 学者详情 | GET | ¥1.00 | `/api/person/detail` |
| 9 | 学者项目 | GET | ¥3.00 | `/api/project/person/v3/open` |
| 10 | 学者论文 | GET | ¥1.50 | `/api/person/paper/relation` |
| 11 | 学者专利 | GET | ¥1.50 | `/api/person/patent/relation` |
| 12 | 学者画像 | GET | ¥0.50 | `/api/person/figure` |
| 13 | 论文信息 | POST | 免费 | `/api/paper/info` |
| 14 | 论文详情 | GET | ¥0.01 | `/api/paper/detail` |
| 15 | 论文引用 | GET | ¥0.10 | `/api/paper/relation` |
| 16 | 专利信息 | GET | 免费 | `/api/patent/info` |
| 17 | 专利详情 | GET | ¥0.01 | `/api/patent/detail` |
| 18 | 机构详情 | POST | ¥0.01 | `/api/organization/detail` |
| 19 | 机构专利 | GET | ¥0.10 | `/api/organization/patent/relation` |
| 20 | 机构学者 | GET | ¥0.50 | `/api/organization/person/relation` |
| 21 | 机构论文 | GET | ¥0.10 | `/api/organization/paper/relation` |
| 22 | 期刊详情 | POST | ¥0.20 | `/api/venue/detail` |
| 23 | 期刊论文 | POST | ¥0.10 | `/api/venue/paper/relation` |
| 24 | 机构消歧 | POST | ¥0.01 | `/api/organization/na` |
| 25 | 机构消歧pro | POST | ¥0.05 | `/api/organization/na/pro` |
| 26 | 论文搜索接口 | GET | ¥0.30 | `/api/paper/list/by/search/venue` |
| 27 | 论文批量查询 | GET | ¥0.10 | `/api/paper/list/citation/by/keywords` |
| 28 | 按年份与期刊获取论文详情 | GET | ¥0.20 | `/api/paper/platform/allpubs/more/detail/by/ts/org/venue` |

---

## 参考资料

- 完整 API 参数文档：读取 `references/api-catalog.md`
- Python 客户端源码：`scripts/aminer_client.py`
- 测试用例：`evals/evals.json`
- 官方文档：https://open.aminer.cn/open/doc
- 控制台：https://open.aminer.cn/open/board?tab=control
](name: aminer-data-search
description: >
Uses the AMiner Open Platform API for academic data queries and analysis. Use this skill when users need to query scholar information, paper details, institution data, journal content, or patent information.
Trigger scenarios: Mentions of AMiner, academic data queries, searching for papers/scholars/institutions/journals/patents, academic Q&A, citation analysis, research institution analysis, scholar profiling, paper citation chains, journal submission analysis, etc.
Supports 6 combined workflows (Scholar Panoramic Analysis, Paper Deep Dive, Institution Research Power Analysis, Venue Paper Monitoring, Academic Intelligent Q&A, Patent Chain Analysis) and direct calls to 28 independent APIs.
Even if the user only says "Help me check scholar XXX" or "Find papers about XXX," this skill should be proactively used.

AMiner Open Platform Academic Data Query

AMiner is a world-leading academic data platform providing comprehensive data on scholars, papers, institutions, journals, patents, and more.
This skill covers all 28 open APIs and combines them into 6 practical workflows.

API Documentation: https://open.aminer.cn/open/doc

Console (Generate Token): https://open.aminer.cn/open/board?tab=control

Step 1: Obtain Token

All API calls must include Authorization: <your_token> in the request header.

How to obtain:

Go to the AMiner Console, log in, and generate an API Token.

If you are unsure how to proceed, please refer to the Open Platform Documentation.

Tokens are generated after logging into the Console and can be reused within their validity period.

Quick Start (Python Script)

All workflows can be driven via scripts/aminer_client.py:

# Scholar Panoramic Analysis
python scripts/aminer_client.py --token <TOKEN> --action scholar_profile --name "Andrew Ng"

# Paper Deep Dive (including citation chains)
python scripts/aminer_client.py --token <TOKEN> --action paper_deep_dive --title "Attention is all you need"

# Institution Research Power Analysis
python scripts/aminer_client.py --token <TOKEN> --action org_analysis --org "Tsinghua University"

# Venue Paper Monitoring (Specific Year)
python scripts/aminer_client.py --token <TOKEN> --action venue_papers --venue "Nature" --year 2024

# Academic Intelligent Q&A (Natural Language Query)
python scripts/aminer_client.py --token <TOKEN> --action paper_qa --query "latest developments in transformer architecture"

# Patent Search and Details
python scripts/aminer_client.py --token <TOKEN> --action patent_search --query "quantum computing"


You can also call individual APIs directly:

python scripts/aminer_client.py --token <TOKEN> --action raw \
  --api paper_search --params '{"title": "BERT", "page": 0, "size": 5}'


Stability and Failure Handling Strategy (Must Read)

The client scripts/aminer_client.py includes built-in request retry and fallback strategies to reduce the impact of network jitter and transient service exceptions.

Timeout and Retries

Default Request Timeout: 30s

Max Retries: 3

Backoff Strategy: Exponential backoff (1s -> 2s -> 4s) + random jitter

Retriable Status Codes

408 / 429 / 500 / 502 / 503 / 504

Non-retriable Scenarios

Common 4xx errors (e.g., parameter errors, authentication issues) do not retry by default and return the error structure directly.

Workflow Fallbacks

paper_deep_dive: Automatically falls back to paper_search_pro if paper_search yields no results.

paper_qa: Automatically falls back to paper_search_pro if the query mode yields no results.

Traceable Call Chains

Combined workflow outputs include a source_api_chain to mark which APIs were combined to obtain the result.

Paper Search API Selection Guide

When a user says "search for papers," first determine if the goal is to "find an ID," "filter," "ask a question," or "generate an analysis report," then select the appropriate API:

API

Focus

Use Case

Cost

paper_search

Title retrieval, quick paper_id retrieval

Known paper title; locate the target paper first

Free

paper_search_pro

Multi-condition search & sorting (Author/Org/Venue/KW)

Subject search; sort by citations or year

¥0.01/call

paper_qa_search

Natural language Q&A / Keyword search

User describes needs in natural language; semantic search first

¥0.05/call

paper_list_by_search_venue

Returns complete paper info (suitable for analysis)

Richer fields needed for analysis/reports

¥0.30/call

paper_list_by_keywords

Batch multi-keyword retrieval

Batch topical extraction (e.g., AlphaFold + protein folding)

¥0.10/call

paper_detail_by_condition

Year + Venue dimension details

Annual venue monitoring; journal analysis

¥0.20/call

Recommended Routing (Default):

Known Title: paper_search -> paper_detail -> paper_relation

Conditional Filtering: paper_search_pro -> paper_detail

Natural Language Q&A: paper_qa_search (fallback to paper_search_pro if no results)

Annual Venue Analysis: venue_search -> venue_paper_relation -> paper_detail_by_condition

6 Major Combined Workflows

Workflow 1: Scholar Panoramic Analysis (Scholar Profile)

Use Case: Understand a scholar's complete academic profile, including bio, research directions, published papers, patents, and research projects.

Call Chain:

Scholar Search (name → person_id)
    ↓
Parallel Calls:
  ├── Scholar Details (bio/education/honors)
  ├── Scholar Profile (directions/interests/experience)
  ├── Scholar Papers (paper list)
  ├── Scholar Patents (patent list)
  └── Scholar Projects (projects/funding info)


Command:

python scripts/aminer_client.py --token <TOKEN> --action scholar_profile --name "Yann LeCun"


Workflow 2: Paper Deep Dive

Use Case: Get full paper info and citation relationships based on title or keywords.

Call Chain:

Paper Search / Paper Search Pro (title/keyword → paper_id)
    ↓
Paper Details (abstract/authors/DOI/venue/year/keywords)
    ↓
Paper Citations (which papers this paper cited → cited_ids)
    ↓
(Optional) Batch retrieval of info for cited papers


Command:

# Search by title
python scripts/aminer_client.py --token <TOKEN> --action paper_deep_dive --title "BERT"

# Search by keyword (using Pro interface)
python scripts/aminer_client.py --token <TOKEN> --action paper_deep_dive \
  --keyword "large language model" --author "Hinton" --order n_citation


Workflow 3: Institution Research Power Analysis (Org Analysis)

Use Case: Analyze an institution's scholar scale, paper output, and patent count; suitable for competitive research or partnership assessment.

Call Chain:

Org Disambiguation Pro (raw string → org_id, handles alias/name differences)
    ↓
Parallel Calls:
  ├── Org Details (intro/type/founded)
  ├── Org Scholars (scholar list)
  ├── Org Papers (paper list)
  └── Org Patents (patent ID list, supports pagination up to 10,000)


Command:

python scripts/aminer_client.py --token <TOKEN> --action org_analysis --org "MIT"


Workflow 4: Venue Paper Monitoring (Venue Papers)

Use Case: Track papers from a specific venue in a specific year for submission research or hot topic analysis.

Call Chain:

Venue Search (name → venue_id)
    ↓
Venue Details (ISSN/type/abbreviation)
    ↓
Venue Papers (venue_id + year → paper_id list)
    ↓
(Optional) Batch query for paper details


Command:

python scripts/aminer_client.py --token <TOKEN> --action venue_papers --venue "NeurIPS" --year 2023


Workflow 5: Academic Intelligent Q&A (Paper QA Search)

Use Case: Intelligently search papers using natural language or structured keywords, supporting SCI filtering, citation sorting, and author/institution limits.

Core API: Paper QA Search (¥0.05/call), supports:

query: Natural language question, system auto-deconstructs into keywords.

topic_high/middle/low: Fine control of keyword weights (nested OR/AND logic).

sci_flag: Only SCI papers.

force_citation_sort: Sort by citation count.

Command:

python scripts/aminer_client.py --token <TOKEN> --action paper_qa \
  --query "deep learning methods for protein structure prediction"


Workflow 6: Patent Chain Analysis (Patent Analysis)

Use Case: Search for patents in specific technical fields or get the patent portfolio of a scholar/institution.

Command:

python scripts/aminer_client.py --token <TOKEN> --action patent_search --query "quantum computing chips"
python scripts/aminer_client.py --token <TOKEN> --action scholar_patents --name "Shoucheng Zhang"


Individual API Cheat Sheet

#

Title

Method

Price

1

Paper QA Search

POST

¥0.05

2

Scholar Search

POST

Free

3

Paper Search

GET

Free

4

Paper Search Pro

GET

¥0.01

5

Patent Search

POST

Free

6

Org Search

POST

Free

7

Venue Search

POST

Free

8

Scholar Details

GET

¥1.00

9

Scholar Projects

GET

¥3.00

10

Scholar Papers

GET

¥1.50

11

Scholar Patents

GET

¥1.50

12

Scholar Profile/Figure

GET

¥0.50

13

Paper Info

POST

Free

14

Paper Details

GET

¥0.01

15

Paper Citations/Relation

GET

¥0.10

16

Patent Info

GET

Free

17

Patent Details

GET

¥0.01

18

Org Details

POST

¥0.01

19

Org Patents

GET

¥0.10

20

Org Scholars

GET

¥0.50

21

Org Papers

GET

¥0.10

22

Venue Details

POST

¥0.20

23

Venue Papers

POST

¥0.10

24

Org Disambiguation

POST

¥0.01

25

Org Disambiguation Pro

POST

¥0.05

26

Paper List by Venue

GET

¥0.30

27

Paper List by Keywords

GET

¥0.10

28

Paper Details by Year/Venue

GET

¥0.20

References

Full API Parameters: Read references/api-catalog.md

Python Client Source: scripts/aminer_client.py

Official Docs: https://open.aminer.cn/open/doc

Console: https://open.aminer.cn/open/board?tab=control)
