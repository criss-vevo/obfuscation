// Criss Vevo Professional Obfuscator

const securitySlider = document.getElementById('securitySlider');
const levelValue = document.getElementById('levelValue');
const inputCode = document.getElementById('inputCode');
const outputCode = document.getElementById('outputCode');
const obfuscateBtn = document.getElementById('obfuscateBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const dots = document.querySelectorAll('.dot');

// Security levels and options
const levels = {
  1: {
    label: 'BASIC',
    options: {
      compact: true,
      controlFlowFlattening: false,
      deadCodeInjection: false,
      stringArray: false,
      numbersToExpressions: false,
    }
  },
  2: {
    label: 'MEDIUM',
    options: {
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.5,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.2,
      stringArray: true,
      stringArrayThreshold: 0.7,
      numbersToExpressions: true,
      splitStrings: false,
    }
  },
  3: {
    label: 'ADVANCED',
    options: {
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 1,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 1,
      stringArray: true,
      stringArrayThreshold: 1,
      splitStrings: true,
      splitStringsChunkLength: 4,
      numbersToExpressions: true,
      simplify: true,
      rotateStringArray: true,
      selfDefending: true,
      transformObjectKeys: true,
    }
  }
};

securitySlider.addEventListener('input', () => {
  const val = parseInt(securitySlider.value, 10);
  levelValue.textContent = levels[val].label;
  dots.forEach((dot, idx) => dot.classList.toggle('active', idx === val - 1));
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
    outputCode.value =
      `// Obfuscated by Criss Vevo [${levels[securitySlider.value].label}]\n` +
      obfuscated.getObfuscatedCode();
  } catch (e) {
    outputCode.value = `// Error: ${e.message}`;
  }
});

copyBtn.addEventListener('click', () => {
  outputCode.select();
  document.execCommand('copy');
});

downloadBtn.addEventListener('click', () => {
  const blob = new Blob([outputCode.value], { type: "text/javascript" });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = "criss-vevo-obfuscated.js";
  a.click();
});

// Initial state - set active dot
document.addEventListener('DOMContentLoaded', () => {
  levelValue.textContent = levels[securitySlider.value].label;
  dots.forEach((dot, idx) => dot.classList.toggle('active', idx === parseInt(securitySlider.value, 10) - 1));
});
