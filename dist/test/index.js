"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const fs = require("fs");
const create_image_1 = require("@rgba-image/create-image");
const __1 = require("..");
const patternData = new Uint8ClampedArray(fs.readFileSync('./src/test/fixtures/pattern.bin'));
const patternCopyData = new Uint8ClampedArray(fs.readFileSync('./src/test/fixtures/pattern-copy.bin'));
const pattern = create_image_1.createImage(8, 8, patternData);
const patternCopy = create_image_1.createImage(10, 10, patternCopyData);
describe('copy', () => {
    it('copies whole image', () => {
        const dest = create_image_1.createImage(8, 8);
        __1.copy(pattern, dest);
        assert.deepEqual(dest, pattern);
    });
    it('copies regions', () => {
        const sourceTopLeft = [
            0, 0, 4, 4
        ];
        const sourceTopRight = [
            4, 0, 4, 4
        ];
        const sourceBottomLeft = [
            0, 4, 4, 4
        ];
        const sourceBottomRight = [
            4, 4, 4, 4
        ];
        const destTopLeft = [
            1, 1
        ];
        const destTopRight = [
            5, 1
        ];
        const destBottomLeft = [
            1, 5
        ];
        const destBottomRight = [
            5, 5
        ];
        const dest = create_image_1.createImage(10, 10);
        __1.copy(pattern, dest, ...sourceTopLeft, ...destBottomRight);
        __1.copy(pattern, dest, ...sourceTopRight, ...destBottomLeft);
        __1.copy(pattern, dest, ...sourceBottomLeft, ...destTopRight);
        __1.copy(pattern, dest, ...sourceBottomRight, ...destTopLeft);
        assert.deepEqual(dest, patternCopy);
    });
    it('does not try to copy outside of source bounds', () => {
        const dest = create_image_1.createImage(8, 8);
        __1.copy(pattern, dest, 0, 0, 10, 10);
        assert.deepEqual(dest, pattern);
    });
    it('does not try to copy outside of dest bounds', () => {
        const dest = create_image_1.createImage(8, 8);
        __1.copy(pattern, dest);
        __1.copy(pattern, dest, 0, 0, 8, 8, 10, 10);
        assert.deepEqual(dest, pattern);
    });
});
//# sourceMappingURL=index.js.map