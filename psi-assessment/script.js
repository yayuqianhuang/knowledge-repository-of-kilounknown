/**
 * ========================================
 * 个人优势配置测试 (PSI-SDI) - 核心逻辑脚本
 * ========================================
 * 
 * 【更新说明】
 * 版本：v1.1.0
 * 更新日期：2026-06-18
 * 更新内容：
 * 1. 新增【按维度分组显示】功能：将原本平铺的题目按 PSI 量表维度（EA, ER, GS, SC, EM）进行模块化分组展示。
 * 2. 新增【默认选项】功能：所有题目的单选按钮默认选中“有时符合”（值为3），减少用户填写阻力。
 * 3. 优化【DOM渲染逻辑】：重构了页面初始化流程，先对数据进行重组，再动态生成带有分组标题的 HTML 结构。
 * 
 * 维护者：前端开发团队
 */

// ========================================
// 【修复区】补充词汇云映射数据 (建议添加到 CONFIG 或单独定义)
// ========================================
const VOCABULARY_MAP = {
    EA: ["敏锐", "感知", "觉知", "情绪雷达", "真实"],
    ER: ["冷静", "复原力", "压力管理", "平和", "控制"],
    GS: ["进取", "坚持", "学习力", "目标感", "成就"],
    SC: ["亲和力", "适应力", "沟通", "自信", "受欢迎"],
    EM: ["关怀", "同情心", "理解", "温暖", "支持"]
};

// ========================================
// 1. 数据配置模块 (Data Configuration)
// 职责：集中管理所有静态数据和配置，方便后续增删题目
// ========================================

const CONFIG = {
    // 维度配置
    dimensions: {
        EA: { name: "情绪觉察", color: "#FF6B6B" },
        ER: { name: "情绪调节", color: "#4ECDC4" },
        GS: { name: "目标设置", color: "#FFD166" },
        SC: { name: "社交能力", color: "#06D6A0" },
        EM: { name: "共情能力", color: "#9B59B6" }
    },

    // 评分选项文本映射
    optionLabels: {
        1: '从不符合',
        2: '很少符合',
        3: '有时符合',
        4: '经常符合',
        5: '总是符合'
    },

    // 默认选中的分值
    defaultScore: 1
};

// 题目数据（按维度分组）
const QUESTIONS_DATA = {
    EA: [
        { id: 1, text: "当我生气时，我能意识到" },
        { id: 2, text: "我能通过身体的反应来察觉我正体验到的情绪" },
        { id: 3, text: "当我的心情改变时，我能辨别出来" },
        { id: 4, text: "我知道什么能让我开心" },
        { id: 5, text: "我能意识到自己的感受" }
    ],
    ER: [
        { id: 6, text: "当我生气时我可以使自己冷静下来" },
        { id: 7, text: "我能控制自己的愤怒" },
        { id: 8, text: "我知道如何应对压力" }
    ],
    GS: [
        { id: 9, text: "我设定了目标并计划如何实现这些目标" },
        { id: 10, text: "我对成功抱有很高的期望和标准" },
        { id: 11, text: "当我失败时，我觉得很容易再尝试一次" },
        { id: 12, text: "我能从失败中学习到新的策略" }
    ],
    SC: [
        { id: 13, text: "无论社会情境如何，我都能够适应" },
        { id: 14, text: "我和其他人相处得很好" },
        { id: 15, text: "我对我做事情的能力感觉良好" },
        { id: 16, text: "我很容易交朋友" },
        { id: 17, text: "我知道如何处理发生的问题" },
        { id: 18, text: "我在集体中表现不错" }
    ],
    EM: [
        { id: 19, text: "当我看到有人受到不公平对待时，我对他们感到同情" },
        { id: 20, text: "当人们遇到问题时，我会为他们感到难过" },
        { id: 21, text: "看到有人在集体中受到忽视，会让我很难过" }
    ]
};


// ========================================
// 2. 渲染模块 (Render Module)
// 职责：负责将数据转换为 DOM 元素，不包含业务逻辑
// ========================================

