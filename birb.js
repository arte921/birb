const radius = 20;

const boids = [
    {
        x: 10,
        y: 10,
        r: 2,
        v: 10
    },
    {
        x: 20,
        y: 10,
        r: 1.5,
        v: 10
    },
    {
        x: 5,
        y: 10,
        r: 1,
        v: 10
    }
];

const afstand = (a, b) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

const zichtbareBoids = (boid, boids, radius = radius) => boids.filter(mate => afstand(mate, boid) <= radius && mate != boid);

const boidsMetStats = (boid, boids) => ({
    mates: boids.map(mate => ({
        ...mate,
        afstand: afstand(boid, mate)
    })),
    centrumX: boids.reduce((a, b) => a.x + b.x) / boids.length,
    centrumY: boids.reduce((a, b) => a.y + b.y) / boids.length
});

const step = boids => boids.map((boid, _, boids) => {
    const zichtbareMates = zichtbareBoids(boid, boids);


});