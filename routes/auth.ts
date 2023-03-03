import express, { Request, Response } from 'express';
import AuthAdapter from '../handler/auth';

const router = express.Router();
router.post('/', async (req: Request, res: Response) => {
  console.log("Welcome to no name app")
});


  router.post('/login', async (req: Request, res: Response) => {
    try {
      const result = await AuthAdapter.login("sandun", "an");
      res.json(result);
    } catch (error:any) {
      console.error(error);
      res.status(401).send(error.message);
    }
  });
  
  // Register endpoint
  router.post('/register', async (req: Request, res: Response) => {
    const { username, password } = {username:"sandun",password:"an"};
    try {
      const result = await AuthAdapter.register(username, password);
      res.json(result);
    } catch (error:any) {
      console.error(error);
      res.status(400).send(error.message);
    }
  });
  
  export default router;