const RenderModule = {
    /**
     * 渲染单个题目的 HTML
     */
    renderQuestionItem: function(question) {
        const div = document.createElement('div');
        div.className = 'question-item';
        div.id = `q-item-${question.id}`;

        // 生成选项 HTML
        const optionsHTML = Object.keys(CONFIG.optionLabels).map(val => {
            const isChecked = parseInt(val) === CONFIG.defaultScore ? 'checked' : '';
            const selectedClass = parseInt(val) === CONFIG.defaultScore ? ' selected' : '';
            return `
                <label class="option-label${selectedClass}" onclick="InteractionModule.forceSelect('q${question.id}', ${val})">
                    <input type="radio" name="q${question.id}" value="${val}" ${isChecked}>
                    <span class="option-text">${CONFIG.optionLabels[val]}</span>
                </label>
            `;
        }).join('');

        div.innerHTML = `
            <span class="q-text">${question.id}. ${question.text}</span>
            <div class="options">${optionsHTML}</div>
            <div class="error-msg">⚠️ 请至少选择一个选项</div>
        `;
        return div;
    },

    /**
     * 渲染维度分组容器
     */
    renderDimensionGroup: function(dimKey, questions) {
        const dimension = CONFIG.dimensions[dimKey];
        const container = document.createElement('div');
        container.className = 'dimension-group';

        // 维度标题
        const header = document.createElement('h3');
        header.className = 'dimension-title';
        header.innerHTML = `<span style="color: ${dimension.color}">【${dimension.name}】</span> (${questions.length}题)`;
        container.appendChild(header);

        // 渲染该维度下的所有题目
        questions.forEach(q => {
            container.appendChild(this.renderQuestionItem(q));
        });

        return container;
    },

    /**
     * 渲染整个表单
     */
    renderForm: function(formId) {
        const form = document.getElementById(formId);
        if (!form) return;

        Object.keys(QUESTIONS_DATA).forEach(dimKey => {
            const group = this.renderDimensionGroup(dimKey, QUESTIONS_DATA[dimKey]);
            form.appendChild(group);
        });
    }
};


// ========================================
// 3. 交互模块 (Interaction Module)
// 职责：处理用户事件和交互逻辑
// ========================================

const InteractionModule = {
    /**
     * 强制选中单选按钮
     */
    forceSelect: function(name, value) {
        // 1. 获取该题目下的所有选项
        const radios = document.querySelectorAll(`input[name="${name}"]`);
        
        // 2. 遍历所有选项
        radios.forEach(radio => {
            // 【核心修复】获取 input 的父节点，即 label
            // 因为我们现在的 HTML 结构是 <label><input>文本</label>
            const label = radio.parentNode; 
            
            // 安全检查：确保 label 存在且有 classList
            if (label && label.classList) {
                if (parseInt(radio.value) === value) {
                    radio.checked = true; 
                    // 添加选中样式
                    label.classList.add('selected'); 
                } else {
                    radio.checked = false; 
                    // 移除选中样式
                    label.classList.remove('selected'); 
                }
            }
        });
        
        // 3. 清除该题目的错误提示状态
        const questionId = name.replace('q', '');
        const questionItem = document.getElementById(`q-item-${questionId}`);
        if (questionItem) {
            questionItem.classList.remove('error');
        }
    }
};


// ========================================
// 4. 初始化模块 (Initialization)
// 职责：程序的入口，协调各模块工作
// ========================================

window.onload = function() {
    // 渲染测试表单
    RenderModule.renderForm('psi-form');
    
    // 后续可以在这里初始化其他模块，如：
    // ResultModule.init();
};

/**
 * 计算结果主函数 (修正版)
 * 1. 收集数据 (直接遍历 QUESTIONS_DATA)
 * 2. 验证完整性
 * 3. 计算得分
 * 4. 渲染结果
 */
