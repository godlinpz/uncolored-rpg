export function clamp(x, minX, maxX) {
    return x > maxX ? maxX : x < minX ? minX : x;
}
