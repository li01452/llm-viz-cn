import { Vec3 } from "@/src/utils/vector";
import { Phase } from "./Walkthrough";
import { commentary, IWalkthroughArgs, setInitialCamera } from "./WalkthroughTools";

export function walkthrough05_Softmax(args: IWalkthroughArgs) {
    let { walkthrough: wt, state } = args;

    if (wt.phase !== Phase.Input_Detail_Softmax) {
        return;
    }

    setInitialCamera(state, new Vec3(-24.350, 0.000, -1702.195), new Vec3(283.100, 0.600, 1.556));

    let c0 = commentary(wt, null, 0)`_Softmax_ 把一组实数分数转换成总和为 1 的非负权重。它既用于注意力内部，也用于模型末尾生成词元概率。

先对每个分数取指数 exp(x)，再除以所有指数值的总和：

softmax(x_i) = exp(x_i) / Σ exp(x_j)

例如两个分数都是 0，那么 exp(0)=1，各自的权重就是 1/2。分数较大，得到的权重也较大。注意力里的权重表示如何混合信息；末尾的概率表示如何选择下一个词元，两者用途不同。

直接对大数取指数可能溢出。实际计算会先从所有分数中减去最大值，再取指数、除以总和。减去同一个常数不改变 Softmax 结果，却能使计算更稳定。

观察注意力矩阵时，每次处理一行，并且只包含当前位置及之前的位置。图中的汇总区存放这一行的最大值以及平移后指数的总和，方便各格子复用。

Softmax 与“只选最大项”有什么区别？只选最大项的选择规则叫 argmax；把选中项表示为 1、其余为 0，得到的是单一选择。Softmax 则保留多个位置的相对权重，最大项不一定接近 1，也不保证模型预测正确。`;

}
