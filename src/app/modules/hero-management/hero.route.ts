import { Router } from 'express';

import { HeroController } from './hero.controller';
import { auth } from '../../middleware/auth';
import { Role } from '../../../generated/prisma/enums';

const router = Router();

router.post('/', auth(Role.ADMIN), HeroController.createHero);

router.get('/', auth(Role.ADMIN), HeroController.getAllHeroes);

router.get('/:id', auth(Role.ADMIN), HeroController.getHeroById);

router.patch('/:id', auth(Role.ADMIN), HeroController.updateHero);

router.delete('/:id', auth(Role.ADMIN), HeroController.deleteHero);

export const HeroRoutes = router;
