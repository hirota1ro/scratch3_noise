const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const PerlinNoise = require('./PerlinNoise.js');

class Scratch3Noise {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'noise',
            name: 'Noise',
            blocks: [
                {
                    opcode: 'noise',
                    text: 'noise [X] [Y] [Z]',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0.0'
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0.0'
                        },
                        Z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0.0'
                        }
                    }
                },
                {
                    opcode: 'octaveNoise',
                    text: 'octave noise [X] [Y] [Z] [OCTAVES] [PERSISTENCE]',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0.0'
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0.0'
                        },
                        Z: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0.0'
                        },
                        OCTAVES: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '4'
                        },
                        PERSISTENCE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0.5'
                        }
                    }
                }
            ],
        };
    }

    noise (args) {
        const x = Cast.toNumber(args.X);
        const y = Cast.toNumber(args.Y);
        const z = Cast.toNumber(args.Z);
        return this.normalized(x, y, z);
    }

    octaveNoise (args) {
        const x = Cast.toNumber(args.X);
        const y = Cast.toNumber(args.Y);
        const z = Cast.toNumber(args.Z);
        const octaves = Cast.toNumber(args.OCTAVES);
        const persistence = Cast.toNumber(args.PERSISTENCE);
        let total = 0.0;
        let frequency = 1.0;
        let amplitude = 1.0;
        let maxValue = 0.0;  // Used for normalizing result to 0.0 - 1.0
        for (let i = 0; i < octaves; ++i) {
            total += this.normalized(x * frequency, y * frequency, z * frequency) * amplitude;
            maxValue += amplitude;
            amplitude *= persistence;
            frequency *= 2;
        }
        return total / maxValue;
    }

    normalized(x, y, z) {
        let perlin = this.perlin;
        if (perlin === undefined) {
            perlin = new PerlinNoise();
            this.perlin = perlin;
        }
        const value = perlin.noise(x, y, z); // [-1, 1]
        return (value + 1.0) / 2.0; // [0, 1]
    }
}

module.exports = Scratch3Noise;
