import { Request, Response } from 'express';

const basic = (req : Request, res : Response) => {
  res.status(200).json({
    message: 'Welcome to the backend server!',
  });
}

export { basic };
