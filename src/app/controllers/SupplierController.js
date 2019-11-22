import * as Yup from 'yup';
import Supplier from '../models/Supplier';

class SupplierController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      address: Yup.string(),
      price: Yup.number()
        .positive()
        .required(),
      capacity: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const supplierExists = await Supplier.findOne({
      where: { email: req.body.email },
    });
    if (supplierExists) {
      return res.status(400).json({ error: 'Supplier already exists' });
    }

    const supplier = await Supplier.create(req.body);

    return res.json(supplier);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      params: Yup.object().shape({
        supplier_id: Yup.string().required(),
      }),
      body: Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        address: Yup.string(),
        price: Yup.number().positive(),
        capacity: Yup.string(),
      }),
    });

    if (!(await schema.isValid(req))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email } = req.body;
    const supplier = await Supplier.findByPk(req.params.supplier_id);

    if (email && email !== supplier.email) {
      const supplierExists = await Supplier.findOne({
        where: { email },
      });
      if (supplierExists) {
        return res.status(400).json({ error: 'Supplier already exists' });
      }
    }

    await supplier.update(req.body);

    const supplierUpdated = await Supplier.findByPk(req.params.supplier_id);

    return res.json(supplierUpdated);
  }

  async delete(req, res) {
    const supplier = await Supplier.findByPk(req.params.supplier_id);
    if (!supplier) {
      return res.status(400).json({ error: 'Supplier does not exists' });
    }

    await supplier.destroy();

    return res.json({ message: 'Supplier deleted' });
  }
}

export default new SupplierController();
