import Link from 'next/link';
import s from './ChineseHome.module.scss';

const steps = [
    ['01', '把文字变成数字', '词元与嵌入', '模型先把输入拆成词元，用编号查出向量，再加入位置信息。'],
    ['02', '让不同位置交换信息', '自注意力', '当前位置用 Q 与各位置的 K 匹配，再按权重混合它们的 V。'],
    ['03', '逐层加工表示', 'Transformer 与 MLP', '注意力收集上下文，前馈网络逐个位置加工，残差连接保留原输入。'],
    ['04', '选出下一个词元', '输出与生成', '向量变成分数，分数变成概率。选出一个词元后，接到输入后面继续。'],
];

export function ChineseHome() {
    return <main className={s.page}>
        <nav className={s.nav}><strong>LLM VIZ / 中文版</strong><a href="https://github.com/li01452/llm-viz-cn">GitHub 源码 ↗</a></nav>
        <header className={s.hero}>
            <span className={s.eyebrow}>给好奇的大模型使用者 · 无需编程基础</span>
            <h1>一句话，怎样变成<br /><em>下一个词元？</em></h1>
            <p>走进一个真正运行的小型 GPT。跟随三维动画，看数字如何流动，理解大模型生成内容的基本过程。</p>
            <div className={s.actions}><Link className={s.primary} href="/llm">开始交互学习 →</Link><a href="#route">先看学习路线 ↓</a></div>
            <div className={s.example}><span>本演示的任务</span><code>CBABBC</code><span>→ 逐个生成 →</span><code>ABBBCC</code></div>
            <p className={s.note}>这是学过字母排序的教学模型，不能聊天。你将学到的是 GPT 风格模型的基本计算流程。</p>
        </header>
        <section id="route" className={s.section}>
            <span className={s.eyebrow}>从整体到细节</span><h2>第一次看，沿着这四步走</h2>
            <p>先在演示中看“全程概览”，建立直觉。再从目录选择各计算模块，按空格键或“继续播放”逐步观看。</p>
            <div className={s.grid}>{steps.map(([n,title,term,body])=><article key={n}><span className={s.number}>{n}</span><h3>{title}</h3><small>{term}</small><p>{body}</p></article>)}</div>
        </section>
        <section className={s.section}><h2>先认识四个词，就可以开始</h2>
            <dl className={s.glossary}>
                <div><dt>词元 / token</dt><dd>模型处理的基本单位。本例是 A、B、C；文本模型里可能是字、词的一部分或标点。</dd></div>
                <div><dt>向量 / vector</dt><dd>一列有顺序的数字，用来表示一个位置的信息。多个向量并排放，就形成矩阵。</dd></div>
                <div><dt>权重 / weight</dt><dd>训练时学到的数字。本演示用蓝色表示权重，用绿色表示随输入变化的计算结果。</dd></div>
                <div><dt>推理 / inference</dt><dd>使用已经学好的权重来计算输出。点击播放展示的是推理过程，不是在重新训练。</dd></div>
            </dl>
        </section>
        <section className={s.panel}><h2>怎样观察，才不容易迷路？</h2><p>每到一个模块，只追问三件事：输入是什么？输出是什么？这一步为什么需要？先跟踪一个位置或一个格子，再回到全图。</p><p>拖动三维视图可以旋转，滚轮用于缩放；把鼠标移到格子或彩色术语上，观察计算来源和高亮。选择大模型时主要比较结构规模，完整的数值演示请使用 nano-gpt。</p><Link className={s.primary} href="/llm">进入三维演示 →</Link></section>
        <footer className={s.footer}><p>基于 <a href="https://github.com/bbycroft/llm-viz">Brendan Bycroft 的 LLM Visualization</a> 制作中文学习版本。原始项目与贡献者署名、许可保留。</p><p>本演示采用 GPT 风格的教学结构，不代表所有大模型的完整实现。<a href="https://bbycroft.net/llm">原版演示 ↗</a></p></footer>
    </main>;
}
