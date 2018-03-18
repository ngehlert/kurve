class Config {
    public static canvasWidth: number = 0;
    public static canvasHeight: number = 0;
    public static lineWidth: number = 4;
    public static fps: number = 80;
    public static pixelsPerSecond: number = 100;
    public static scoreBoardWith: number = 150;
    /**
     * the width of holes
     */
    public static holeSize: number = 10;
    /**
     * Defines the frequency with that holes appear. the lower, the less holes appear. has to be greater than 0.
     */
    public static holeFrequency: number = 1;
}

export { Config };