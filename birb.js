const zichtafstand = 20;
const dimensies = 2;
const streefafstand = 2;

const cohesiekracht = 10;
const parralelkracht = 10;
const vermijdingskracht = 10;
const eigenkracht = 10;

const eigensnelheidskracht = 10;
const gemiddeldesnelheidskracht = 10;

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

const vds = callback => (...argument) => callback(vds(callback))(...argument);
const it = (aantal, waarde) => Array.from(Array(aantal)).map((_, i) => waarde || i);
const totaal = array => array.reduce((a, b) => a + b);

const dimensielijst = it(dimensies);

const verschil = (a, b) => dimensielijst.map(d => a[d] - b[d]);

const lengte = vector => Math.sqrt(totaal(vector.map(c => c ** 2)));

const afstand = (a, b) => Math.sqrt(totaal(dimensielijst.map(d => (a[d] - b[d]) ** 2)));

const metLengte = (vector, nieuweLengte = 1, huidigeLengte = lengte(vector)) => vector.map(c => c * nieuweLengte / huidigeLengte);

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
    richting: metLengte(gemiddelde(boids.map(b => b.snelheid))),
    snelheid: lengte(gemiddelde(boids.map(b => b.snelheid)))
});

const step = boids => boids.map(boid => {
    const zichtbareMates = boidsMetStats(boid, zichtbareBoids(boid, boids));

    const cohesie = metLengte(verschil(zichtbareMates.centrum, boid.pos), cohesiekracht);
    const parralel = metLengte(zichtbareMates.richting, parralelkracht);
    const eigen = metLengte(boid.snelheid, eigenkracht);

    const snelheid = (zichtbareMates.snelheid * gemiddeldesnelheidskracht + lengte(boid.snelheid) * eigensnelheidskracht) / (gemiddeldesnelheidskracht + eigensnelheidskracht);

    const resultaatsnelheid = metLengte(gemiddelde([cohesie, parralel, eigen]), snelheid);
    const resultaatpositie = totaal([boid.pos, resultaatsnelheid]);

    return {
        pos: resultaatpositie,
        snelheid: resultaatsnelheid
    };
});

const boidsTekenaar = id => {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext("2d");
    return boids => {
        
        boids.forEach(boid => {
            ctx.beginPath();
            ctx.arc(boid.pos[0], boid.pos[0], 5, 0, 2 * Math.PI);
            ctx.fill();
        });
    }
};

const tekenBoids = boidsTekenaar("canvas");

vds(zelf => vorigeBoids => () => {
    boids = step(vorigeBoids);

    tekenBoids(boids);

    window.requestAnimationFrame(zelf(boids));
});