import {EColor} from "./color";
import { KeyboardControls } from './keyboard-controls';

class Player {
    private _id: number;
    private _name: string;
    private _color: EColor;
    private _xPosition: number = 0;
    private _yPosition: number = 0;
    private _angle: number = 0;
    private _isAlive: boolean = false;
    private _score: number = 0;
    private _isTurningLeft: boolean = false;
    private _isTurningRight: boolean = false;
    private _leftControl: KeyboardControls;
    private _rightControl: KeyboardControls;
    private _isActive: boolean = false;

    constructor(id: number, name: string, color: EColor,  leftControl: KeyboardControls, rightControl: KeyboardControls) {
        this._id = id;
        this._name = name;
        this._color = color;
        this._leftControl = leftControl;
        this._rightControl = rightControl;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get color(): EColor {
        return this._color;
    }

    get xPosition(): number {
        return this._xPosition;
    }

    set xPosition(value: number) {
        this._xPosition = value;
    }

    get yPosition(): number {
        return this._yPosition;
    }

    set yPosition(value: number) {
        this._yPosition = value;
    }

    get angle(): number {
        return this._angle;
    }

    set angle(value: number) {
        this._angle = value;
    }

    get isAlive(): boolean {
        return this._isAlive;
    }

    set isAlive(value: boolean) {
        this._isAlive = value;
    }

    get score(): number {
        return this._score;
    }

    set score(value: number) {
        this._score = value;
    }

    get isTurningLeft(): boolean {
        return this._isTurningLeft;
    }

    set isTurningLeft(value: boolean) {
        this._isTurningLeft = value;
    }

    get isTurningRight(): boolean {
        return this._isTurningRight;
    }

    set isTurningRight(value: boolean) {
        this._isTurningRight = value;
    }

    get leftControl(): KeyboardControls {
        return this._leftControl;
    }

    set leftControl(value: KeyboardControls) {
        this._leftControl = value;
    }

    get rightControl(): KeyboardControls {
        return this._rightControl;
    }

    set rightControl(value: KeyboardControls) {
        this._rightControl = value;
    }

    get isActive(): boolean {
        return this._isActive;
    }

    set isActive(value: boolean) {
        this._isActive = value;
    }
}

export { Player };