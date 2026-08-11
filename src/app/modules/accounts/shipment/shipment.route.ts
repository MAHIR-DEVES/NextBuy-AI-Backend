import { Router } from 'express';

import { auth } from '../../../middleware/auth';
import { Role } from '../../../../generated/prisma/enums';

import { shipmentController } from './shipment.controller';

const router = Router();

router.post(
  '/',
  auth(Role.ADMIN, Role.SELLER),
  shipmentController.createShipment,
);

router.get('/', shipmentController.getAllShipments);

router.get('/:id', shipmentController.getSingleShipment);

router.patch(
  '/:id',
  auth(Role.ADMIN, Role.SELLER),
  shipmentController.updateShipment,
);

router.delete(
  '/:id',
  auth(Role.ADMIN, Role.SELLER),
  shipmentController.deleteShipment,
);

export const ShipmentRoutes = router;
