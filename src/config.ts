class Config {
    public static canvasWidth: number = 0;
    public static canvasHeight: number = 0;
    public static lineWidth: number = 4;
    public static fps: number = 80;
    /**
     * Defines how many degrees a line should turn when turning left/right
     */
    public static angleModifier: number = 2;
    /**
     * Defines the speed
     */
    public static pixelsPerSecond: number = 100;
    public static scoreBoardWith: number = 150;
    /**
     * the width of holes
     */
    public static holeSize: number = 10;
    /**
     * Defines the frequency with that holes appear. the lower, the less holes appear.
     * Has to be greater than 0.
     */
    public static holeFrequency: number = 10;
}

export { Config };
