document.addEventListener('DOMContentLoaded', () => {
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 10,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.5,
                anim: {
                    enable: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false
                }
            },
            line_linked: {
                enable: false
            },
            move: {
                speed: 6,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                }
            },
            modes: {
                repulse: {
                    distance: 70,
                    duration: 0.4
                }
            }
        },
        retina_detect: true
    });
});

function showSolution() {
    document.getElementById('solution').style.display = 'block';
}

function drawGraph() {
    const slope = document.getElementById('slope').value;
    const yIntercept = document.getElementById('y-intercept').value;

    var ctx = document.getElementById('graph').getContext('2d');
    if (window.myLineChart !== undefined) {
        window.myLineChart.destroy();
    }
    window.myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from(new Array(20), (val, index) => index - 10),
            datasets: [{
                label: 'Линейная функция',
                data: Array.from(new Array(20), (val, index) => slope * (index - 10) + parseInt(yIntercept)),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function checkTest() {
    const correctAnswer = '2';
    const userAnswer = document.querySelector('input[name="question1"]:checked').value;
    if (userAnswer === correctAnswer) {
        document.getElementById('test-result').textContent = 'Правильно!';
    } else {
        document.getElementById('test-result').textContent = 'Неправильно. Попробуйте ещё раз.';
    }
}
document.addEventListener('mousemove', function(e) {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    let bgPosX = (mouseX / width * 100);
    let bgPosY = (mouseY / height * 100);

    document.querySelector('.interactive-background').style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
});
function calculateRoots() {
    const a = parseFloat(document.getElementById('a-coeff').value);
    const b = parseFloat(document.getElementById('b-coeff').value);
    const c = parseFloat(document.getElementById('c-coeff').value);

    const delta = b*b - 4*a*c;
    let root1, root2;

    if(delta > 0) {
        root1 = (-b + Math.sqrt(delta)) / (2*a);
        root2 = (-b - Math.sqrt(delta)) / (2*a);
        document.getElementById('result').innerHTML = `Корни настоящие и разные: ${root1}, ${root2}`;
    } else if(delta == 0) {
        root1 = -b / (2*a);
        document.getElementById('result').innerHTML = `Корни реальны и повторяются: ${root1}`;
    } else {
        document.getElementById('result').innerHTML = "Корни сложны и различны.";
    }
}
function initQuadraticGraph() {

    var ctx = document.getElementById('quadraticChart').getContext('2d');
    
    quadraticChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'y = ax^2 + bx + c',
                data: [], 
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true, 
            maintainAspectRatio: true,
            elements: {
                line: {
                   tension: 0  
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    display: true,
                    min: -10,  
                    max: 10,
                    ticks: {
                        stepSize: 1
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    min: -10,     
                    max: 10,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            return value.toString().replace('.', ',');  
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: (context) => {
                            const value = context.parsed.y;
                            return `(${context.parsed.x}, ${value})`;
                        }
                    }
                }
            }
        }
    });

}

function updateGraphButton() {

    // Получить текущие значения коэффициентов
    const a = parseFloat(document.getElementById('a-coeff').value);
    const b = parseFloat(document.getElementById('b-coeff').value);
    const c = parseFloat(document.getElementById('c-coeff').value);
  
    // Сгенерировать массив точек для графика
    const points = [];
    for (let x = -10; x <= 10; x += 0.2) {
      points.push({
        x: x,
        y: a*x*x + b*x + c
      });
    }
  
    // Обновить данные графика
    quadraticChart.data.datasets[0].data = points;
  
    // Перерисовать график
    quadraticChart.update();
  
  }
initQuadraticGraph();
document.getElementById('updateGraphButton').addEventListener('click', function() {
    initQuadraticGraph();
});
function updateEquation() {
    const aValue = document.getElementById('aValue').value;
    const bValue = document.getElementById('bValue').value;
    const cValue = document.getElementById('cValue').value;
    const dValue = document.getElementById('dValue').value;
    const eValue = document.getElementById('eValue').value;
    const fValue = document.getElementById('fValue').value;

    const latexCode = `\\[
    \\left\\{
    \\begin{align}
    ${aValue}x + ${bValue}y &= ${cValue} \\\\
    ${dValue}x + ${eValue}y &= ${fValue}
    \\end{align}
    \\right.
    \\]`;

    document.getElementById('equationDisplay').innerHTML = latexCode;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "equationDisplay"]);
}
window.onload = function() {
    updateEquation();
};

function solveSystem() {
    const aValue = parseFloat(document.getElementById('aValue').value);
    const bValue = parseFloat(document.getElementById('bValue').value);
    const cValue = parseFloat(document.getElementById('cValue').value);
    const dValue = parseFloat(document.getElementById('dValue').value);
    const eValue = parseFloat(document.getElementById('eValue').value);
    const fValue = parseFloat(document.getElementById('fValue').value);

    const matrix = math.matrix([[aValue, bValue], [dValue, eValue]]);
    const results = math.matrix([cValue, fValue]);

    try {
        const solution = math.lusolve(matrix, results);
        document.getElementById('solutionDisplay').innerText = 'Решение: x = ' + solution._data[0] + ', y = ' + solution._data[1];
        drawGraph([aValue, bValue, cValue], [dValue, eValue, fValue], solution._data);
    } catch (error) {
        document.getElementById('solutionDisplay').innerText = 'Нет решения';
    }
}
function drawGraph(eq1, eq2, solution) {
    const ctx = document.getElementById('myChart').getContext('2d');
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }
    
    const data = {
        datasets: [{
            label: 'Уравнение 1',
            data: [{x: -10, y: (-eq1[2] + eq1[0] * -10) / eq1[1]}, {x: 10, y: (-eq1[2] + eq1[0] * 10) / eq1[1]}],
            borderColor: 'red',
            borderWidth: 2,
            fill: false,
            type: 'line'
        }, {
            label: 'Уравнение 2',
            data: [{x: -10, y: (-eq2[2] + eq2[0] * -10) / eq2[1]}, {x: 10, y: (-eq2[2] + eq2[0] * 10) / eq2[1]}],
            borderColor: 'blue',
            borderWidth: 2,
            fill: false,
            type: 'line'
        }, {
            label: 'Решение',
            data: [{x: solution[0], y: solution[1]}],
            borderColor: 'green',
            backgroundColor: 'green',
            pointRadius: 5,
            type: 'scatter'
        }]
    };

    const options = {
        scales: {
            x: {type: 'linear', position: 'bottom'},
            y: {type: 'linear'}
        }
    };

    window.myChart = new Chart(ctx, {
        type: 'scatter',
        data: data,
        options: options
    });
}
function factorizeExpression() {
    var input = document.getElementById('expressionInput').value; // Assuming you have an input field with id 'expressionInput'
    var factorized = nerdamer('factor(' + input + ')').toString();
    document.getElementById('factorizedResult').innerHTML = factorized; // Display the result in an element with id 'factorizedResult'
}
// Function to handle raising to power
function performPower() {
    const base = document.getElementById('powerBase').value;
    const exponent = document.getElementById('powerExponent').value;
    const result = Math.pow(base, exponent);
    document.getElementById('result').innerText = `Результат возведения в степень: ${result}`;
}

// Function to handle extracting root
function performRoot() {
    const number = document.getElementById('rootNumber').value;
    const degree = document.getElementById('rootDegree').value;
    const result = Math.pow(number, 1 / degree);
    document.getElementById('result').innerText = `Результат извлечения корня: ${result}`;
}

