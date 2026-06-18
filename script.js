// ========================================
// 1. 数据配置模块
// ========================================

// 测试题目数据
// dim: 对应 PSI 量表的维度缩写
const questions = [
    { id: 1, text: "当我生气时，我能意识到", dim: "EA" },
    { id: 2, text: "我设定了目标并计划如何实现这些目标", dim: "GS" },
    { id: 3, text: "无论社会情境如何，我都能够适应", dim: "SC" },
    { id: 4, text: "我能通过身体的反应来察觉我正体验到的情绪", dim: "EA" },
    { id: 5, text: "当我生气时我可以使自己冷静下来", dim: "ER" },
    { id: 6, text: "我对成功抱有很高的期望和标准", dim: "GS" },
    { id: 7, text: "当我的心情改变时，我能辨别出来", dim: "EA" },
    { id: 8, text: "当我失败时，我觉得很容易再尝试一次", dim: "GS" },
    { id: 9, text: "我和其他人相处得很好", dim: "SC" },
    { id: 10, text: "我对我做事情的能力感觉良好", dim: "SC" },
    { id: 11, text: "我知道什么能让我开心", dim: "EA" },
    { id: 12, text: "我能控制自己的愤怒", dim: "ER" },
    { id: 13, text: "我知道如何应对压力", dim: "ER" },
    { id: 14, text: "我很容易交朋友", dim: "SC" },
    { id: 15, text: "我能意识到自己的感受", dim: "EA" },
    { id: 16, text: "我知道如何处理发生的问题", dim: "SC" },
    { id: 17, text: "我能从失败中学习到新的策略", dim: "GS" },
    { id: 18, text: "当我看到有人受到不公平对待时，我对他们感到同情", dim: "EM" },
    { id: 19, text: "我在集体中表现不错", dim: "SC" },
    { id: 20, text: "当人们遇到问题时，我会为他们感到难过", dim: "EM" },
    { id: 21, text: "看到有人在集体中受到忽视，会让我很难过", dim: "EM" }
];

// SDI 风格的优势词汇映射
// 根据得分维度展示不同的优势词汇
const vocabularyMap = {
    EA: ["内省的", "自我觉察的", "深思熟虑的", "专注当下的", "敏感的", "有洞察力的"],
    ER: ["冷静的", "坚韧的", "沉着的", "稳重的", "自律的", "适应性强的"],
    GS: ["有驱动力的", "目标导向的", "坚定的", "有抱负的", "策略性思考者", "专注的"],
    SC: ["协作的", "有魅力的", "社交智能的", "有外交手腕的", "有影响力的", "团队合作者"],
    EM: ["有同理心的", "有同情心的", "关怀的", "深情的", "支持性的", "善解人意的"]
};

// 维度名称映射 (用于图表显示)
const dimNames = {
    EA: "情绪觉察",
    ER: "情绪调节",
    GS: "目标设置",
    SC: "社交能力",
    EM: "共情能力"
};

// ========================================
// 2. 页面初始化模块
// ========================================

// 页面加载完成后执行
window.onload = function() {
    // 获取表单容器
    const form = document.getElementById('psi-form');
    
    // 遍历题目数据，动态生成 HTML
    questions.forEach(q => {
        const div = document.createElement('div');
        div.className = 'question-item';
        div.id = `q-item-${q.id}`;
        
        // 生成五个评分选项
        const optionsHTML = [1,2,3,4,5].map(val => `
            <label class="option-label" onclick="forceSelect('q${q.id}', ${val})">
                <input type="radio" name="q${q.id}" value="${val}">
                ${val === 1 ? '从不符合' : 
                   val === 2 ? '很少符合' : 
                   val === 3 ? '有时符合' : 
                   val === 4 ? '经常符合' : '总是符合'}
            </label>
        `).join('');
        
        div.innerHTML = `
            <span class="q-text">${q.id}. ${q.text}</span>
            <div class="options">${optionsHTML}</div>
            <div class="error-msg">⚠️ 请至少选择一个选项</div>
        `;
        form.appendChild(div);
    });
};

/**
 * 强制选中函数 (修复版)
 * 策略：利用 label 包含 input 的结构，通过 parentNode 查找
 */
function forceSelect(name, value) {
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

/**
 * 计算结果主函数
 * 1. 收集数据
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

    // 遍历题目，统计分数
    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
        if (!selected) {
            // 标记未答题
            allAnswered = false;
            document.getElementById(`q-item-${q.id}`).classList.add('error');
            if (firstErrorIndex === null) firstErrorIndex = index;
        } else {
            scores[q.dim] += parseInt(selected.value);
            counts[q.dim]++;
        }
    });

    // 如果有未答题，提示并滚动到位置
    if (!allAnswered) {
        if (firstErrorIndex !== null) {
            document.getElementById(`q-item-${questions[firstErrorIndex].id}`)
                   .scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    // 计算标准化得分 (0-100)
    const normalized = {};
    for (let k in scores) {
        normalized[k] = Math.round((scores[k] / (counts[k] * 5)) * 100);
    }

    // 调用渲染函数
    renderChart(normalized);
    renderWordCloud(normalized);
    renderScoreGrid(scores, counts);

    // 切换页面显示状态
    document.getElementById('test-section').style.display = 'none';
    document.getElementById('results-section').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// 4. 渲染展示模块
// ========================================

/**
 * 渲染雷达图
 * 使用 Chart.js 展示五个维度的得分
 */
function renderChart(data) {
    const ctx = document.getElementById('radarChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.keys(data).map(k => dimNames[k]),
            datasets: [{
                label: '优势得分',
                data: Object.values(data),
                backgroundColor: 'rgba(79, 70, 229, 0.2)',
                borderColor: 'rgba(79, 70, 229, 1)',
                borderWidth: 2,
                pointBackgroundColor: '#fff',
                pointBorderColor: 'rgba(79, 70, 229, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { stepSize: 20, font: { size: 10 } },
                    pointLabels: { font: { size: 14, weight: 'bold' } }
                }
            },
            plugins: { legend: { display: false } }
        }
    });
}

/**
 * 渲染词汇云
 * 根据得分高低展示不同大小和颜色的词汇标签
 */
function renderWordCloud(data) {
    const container = document.getElementById('word-cloud');
    container.innerHTML = '';
    
    // 按得分从高到低排序维度
    const sortedDims = Object.entries(data).sort((a, b) => b[1] - a[1]);
    
    sortedDims.forEach(([dim, score]) => {
        const words = vocabularyMap[dim] || [];
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
 * 渲染分数网格
 * 展示每个维度的原始平均分
 */
function renderScoreGrid(rawScores, counts) {
    const grid = document.getElementById('score-grid');
    grid.innerHTML = '';
    
    for (let k in rawScores) {
        const avg = (rawScores[k] / counts[k]).toFixed(1);
        grid.innerHTML += `
            <div class="score-box">
                <div class="score-val">${avg}</div>
                <div class="score-label">${dimNames[k]}</div>
            </div>
        `;
    }
}