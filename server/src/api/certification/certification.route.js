import { Router } from "express";
import { authJwt } from "../../service/passport.service";
import * as certificationController from "./certification.controller";
import permit from "../../service/permission.service";

const routes = Router();

/**
 * Get certification information
 * GET api/v1/certification/{{idCertification}}
 */
routes.get("/:idCertification", certificationController.getCertification);

/**
 * Create new certification (Only government)
 * POST api/v1/certification
 */
routes.post(
  "/",
  authJwt,
  // permit("government"),
  certificationController.createCertification
);

/**
 * Update certification
 * POST api/v1/certification/{{idCertification}}
 */
routes.put(
  "/:idCertification",
  authJwt,
  certificationController.updateCertification
);

/**
 * Delete certification
 * DELETE api/v1/certification/{{idCertification}}
 */
routes.delete(
  "/:idCertification",
  authJwt,
  certificationController.deleteCertification
);

/**
 * Activate certification (Only owners)
 * PUT api/v1/certification/activate/{{idCertification}}
 */
routes.put(
  "/activate/:idCertification",
  authJwt,
  certificationController.activateCertification
);

/**
 * Activate sale property (Only owners)
 * PUT api/v1/certification/sale/{{idCertification}}
 */
routes.put(
  "/sale/:idCertification",
  authJwt,
  certificationController.activateSales
);
export default routes;