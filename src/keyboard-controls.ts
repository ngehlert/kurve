enum EKeyCode {
    One = 49,
    Q = 81,
    LAlt = 17,
    RAlt = 18,
    M = 77,
    Comma = 188,
    P = 80,
    SZ = 189,
    Left = 37,
    Down = 40,
    Space = 32,
    Enter = 13,
}

enum EMouseClick {
    Left = 'Left',
    Right = 'Right',
}

type KeyboardControls = EKeyCode | EMouseClick;

export { EKeyCode, EMouseClick, KeyboardControls };