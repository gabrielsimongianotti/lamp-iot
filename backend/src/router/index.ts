import { Router, Request, Response } from 'express';

const router: Router = Router();
let lightLamp: boolean = false;


router.get('/', (req: Request, res: Response) => {
  res.json(lightLamp);
});

router.post('/', (req: Request, res: Response) => {
  const { light } = req.body;
  lightLamp = light;
  res.status(204).json();
});

export default router;