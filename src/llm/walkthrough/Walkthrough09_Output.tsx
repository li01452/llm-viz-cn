import { Vec3 } from "@/src/utils/vector";
import { Phase } from "./Walkthrough";
import { commentary, IWalkthroughArgs, setInitialCamera } from "./WalkthroughTools";

export function walkthrough09_Output(args: IWalkthroughArgs) {
    let { walkthrough: wt, state } = args;

    if (wt.phase !== Phase.Input_Detail_Output) {
        return;
    }

    setInitialCamera(state, new Vec3(-20.203, 0.000, -1642.819), new Vec3(281.600, -7.900, 2.298));

    let c0 = commentary(wt, null, 0)`到达模型末尾后，最后一个 Transformer 模块的输出先经过层归一化，再做一次不加偏置的线性变换。

这一步把每个位置的 C 维向量变成词表大小 n_vocab 维的向量：词表里的每个候选词元各得一个原始分数，叫 _logits_。分数可以是负数，也不需要总和为 1；它们本身不是概率。

通过 Softmax，分数才变成各词元的预测概率。本例词表只有 A、B、C，任务也很小，因此往往有一个候选字母的概率特别高。这并不表示模型永远正确。

生成时使用最后一个有效输入位置的概率。例如输入六个词元，就看第六列的输出，从中选出第七个词元。选完接到输入后面，再进行下一轮推理。

一种选择方法是_按概率采样_：概率为 0.9 的词元，在大量重复抽样中大约有 90% 的机会被选到。另一种方法是每次都选概率最高的词元，即贪心选择。高概率也不等于事实正确。

_温度（temperature）_用于调整分布：在 Softmax 前，把 logits 除以一个正的温度值。温度较高时分布通常更平缓；较低时更集中于高分项。它改变选择的随机程度，并不会凭空增加知识。温度为 0 通常表示使用贪心选择的特殊约定，不能直接代入除法。

这解释了生成的基本过程，并不表示本页面提供了所有采样设置。现在回到概览，把“词元 → 向量 → 多层加工 → 分数 → 概率 → 下一个词元”连成一条完整路径。`;

}
