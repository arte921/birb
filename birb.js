const zichtafstand = 20;
const dimensies = 2;
const streefafstand = 2;

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

const it = (aantal) => Array.from(Array(aantal)).map((_, i) => i);
const totaal = array => array.reduce((a, b) => a + b);

const dimensielijst = it(dimensies);

const lengte = vector => Math.sqrt(totaal(vector.map(c => c ** 2)));

const afstand = (a, b) => Math.sqrt(totaal(dimensielijst.map(d => (a[d] - b[d]) ** 2)));

const metLengte = (vector, lengte, x = Math.sqrt(lengte ** 2 / totaal(vector.map(c => c ** 2)))) => vector.map(c => c * x);

console.log((metLengte([3, 4], 12)));

const gemiddelde = vectoren => vectoren
    .reduce((a, b) => a.map((a, d) => a + b[d]))
    .map(coordinaat => coordinaat / boids.length);

const zichtbareBoids = (boid, boids, radius = zichtafstand) => boids.filter(mate => afstand(mate.pos, boid.pos) <= radius && mate != boid);

const boidsMetStats = (boid, boids) => ({
    mates: boids.map(mate => ({
        ...mate,
        afstand: afstand(boid.pos, mate.pos),
        absoluteSnelheid: lengte(boid.snelheid)
    })),
    centrum: gemiddelde(boids.map(b => b.pos)),
    richting: gemiddelde(boids.map(b => b.snelheid))
});

const step = boids => boids.map((boid, _, boids) => {
    const zichtbareMates = boidsMetStats(boid, zichtbareBoids(boid, boids));

    console.log(zichtbareMates);
});

step(boids);