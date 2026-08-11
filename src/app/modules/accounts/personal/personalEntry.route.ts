import express from 'express';

import { PersonalEntryController } from './personalEntry.controller';
import { auth } from '../../../middleware/auth';
import { Role } from '../../../../generated/prisma/enums';

const router = express.Router();

router.post('/', auth(Role.ADMIN), PersonalEntryController.createPersonalEntry);

router.get(
  '/',
  auth(Role.ADMIN),
  PersonalEntryController.getAllPersonalEntries,
);

router.get(
  '/:id',
  auth(Role.ADMIN),
  PersonalEntryController.getSinglePersonalEntry,
);

router.patch(
  '/:id',
  auth(Role.ADMIN),
  PersonalEntryController.updatePersonalEntry,
);

router.delete(
  '/:id',
  auth(Role.ADMIN),
  PersonalEntryController.deletePersonalEntry,
);

export const PersonalEntryRoutes = router;
