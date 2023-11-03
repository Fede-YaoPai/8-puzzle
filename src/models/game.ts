import { TOTAL_SQUARES_COUNT } from "../constants/constants";
import { Square } from "./square";
import { Utils } from "./utils";


export class Game {
  
  public gamesPlayed: number = 0;

  private squares: Array<Square> = [];

  constructor() {}

  public start(): void {
    this.initSquaresLayout();
  }

  private end(gameContainer: HTMLDivElement): void {
    gameContainer.classList.add('victory');
  }

  private initSquaresLayout(): void {
    const gameContainer: HTMLDivElement | null = Utils.getGameContainer();

    if (gameContainer) {
      const squares: Array<Square> = this.createSquares();

      this.renderSquares(squares, gameContainer);
    }
  }

  private createSquares(): Array<Square> {
    const positionsSource: Array<number> = Array.from({ length: TOTAL_SQUARES_COUNT }).map((_, index: number) => index);
    const positions: Array<number> = [...positionsSource];

    let emptySquareCreated: boolean = false;

    const squares: Array<Square> = positions.map((position: number) => {
      const randomNumberInPositionsSourceLengthBound: number = Math.floor(Math.random() * (positionsSource.length));
      const randomizedPosition: number = positionsSource.splice(randomNumberInPositionsSourceLengthBound, 1)[0];
      const positionEmpty: boolean = (randomizedPosition + 1) === positions.length;

      const [number, isEmpty, pos]: [number, boolean, number] = [
        randomizedPosition + 1,
        positionEmpty && !emptySquareCreated,
        position
      ];

      const square: Square = new Square(number, isEmpty, pos);

      if (positionEmpty) {
        emptySquareCreated = true;
      }

      this.squares.push(square);

      return square;
    });

    squares.sort((a, b) => a.position - b.position);

    return squares;
  }

  private renderSquares(squares: Array<Square>, container: HTMLDivElement): void {
    squares.forEach((square: Square) => {
      const squareWrapperElement: HTMLDivElement = document.createElement('div');

    squareWrapperElement.classList.add('square-wrapper', 'p-1', 'col-4', `number-${square.number}`, `position-${square.position}`);

    const squareElement: HTMLButtonElement = document.createElement('button');
    const cssClassesForSquare: Array<string> = [
      'square',
      `number-${square.number}`,
      `position-${square.position}`,
      'border-round-3xl', 
      'p-4',
      'flex',
      'justify-content-center',
      'align-items-center',
      'text-6xl',
      'cursor-pointer'
    ];

    if (square.isEmpty) {
      cssClassesForSquare.push('empty');
    }
    else {
      squareElement.textContent = square.number.toString();
    }

    squareElement.addEventListener('click', () => {
      const squares: Array<Square> = [...this.squares];
      const canMoveSquare: boolean = !square.isEmpty && square.hasNearbyEmptySquare(squares);

      const emptySquare: Square | undefined = squares.find((square: Square) => square.isEmpty);

      if (emptySquare && canMoveSquare) {
        this.moveSquares(square, emptySquare);
      }

    });

    squareElement.classList.add(...cssClassesForSquare);
    
    squareWrapperElement.append(squareElement);
    container.append(squareWrapperElement);
    });
  }

  private moveSquares(square: Square, emptySquare: Square): void {
    const [squarePosition, emptySquarePosition]: [number, number] = [
      square.position, 
      emptySquare.position
    ];

    square.moveTo(emptySquarePosition);
    emptySquare.moveTo(squarePosition);

    this.squares.sort((a, b) => a.position - b.position);

    this.refreshSquaresLayout(this.squares);
    this.checkIfGameIsWon();
  }

  private refreshSquaresLayout(squares: Array<Square>): void {
    const gameContainer: HTMLDivElement | null = Utils.getGameContainer();

    if (gameContainer) {
      while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
      }

      this.renderSquares(squares, gameContainer);
    }
  }

  private checkIfGameIsWon(): void {
    const victory: boolean = this.squares.every((square: Square, index: number) => square.position === 0 || square.number > this.squares[index - 1]?.number);

    if (victory) {
      const gameContainer: HTMLDivElement | null = Utils.getGameContainer();

      if (gameContainer) {
        this.end(gameContainer);
      }
    }
  }

}
