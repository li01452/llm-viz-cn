import React from 'react';
import { LayerView } from '@/src/llm/LayerView';
import { InfoButton } from '@/src/llm/WelcomePopup';

export const metadata = {
  title: '大模型可视化 · 中文交互教程',
  description: '从字母排序的小型 GPT 出发，用三维动画理解词元、嵌入、自注意力与逐词元生成。',
};

import { Header } from '@/src/homepage/Header';

export default function Page() {
    return <>
        <Header title="大模型可视化">
            <InfoButton />
        </Header>
        <LayerView />
        <div id="portal-container"></div>
    </>;
}
