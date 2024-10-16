import { db } from './sequelize.config.js';

import AccountModel from './models/account.model.js';

/**
 * ignorar el Prefer default export, ya que realmente no genera error en el codigo
 * y este se quita una vez se añadan mas modelos al objecto de export.
 * Pero ademas, es necesario dejarlo con export, para que se pueda importar
 * correctamente el modelo en otras partes
 */
//

export {
  db,
  AccountModel,
};
