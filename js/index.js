const scale = document.getElementById('scale');
const speed = document.getElementById('speed');
const lines = document.getElementById('lines');
const info = document.getElementById('info');
const orbits = document.querySelectorAll('.orbit');
const planets = document.querySelectorAll('.planet');

const orbitsVal = [38, 72, 100, 152, 520, 958, 1920, 3010];
const planetsVal = [4, 9, 10, 5, 112, 95, 40, 39];
const planetSpeeds = [0.2, 0.6, 1, 1.9, 11.9, 29.5, 84, 164.8];

const details = [
  {
    name: 'mercury',
    mass: 3.285e23,
    distance: 35.98,
    period: 88
  },
  {
    name: 'venus',
    mass: 4.867e24,
    distance: 67.24,
    period: 225
  },
  {
    name: 'earth',
    mass: 5.972e24,
    distance: 92.96,
    period: 365
  },
  {
    name: 'mars',
    mass: 6.39e23,
    distance: 141.6,
    period: 687
  },
  {
    name: 'jupiter',
    mass: 1.898e27,
    distance: 483.8,
    period: 4333
  },
  {
    name: 'saturn',
    mass: 5.683e26,
    distance: 890.8,
    period: 10756
  },
  {
    name: 'uranus',
    mass: 8.681e25,
    distance: 1784,
    period: 30687
  },
  {
    name: 'neptune',
    mass: 1.024e26,
    distance: 2793,
    period: 60190
  }
]

function scaleSystem() {
  let size = scale.value;
  document.getElementById('sun').style.width = (10 - size + 5) + 'px';
  document.getElementById('sun').style.height = (10 - size + 5) + 'px';
  
  for (let i = 0; i < orbits.length; i++) {
    orbits[i].style.width = (orbitsVal[i] / size) + 'px';
    orbits[i].style.height = (orbitsVal[i] / size) + 'px';
    planets[i].style.width = (planetsVal[i] / size) + 'px';
    planets[i].style.height = (planetsVal[i] / size) + 'px';
    planets[i].style.top = -((planetsVal[i] / size) / 2) + 'px';
  }
}


scale.addEventListener('input', scaleSystem);

speed.addEventListener('input', () => {
  let s = 0;
  orbits.forEach(orbit => {
    orbit.style.animationDuration = (planetSpeeds[s] * speed.value) + 's';
    s++;
  });
});

lines.addEventListener('input', () => {
  if (lines.checked) {
    orbits.forEach(orbit => orbit.style.border = '1px solid rgba(106, 174, 201, 0.5)');
  } else {
    orbits.forEach(orbit => orbit.style.border = 'none');
  }
});


const description = document.getElementById('description');
document.querySelectorAll('input[type="radio"]').forEach(btn => {
  btn.addEventListener('input', () => {
    
    if (btn.value < 4) scale.value = 0.4;
    else scale.value = 5;
    scaleSystem();
    
    description.style.opacity = 1;
    let selected = details[Number(btn.value)];
    let name = selected.name.charAt(0).toUpperCase() +selected.name.slice(1);
    document.getElementById('p-title').innerText = name;
    document.getElementById('p-mass').innerText = selected.mass;
    document.getElementById('p-distance').innerText = selected.distance;
    document.getElementById('p-period').innerText = selected.period;
    
    orbits.forEach(orbit => {
      orbit.style.borderColor = 'rgba(106, 174, 201, 0.5)';
    });
    document.getElementById(selected.name).style.borderColor = 'rgba(183, 28, 28, 0.7)';
  });
});