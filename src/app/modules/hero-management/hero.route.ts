import { Router } from 'express';

import { HeroController } from './hero.controller';

const router = Router();

router.post('/', HeroController.createHero);

router.get('/', HeroController.getAllHeroes);

router.get('/:id', HeroController.getHeroById);

router.patch('/:id', HeroController.updateHero);

router.delete('/:id', HeroController.deleteHero);

export const HeroRoutes = router;
