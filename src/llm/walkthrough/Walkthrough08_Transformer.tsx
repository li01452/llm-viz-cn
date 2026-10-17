import { Vec3 } from "@/src/utils/vector";
import { Phase } from "./Walkthrough";
import { commentary, IWalkthroughArgs, setInitialCamera } from "./WalkthroughTools";

export function walkthrough08_Transformer(args: IWalkthroughArgs) {
    let { walkthrough: wt, state } = args;

    if (wt.phase !== Phase.Input_Detail_Transformer) {
        return;
    }

    setInitialCamera(state, new Vec3(-135.531, 0.000, -353.905), new Vec3(291.100, 13.600, 5.706));

    let c0 = commentary(wt, null, 0)`一个完整的 _Transformer 模块_包括：层归一化 → 因果自注意力 → 投影与残差相加 → 层归一化 → MLP 与残差相加。

把这样的模块重复堆叠，上一层输出成为下一层输入，就构成了 GPT 风格模型的主体。每层使用各自的权重，表示会逐层更新；残差通路贯穿其中。

可以把每层理解为对表示进行一轮加工，但不能机械地认定“第一层只学语法，最后一层只懂意义”。特征往往分布在许多层和许多神经元中，不同任务与模型也会不同。这里的小模型只为字母排序训练，更不能据此推断它掌握了自然语言。

回看整张图：你能找到每个模块中的注意力、MLP 和两条残差连接吗？下一步，我们看最后的表示怎样变成词元概率。`;

}
