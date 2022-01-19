const zichtafstand = 20;
const dimensies = 2;

const boids = [
    {
        pos: [10, 10],
        snelheid: [2, 3]
    },
    {
        pos: [3, 4],
        snelheid: [3, 2]
    },
    {
        pos: [5, 2],
        snelheid: [4, 1]
    }
];

console.log([1, 2, 3][1]);

const magic = array => {
    if (array[0]) {
        for (const key of Object.keys(array[0])) {
            Object.defineProperty(array, key, {
                get: () => array.map((entry) => entry[key])
            });
        }
    }
    return array;
};

const it = (aantal) => Array.from(Array(aantal)).map((_, i) => i);
const totaal = array => array.reduce((a, b) => a + b);

const dimensielijst = it(dimensies);

const afstand = (a, b) => Math.sqrt(totaal(dimensielijst.map(d => (a[d] - b[d]) ** 2)));

const gemiddelde = vectoren => vectoren
    .reduce((a, b) => a.map((a, d) => a + b[d]))
    .map(coordinaat => coordinaat / boids.length);

const zichtbareBoids = (boid, boids, radius = zichtafstand) => boids.filter(mate => afstand(mate, boid) <= radius && mate != boid);

const boidsMetStats = (boid, boids) => ({
    mates: boids.map(mate => ({
        ...mate,
        afstand: afstand(boid, mate)
    })),
    centrum: gemiddelde(boids.pos),
    richting: gemiddelde(boids.snelheid)
});

const step = boids => boids.map((boid, _, boids) => {
    const zichtbareMates = zichtbareBoids(boid, boids);

    console.log(zichtbareMates);


});

step(boids);