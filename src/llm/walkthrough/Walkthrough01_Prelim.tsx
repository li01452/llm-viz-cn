import React from 'react';
import { Phase } from "./Walkthrough";
import { commentary, embed, IWalkthroughArgs, setInitialCamera } from "./WalkthroughTools";
import s from './Walkthrough.module.scss';
import { Vec3 } from '@/src/utils/vector';

let minGptLink = 'https://github.com/karpathy/minGPT';
let pytorchLink = 'https://pytorch.org/';
let andrejLink = 'https://karpathy.ai/';
let zeroToHeroLink = 'https://karpathy.ai/zero-to-hero.html';

export function walkthrough01_Prelim(args: IWalkthroughArgs) {
    let { state, walkthrough: wt } = args;

    if (wt.phase !== Phase.Intro_Prelim) {
        return;
    }

    setInitialCamera(state, new Vec3(184.744, 0.000, -636.820), new Vec3(296.000, 16.000, 13.500));

    let c0 = commentary(wt, null, 0)`继续之前，先分清两个概念。

_训练_：用大量例子调整权重，让模型学会规律。_推理_：固定已经学好的权重，输入新数据并计算输出。本网页演示的是推理，计算直接在浏览器中进行。观看动画不会重新训练模型。

这里采用 GPT 风格的、仅含解码器的 Transformer：根据已有的词元预测下一个词元。小模型与许多语言模型共享基本计算结构，但本例只学过字母排序，不能聊天。更大的结构视图主要用于比较规模，没有加载对应大模型的真实权重。也不能据此认定所有新模型的内部实现完全相同。

本演示源于 ${embedLink('Andrej Karpathy', andrejLink)} 的 ${embedLink('minGPT', minGptLink)} 项目，它用 ${embedLink('PyTorch', pytorchLink)} 实现了简洁的 GPT。其 ${embedLink("Neural Networks: Zero to Hero", zeroToHeroLink)} 视频课程也是原作者的重要参考。

建议先看“全程概览”，再按嵌入 → 层归一化 → 自注意力 → 投影与残差 → 前馈网络 → 输出的顺序学习。遇到公式，先问：输入是什么？输出是什么？这一步改变了什么？`;

}

export function embedLink(a: React.ReactNode, href: string) {
    return embedInline(<a className={s.externalLink} href={href} target="_blank" rel="noopener noreferrer">{a}</a>);
}

export function embedInline(a: React.ReactNode) {
    return { insertInline: a };
}


// Another similar model is BERT (bidirectional encoder representations from transformers), a "context-aware text encoder" commonly
// used for tasks like document classification and search.  Newer models like Facebook's LLaMA (large language model architecture), continue to use
// a similar transformer architecture, albeit with some minor differences.
