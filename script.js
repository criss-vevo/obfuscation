// Criss Vevo Obfuscator - Professional (javascript-obfuscator)

const securitySlider = document.getElementById('securitySlider');
const levelValue = document.getElementById('levelValue');
const inputCode = document.getElementById('inputCode');
const outputCode = document.getElementById('outputCode');
const obfuscateBtn = document.getElementById('obfuscateBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Map slider value to label and obfuscator options
const levels = {
    1: { label: 'BASIC', options: { compact: true, controlFlowFlattening: false, deadCodeInjection: false, stringArray: false } },
    2: { label: 'MEDIUM', options: { compact: true, controlFlowFlattening: true, controlFlowFlatteningThreshold: 0.5, deadCodeInjection: true, deadCodeInjectionThreshold: 0.2, stringArray: true, stringArrayThreshold: 0.75 } },
    3: { label: 'ADVANCED', options: { compact: true, controlFlowFlattening: true, controlFlowFlatteningThreshold: 1, deadCodeInjection: true, deadCodeInjectionThreshold: 1, stringArray: true, stringArrayThreshold: 1, splitStrings: true, splitStringsChunkLength: 5, transformObjectKeys: true, rotateStringArray: true } }
};

securitySlider.addEventListener('input', () => {
    levelValue.textContent = levels[securitySlider.value].label;
});

// Obfuscate using javascript-obfuscator
obfuscateBtn.addEventListener('click', () => {
    const code = inputCode.value;
    if (!code.trim()) {
        outputCode.value = '// Tafadhali andika JavaScript code kwanza (Criss Vevo)';
        return;
    }
    try {
        const options = levels[securitySlider.value].options;
        const obfuscated = window.JavaScriptObfuscator.obfuscate(code, options);
        outputCode.value = `// Obfuscated by Criss Vevo [${levels[securitySlider.value].label}]\n${obfuscated.getObfuscatedCode()}`;
    } catch (e) {
        outputCode.value = `// Error: ${e.message}`;
    }
});

// Copy to clipboard
copyBtn.addEventListener('click', () => {
    outputCode.select();
    document.execCommand('copy');
});

// Download obfuscated code
downloadBtn.addEventListener('click', () => {
    const blob = new Blob([outputCode.value], { type: "text/javascript" });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "criss-vevo-obfuscated.js";
    a.click();
});
