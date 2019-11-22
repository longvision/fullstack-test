import * as Yup from 'yup';
import { differenceInHours, parseISO } from 'date-fns';
import Schedule from '../models/Schedule';
import Supplier from '../models/Supplier';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
      end_date: Yup.date().when(
        'start_date',
        (startDate, field) => startDate && field.min(startDate)
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const supplier = await Supplier.findByPk(req.params.supplier_id);
    if (!supplier) {
      return res.status(400).json({ error: 'Supplier does not exists' });
    }

    const { start_date, end_date } = req.body;

    const finalPrice =
      differenceInHours(parseISO(end_date), parseISO(start_date)) *
      supplier.price;

    const schedule = await Schedule.create({
      ...req.body,
      user_id: req.userId,
      supplier_id: req.params.supplier_id,
      final_price: finalPrice,
    });

    return res.json(schedule);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
      end_date: Yup.date().when(
        'start_date',
        (startDate, field) => startDate && field.min(startDate)
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const schedule = await Schedule.findByPk(req.params.schedule_id);
    if (!schedule) {
      return res.status(400).json({ error: 'Schedule does not exists' });
    }

    const supplier = await Supplier.findByPk(schedule.supplier_id);
    if (!supplier) {
      return res.status(400).json({ error: 'Supplier does not exists' });
    }

    const { start_date, end_date } = req.body;

    const finalPrice =
      differenceInHours(parseISO(end_date), parseISO(start_date)) *
      supplier.price;

    schedule.update({
      final_price: finalPrice,
    });

    return res.json(schedule);
  }

  async delete(req, res) {
    const schedule = await Schedule.findByPk(req.params.schedule_id);
    if (!schedule) {
      return res.status(400).json({ error: 'Schedule does not exists' });
    }

    await schedule.destroy();

    return res.json({ message: 'Schedule deleted' });
  }
}

export default new SessionController();
