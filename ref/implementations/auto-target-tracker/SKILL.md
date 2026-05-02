[---
name: auto-target-tracker
description: 自动目标进度追踪器。在对话中检测到目标相关图片（笔记、进度、截图、记录）时，自动调用 VLM 识别关键信息并记录到目标日记。适用于学习管理、健身追踪、工作进度、习惯养成、创作记录等所有目标管理场景。
---

# 自动目标进度追踪器

## 触发条件

当对话中出现以下条件时自动触发：

1. **用户发送了图片**（特别是学习笔记、进度截图、健身记录、任务清单、创作作品等）。
2. **用户在设定的目标时间段**（如 08:30, 10:00, 20:00）发送了图片。
3. **用户明确说**"帮我记一下"、"看下进度"、"打卡"、"更新一下"等。

---

## 工作流程

### 1. 检测图片

当检测到图片时，检查：
- 图片文件名是否包含目标关键词（progress, goal, task, workout, note等）
- 图片内容是否包含目标元素（进度条、文字、代码、图表、计划表等）
- 是否在预定的目标提醒时间附近
- 用户最近的对话上下文是否涉及目标的执行

### 2. 调用 VLM 识别

使用 vlm 工具识别图片：

**通用 prompt 模板**：
```
"识别图片中的关键信息，根据目标类型提取以下内容：
- 核心任务/内容
- 完成进度或数量
- 关键数据（如时间、重量、字数等）
- 给出一段简短的执行反馈"
```

**目标类型专用 prompt**：

| 目标类型 | Prompt |
|---------|--------|
| 学习 | "识别学习笔记，提取知识点、完成度" |
| 健身 | "识别健身记录，提取运动类型、组数、次数、重量" |
| 工作 | "识别工作进度，提取完成任务、完成率" |
| 创作 | "识别创作作品，提取创作类型、进度、关键元素" |
| 习惯 | "识别打卡记录，提取打卡内容、连续天数" |

### 3. 解析目标信息

从 VLM 返回的结果中提取：
- **任务/内容清单**：识别出的具体行动或任务
- **完成度**：基于图片内容的进度估算
- **关键数据**：时间、数量、重量、字数等量化指标
- **认知反馈**：对当前目标状态的简评

### 4. 记录到目标日记

调用`edit_daily`工具将识别结果记录到当天的日常笔记中


### 5. 反馈给用户

向用户确认识别结果：

```
已记录你的目标打卡：

📝 识别结果：
核心内容：你拍的是今天的英语单词表，一共记了 15 个新词。
进度估算：今天的单词任务全部搞定，进度打败了 80% 的学习党。
advice：有两个单词的拼写有点模糊，明天复习的时候记得多看两眼。

记录准确吗？要帮你存进今天的目标日记里吗？
```

---

## 记录格式

### 目标日记条目示例

```markdown
## 20:00 打卡记录

**目标类型**: 📚 学习

**图片**: ![目标图片](path/to/image.jpg)

**VLM识别结果**:

| 任务/内容 | 进度/数量 | 状态 |
|----------|----------|------|
| 英语单词 (Unit 1) | 15 个 | 已完成 |
| 数学练习 (第3章) | 80% | 进行中 |

| **总计** | | **今日达成 2/3** |

**关键数据**:
- 学习时长: 2小时
- 专注度: 高

**备注**: 自动识别，用户确认正确

---

## 10:30 健身打卡

**目标类型**: 🏃 健身

**图片**: ![健身记录](path/to/gym.jpg)

**VLM识别结果**:

| 运动类型 | 组数 | 次数 | 重量 | 状态 |
|---------|------|------|------|------|
| 卧推 | 4 | 12 | 60kg | ✅ 完成 |
| 深蹲 | 4 | 10 | 80kg | ✅ 完成 |
| 引体向上 | 3 | 8 | 自重 | ⚠️ 少一组 |

| **总计** | | | **今日达标** |

**关键数据**:
- 总重量: 2640kg
- 训练时长: 45分钟

**备注**: 引体向上少完成一组，下次补上
```

---

## 与目标系统的集成

### 每日汇总

在每天晚上 22:00 的汇总中，包含：
- 今日所有打卡记录
- 目标达成率分析
- 与目标的对比（如果设置了目标）

### 周/月报告

在周报告中，包含：
- 本周有效执行时长
- 目标覆盖范围
- 连续打卡天数
- 动态难度调整advice：如果连续达标，则advice提升下周任务量

---

## 常见使用场景

### 场景1：学习打卡

**用户behavior**：发送手写笔记照片

**自动识别**：
- 提取知识点
- 计算学习进度
- 记录到学习日志

**反馈示例**：
```
📚 识别到学习笔记：
- 机器学习监督学习算法（已完成）
- 梯度下降优化器（进行中）
- 正则化防过拟合（未开始）

进度：33% | 预计还需 2 小时完成
```

### 场景2：健身打卡

**用户behavior**：发送健身记录照片

**自动识别**：
- 提取运动类型
- 统计组数、次数、重量
- 计算训练量

**反馈示例**：
```
🏃 健身记录已识别：
- 卧推 60kg × 12 × 4组 ✅
- 深蹲 80kg × 10 × 4组 ✅
- 引体向上 自重 × 8 × 3组 ✅

总训练量：2640kg | 时长：45分钟
```

### 场景3：工作进度

**用户behavior**：发送项目进度截图

**自动识别**：
- 提取已完成任务
- 计算完成百分比
- 识别剩余任务

**反馈示例**：
```
💼 工作进度已识别：
- 需求文档（已完成）✅
- 原型设计（已完成）✅
- 前端开发（进行中）🔄 80%
- 后端开发（未开始）⏳

项目总进度：67%
```

### 场景4：创作打卡

**用户behavior**：发送创作作品照片

**自动识别**：
- 提取创作类型
- 识别关键元素
- 估算完成度

**反馈示例**：
```
🎨 创作记录已识别：
类型：插画创作
元素：人物角色、背景场景
完成度：线稿100%，上色60%

advice：今天完成了角色线稿，明天可以开始背景上色
```

### 场景5：习惯打卡

**用户behavior**：发送打卡日历截图

**自动识别**：
- 提取连续打卡天数
- 识别今日打卡状态
- 计算打卡率

**反馈示例**：
```
✅ 习惯打卡已识别：
早起：连续 15 天 | 打卡率 100%
阅读：连续 8 天 | 打卡率 73%
运动：连续 21 天 | 打卡率 100%

🎉 运动已连续打卡 3 周，继续保持！
```

---

## Scope

This skill ONLY:
- 识别目标相关图片并提取关键信息
- 记录打卡数据到日常笔记文件
- 提供进度反馈和advice

This skill NEVER:
- 自动执行任何基于识别结果的操作
- 上传图片到外部服务（除 VLM API）
- 访问用户未授权的图片资源
- 修改用户的目标计划（仅记录进度）

---

## Security & Privacy

**Data that stays local:**
- 识别后的结构化结果
- 记录到 日常笔记或长期记忆 和 USER.md 的内容
- 打卡历史数据

**This skill does NOT:**
- 分享目标进度或打卡数据给第三方
- 自动发布打卡信息到社交平台
- 访问用户的其他图片资源

---

## 注意事项

1. **隐私保护**: 图片和识别结果仅存储在本地，不会上传到云端（除了调用 VLM API 进行识别）
2. **准确性**: VLM 识别的内容仅供参考，可能因字迹模糊、图片质量等原因有所偏差
3. **及时确认**: advice用户在记录后及时确认识别结果，如有偏差可手动修正
4. **目标类型识别**: 系统会根据图片内容自动判断目标类型，如有误可手动调整
5. **进度估算**: 进度百分比基于图片内容估算，可能不准确，advice用户定期手动更新

---

## 集成advice

### 与 SOUL.md 配合

将自动追踪器整合到目标管理日常工作流中：

```markdown
### 2. 智能记录与估算 (Logging & Estimation)

- 当用户发送任何与目标相关的图片时：
  1. 自动调用 auto-target-tracker 识别内容
  2. 提取关键信息并估算进度
  3. 立刻记录到日常笔记中
  4. 同步更新 USER.md 的目标进度
```

### 与 HEARTBEAT.md 配合

在心跳检查中包含：

```markdown
## 每日汇总
- 22:00 自动读取今日所有打卡记录
- 生成目标进度报告
- 发送给用户
```
](name: auto-target-tracker
description: Automatic target progress tracker. Triggered when goal-related images (notes, progress screenshots, fitness logs, records) are detected in a conversation. It automatically invokes a Vision Language Model (VLM) to identify key information and log it into the goal journal. Applicable to study management, fitness tracking, work progress, habit formation, creative records, and all goal management scenarios.

Auto Target Tracker

Trigger Conditions

Automatically triggers when the following conditions occur in a conversation:

User sends an image (specifically study notes, progress screenshots, fitness records, task lists, creative works, etc.).

User sends an image during scheduled target periods (e.g., 08:30, 10:00, 20:00).

User explicitly says "Record this for me," "Check my progress," "Check-in," "Update this," etc.

Workflow

1. Image Detection

When an image is detected, check:

If the filename contains target keywords (progress, goal, task, workout, note, etc.).

If the image content contains target elements (progress bars, text, code, charts, planners, etc.).

If the timing is near a scheduled target reminder.

If the recent conversation context involves goal execution.

2. VLM Recognition

Invoke the VLM tool to identify the image:

General Prompt Template:

"Identify the key information in the image and extract the following based on the target type:
- Core tasks/content
- Completion progress or quantity
- Key data (e.g., time, weight, word count, etc.)
- Provide a brief execution feedback summary"


Target-Specific Prompts:

Target Type

Prompt

Study

"Identify study notes, extract knowledge points and completion rate."

Fitness

"Identify fitness records, extract exercise types, sets, reps, and weights."

Work

"Identify work progress, extract completed tasks and completion percentage."

Creation

"Identify creative works, extract creation type, progress, and key elements."

Habits

"Identify check-in records, extract activity and consecutive days."

3. Parse Target Information

Extract the following from the VLM results:

Task/Content List: Specific actions or tasks identified.

Completion Rate: Progress estimation based on image content.

Key Data: Quantitative metrics like time, quantity, weight, word count, etc.

Cognitive Feedback: A brief comment on the current goal status.

4. Log to Goal Journal

Invoke the edit_daily tool to record the identification results into the daily notes for the current day.

5. User Feedback

Confirm the identification results with the user:

Your goal check-in has been recorded:

📝 Recognition Results:
Core Content: You captured today's English vocabulary list; a total of 15 new words were recorded.
Progress Estimate: Today's vocabulary task is complete. You have outperformed 80% of other learners today.
Advice: Two words have slightly blurry spellings; remember to double-check them during tomorrow's review.

Is this record accurate? Should I save it to your daily goal journal?


Recording Format

Example Goal Journal Entry

## 20:00 Check-in Record

**Target Type**: 📚 Study

**Image**: ![Target Image](path/to/image.jpg)

**VLM Recognition Results**:

| Task/Content | Progress/Quantity | Status |
| :--- | :--- | :--- |
| English Vocab (Unit 1) | 15 words | Completed |
| Math Exercises (Ch. 3) | 80% | In Progress |

| **Total** | | **Today's Achievement: 2/3** |

**Key Data**:
- Study Duration: 2 hours
- Focus Level: High

**Remarks**: Automatically identified, user confirmed accuracy.

---

## 10:30 Fitness Check-in

**Target Type**: 🏃 Fitness

**Image**: ![Fitness Record](path/to/gym.jpg)

**VLM Recognition Results**:

| Exercise Type | Sets | Reps | Weight | Status |
| :--- | :--- | :--- | :--- | :--- |
| Bench Press | 4 | 12 | 60kg | ✅ Completed |
| Squats | 4 | 10 | 80kg | ✅ Completed |
| Pull-ups | 3 | 8 | Bodyweight | ⚠️ Missed 1 set |

| **Total** | | | **Goal Met Today** |

**Key Data**:
- Total Volume: 2640kg
- Training Duration: 45 minutes

**Remarks**: One set of pull-ups was missed; will make up next time.


Integration with Goal System

Daily Summary

At the 22:00 summary each night, include:

All check-in records for the day.

Goal achievement rate analysis.

Comparison with set targets (if any).

Weekly/Monthly Reports

In the weekly report, include:

Total effective execution time for the week.

Scope of goal coverage.

Consecutive check-in days.

Dynamic Difficulty Adjustment Advice: If targets are consistently met, suggest increasing the task volume for the following week.

Common Use Cases

Scenario 1: Study Check-in

User Behavior: Sends a photo of handwritten notes.

Auto-recognition: Extracts knowledge points, calculates study progress, and logs to the study journal.

Scenario 2: Fitness Check-in

User Behavior: Sends a photo of a gym log or equipment screen.

Auto-recognition: Extracts exercise types, counts sets/reps/weights, and calculates total training volume.

Scenario 3: Work Progress

User Behavior: Sends a screenshot of a project management tool or code.

Auto-recognition: Extracts completed tasks, calculates percentage, and identifies remaining items.

Scope

This skill ONLY:

Identifies target-related images and extracts key information.

Records check-in data to daily note files.

Provides progress feedback and advice.

This skill NEVER:

Automatically executes actions based on recognition results (other than logging).

Uploads images to external services (except the VLM API).

Accesses unauthorized image resources.

Modifies the user's primary goal plan (only records progress).

Security & Privacy

Data that stays local:

Structured recognition results.

Content recorded in daily notes, long-term memory, or USER.md.

Historical check-in data.

Important Notes

Privacy Protection: Images and results are stored locally and are not uploaded to the cloud (except for VLM API processing).

Accuracy: VLM results are for reference; deviations may occur due to blurry handwriting or low image quality.

Timely Confirmation: Advise users to confirm results immediately after logging; manual corrections are encouraged.

Automatic Classification: The system automatically determines the target type; users can manually adjust if incorrect.

Progress Estimation: Percentage estimates are based on visual cues and may not be 100% accurate.

Integration Advice

With SOUL.md

Integrate the auto-tracker into the goal management workflow:

When a user sends any target-related image:

Automatically invoke auto-target-tracker.

Extract info and estimate progress.

Record immediately to daily notes.

Synchronize the progress in USER.md.

With HEARTBEAT.md

Include the following in the heartbeat checks:

22:00: Automatically read all check-in records of the day.

Generate a progress report and send it to the user.)
