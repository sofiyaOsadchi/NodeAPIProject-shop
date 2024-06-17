class BizCardsError {
  status: number;
  message: string;
  date: Date;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
    this.date = new Date();
  }
}

export default BizCardsError;