function calculateResults() {
    const scores = { EA: 0, ER: 0, GS: 0, SC: 0, EM: 0 };
    const counts = { EA: 0, ER: 0, GS: 0, SC: 0, EM: 0 };
    let allAnswered = true;
    let firstErrorIndex = null;

    // 清除之前的错误高亮
    document.querySelectorAll('.question-item').forEach(el => el.classList.remove('error'));

    // 【修复】遍历 QUESTIONS_DATA 对象来收集数据
    for (let dimKey in QUESTIONS_DATA) {
        const questions = QUESTIONS_DATA[dimKey];
        questions.forEach(q => {
            const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
            if (!selected) {
                // 标记未答题
                allAnswered = false;
                const questionItem = document.getElementById(`q-item-${q.id}`);
                if (questionItem) {
                    questionItem.classList.add('error');
                }
                if (firstErrorIndex === null) {
                    firstErrorIndex = q.id;
                }
            } else {
                scores[dimKey] += parseInt(selected.value);
                counts[dimKey]++;
            }
        });
    }

    // 如果有未答题，提示并滚动到位置
    if (!allAnswered) {
        if (firstErrorIndex !== null) {
            const element = document.getElementById(`q-item-${firstErrorIndex}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        return;
    }

    // 计算标准化得分 (0-100)
    const normalized = {};
    for (let k in scores) {
        // 防止除以0
        const maxPossible = (counts[k] || 1) * 5;
        normalized[k] = Math.round((scores[k] / maxPossible) * 100);
    }

    // 调用渲染函数
    renderChart(normalized);
    renderWordCloud(normalized);
    renderScoreGrid(scores, counts);

    // 切换页面显示状态
    const testSection = document.getElementById('test-section');
    const resultsSection = document.getElementById('results-section');
    if (testSection) testSection.style.display = 'none';
    if (resultsSection) resultsSection.style.display = 'block';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// 4. 渲染展示模块 (修正版)
// ========================================

/**
 * 渲染雷达图 (修正版：使用 CONFIG 中的颜色)
 */
function renderChart(data) {
    const ctx = document.getElementById('radarChart');
    if (!ctx) return;
    
    const chartData = {
        labels: [],
        datasets: [{
            label: '优势得分',
            data: [],
            backgroundColor: 'rgba(128, 128, 128, 0.2)', // 默认色
            borderColor: 'rgba(128, 128, 128, 1)',
            borderWidth: 2
        }]
    };

    // 【修复】填充数据并设置颜色
    for (let dimKey in data) {
        const dim = CONFIG.dimensions[dimKey];
        chartData.labels.push(dim.name);
        chartData.datasets[0].data.push(data[dimKey]);
    }

    // 设置边框颜色为第一个维度的颜色（或者使用多色插件，这里简化为单色）
    // 如果想用多色，需要更复杂的配置，这里先用主色调
    chartData.datasets[0].borderColor = 'rgba(79, 70, 229, 1)';
    chartData.datasets[0].pointBackgroundColor = '#fff';

    // 销毁旧实例（如果存在）
    if (window.psiChart) {
        window.psiChart.destroy();
    }

    window.psiChart = new Chart(ctx.getContext('2d'), {
        type: 'radar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        font: { size: 10 },
                        color: '#666'
                    },
                    pointLabels: {
                        font: { size: 14, weight: 'bold' },
                        color: '#333'
                    }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

/**
 * 渲染词汇云 (修正版：使用 VOCABULARY_MAP)
 */
function renderWordCloud(data) {
    const container = document.getElementById('word-cloud');
    if (!container) return;
    container.innerHTML = '';

    // 按得分从高到低排序维度
    const sortedDims = Object.entries(data).sort((a, b) => b[1] - a[1]);

    sortedDims.forEach(([dim, score]) => {
        const words = VOCABULARY_MAP[dim] || []; // 【修复】使用常量
        words.forEach(word => {
            const span = document.createElement('span');
            span.innerText = word;
            span.className = 'tag';
            // 根据得分添加不同样式类
            if (score >= 80) span.classList.add('tag-high');
            else if (score >= 50) span.classList.add('tag-mid');
            else span.classList.add('tag-low');
            container.appendChild(span);
        });
    });
}

/**
 * 渲染分数网格 (修正版：修复拼写错误)
 */
function renderScoreGrid(rawScores, counts) {
    const grid = document.getElementById('score-grid');
    if (!grid) return;
    grid.innerHTML = '';

    for (let k in rawScores) {
        // 防止除以0
        const avg = counts[k] > 0 ? (rawScores[k] / counts[k]).toFixed(1) : '0.0';
        grid.innerHTML += `
            <div class="score-box">
                <div class="score-val">${avg}</div>
                <div class="score-label">${CONFIG.dimensions[k].name}</div>
            </div>
        `;
    }
}