import { Vec3 } from "@/src/utils/vector";
import { Phase } from "./Walkthrough";
import { commentary, DimStyle, IWalkthroughArgs, moveCameraTo, setInitialCamera } from "./WalkthroughTools";
import { lerp, lerpSmoothstep } from "@/src/utils/math";
import { processUpTo, startProcessBefore } from "./Walkthrough00_Intro";

export function walkthrough06_Projection(args: IWalkthroughArgs) {
    let { walkthrough: wt, state, layout, tools: { breakAfter, afterTime, c_blockRef, c_dimRef, cleanup } } = args;

    if (wt.phase !== Phase.Input_Detail_Projection) {
        return;
    }

    setInitialCamera(state, new Vec3(-73.167, 0.000, -270.725), new Vec3(293.606, 2.613, 1.366));
    let block = layout.blocks[0];
    wt.dimHighlightBlocks = [...block.heads.map(h => h.vOutBlock), block.projBias, block.projWeight, block.attnOut];

    let outBlocks = block.heads.map(h => h.vOutBlock);

    commentary(wt, null, 0)`每个注意力头都输出一组混合后的 V 向量，混合比例由 Q 与 K 的匹配分数决定。

把不同头的${c_blockRef('输出向量', outBlocks)}沿特征方向拼接起来。例如位置 ${c_dimRef('t = 4', DimStyle.T)}：3 个长度为 ${c_dimRef('A = 16', DimStyle.A)} 的向量，拼成一个长度为 ${c_dimRef('C = 48', DimStyle.C)} 的向量。拼接不是相加，而是把数字接在一起。`;

    breakAfter();

    let t_fadeOut = afterTime(null, 1.0, 0.5);
    // let t_zoomToStack = afterTime(null, 1.0);
    let t_stack = afterTime(null, 1.0);

    breakAfter();

    commentary(wt)`本模型每个头的维度 ${c_dimRef('A = 16', DimStyle.A)} 等于 ${c_dimRef('C', DimStyle.C)} / 头数，所以拼接后的长度刚好恢复为 ${c_dimRef('C', DimStyle.C)}。

接着做_输出投影_：每列分别乘以投影矩阵并加上偏置，让不同头的信息进一步混合。这里的投影是一种学到的线性变换，不必理解成投到平面上的影子。`;

    breakAfter();

    let t_process = afterTime(null, 3.0);

    breakAfter();

    commentary(wt)`注意力的结果不会直接替换原输入。我们把它与该子层的原始输入逐项相加，这叫_残差连接（Residual Connection）_。绿色竖向箭头表示这条保留原输入的通路。

可以理解为：在原来的表示上，加一份这一步计算出的更新。`;

    breakAfter();

    let t_zoomOut = afterTime(null, 1.0, 0.5);
    let t_processResid = afterTime(null, 3.0);

    cleanup(t_zoomOut, [t_fadeOut, t_stack]);

    breakAfter();

    commentary(wt)`残差连接有助于训练深层网络。图中的旁路执行的是相加，不是又经过一套注意力计算。

现在，带有注意力更新的表示进入 Transformer 的下一部分：前馈网络。`;

    breakAfter();

    if (t_fadeOut.active) {
        for (let head of block.heads) {
            for (let blk of head.cubes) {
                if (blk !== head.vOutBlock) {
                    blk.opacity = lerpSmoothstep(1, 0, t_fadeOut.t);
                }
            }
        }
    }

    if (t_stack.active) {
        let targetZ = block.attnOut.z;
        for (let headIdx = 0; headIdx < block.heads.length; headIdx++) {
            let head = block.heads[headIdx];
            let targetY = head.vOutBlock.y + head.vOutBlock.dy * (headIdx - block.heads.length + 1);
            head.vOutBlock.y = lerp(head.vOutBlock.y, targetY, t_stack.t);
            head.vOutBlock.z = lerp(head.vOutBlock.z, targetZ, t_stack.t);
        }
    }

    let processInfo = startProcessBefore(state, block.attnOut);

    if (t_process.active) {
        processUpTo(state, t_process, block.attnOut, processInfo);
    }

    moveCameraTo(state, t_zoomOut, new Vec3(-8.304, 0.000, -175.482), new Vec3(293.606, 2.623, 2.618));

    if (t_processResid.active) {
        processUpTo(state, t_processResid, block.attnResidual, processInfo);
    }
}
