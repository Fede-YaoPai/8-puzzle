export class Player {
  
  public name: string;
  public id: string;
  public points: number;
  public wins: number;
  public losses: number;

  constructor(name: string) {
    this.name = name;
    this.id = this.name + Math.random().toString(36).slice(2);

    this.points = 0;
    this.wins = 0;
    this.losses = 0;
  }

}