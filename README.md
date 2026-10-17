# 大模型可视化 · 中文版

**用能操作的三维动画，理解 GPT 风格模型怎样预测下一个词元。** 无需编程基础，可以先看整体流程，再逐步拆解计算。

基于 [Brendan Bycroft 的 LLM Visualization](https://github.com/bbycroft/llm-viz) 制作。中文版本面向第一次接触神经网络的读者，翻译界面与讲解，增加入门首页、学习路线和术语说明。

![大模型三维可视化](public/images/llm-viz-screenshot.jpg)

## 能学到什么

| 模块 | 要回答的问题 |
| --- | --- |
| 全程概览 | 输入怎样一步步变成下一个词元？ |
| 嵌入（Embedding） | 词元编号怎样变成向量？位置如何加入？ |
| 层归一化（Layer Norm） | 为什么调整每一列数字的尺度？ |
| 自注意力（Self-Attention） | Q、K、V 怎样让不同位置交换信息？ |
| 投影与残差 | 多个注意力头怎样合并？为什么保留原输入？ |
| 前馈网络（MLP） | 每个位置的表示怎样进一步加工？ |
| Transformer | 上述模块怎样堆叠成网络？ |
| Softmax 与输出 | 分数怎样变成概率，再选出下一个词元？ |

## 第一次使用

1. 打开首页，先读四个基本术语，再进入交互演示 `/llm`。
2. 使用 **nano-gpt**，从“全程概览”开始。按空格键或“继续播放”逐步观看；“快进此步”加速当前段落。
3. 拖动三维视图旋转，滚轮缩放。鼠标悬停数值格子，观察计算来源；悬停彩色术语，查看对应区域。
4. 从目录进入各模块。每次只跟踪一列，问清输入、输出和这一步的作用。

蓝色格子代表训练学到的权重，绿色格子代表计算中的数值。手机采用上下分区布局；观察复杂三维结构建议使用电脑。

## 这个演示实际在做什么

运行中的小模型约有 **8.5 万参数**，来自 Andrej Karpathy 的 [minGPT](https://github.com/karpathy/minGPT) 字母排序示例。输入 `CBABBC`，模型通过逐个预测下一个词元，输出 `ABBBCC`。模型的计算在浏览器中完成，不需要 API 密钥。

这是**推理演示**：使用已经学好的权重计算输出，点击播放不会训练模型。它只学过 A、B、C 排序，不能聊天。保留字母示例，是为了让读者看清输入和输出的对应关系。

较大的 GPT-2、GPT-3 视图主要用于比较网络结构与规模，未加载对应大模型的真实权重。页面采用 GPT 风格的教学结构，不代表所有现代大模型的完整实现。注意力权重也不能单独完整解释模型的决策。

## 中文版改动

- 新增面向初学者的中文首页、学习路线和术语表。
- 翻译全部十个讲解章节、目录、欢迎引导、主要操作文字与三维模型数值标签；公式和模型名称保留常用记法。
- 保留动画与彩色术语的关联，把解释改写成“看什么、怎样算、为什么”的顺序。
- 补充因果遮罩、logits、温度与残差的准确说明，去掉对未公开模型结构的推测。
- 补充三维渲染所需的中文距离场字形，支持中文标签显示。

仓库还保留了原项目的 CPU、流体和编码实验代码。这些附属实验不在本次大模型教程的中文化范围内；原作者个人主页源码也保留，中文入口使用独立组件。

## 本地运行

需要 Node.js 20.9 或更高版本。

```bash
npm install --legacy-peer-deps
npm run dev
```

浏览器打开 `http://localhost:3002`。需要支持 WebGL 2，并开启硬件加速。使用新版 Chrome、Edge、Firefox 或 Safari。

```bash
npm run typecheck
npm run build
```

项目使用 Next.js 静态导出，构建结果在 `out/`，可以放到支持静态文件的托管服务。`npm start` 不用于预览静态导出；可运行：

```bash
python3 -m http.server 3003 --directory out
```

然后打开 `http://localhost:3003`。本仓库尚未配置在线部署。

### 中文三维字体维护

网页正文使用设备上的中文字体。三维标签使用随项目提供的小型字形图集，无需下载完整中文字库。若新增三维标签汉字，可安装 Pillow、numpy、scipy 后，用 Noto Sans SC 字体执行：

```bash
python3 scripts/build-chinese-atlas.py /path/to/NotoSansSC.ttf
```

对应字体采用 SIL Open Font License，许可保存在 [`public/fonts/NotoSansSC-OFL.txt`](public/fonts/NotoSansSC-OFL.txt)。

## 来源与许可

- 原项目：[bbycroft/llm-viz](https://github.com/bbycroft/llm-viz)，作者 Brendan Bycroft。
- 原版演示：[bbycroft.net/llm](https://bbycroft.net/llm)。
- 教学模型与参考：[minGPT](https://github.com/karpathy/minGPT)、[Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html)。
- 代码采用 [MIT 许可](LICENSE)。原作者个人首页（`src/homepage/` 中的原始文件、`public/me.jpeg`）及第三方字体、RISC-V 测试资源等保留其原有权利和许可。本次新增的中文首页与中文化代码按 MIT 许可提供。
