export class Square {

  public readonly number: number;
  public readonly isEmpty: boolean;
  
  public position: number;

  constructor(number: number, isEmpty: boolean, position: number) {
    this.number = number;
    this.isEmpty = isEmpty;

    this.position = position;
  }

  public moveTo(position: number): void {
    this.position = position;  
  }

  public hasNearbyEmptySquare(squares: Array<Square>): boolean {
    const hasEmptySquareAboveOrBelow: boolean = squares[this.position - 3]?.isEmpty || squares[this.position + 3]?.isEmpty;
    const hasEmptySquareToTheSides: boolean = squares[this.position - 1]?.isEmpty || squares[this.position + 1]?.isEmpty;

    return !!hasEmptySquareToTheSides || !!hasEmptySquareAboveOrBelow;
  }

  public getNearbyEmptySquarePosition(): number {
    return 0;
  }
  
}